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
    var pro_code =row[3];
    var name = row[4];
    var update_req = row[8];
    var update_count = row[9]
    var days_to_update = row[10]
    
    sheet.getRange(startRow + i, 11).setValue(days_to_update - 1); // countdown
    
    if (row[10] == 0){    

      sheet.getRange(startRow + i, 11).setValue(5); // set value to 15 days again
      sheet.getRange(startRow + i, 10).setValue(update_count+1); // increament update

      // set project status
      if (update_count < update_req){sheet.getRange(startRow + i, 12).setValue('Ongoing');}
      else {sheet.getRange(startRow + i, 12).setValue('Overdue');}

      // send message
      var message = "messege"
      var subject = 'UPDATE for project code '+pro_code;
      MailApp.sendEmail(emailAddress, subject, message);
      MailApp.sendEmail("<bosex>", subject, message);
      sheet.getRange(startRow + i, 13).setValue(UPDATE_QUERY);
      SpreadsheetApp.flush();
    }
  }
}
