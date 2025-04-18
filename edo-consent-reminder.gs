var FROM_EMAIL = "dimas.rayhan@one-line.com";

// Function to set up the dropdown and conditional formatting in "Validation" sheet
function setupDropdownTools() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Validation");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: Sheet 'Validation' not found.");
    return;
  }

  // Set headers
  sheet.getRange(1, 15).setValue("Action");         // Column O
  sheet.getRange(1, 16).setValue("Email Status");   // Column P

  // Create dropdown for column O (Action) starting at O2
  var actionRule = SpreadsheetApp.newDataValidation()
    .requireValueInList(["Send Email", "Email Sent"], true)
    .setAllowInvalid(false)
    .build();
  var maxRows = sheet.getMaxRows();
  sheet.getRange(2, 15, maxRows - 1, 1).setDataValidation(actionRule);

  // Apply conditional formatting to column O
  var oRange = sheet.getRange("O2:O" + maxRows);
  var ruleOrange = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Send Email")
    .setBackground("#FFD580") // Light Orange 3
    .setRanges([oRange])
    .build();
  var ruleDarkGreen = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo("Email Sent")
    .setBackground("#006400") // Dark Green
    .setRanges([oRange])
    .build();

  // Set the rules
  var rules = [ruleOrange, ruleDarkGreen];
  sheet.setConditionalFormatRules(rules);

  SpreadsheetApp.getUi().alert("Dropdown tools setup completed in 'Validation' sheet.");
}

// Installable trigger function to handle edits in "Validation" sheet
function onEditTrigger(e) {
  var range = e.range;
  var sheet = range.getSheet();

  if (sheet.getName() === "Validation") {
    var column = range.getColumn();
    var row = range.getRow();

    if (column === 15 && row > 1) { // Column O
      var action = range.getValue();
      if (action === "Send Email") {
        sendEmailForRow(row, sheet);
        range.setValue("Email Sent"); // Update to "Email Sent" after sending
      }
    }
  }
}

// Function to send reminder emails in bulk in "Reminder Tool" sheet
function sendReminderEmailsInBulk() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName("Reminder Tool");
  if (!sheet) {
    SpreadsheetApp.getUi().alert("Error: Sheet 'Reminder Tool' not found.");
    return;
  }

  var startRow = 4;
  var lastRow = sheet.getLastRow();

  if (lastRow < startRow) {
    SpreadsheetApp.getUi().alert("No email data found to process.");
    return;
  }

  var range = sheet.getRange(startRow, 1, lastRow - startRow + 1, 2);
  var data = range.getValues();

  for (var i = 0; i < data.length; i++) {
    var custEmail = data[i][0] ? data[i][0].toString().trim() : ""; // Column A
    var companyName = data[i][1] ? data[i][1].toString().trim() : ""; // Column B

    if (!custEmail || !companyName) {
      sheet.getRange(startRow + i, 4).setValue("Skipped: Missing email or company name");
      continue;
    }

    sendEmail(custEmail, null, companyName, sheet, startRow + i, "Reminder Tool");
  }

  SpreadsheetApp.getUi().alert("Bulk email sending process completed.");
}

