# @batterii-generator-ts-module
A [yeoman](https://yeoman.io/) generator for creating static function modules in
Batterii TypeScript projects.

## Usage
```
  yo @batterii/ts-module [options]

Options:
  -h,   --help           # Print the generator's options and usage
        --skip-cache     # Do not remember prompt answers                                                                                 Default: false
        --skip-install   # Do not automatically install dependencies                                                                      Default: false
        --force-install  # Fail on install dependencies error                                                                             Default: false
  -f,   --function       # Name of the first module function
  -m,   --module         # Name of the module, without the extension
  -s,   --stand-alone    # Set if the module will export only one function

```

## Function and Module Names
This generator will create a new `.ts` file in the `lib` directory with
`--module` as its name, which exports a function with `--function` as its name.
It also will create associated unit test file in the `test/unit` directory. If
either of these options is omitted, the generator will prompt the user for them.

The function name must be a valid TypeScript identifier in lower camel case,
while the module name must be dash-separated lower case. The prompt for the
module name defaults to the decamelized function name, so often times you can
just press enter here unless you need the module to be named differently.

## Stand-Alone Function Modules
Normally, when you create a new module, a `describe` block for the first
function is nested inside a `describe` block for the while module in its unit
test file. This makes it easy to add tests for any related functions that might
be added to the same module.

Many modules will export only one function, however, so these nested `describe`
blocks can often become redundant. If you know this will be the case, you can
run the generator with the `--stand-alone` option, which will omit the
surrounding `describe` block, among other elements you're not going to need for
a single-function module.

The `--stand-alone` option is ignored if the module name is not equal to the
decamelized function name. This is to enforce naming conventions that make the
developer's life easier. A stand-alone function inside a module with a
completely different name would be difficult to find based on the test names
alone, so this generator does not allow it.

If the `--stand-alone` option (or its negation `--no-stand-alone`) is not
provided, and the module name is equal to the decamelized function name, the
generator will prompt the user to determine what to do.
