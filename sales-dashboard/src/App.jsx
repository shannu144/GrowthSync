import React, { useState } from 'react';
import { sheetLeads } from './sheetData';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState('dash'); // 'dash' or 'leads'

  // Calculate stats dynamically from data
  const totalLeads = sheetLeads.length;
  const closedWonLeads = sheetLeads.filter(l => l.stage === 'Closed Won');
  const totalWonRevenue = closedWonLeads.reduce((sum, l) => sum + l.value, 0);
  const winRate = ((closedWonLeads.length / totalLeads) * 100).toFixed(1);
  const activePipelineValue = sheetLeads
    .filter(l => l.stage !== 'Closed Won' && l.stage !== 'Closed Lost')
    .reduce((sum, l) => sum + l.value, 0);
  const staleHighPriorityLeadsCount = sheetLeads
    .filter(l => l.priority === 'High' && l.stage !== 'Closed Won' && l.stage !== 'Closed Lost' && l.staleDays !== '-' && l.staleDays >= 10).length;

  return (
    <div className="app-container">
      {/* Header Area */}
      <header>
        <div className="title-area">
          <h1 className="text-gradient">Sales Pipeline Dashboard</h1>
          <p>Lead Pipeline Analysis & Rep Performance Tracking console (Task 3)</p>
        </div>
      </header>

      {/* Download/Deliverable Info Banner */}
      <div className="download-banner">
        <div className="download-banner-text">
          <strong>Task 3 Deliverable Active</strong>
          <span>A styled Microsoft Excel spreadsheet has been generated in your workspace. You can download it directly here.</span>
        </div>
        <a 
          href="https://github.com/shannu144/GrowthSync/raw/main/Task3_Lead_Pipeline_Dashboard.xlsx" 
          className="download-btn"
        >
          📥 Download Excel Sheet (.xlsx)
        </a>
      </div>

      {/* Excel Style Tabs */}
      <div className="excel-tab-bar">
        <button 
          className={`excel-tab-btn ${activeTab === 'dash' ? 'active' : ''}`}
          onClick={() => setActiveTab('dash')}
        >
          📊 Dashboard Tab
        </button>
        <button 
          className={`excel-tab-btn ${activeTab === 'leads' ? 'active' : ''}`}
          onClick={() => setActiveTab('leads')}
        >
          📋 Lead Data Tab (50 Rows)
        </button>
      </div>

      {/* Main Content Area */}
      <div className="excel-panel">
        {activeTab === 'dash' ? (
          // DASHBOARD TAB VIEW
          <div>
            <div className="excel-title-banner">
              <h2>SALES LEAD PIPELINE & PERFORMANCE DASHBOARD</h2>
              <p>Volopay Growth & Marketing Operations Console — Reference Date: July 14, 2026</p>
            </div>

            {/* KPI Cards Row 1 */}
            <div className="stats-grid">
              <div className="stat-card">
                <span className="stat-value">{totalLeads}</span>
                <span className="stat-label">TOTAL LEADS RECEIVED</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{closedWonLeads.length}</span>
                <span className="stat-label">CLOSED WON DEALS</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">{winRate}%</span>
                <span className="stat-label">WIN CONVERSION RATE</span>
              </div>
              <div className="stat-card">
                <span className="stat-value">${activePipelineValue.toLocaleString()}</span>
                <span className="stat-label">ACTIVE PIPELINE VALUE</span>
              </div>
            </div>

            {/* KPI Cards Row 2 */}
            <div className="stats-grid" style={{ gridTemplateColumns: '1fr 3fr' }}>
              <div className="stat-card" style={{ border: '1px solid rgba(239, 68, 68, 0.25)' }}>
                <span className="stat-value" style={{ color: 'var(--status-risk)' }}>{staleHighPriorityLeadsCount}</span>
                <span className="stat-label">HIGH PRIORITY STALE (&gt;10d)</span>
              </div>
              <div className="stat-card" style={{ background: '#e2efda', border: '1px solid #c6efce' }}>
                <span className="stat-value" style={{ color: '#1b4d3e' }}>${totalWonRevenue.toLocaleString()}</span>
                <span className="stat-label" style={{ color: '#2e7d32' }}>TOTAL WON REVENUE (ARR)</span>
              </div>
            </div>

            {/* Tables Grid */}
            <div className="tables-grid">
              <div className="table-card">
                <h4 className="table-card-title">📈 Acquisition Channel Performance</h4>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Channel</th>
                      <th>Leads Count</th>
                      <th>Won Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { ch: "LinkedIn", count: 12, rev: 153000 },
                      { ch: "Google Search", count: 12, rev: 355000 },
                      { ch: "Cold Outreach", count: 10, rev: 0 },
                      { ch: "Referral", count: 6, rev: 359000 },
                      { ch: "Partner", count: 6, rev: 287000 },
                      { ch: "Webinars", count: 4, rev: 0 }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.ch}</td>
                        <td style={{ textAlign: 'center' }}>{row.count}</td>
                        <td style={{ textAlign: 'right' }}>${row.rev.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 'bold', background: '#1e293b' }}>
                      <td>Total</td>
                      <td style={{ textAlign: 'center' }}>{totalLeads}</td>
                      <td style={{ textAlign: 'right' }}>${totalWonRevenue.toLocaleString()}</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div className="table-card">
                <h4 className="table-card-title">⏳ Pipeline Stage Distribution</h4>
                <table className="excel-table">
                  <thead>
                    <tr>
                      <th>Lead Stage</th>
                      <th>Deals Count</th>
                      <th>Total Value</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { st: "New", count: 7, val: 481000 },
                      { st: "Contacted", count: 7, val: 232000 },
                      { st: "Qualified", count: 4, val: 283000 },
                      { st: "Proposal", count: 8, val: 597000 },
                      { st: "Negotiation", count: 7, val: 546000 },
                      { st: "Closed Won", count: 17, val: 1254000 },
                      { st: "Closed Lost", count: 7, val: 446000 }
                    ].map((row, idx) => (
                      <tr key={idx}>
                        <td>{row.st}</td>
                        <td style={{ textAlign: 'center' }}>{row.count}</td>
                        <td style={{ textAlign: 'right' }}>${row.val.toLocaleString()}</td>
                      </tr>
                    ))}
                    <tr style={{ fontWeight: 'bold', background: '#1e293b' }}>
                      <td>Total</td>
                      <td style={{ textAlign: 'center' }}>{totalLeads}</td>
                      <td style={{ textAlign: 'right' }}>$3,839,000</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Action Items */}
            <div className="table-card" style={{ border: '1px solid rgba(239, 68, 68, 0.15)' }}>
              <h4 className="table-card-title" style={{ color: 'var(--status-risk)' }}>
                🚨 Urgent Action Items: Neglected & High-Priority Open Leads
              </h4>
              <table className="excel-table">
                <thead>
                  <tr>
                    <th>Company Name</th>
                    <th>Lead Owner</th>
                    <th>Deal Value</th>
                    <th>Days Stale</th>
                    <th>Priority</th>
                    <th>Recommended Action</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    { comp: "Jotunheim Cooling", owner: "Marcus Vance", val: 80000, stale: 90, pri: "High", act: "Re-attempt call with manager" },
                    { comp: "Hyperion Systems", owner: "Marcus Vance", val: 67000, stale: 75, pri: "Medium", act: "Cold outreach call" },
                    { comp: "Falcon Logistics", owner: "Chloe Patel", val: 72000, stale: 58, pri: "Low", act: "Introductory email" },
                    { comp: "Infinity Retail", owner: "Chloe Patel", val: 32000, stale: 45, pri: "Medium", act: "Try alternative contact" },
                    { comp: "Prime Movers", owner: "Chloe Patel", val: 90000, stale: 31, pri: "High", act: "Cold call follow-up" }
                  ].map((row, idx) => (
                    <tr key={idx}>
                      <td style={{ fontWeight: '600' }}>{row.comp}</td>
                      <td style={{ textAlign: 'center' }}>{row.owner}</td>
                      <td style={{ textAlign: 'right' }}>${row.val.toLocaleString()}</td>
                      <td style={{ textAlign: 'center', color: row.stale >= 30 ? 'var(--status-risk)' : 'orange', fontWeight: '600' }}>
                        {row.stale} days
                      </td>
                      <td style={{ textAlign: 'center' }}>
                        <span className={`health-badge ${row.pri === 'High' ? 'at-risk' : 'neutral'}`}>{row.pri}</span>
                      </td>
                      <td>{row.act}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Charts Section */}
            <div className="charts-grid">
              <div className="chart-card">
                <h4 className="chart-title">Won Revenue Contribution by Channel</h4>
                <div className="bar-chart-container">
                  {[
                    { label: "Referral", val: 359000, pct: 100 },
                    { label: "Google Search", val: 355000, pct: 98 },
                    { label: "Partner", val: 287000, pct: 80 },
                    { label: "LinkedIn", val: 153000, pct: 42 },
                    { label: "Webinars", val: 0, pct: 0 },
                    { label: "Cold Outreach", val: 0, pct: 0 }
                  ].map((row, idx) => (
                    <div key={idx} className="bar-chart-row">
                      <span className="bar-chart-label">{row.label}</span>
                      <div className="bar-chart-track">
                        <div className="bar-chart-fill" style={{ width: `${row.pct}%` }}></div>
                      </div>
                      <span className="bar-chart-val">${row.val.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="chart-card">
                <h4 className="chart-title">Leads Count by Pipeline Stage</h4>
                <div className="bar-chart-container">
                  {[
                    { label: "Closed Won", val: 17, pct: 100 },
                    { label: "Proposal", val: 8, pct: 47 },
                    { label: "Negotiation", val: 7, pct: 41 },
                    { label: "Contacted", val: 7, pct: 41 },
                    { label: "New", val: 7, pct: 41 },
                    { label: "Closed Lost", val: 7, pct: 41 },
                    { label: "Qualified", val: 4, pct: 23 }
                  ].map((row, idx) => (
                    <div key={idx} className="bar-chart-row">
                      <span className="bar-chart-label">{row.label}</span>
                      <div className="bar-chart-track">
                        <div className="bar-chart-fill" style={{ width: `${row.pct}%`, background: 'linear-gradient(to right, #10b981, #059669)' }}></div>
                      </div>
                      <span className="bar-chart-val">{row.val} deals</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          // RAW LEAD RECORDS GRID
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Displaying grid rows 1 to 50 (Full data set populated in workbook).
              </span>
              <span style={{ fontSize: '0.75rem', color: 'var(--status-good)', fontWeight: '600' }}>
                ⚡ Conditional Formatting Active
              </span>
            </div>

            <div className="excel-grid-container">
              <table className="excel-table">
                <thead>
                  {/* Excel Column Letters */}
                  <tr>
                    <th className="excel-row-num"></th>
                    <th className="excel-col-letter">A</th>
                    <th className="excel-col-letter">B</th>
                    <th className="excel-col-letter">C</th>
                    <th className="excel-col-letter">D</th>
                    <th className="excel-col-letter">E</th>
                    <th className="excel-col-letter">F</th>
                    <th className="excel-col-letter">G</th>
                    <th className="excel-col-letter">H</th>
                    <th className="excel-col-letter">I</th>
                    <th className="excel-col-letter">J</th>
                    <th className="excel-col-letter">K</th>
                    <th className="excel-col-letter">L</th>
                    <th className="excel-col-letter">M</th>
                    <th className="excel-col-letter">N</th>
                  </tr>
                  {/* Headers */}
                  <tr>
                    <th className="excel-row-num">1</th>
                    <th>Lead ID</th>
                    <th>Date Received</th>
                    <th>Company Name</th>
                    <th>Contact Person</th>
                    <th>Email</th>
                    <th>Lead Owner</th>
                    <th>Channel</th>
                    <th>Lead Stage</th>
                    <th>Priority</th>
                    <th>Deal Value</th>
                    <th>Last Contact</th>
                    <th>Days Stale</th>
                    <th>Next Action</th>
                    <th>Target Close Date</th>
                  </tr>
                </thead>
                <tbody>
                  {sheetLeads.map((row, idx) => {
                    const isWon = row.stage === 'Closed Won';
                    const isLost = row.stage === 'Closed Lost';
                    const isHigh = row.priority === 'High';
                    const isMed = row.priority === 'Medium';
                    
                    let stageStyle = {};
                    if (isWon) stageStyle = { color: '#6ee7b7', backgroundColor: 'rgba(16, 185, 129, 0.15)' };
                    if (isLost) stageStyle = { color: '#fda4af', backgroundColor: 'rgba(239, 68, 68, 0.15)' };
                    if (row.stage === 'Negotiation') stageStyle = { color: '#fde047', backgroundColor: 'rgba(245, 158, 11, 0.15)' };

                    let priorityStyle = {};
                    if (isHigh) priorityStyle = { color: '#fda4af', backgroundColor: 'rgba(239, 68, 68, 0.15)', fontWeight: 'bold' };
                    if (isMed) priorityStyle = { color: '#fde047', backgroundColor: 'rgba(245, 158, 11, 0.15)' };

                    return (
                      <tr key={idx}>
                        <td className="excel-row-num">{idx + 2}</td>
                        <td style={{ textAlign: 'center', fontFamily: 'monospace' }}>{row.id}</td>
                        <td style={{ textAlign: 'center' }}>{row.date}</td>
                        <td style={{ fontWeight: '600' }}>{row.company}</td>
                        <td>{row.contact}</td>
                        <td style={{ color: '#6366f1' }}>{row.email}</td>
                        <td style={{ textAlign: 'center' }}>{row.owner}</td>
                        <td style={{ textAlign: 'center' }}>{row.channel}</td>
                        <td style={{ textAlign: 'center', ...stageStyle }}>{row.stage}</td>
                        <td style={{ textAlign: 'center', ...priorityStyle }}>{row.priority}</td>
                        <td style={{ textAlign: 'right', fontWeight: isWon ? '600' : 'normal' }}>
                          ${row.value.toLocaleString()}
                        </td>
                        <td style={{ textAlign: 'center' }}>{row.lastContact}</td>
                        <td style={{ 
                          textAlign: 'center', 
                          color: row.staleDays !== '-' && row.staleDays >= 15 ? 'var(--status-risk)' : row.staleDays !== '-' && row.staleDays >= 8 ? 'orange' : 'inherit'
                        }}>{row.staleDays}</td>
                        <td>{row.nextAction}</td>
                        <td style={{ textAlign: 'center' }}>{row.closeDate}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
