/*--------------------------------GATEWAY RESPONSE---------------------------------*/

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
    var response = row[8]
    if(response == "Test"){
      var update_at_col = 14;
      sheet.getRange(startRow + i, update_at_col).setValue(row[13]-1);
      SpreadsheetApp.flush();
    }
  }
}
