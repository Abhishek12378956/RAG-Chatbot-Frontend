import React, { useEffect, useRef, useState } from 'react';
import MessageList from './MessageList';
import InputBox from './InputBox';

const ChatWindow = ({ messages, onSend, loading }) => {
  const containerRef = useRef(null);
  const [input, setInput] = useState('');

  useEffect(() => {
    // scroll to bottom on new message
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    onSend(text);
    setInput('');
  };

  const handleKeyDown = (e) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <div className="chat">
      <div className="chat__messages" ref={containerRef}>
        <MessageList messages={messages} />
      </div>
      <div className="chat__input">
        <InputBox
          value={input}
          onChange={setInput}
          onSend={handleSend}
          onKeyDown={handleKeyDown}
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ChatWindow;
