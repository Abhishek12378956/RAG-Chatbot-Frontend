import React from 'react';

const InputBox = ({ value, onChange, onSend, onKeyDown, loading }) => {
  return (
    <div className="inputbox">
      <textarea
        className="inputbox__textarea"
        rows={3}
        placeholder="Ask about the latest news... (Ctrl/Cmd + Enter to send)"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={onKeyDown}
        disabled={loading}
      />
      <button className="btn btn--primary" onClick={onSend} disabled={loading || !value.trim()}>
        {loading ? 'Thinking…' : 'Send'}
      </button>
    </div>
  );
};

export default InputBox;
