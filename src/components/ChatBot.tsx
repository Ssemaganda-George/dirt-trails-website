import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, MessageCircle, X, Bot, User, Leaf, MapPin, Calendar, Star, DollarSign } from 'lucide-react';
import { tours as siteTours } from '@/data/tours';
import { destinations as siteDestinations } from '@/data/destinations';

/**
 * ChatBot
 * - Automatically indexes local site data (tours, destinations, key pages)
 * - Returns contextual answers and actionable buttons that navigate the SPA
 * - Keeps a simple local "search" across known site content
 */
const ChatBot = ({ tours = [], selectedCountry = null, currentFilters = {} }) => {
  const navigate = useNavigate();
  // fall back to embedded data if parent doesn't pass tours
  const allTours = (tours && tours.length > 0) ? tours : siteTours;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey there, explorer! 🦁 I'm your Safari AI guide. I have information about our tours, destinations and services — ask me anything or try a quick question below.",
      sender: 'bot',
      timestamp: new Date(),
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

  // small site index for quick lookups (kept simple and local)
  const siteIndex = [
    { title: 'Home', path: '/' , snippet: 'Browse featured tours, conservation, and quick search.' },
    { title: 'Tours', path: '/tours', snippet: 'All safaris & tour packages.' },
    { title: 'About', path: '/about', snippet: 'Who we are and our mission.' },
    { title: 'Contact', path: '/contact', snippet: 'Contact form and office details.' },
    { title: 'Carbon Offset', path: '/environment/carbon-offset', snippet: 'Calculate and offset your trip carbon footprint.' },
    { title: 'Tree Planting', path: '/environment/tree-planting', snippet: 'Support tree planting initiatives.' },
    { title: 'Geotagging', path: '/environment/geotagging', snippet: 'Geotagging and monitoring projects.' },
  ];

  const generateContextualResponse = (userMessage: string) => {
    const q = (userMessage || '').toLowerCase();
    const relevantTours = selectedCountry ? allTours.filter(t => t.country === selectedCountry) : allTours;

    // Basic site metadata
    const companyName = 'Dirt Trails Safaris';
    const companyTagline = 'Professional, sustainable and unforgettable safari experiences';

    // Handle direct company identity / about questions first
    if (/\b(what('?| i)s the name|what('?| i)s this company|company name|who are you|what('?| i)s your name)\b/.test(q)) {
      return {
        text: `${companyName} — ${companyTagline}. You can read more about our story and mission on the About page. Would you like me to open it for you?`,
        actions: [ { label: 'About Dirt Trails', path: '/about' }, { label: 'Contact Us', path: '/contact' } ]
      };
    }

    // country queries
    if (/(kenya|uganda|tanzania|rwanda)/.test(q)) {
      const match = q.match(/kenya|uganda|tanzania|rwanda/)?.[0];
      if (match) {
        const countryName = match.charAt(0).toUpperCase() + match.slice(1);
        const countryTours = allTours.filter(t => t.country.toLowerCase() === countryName.toLowerCase());
        if (countryTours.length) {
          const tourList = countryTours.slice(0,3).map(t => `• ${t.name} (${t.duration} days, $${t.price.toLocaleString()})`).join('\n');
          return {
            text: `Great choice! 🌍 ${countryName} offers incredible safari experiences. Here are some top ${countryName} tours:\n\n${tourList}`,
            actions: countryTours.slice(0,3).map(t => ({ label: `View ${t.name}`, path: `/tours/${t.slug}` }))
          };
        }
      }
    }

    // price/budget
    if (/(price|cost|budget|cheap|expensive)/.test(q) && relevantTours.length) {
      const prices = relevantTours.map(t => t.price).sort((a,b)=>a-b);
      const min = prices[0], max = prices[prices.length-1];
      const avg = Math.round(prices.reduce((a,b)=>a+b,0)/prices.length);
      const budgetTours = relevantTours.filter(t => t.price <= avg).slice(0,3);
      return {
        text: `💰 Prices typically range from $${min.toLocaleString()} to $${max.toLocaleString()}, average $${avg.toLocaleString()}. Here are some value options: \n${budgetTours.map(t=>`• ${t.name} - $${t.price.toLocaleString()}`).join('\n')}`,
        actions: budgetTours.map(t => ({ label: t.name, path: `/tours/${t.slug}`}))
      };
    }

    // duration
    if (/(duration|days|long|short)/.test(q) && relevantTours.length) {
      const durations = relevantTours.map(t=>t.duration).sort((a,b)=>a-b);
      return {
        text: `⏰ Tours range from ${durations[0]} to ${durations[durations.length-1]} days. I can filter by duration for you.`,
        actions: [ { label: 'Short trips (≤5 days)', path: '/tours?duration=short' }, { label: 'Long trips (≥7 days)', path: '/tours?duration=long' } ]
      };
    }

    // wildlife
    if (/(wildlife|animals|lion|elephant|big five)/.test(q) && relevantTours.length) {
      const matches = relevantTours.filter(t => (t.tagline||'').toLowerCase().includes('wildlife') || t.name.toLowerCase().includes('safari')).slice(0,3);
      return {
        text: `🦁 Top wildlife experiences:\n\n${matches.map(m=>`• ${m.name} - ${m.location} (${m.rating}⭐)`).join('\n')}`,
        actions: matches.map(m=>({ label: m.name, path: `/tours/${m.slug}`}))
      };
    }

    // top rated
    if (/(best|top rated|reviews|rating)/.test(q) && relevantTours.length) {
      const top = [...relevantTours].sort((a,b)=>b.rating-a.rating).slice(0,3);
      return { text: `⭐ Top rated tours:\n\n${top.map(t=>`• ${t.name} - ${t.rating}⭐`).join('\n')}`, actions: top.map(t=>({ label: t.name, path: `/tours/${t.slug}`})) };
    }

    // recommendations
    if (/(recommend|suggest|help me choose)/.test(q) && relevantTours.length) {
      const sorted = [...relevantTours].sort((a,b)=>a.price-b.price);
      const picks = [sorted[0], sorted[Math.floor(sorted.length/2)], sorted[sorted.length-1]].filter(Boolean).slice(0,3);
      return { text: `🎯 Recommendations:\n\n${picks.map(p=>`• ${p.name} — $${p.price.toLocaleString()} | ${p.duration} days`).join('\n')}`, actions: picks.map(p=>({ label: p.name, path: `/tours/${p.slug}`})) };
    }

    // location-specific
    if (/(serengeti|masai mara|ngorongoro|amboseli)/.test(q)) {
      const loc = q.match(/serengeti|masai mara|ngorongoro|amboseli/)?.[0] || '';
      const locMatches = relevantTours.filter(t => (t.location||'').toLowerCase().includes(loc)).slice(0,4);
      if (locMatches.length) return { text: `Here are tours in that area: \n${locMatches.map(t=>`• ${t.name} - $${t.price.toLocaleString()}`).join('\n')}`, actions: locMatches.map(t=>({ label: t.name, path: `/tours/${t.slug}`})) };
    }

    // site search: pages and destinations
    if (/(where|page|how do i|find|show)/.test(q)) {
      const qclean = q.replace(/where|how do i|page|can i|show|find/gi,'').trim();
      const pageMatches = siteIndex.filter(p => p.title.toLowerCase().includes(qclean) || p.snippet.toLowerCase().includes(qclean));
      const destMatches = siteDestinations.filter(d => d.name.toLowerCase().includes(qclean)).slice(0,3);
      const actions = pageMatches.map(p=>({ label: p.title, path: p.path }));
      destMatches.forEach(d => actions.push({ label: d.name, path: `/destinations/${d.slug}`}));
      if (actions.length) return { text: `I found pages that may help with "${userMessage}":`, actions };
    }

    // default
    const defaultText = `I'd love to help you plan your safari adventure! 🌿 We currently have ${allTours.length} tours. What would you like to know?`;
    return { text: defaultText, actions: [ { label: 'Browse Tours', path: '/tours' }, { label: 'Contact Us', path: '/contact' } ] };
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(() => {
      const raw = generateContextualResponse(userMessage);
      const responseObj = (typeof raw === 'string') ? { text: raw } : raw;
      setMessages(prev => [...prev, { 
        text: responseObj.text, 
        actions: (responseObj as any).actions || undefined,
        sender: 'bot', 
        timestamp: new Date() 
      }]);
      setIsTyping(false);
    }, 900);
  };

  const handleActionClick = (path: string, label?: string) => {
    if (label) {
      setMessages(prev => [...prev, { text: `Opening ${label}...`, sender: 'bot', timestamp: new Date() }]);
    }
    // navigate to path
    navigate(path);
    // close chat if desired or keep open
    // setOpen(false);
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
                    { (msg as any).actions && (msg as any).actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(msg as any).actions.map((a: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(a.path, a.label)}
                            className="text-xs px-3 py-1 rounded-md bg-green-50 border border-green-200 text-green-700 hover:bg-green-100 transition-colors"
                          >
                            {a.label}
                          </button>
                        ))}
                      </div>
                    )}
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