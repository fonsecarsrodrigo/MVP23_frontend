import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from './Button';

function AddTravelButton({ customerId, disabled }) {
  const navigate = useNavigate();

  return (
    <Button
      type="button"
      className="action-button"
      onClick={() => navigate(`/travel/${customerId}`)}
      disabled={disabled}
    >
      {disabled ? 'Viagem Existente' : 'Adicionar Viagem'}
    </Button>
  );
}

export default AddTravelButton;
