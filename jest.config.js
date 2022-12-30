/**
 * WordPress dependencies
 */
const baseConfig = require('@wordpress/scripts/config/jest-e2e.config');

module.exports = {
	...baseConfig,
	testMatch: ['**/src/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
	setupFilesAfterEnv: [
		'@wordpress/jest-console',
		'@wordpress/jest-puppeteer-axe',
		'expect-puppeteer',
		'puppeteer-testing-library/extend-expect',
	],
	testPathIgnorePatterns: ['/node_modules/'],
};
