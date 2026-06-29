import React from 'react';

function Button({ type = 'button', className = '', onClick, children, ...props }) {
  return (
    <button type={type} className={className} onClick={onClick} {...props}>
      {children}
    </button>
  );
}

export default Button;
