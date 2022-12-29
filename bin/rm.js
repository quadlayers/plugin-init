//rm command is used to remove folders

const fs = require('fs');

//Get arguments
const myArgs = process.argv.slice(2);

//Foreach arguments/folders
myArgs.forEach((element) => {
	//Delete folder
	fs.rm(element,{recursive: true}, (err) => {
		err ? console.log('\x1b[33m%s\x1b[0m', `${element} not deleted`) : console.log('\x1b[32m%s\x1b[0m', `${element} deleted`);
	});
});
