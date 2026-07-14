# Walkthrough — Volopay Growth Squad Assessment Deliverables

We have successfully completed all three tasks of the Volopay Growth Squad Assessment, and added premium user-experience enhancements. Below is a summary of the completed deliverables, file paths, and instructions on how to use them.

---

## 📂 Deliverables & File Links

### Task 1 — Finance Content Strategy Challenge
* **Deliverable File**: [Task1_LinkedIn_Content_Series.md](file:///c:/Voloplay/Task1_LinkedIn_Content_Series.md)
* **Description**: Contains three highly engaging, original LinkedIn posts targeting CFOs, FP&A Managers, and AP Specialists respectively. Each post outlines a real-world operational challenge, explains why the topic matters, and includes copy structured to drive professional engagement and discussion without being promotional.

### Task 2 — AI Tool-Building Challenge (GrowthSync AI)
* **Live Working Demo Link**: [https://shannu144.github.io/GrowthSync/](https://shannu144.github.io/GrowthSync/)
* **Approach Document**: [Task2_Approach_Document.md](file:///c:/Voloplay/Task2_Approach_Document.md)
* **Web App Code Directory**: [c:/Voloplay](file:///c:/Voloplay)
  * **Main Entrypoint**: [App.jsx](file:///c:/Voloplay/src/App.jsx)
  * **Layout Styles**: [App.css](file:///c:/Voloplay/src/App.css)
  * **Design Tokens / Variables**: [index.css](file:///c:/Voloplay/src/index.css)
  * **Mock Customer Data**: [mockData.js](file:///c:/Voloplay/src/mockData.js)
* **Description**: A premium React and Vite single-page application that consolidates client information from Zoho CRM, Slack threads, emails, and support tickets.
  * **Added Premium Features**:
    * **Interactive Action Checklist**: Converts the recommended "Next Best Action" into checkbox tasks (e.g., scheduling a call, issuing credits). Checkbox states are persisted dynamically in the browser's `localStorage` per customer.
    * **Integration Feed Filters**: Added filter pills above the chronological timeline. Users can toggle the feed to view "All Channels", "Emails Only", "Slack Only", or "Tickets Only".
    * **Account Sentiment Gauge**: A visual gauge displaying the customer's sentiment trend (ranging from *Severely Strained* to *Highly Positive*) based on their latest communications.
    * **KPI Dashboard**: Aggregates total ARR, risk counts, expansion opportunities, and health index.
    * **Interactive Chat**: A CS Assistant chatbot UI where users can query the account's history.
    * **Gemini API Integration**: Features an AI Settings panel where users can paste their Gemini API Key to enable *live, dynamic, open-ended question answering* from the real Gemini LLM!

### Task 3 — Spreadsheet Dashboard Challenge
* **Generated Excel Workbook**: [Task3_Lead_Pipeline_Dashboard.xlsx](file:///c:/Voloplay/Task3_Lead_Pipeline_Dashboard.xlsx)
* **Guide & Insights Document**: [Task3_Dashboard_Guide_and_Insights.md](file:///c:/Voloplay/Task3_Dashboard_Guide_and_Insights.md)
* **Generator Script**: [generate_dashboard.py](file:///c:/Voloplay/generate_dashboard.py)
* **Description**: A professional-grade, custom-styled Excel spreadsheet (`.xlsx`) containing:
  * **Dashboard Sheet**: High-level visual console with gridlines hidden, custom KPI cards, tables for Channel Revenue and Stage Distribution, a horizontal bar chart, a vertical column chart, and a pre-filtered "Urgent Action Items" table.
  * **Lead Data Sheet**: A 50-row realistic leads database with automated "Days Since Last Contact" calculations and conditional formatting rules to highlight high-priority, won, and lost deals.

---

## 🛠️ Verification & How to Run

### 1. Launching the Task 2 Web Application
To run the React dashboard locally, run the following commands in your terminal from the `c:\Voloplay` folder:
```bash
# Start the Vite local development server
npm run dev
```
Once started, open the provided local URL (usually `http://localhost:5173`) in your browser to interact with the dashboard. You can click on the **⚙️ AI Settings** button in the sidebar footer to connect your Gemini API Key for live query generation.

### 2. Re-generating the Task 3 Spreadsheet Dashboard
If you modify the dummy data or styling parameters inside `generate_dashboard.py` and want to rebuild the Excel workbook, run:
```bash
# Execute the generator script
py generate_dashboard.py
```
This will compile and overwrite `Task3_Lead_Pipeline_Dashboard.xlsx` in your workspace.
