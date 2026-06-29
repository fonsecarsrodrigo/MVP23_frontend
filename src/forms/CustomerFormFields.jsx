import React, { useState } from 'react';
import Button from '../components/Button';
import FeedbackModal from '../components/FeedbackModal';

const API_BASE_URL = 'http://127.0.0.1:5001';

function CustomerFormFields() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState('');
  const formRef = React.useRef(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = formRef.current;

    if (!form) {
      return;
    }

    setIsSubmitting(true);
    setFeedbackMessage('');

    const payload = {
      full_name: form.full_name.value,
      date_of_birth: form.date_of_birth.value,
      e_mail: form.e_mail.value,
      home_cep: form.home_cep.value,
      home_street: form.home_street.value,
      home_number: form.home_number.value,
      home_city: form.home_city.value,
      home_state: form.home_state.value,
      social_number: form.social_number.value,
    };

    const params = new URLSearchParams();
    Object.entries(payload).forEach(([key, value]) => {
      if (value !== '') {
        params.append(key, value);
      }
    });

    try {
      const response = await fetch(`${API_BASE_URL}/add_customer`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: params,
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Não foi possível cadastrar o cliente.');
      }

      setFeedbackMessage('Cliente cadastrado com sucesso!');
      form.reset();
    } catch (error) {
      setFeedbackMessage(error.message || 'Erro ao cadastrar cliente.');
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
              Nome Completo *
              <input type="text" name="full_name" required />
            </label>

            <label>
              CPF *
              <input type="text" name="social_number" required />
            </label>

            <label>
              Data de Nascimento *
            </label>
            <label>
              <input type="date" name="date_of_birth" required />
            </label>

            <label>
              Email *
              <input type="email" name="e_mail" required />
            </label>
          </div>
          <div className="div-3-columns">
            <label>
              Endereço Residencial *
              <input type="text" name="home_cep" placeholder="CEP" maxLength="9" required />
              <input type="text" name="home_street" placeholder="Rua" required />
              <input type="text" name="home_number" placeholder="Número" required />
              <input type="text" name="home_city" placeholder="Cidade" required />
              <input type="text" name="home_state" placeholder="Estado (UF)" required maxLength="2" />
            </label>
          </div>

          <div>
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

export default CustomerFormFields;
