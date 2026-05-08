// HOW TO USE THIS SCRIPT:
// 1. Open your Google Sheet: https://docs.google.com/spreadsheets/d/1940KM6WzNLsoWjh-nmYkyE--EphQliJHZDle1JEg3ac/edit
// 2. Click on Extensions > Apps Script
// 3. Delete any code there and paste ALL of this code.
// 4. Click the "Deploy" button at the top right > "New deployment"
// 5. Select type "Web app"
// 6. Execute as: "Me"
// 7. Who has access: "Anyone"
// 8. Click Deploy, authorize the permissions, and make sure your URL matches the one you provided.

function doPost(e) {
  try {
    // 1. Parse the incoming JSON data from the React app
    const data = JSON.parse(e.postData.contents);
    
    // 2. Connect to the active Google Sheet
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    
    // If sheet is empty, add headers
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Date", "Target Name", "Target Phone", "Target Social",
        "User Name", "User Phone", "User Email", 
        "Category", "Subcategory", "Relation", "State", "Uploaded Files"
      ]);
    }
    
    // 3. Handle File Uploads to Google Drive
    let fileUrls = [];
    if (data.files && data.files.length > 0) {
      // Create or get the "uploads" folder in the same location as the spreadsheet
      const sheetFile = DriveApp.getFileById(SpreadsheetApp.getActiveSpreadsheet().getId());
      const parentFolder = sheetFile.getParents().next();
      
      let uploadFolder;
      const folders = parentFolder.getFoldersByName("uploads");
      if (folders.hasNext()) {
        uploadFolder = folders.next();
      } else {
        uploadFolder = parentFolder.createFolder("uploads");
      }
      
      // Save each file
      for (let i = 0; i < data.files.length; i++) {
        const fileData = data.files[i];
        
        // Decode base64 data
        const decodedData = Utilities.base64Decode(fileData.data);
        const blob = Utilities.newBlob(decodedData, fileData.type, fileData.name);
        
        // Create file in the uploads folder
        const newFile = uploadFolder.createFile(blob);
        fileUrls.push(newFile.getUrl());
      }
    }
    
    // 4. Save Text Data to the Sheet
    sheet.appendRow([
      data.submission_date,
      data.t_name,
      data.t_phone,
      data.t_social,
      data.u_name,
      data.u_phone,
      data.u_email,
      data.category,
      data.sub,
      data.relation,
      data.state,
      fileUrls.join(", ") // Save links to the uploaded images in the sheet
    ]);
    
    // 5. Return Success Response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: true, 
      message: "Data and files saved successfully" 
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    // Return Error Response
    return ContentService.createTextOutput(JSON.stringify({ 
      success: false, 
      message: error.toString() 
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
