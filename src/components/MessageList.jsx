import React from "react";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

const MessageList = ({ messages = [] }) => {
  return (
    <div className="messages">
      {messages.map((msg) => (
        <div key={msg.id} className={`message message--${msg.role}`}>
          <div className="message__avatar">
            {msg.role === "user" ? "🧑‍💻" : "🤖"}
          </div>
          <div className="message__bubble">
            <ReactMarkdown
              components={{
                code({ inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark}
                      language={match[1]}
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {msg.content || ""}
            </ReactMarkdown>
            {msg.sources && msg.sources.length > 0 && (
              <div className="message__sources">
                <div className="sources__title">Sources</div>
                <ul className="sources__list">
                  {msg.sources.map((s, idx) => (
                    <li key={idx}>
                      <a href={s.url} target="_blank" rel="noreferrer">
                        {s.title || s.url}
                      </a>
                      {typeof s.score === "number" && (
                        <span className="sources__score">
                          {s.score.toFixed(2)}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageList;
