import xlsxwriter
from datetime import datetime, timedelta

# Create the workbook
workbook = xlsxwriter.Workbook('Task3_Lead_Pipeline_Dashboard.xlsx')

# Set up formats
# 1. Colors & Styles
navy_dark = '#0f172a' # Tailwind slate-900
navy_light = '#1e293b' # Tailwind slate-800
slate_gray = '#64748b' # Tailwind slate-500
light_gray = '#f1f5f9' # Tailwind slate-100
border_color = '#cbd5e1' # Tailwind slate-300

# Title formats
title_format = workbook.add_format({
    'bold': True,
    'font_size': 18,
    'font_color': '#ffffff',
    'bg_color': navy_dark,
    'align': 'center',
    'valign': 'vcenter',
    'font_name': 'Segoe UI'
})

subtitle_format = workbook.add_format({
    'italic': True,
    'font_size': 10,
    'font_color': '#94a3b8',
    'bg_color': navy_dark,
    'align': 'center',
    'valign': 'vcenter',
    'font_name': 'Segoe UI'
})

# Header formats
section_format = workbook.add_format({
    'bold': True,
    'font_size': 12,
    'font_color': navy_dark,
    'bottom': 2,
    'bottom_color': navy_dark,
    'font_name': 'Segoe UI'
})

