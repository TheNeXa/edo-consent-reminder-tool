# Consent Agreement Reminder Tool Automation

This Google Apps Script automates reminders for missing consent agreements within a Google Sheets environment. It provides two key functionalities: a bulk email sender and an interactive dropdown tool, designed for managing customer reminders efficiently.

## Features

- **Bulk Email Sender**: Sends reminder emails to recipients listed in a "Reminder Tool" sheet when consent agreements are missing.
- **Dropdown Tool**: Adds an interactive dropdown in a "Validation" sheet to trigger individual reminder emails with visual status updates.
- **Customizable Email**: Sends HTML-formatted emails with instructions and links for submitting agreements.
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
   - Copy the contents of `src/consent-reminder.gs` into the editor.
   - Save the script with a name (e.g., "Consent Reminder Tool").

3. **Set Up Trigger**:
   - In the Script Editor, go to `Triggers` > `Add Trigger`.
   - Select `onEditTrigger`, Event: "From spreadsheet," "On edit."
   - Save and authorize the script.

4. **Configure Sheets**:
   - **Validation Sheet**: Add headers: B1 = "Sender Email," C1 = "Recipient Name," F1 = "Recipient Email."
   - **Reminder Tool Sheet**: Add headers: A1 = "Email Address," B1 = "Recipient Name," C1 = "Last Send History," D1 = "Send Status."
   - Run `Setup Dropdown Tools` from the "Reminder Tool" menu to initialize dropdowns in "Validation."

## Usage

### Bulk Email Sending
- Populate the "Reminder Tool" sheet starting at row 4:
  - Column A: Recipient email addresses.
  - Column B: Recipient names (e.g., individuals or entities).
- Run `Send Reminder Emails in Bulk` from the "Reminder Tool" menu.
- Emails are sent, and columns C (timestamp) and D (status) update accordingly.

### Dropdown Tool
- Populate the "Validation" sheet starting at row 2:
  - Column B: Sender email.
  - Column C: Recipient name.
  - Column F: Recipient email.
- Select "Send Email" from the dropdown in Column O.
- An email is sent, and Column O updates to "Email Sent" (dark green), with status in Column P.

## Email Format

The script sends an HTML-formatted email with:
- A reminder about the missing consent agreement.
- Generic instructions for submission (e.g., download a form, submit digitally, or provide a physical copy).
- Placeholder deadlines and notes (customizable by the user).

## Customization

- **Email Sender**: Replace `FROM_EMAIL` with your preferred sender email address in the script.
- **Links**: Update placeholder URLs in the email body to point to your specific forms or submission locations.
- **Colors**: Adjust hex codes in `setupDropdownTools` (e.g., `#FFA07A` for light orange, `#006400` for dark green) to change formatting.

## Repository Structure
```
├── src/
│   └── consent-reminder.gs  # Main Apps Script file
├── README.md                # This file
```
