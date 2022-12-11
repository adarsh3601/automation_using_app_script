var UPDATE_QUERY = 'UPDATE_QUERY_SENT';

function update() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("data");
  var startRow = 2; // First row of data to process
  var numRows = 2; // Number of rows to process
  var startCol = 1;
  var numCol=100;

  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();

  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    var emailAddress = row[1]; // First column
    var candidateID = row[2];
    var name = row[3];
    var days_to_update = row[6];

    sheet.getRange(startRow + i, 7).setValue(days_to_update - 1); // countdown
    
    if (row[6] == 0){    

      sheet.getRange(startRow + i, 7).setValue(2); // set value to 15 days again

      // send message
      var message = "Dear "+name+", \ncandidate ID: "+candidateID+"\nThis is a reminder regarding a short update of your progess. Your next update will be requested on 15 days from now. Please find attached form: https://forms.gle/7avvJCsnQu8qZcaA7";
      Logger.log(message)
      var subject = 'Progress update';
      //MailApp.sendEmail(emailAddress, subject, message);
      //MailApp.sendEmail("bosexorg@gmail.com", subject, message);
      sheet.getRange(startRow + i, 8).setValue(UPDATE_QUERY);
      SpreadsheetApp.flush();
    }
  }
}
