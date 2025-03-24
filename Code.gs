function processRequest(e) {
  try {
    // Initialize event object if undefined
    e = e || {};
    
    // Log the entire event object for debugging
    console.log("Full event object:", JSON.stringify(e));
    console.log("Request parameters:", JSON.stringify(e.parameter));
    console.log("Query string:", e.queryString);
    
    // Check if parameters come from query string or post data
    let parameters = {};
    
    // Get parameters from query string
    if (e.parameter) {
      parameters = { ...e.parameter };
    }
    
    // If this is a POST request, try to parse postData
    if (e.postData) {
      try {
        const postData = JSON.parse(e.postData.contents);
        parameters = { ...parameters, ...postData };
      } catch (parseError) {
        console.log("Failed to parse postData:", e.postData.contents);
      }
    }
    
    console.log("Final processed parameters:", JSON.stringify(parameters));
    
    // Validate input parameters
    if (!parameters.callback || !parameters.name) {
      const response = {
        success: false,
        error: "Missing required parameters",
        received: parameters,
        requiredParams: ["callback", "name"],
        debug: {
          hasEvent: !!e,
          hasParameter: !!e.parameter,
          hasPostData: !!e.postData,
          queryString: e.queryString
        }
      };
      
      return ContentService
        .createTextOutput(JSON.stringify(response))
        .setMimeType(ContentService.MimeType.JSON)
        .setHeaders({
          'Access-Control-Allow-Origin': '*'
        });
    }

    var callback = parameters.callback;
    var nameToCheck = parameters.name.toLowerCase().trim();
    
    var spreadsheet = SpreadsheetApp.openById("1MQCVVFrhtwAbHiXPAzSZNfy8G7vbEszU54ab2H0EXBQ");
    var sheet = spreadsheet.getSheetByName("Sheet1");
    
    var nameRange = sheet.getRange("A2:A").getValues();
    var names = nameRange.map(row => String(row[0]))
                        .filter(name => name !== "");
    
    // Store original names for returning the correct case
    var namesMap = names.reduce((acc, name) => {
      acc[name.toLowerCase().trim()] = name;
      return acc;
    }, {});
    
    // Convert names to lowercase for comparison
    var lowerNames = names.map(name => name.toLowerCase().trim());
    
    // Check for both exact and partial (first name) matches
    var exactMatch = lowerNames.includes(nameToCheck);
    var partialMatch = lowerNames.find(name => name.startsWith(nameToCheck + " "));
    
    // Get the original cased name
    var matchedName = null;
    if (exactMatch) {
      matchedName = namesMap[nameToCheck];
    } else if (partialMatch) {
      matchedName = namesMap[partialMatch];
    }
    
    var result = {
      success: true,
      isValid: exactMatch || !!partialMatch,
      fullName: matchedName,
      message: exactMatch || partialMatch ? "Name verified" : "Name not found"
    };
    
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      });
      
  } catch (error) {
    console.error("Script error:", error.toString());
    console.error("Error stack:", error.stack);
    
    const callback = (e && e.parameter && e.parameter.callback) ? e.parameter.callback : 'callback';
    const result = {
      success: false,
      error: error.toString(),
      stack: error.stack,
      debug: {
        hasEvent: !!e,
        hasParameter: !!e.parameter,
        hasPostData: !!e.postData
      }
    };
    
    return ContentService
      .createTextOutput(callback + '(' + JSON.stringify(result) + ')')
      .setMimeType(ContentService.MimeType.JAVASCRIPT)
      .setHeaders({
        'Access-Control-Allow-Origin': '*',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      });
  }
}

function doGet(e) {
  console.log("doGet called with:", JSON.stringify(e));
  return processRequest(e);
}

function doPost(e) {
  console.log("doPost called with:", JSON.stringify(e));
  return processRequest(e);
}
