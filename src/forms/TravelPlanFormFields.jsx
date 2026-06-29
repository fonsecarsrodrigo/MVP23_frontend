import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import Button from '../components/Button';
import FeedbackModal from '../components/FeedbackModal';

const API_BASE_URL = 'http://127.0.0.1:5001';

function TravelPlanFormFields() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formRef = React.useRef(null);
  const { customerId } = useParams();
  const prefilledCustomerId = customerId || '';

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    if (!form) {
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('');

    const payload = {
      customer_id: Number(form.customer_id.value),
      origin: form.origin.value,
      destination: form.destination.value,
      start_date: form.start_date.value,
      end_date: form.end_date.value,
      travel_purpose: form.travel_purpose.value,
    };

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== '') {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/add_travel_plan`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível cadastrar o plano de viagem.');
      }

      setFeedbackMessage('Plano de viagem cadastrado com sucesso!');
      form.reset();
    } catch (error) {
      setFeedbackMessage(error.message || 'Erro ao cadastrar plano de viagem.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form ref={formRef} className="customer-form" onSubmit={handleSubmit}>
        <div className="div-3-columns">
          <div>
            <label>
              Número de Cadastro de Cliente *
              <input type="text" name="customer_id" defaultValue={prefilledCustomerId} required />
            </label>

            <label>
              Origem *
              <input type="text" name="origin" required />
            </label>

            <label>
              Destino *
              <input type="text" name="destination" required />
            </label>

            <label>
              Data Início *
            </label>
            <label>
              <input type="date" name="start_date" required />
            </label>

            <label>
              Data Fim *
            </label>
            <label>
              <input type="date" name="end_date" required />
            </label>
          </div>
          <div>
            <label>
              Propósito da Viagem *
              <input type="text" name="travel_purpose" required />
            </label>

            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? 'Enviando...' : 'Cadastrar'}
            </Button>
          </div>
        </div>
        {feedbackMessage && <p className="form-feedback">{feedbackMessage}</p>}
        <FeedbackModal message={feedbackMessage} onClose={() => setFeedbackMessage('')} />
      </form>
    </>
  );
}

export default TravelPlanFormFields;
