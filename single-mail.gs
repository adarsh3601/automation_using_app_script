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
    var file = DriveApp.getFileById('16zVXNyff20bCe7n35vxERE3uWsVnf30e');
    var message = "Dear "+name+", \nYour candidate ID is "+cid+".\nPlease keep this ID with you at all times. For future communications, we will be using this ID. Please follow the details mentioned below, and in case the information is not correct/obsolete/changed, please reply to us on this mail.\nEmail id in use:"+ emailAddress+"\nDivision: "+division+"\nProject involved in: "+status+"\nResearch Division:"+research_div+".\n\n Feedback is an important part of community development; thus, we have attached a review/feedback form (https://forms.gle/WaJ3nNFVaRNkwYdv6). The feedbacks are reviewed by each core member and will be acted upon as soon as possible. In case you wish to add any specific details apart from the one mentioned in the form, please reply to this message.\n\nIn due course of a year, we felt an urge to develop a systematic organizational structure to keep working and managing the divisions and work smoothly; hence we have prepared a short book-\"Constitution of Bose.X: Structure, Governance, and Workflow\", which is expected to undergo several amendments in due course of time and you will be notified regarding each update. Please find attached the book for your reference. In case you have any queries concerning the same, please create a new thread highlighting \"Issue in Constitution\" and mail us at bosexorg@gmail.com.\n\nTeam Bose.X";
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
