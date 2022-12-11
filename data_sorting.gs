function data_sorting(){
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Response 1");
  var startRow = 2; // First row of data to process
  var numRows = 300; // Number of rows to process
  var startCol = 1;
  var numCol=100;
  var dataRange = sheet.getRange(startRow, startCol, numRows, numCol);
  var data = dataRange.getValues();
  for (var i = 0; i <=numRows-1; ++i) {
    var row = data[i];
    for (var j=35; j<=47; ++j)
    // CASE-1
    //{35 + (1, 4, 6, 9, 10 and 12) - 1} => because change has to be made in that cell x+1 gives a value greater than x but change has to be made at x so -1 

    if (j==35 || j==38 || j==40 || j==43 || j==44 || j==46 ){ //add more values from above calculation as above x+1 - 1
    // Always use " " for strings ' ' is for char 
    if(row[j]=="Very much like me"){sheet.getRange(startRow + i,j+1).setValue('5');}
    else if (row[j]=="Mostly like me"){sheet.getRange(startRow + i,j+1).setValue('4');}
    else if (row[j]=="Somewhat like me"){sheet.getRange(startRow + i,j+1).setValue('3');}
    else if (row[j]=="Not much like me"){sheet.getRange(startRow + i,j+1).setValue('2');}
    else if (row[j]=="Not like me at all"){sheet.getRange(startRow + i,j+1).setValue('1');}
    }
    //    CASE - 2 
    //{ 35 + (2, 3, 5, 7, 8 and 11)- 1} => because change has to be made in that cell x+1 gives a value greater than x but change has to be made at x so -1 
    else if (j==36 || j==37 || j==39 || j==41 || j==42 || j==45 ){ //add more values from above calculation as above x+1 - 1
    // Always use " " for strings ' ' is for char 
    if(row[j]=="Very much like me"){sheet.getRange(startRow + i,j+1).setValue('1');}
    else if (row[j]=="Mostly like me"){sheet.getRange(startRow + i,j+1).setValue('2');}
    else if (row[j]=="Somewhat like me"){sheet.getRange(startRow + i,j+1).setValue('3');}
    else if (row[j]=="Not much like me"){sheet.getRange(startRow + i,j+1).setValue('4');}
    else if (row[j]=="Not like me at all"){sheet.getRange(startRow + i,j+1).setValue('5');}
    }
  } 

  for (var k=0 ; k<numRows-1; ++k){
    var motivation_scale = parseInt(data[k][34])
    if(motivation_scale <=150 && motivation_scale> 112){sheet.getRange(startRow+k, 35).setValue("Highly self motivated");}
    else if (motivation_scale <=112 && motivation_scale> 74){sheet.getRange(startRow+k, 35).setValue("Somewhat self motivated");}
    else if (motivation_scale <=74 && motivation_scale> 37){sheet.getRange(startRow+k, 35).setValue("Slightly self motivated");}
    else if (motivation_scale <=37 && motivation_scale> 0){sheet.getRange(startRow+k, 35).setValue("Not at all self motivated");}
    
  }

}
