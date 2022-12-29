const fs = require('fs');

const pluginName = process.env.npm_package_name;

//Delete plugin folder
fs.rm('./' + pluginName, { recursive: true, force: true }, (err) => {
	console.log(err);
});

//Delete plugn zip
fs.unlink('./' + pluginName + '.zip', (err) => {
	console.log(err);
});
