export const mockCustomers = [
  {
    id: "acme-corp",
    name: "Acme Corp",
    domain: "acme.co",
    industry: "Enterprise Software",
    healthStatus: "At Risk",
    healthScore: 42,
    contractValue: 75000,
    renewalDate: "2026-09-10",
    accountOwner: "Sarah Jenkins",
    region: "Europe",
    logoText: "AC",
    crmData: {
      dealStage: "Closed Won",
      winDate: "2025-09-10",
      companySize: "450 employees",
      billingContact: "finance@acme.co",
      notes: "Expanded in Q1 to add EU division. High expectations for API reliability."
    },
    supportTickets: [
      {
        id: "TICK-908",
        date: "2026-07-12",
        status: "Open",
        priority: "High",
        category: "Technical / API",
        title: "API latency spikes in EU-West production",
        description: "Our automated reconciliation endpoint is timing out (504 Gateway Timeout) on batch requests over 100 items. This is blocking our daily ledger syncing.",
        sentiment: "Negative"
      },
      {
        id: "TICK-904",
        date: "2026-07-10",
        status: "Open",
        priority: "High",
        category: "Billing / Card Payments",
        title: "Auto-debit failure for transaction clearing",
        description: "The linked bank account clearing failed twice this week, causing corporate card declines for our marketing team. We have sufficient funds, so this is on the processor side.",
        sentiment: "Negative"
      },
      {
        id: "TICK-871",
        date: "2026-07-02",
        status: "Resolved",
        priority: "Medium",
        category: "Access Control",
        title: "Unable to invite new finance operator",
        description: "The invite email link is redirecting back to the login page without creating the account. Resolved by clearing cookies and re-inviting.",
        sentiment: "Neutral"
      }
    ],
    communications: [
      {
        id: "msg-101",
        timestamp: "2026-07-13T16:45:00Z",
        source: "Email",
        sender: "Arthur Pendelton (CFO, Acme Corp)",
        recipient: "Sarah Jenkins",
        subject: "RE: API Performance issues",
        body: "Sarah, this is becoming a critical business blocker for us. If the API latency in Europe and the random card declines aren't resolved by next week, we will be forced to look at alternative expense management platforms. Our finance team cannot spend three hours a day manually exporting CSV files.",
        sentiment: "Highly Negative"
      },
      {
        id: "msg-102",
        timestamp: "2026-07-11T10:15:00Z",
        source: "Slack",
        sender: "Arthur Pendelton (CFO, Acme Corp)",
        recipient: "Sarah Jenkins",
        body: "Sarah, we just had another card decline for our Google Ads billing account. It's a $15k limit card with $10k available. Can you check this immediately? It's halting our marketing campaign.",
        sentiment: "Negative"
      },
      {
        id: "msg-103",
        timestamp: "2026-07-05T14:20:00Z",
        source: "Slack",
        sender: "Sarah Jenkins (Volopay CSM)",
        recipient: "Arthur Pendelton",
        body: "Hi Arthur, following up on your ticket about the finance operator invite. Glad to see it was resolved! I've escalated the API sync issue to our core engineering team and will update you soon.",
        sentiment: "Friendly"
      }
    ],
    productUsage: {
      weeklyActiveUsers: [140, 125, 95, 60], // last 4 weeks (decreasing)
      licenseSeatsUsed: 45,
      licenseSeatsTotal: 100,
      licenseUtilization: 45,
      modulesActive: {
        corporateCards: true,
        billPay: true,
        reimbursements: false,
        erpSync: true
      },
      apiCallsPerDay: [12000, 11000, 8000, 2500] // last 4 weeks drop
    },
    aiSummary: "Acme Corp is at critical churn risk. They are experiencing severe API latency issues blocking ledger sync in Europe, alongside payment processing card declines. As a result, product usage has dropped by 57% and API calls have collapsed. The CFO has explicitly threatened to cancel their contract (renewing in 2 months) if issues are not resolved by next week.",
    aiAnalysis: {
      risks: [
        "Contract Churn Risk: CFO explicitly stated they are looking at alternatives due to stability issues.",
        "Technical Blockers: Ongoing 504 timeouts on the ledger reconciliation API in EU.",
        "Transactional Errors: Card auto-debit failures causing decline of critical marketing expenses."
      ],
      opportunities: [
        "Reimbursement Module Upsell: They are not utilizing the reimbursements flow which could centralize their employee expense claims.",
        "API Tier Upgrade: If latency is due to batch size, moving them to a dedicated rate-limit tier could solve the issue permanently."
      ],
      nextBestAction: "CFO Escalation: Arrange an emergency call with Sarah Jenkins, the Volopay Technical Director, and Acme CFO Arthur Pendelton today. Waive the platform fee for the next billing cycle as a goodwill gesture while engineering deploys the API patch."
    }
  },
  {
    id: "beta-labs",
    name: "BetaLabs",
    domain: "betalabs.io",
    industry: "Biotech & Healthcare",
    healthStatus: "Good",
    healthScore: 94,
    contractValue: 24000,
    renewalDate: "2026-12-15",
    accountOwner: "David Chen",
    region: "North America",
    logoText: "BL",
    crmData: {
      dealStage: "Closed Won",
      winDate: "2025-12-15",
      companySize: "75 employees",
      billingContact: "ap@betalabs.io",
      notes: "Fast-growing biotech startup. Heavy card usage for lab supplies."
    },
    supportTickets: [
      {
        id: "TICK-765",
        date: "2026-06-20",
        status: "Resolved",
        priority: "Low",
        category: "Card Request",
        title: "Increase daily card limit for purchasing",
        description: "Need to purchase lab equipment costing $8,500. Current daily limit is $5,000. Resolved by CSM updating limit temporarily.",
        sentiment: "Neutral"
      },
      {
        id: "TICK-650",
        date: "2026-05-14",
        status: "Resolved",
        priority: "Low",
        category: "Accounting Sync",
        title: "QuickBooks export missing tax codes",
        description: "QuickBooks sync failed to pull custom tax codes. Solved by mapping tax keys in settings.",
        sentiment: "Neutral"
      }
    ],
    communications: [
      {
        id: "msg-201",
        timestamp: "2026-07-14T09:30:00Z",
        source: "Slack",
        sender: "Clara Oswald (Finance Manager, BetaLabs)",
        recipient: "David Chen",
        body: "Hi David! The team is loving the physical cards, and our lab managers are finding the invoice-matching tool incredibly helpful. We are onboarding 15 new researchers next week and will need physical cards for all of them. Can we upgrade our license tier today?",
        sentiment: "Highly Positive"
      },
      {
        id: "msg-202",
        timestamp: "2026-07-10T11:00:00Z",
        source: "Email",
        sender: "Clara Oswald (Finance Manager, BetaLabs)",
        recipient: "David Chen",
        subject: "Feedback on the Reimbursements portal",
        body: "Hi David, just wanted to let you know that our out-of-pocket claims approval cycle time has dropped from 5 days to under 2 hours since moving to Volopay. The mobile app UI makes it super easy for our field researchers.",
        sentiment: "Positive"
      }
    ],
    productUsage: {
      weeklyActiveUsers: [42, 45, 48, 49], // steady growth
      licenseSeatsUsed: 49,
      licenseSeatsTotal: 50,
      licenseUtilization: 98,
      modulesActive: {
        corporateCards: true,
        billPay: true,
        reimbursements: true,
        erpSync: true
      },
      apiCallsPerDay: [3500, 3700, 4000, 4250]
    },
    aiSummary: "BetaLabs is in excellent health. They have achieved near-perfect license utilization (98%), showing steady active user growth. Their finance manager has expressed high satisfaction with the physical cards and invoice-matching tool. They have requested an upgrade to add 15 new users for an onboarding cohort starting next week.",
    aiAnalysis: {
      risks: [
        "License Cap: Currently at 49/50 licenses. Any new users will fail to onboard unless they upgrade immediately."
      ],
      opportunities: [
        "Tier Expansion: Active request to expand seat count. High probability of expanding ARR by $8k+.",
        "Lab Spend Integration: They are using physical cards for high-value lab supplies. Opportunity to introduce Bill Pay with vendor bank integrations to handle invoice clearing for raw materials."
      ],
      nextBestAction: "Upgrade Proposal: David Chen should send a license expansion proposal (from 50 to 100 seats) and arrange a short call to showcase how Volopay's vendor Bill Pay can automate their high-value supplier invoices."
    }
  },
  {
    id: "apex-logistics",
    name: "Apex Logistics",
    domain: "apexlogistics.com",
    industry: "Logistics & Supply Chain",
    healthStatus: "Neutral",
    healthScore: 71,
    contractValue: 120000,
    renewalDate: "2027-04-18",
    accountOwner: "Marcus Vance",
    region: "Asia Pacific",
    logoText: "AL",
    crmData: {
      dealStage: "Closed Won",
      winDate: "2026-04-18",
      companySize: "1,200 employees",
      billingContact: "accounts.payable@apexlogistics.com",
      notes: "Large logistics company. Signed contract for card management. High potential, but conservative finance operations."
    },
    supportTickets: [
      {
        id: "TICK-882",
        date: "2026-07-08",
        status: "Open",
        priority: "Low",
        category: "Feature Request / UI",
        title: "Minor typo in invoice PDF report export",
        description: "The export PDF has a minor spacing error on the total sum row in landscape mode.",
        sentiment: "Neutral"
      },
      {
        id: "TICK-802",
        date: "2026-06-25",
        status: "Resolved",
        priority: "Medium",
        category: "Card Delivery",
        title: "Delay in physical card courier delivery",
        description: "Cards for the Singapore branch are delayed in customs. Marcus assisted in resending tracking and resolving custom clearance.",
        sentiment: "Neutral"
      }
    ],
    communications: [
      {
        id: "msg-301",
        timestamp: "2026-07-12T08:15:00Z",
        source: "Email",
        sender: "Kenji Sato (VP of Ops, Apex Logistics)",
        recipient: "Marcus Vance",
        subject: "Re: Volopay onboarding milestones",
        body: "Hi Marcus, the fuel card program is running smoothly. The drivers are using the cards without issue. However, we haven't had time to look at the NetSuite ERP sync or the employee reimbursement module yet. We are short-staffed this quarter and will push integration to Q4.",
        sentiment: "Neutral"
      },
      {
        id: "msg-302",
        timestamp: "2026-06-28T09:40:00Z",
        source: "Slack",
        sender: "Marcus Vance (Volopay CSM)",
        recipient: "Kenji Sato",
        body: "Hi Kenji, hope the cards arrived safely in Singapore. Let me know when your AP team has 30 minutes to review the automated expense matching. It could save them about 15 hours a week.",
        sentiment: "Friendly"
      }
    ],
    productUsage: {
      weeklyActiveUsers: [40, 42, 38, 41], // flat active user count
      licenseSeatsUsed: 40,
      licenseSeatsTotal: 150,
      licenseUtilization: 26,
      modulesActive: {
        corporateCards: true,
        billPay: false,
        reimbursements: false,
        erpSync: false
      },
      apiCallsPerDay: [500, 520, 490, 510]
    },
    aiSummary: "Apex Logistics is stable but significantly underutilized. Out of 150 purchased licenses, they have only deployed 40 (26% utilization) solely for a regional fuel card program. Core modules like ERP Sync (NetSuite) and Reimbursements are completely inactive. The VP of Ops cited short-staffing as the reason for delaying integration.",
    aiAnalysis: {
      risks: [
        "Low Adoption: 26% seat usage creates a down-sell or churn risk at the 1-year mark because they aren't seeing the platform's full value.",
        "Integration Delay: Postponing the ERP sync prevents the automated matching engine from proving its ROI."
      ],
      opportunities: [
        "NetSuite Sync Rollout: The client uses NetSuite. Activating this integration would automate ledger entries and lock in retention.",
        "Reimbursement onboarding: Onboarding their general office staff for expense reports would consume the remaining 110 licenses."
      ],
      nextBestAction: "Assisted Implementation Support: Marcus Vance should offer a complimentary implementation engineering resource to handle the NetSuite ERP mapping for them, removing the internal staffing bottleneck and driving product adoption."
    }
  }
];
