function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Giving_Slip_Record");
    const folderId = "1vQ8A8SEc44oZOJ7_8fiWt4lC04KgwPCU";
    const folder = DriveApp.getFolderById(folderId);

    const now = new Date();
    const data = e.parameter;

    const fullname = toTitleCase(data.fullname || "");
    const phone = data.phone || "";
    const givingNumber = data.giving_number || "";
    const paymentType = data.payment_type || "";
    const givingType = data.giving_type || "";
    const description = data.description || "";
    const amount = data.amount || "";
    const givingDate = data.giving_date || "";
    const comment = data.comment || "";

    let receiptLink = "";

    if (data.receipt && data.contentType) {
      const blob = Utilities.newBlob(Utilities.base64Decode(data.receipt))
        .setName(fullname.replace(/\s+/g, "_") + "_" + now.getTime())
        .setContentType(data.contentType);
      const file = folder.createFile(blob);
      receiptLink = file.getUrl();
    }

    const rowData = [
      now,
      fullname,
      phone,
      givingNumber,
      paymentType,
      givingType,
      description,
      amount,
      givingDate,
      comment,
      receiptLink
    ];

    sheet.appendRow(rowData);

    const lastRow = sheet.getLastRow();
    const lastCol = sheet.getLastColumn();
    sheet.getRange(lastRow, 1, 1, lastCol).setBorder(true, true, true, true, true, true);
    sheet.getRange(lastRow, 8).setNumberFormat('"₦"#,##0.00');
    sheet.getRange(lastRow, 9).setNumberFormat("dd-mmm-yyyy");
    sheet.getRange(lastRow, 1, 1, lastCol).setBackground(lastRow % 2 === 0 ? "#CFEBFF" : "#FFFFFF");

    const header = sheet.getRange(1, 1, 1, lastCol);
    header.setFontWeight("bold").setBackground("#3c78d8").setFontColor("#ffffff");
    header.setBorder(false, false, true, false, false, false);

    sheet.autoResizeColumns(1, lastCol);

    return ContentService.createTextOutput("Success").setMimeType(ContentService.MimeType.TEXT);
  } catch (error) {
    return ContentService.createTextOutput("Error: " + error.message).setMimeType(ContentService.MimeType.TEXT);
  }
}

function toTitleCase(str) {
  return str.replace(/\w\S*/g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase();
  });
}
