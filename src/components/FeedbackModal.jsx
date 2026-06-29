import React from 'react';
import Button from './Button';

function FeedbackModal({ message, onClose }) {
  if (!message) {
    return null;
  }

  return (
    <div className="feedback-modal-overlay" onClick={onClose}>
      <div className="feedback-modal" onClick={(event) => event.stopPropagation()}>
        <p>{message}</p>
        <Button type="button" className="feedback-close-button" onClick={onClose}>
          Fechar
        </Button>
      </div>
    </div>
  );
}

export default FeedbackModal;
