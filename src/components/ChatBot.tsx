import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // added useLocation
import { Send, MessageCircle, X, Bot, User, Leaf, MapPin, Calendar, Star, DollarSign, BarChart3 } from 'lucide-react';
import { tours as siteTours } from '@/data/tours';
import { destinations as siteDestinations } from '@/data/destinations';
import { siteContent } from '@/data/siteContent';
import Fuse from 'fuse.js';

const ChatBot = ({ tours = [], selectedCountry = null, currentFilters = {} }) => {
  const navigate = useNavigate();
  const location = useLocation(); // NEW: track route so we can scan page content
  // fall back to embedded data if parent doesn't pass tours
  const allTours = (tours && tours.length > 0) ? tours : siteTours;
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      text: "Hey there! 🧭 I'm your Dirt Trails travel intelligence guide. I can help with partner programs, distribution, sustainability and travel tech — ask me anything below.",
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

  // NEW: store a combined dynamic index (site content + destinations + tours + scanned page content)
  const [combinedIndex, setCombinedIndex] = useState<any[]>([]);

  // NEW: count of tours to display in header (attempt DOM read on /tours, fallback to data)
  const [tourCount, setTourCount] = useState<number>((tours && tours.length > 0) ? tours.length : allTours.length);

  // NEW: extract visible content from the current page to include in search results
  const scanPageContent = (): { title: string; path: string; content: string } | null => {
    try {
      const path = window.location.pathname + window.location.search;
      // prefer a page H1, then document.title, then path
      const title = (document.querySelector('h1')?.textContent || document.title || path).trim();
      // try a series of containers that usually contain main page text
      const containerSelectors = ['main', 'article', 'section', '#root', 'body'];
      let contentText = '';
      for (const sel of containerSelectors) {
        const el = document.querySelector(sel);
        if (el) {
          // get visible text only
          const txt = (el as HTMLElement).innerText || el.textContent || '';
          if (txt && txt.trim().length > 20) {
            contentText = txt.trim();
            break;
          }
        }
      }
      if (!contentText) {
        contentText = (document.body && (document.body.innerText || document.body.textContent) || '').trim();
      }
      if (!contentText) return null;
      // clamp size to avoid extremely large items
      const snippet = contentText.replace(/\s+/g, ' ').slice(0, 3000);
      return { title, path, content: snippet };
    } catch (err) {
      console.error('scanPageContent error', err);
      return null;
    }
  };

  // NEW: rebuild combined index when chat opens or route changes
  useEffect(() => {
    if (!open) return; // only scan when chat is open (optional)
    const pageItem = scanPageContent();

    // convert tours & destinations into simple index entries
    const tourItems = allTours.map(t => ({
      title: t.name,
      path: `/tours/${t.slug}`,
      content: `${t.tagline || ''}\n${t.description || ''}`.trim()
    }));

    const destItems = siteDestinations.map(d => ({
      title: d.name,
      path: `/destinations/${d.slug}`,
      content: `${d.shortDescription || ''}\n${d.description || ''}`.trim()
    }));

    // siteContent (pages) already exists — keep as-is
    const pageItems = siteContent.map(p => ({
      title: p.title,
      path: p.path,
      content: p.content || ''
    }));

    const merged = [
      ...pageItems,
      ...tourItems,
      ...destItems,
      // include scanned page content as highest-priority item for the current path
      ...(pageItem ? [pageItem] : [])
    ];
    setCombinedIndex(merged);
  }, [location.pathname, open]); // regenerate when route changes or chat opens

  // NEW: compute tourCount when route, open state or tours data change
  useEffect(() => {
    const computeCount = () => {
      // prefer DOM-based count on the tours page so we reflect what's rendered on that page
      if (typeof window !== 'undefined' && location.pathname.startsWith('/tours')) {
        try {
          const selectors = ['[data-tour-item]', '.tour-card', '.tour-list-item', '.tour'];
          for (const sel of selectors) {
            const found = document.querySelectorAll(sel);
            if (found && found.length > 0) return found.length;
          }
        } catch (err) {
          // ignore DOM errors and fall back to data
        }
        // fallback to total known tours
        return allTours.length;
      }
      // not on tours page: prefer passed-in tours (could be filtered), otherwise total site tours
      return (tours && tours.length > 0) ? tours.length : allTours.length;
    };

    setTourCount(computeCount());
  }, [location.pathname, open, tours, allTours]);

  // --- NEW: conversation persistence & context tracking ---
  const STORAGE_KEY = 'dirt_trails_chat_history_v1';

  // conversation context used to resolve short follow-ups and pronouns
  const [conversationContext, setConversationContext] = useState<{ lastUser?: string; lastBot?: string; topic?: string }>({});

  // Load saved conversation on mount
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        if (Array.isArray(saved) && saved.length > 0) {
          setMessages(saved.map((m: any) => ({ ...m, timestamp: new Date(m.timestamp) })));
        }
      }
    } catch (err) {
      // ignore parse errors
      console.error('ChatBot load error', err);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Save conversation and update context whenever messages change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages));
    } catch (err) {
      console.error('ChatBot save error', err);
    }

    // derive a tiny context from the latest messages for follow-ups
    if (messages && messages.length) {
      const lastUser = [...messages].reverse().find(m => m.sender === 'user') as any;
      const lastBot = [...messages].reverse().find(m => m.sender === 'bot') as any;
      const lastUserText = lastUser ? String(lastUser.text).trim() : undefined;
      const lastBotText = lastBot ? String(lastBot.text).trim() : undefined;

      // infer a simple topic keyword from last user text or last bot text
      const inferTopic = (text?: string) => {
        if (!text) return undefined;
        const t = text.toLowerCase();
        if (/(kenya|uganda|tanzania|rwanda)/.test(t)) return t.match(/kenya|uganda|tanzania|rwanda/)?.[0];
        if (/(price|cost|budget|cheap|expensive)/.test(t)) return 'price';
        if (/(wildlife|animals|lion|elephant|big five)/.test(t)) return 'wildlife';
        if (/(duration|days|long|short)/.test(t)) return 'duration';
        if (/(book|booking|reserve|availability)/.test(t)) return 'booking';
        return undefined;
      };

      const topic = inferTopic(lastUserText) || inferTopic(lastBotText);

      setConversationContext({ lastUser: lastUserText, lastBot: lastBotText, topic });
    }
  }, [messages]);

  // small helper to format bot responses consistently
  const friendlyWrap = (text: string, options: { prefix?: boolean; suffix?: boolean } = {}) => {
    const prefix = options.prefix ? "Happy to help! " : "";
    const suffix = options.suffix ? " If you'd like, I can open any page for you." : "";
    return `${prefix}${text}${suffix}`;
  };

  const searchApiUrl = import.meta.env.VITE_CHATBOT_SEARCH_API_URL;
  const searchApiKey = import.meta.env.VITE_CHATBOT_SEARCH_API_KEY;

  const performExternalLookup = async (query: string) => {
    if (!searchApiUrl) return null;
    try {
      const headers: Record<string, string> = { 'Content-Type': 'application/json' };
      if (searchApiKey) headers.Authorization = `Bearer ${searchApiKey}`;
      const response = await fetch(searchApiUrl, {
        method: 'POST',
        headers,
        body: JSON.stringify({ query })
      });
      if (!response.ok) return null;
      const payload = await response.json();
      if (!payload?.results || !Array.isArray(payload.results)) return null;
      return payload.results.slice(0, 3).map((res: any) => ({
        title: res.title || res.snippet?.slice(0, 60) || query,
        url: res.url,
        snippet: res.snippet || res.excerpt || ''
      }));
    } catch (err) {
      console.error('ChatBot external lookup error:', err);
      return null;
    }
  };

  const openPath = (path: string) => {
    if (path.startsWith('http')) {
      window.open(path, '_blank', 'noopener');
    } else {
      navigate(path);
    }
  };
  // --- end new region ---

  const generateContextualResponse = async (userMessage: string) => {
    // --- UPDATED: resolve follow-ups/pronouns using conversationContext ---
    let enrichedMessage = userMessage || '';
    const qraw = (userMessage || '').toLowerCase();

    // If user uses short follow-ups or pronouns, prepend last user or topic to give context to the search logic
    const pronounPattern = /\b(it|this|that|they|them|those|he|she|it is|is it)\b/;
    if ((enrichedMessage.trim().length < 4 || pronounPattern.test(qraw)) && conversationContext.lastUser) {
      enrichedMessage = `${conversationContext.lastUser}. ${enrichedMessage}`;
    } else if ((enrichedMessage.trim().length < 4 || pronounPattern.test(qraw)) && conversationContext.topic) {
      enrichedMessage = `${conversationContext.topic} ${enrichedMessage}`;
    }

    const q = enrichedMessage.toLowerCase();
    const relevantTours = selectedCountry ? allTours.filter(t => t.country === selectedCountry) : allTours;

    // Basic site metadata
    const companyName = 'Dirt Trails';
    const companyTagline = 'A travel intelligence platform for operators, partners and premium experiences';

    // NEW: handle comparative / "why choose us" questions with a specific, human reply
    if (/\b(why (should )?i choose|why choose|why pick (us|dirt trails)|why dirt trails|why (us|dirt trails)|why us|what makes (you|dirt trails) different|what sets (you|dirt trails) apart|better than other|how are you different)\b/.test(q)) {
      const points = [
        "Travel technology expertise — we help operators, partners and suppliers coordinate bookings, distribution and partner workflows with clarity.",
        "Partner-first delivery — our platform supports local operators, destination collaborators and supplier networks across East Africa.",
        "Data-driven growth — we provide market insight, pricing guidance and research support to help you launch premium products.",
        "Sustainability and impact — we support responsible travel, reporting and conservation-aligned partner programs.",
        "Operational reliability — onboarding, integrations and ongoing support help keep your launch and operations running smoothly."
      ];

      const answer = `Great question — here's why travellers choose Dirt Trails Safaris:\n\n${points.map((p, i) => `${i+1}. ${p}`).join('\n\n')}\n\nIf you'd like, I can show our sustainability programs, top tours, or open the About page for more details.`;

      return {
        text: friendlyWrap(answer),
        actions: [
          { label: 'About Us', path: '/about' },
          { label: 'Tree Planting', path: '/environment/tree-planting' },
          { label: 'Carbon Offset', path: '/environment/carbon-offset' },
          { label: 'Browse Tours', path: '/tours' },
          { label: 'Contact Us', path: '/contact' }
        ]
      };
    }
    
    // Handle direct company identity / about questions first
    if (/\b(what('?| i)s the name|what('?| i)s this company|company name|who are you|what('?| i)s your name|what('?| i)s dirt trails|what do you do|what's dirt trails|whats dirt trails)\b/.test(q)) {
      return {
        text: friendlyWrap(`${companyName} — ${companyTagline}. We help operators, partners and suppliers with intelligent booking, distribution and sustainability tools.`),
        actions: [ { label: 'About Dirt Trails', path: '/about' }, { label: 'Contact Us', path: '/contact' } ]
      };
    }

    // travel intelligence definition
    if (/\b(travel intelligence|intelligent travel|travel intelligence platform|what is travel intelligence|whats travel intelligence|what's travel intelligence|define travel intelligence)\b/.test(q)) {
      return {
        text: friendlyWrap(`Travel intelligence at Dirt Trails is the blend of data, distribution automation and partner workflows that helps operators, agents and suppliers make smarter decisions. It combines booking insights, inventory control, route optimization, pricing guidance and sustainability tracking so teams can grow premium, reliable products with greater operational clarity.`),
        actions: [
          { label: 'About Us', path: '/about' },
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Contact Us', path: '/contact' }
        ]
      };
    }

    // travel tech definition
    if (/\b(travel tech|travel technology|what is travel tech|what's travel tech|whats travel tech|define travel tech)\b/.test(q)) {
      return {
        text: friendlyWrap(`Travel tech at Dirt Trails means the digital systems and intelligence that help operators, partners and destinations manage bookings, distribution, supplier workflows and sustainability reporting in one connected platform. It brings data, partner coordination and operational clarity together so travel teams can grow reliably.`),
        actions: [
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Contact Us', path: '/contact' },
          { label: 'About Dirt Trails', path: '/about' }
        ]
      };
    }

    // business model / revenue
    if (/\b(how do you make money|how do you earn|how do you generate revenue|business model|make money|revenue model|monetiz(e|ation))\b/.test(q)) {
      return {
        text: friendlyWrap(`Dirt Trails makes money by helping travel operators, partners and suppliers connect through our travel intelligence platform. We support revenue through partner enablement services, distribution and booking facilitation, premium technology integrations, and sustainability program partnerships that create value for operators and their guests.`),
        actions: [
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Contact Us', path: '/contact' }
        ]
      };
    }

    // target market / who do you serve
    if (/\b(who do you serve|who do you work with|who is your target market|who is the target market|what is your target market|who are your customers|who are your clients|who is dir trails for|who is dirt trails for|who do you serve|who do you help)\b/.test(q)) {
      return {
        text: friendlyWrap(`Dirt Trails serves travel operators, distribution partners, suppliers and destination teams. Our travel intelligence platform is built for partners who want better booking coordination, smarter distribution and measurable sustainability across premium travel products.`),
        actions: [
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Become a Partner', path: '/become-partner' },
          { label: 'About Dirt Trails', path: '/about' }
        ]
      };
    }

    // support for travel companies
    if (/\b(support my travel company|support my company|help my travel company|support travel company|support operators|help operators|help travel companies|partner with (us|dirt trails)|support (a )?travel business)\b/.test(q)) {
      return {
        text: friendlyWrap(`Dirt Trails helps travel companies by providing travel intelligence for bookings, distribution, partner workflows, pricing and sustainability. We connect operators with distribution partners, centralize supplier coordination, and surface actionable insights so companies can scale premium travel products with more operational confidence.`),
        actions: [
          { label: 'Become a Partner', path: '/become-partner' },
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Contact Us', path: '/contact' }
        ]
      };
    }

    // travel business owner guidance
    if (/\b(succeed|success|succed|grow|growth|scale|scaling|guide me|how do i|how can i|how to|tips|advice)\b/.test(q) && /\b(travel business owner|travel business|travel company owner|tour operator|tour operators|operator|operators|travel operator|travel operators|tour company|tour companies)\b/.test(q)) {
      return {
        text: friendlyWrap(`To succeed as a travel business owner, focus on building reliable partnerships, delivering premium experiences, and using travel intelligence to improve operations. Dirt Trails supports this with partner programs, distribution automation, price optimization, and sustainability tools so you can grow your business with more confidence and clarity.`),
        actions: [
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Become a Partner', path: '/become-partner' },
          { label: 'Contact Us', path: '/contact' }
        ]
      };
    }

    // key offerings
    if (/\b(key offerings|what do you offer|what are your offerings|what are your key offerings|services do you offer|services|offerings)\b/.test(q)) {
      return {
        text: friendlyWrap(`Dirt Trails offers a travel intelligence platform for partner programs, distribution, supplier coordination and sustainability. We help operators and partners improve booking performance, automate workflows, optimize pricing, and track impact across premium travel experiences.`),
        actions: [
          { label: 'Partner Programs', path: '/partners' },
          { label: 'Sustainability', path: '/sustainability' },
          { label: 'Contact Us', path: '/contact' }
        ]
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
        text: friendlyWrap(`💰 Prices typically range from $${min.toLocaleString()} to $${max.toLocaleString()}, average $${avg.toLocaleString()}. Here are some value options: \n${budgetTours.map(t=>`• ${t.name} - $${t.price.toLocaleString()}`).join('\n')}`),
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

    // Fuzzy search using Fuse.js across the dynamic combined index (includes scanned page content)
    if (q && q.length > 2) {
      try {
        const searchIndex = combinedIndex.length ? combinedIndex : siteContent; // fallback
        const fuse = new Fuse(searchIndex, {
          keys: ['title', 'content'],
          threshold: 0.35,
          includeMatches: true,
          ignoreLocation: true,
        });

        const results = fuse.search(q, { limit: 6 });

        // keep destFuse for the original destinations array to get structured destination items too
        const destFuse = new Fuse(siteDestinations, {
          keys: ['name', 'shortDescription', 'description'],
          threshold: 0.35,
          ignoreLocation: true,
        });
        const destResults = destFuse.search(q, { limit: 5 });

        if (results.length || destResults.length) {
          const actions: any[] = [];
          const summaries: string[] = [];

          results.slice(0, 2).forEach(r => {
            const item = (r as any).item;
            actions.push({ label: item.title, path: item.path });

            let excerpt = (item.content || '').slice(0, 180) + ((item.content || '').length > 180 ? '...' : '');
            const matches = (r as any).matches;
            if (matches && matches.length) {
              const match = matches[0];
              if (match.indices && match.indices.length) {
                const idx = match.indices[0][0];
                const start = Math.max(0, idx - 60);
                excerpt = (start > 0 ? '...' : '') + (item.content || '').slice(start, Math.min(start + 180, (item.content || '').length)) + ((item.content || '').length > start + 180 ? '...' : '');
              }
            }
            summaries.push(`${item.title}: ${excerpt}`);
          });

          destResults.slice(0, 2).forEach(d => {
            const item = (d as any).item;
            actions.push({ label: item.name, path: `/destinations/${item.slug}` });
            summaries.push(`${item.name}: ${item.shortDescription || item.description || ''}`);
          });

          const body = summaries.join('\n\n');
          return { text: friendlyWrap(`I found some relevant information for "${userMessage}":\n\n${body}`), actions };
        }
      } catch (err) {
        // fallback to previous behavior if Fuse throws for any reason
        console.error('ChatBot Fuse search error:', err);
      }
    }

    // try external lookup when local content doesn't match
    if (searchApiUrl) {
      const externalResults = await performExternalLookup(userMessage);
      if (externalResults && externalResults.length) {
        const primary = externalResults[0];
        const others = externalResults.slice(1).map(res => res.title).filter(Boolean);
        const actions = externalResults.map(res => ({ label: res.title, path: res.url }));
        const summary = `${primary.title}: ${primary.snippet || ''}`.trim();
        const additional = others.length ? ` I also found related articles on ${others.join(', ')}.` : '';
        const citationList = externalResults.map((res, index) => `${index + 1}. ${res.url}`).join('\n');
        return {
          text: friendlyWrap(`${summary}${additional} Sources:\n${citationList}`),
          actions
        };
      }
    }

    // default
    const defaultText = friendlyWrap(`I can search the website for answers about partner programs, distribution, sustainability and travel intelligence. Ask me a question and I will use the site content to answer.`);
    return { text: defaultText, actions: [ { label: 'Partner Programs', path: '/partners' }, { label: 'Contact Us', path: '/contact' } ] };
  };

  const simulateBotResponse = (userMessage: string) => {
    setIsTyping(true);
    setTimeout(async () => {
      const raw = await generateContextualResponse(userMessage);
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
    openPath(path);
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
    { text: "Partner programs", icon: DollarSign },
    { text: "Sustainability support", icon: Leaf },
    { text: "Travel tech", icon: BarChart3 },
    { text: "Explore solutions", icon: MapPin }
  ];

  const handleQuickAction = (actionText) => {
    setMessages(prev => [...prev, { text: actionText, sender: 'user', timestamp: new Date() }]);
    simulateBotResponse(actionText);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {open ? (
        <div className="bg-white shadow-2xl rounded-2xl w-96 h-[600px] flex flex-col overflow-hidden border-2 border-slate-200 transform transition-all duration-300 ease-out scale-100">
          {/* Header */}
          <div className="bg-slate-950 text-white p-4 flex justify-between items-center border-b border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center border border-slate-700">
                <Leaf className="w-5 h-5 text-slate-300" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Dirt Trails Assistant</h3>
                <p className="text-sm text-slate-300">Travel intelligence • {selectedCountry || 'All countries'}</p>
              </div>
            </div>
            <button 
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center hover:bg-slate-700 transition-colors duration-200 border border-slate-700"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 overflow-y-auto bg-slate-50 space-y-4 relative">
            {messages.map((msg, idx) => (
              <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} relative z-10`}>
                <div className={`flex items-start space-x-2 max-w-[85%] ${msg.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 border-2 ${
                    msg.sender === 'user' 
                      ? 'bg-slate-900 text-slate-100 border-slate-700' 
                      : 'bg-slate-200 text-slate-700 border-slate-300'
                  }`}>
                    {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Leaf className="w-4 h-4" />}
                  </div>
                  <div className="flex flex-col">
                    <div className={`px-4 py-3 rounded-2xl border ${
                      msg.sender === 'user' 
                        ? 'bg-slate-900 text-slate-100 rounded-br-sm border-slate-700 shadow-lg shadow-slate-900/10' 
                        : 'bg-white text-slate-900 rounded-bl-sm border-slate-200 shadow-sm'
                    }`}>
                      <p className="text-sm leading-relaxed font-medium whitespace-pre-line">{msg.text}</p>
                    </div>
                    <span className={`text-xs ${msg.sender === 'user' ? 'text-slate-500 text-right' : 'text-slate-400 text-left'} mt-1 font-medium`}>
                      {formatTime(msg.timestamp)}
                    </span>
                    { (msg as any).actions && (msg as any).actions.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-2">
                        {(msg as any).actions.map((a: any, i: number) => (
                          <button
                            key={i}
                            onClick={() => handleActionClick(a.path, a.label)}
                            className="text-xs px-3 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 hover:bg-slate-200 transition-colors"
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
                <p className="text-xs text-slate-500 font-semibold mb-2 text-center">Quick questions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleQuickAction(action.text)}
                      className="flex items-center space-x-2 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg border border-slate-200 text-slate-700 text-xs font-medium transition-colors duration-200"
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
                  <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 border-2 border-slate-300">
                    <Leaf className="w-4 h-4" />
                  </div>
                  <div className="bg-white px-4 py-3 rounded-2xl rounded-bl-sm shadow-sm border border-slate-200">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-500 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 bg-slate-100 border-t border-slate-200">
            <div className="flex items-center space-x-2">
              <input
                className="flex-1 border border-slate-300 rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-slate-400 focus:border-slate-400 transition-all duration-200 bg-white placeholder-slate-400 text-slate-900 font-medium"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="Ask about tours, partner programs, or sustainability support..."
                disabled={isTyping}
              />
              <button 
                className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center hover:bg-slate-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed border border-slate-700 shadow-sm"
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
          className="bg-slate-900 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 border border-slate-700"
          onClick={() => setOpen(true)}
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}
    </div>
  );
};

export default ChatBot;