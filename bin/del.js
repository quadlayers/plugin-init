//del command is used to remove files

const fs = require('fs');

//Get arguments
const myArgs = process.argv.slice(2);

//Foreach arguments/files
myArgs.forEach((element) => {
	//Delete file
	fs.rm(element, (err) => {
		err ? console.log('\x1b[33m%s\x1b[0m',`${element} not deleted`) : console.log('\x1b[32m%s\x1b[0m',`${element} deleted`);
	});
});
