function doPost(e) {
  // Enable CORS
  var headers = {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json"
  };
  
  try {
    // Parse the incoming request
    var request = JSON.parse(e.postData.contents);
    var nameToCheck = request.name.toLowerCase().trim();
    
    // Open the spreadsheet using its ID
    var spreadsheet = SpreadsheetApp.openById("1MQCVVFrhtwAbHiXPAzSZNfy8G7vbEszU54ab2H0EXBQ");
    var sheet = spreadsheet.getSheetByName("Sheet1"); // Adjust sheet name as needed
    
    // Get all names from the name column
    var nameRange = sheet.getRange("A2:A").getValues();
    var names = nameRange.map(row => row[0].toString().toLowerCase().trim());
    
    // Check if the name exists
    var isValid = names.includes(nameToCheck);
    
    return ContentService.createTextOutput(JSON.stringify({
      isValid: isValid,
      message: isValid ? "Name verified" : "Name not found"
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      isValid: false,
      error: "An error occurred during verification"
    }))
    .setMimeType(ContentService.MimeType.JSON)
    .setHeaders(headers);
  }
}

function doGet(e) {
  return doPost(e);
}