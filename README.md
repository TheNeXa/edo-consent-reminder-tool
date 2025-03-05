# E-DO Missing Consent Agreement Reminder Tool Automation

This Google Apps Script automates reminders for missing Electronic Delivery Order (e-DO) Consent Agreements within a Google Sheets environment. It provides two key functionalities: a bulk email sender and an interactive dropdown tool.

## Features

- **Bulk Email Sender**: Sends reminder emails to customers listed in the "Reminder Tool" sheet when Consent Agreements are missing.
- **Dropdown Tool**: Adds an interactive dropdown in the "Validation" sheet to trigger individual reminder emails with visual status updates.
- **Customizable Email**: Sends HTML-formatted emails with instructions and links for submitting Consent Agreements.
- **Conditional Formatting**: Highlights dropdown actions with colors (light orange for "Send Email," dark green for "Email Sent").

## Prerequisites

- A Google account with access to Google Sheets and Apps Script.
- A Google Sheet with two tabs: "Validation" and "Reminder Tool."
- Permission to send emails via Google Apps Script (requires authorization).

## Installation

1. **Create Google Sheet**:
   - Create a new Google Sheet.
   - Name two sheets: "Validation" and "Reminder Tool."

2. **Add Script**:
   - Open the Script Editor: `Extensions > Apps Script`.
   - Copy the contents of `src/edo-consent-reminder.gs` into the editor.
   - Save the script with a name (e.g., "E-DO Reminder Tool").

3. **Set Up Trigger**:
   - In the Script Editor, go to `Triggers` > `Add Trigger`.
   - Select `onEditTrigger`, Event: "From spreadsheet," "On edit."
   - Save and authorize the script.

4. **Configure Sheets**:
   - **Validation Sheet**: Add headers: B1 = "Requestor Email," C1 = "Company Name," F1 = "Cust Email."
   - **Reminder Tool Sheet**: Add headers: A1 = "Email Address," B1 = "Company Name," C1 = "Last Send History," D1 = "Send Status."
   - Run `Setup Dropdown Tools` from the "Reminder Tool" menu to initialize dropdowns in "Validation."

## Usage

### Bulk Email Sending
- Populate the "Reminder Tool" sheet starting at row 4:
  - Column A: Customer email addresses.
  - Column B: Company names.
- Run `Send Reminder Emails in Bulk` from the "Reminder Tool" menu.
- Emails are sent, and columns C (timestamp) and D (status) update accordingly.

### Dropdown Tool
- Populate the "Validation" sheet starting at row 2:
  - Column B: Requestor email.
  - Column C: Company name.
  - Column F: Customer email.
- Select "Send Email" from the dropdown in Column O.
- An email is sent, and Column O updates to "Email Sent" (dark green), with status in Column P.

## Email Format

The script sends a bilingual (Indonesian/English) HTML email with:
- A reminder about the missing e-DO Consent Agreement.
- Steps to submit the agreement (download, softcopy submission, hardcopy delivery).
- Highlighted deadlines and important notes.

## Customization

- **Email Sender**: Change `FROM_EMAIL` to your email address.
- **Links**: Update URLs in the email body to match your forms or locations.
- **Colors**: Modify hex codes in `setupDropdownTools` for different conditional formatting.

## Repository Structure
