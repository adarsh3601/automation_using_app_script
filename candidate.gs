var EMAIL_CID = 'CANDIDATE ID SENT';

/*--------------------------------CANDIDATE ID---------------------------------*/

function candidateID() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1");
  var startRow = 2; // First row of data to process
  var numRows = 300; // Number of rows to process
  var startCol = 1;
  var numCol=100;

  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  // Fetch values for each row in the Range.
  var data = dataRange.getValues();
  for (var i = 0; i < data.length; ++i) {

    var row = data[i];
    var emailAddress = row[2]; // First column
    var name = row[3];

    if (row[4] == "No"){var division = row[7];}
    else {var division = row[17];}

    var message = "your message"
    var emailSent = row[30];
    var update_at_col = 31
    if (emailSent !== EMAIL_CID) { // Prevents sending duplicates
      var subject = 'Candidate ID';
      MailApp.sendEmail(emailAddress, subject, message);
      MailApp.sendEmail("<mail>", subject, message);
      if (division == "<division>"){MailApp.sendEmail("<mail>", subject, message)}
      else if ((division == "division") || (division == "division")){MailApp.sendEmail("<mail>", subject, message)}

      sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_CID);
      SpreadsheetApp.flush();
    }
  }
}
