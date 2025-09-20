import React from 'react';

const ResetButton = ({ onReset, disabled }) => {
  return (
    <button className="btn btn--ghost" onClick={onReset} disabled={disabled} title="Clear this chat session">
      Reset Session
    </button>
  );
};

export default ResetButton;
