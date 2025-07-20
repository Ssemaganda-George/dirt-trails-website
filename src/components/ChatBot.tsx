import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot, User, Leaf } from 'lucide-react';

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hey there, explorer! 🦁 I'm your Safari AI guide. Ready for an adventure? How can I help you today?", sender: 'bot', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const responses = [
        "What an exciting question! Let me guide you through the wilderness of knowledge... 🌿",
        "I can help you navigate that! Here's what I discovered on this safari... 🦒",
        "Thanks for sharing that with me, fellow adventurer! Here's my take... 🌅",
        "Fascinating! Like tracking wildlife, let me help you explore this... 🐘",
        "Great to hear from you, explorer! Here's what I've learned in the wild... 🦓"
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      setMessages(prev => [...prev, { 
        text: randomResponse, 
        sender: 'bot', 
        timestamp: new Date() 
      }]);
      setIsTyping(false);
    }, 1500);
  };

  const handleSend = () => {
    if (input.trim()) {
      const userMessage = { text: input, sender: 'user', timestamp: new Date() };
      setMessages(prev => [...prev, userMessage]);
      setInput('');
      simulateBotResponse(input);
    }
  };

  const formatTime = (timestamp) => {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-gradient-to-b from-amber-50 to-orange-50 shadow-2xl rounded-2xl w-96 h-[600px] flex flex-col overflow-hidden border-2 border-amber-200 transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-500/20 via-orange-500/20 to-red-500/20"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Leaf className="w-5 h-5 text-green-200" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Trail AI Assistant</h3>
                <p className="text-sm text-amber-100">On safari now 🌍</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-200 relative z-10 border border-white/30"
            >
              <X className="w-4 h-4" />
            </button>
            {/* Safari pattern decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-orange-400 to-red-400"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-gradient-to-b from-amber-50 to-orange-50 space-y-4 relative">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-amber-600 to-orange-600"></div>
            </div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                <div className={`flex items-start space-x-2 max-w-[80%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    msg.sender === 'user' 
                      ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white border-orange-300' 
                      : 'bg-gradient-to-r from-green-600 to-emerald-600 text-white border-green-300'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`px-4 py-3 rounded-2xl border ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-br-sm border-orange-400 shadow-lg' 
                        : 'bg-white text-amber-900 rounded-bl-sm shadow-lg border-amber-200 bg-gradient-to-r from-white to-amber-50'
                    }`}>
                      <p className="text-sm leading-relaxed font-medium">{msg.text}</p>
                    </div>
                    <span className={`text-xs text-amber-600 mt-1 font-medium ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start relative z-10">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 text-white flex items-center justify-center flex-shrink-0 border-2 border-green-300">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-amber-200 bg-gradient-to-r from-white to-amber-50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-amber-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-orange-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-red-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gradient-to-r from-amber-100 to-orange-100 border-t-2 border-amber-200">
            <div className="flex items-center space-x-2">
              <input
                className="flex-1 border-2 border-amber-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white placeholder-amber-500 text-amber-900 font-medium"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Share your adventure..."
                disabled={isTyping}
              />
              <button 
                className="w-10 h-10 bg-gradient-to-r from-orange-500 via-red-500 to-amber-600 text-white rounded-full flex items-center justify-center hover:from-orange-600 hover:via-red-600 hover:to-amber-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-orange-400 shadow-lg"
                onClick={handleSend}
                disabled={isTyping || !input.trim()}
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      ) : (
        <button
          className="bg-gradient-to-r from-amber-600 via-orange-600 to-red-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-2 border-amber-400 relative overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-yellow-400/20 via-orange-400/20 to-red-400/20"></div>
          <MessageCircle className="w-6 h-6 relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse shadow-lg"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;