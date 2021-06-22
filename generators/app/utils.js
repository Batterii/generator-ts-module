const decamelize = require("decamelize");

// Regex patterns for validation.
const namePattern = /^[a-z][A-Za-z0-9]*$/;
const modulePattern = /^[a-z0-9-]+$/;

/**
 * Validates a function name.
 * @param {string} name - Function name to validate.
 * @returns {boolean|string} - `true` if the name is valid, an error message
 *   otherwise.
 */
exports.validateFunction = function(name) {
	return namePattern.test(name) ||
		"Function name must be a valid identifier in lower camel case";
};

/**
 * Validates a module name.
 * @param {string} name - Module name to validate.
 * @returns {boolean|string} - `true` if the name is valid, an error message
 *   otherwise.
 */
exports.validateModule = function(name) {
	return modulePattern.test(name) ||
		"Module name must be dash-separated lower case";
};

/**
 * Gets the default module name, based on existing options.
 * @param {object} options - Existing generator options.
 * @returns {string} - The decamlized function name.
 */
exports.getDefaultModule = function(options) {
	return decamelize(options.function, {separator: "-"});
};

/**
 * Checks whether the stand-alone option can be configured, either through
 * prompts or by CLI options.
 * @param {object} options - Existing generator options.
 * @returns {boolean} - `true` if the module name matches the decamelized
 *   function name. `false` otherwise. This enforces conventions that
 *   stand-alone function modules should be named based on the single function
 *   within them.
 */
exports.standAloneAllowed = function(options) {
	return options.module === exports.getDefaultModule(options);
};
