var EMAIL_REVIEW = 'REVIEW_RESPONSE_SENT';


/*--------------------------------REVIEWER RESPONSE---------------------------------*/

function review_response() {
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
    var emailSent = row[14]
    var response = row[8]
    if (response == "Yes"){
      if (emailSent !== EMAIL_REVIEW) { // Prevents sending duplicates
        var update_at_col = 15;
        var subject = 'sub';
        var message = 'message'
        Logger.log(message)
        MailApp.sendEmail(emailAddress, subject, message);
        MailApp.sendEmail("email", subject, message);
        sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_REVIEW);
        Logger.log(message)
        SpreadsheetApp.flush();
      }
    }
    else if(response == "No"){
        if (emailSent !== EMAIL_REVIEW) { // Prevents sending duplicates
        var subject = 'sub';
        var update_at_col = 15;
        var message = "message"
        MailApp.sendEmail(emailAddress, subject, message);
        MailApp.sendEmail("email", subject, message);
        Logger.log(message)
        sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_REVIEW);
        SpreadsheetApp.flush();
        }
    }
    
    else if(response == "Test"){
        if (emailSent !== EMAIL_REVIEW) { // Prevents sending duplicates
        var subject = 'sub';
        var update_at_col = 15;
        var message = "message"
        MailApp.sendEmail(emailAddress, subject, message);
        //MailApp.sendEmail("bosexorg@gmail.com", subject, message);
        Logger.log(message)
        sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_REVIEW);
        sheet.getRange(startRow + i, 14).setValue(40);
        SpreadsheetApp.flush();
      }
    }
  }
}
