const fs = require('fs');

const pluginName = process.env.npm_package_name;

//Delete plugn zip
fs.rm('./' + pluginName + '.zip', (err) => {
	err ? console.log('\x1b[33m%s\x1b[0m', `./${pluginName}.zip not deleted`) : console.log('\x1b[32m%s\x1b[0m',`./${pluginName}.zip deleted`);
});
