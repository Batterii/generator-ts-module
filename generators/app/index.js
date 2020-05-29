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

		// Create the new module file in the src/lib directory.
		this.copyTemplate(
			'module.ts',
			`src/lib/${moduleName}.ts`,
			{ functionName, moduleName, standAlone },
		);

		// Get the path for the new spec file in the src/lib directory.
		const specPath = `src/lib/${moduleName}.spec.ts`;

		if (standAlone) {
			// Create the stand-alone spec file with properly sorted imports.
			this.copyTemplate('spec-stand-alone.ts', specPath, {
				functionName,
				imports: orderBy([
					{ name: 'expect', path: 'chai' },
					{ name: 'sinon', path: 'sinon', isDefault: true },
					{ name: functionName, path: `../../lib/${moduleName}` },
				], 'name'),
			});
		} else {
			// Create a spec file for a multi-function module.
			this.copyTemplate('spec-module.ts', specPath, {
				functionName,
				moduleName,
			});
		}
	}
}

module.exports = ModuleGenerator;
