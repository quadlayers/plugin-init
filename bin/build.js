const fs = require('fs');
const path = require('path');

const pluginName = process.env.npm_package_name;

function copyFileSync(source, target) {
	var targetFile = target;

	// If target is a directory, a new file with the same name will be created
	if (fs.existsSync(target)) {
		if (fs.lstatSync(target).isDirectory()) {
			targetFile = path.join(target, path.basename(source));
		}
	}

	fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source, target) {
	var files = [];

	// Check if folder needs to be created or integrated
	var targetFolder = path.join(target, path.basename(source));
	if (!fs.existsSync(targetFolder)) {
		fs.mkdirSync(targetFolder);
	}

	// Copy
	if (fs.lstatSync(source).isDirectory()) {
		files = fs.readdirSync(source);
		files.forEach(function (file) {
			var curSource = path.join(source, file);
			if (fs.lstatSync(curSource).isDirectory()) {
				copyFolderRecursiveSync(curSource, targetFolder);
			} else {
				copyFileSync(curSource, targetFolder);
			}
		});
	}
}

//Add folder to gitignore
fs.readFile('./.gitignore', function (err, data) {
	if (err) throw err;
	if (data.indexOf('/' + pluginName + '/') >= 0) {
		// Ya está la carpeta del plugin en el .gitignore
	} else {
		// No encontro el plugin en el .gitignore
		fs.appendFileSync('./.gitignore', '/' + pluginName + '/');
	}
});

//Add folder to prettierignore
fs.readFile('./.prettierignore', function (err, data) {
	if (err) throw err;
	if (data.indexOf(pluginName) >= 0) {
		// Ya está la carpeta del plugin en el .gitignore
	} else {
		// No encontro el plugin en el .gitignore
		fs.appendFileSync('./.prettierignore', pluginName);
	}
});

//Add folder to eslintignore
fs.readFile('./.eslintignore', function (err, data) {
	if (err) throw err;
	if (data.indexOf(pluginName) >= 0) {
		// Ya está la carpeta del plugin en el .gitignore
	} else {
		// No encontro el plugin en el .gitignore
		fs.appendFileSync('./.eslintignore', pluginName);
	}
});

//Delete the old plugin folder
fs.rm('./' + pluginName, {recursive: true}, (err) => {
	err ? console.log('\x1b[33m%s\x1b[0m', `./${pluginName} folder not deleted`) : console.log('\x1b[32m%s\x1b[0m',`./${pluginName} folder deleted`);
	//Create folder pluginName
	fs.mkdir(pluginName, function () {
		console.log('\x1b[32m%s\x1b[0m',`./${pluginName} folder successfully created`)
		copyFolderRecursiveSync('./build', './' + pluginName);
		copyFolderRecursiveSync('./src', './' + pluginName);
	});
});