// Reusable function to send email for both tools
function sendEmail(toEmail, ccEmail, companyName, sheet, row, sheetType) {
  var subject = "Reminder: Submission of e-DO Consent Agreement // " + companyName + " //";

  var body = `
<p style="font-family: Arial, sans-serif; font-size: 14px;"><b>Pelanggan yang Terhormat,</b></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Terima kasih atas kepercayaan Anda menggunakan layanan kami. Kami ingin menginformasikan bahwa permintaan e-DO Anda telah kami terima namun kami belum dapat merilis e-DO untuk pengiriman Anda karena kami <span style="color: #FF0000; font-weight: bold;">belum menerima Surat Perjanjian Persetujuan e-DO penerima barang.</span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Mohon segera mengirimkan dokumen tersebut dalam <span style="color: #FF4500; font-weight: bold; font-size: 16px;">24 jam ke depan</span> untuk menghindari keterlambatan. Jika tidak, Anda perlu <span style="color: #FF0000; font-weight: bold;">mengajukan ulang permintaan e-DO</span> melalui formulir yang tersedia di <a href="https://id.one-line.com" style="color: #0066CC; font-weight: bold;">id.one-line.com</a>.</p>

<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;"><b>Berikut adalah langkah-langkah yang diperlukan:</b></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">1. Unduh Format Surat Persetujuan</b><br/>
Silakan unduh file format melalui link berikut:<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://docs.google.com/forms/d/e/1FAIpQLSff3x9y1FzRWXq7yi17dZNbOmBEUvOIwTSUNgPwzDxbL92hKQ/viewform" style="color: #0066CC;">Electronic Delivery Consent Agreement Request</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">2. Isi dan Submit Softcopy</b><br/>
Setelah mengisi surat persetujuan, kirimkan softcopy melalui:<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://docs.google.com/forms/d/e/1FAIpQLSdPt_ot-I6ROFvejG1RQJ8hEXgi8yt8svZftSIlbmQlQGAIww/viewform" style="color: #0066CC;">Electronic Delivery Consent Agreement Submission</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">3. Kirimkan Hardcopy ke Counter ONE JKT</b><br/>
Mohon kirim hardcopy surat persetujuan ke alamat berikut:<br/>
AIA Central, Lantai 8, Jl. Jenderal Sudirman Kav. 48A, Jakarta Selatan<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://g.co/kgs/Cvimz7J" style="color: #0066CC;">Lihat Lokasi di Google Maps</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><span style="background-color: #FFFF99; padding: 2px; font-weight: bold;">CATATAN PENTING:</span> <span style="background-color: #FF0000; color: #FFFFFF; padding: 2px; font-weight: bold;">Pastikan alamat email yang terdaftar di e-Commerce dicantumkan dalam Surat Perjanjian Persetujuan e-DO.</span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Terima kasih atas perhatian dan kerjasama Anda.</p>

<hr style="border: 1px solid black;" />

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b>Dear Customer,</b></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Thank you for your trust in our services. We wish to inform you that while your e-DO request has been received, we are unable to release the e-DO for your shipment as we have <span style="color: #FF0000; font-weight: bold;">not yet received the Electronic Delivery Consent Agreement from the consignee.</span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Please submit the document within the next <span style="color: #FF4500; font-weight: bold; font-size: 16px;">24 hours</span> to avoid delays. Failure to do so will require you to <span style="color: #FF0000; font-weight: bold;">resubmit your e-DO request</span> using the form available at <a href="https://id.one-line.com" style="color: #0066CC; font-weight: bold;">id.one-line.com</a>.</p>

<p style="font-family: Arial, sans-serif; font-size: 14px; color: #333333;"><b>The following steps are required:</b></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">1. Download the Electronic Delivery Consent Agreement Format</b><br/>
Please download the format file using the following link:<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://docs.google.com/forms/d/e/1FAIpQLSff3x9y1FzRWXq7yi17dZNbOmBEUvOIwTSUNgPwzDxbL92hKQ/viewform" style="color: #0066CC;">Electronic Delivery Consent Agreement Request</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">2. Fill in and Submit the Softcopy</b><br/>
After completing the agreement, please submit the softcopy via:<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://docs.google.com/forms/d/e/1FAIpQLSdPt_ot-I6ROFvejG1RQJ8hEXgi8yt8svZftSIlbmQlQGAIww/viewform" style="color: #0066CC;">Electronic Delivery Consent Agreement Submission</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b style="color: #0066CC; font-size: 16px;">3. Submit the Hardcopy at the ONE JKT Counter</b><br/>
Please deliver the hardcopy of the agreement to the following address:<br/>
AIA Central, 8th Floor, Jl. Jenderal Sudirman Kav. 48A, South Jakarta<br/>
<span style="background-color: #FFFF99; padding: 2px;"><b><a href="https://g.co/kgs/Cvimz7J" style="color: #0066CC;">Lihat Lokasi di Google Maps</a></b></span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><span style="background-color: #FFFF99; padding: 2px; font-weight: bold;">IMPORTANT NOTE:</span> <span style="background-color: #FF0000; color: #FFFFFF; padding: 2px; font-weight: bold;">Please ensure that the email address registered in e-Commerce is included in the Electronic Delivery Consent Agreement.</span></p>

<p style="font-family: Arial, sans-serif; font-size: 14px;">Thank you for your attention and cooperation.</p>

<p style="font-family: Arial, sans-serif; font-size: 14px;"><b>AS ONE, WE CAN.</b></p>
<p style="font-family: Arial, sans-serif; font-size: 12px; color: #666666;">□------------------------------------------------□<br/>
Indonesia Customer Care Team<br/>
□------------------------------------------------□<br/>
Chat with our Experts<br/>
on <a href="https://id.one-line.com" style="color: #0066CC;">https://id.one-line.com</a></p>

<p style="font-family: Arial, sans-serif; font-size: 12px; font-style: italic; color: #666666;">I'm using Inbox When Ready to protect my focus.</p>
  `;

  try {
    if (sheetType === "Validation") {
      var requestorEmail = sheet.getRange(row, 2).getValue().toString().trim(); // Column B
      MailApp.sendEmail({
        to: requestorEmail,
        cc: toEmail,           // Cust Email from Column F
        subject: subject,
        htmlBody: body,
        from: FROM_EMAIL,
        noReply: true
      });
      sheet.getRange(row, 16).setValue("Sent"); // Column P
    } else { // Reminder Tool
      MailApp.sendEmail({
        to: toEmail,           // Cust Email from Column A
        subject: subject,
        htmlBody: body,
        from: FROM_EMAIL,
        noReply: true
      });
      var timestamp = Utilities.formatDate(new Date(), "Asia/Jakarta", "MM/dd/yyyy HH:mm:ss");
      sheet.getRange(row, 3).setValue(timestamp); // Column C
      sheet.getRange(row, 4).setValue("Sent");    // Column D
    }
  } catch (error) {
    var errorMsg = "Error: " + error.message;
    if (sheetType === "Validation") {
      sheet.getRange(row, 16).setValue(errorMsg); // Column P
    } else {
      sheet.getRange(row, 4).setValue(errorMsg);  // Column D
    }
  }
}

// Function to send email for a specific row in "Validation" sheet
function sendEmailForRow(row, sheet) {
  var requestorEmail = sheet.getRange(row, 2).getValue().toString().trim(); // Column B: Requestor Email
  var companyName = sheet.getRange(row, 3).getValue().toString().trim();   // Column C: Company Name
  var custEmail = sheet.getRange(row, 6).getValue().toString().trim();     // Column F: Cust Email

  if (!requestorEmail || !custEmail || !companyName) {
    sheet.getRange(row, 16).setValue("Skipped: Missing email or company name");
    return;
  }

  sendEmail(custEmail, requestorEmail, companyName, sheet, row, "Validation");
}

// UI menu combining both tools under "Reminder Tool"
function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu("Reminder Tool")
    .addItem("Send Reminder Emails in Bulk", "sendReminderEmailsInBulk")
    .addItem("Setup Dropdown Tools", "setupDropdownTools")
    .addToUi();
}

// Optional: Manual trigger to ensure menu creation if onOpen doesn't fire automatically
function createMenuManually() {
  onOpen();
}