// Include the required modules: 'request' for HTTP requests and 'fs' for file system operations
const request = require('request');
const fs = require('fs');

// Retrieve command line arguments: 
// process.argv[2] is the URL to download from
// process.argv[3] is the file path to save the data
const url = process.argv[2];
const path = process.argv[3];

// Perform an HTTP request to the provided URL
request(url, (error, _, body) => {
  // Handle any error that occurs during the HTTP request
  if (error) {
    console.error('Error fetching URL:', error);
    return;
  }

  // Write the received data ('body') to the file specified by the 'path'
  fs.writeFile(path, body, (err) => {
    // Handle any errors that occur during file writing
    if (err) {
      console.error('Error writing to file:', err);
      return;
    }

    // Calculate the size of the data written to the file
    // Buffer.byteLength is used to handle different character encodings correctly
    const fileSize = Buffer.byteLength(body);

    // Output a success message indicating the number of bytes written and the file path
    console.log(`Downloaded and saved ${fileSize} bytes to ${path}`);
  });
});
