# Meteor TypeScript libraries

This project adds TypeScript definition files related to Meteor.  It includes *meteor.d.ts* plus many others.  These are definitions for Meteor 1.3, and they require TypeScript 1.8 or higher (to allow for string literal types).  These definitions are mostly backwards compatible for any 1.* Meteor version.

## Deprecation?

This package will probably soon be deprecated.  There is currently an effort supported by the Meteor Development Group to create a TypeScript build compiler package, and an early version of the package can be tested using [`barbatus:typescript`](https://atmospherejs.com/barbatus/typescript).  This package will eventually incorporated as a Meteor core package (e.g. like the `coffeescript` package).  It appears that the recommended practice for adding definitions using that package will be to add them using the [`typings`](https://github.com/typings/typings) tool.

You can follow discussion about this effort [here](https://github.com/Urigo/angular2-meteor/issues/102#issuecomment-200915763).


## Why use TypeScript?
[TypeScript](http://www.typescriptlang.org/) is a supserset of JavaScript that enforces *relaxed* static typing and compiles to plain Javascript.  It offers most of the benefits of a strongly typed language without requiring you to use strong typing.

In general, TypeScript will NOT make JavaScript prettier (like CoffeeScript).  However, it can help simplify JavaScript programming for the many object oriented coders out there. TypeScript also provides transparent access to features only available in ECMAScript 7 and above.

For further reading about TypeScript, please refer to the [TypeScript Handbook](http://www.typescriptlang.org/Handbook).
##Usage
### Setup (OSX/Linux)

1. Add a symbolic link to the definitions from within some directory within your project (e.g. ".typescript" or "lib").  The definitions can be found somewhere deep within `<project_root_dir>/.meteor/...`.  The following will probably work:

        $ ln -s ../.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions package_defs

    If the definitions can't be found within the .meteor directory, you will have to manually pull down the definitions from github and add them to your project:
    
    <https://github.com/meteor-typescript/meteor-typescript-libs>

2. Install the [Typescript compiler for Meteor](https://github.com/meteor-typescript/meteor-typescript-compiler) or an [IDE which can transpile TypeScript to JavaScript](#transpiling-typescript).

### Setup (Windows)
1. Typed definitions will be present following a fresh build of meteor at the path:     `<project_root>/.meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions`

    If the definitions can't be found within the .meteor directory, you will have to manually pull down the definitions from github and add them to your project:    

    *Alternatively*, you may find using [tsd](http://definitelytyped.org/tsd/) more flexible than adding typings via meteor. Typings for meteor-typescript files are availble via the command:

        tsd install meteor --save
     
2. A symbolic link may be created for this directory via the cmd:

        mklink /d .typings .meteor/local/build/programs/server/assets/packages/meteortypescript_typescript-libs/definitions
     
### Compiler and Referencing   
1. Install the [Typescript compiler for Meteor](https://github.com/meteor-typescript/meteor-typescript-compiler) or an [IDE which can transpile TypeScript to JavaScript](#transpiling-typescript)
2. From the typescript files, add references.  Reference the definition files with a single line:

        /// <reference path=".typescript/package_defs/all-definitions.d.ts" />  (substitute path in your project)

    Or you can reference definition files individually:
   
        /// <reference path=".typescript/package_defs/meteor.d.ts" />  (substitute path in your project)
        /// <reference path=".typescript/package_defs/underscore.d.ts" />
        /// <reference path=".typescript/package_defs/jquery.d.ts" />

    Meteor core definitions can be referenced in an "all-in-one" definition file ( *meteor.d.ts* ) or definition files specific to the locus of execution:
   
       - *meteor.d.ts*:  all meteor core definitions
       - *meteor.common.d.ts*:  meteor core code running on both client and server
       - *meteor.client.d.ts*:  meteor core client-only code
       - *meteor.server.d.ts*:  meteor core server-only code
       - *meteor.package.d.ts*:  meteor core package-only code
       - *meteor.build.d.ts*:  meteor core build-only code
       
    *meteor.d.ts* contains all of the definitions found in *meteor.common.d.ts*, *meteor.client.d.ts*, *meteor.server.d.ts*, *meteor.package.d.ts*, and *meteor.build.d.ts* 

3. Be aware of differences in coding styles when using TypeScript (see below)



##  TypeScript/Meteor coding style

### References

Meteor code can run on the client and the server, for this reason you should try to stay away from referencing *file.ts* directly: you may get unexpected results.

Rather generate a *file.d.ts* using `tsc --declaration file.ts`, and reference it in your file. 
  
Compilation will be much faster and code will be cleaner - it's always better to split definition from implementation anyways.

### Templates

With the exception of the **body** and **head** templates, Meteor's Template dot notation cannot be used (ie. *Template.mytemplate*). Thanks to Typescript static typing checks, you will need to use the *bracket notation* to access the Template.


    Template['myTemplateName'].helpers({
      foo: function () {
        return Session.get("foo");
      }
    });

    Template['myTemplateName'].onRendered(function ( ) { ... });
    

### Form fields

Form fields typically need to be cast to `<HTMLInputElement>`. For instance to read a form field value, use `(<HTMLInputElement>evt.target).value`.

### Global variables

Preface any global variable declarations with a TypeScript "declare var" statement (or place the statement in a definition file):

    declare var NavbarHelpers;
    NavbarHelpers = {};
    NavbarHelpers.someMethod = function() {...}

### Collections

The majority of extra work required to use TypeScript with Meteor is creating and maintaining the collection interfaces.  However, doing so also provides the additional benefit of succinctly documenting collection schema definitions (that are actually enforced).

To define collections, you will need to create an interface representing the collection and then declare a Collection type variable with that interface type (as a generic):

    interface JobDAO {
      _id?: string;
      name: string;
      status?: string;
      queuedAt?: string;
    }

    declare var Jobs: Mongo.Collection<JobDAO>;
    Jobs = new Mongo.Collection<JobDAO>('jobs');


Finally, any TypeScript file using collections will need to contain a reference at the top pointing to the collection definitions:

    /// <reference path=".typescript/package_defs/meteor.d.ts"/>
    /// <reference path=".typescript/custom_defs/collections.ts"/>

### Creating definition files

Here is a guide to creating definitions: <http://www.typescriptlang.org/Handbook#writing-dts-files>

If you have lots of custom definitions for a project, you can:

- Create multiple definition files and include individual references to each definition file.
- Create one huge monolithic definition file so you only have to refer to that file.
- Create multiple definition files, and create a definition file with references to the other definitions files so that you only have to maintain one reference for all of you custom definitions.  e.g. contents of ".typescript/custom_defs/custom-definitions.d.ts":

        /// <reference path='collections.ts' />
        /// <reference path='paraview_helpers.d.ts'/>
        /// <reference path='handsontable.d.ts'/>
        /// <reference path='utility_helpers.ts'/>


## Transpiling TypeScript

### Meteor plugin
One solution for transpiling typescript is to install the following meteor package: [https://github.com/meteor-typescript/meteor-typescript-compiler](https://github.com/meteor-typescript/meteor-typescript-compiler)

### IDE/Editor Transpilation
WebStorm, SublimeText, Atom, and VisualStudio all support TypeScript.  They can automatically transpile your TypeScript code into JavaScript every time you save a file.

#### WebStorm ####
To support TypeScript in WebStorm on OSX, first install the TypeScript transpiler on your system:

    $ [sudo -H] npm install -g typescript

On version 10 of WebStorm or later, got to Preferences -> Languages & Frameworks -> TypeScript and check "Enable TypeScript Compiler"

On older versions of WebStorm (9 or earlier), go to Preferences -> File Watchers -> "+" symbol and add TypeScript.

#### SublimeText, Atom, and VisualStudio ####
Please refer to the documentation for these editors.

### Command line

The last option is to compile code from the command line. With node and the TypeScript compiler installed:

    $ tsc *.ts

## Contributing

Contributions are welcome. Remember that this project is about typing meteor packages in TypeScript.

* Adding new definition files for definitions not found in the [DefinitelyTyped repo](https://github.com/borisyankov/DefinitelyTyped) (e.g. Meteor packages) is now easy.  Just add the definition file in the `./definitions` directory.  The script will automatically alter *package.js* and *./definitions/all-definitions.d.ts*.  Please attempt to create a test file as well in ./script-definition-tests and ./tinytest-definition-tests as well.
* Adding new third-party definition files found in the [DefinitelyTyped repo](https://github.com/borisyankov/DefinitelyTyped) should add new entries to this section of `./scripts/generate-definition-files.js`:

        const thirdPartyDefLibs = [
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/underscore/underscore.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/underscore.string/underscore.string.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/jquery/jquery.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/backbone/backbone.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/backbone/backbone-global.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/bootstrap/bootstrap.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/d3/d3.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/handlebars/handlebars.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node-0.11.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/node-fibers/node-fibers.d.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/googlemaps/google.maps.d.ts',
            'https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/cryptojs/cryptojs.d.ts',
            'https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/moment/moment-node.d.ts'
        ];
        
        const thirdPartyDefTests = [
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/underscore/underscore-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/underscore.string/underscore.string-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/jquery/jquery-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/backbone/backbone-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/bootstrap/bootstrap-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/d3/d3-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/handlebars/handlebars-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/node/node-0.11-tests.ts',
            'https://github.com/borisyankov/DefinitelyTyped/raw/master/node-fibers/node-fibers-tests.ts',
            'https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/master/moment/moment-tests.ts'
        ];

* Changes to the smart package definitions can be made directly to those definition files (e.g. ironrouter.d.ts).
* Changes to the definitions for any third party libraries (e.g. jquery.d.ts) should be submitted as pull requests to the [DefinitelyTyped repo](https://github.com/borisyankov/DefinitelyTyped).
* Most changes to the meteor core definition files, ("meteor.d.ts", "meteor.client.d.ts", "meteor.server.d.ts", etc), should be made by altering "scripts/generate-definition-files.js".  Often, fixing a type/signature mapping near the top is all that is necessary.  Corresponding changes should also be made to "script-definition-tests/meteor-tests.ts" and "tinytest-definition-tests/meteor-tests.ts".
    * Some meteor core definitions can be found in manually maintained definition files ("lib/meteor-common-manually-maintained-definitions.d.ts", "lib/meteor-client-manually-maintained-definitions.d.ts", etc), which contain definitions that can't be automatically generated.
    * Alternately, just submit an issue in the github repo, and someone else will take care of it

### Creating meteor.d.ts and its related files

All definition files in this Meteor package are generated by executing the makefile (depends on *npm*):

    $ make

The makefile generates *meteor.d.ts, meteor.common.d.ts, meteor.client.d.ts, meteor.server.d.ts, meteor.package.d.ts, and meteor.package.d.ts* from the same [Meteor data.js file](https://github.com/meteor/meteor/blob/devel/docs/client/data.js) that is used to generate the official [Meteor docs](http://docs.meteor.com/).

This script also retrieves the latest third-party library definitions from the [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) repo, which is the semi-official repository for TypeScript definition files.  Running this script will also run any specified tests found on [DefinitelyTyped](https://github.com/borisyankov/DefinitelyTyped) as well as the tests for meteor.d.ts and any other meteor packages.  All tests that are run can be found in "script-definition-tests/".

Finally, this script creates *package.js* and *./definitions/all-definitions.d.ts* with file lists of the definition files found in the ./definitions directory.

### Creating Definitions
Writing typed definition files takes practice and experimentation, please refer to [this guide](http://www.typescriptlang.org/Handbook#writing-dts-files) for more details.


