import React, { useEffect, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import BackButton from '../components/BackButton';
import RemoveTravelButton from '../components/RemoveTravelButton';
import FeedbackModal from '../components/FeedbackModal';

const API_BASE_URL = 'http://127.0.0.1:5001';

function TravelPlansPage() {
  const [travelPlans, setTravelPlans] = useState([]);
  const [customerNames, setCustomerNames] = useState({});
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const loadTravelPlans = async () => {
    try {
      const [travelResponse, customersResponse] = await Promise.all([
        fetch(`${API_BASE_URL}/get_travel_plans`),
        fetch(`${API_BASE_URL}/get_customers`),
      ]);

      const travelResult = await travelResponse.json();
      const customersResult = await customersResponse.json();

      if (!travelResponse.ok) {
        throw new Error(travelResult.message || 'Não foi possível carregar os planos de viagem.');
      }

      if (!customersResponse.ok) {
        throw new Error(customersResult.message || 'Não foi possível carregar os clientes.');
      }

      const plans = travelResult.travel_plans || [];
      const customerLookup = (customersResult.customers || []).reduce((acc, customer) => {
        acc[customer.customer_key] = customer.full_name;
        return acc;
      }, {});

      setTravelPlans(plans);
      setCustomerNames(customerLookup);

      if (plans.length === 0) {
        const message = 'Nenhum plano de viagem cadastrado ainda.';
        setModalMessage(message);
      }
    } catch (error) {
      const message = error.message || 'Erro ao carregar planos de viagem.';
      setErrorMessage(message);
      setModalMessage(message);
    }
  };

  useEffect(() => {
    loadTravelPlans();
  }, []);

  const handleTravelPlanRemoved = (message) => {
    if (message) {
      setModalMessage(message);
      return;
    }

    loadTravelPlans();
  };

  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>Planos de Viagens</h1>
          </div>
          <div className="page-title-cell" />
        </div>

          <div className="table-container">
            <table className="data-table" id="TravelPlansTable">
              <thead>
                <tr>
                  <th>Identificador de Viagem</th>
                  <th>Numero de Cadastro de Cliente</th>
                  <th>Nome Completo</th>
                  <th>Origem</th>
                  <th>Destino</th>
                  <th>Data Início</th>
                  <th>Data Fim</th>
                  <th>Propósito da Viagem</th>
                  <th>Ações</th>
                </tr>
              </thead>
              <tbody>
                {travelPlans.length === 0 ? (
                  <tr>
                    <td colSpan="9" className="empty-row">
                      {errorMessage || 'Nenhum plano de viagem cadastrado ainda.'}
                    </td>
                  </tr>
                ) : (
                  travelPlans.map((plan) => (
                    <tr key={plan.travel_plan_key}>
                      <td>{plan.travel_plan_key}</td>
                      <td>{plan.customer_id}</td>
                      <td>{customerNames[plan.customer_id] || '-'}</td>
                      <td>{plan.origin}</td>
                      <td>{plan.destination}</td>
                      <td>{plan.start_date}</td>
                      <td>{plan.end_date}</td>
                      <td>{plan.travel_purpose}</td>
                      <td>
                        <div className="table-actions">
                          <RemoveTravelButton
                            travelPlanId={plan.travel_plan_key}
                            onRemoved={handleTravelPlanRemoved}
                          />
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
      </main>
      <FeedbackModal message={modalMessage} onClose={() => setModalMessage('')} />
    </div>
  );
}

export default TravelPlansPage;
