function prep_data(){
  var review_res_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("2");
  var candidate_res_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("1");
  var data_sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("3");
  
  var startRow = 2; // First row of data to process
  var numRows = 30; // Number of rows to process
  var startCol = 1;
  var numCol=100;

  var review_res = review_res_sheet.getRange(startRow, startCol, numRows, numCol);
  var candidate = candidate_res_sheet.getRange(startRow, startCol, numRows, numCol);

  var data = review_res.getValues();
  var k=0;
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    if (row[8] == "Yes"){// Check for those allowed as members
      var emailAddress = row[10]; // First column
      var candidate_ID = row[1];
      var workspace = row[12];
      //can add loop by declaring values in array
      data_sheet.getRange(startRow + k, 2).setValue(emailAddress);
      data_sheet.getRange(startRow + k, 3).setValue(candidate_ID);
      data_sheet.getRange(startRow + k, 4).setValue(workspace);
      k+=1;
    }
  }

  var k = 2;
  var data = candidate.getValues();
  for (var i = 0; i < data.length; ++i) {
    var row = data[i];
    for (var j = 0; j < 50; ++j){
      if (row[2] == data_sheet.getRange(startRow + j, 2).getValue()){ // compare Email-IDs
        var name = row[3];
        var ugpg = row[4];
        var same_major = row[29]
        if (row[4] == "No" ){var division = row[7];}
        else {var division = row[17];}
        data_sheet.getRange(k, 5).setValue(name);
        data_sheet.getRange(k, 6).setValue(ugpg);
        data_sheet.getRange(k, 7).setValue(division);
        data_sheet.getRange(k, 8).setValue(same_major);        
        SpreadsheetApp.flush();
        ++k;
      }
    }
  }
}
