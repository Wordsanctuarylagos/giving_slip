// Capitalize Full Name to Title Case
function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
}

function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Giving_Slip_Record");

  const now = new Date();
  const data = [
    now,
    toTitleCase(e.parameter.fullname),
    e.parameter.phone,
    e.parameter.giving_number,
    e.parameter.payment_type,
    e.parameter.giving_type,
    e.parameter.description,
    e.parameter.amount,
    e.parameter.giving_date,
    e.parameter.comment
  ];

  // Append data to sheet
  sheet.appendRow(data);

  const lastRow = sheet.getLastRow();
  const lastCol = sheet.getLastColumn();

  // Add borders to the new row
  sheet.getRange(lastRow, 1, 1, lastCol).setBorder(true, true, true, true, true, true);

  // Apply zebra shading
  const bgColor = lastRow % 2 === 0 ? "#CFEBFF" : "#FFFFFF";
  sheet.getRange(lastRow, 1, 1, lastCol).setBackground(bgColor);

  // Format amount column as ₦ currency
  const amountColIndex = 8; // column H
  sheet.getRange(lastRow, amountColIndex).setNumberFormat('"₦"#,##0.00');

  // Format header (row 1)
  const headerRange = sheet.getRange(1, 1, 1, lastCol);
  headerRange.setFontWeight("bold");
  headerRange.setBackground("#3c78d8");
  headerRange.setBorder(false, false, true, false, false, false); // Bottom border

  // Auto resize columns to fit content
  sheet.autoResizeColumns(1, lastCol);

  return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
}
