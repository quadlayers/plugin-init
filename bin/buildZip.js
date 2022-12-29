const fs = require('fs');
const fsp = require('fs/promises');
const path = require('path');
const JSZip = require('jszip');

const pluginName = process.env.npm_package_name;

/**
 * Returns a flat list of all files and subfolders for a directory (recursively).
 * @param {string} dir
 * @returns {Promise<string[]>}
 */
const getFilePathsRecursively = async (dir) => {
	// returns a flat array of absolute paths of all files recursively contained in the dir
	const list = await fsp.readdir(dir);
	const statPromises = list.map(async (file) => {
		const fullPath = path.resolve(dir, file);
		const stat = await fsp.stat(fullPath);
		if (stat && stat.isDirectory()) {
			return getFilePathsRecursively(fullPath);
		}
		return fullPath;
	});

	return (await Promise.all(statPromises)).flat(Infinity);
};

/**
 * Creates an in-memory zip stream from a folder in the file system
 * @param {string} dir
 * @returns {JSZip}
 */
const createZipFromFolder = async (dir) => {
	const absRoot = path.resolve(dir);
	const filePaths = await getFilePathsRecursively(dir);
	return filePaths.reduce((z, filePath) => {
		const relative = filePath.replace(absRoot, '');
		// create folder trees manually :(
		const zipFolder = path
			.dirname(relative)
			.split(path.sep)
			.reduce((zf, dirName) => zf.folder(dirName), z);

		zipFolder.file(path.basename(filePath), fs.createReadStream(filePath));
		return z;
	}, new JSZip());
};

/**
 * Compresses a folder to the specified zip file.
 * @param {string} srcDir
 * @param {string} destFile
 */
const compressFolder = async (srcDir, destFile) => {
	const start = Date.now();
	try {
		const zip = await createZipFromFolder(srcDir);
		zip.generateNodeStream({ streamFiles: true, compression: 'DEFLATE' })
			.pipe(fs.createWriteStream(destFile))
			.on('error', (err) =>
				console.error('Error writing file', err.stack)
			)
			.on('finish', () =>
				console.log(
					'Zip written successfully:',
					Date.now() - start,
					'ms'
				)
			);
	} catch (ex) {
		console.error('Error creating zip', ex);
	}
};

//Delete old plugn zip
fs.unlink('./' + pluginName + '.zip', function (err) {
	console.log(err);
	compressFolder('./' + pluginName, './' + pluginName + '.zip');
});
