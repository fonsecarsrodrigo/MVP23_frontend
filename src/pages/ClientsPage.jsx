import React, { useEffect, useState } from 'react';
import SiteHeader from '../components/SiteHeader';
import BackButton from '../components/BackButton';
import AddTravelButton from '../components/AddTravelButton';
import RemoveClientButton from '../components/RemoveClientButton';
import RemoveTravelButton from '../components/RemoveTravelButton';
import FeedbackModal from '../components/FeedbackModal';

const API_BASE_URL = 'http://127.0.0.1:5001';

function ClientsPage() {
  const [customers, setCustomers] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [modalMessage, setModalMessage] = useState('');

  const loadCustomers = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/get_customers`);
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível carregar os clientes.');
      }

      const list = result.customers || [];
      setCustomers(list);
      if (list.length === 0) {
        const message = 'Nenhum cliente cadastrado ainda.';
        setModalMessage(message);
      }
    } catch (error) {
      const message = error.message || 'Erro ao carregar clientes.';
      setErrorMessage(message);
      setModalMessage(message);
    }
  };

  useEffect(() => {
    loadCustomers();
  }, []);

  return (
    <div className="app-container">
      <SiteHeader />

      <main className="site-body customer-form-page">
        <div className="page-title-row">
          <div className="page-title-cell">
            <BackButton />
          </div>
          <div className="page-title-cell page-title-center">
            <h1>Clientes</h1>
          </div>
          <div className="page-title-cell" />
        </div>

          <div className="table-container">
            <table className="data-table" id="CustomersTable">
              <thead>
                <tr>
                  <th>Número de Cadastro</th>
                  <th>Nome Completo</th>
                  <th>Data de Nascimento</th>
                  <th>Email</th>
                  <th>Identificador Plano de Viagem</th>
                  <th>Ação</th>
                </tr>
              </thead>
              <tbody>
                {customers.length === 0 ? (
                  <tr>
                    <td colSpan="12" className="empty-row">
                      {errorMessage || 'Nenhum cliente cadastrado ainda.'}
                    </td>
                  </tr>
                ) : (
                  customers.map((customer) => (
                    <tr key={customer.customer_key}>
                      <td>{customer.customer_key}</td>
                      <td>{customer.full_name}</td>
                      <td>{customer.date_of_birth}</td>
                      <td>{customer.e_mail}</td>
                      <td>{customer.travel_plan_id ?? '-'}</td>
                      <td>
                        <div className="table-actions">
                          <AddTravelButton
                            customerId={customer.customer_key}
                            disabled={Boolean(customer.travel_plan_id)}
                          />
                          <RemoveClientButton
                            customerId={customer.customer_key}
                            onRemoved={(message) => {
                              if (message) {
                                setModalMessage(message);
                                return;
                              }
                              setModalMessage('Cliente removido com sucesso!');
                              loadCustomers();
                            }}
                          />
                          <RemoveTravelButton
                            travelPlanId={customer.travel_plan_id}
                            disabled={!customer.travel_plan_id}
                            onRemoved={(message) => {
                              if (message) {
                                setModalMessage(message);
                                return;
                              }
                              setModalMessage('Plano de viagem removido com sucesso!');
                              loadCustomers();
                            }}
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

export default ClientsPage;
