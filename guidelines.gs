var EMAIL_GUIDELINES = 'GUIDELINES_SENT';

/*--------------------------------GUIDELINES---------------------------------*/

function guidelines() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2");
  var startRow = 2; // First row of data to process
  var numRows = 300; // Number of rows to process
  var startCol = 1;
  var numCol=100;

  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {

    var row = data[i];
    var emailAddress = row[10]; // First column
    var candidate_ID = row[1];
    var emailSent = row[15]
    var response = row[8]
    if (row[12]=='TRIAC'){var file = DriveApp.getFileById('drive-id')}
    else if (row[12]=='TRAINING'){var file = DriveApp.getFileById('drive-id')}

    if (response == "Yes"){
      if (emailSent !== EMAIL_GUIDELINES) { // Prevents sending duplicates
        var update_at_col = 16;
        var subject = 'Approval of Candidature | Bose.X';
        var message = 'Dear '+candidate_ID+',\n \

        MailApp.sendEmail(emailAddress, subject, message, {attachments:[file.getAs(MimeType.PDF)]});
        MailApp.sendEmail("<mail>", subject, message, {attachments:[file.getAs(MimeType.PDF)]});
        sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_GUIDELINES);
        SpreadsheetApp.flush();
      }
    }
  }
}
