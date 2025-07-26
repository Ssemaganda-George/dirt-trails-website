import React, { useState, useRef, useEffect } from 'react';
import { Send, MessageCircle, X, Bot, User, Leaf, MapPin, Calendar, Star, DollarSign } from 'lucide-react';

const ChatBot = ({ tours = [], selectedCountry = null, currentFilters = {} }) => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { 
      text: "Hey there, explorer! 🦁 I'm your Safari AI guide. I have information about all our amazing tours and can help you find the perfect adventure. What would you like to know?", 
      sender: 'bot', 
      timestamp: new Date() 
    }
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

  const generateContextualResponse = (userMessage) => {
    const message = userMessage.toLowerCase();
    
    const relevantTours = selectedCountry 
      ? tours.filter(tour => tour.country === selectedCountry)
      : tours;

    // Country-specific responses
    if (message.includes('kenya') || message.includes('uganda') || message.includes('tanzania') || message.includes('rwanda')) {
      const countryMentioned = message.includes('kenya') ? 'Kenya' : 
                             message.includes('uganda') ? 'Uganda' :
                             message.includes('tanzania') ? 'Tanzania' : 'Rwanda';
      
      const countryTours = tours.filter(tour => tour.country === countryMentioned);
      
      if (countryTours.length > 0) {
        const tourList = countryTours.slice(0, 3).map(tour => 
          `• ${tour.name} (${tour.duration} days, $${tour.price.toLocaleString()})`
        ).join('\n');
        
        return `Great choice! 🌍 ${countryMentioned} offers incredible safari experiences. Here are some of our top ${countryMentioned} tours:\n\n${tourList}\n\nWould you like more details about any of these adventures?`;
      }
    }

    if (message.includes('price') || message.includes('cost') || message.includes('budget') || message.includes('cheap') || message.includes('expensive')) {
      if (relevantTours.length > 0) {
        const prices = relevantTours.map(t => t.price).sort((a, b) => a - b);
        const minPrice = prices[0];
        const maxPrice = prices[prices.length - 1];
        const avgPrice = Math.round(prices.reduce((a, b) => a + b, 0) / prices.length);
        
        const budgetTours = relevantTours.filter(t => t.price <= avgPrice).slice(0, 2);
        const budgetList = budgetTours.map(tour => 
          `• ${tour.name} - $${tour.price.toLocaleString()} (${tour.duration} days)`
        ).join('\n');
        
        return `💰 Our tour prices range from $${minPrice.toLocaleString()} to $${maxPrice.toLocaleString()}, with an average of $${avgPrice.toLocaleString()}.\n\nHere are some great value options:\n${budgetList}\n\nPrices include accommodation, meals, and game drives. What's your budget range?`;
      }
    }

    if (message.includes('duration') || message.includes('days') || message.includes('long') || message.includes('short')) {
      if (relevantTours.length > 0) {
        const durations = relevantTours.map(t => t.duration).sort((a, b) => a - b);
        const shortTours = relevantTours.filter(t => t.duration <= 5).slice(0, 2);
        const longTours = relevantTours.filter(t => t.duration >= 7).slice(0, 2);
        
        let response = `⏰ Our tours range from ${durations[0]} to ${durations[durations.length - 1]} days.\n\n`;
        
        if (shortTours.length > 0) {
          response += `Quick adventures (≤5 days):\n${shortTours.map(t => `• ${t.name} (${t.duration} days)`).join('\n')}\n\n`;
        }
        
        if (longTours.length > 0) {
          response += `Extended expeditions (≥7 days):\n${longTours.map(t => `• ${t.name} (${t.duration} days)`).join('\n')}\n\n`;
        }
        
        return response + "How many days were you thinking of spending on safari?";
      }
    }

    if (message.includes('wildlife') || message.includes('animals') || message.includes('lion') || message.includes('elephant') || message.includes('big five')) {
      const wildlifeTours = relevantTours.filter(tour => 
        tour.tagline?.toLowerCase().includes('wildlife') ||
        tour.name.toLowerCase().includes('wildlife') ||
        tour.name.toLowerCase().includes('safari')
      ).slice(0, 3);
      
      if (wildlifeTours.length > 0) {
        const tourList = wildlifeTours.map(tour => 
          `• ${tour.name} - ${tour.location} (${tour.rating}⭐)`
        ).join('\n');
        
        return `🦁 East Africa is home to the Big Five and incredible wildlife! Here are our top wildlife experiences:\n\n${tourList}\n\nThese tours offer excellent game viewing opportunities. Which animals are you most excited to see?`;
      }
    }

    // Rating/reviews queries
    if (message.includes('best') || message.includes('top rated') || message.includes('reviews') || message.includes('rating')) {
      const topRatedTours = relevantTours
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 3);
      
      if (topRatedTours.length > 0) {
        const tourList = topRatedTours.map(tour => 
          `• ${tour.name} - ${tour.rating}⭐ (${tour.country})`
        ).join('\n');
        
        return `⭐ Here are our highest-rated safari experiences:\n\n${tourList}\n\nThese tours have received excellent reviews from our adventurers. What makes a perfect safari for you?`;
      }
    }

    // Specific tour recommendations
    if (message.includes('recommend') || message.includes('suggest') || message.includes('help me choose')) {
      if (relevantTours.length > 0) {
        const sortedByPrice = [...relevantTours].sort((a, b) => a.price - b.price);
        const recommendations = [
          sortedByPrice[0], 
          sortedByPrice[Math.floor(sortedByPrice.length / 2)], 
          sortedByPrice[sortedByPrice.length - 1] // Premium
        ].filter((tour, index, arr) => arr.findIndex(t => t.id === tour.id) === index).slice(0, 3);
        
        const recList = recommendations.map(tour => 
          `• ${tour.name}\n  📍 ${tour.location}\n  💰 $${tour.price.toLocaleString()} | ⏰ ${tour.duration} days | ⭐ ${tour.rating}`
        ).join('\n\n');
        
        return `🎯 Based on our collection, here are my top recommendations:\n\n${recList}\n\nEach offers a unique perspective on East African wildlife. What type of experience interests you most?`;
      }
    }

    // Location-specific queries
    if (message.includes('serengeti') || message.includes('masai mara') || message.includes('ngorongoro') || message.includes('amboseli')) {
      const locationTours = relevantTours.filter(tour => 
        tour.location.toLowerCase().includes(message.match(/(serengeti|masai mara|ngorongoro|amboseli)/)?.[0] || '')
      );
      
      if (locationTours.length > 0) {
        const tourList = locationTours.map(tour => 
          `• ${tour.name} - $${tour.price.toLocaleString()} (${tour.duration} days)`
        ).join('\n');
        
        return `🌍 Great choice of destination! Here are our tours featuring that area:\n\n${tourList}\n\nThese locations offer some of the best wildlife viewing in Africa. Want to know more about any specific tour?`;
      }
    }

    // Default contextual responses
    const contextualResponses = [
      `I'd love to help you plan your safari adventure! 🌿 We currently have ${tours.length} amazing tours across East Africa. What kind of experience are you looking for?`,
      `As your safari guide, I have detailed information about all our tours! 🦒 Are you interested in a specific country, budget range, or type of wildlife experience?`,
      `Great question, fellow explorer! 🌅 I can help you with tour details, pricing, locations, and recommendations. What would you like to discover?`,
      `Thanks for that, adventurer! 🐘 With tours ranging from ${Math.min(...tours.map(t => t.duration))} to ${Math.max(...tours.map(t => t.duration))} days across multiple countries, there's something for every explorer. How can I help you choose?`,
      `Fascinating! 🦓 I'm here to help you navigate through our safari options. Whether you're looking for budget-friendly adventures or luxury experiences, I've got you covered. What interests you most?`
    ];
    
    return contextualResponses[Math.floor(Math.random() * contextualResponses.length)];
  };

  const simulateBotResponse = (userMessage) => {
    setIsTyping(true);
    setTimeout(() => {
      const response = generateContextualResponse(userMessage);
      setMessages(prev => [...prev, { 
        text: response, 
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

  // Quick action buttons
  const quickActions = [
    { text: "Show me budget tours", icon: DollarSign },
    { text: "Best rated tours", icon: Star },
    { text: "Kenya safaris", icon: MapPin },
    { text: "Short trips (≤5 days)", icon: Calendar }
  ];

  const handleQuickAction = (actionText) => {
    setMessages(prev => [...prev, { text: actionText, sender: 'user', timestamp: new Date() }]);
    simulateBotResponse(actionText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-white shadow-2xl rounded-2xl w-96 h-[600px] flex flex-col overflow-hidden border-2 border-green-200 transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-500 via-green-600 to-emerald-600 text-white p-4 flex justify-between items-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-green-500/20 to-emerald-500/20"></div>
            <div className="flex items-center space-x-3 relative z-10">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/30">
                <Leaf className="w-5 h-5 text-white" />
              </div>
              <div>
                <h3 className="font-bold text-lg">Safari AI Guide</h3>
                <p className="text-sm text-green-100">
                  {tours.length} tours • {selectedCountry || 'All countries'} 🌍
                </p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center hover:bg-white/30 transition-colors duration-200 relative z-10 border border-white/30"
            >
              <X className="w-4 h-4" />
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-400 to-teal-400"></div>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-white space-y-4 relative">
            <div className="absolute inset-0 opacity-5">
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-500"></div>
            </div>
            
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    msg.sender === 'user' 
                      ? 'bg-white text-green-600 border-green-300' 
                      : 'bg-gradient-to-r from-green-500 to-emerald-500 text-white border-green-300'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`px-4 py-3 rounded-2xl border ${
                      msg.sender === 'user' 
                        ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-br-sm border-green-400 shadow-lg' 
                        : 'bg-white text-green-800 rounded-bl-sm shadow-lg border-green-200 bg-gradient-to-r from-white to-green-50'
                    }`}>
                      <p className="text-sm leading-relaxed font-medium whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className={`text-xs text-green-600 mt-1 font-medium ${msg.sender === 'user' ? 'text-right' : 'text-left'}`}>
                      {formatTime(msg.timestamp)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
            
            {/* Quick Actions - Show after welcome message */}
            {messages.length === 1 && !isTyping && (
              <div className="relative z-10">
                <p className="text-xs text-green-600 font-semibold mb-2 text-center">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.text)}
                      className="flex items-center space-x-2 p-2 bg-green-50 hover:bg-green-100 rounded-lg border border-green-200 text-green-700 text-xs font-medium transition-colors duration-200"
                    >
                      <action.icon className="w-3 h-3" />
                      <span className="truncate">{action.text}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}
            
            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start relative z-10">
                <div className="flex items-start space-x-2 max-w-[80%]">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-500 to-emerald-500 text-white flex items-center justify-center flex-shrink-0 border-2 border-green-300">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-lg border border-green-200 bg-gradient-to-r from-white to-green-50">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-teal-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-t-2 border-green-200">
            <div className="flex items-center space-x-2">
              <input
                className="flex-1 border-2 border-green-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white placeholder-green-500 text-green-800 font-medium"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about tours, prices, countries..."
                disabled={isTyping}
              />
              <button 
                className="w-10 h-10 bg-gradient-to-r from-green-500 via-emerald-500 to-teal-600 text-white rounded-full flex items-center justify-center hover:from-green-600 hover:via-emerald-600 hover:to-teal-700 transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 border-2 border-green-400 shadow-lg"
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
          className="bg-gradient-to-r from-green-500 via-emerald-600 to-teal-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-3 border-2 border-green-400 relative overflow-hidden"
          onClick={() => setOpen(true)}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-green-400/20 via-emerald-400/20 to-teal-400/20"></div>
          <MessageCircle className="w-6 h-6 relative z-10" />
          <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-green-500 animate-pulse shadow-lg"></div>
        </button>
      )}
    </div>
  );
};

export default ChatBot;