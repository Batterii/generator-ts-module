const {
	validateFunction,
	validateModule,
	getDefaultModule,
	standAloneAllowed,
} = require('./utils');
const { Generator } = require('@batterii/yeoman-helpers');
const { orderBy } = require('lodash');

class ModuleGenerator extends Generator {
	constructor(args, opts) {
		super(args, opts);

		this.optionPrompt({
			type: 'input',
			name: 'function',
			alias: 'f',
			description: 'Name of the first module function',
			message: 'Enter the name of the first module function.',
			validate: validateFunction,
		});

		this.optionPrompt({
			type: 'input',
			name: 'module',
			alias: 'm',
			description: 'Name of the module, without the extension',
			message: 'Enter the module name, without the extension.',
			default: () => getDefaultModule(this.options),
			validate: validateModule,
		});

		this.optionPrompt({
			type: 'confirm',
			name: 'stand-alone',
			alias: 's',
			description: 'Set if the module will export only one function',
			message: 'Will this module export only one function?',
			default: true,
			allowed: () => standAloneAllowed(this.options),
			whenProhibited: false,
		});
	}

	addModule() {
		// Convert option names to js-friendly variable names.
		const {
			'function': functionName,
			'module': moduleName,
			'stand-alone': standAlone,
		} = this.options;

		// Create the new module file in the lib directory.
		this.copyTemplate(
			'module.ts',
			`lib/${moduleName}.ts`,
			{ functionName, moduleName, standAlone },
		);

		// Get the path for the new test file in the unit test directory.
		const testPath = `test/unit/${moduleName}.ts`;

		if (standAlone) {
			// Create the stand-alone test file with properly sorted imports.
			this.copyTemplate('test-stand-alone.ts', testPath, {
				functionName,
				imports: orderBy([
					{ name: 'expect', path: 'chai' },
					{ name: functionName, path: `../../lib/${moduleName}` },
				], 'name'),
			});
		} else {
			// Create a test file for a multi-function module.
			this.copyTemplate('test-module.ts', testPath, {
				functionName,
				moduleName,
			});
		}
	}
}

module.exports = ModuleGenerator;
