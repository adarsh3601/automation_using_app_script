var EMAIL_CID = 'CANDIDATE ID SENT';
/*--------------------------------CANDIDATE ID---------------------------------*/

function email_ID() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var startRow = 2; // First row of data to process
  var numRows = 1; // Number of rows to process
  var startCol = 1;
  var numCol=100;

  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {

    var row = data[i];
    var emailAddress = row[1]; // First column
    var cid = row[2];
    var division = row[3];
    var status = row[4];
    var name = row[5];
    var research_div =row[7];
    var file = DriveApp.getFileById('drive_id');
    var message = "Dear "+name+", \nYour candidate ID is "+cid+".\messege";
    var emailSent = row[8]; 
    var update_at_col = 9
    if (emailSent !== EMAIL_CID) { // Prevents sending duplicates
      var subject = 'Candidate ID';
      Logger.log(message)
      MailApp.sendEmail(emailAddress, subject, message);
      MailApp.sendEmail(emailAddress, subject, message, {attachments:[file.getAs(MimeType.PDF)]})
      sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_CID);
      SpreadsheetApp.flush();
    }
  }
}