table_header_format = workbook.add_format({
    'bold': True,
    'font_size': 10,
    'font_color': '#ffffff',
    'bg_color': navy_light,
    'align': 'center',
    'valign': 'vcenter',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

# KPI Card formats
kpi_card_val_format = workbook.add_format({
    'bold': True,
    'font_size': 16,
    'font_color': navy_dark,
    'bg_color': '#f8fafc',
    'align': 'center',
    'valign': 'bottom',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

kpi_card_lbl_format = workbook.add_format({
    'font_size': 8.5,
    'font_color': slate_gray,
    'bg_color': '#f8fafc',
    'align': 'center',
    'valign': 'top',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

# Data cells formats
cell_left = workbook.add_format({
    'font_size': 10,
    'align': 'left',
    'valign': 'vcenter',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_center = workbook.add_format({
    'font_size': 10,
    'align': 'center',
    'valign': 'vcenter',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_currency = workbook.add_format({
    'font_size': 10,
    'align': 'right',
    'valign': 'vcenter',
    'num_format': '$#,##0',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_percent = workbook.add_format({
    'font_size': 10,
    'align': 'right',
    'valign': 'vcenter',
    'num_format': '0.0%',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_bold_currency = workbook.add_format({
    'bold': True,
    'font_size': 10,
    'align': 'right',
    'valign': 'vcenter',
    'num_format': '$#,##0',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_bold_num = workbook.add_format({
    'bold': True,
    'font_size': 10,
    'align': 'center',
    'valign': 'vcenter',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_bold_lbl = workbook.add_format({
    'bold': True,
    'font_size': 10,
    'align': 'left',
    'valign': 'vcenter',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

cell_date = workbook.add_format({
    'font_size': 10,
    'align': 'center',
    'valign': 'vcenter',
    'num_format': 'yyyy-mm-dd',
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

# Conditional alert formats (soft pastel fills)
alert_red = workbook.add_format({
    'bg_color': '#fecdd3', # Light rose
    'font_color': '#9f1239', # Dark rose
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

alert_green = workbook.add_format({
    'bg_color': '#d1fae5', # Light emerald
    'font_color': '#065f46', # Dark emerald
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

alert_orange = workbook.add_format({
    'bg_color': '#ffedd5', # Light orange
    'font_color': '#9a3412', # Dark orange
    'border': 1,
    'border_color': border_color,
    'font_name': 'Segoe UI'
})

# ----------------------------------------------------
# 2. CREATE "Lead Data" SHEET
# ----------------------------------------------------
data_sheet = workbook.add_worksheet('Lead Data')
data_sheet.hide_gridlines(0) # Show gridlines (0 is the default / show on screen and print)

# Headers for data sheet
headers = [
    "Lead ID", "Date Received", "Company Name", "Contact Person", 
    "Email", "Lead Owner", "Acquisition Channel", "Lead Stage", 
    "Priority", "Deal Value ($)", "Last Contact Date", "Days Since Last Contact", 
    "Next Action", "Target Close Date"
]

for col_num, header in enumerate(headers):
    data_sheet.write(0, col_num, header, table_header_format)

# Set column widths for data sheet
data_sheet.set_column('A:A', 10) # Lead ID
data_sheet.set_column('B:B', 14) # Date Received
data_sheet.set_column('C:C', 20) # Company Name
data_sheet.set_column('D:D', 16) # Contact Person
data_sheet.set_column('E:E', 24) # Email
data_sheet.set_column('F:F', 14) # Lead Owner
data_sheet.set_column('G:G', 18) # Acquisition Channel
data_sheet.set_column('H:H', 14) # Lead Stage
data_sheet.set_column('I:I', 10) # Priority
data_sheet.set_column('J:J', 14) # Deal Value
data_sheet.set_column('K:K', 16) # Last Contact Date
data_sheet.set_column('L:L', 22) # Days Since Last Contact
data_sheet.set_column('M:M', 28) # Next Action
data_sheet.set_column('N:N', 16) # Target Close Date

# 50 Rows of realistic sales data
# Base dates relative to current local time (July 14, 2026)
today = datetime(2026, 7, 14)

raw_data = [
    # ID, DateOffset, Company, Contact, Email, Owner, Channel, Stage, Priority, Value, LastContactOffset, NextAction, TargetCloseOffset
    ("L-1001", 1, "Acme Corp", "Arthur Pendelton", "arthur@acme.co", "Sarah Jenkins", "LinkedIn", "Closed Won", "High", 75000, 1, "Account Handover", 0),
    ("L-1002", 3, "BetaLabs", "Clara Oswald", "ap@betalabs.io", "David Chen", "LinkedIn", "Proposal", "High", 24000, 4, "Send contract addendum", 15),
    ("L-1003", 5, "Apex Logistics", "Kenji Sato", "kenji@apexlog.com", "Marcus Vance", "Partner", "Qualified", "Medium", 120000, 2, "Schedule NetSuite demo", 60),
    ("L-1004", 6, "CyberShield", "Evelyn Reed", "e.reed@cybershield.net", "Chloe Patel", "Google Search", "Closed Won", "High", 45000, 5, "Integrate banking API", 0),
    ("L-1005", 8, "Vortex Media", "Liam Carter", "liam@vortex.media", "David Chen", "Cold Outreach", "Negotiation", "High", 35000, 16, "Follow up on credit terms", 10),
    ("L-1006", 10, "Zeta Retail", "Sofia Martinez", "sofia@zetaretail.com", "Sarah Jenkins", "Referral", "New", "Medium", 18000, 10, "Initial discovery call", 45),
    ("L-1007", 12, "Quantum AI", "Ryan Sterling", "sterling@quantum.ai", "Chloe Patel", "Webinars", "Closed Lost", "Medium", 65000, 4, "Lost to competitor", 0),
    ("L-1008", 12, "CloudNexus", "Nolan Vance", "nolan@cloudnexus.io", "Marcus Vance", "Google Search", "Contacted", "High", 50000, 14, "Send pricing matrix", 30),
    ("L-1009", 14, "BioSphere", "Elena Rostova", "elena@biosphere.org", "Sarah Jenkins", "LinkedIn", "Closed Won", "Medium", 28000, 2, "Set up corporate cards", 0),
    ("L-1010", 15, "Nova Fleet", "Devon Cole", "d.cole@novafleet.co", "David Chen", "Cold Outreach", "Proposal", "High", 85000, 12, "Review custom card request", 12),
    ("L-1011", 16, "InnoTech", "Marcus Aurelius", "marcus@innotech.it", "Marcus Vance", "Referral", "Negotiation", "High", 95000, 18, "Approve billing agreement", 7),
    ("L-1012", 18, "Echo Travel", "Zoe Washburne", "zoe@echotravel.com", "Sarah Jenkins", "Google Search", "Closed Won", "Low", 15000, 1, "Completed onboarding", 0),
    ("L-1013", 20, "Delta FinTech", "Silas Stone", "stone@deltafin.io", "Chloe Patel", "Partner", "Contacted", "High", 110000, 15, "Resend security whitepaper", 35),
    ("L-1014", 21, "Titan Heavy", "Sarah Connor", "connor@titanheavy.com", "Marcus Vance", "Cold Outreach", "New", "Low", 60000, 21, "Book intro meeting", 60),
    ("L-1015", 22, "Matrix Group", "Thomas Anderson", "neo@matrix.co", "David Chen", "LinkedIn", "Proposal", "Medium", 40000, 8, "Send custom integration quote", 20),
    ("L-1016", 24, "Solaris Energy", "Dr. Kelvin", "kelvin@solaris.org", "Sarah Jenkins", "Webinars", "Closed Lost", "Low", 30000, 10, "Budget constraints", 0),
    ("L-1017", 25, "Starlight Corp", "Jane Doe", "jane@starlight.com", "Chloe Patel", "Google Search", "Closed Won", "Medium", 52000, 5, "Onboarding session 1", 0),
    ("L-1018", 26, "Omega Health", "James Watson", "watson@omega.health", "David Chen", "Referral", "Contacted", "Medium", 22000, 12, "Follow up after demo", 28),
    ("L-1019", 28, "Beacon Tech", "Bruce Wayne", "bruce@beacon.com", "Marcus Vance", "LinkedIn", "Proposal", "High", 140000, 20, "Finalize card limit terms", 8),
    ("L-1020", 30, "Astra Pharma", "Clara Barton", "barton@astrapharma.com", "Sarah Jenkins", "Partner", "Qualified", "Low", 70000, 7, "Send API docs", 50),
    ("L-1021", 31, "Prime Movers", "Tony Stark", "stark@primemovers.io", "Chloe Patel", "Cold Outreach", "New", "High", 90000, 31, "Cold call follow-up", 90),
    ("L-1022", 32, "Atlas Global", "Diana Prince", "diana@atlas.org", "David Chen", "Google Search", "Closed Won", "High", 130000, 2, "Activate multi-currency", 0),
    ("L-1023", 35, "Vanguard Law", "Harvey Specter", "specter@vanguard.law", "Marcus Vance", "Referral", "Negotiation", "High", 80000, 15, "Schedule legal review", 5),
    ("L-1024", 36, "Element Designs", "Peter Parker", "peter@element.co", "Sarah Jenkins", "LinkedIn", "Contacted", "Low", 12000, 6, "Send corporate card deck", 40),
    ("L-1025", 38, "Summit Ventures", "Lara Croft", "lara@summit.org", "Chloe Patel", "Webinars", "Qualified", "Medium", 55000, 8, "Schedule platform demo", 35),
    ("L-1026", 40, "Nexus Freight", "Han Solo", "han@nexusfreight.com", "Marcus Vance", "Partner", "Closed Lost", "High", 115000, 5, "Lost to local provider", 0),
    ("L-1027", 42, "Prism Creative", "Iris West", "iris@prism.io", "David Chen", "Google Search", "Closed Won", "Medium", 25000, 1, "Completed onboarding", 0),
    ("L-1028", 44, "Helix Labs", "Walter Bishop", "walter@helixlabs.co", "Sarah Jenkins", "LinkedIn", "Negotiation", "Medium", 60000, 9, "Send updated bill pay pricing", 14),
    ("L-1029", 45, "Infinity Retail", "Wanda Maximoff", "wanda@infinity.com", "Chloe Patel", "Cold Outreach", "New", "Medium", 32000, 45, "Try alternative contact", 75),
    ("L-1030", 45, "Apex Builders", "Bob Builder", "bob@apexbuilders.io", "Marcus Vance", "Referral", "Closed Won", "Low", 45000, 3, "Account set up finished", 0),
    ("L-1031", 46, "Core Consulting", "Arthur Dent", "dent@coreconsult.com", "David Chen", "Google Search", "Proposal", "Low", 20000, 14, "Send customized proposal", 21),
    ("L-1032", 48, "Stellar Ops", "Carol Danvers", "carol@stellarops.net", "Sarah Jenkins", "Partner", "Closed Won", "High", 105000, 1, "Assign card manager roles", 0),
    ("L-1033", 50, "Zephyr Aviation", "Hal Jordan", "jordan@zephyrav.com", "Chloe Patel", "LinkedIn", "Closed Lost", "Medium", 95000, 3, "Internal delay, deferred", 0),
    ("L-1034", 52, "Horizon Media", "Barry Allen", "barry@horizon.com", "Marcus Vance", "Cold Outreach", "Contacted", "High", 48000, 25, "Schedule follow-up call", 30),
    ("L-1035", 55, "Alpha Security", "John McClane", "john@alphasec.io", "David Chen", "Google Search", "Qualified", "Low", 38000, 10, "Send compliance checklist", 45),
    ("L-1036", 56, "Pioneer Biotech", "Reed Richards", "reed@pioneerbio.org", "Sarah Jenkins", "Referral", "Closed Won", "High", 125000, 2, "Setup NetSuite ERP integration", 0),
    ("L-1037", 58, "Falcon Logistics", "Sam Wilson", "sam@falcon.com", "Chloe Patel", "Partner", "New", "Low", 72000, 58, "Introductory email", 90),
    ("L-1038", 60, "Silver Lining", "Bruce Banner", "banner@silverlining.org", "Marcus Vance", "LinkedIn", "Closed Won", "Medium", 50000, 4, "Complete setup call", 0),
    ("L-1039", 60, "Genesis Digital", "Charles Xavier", "xavier@genesis.edu", "David Chen", "Webinars", "Proposal", "Medium", 42000, 11, "Follow up on invoice matching questions", 25),
    ("L-1040", 62, "Krypton Materials", "Clark Kent", "kent@krypton.com", "Sarah Jenkins", "Google Search", "Closed Won", "High", 150000, 3, "Setup high value clearing accounts", 0),
    ("L-1041", 65, "Dynasty Trade", "Alexis Carrington", "alexis@dynasty.co", "Chloe Patel", "Cold Outreach", "Negotiation", "Medium", 88000, 14, "Review contract adjustments", 10),
    ("L-1042", 68, "Sentinel Systems", "Trish Walker", "trish@sentinel.net", "Marcus Vance", "LinkedIn", "Closed Lost", "Medium", 55000, 2, "Selected cheaper provider", 0),
    ("L-1043", 70, "Polaris Retail", "Lorna Dane", "lorna@polaris.com", "David Chen", "Google Search", "Contacted", "Low", 26000, 15, "Send product brochure", 45),
    ("L-1044", 72, "Cascade Waters", "Arthur Curry", "curry@cascade.org", "Sarah Jenkins", "Referral", "Closed Won", "Medium", 34000, 1, "Completed setup", 0),
    ("L-1045", 74, "Odin Enterprises", "Loki Laufeyson", "loki@odin.org", "Chloe Patel", "Partner", "Proposal", "High", 160000, 19, "Send customized card limits spreadsheet", 8),
    ("L-1046", 75, "Hyperion Systems", "Mark Milton", "milton@hyperion.com", "Marcus Vance", "Cold Outreach", "New", "Medium", 67000, 75, "Cold outreach call", 60),
    ("L-1047", 78, "Valhalla Spirits", "Thor Odinson", "thor@valhalla.com", "David Chen", "LinkedIn", "Negotiation", "High", 110000, 12, "Confirm board approval date", 5),
    ("L-1048", 80, "Asgard Freight", "Heimdall Allsight", "heimdall@asgard.com", "Sarah Jenkins", "Google Search", "Closed Won", "Medium", 48000, 4, "Complete user profile upload", 0),
    ("L-1049", 82, "Midgard Metals", "Jane Foster", "jane@midgard.org", "Chloe Patel", "Webinars", "Closed Lost", "Low", 21000, 10, "Decided to keep manual processes", 0),
    ("L-1050", 90, "Jotunheim Cooling", "Laufey Frost", "laufey@jotunheim.com", "Marcus Vance", "Cold Outreach", "New", "High", 80000, 90, "Re-attempt call with manager", 90)
]

for row_idx, data in enumerate(raw_data, start=1):
    lead_id, date_offset, company, contact, email, owner, channel, stage, priority, value, last_contact_offset, next_action, target_close_offset = data
    
    # Calculate dates
    date_received = today - timedelta(days=date_offset)
    last_contact = today - timedelta(days=last_contact_offset)
    
    data_sheet.write(row_idx, 0, lead_id, cell_center)
    data_sheet.write_datetime(row_idx, 1, date_received, cell_date)
    data_sheet.write(row_idx, 2, company, cell_left)
    data_sheet.write(row_idx, 3, contact, cell_left)
    data_sheet.write(row_idx, 4, email, cell_left)
    data_sheet.write(row_idx, 5, owner, cell_center)
    data_sheet.write(row_idx, 6, channel, cell_center)
    data_sheet.write(row_idx, 7, stage, cell_center)
    
    # Write priority with format
    if priority == 'High':
        data_sheet.write(row_idx, 8, priority, alert_red)
    elif priority == 'Medium':
        data_sheet.write(row_idx, 8, priority, alert_orange)
    else:
        data_sheet.write(row_idx, 8, priority, cell_center)
        
    data_sheet.write(row_idx, 9, value, cell_currency)
    data_sheet.write_datetime(row_idx, 10, last_contact, cell_date)
    
    # Formula for Days Since Last Contact:
    # If Won or Lost, output "-"
    # Else: =DATE(2026,7,14) - K{row+1}
    excel_row = row_idx + 1
    formula = f'=IF(OR(H{excel_row}="Closed Won",H{excel_row}="Closed Lost"), "-", DATE(2026,7,14)-K{excel_row})'
    data_sheet.write_formula(row_idx, 11, formula, cell_center)
    
    data_sheet.write(row_idx, 12, next_action, cell_left)
    
    if target_close_offset > 0:
        target_close = today + timedelta(days=target_close_offset)
        data_sheet.write_datetime(row_idx, 13, target_close, cell_date)
    else:
        data_sheet.write(row_idx, 13, "-", cell_center)

# Add conditional formatting to Lead Stage column
# Closed Won -> Light Green, Closed Lost -> Light Red, Negotiation -> Light Yellow
data_sheet.conditional_format('H2:H51', {
    'type': 'cell', 'criteria': 'equal to', 'value': '"Closed Won"', 'format': alert_green
})
data_sheet.conditional_format('H2:H51', {
    'type': 'cell', 'criteria': 'equal to', 'value': '"Closed Lost"', 'format': alert_red
})
data_sheet.conditional_format('H2:H51', {
    'type': 'cell', 'criteria': 'equal to', 'value': '"Negotiation"', 'format': alert_orange
})


# ----------------------------------------------------
# 3. CREATE "Dashboard" SHEET
# ----------------------------------------------------
dash_sheet = workbook.add_worksheet('Dashboard')
dash_sheet.hide_gridlines(2) # Hide grid lines

# Set column widths to look like a clean UI
dash_sheet.set_column('A:A', 3)   # Margin space
dash_sheet.set_column('B:B', 18)  # Channel Label / Metric Label
dash_sheet.set_column('C:C', 15)  # Leads / Metric Val
dash_sheet.set_column('D:D', 15)  # Revenue / Space
dash_sheet.set_column('E:E', 4)   # Column gap
dash_sheet.set_column('F:F', 18)  # Stage Label
dash_sheet.set_column('G:G', 15)  # Stage Count
dash_sheet.set_column('H:H', 18)  # Stage Value
dash_sheet.set_column('I:I', 4)   # Column gap
dash_sheet.set_column('J:J', 18)  # Actions Company
dash_sheet.set_column('K:K', 14)  # Actions Owner
dash_sheet.set_column('L:L', 14)  # Actions Value
dash_sheet.set_column('M:M', 14)  # Actions Days Stale
dash_sheet.set_column('N:N', 24)  # Actions Next Step

# A. Header Banner (Merged B1:N2)
dash_sheet.merge_range('B1:N1', "SALES PIPELINE & LEAD MANAGEMENT DASHBOARD", title_format)
dash_sheet.merge_range('B2:N2', "Volopay Growth Squad Operational Console — Generated July 14, 2026", subtitle_format)

# B. KPI CARDS ROW (Row 4 & 5)
# Card 1: Total Leads (B4:C5)
dash_sheet.merge_range('B4:C4', "TOTAL LEADS RECEIVED", kpi_card_lbl_format)
dash_sheet.merge_range('B5:C5', "=COUNTA('Lead Data'!A2:A51)", kpi_card_val_format)

# Card 2: Closed Won Deals (D4:E5)
dash_sheet.merge_range('D4:E4', "CLOSED WON DEALS", kpi_card_lbl_format)
dash_sheet.merge_range('D5:E5', "=COUNTIF('Lead Data'!H2:H51, \"Closed Won\")", kpi_card_val_format)

# Card 3: Win Rate % (F4:G5)
dash_sheet.merge_range('F4:G4', "CONVERSION / WIN RATE", kpi_card_lbl_format)
dash_sheet.merge_range('F5:G5', "=D5/B5", workbook.add_format({
    'bold': True, 'font_size': 16, 'num_format': '0.0%', 'bg_color': '#f8fafc',
    'align': 'center', 'valign': 'bottom', 'border': 1, 'border_color': border_color, 'font_name': 'Segoe UI'
}))

# Card 4: Active Pipeline Value (H4:I5)
dash_sheet.merge_range('H4:I4', "ACTIVE PIPELINE VALUE", kpi_card_lbl_format)
dash_sheet.merge_range('H5:I5', "=SUMIFS('Lead Data'!J2:J51, 'Lead Data'!H2:H51, \"<>Closed Lost\", 'Lead Data'!H2:H51, \"<>Closed Won\")", workbook.add_format({
    'bold': True, 'font_size': 16, 'num_format': '$#,##0', 'bg_color': '#f8fafc',
    'align': 'center', 'valign': 'bottom', 'border': 1, 'border_color': border_color, 'font_name': 'Segoe UI'
}))

# Card 5: High Priority Stale Leads (J4:K5)
dash_sheet.merge_range('J4:K4', "HIGH PRIORITY STALE (>10d)", kpi_card_lbl_format)
# Count of High priority, where stage is not closed, and Days since last contact is > 10
# In excel: =COUNTIFS('Lead Data'!I2:I51, "High", 'Lead Data'!H2:H51, "<>Closed Won", 'Lead Data'!H2:H51, "<>Closed Lost", 'Lead Data'!L2:L51, ">10")
dash_sheet.merge_range('J5:K5', "=COUNTIFS('Lead Data'!I2:I51, \"High\", 'Lead Data'!H2:H51, \"<>Closed Won\", 'Lead Data'!H2:H51, \"<>Closed Lost\", 'Lead Data'!L2:L51, \">10\")", kpi_card_val_format)

# Card 6: Closed Won Revenue (L4:N5)
dash_sheet.merge_range('L4:N4', "TOTAL WON REVENUE (ARR)", kpi_card_lbl_format)
dash_sheet.merge_range('L5:N5', "=SUMIF('Lead Data'!H2:H51, \"Closed Won\", 'Lead Data'!J2:J51)", workbook.add_format({
    'bold': True, 'font_size': 16, 'num_format': '$#,##0', 'bg_color': '#e2efda', 'font_color': '#1b4d3e',
    'align': 'center', 'valign': 'bottom', 'border': 1, 'border_color': border_color, 'font_name': 'Segoe UI'
}))

# C. SECTION HEADERS
dash_sheet.write('B8', "Acquisition Channel Performance", section_format)
dash_sheet.write('F8', "Pipeline Stage Distribution", section_format)

# D. CHANNEL TABLE (B9:D16)
dash_sheet.write('B9', "Channel", table_header_format)
dash_sheet.write('C9', "Leads Count", table_header_format)
dash_sheet.write('D9', "Won Revenue", table_header_format)

channels = ["LinkedIn", "Google Search", "Cold Outreach", "Referral", "Partner", "Webinars"]
for idx, ch in enumerate(channels, start=10):
    dash_sheet.write(idx-1, 1, ch, cell_left)
    dash_sheet.write_formula(idx-1, 2, f"=COUNTIF('Lead Data'!G$2:G$51, B{idx})", cell_center)
    dash_sheet.write_formula(idx-1, 3, f"=SUMIFS('Lead Data'!J$2:J$51, 'Lead Data'!G$2:G$51, B{idx}, 'Lead Data'!H$2:H$51, \"Closed Won\")", cell_currency)

# Total Row for Channel Table
dash_sheet.write('B16', "Total", cell_bold_lbl)
dash_sheet.write_formula('C16', "=SUM(C10:C15)", cell_bold_num)
dash_sheet.write_formula('D16', "=SUM(D10:D15)", cell_bold_currency)

# E. STAGE TABLE (F9:H17)
dash_sheet.write('F9', "Lead Stage", table_header_format)
dash_sheet.write('G9', "Deals Count", table_header_format)
dash_sheet.write('H9', "Total Value", table_header_format)

stages = ["New", "Contacted", "Qualified", "Proposal", "Negotiation", "Closed Won", "Closed Lost"]
for idx, st in enumerate(stages, start=10):
    dash_sheet.write(idx-1, 5, st, cell_left)
    dash_sheet.write_formula(idx-1, 6, f"=COUNTIF('Lead Data'!H$2:H$51, F{idx})", cell_center)
    dash_sheet.write_formula(idx-1, 7, f"=SUMIF('Lead Data'!H$2:H$51, F{idx}, 'Lead Data'!J$2:J$51)", cell_currency)

# Total Row for Stage Table
dash_sheet.write('F17', "Total", cell_bold_lbl)
dash_sheet.write_formula('G17', "=SUM(G10:G16)", cell_bold_num)
dash_sheet.write_formula('H17', "=SUM(H10:H16)", cell_bold_currency)


# F. HIGH PRIORITY ACTIONS TABLE (B19:G26)
dash_sheet.write('B19', "Urgent Action Items: Neglected & High-Priority Open Leads", section_format)

dash_sheet.write('B20', "Company Name", table_header_format)
dash_sheet.write('C20', "Lead Owner", table_header_format)
dash_sheet.write('D20', "Deal Value ($)", table_header_format)
dash_sheet.write('E20', "Days Stale", table_header_format)
dash_sheet.write('F20', "Priority", table_header_format)
dash_sheet.write('G20', "Recommended Action", table_header_format)

# Pull top neglected / high priority items directly using python to populate this operational view
# Filter open, high/medium priority leads with longest stale days
open_neglected_leads = []
for d in raw_data:
    lead_id, date_offset, company, owner, email, rep, channel, stage, priority, value, lc_offset, next_action, tc_offset = d
    if stage not in ["Closed Won", "Closed Lost"]:
        # calculate last contact days
        days_stale = lc_offset
        if priority in ["High", "Medium"] and days_stale >= 10:
            open_neglected_leads.append((company, rep, value, days_stale, priority, next_action))

# Sort by days stale descending
open_neglected_leads.sort(key=lambda x: x[3], reverse=True)

# Write top 5
for idx, item in enumerate(open_neglected_leads[:5], start=21):
    comp, rep, val, stale, pri, action = item
    dash_sheet.write(idx-1, 1, comp, cell_left)
    dash_sheet.write(idx-1, 2, rep, cell_center)
    dash_sheet.write(idx-1, 3, val, cell_currency)
    dash_sheet.write(idx-1, 4, stale, cell_center)
    
    # Priority format
    p_format = alert_red if pri == "High" else alert_orange
    dash_sheet.write(idx-1, 5, pri, p_format)
    
    # Action
    dash_sheet.write(idx-1, 6, action, cell_left)


# ----------------------------------------------------
# 4. ADD CHARTS
# ----------------------------------------------------
# A. Channel Revenue Contribution (Horizontal Bar Chart)
chart1 = workbook.add_chart({'type': 'bar'})
chart1.add_series({
    'name':       '=Dashboard!$D$9',
    'categories': '=Dashboard!$B$10:$B$15',
    'values':     '=Dashboard!$D$10:$D$15',
    'fill':       {'color': '#6366f1'},
    'data_labels': {'value': True}
})
chart1.set_title({'name': 'Won Revenue by Channel', 'name_font': {'name': 'Segoe UI', 'size': 11, 'bold': True}})
chart1.set_legend({'none': True})
chart1.set_x_axis({'num_format': '$#,##0'})
chart1.set_size({'width': 440, 'height': 240})
# Insert chart
dash_sheet.insert_chart('B28', chart1)

# B. Stage Distribution (Column Chart)
chart2 = workbook.add_chart({'type': 'column'})
chart2.add_series({
    'name':       '=Dashboard!$G$9',
    'categories': '=Dashboard!$F$10:$F$16',
    'values':     '=Dashboard!$G$10:$G$16',
    'fill':       {'color': '#1e293b'}
})
chart2.set_title({'name': 'Leads Count by Pipeline Stage', 'name_font': {'name': 'Segoe UI', 'size': 11, 'bold': True}})
chart2.set_legend({'none': True})
chart2.set_size({'width': 440, 'height': 240})
# Insert chart
dash_sheet.insert_chart('F28', chart2)

# Close and write
workbook.close()
print("Excel Spreadsheet Dashboard successfully generated.")
