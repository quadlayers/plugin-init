const fs = require('fs');
const { consoleSuccess } = require('./helpers');

// Get arguments
const myArgs = process.argv.slice(2);

// For each argument/folder
myArgs.forEach((element) => {
  // Check if it's a directory
  fs.stat(element, (err, stats) => {
    if (err) {
      console.log(err);
      return;
    }

    if (stats.isDirectory()) {
      // Delete only if the directory ends with .zip
      if (element.endsWith('.zip')) {
        fs.rm(element, { recursive: true }, (err) => {
          err ?? consoleSuccess(`${element} deleted`);
        });
      }
    }
  });
});
