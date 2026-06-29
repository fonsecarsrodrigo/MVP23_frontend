import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Button from './Button';

function BackButton({ to }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleBack = () => {
    if (to) {
      navigate(to);
      return;
    }

    if (location.key && location.key !== 'default') {
      navigate(-1);
      return;
    }

    navigate('/');
  };

  return (
    <Button className="back-button" onClick={handleBack}>
      ← Voltar
    </Button>
  );
}

export default BackButton;
