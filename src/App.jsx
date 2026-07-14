import React, { useState, useEffect, useRef } from 'react';
import { mockCustomers } from './mockData';
import './App.css';

// Initial CS Action items checklist for mock data
const defaultChecklists = {
  'acme-corp': [
    { id: 'acme-1', text: "Schedule emergency call with Arthur Pendelton (CFO)", done: false },
    { id: 'acme-2', text: "Escalate 504 API timeouts to engineering lead", done: false },
    { id: 'acme-3', text: "Issue 15% platform credit for the next invoice cycle", done: false }
  ],
  'beta-labs': [
    { id: 'beta-1', text: "Send seat expansion contract (50 to 100 seats)", done: false },
    { id: 'beta-2', text: "Demo vendor Bill Pay tool to Clara Oswald", done: false },
    { id: 'beta-3', text: "Follow up on physical card courier dispatch", done: false }
  ],
  'apex-logistics': [
    { id: 'apex-1', text: "Offer complimentary tech engineer for NetSuite mapping", done: false },
    { id: 'apex-2', text: "Schedule onboarding sync about fuel card program", done: false },
    { id: 'apex-3', text: "Send QuickBooks comparison documentation", done: false }
  ]
};

function App() {
  const [selectedCustomerId, setSelectedCustomerId] = useState('acme-corp');
  const [searchQuery, setSearchQuery] = useState('');
  const [healthFilter, setHealthFilter] = useState('All');
  const [activeTab, setActiveTab] = useState('summary');
  
  // Interactive Checklist State
  const [checklists, setChecklists] = useState(() => {
    const saved = localStorage.getItem('cs_checklists');
    return saved ? JSON.parse(saved) : defaultChecklists;
  });

  // Timeline feed filter state
  const [feedFilter, setFeedFilter] = useState('all');

  // Settings / API Key State
  const [showSettings, setShowSettings] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || '');
  const [isApiKeyValid, setIsApiKeyValid] = useState(!!apiKey);
  
  // Chat States (keyed by customer id)
  const [customerChats, setCustomerChats] = useState({
    'acme-corp': [
      { sender: 'assistant', text: "Hello! I am your AI Customer Success Assistant. I've aggregated Acme Corp's Zoho CRM details, Slack threads, emails, and Zendesk tickets. Ask me anything about their account status, technical issues, or risk level." }
    ],
    'beta-labs': [
      { sender: 'assistant', text: "Hi! I'm ready to discuss BetaLabs. They are doing great! Ask me about their license usage or expansion request." }
    ],
    'apex-logistics': [
      { sender: 'assistant', text: "Hello! I can help you analyze Apex Logistics. They are currently underutilizing their contract. Ask me about their NetSuite integration status or adoption metrics." }
    ]
  });
  
  const [chatInput, setChatInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const chatEndRef = useRef(null);

  // Auto-save checklists
  useEffect(() => {
    localStorage.setItem('cs_checklists', JSON.stringify(checklists));
  }, [checklists]);

  // Auto scroll chat to bottom
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [customerChats, selectedCustomerId, isTyping]);

  const selectedCustomer = mockCustomers.find(c => c.id === selectedCustomerId) || mockCustomers[0];

  // Calculated Stats for Dashboard Overview
  const totalValue = mockCustomers.reduce((acc, curr) => acc + curr.contractValue, 0);
  const riskCount = mockCustomers.filter(c => c.healthStatus === 'At Risk').length;
  const expansionCount = mockCustomers.filter(c => c.productUsage.licenseUtilization >= 85).length;
  const avgHealth = Math.round(mockCustomers.reduce((acc, curr) => acc + curr.healthScore, 0) / mockCustomers.length);

  // Filtered Customer List
  const filteredCustomers = mockCustomers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          customer.domain.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = healthFilter === 'All' || customer.healthStatus === healthFilter;
    return matchesSearch && matchesFilter;
  });

  // Checklist handler
  const handleToggleChecklist = (customerId, itemId) => {
    setChecklists(prev => {
      const updatedList = prev[customerId].map(item => {
        if (item.id === itemId) {
          return { ...item, done: !item.done };
        }
        return item;
      });
      return {
        ...prev,
        [customerId]: updatedList
      };
    });
  };

  // Get customer specific sentiment trend metrics
  const getCustomerSentimentMetric = (customer) => {
    if (customer.id === 'acme-corp') {
      return { score: 25, label: "Severely Strained", color: "var(--status-risk)", details: "CFO explicitly threatened churn due to 504 API errors and card declines." };
    } else if (customer.id === 'beta-labs') {
      return { score: 95, label: "Highly Positive", color: "var(--status-good)", details: "Finance Manager highly praised invoice matching and requested license upgrades." };
    } else {
      return { score: 60, label: "Neutral / Passive", color: "var(--status-neutral)", details: "Usage is running fine but feature expansion delayed due to internal staffing." };
    }
  };

  // Handle Save API Key
  const handleSaveApiKey = (e) => {
    e.preventDefault();
    localStorage.setItem('gemini_api_key', apiKey);
    setIsApiKeyValid(!!apiKey);
    setShowSettings(false);
  };

  const handleClearApiKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsApiKeyValid(false);
  };

  // Mock answers if API key is not present
  const getMockAnswer = (question, customer) => {
    const q = question.toLowerCase();
    
    if (customer.id === 'acme-corp') {
      if (q.includes('risk') || q.includes('churn') || q.includes('why') || q.includes('health')) {
        return `Acme Corp is at critical risk (Health Score: 42/100) due to:
1. **API Latency Spikes**: 504 timeouts are blocking daily ledger syncing for their European team.
2. **Payment Failures**: Card auto-debit failure is causing decline of their Google Ads campaign budget ($15k limit).
3. **CFO Churn Threat**: Arthur Pendelton (CFO) explicitly stated in an email that if issues are not resolved by next week, they will look at alternative platforms.`;
      }
      if (q.includes('action') || q.includes('recommend') || q.includes('do next')) {
        return `Here is the recommended Next Best Action for Acme Corp:
1. **Escalation Call**: Set up an emergency technical meeting with Sarah Jenkins (CSM), Volopay Technical Director, and Arthur Pendelton (CFO) today.
2. **Financial Concession**: Proactively waive next month's platform fee to build goodwill while engineering deploys the API patch.
3. **Engineering Support**: Assign a dedicated engineer to audit the 504 timeouts on their European reconciliation endpoint.`;
      }
      if (q.includes('ticket') || q.includes('support') || q.includes('issue')) {
        return `Acme Corp has 2 active high-priority support tickets:
- **TICK-908 (Technical/API)**: API latency spikes in EU-West production causing 504 timeouts on batch requests.
- **TICK-904 (Billing/Cards)**: Auto-debit clearing failures causing card declines for marketing spends.
They also have a resolved ticket, TICK-871, regarding a finance operator invite redirect issue.`;
      }
      if (q.includes('usage') || q.includes('active') || q.includes('adoption')) {
        return `Acme Corp's product usage is falling steeply:
- **Weekly Active Users**: Dropped from 140 WAU down to 60 WAU over the last 4 weeks (a 57% decline).
- **API Traffic**: Daily API calls plummeted from 12k down to 2.5k.
- **License Utilization**: 45% (45 seats used out of 100).
This collapse is driven by their engineering and billing blockers.`;
      }
    }
    
    if (customer.id === 'beta-labs') {
      if (q.includes('opportunity') || q.includes('upgrade') || q.includes('expand') || q.includes('grow')) {
        return `BetaLabs is in excellent health (Score: 94) and presents a prime expansion opportunity:
1. **Active Expansion Request**: Onboarding 15 new researchers next week and needs seats immediately.
2. **Seat Shortage**: Currently using 49 out of 50 seats (98% utilization).
3. **ARR Increase**: Proposing a tier upgrade can increase ARR by an estimated $8k+.`;
      }
      if (q.includes('action') || q.includes('do next') || q.includes('recommend')) {
        return `Next Best Action for BetaLabs:
1. **Upgrade Proposal**: Send a seat limit increase proposal (from 50 to 100 seats) immediately.
2. **Cross-sell Bill Pay**: Clara Oswald (Finance Manager) loves the cards. David Chen should schedule a 15-minute demo of Volopay's vendor Bill Pay to automate their lab raw material purchases.`;
      }
      if (q.includes('usage') || q.includes('active')) {
        return `BetaLabs product adoption is outstanding:
- **Active Users**: Growing steadily from 42 to 49 WAU.
- **License Utilization**: 98% (49/50 seats filled).
- **Active Modules**: Corporate cards, Bill Pay, Reimbursements, and ERP sync are all active and utilized.`;
      }
    }

    if (customer.id === 'apex-logistics') {
      if (q.includes('risk') || q.includes('churn') || q.includes('underutilized') || q.includes('why')) {
        return `Apex Logistics is stable (Health: 71) but represents a major down-sell risk:
1. **Low Adoption**: Using only 40 out of 150 purchased licenses (26% utilization).
2. **Inactive Modules**: ERP Sync (NetSuite) and Reimbursements are completely inactive.
3. **Staffing Bottleneck**: The VP of Ops (Kenji Sato) indicated they want to integrate but are too short-staffed this quarter.`;
      }
      if (q.includes('action') || q.includes('do next') || q.includes('recommend')) {
        return `Next Best Action for Apex Logistics:
1. **Integration Support**: Proactively offer a free technical implementation resource from Volopay to map their NetSuite ERP sync. This will bypass their short-staffing bottleneck.
2. **Fuel Card Success**: Highlight the success of their fuel program and show how automating expense reconciliation adds more value.`;
      }
    }

    // Default Fallback Response
    return `I've analyzed the logs for ${customer.name}. They operate in the ${customer.industry} industry, managed by ${customer.accountOwner}.
- Health Score: ${customer.healthScore}/100 (${customer.healthStatus})
- Contract Value: $${customer.contractValue.toLocaleString()}/yr
- Latest Signal: ${customer.aiAnalysis.nextBestAction}
Try asking about their "support tickets", "usage trends", "next actions", or "risk level" for a deep-dive analysis.`;
  };

  // Run AI Query (Gemini or Mock)
  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!chatInput.trim()) return;

    const userText = chatInput;
    setChatInput('');

    // Append user message
    const currentChat = customerChats[selectedCustomerId] || [];
    setCustomerChats(prev => ({
      ...prev,
      [selectedCustomerId]: [...currentChat, { sender: 'user', text: userText }]
    }));

    setIsTyping(true);

    try {
      if (apiKey) {
        // Query Gemini API dynamically!
        const systemPrompt = `You are a customer success AI assistant. You are analyzing customer support logs, CRM data, emails, and product metrics.
Below is the unified dataset for the customer named "${selectedCustomer.name}":
${JSON.stringify(selectedCustomer, null, 2)}

Answer the user's question about this customer. Be concise, direct, professional, and act on the actual data provided. Avoid marketing speak. Focus on risk signals, opportunities, and operational details.`;

        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [
              {
                role: 'user',
                parts: [{ text: `${systemPrompt}\n\nUser Question: ${userText}` }]
              }
            ]
          })
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          const googleMessage = errorData.error?.message || `HTTP ${response.status}`;
          throw new Error(`Gemini API Error: ${googleMessage}`);
        }

        const data = await response.json();
        const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to analyze that data. Please try again.";

        setCustomerChats(prev => ({
          ...prev,
          [selectedCustomerId]: [...(prev[selectedCustomerId] || []), { sender: 'assistant', text: aiText }]
        }));
      } else {
        // Fallback to rules-based smart mock response
        await new Promise(resolve => setTimeout(resolve, 800)); // simulate latency
        const responseText = getMockAnswer(userText, selectedCustomer);
        setCustomerChats(prev => ({
          ...prev,
          [selectedCustomerId]: [...(prev[selectedCustomerId] || []), { sender: 'assistant', text: responseText }]
        }));
      }
    } catch (err) {
      console.error(err);
      // Fallback in case of API failure
      setCustomerChats(prev => ({
        ...prev,
        [selectedCustomerId]: [
          ...(prev[selectedCustomerId] || []),
          { sender: 'assistant', text: `Error connecting to Gemini API (${err.message}). Falling back to local intelligence:\n\n` + getMockAnswer(userText, selectedCustomer) }
        ]
      }));
    } finally {
      setIsTyping(false);
    }
  };

  const handleQuickQuestion = (questionText) => {
    setChatInput(questionText);
    // Submit in next tick
    setTimeout(() => {
      const sendBtn = document.getElementById('chat-submit-btn');
      sendBtn?.click();
    }, 50);
  };

  const getQuickQuestions = () => {
    if (selectedCustomerId === 'acme-corp') {
      return ["Why are they at risk?", "What support tickets are open?", "What is the next best action?"];
    } else if (selectedCustomerId === 'beta-labs') {
      return ["Why is their health score high?", "Tell me about their expansion request.", "What is their license usage?"];
    } else {
      return ["What is blocking their onboarding?", "Why is usage underutilized?", "Show me the next action plan."];
    }
  };

  const sentimentData = getCustomerSentimentMetric(selectedCustomer);

  // Filter chronological feed items based on filter choice
  const rawTimelineItems = [
    ...selectedCustomer.supportTickets.map(t => ({ ...t, feedType: 'ticket', sortDate: new Date(t.date) })),
    ...selectedCustomer.communications.map(c => ({ ...c, feedType: c.source.toLowerCase(), sortDate: new Date(c.timestamp) }))
  ].sort((a, b) => b.sortDate - a.sortDate);

  const filteredTimelineItems = rawTimelineItems.filter(item => {
    if (feedFilter === 'all') return true;
    if (feedFilter === 'email') return item.feedType === 'email';
    if (feedFilter === 'slack') return item.feedType === 'slack';
    if (feedFilter === 'ticket') return item.feedType === 'ticket';
    return true;
  });

  return (
    <div className="app-container">
      {/* Sidebar Panel */}
      <aside className="sidebar">
        <div className="sidebar-header">
          <div className="logo-icon">VP</div>
          <span className="logo-text">GrowthSync AI</span>
        </div>

        <div className="sidebar-filters">
          <input 
            type="text" 
            placeholder="Search accounts..." 
            className="search-input"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <div className="filter-pills">
            {['All', 'Good', 'Neutral', 'At Risk'].map((status) => (
              <button
                key={status}
                onClick={() => setHealthFilter(status)}
                className={`filter-pill ${healthFilter === status ? 'active' : ''}`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        <div className="customer-list-container">
          {filteredCustomers.length === 0 ? (
            <div style={{ padding: '20px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.8rem' }}>
              No accounts match filter
            </div>
          ) : (
            filteredCustomers.map((customer) => {
              const statusClass = customer.healthStatus.toLowerCase().replace(' ', '-');
              const isActive = customer.id === selectedCustomerId;
              return (
                <div 
                  key={customer.id} 
                  className={`customer-card ${isActive ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedCustomerId(customer.id);
                    setActiveTab('summary');
                    setFeedFilter('all');
                  }}
                >
                  <div className={`customer-avatar ${statusClass}`}>
                    {customer.logoText}
                  </div>
                  <div className="customer-card-info">
                    <div className="customer-card-name">{customer.name}</div>
                    <div className="customer-card-sub">{customer.domain}</div>
                    <div className="customer-card-meta">
                      <span className="customer-card-value">${customer.contractValue.toLocaleString()}/yr</span>
                      <span className={`health-badge ${statusClass}`}>{customer.healthStatus}</span>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="sidebar-footer">
          <button className="settings-btn" onClick={() => setShowSettings(true)}>
            ⚙️ AI Settings
          </button>
          <span style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>v1.1.0</span>
        </div>
      </aside>

      {/* Main Panel */}
      <main className="main-dashboard">
        <header className="dashboard-header">
          <div className="dashboard-title-area">
            <h2 className="text-gradient">Unified Customer Context</h2>
            <p>Consolidated analysis from Zoho CRM, Slack, Support Tickets, and Platform Usage</p>
          </div>
          
          <div className="api-status">
            {isApiKeyValid ? (
              <span className="api-status-tag">
                <span className="pulse-dot"></span> Dynamic Gemini AI Active
              </span>
            ) : (
              <span className="api-status-tag inactive" onClick={() => setShowSettings(true)} style={{ cursor: 'pointer' }}>
                ⚠️ Mock Data Mode (Click to connect Gemini)
              </span>
            )}
          </div>
        </header>

        {/* Aggregate Stats Bar */}
        <section className="stats-grid">
          <div className="stat-card glass-panel">
            <div className="stat-icon-box blue">💼</div>
            <div className="stat-info">
              <span className="stat-value">${totalValue.toLocaleString()}</span>
              <span className="stat-label">Total Contract Value (ARR)</span>
            </div>
          </div>
          
          <div className="stat-card glass-panel">
            <div className="stat-icon-box red">⚠️</div>
            <div className="stat-info">
              <span className="stat-value">{riskCount}</span>
              <span className="stat-label">Accounts At Churn Risk</span>
            </div>
          </div>
          
          <div className="stat-card glass-panel">
            <div className="stat-icon-box green">🚀</div>
            <div className="stat-info">
              <span className="stat-value">{expansionCount}</span>
              <span className="stat-label">Expansion Opportunities</span>
            </div>
          </div>

          <div className="stat-card glass-panel">
            <div className="stat-icon-box cyan">📈</div>
            <div className="stat-info">
              <span className="stat-value">{avgHealth}%</span>
              <span className="stat-label">Average Health Index</span>
            </div>
          </div>
        </section>

        {/* Tabs Bar */}
        <div className="tabs-container">
          <button 
            className={`tab-btn ${activeTab === 'summary' ? 'active' : ''}`}
            onClick={() => setActiveTab('summary')}
          >
            ✨ AI Summary & Action
          </button>
          <button 
            className={`tab-btn ${activeTab === 'crm' ? 'active' : ''}`}
            onClick={() => setActiveTab('crm')}
          >
            📋 Zoho CRM Profile
          </button>
          <button 
            className={`tab-btn ${activeTab === 'timeline' ? 'active' : ''}`}
            onClick={() => setActiveTab('timeline')}
          >
            ⚡ Integration Activity Feed ({filteredTimelineItems.length})
          </button>
          <button 
            className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            📊 Product Usage
          </button>
          <button 
            className={`tab-btn ${activeTab === 'chat' ? 'active' : ''}`}
            onClick={() => setActiveTab('chat')}
          >
            💬 Chat with Account Logs
          </button>
        </div>

        {/* Tab Detail Contents */}
        <div className="tab-content-panel">
          {activeTab === 'summary' && (
            <div className="summary-grid">
              <div className="summary-main-col">
                {/* AI Executive Summary */}
                <div className="glass-panel ai-box">
                  <h3 className="card-title" style={{ color: '#a5b4fc' }}>🤖 AI Executive Context Summary</h3>
                  <p className="ai-summary-text">{selectedCustomer.aiSummary}</p>
                </div>

                {/* Signals & Alerts Grid */}
                <div className="signals-grid">
                  <div className="glass-panel signal-col">
                    <h3 className="card-title" style={{ color: '#fda4af' }}>🔴 Risk Signals</h3>
                    <ul className="signal-list">
                      {selectedCustomer.aiAnalysis.risks.map((risk, index) => (
                        <li key={index} className="signal-item risk">
                          <span className="signal-dot"></span>
                          <span>{risk}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className="glass-panel signal-col">
                    <h3 className="card-title" style={{ color: '#6ee7b7' }}>🟢 Expansion Opportunities</h3>
                    <ul className="signal-list">
                      {selectedCustomer.aiAnalysis.opportunities.map((opp, index) => (
                        <li key={index} className="signal-item opportunity">
                          <span className="signal-dot"></span>
                          <span>{opp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Recommended Action & Checklist */}
                <div className="glass-panel action-box">
                  <h3 className="card-title" style={{ color: '#86efac' }}>🎯 Recommended Next Best Action Checklist</h3>
                  <p className="action-content" style={{ fontWeight: '600', marginBottom: '8px' }}>
                    {selectedCustomer.aiAnalysis.nextBestAction}
                  </p>
                  
                  <div className="action-checklist">
                    {(checklists[selectedCustomerId] || []).map((item) => (
                      <label 
                        key={item.id} 
                        className={`action-checkbox-item ${item.done ? 'checked' : ''}`}
                      >
                        <input 
                          type="checkbox" 
                          checked={item.done}
                          onChange={() => handleToggleChecklist(selectedCustomerId, item.id)}
                        />
                        <span>{item.text}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar Account Info */}
              <div className="summary-side-col">
                <div className="glass-panel info-card">
                  <h3 className="card-title">Account Details</h3>
                  <div className="info-grid">
                    <div className="info-row">
                      <span className="info-label">Account Owner</span>
                      <span className="info-val">{selectedCustomer.accountOwner}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Annual Value (ARR)</span>
                      <span className="info-val" style={{ color: '#86efac' }}>${selectedCustomer.contractValue.toLocaleString()}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Renewal Date</span>
                      <span className="info-val">{selectedCustomer.renewalDate}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Health Score</span>
                      <span className={`info-val`} style={{ 
                        color: selectedCustomer.healthScore >= 80 ? 'var(--status-good)' : 
                               selectedCustomer.healthScore >= 60 ? 'var(--status-neutral)' : 'var(--status-risk)'
                      }}>{selectedCustomer.healthScore} / 100</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Region</span>
                      <span className="info-val">{selectedCustomer.region}</span>
                    </div>
                  </div>
                </div>

                {/* Sentiment Trend Indicator Panel */}
                <div className="glass-panel info-card">
                  <h3 className="card-title" style={{ color: '#06b6d4' }}>🗣️ Account Sentiment Trend</h3>
                  <div style={{ marginTop: '10px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem' }}>
                      <span style={{ color: 'var(--text-secondary)' }}>Trend Index:</span>
                      <strong style={{ color: sentimentData.color }}>{sentimentData.label}</strong>
                    </div>
                    
                    <div className="sentiment-meter">
                      <span>😢</span>
                      <div className="sentiment-bar-bg">
                        <div 
                          className="sentiment-bar-fill" 
                          style={{ 
                            width: `${sentimentData.score}%`, 
                            backgroundColor: sentimentData.color 
                          }}
                        ></div>
                      </div>
                      <span>😊</span>
                    </div>

                    <p style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginTop: '12px', lineHeight: '1.4' }}>
                      {sentimentData.details}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'crm' && (
            <div className="crm-details-panel">
              <div className="glass-panel info-card">
                <h3 className="card-title" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '10px' }}>CRM Company Information</h3>
                <div className="info-grid" style={{ marginTop: '16px' }}>
                  <div className="info-row">
                    <span className="info-label">Legal Entity</span>
                    <span className="info-val">{selectedCustomer.name}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Domain</span>
                    <span className="info-val">{selectedCustomer.domain}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Company Size</span>
                    <span className="info-val">{selectedCustomer.crmData.companySize}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Industry</span>
                    <span className="info-val">{selectedCustomer.industry}</span>
                  </div>
                </div>
              </div>

              <div className="glass-panel info-card">
                <h3 className="card-title" style={{ borderBottom: '1px solid var(--card-border)', paddingBottom: '10px' }}>Contract Details</h3>
                <div className="info-grid" style={{ marginTop: '16px' }}>
                  <div className="info-row">
                    <span className="info-label">Deal Stage</span>
                    <span className="info-val" style={{ color: 'var(--status-good)' }}>{selectedCustomer.crmData.dealStage}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Win Date</span>
                    <span className="info-val">{selectedCustomer.crmData.winDate}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">Primary Billing Contact</span>
                    <span className="info-val" style={{ color: '#22d3ee' }}>{selectedCustomer.crmData.billingContact}</span>
                  </div>
                  <div className="info-row">
                    <span className="info-label">CRM Sales Notes</span>
                    <span className="info-val" style={{ fontWeight: '400', fontSize: '0.8rem', textAlign: 'right', maxWidth: '60%' }}>
                      {selectedCustomer.crmData.notes}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'timeline' && (
            <div>
              <div className="feed-filter-row">
                <button 
                  className={`feed-filter-btn ${feedFilter === 'all' ? 'active' : ''}`}
                  onClick={() => setFeedFilter('all')}
                >
                  ⚡ All Channels ({rawTimelineItems.length})
                </button>
                <button 
                  className={`feed-filter-btn ${feedFilter === 'email' ? 'active' : ''}`}
                  onClick={() => setFeedFilter('email')}
                >
                  ✉️ Emails Only ({rawTimelineItems.filter(i => i.feedType === 'email').length})
                </button>
                <button 
                  className={`feed-filter-btn ${feedFilter === 'slack' ? 'active' : ''}`}
                  onClick={() => setFeedFilter('slack')}
                >
                  💬 Slack Only ({rawTimelineItems.filter(i => i.feedType === 'slack').length})
                </button>
                <button 
                  className={`feed-filter-btn ${feedFilter === 'ticket' ? 'active' : ''}`}
                  onClick={() => setFeedFilter('ticket')}
                >
                  🎫 Tickets Only ({rawTimelineItems.filter(i => i.feedType === 'ticket').length})
                </button>
              </div>

              {filteredTimelineItems.length === 0 ? (
                <div style={{ padding: '40px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                  No interactions match selected channel filter
                </div>
              ) : (
                <div className="timeline-feed">
                  {filteredTimelineItems.map((item, idx) => {
                    if (item.feedType === 'ticket') {
                      return (
                        <div key={`ticket-${item.id}-${idx}`} className="timeline-item">
                          <div className="timeline-marker ticket"></div>
                          <div className="glass-panel timeline-card">
                            <div className="timeline-card-header">
                              <span className="timeline-source ticket">🎫 Ticket {item.id} - {item.category}</span>
                              <span className="timeline-date">{item.date}</span>
                            </div>
                            <div className="timeline-subject">
                              {item.title} (Priority: <span style={{ color: item.priority === 'High' ? '#ef4444' : '#f59e0b' }}>{item.priority}</span>)
                            </div>
                            <div className="timeline-body">{item.description}</div>
                            <div style={{ marginTop: '10px', fontSize: '0.75rem', display: 'flex', gap: '15px' }}>
                              <span style={{ color: item.status === 'Open' ? '#fda4af' : '#6ee7b7' }}>● Status: {item.status}</span>
                              <span style={{ color: 'var(--text-secondary)' }}>Sentiment: {item.sentiment}</span>
                            </div>
                          </div>
                        </div>
                      );
                    } else {
                      return (
                        <div key={`msg-${item.id}-${idx}`} className="timeline-item">
                          <div className={`timeline-marker ${item.feedType}`}></div>
                          <div className="glass-panel timeline-card">
                            <div className="timeline-card-header">
                              <span className={`timeline-source ${item.feedType}`}>
                                {item.feedType === 'email' ? '✉️ Email' : '💬 Slack Thread'}
                              </span>
                              <span className="timeline-date">
                                {new Date(item.timestamp).toLocaleDateString()} {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                              </span>
                            </div>
                            {item.subject && <div className="timeline-subject">{item.subject}</div>}
                            <div className="timeline-sender">From: <strong>{item.sender}</strong></div>
                            <div className="timeline-body">"{item.body}"</div>
                            <div style={{ marginTop: '10px', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                              Sentiment: {item.sentiment || 'Neutral'}
                            </div>
                          </div>
                        </div>
                      );
                    }
                  })}
                </div>
              )}
            </div>
          )}

          {activeTab === 'usage' && (
            <div className="usage-grid">
              <div className="glass-panel usage-metric-card">
                <h3 className="card-title">Weekly Active Users (Last 4 Weeks)</h3>
                <div className="usage-bars">
                  {selectedCustomer.productUsage.weeklyActiveUsers.map((users, idx) => {
                    const max = Math.max(...selectedCustomer.productUsage.weeklyActiveUsers, 10);
                    const heightPercent = (users / max) * 100;
                    return (
                      <div key={idx} className="usage-bar-wrapper">
                        <span style={{ fontSize: '0.75rem', fontWeight: '600' }}>{users}</span>
                        <div className="usage-bar" style={{ height: `${heightPercent}%` }}></div>
                        <span className="usage-bar-label">Wk {4 - idx}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="glass-panel usage-metric-card">
                <h3 className="card-title">Contract License Utilization</h3>
                <div style={{ padding: '20px 0', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '8px' }}>
                      <span>Seats Assigned</span>
                      <strong>{selectedCustomer.productUsage.licenseSeatsUsed} / {selectedCustomer.productUsage.licenseSeatsTotal}</strong>
                    </div>
                    <div style={{ width: '100%', height: '12px', background: 'rgba(255,255,255,0.05)', borderRadius: '6px', overflow: 'hidden' }}>
                      <div style={{ 
                        width: `${selectedCustomer.productUsage.licenseUtilization}%`, 
                        height: '100%', 
                        background: selectedCustomer.productUsage.licenseUtilization >= 90 ? 'var(--status-risk)' : 
                                    selectedCustomer.productUsage.licenseUtilization >= 70 ? 'var(--status-good)' : 'var(--accent-primary)',
                        borderRadius: '6px'
                      }}></div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '6px' }}>
                      <span>Utilization Rate</span>
                      <span>{selectedCustomer.productUsage.licenseUtilization}%</span>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px solid var(--card-border)', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '10px' }}>Active Modules</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                        <span>{selectedCustomer.productUsage.modulesActive.corporateCards ? '🟢' : '⚫'}</span>
                        <span>Corporate Cards</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                        <span>{selectedCustomer.productUsage.modulesActive.billPay ? '🟢' : '⚫'}</span>
                        <span>Bill Pay</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                        <span>{selectedCustomer.productUsage.modulesActive.reimbursements ? '🟢' : '⚫'}</span>
                        <span>Reimbursements</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.8rem' }}>
                        <span>{selectedCustomer.productUsage.modulesActive.erpSync ? '🟢' : '⚫'}</span>
                        <span>ERP Sync (NetSuite)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'chat' && (
            <div className="chat-container">
              <div className="chat-history">
                {(customerChats[selectedCustomerId] || []).map((msg, idx) => (
                  <div key={idx} className={`chat-message ${msg.sender}`}>
                    <div style={{ whiteSpace: 'pre-wrap' }}>{msg.text}</div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="chat-message assistant">
                    <div className="typing-indicator">
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                      <div className="typing-dot"></div>
                    </div>
                  </div>
                )}
                <div ref={chatEndRef} />
              </div>

              <div className="chat-quick-questions">
                {getQuickQuestions().map((q, idx) => (
                  <button 
                    key={idx} 
                    className="quick-question-pill"
                    onClick={() => handleQuickQuestion(q)}
                  >
                    {q}
                  </button>
                ))}
              </div>

              <form onSubmit={handleSendMessage} className="chat-input-area">
                <input
                  type="text"
                  placeholder="Ask a question about this account..."
                  className="chat-input"
                  value={chatInput}
                  onChange={(e) => setChatInput(e.target.value)}
                  disabled={isTyping}
                />
                <button 
                  type="submit" 
                  id="chat-submit-btn" 
                  className="chat-send-btn"
                  disabled={isTyping}
                >
                  Send
                </button>
              </form>
            </div>
          )}
        </div>
      </main>

      {/* Settings Modal */}
      {showSettings && (
        <div className="modal-overlay">
          <div className="modal-card glass-panel" style={{ background: '#0f172a', border: '1px solid #334155' }}>
            <div className="modal-header">
              <h3 className="text-gradient" style={{ fontSize: '1.2rem', fontWeight: '700' }}>AI Assistant Settings</h3>
              <button className="modal-close-btn" onClick={() => setShowSettings(false)}>×</button>
            </div>
            
            <form onSubmit={handleSaveApiKey}>
              <div className="form-group">
                <label className="form-label">Google Gemini API Key</label>
                <input
                  type="password"
                  placeholder="AIzaSy..."
                  className="form-input"
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
                <p className="form-hint">
                  Connecting your API key enables dynamic, open-ended question answering about customer records. 
                  If left blank, the app will fall back to smart local mock matching.
                </p>
              </div>

              <div className="modal-footer">
                {isApiKeyValid && (
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={handleClearApiKey} 
                    style={{ marginRight: 'auto', color: '#f87171' }}
                  >
                    Clear Key
                  </button>
                )}
                <button type="button" className="btn-secondary" onClick={() => setShowSettings(false)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Settings
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
