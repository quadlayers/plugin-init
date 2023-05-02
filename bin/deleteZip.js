const fs = require('fs');
const { consoleSuccess } = require('./helpers');

const args = process.argv.slice(2);

// For each argument/file
args.forEach((file) => {
  // Delete only if the file ends with .zip
  if (file.endsWith('.zip')) {
    fs.rm(file, { recursive: true }, (err) => {
      if (err) {
        console.log(err);
      } else {
        consoleSuccess(`${file} deleted`);
      }
    });
  }
});
