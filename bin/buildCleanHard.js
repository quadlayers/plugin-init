const fs = require('fs');

const pluginName = process.env.npm_package_name;

//Delete plugin folder
fs.rm('./' + pluginName, {recursive: true}, (err) => {
	err ? console.log('\x1b[33m%s\x1b[0m', `./${pluginName} folder not deleted`) : console.log('\x1b[32m%s\x1b[0m',`./${pluginName} folder deleted`);
});

//Delete plugn zip
fs.rm('./' + pluginName + '.zip', (err) => {
	err ? console.log('\x1b[33m%s\x1b[0m', `./${pluginName}.zip not deleted`) : console.log('\x1b[32m%s\x1b[0m',`./${pluginName}.zip deleted`);
});
