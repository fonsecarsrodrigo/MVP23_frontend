import React, { useState } from 'react';
import Button from './Button';

const API_BASE_URL = 'http://127.0.0.1:5001';

function RemoveClientButton({ customerId, onRemoved, disabled }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = async () => {
    if (!customerId || isRemoving) {
      return;
    }

    setIsRemoving(true);

    try {
      const response = await fetch(`${API_BASE_URL}/delete_customer?customer_key=${customerId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const result = await response.json().catch(() => ({}));
        throw new Error(result.message || 'Não foi possível remover o cliente.');
      }

      if (onRemoved) {
        onRemoved();
      }
    } catch (error) {
      if (onRemoved) {
        onRemoved(error.message || 'Erro ao remover cliente.');
      }
    } finally {
      setIsRemoving(false);
    }
  };

  return (
    <Button
      type="button"
      className="action-button secondary-action"
      onClick={handleRemove}
      disabled={disabled || isRemoving}
    >
      {isRemoving ? 'Removendo...' : 'Remover Cliente'}
    </Button>
  );
}

export default RemoveClientButton;
