const fs = require( 'fs' );
const path = require( 'path' );
// Get the base directory of the project
const baseDir = process.cwd();

const packageJson = require( path.join( baseDir, 'package.json' ) );
const pluginFolder = packageJson.name;
const pluginName = packageJson.name;
const pluginFiles = packageJson.files.filter( ( file ) =>
	fs.existsSync( path.join( baseDir, file ) )
);

const { consoleSuccess } = require( './console' );

/**
 * Copy file from source to target.
 *
 * @param {string} source
 * @param {string} target
 */
const copyFileFromTo = ( source, target ) => {
	// If target is a directory, a new file with the same name will be created
	if ( fs.existsSync( target ) ) {
		if ( fs.lstatSync( target ).isDirectory() ) {
			target = path.join( target, path.basename( source ) );
		}
	}
	fs.writeFileSync( target, fs.readFileSync( source ) );
};

/**
 * Copy folder recursive source to target.
 *
 * @param {string} source
 * @param {string} target
 */
const copyFolderFromTo = ( source, target ) => {
	// Check if folder needs to be created or integrated
	const targetFolder = path.join( target, path.basename( source ) );
	// Create target folder if it doesn't exist
	if ( ! fs.existsSync( targetFolder ) ) {
		fs.mkdirSync( targetFolder );
	}
	// Copy folder or folder files
	if ( fs.lstatSync( source ).isDirectory() ) {
		const files = fs.readdirSync( source );
		files.forEach( function ( file ) {
			const filePath = path.join( source, file );
			if ( fs.lstatSync( filePath ).isDirectory() ) {
				copyFolderFromTo( filePath, targetFolder );
			} else {
				copyFileFromTo( filePath, targetFolder );
			}
		} );
	}
};

/**
 * Copy file or folder recursive source to target.
 *
 * @param {string} source
 * @param {string} target
 */
const copyFromTo = ( source, target ) => {
	// Check if is folder or file
	if ( fs.lstatSync( source ).isDirectory() ) {
		copyFolderFromTo( source, target );
	} else {
		copyFileFromTo( source, target );
	}
};

/**
 * Copy files from source to target.
 *
 * @param {Array} files
 */
const copyFromToArr = async ( files ) => {
	for ( const file of files ) {
		const { source, target = pluginFolder, required = false } = file;
		if ( required ) {
			copyFromTo( source, target );
		} else {
			fs.access( source, function ( error ) {
				if ( ! error ) {
					copyFromTo( source, target );
				}
			} );
		}
	}
};

const moveFromTo = async ( source, target ) => {
	try {
		const sourcePath = path.resolve( source );
		const targetPath = path.resolve( target );

		if ( ! fs.existsSync( targetPath ) ) {
			fs.mkdirSync( targetPath );
		}

		fs.rename( sourcePath, targetPath, function ( err ) {
			if ( err ) throw err;
		} );
	} catch ( ex ) {
		console.error( 'Error moving folder', ex );
	}
};

const deleteFromPluginFolder = async ( source ) => {
	try {
		fs.rm( pluginFolder + source, { recursive: true }, ( err ) => {
			err ?? consoleSuccess( `${ pluginFolder + source } deleted` );
		} );
	} catch ( ex ) {
		console.error( 'Error deleting folder', ex );
	}
};

module.exports.baseDir = baseDir;
module.exports.pluginName = pluginName;
module.exports.pluginFolder = pluginFolder;
module.exports.packageJson = packageJson;
module.exports.pluginFiles = pluginFiles;
module.exports.copyFromToArr = copyFromToArr;
module.exports.deleteFromPluginFolder = deleteFromPluginFolder;
module.exports.copyFileFromTo = copyFileFromTo;
module.exports.copyFolderFromTo = copyFolderFromTo;
module.exports.copyFromTo = copyFromTo;
