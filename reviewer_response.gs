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
        var subject = 'Approval of Candidature | Bose.X';
        var message = 'Dear '+candidate_ID+',\nThe review from the team is complete. We\'re glad to inform you that the candidature has been approved. The response has been attached below. The lead/co-lead will send you the invitation to slack along with the guidelines of the community. Your Bose.X web account will be activated for that you need to sign-up from the https://www.bosex.org/. You can use your google account to login. This will allow you to access the resource page. Moreover, please read the comment(s) carefully in case the reviewer has asked for some additional link(s)/document(s) please share the same by replying to this mail. Failing to provide the required material(s) within a week from the mail notification will result in automatic revokation of the membership.\n\n'+'Workspace: '+row[12]+'\nComments: '+row[11]+'\n\nTeam Bose.X'
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
        var subject = 'Candidature response| Bose.X';
        var update_at_col = 15;
        var message = 'Dear '+candidate_ID+',\nThe review from the team is complete. We thankyou for your time but unfortunately we cannot offer candidature. The review team\'s response has been attached below.\n\n'+row[11]+'\n\nIn case of any query please contact us.\n\nTeam Bose.X'
        MailApp.sendEmail(emailAddress, subject, message);
        MailApp.sendEmail("email", subject, message);
        Logger.log(message)
        sheet.getRange(startRow + i, update_at_col).setValue(EMAIL_REVIEW);
        SpreadsheetApp.flush();
        }
    }
    
    else if(response == "Test"){
        if (emailSent !== EMAIL_REVIEW) { // Prevents sending duplicates
        var subject = 'Candidature response| Bose.X';
        var update_at_col = 15;
        var message = 'Dear '+candidate_ID+',\nThe review from the team is complete. We thankyou for your time. You have been selected for Training Gateway procedure wherein the you will be required to clear a short test. The paper link has been attached with the mail. Further instructions are given within the mail. The deadline to submit the paper is 40 days from the day you recieve the mail. Failing to submit the paper in 40 days will result in automatic revokation of the membership.In case of any further query, extension or assistance you can always approach the lead/co-lead.\n\nLINK: https://forms.gle/DSX9XQa74VZJikNGA \n\nBest wishes\nTeam Bose.X'
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
