import React, { useState } from 'react';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput('');
      // Here you can add logic to send the message to your backend or AI API
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-white shadow-lg rounded-lg w-80 h-96 flex flex-col">
          <div className="flex justify-between items-center p-2 border-b">
            <span className="font-bold">ChatBot</span>
            <button onClick={() => setOpen(false)}>✕</button>
          </div>
          <div className="flex-1 p-2 overflow-y-auto">
            {messages.map((msg, idx) => (
              <div key={idx} className="mb-2 text-right">
                <span className="bg-blue-100 px-2 py-1 rounded">{msg}</span>
              </div>
            ))}
          </div>
          <div className="p-2 border-t flex">
            <input
              className="flex-1 border rounded px-2 py-1"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSend()}
              placeholder="Type a message..."
            />
            <button className="ml-2 px-3 py-1 bg-blue-500 text-white rounded" onClick={handleSend}>
              Send
            </button>
          </div>
        </div>
      ) : (
        <button
          className="bg-blue-600 text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg"
          onClick={() => setOpen(true)}
        >
          💬
        </button>
      )}
    </div>
  );
};

export default ChatBot;