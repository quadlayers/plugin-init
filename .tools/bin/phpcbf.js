const { execSync } = require( 'child_process' );
const { pluginFiles } = require( './helpers' );

// Define the exclude list
const excludeFiles = [
	'node_modules',
	'languages',
	'vendor',
	'tests',
	'build',
];

// Filtered include files
const includeFiles = pluginFiles.filter(
	( file ) => ! excludeFiles.includes( file )
);

// Construct the command
const command = `php .tools/vendor/bin/phpcbf ${ includeFiles.join( ' ' ) }`;

try {
	// Run the command
	execSync( command, { stdio: 'inherit' } );
	console.log( `.php files has been formated` );
} catch ( error ) {
	console.error(
		'An error occurred while formatting the .php files:',
		error
	);
}
