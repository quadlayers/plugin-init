// makepot.js
const fs = require( 'fs' );
const path = require( 'path' );
const { execSync } = require( 'child_process' );
const { pluginName } = require( './helpers' );

// Get the base directory of the project
const baseDir = process.cwd();

// Read the package.json file
const packageJson = require( path.join( baseDir, 'package.json' ) );

// Get the package name and replace any invalid characters
// const pluginName = packageJson.name.replace(/[^a-z0-9]/gi, '-').toLowerCase();

// Define the output directory and file
const outputDir = path.join( baseDir, 'languages' );
const outputFile = path.join( outputDir, `${ pluginName }.pot` );

// Create the output directory if it doesn't exist
if ( ! fs.existsSync( outputDir ) ) {
	fs.mkdirSync( outputDir );
}

// Define the include list
const include = packageJson.files.join( ',' );

// Define the exclude list
const exclude = 'vendor,node_modules,tests';

// Construct the command
const command = `php .tools/vendor/wp-cli/wp-cli/php/boot-fs.php i18n make-pot ${ baseDir } ${ outputFile } --include=${ include } --exclude=${ exclude }`;

try {
	// Run the command
	execSync( command, { stdio: 'inherit' } );
	console.log( `.pot file has been generated at ${ outputFile }` );
} catch ( error ) {
	console.error( 'An error occurred while generating the .pot file:', error );
}
