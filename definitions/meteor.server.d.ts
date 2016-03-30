/**
 *  Meteor definitions for TypeScript
 *  author - Olivier Refalo - orefalo@yahoo.com
 *  author - David Allen - dave@fullflavedave.com
 *
 *  Thanks to Sam Hatoum for the base code for auto-generating this file.
 *
 *  supports Meteor 1.3
 */


/**
 * These are the server modules and interfaces that can't be automatically generated from the Meteor data.js file
 */

declare namespace Meteor {
    interface EmailFields {
        from?: () => string;
        subject?: (user: Meteor.User) => string;
        text?: (user: Meteor.User, url: string) => string;
        html?: (user: Meteor.User, url: string) => string;
    }

    interface EmailTemplates {
        from?: string;
        siteName?: string;
        headers?: { [id: string]: string };  // TODO: should define IHeaders interface
        resetPassword?: Meteor.EmailFields;
        enrollAccount?:  Meteor.EmailFields;
        verifyEmail?:  Meteor.EmailFields;
    }

    interface Connection {
        id: string;
        close: Function;
        onClose: Function;
        clientAddress: string;
        httpHeaders: Object;
    }

    interface IValidateLoginAttemptCbOpts {
        type: string;
        allowed: boolean;
        error: Error;
        user: Meteor.User;
        connection: Meteor.Connection;
        methodName: string;
        methodArguments: any[];
    }
}

declare namespace Mongo {
    interface AllowDenyOptions {
        insert?: (userId: string, doc: any) => boolean;
        update?: (userId: string, doc: any, fieldNames: string[], modifier: any) => boolean;
        remove?: (userId: string, doc: any) => boolean;
        fetch?: string[];
        transform?: Function;
    }
}

declare namespace Accounts {
    interface IValidateLoginAttemptCbOpts {
      	type?: string;
      	allowed?: boolean;
      	error?: Meteor.Error;
      	user?: Meteor.User;
      	connection?: Meteor.Connection;
      	methodName?: string;
      	methodArguments?: any[];
      }
}

interface MailComposerOptions {
    escapeSMTP: boolean;
    encoding: string;
    charset: string;
    keepBcc: boolean;
    forceEmbeddedImages: boolean;
}

declare var MailComposer: MailComposerStatic;
interface MailComposerStatic {
    new(options: MailComposerOptions): MailComposer;
}
interface MailComposer {
    addHeader(name: string, value: string): void;
    setMessageOption(from: string, to: string, body: string, html: string): void;
    streamMessage(): void;
    pipe(stream: any /** fs.WriteStream **/): void;
}
declare namespace Accounts {
	function addEmail(userId: string, newEmail: string, verified?: boolean): void;
	var emailTemplates: Meteor.EmailTemplates;
	function findUserByEmail(email: string): Object;
	function findUserByUsername(username: string): Object;
	function removeEmail(userId: string, email: string): void;
	function sendEnrollmentEmail(userId: string, email?: string): void;
	function sendResetPasswordEmail(userId: string, email?: string): void;
	function sendVerificationEmail(userId: string, email?: string): void;
	function setPassword(userId: string, newPassword: string, options?: {
				logout?: Object;
			}): void;
	function setUsername(userId: string, newUsername: string): void;
	var ui: {
		};
	function onCreateUser(func: Function): void;
	function validateLoginAttempt(cb: (params: Accounts.IValidateLoginAttemptCbOpts) => boolean): { stop: () => void };
	function validateNewUser(func: Function): boolean;
}

declare namespace App {
	function accessRule(pattern: string, options?: {
				type?: string;
				launchExternal?: boolean;
			}): void;
	function configurePlugin(id: string, config: Object): void;
	function icons(icons: Object): void;
	function info(options: {
				id?: string;
				 version?: string;
				 name?: string;
				 description?: string;
				 author?: string;
				 email?: string;
				 website?: string;
			}): void;
	function launchScreens(launchScreens: Object): void;
	function setPreference(name: string, value: string, platform?: string): void;
}

declare namespace Assets {
	function getBinary(assetPath: string, asyncCallback?: Function): EJSON;
	function getText(assetPath: string, asyncCallback?: Function): string;
}

declare namespace Blaze {
	function Let(bindings: Function, contentFunc: Function): Blaze.View;
	var TemplateInstance: TemplateInstanceStatic;
	interface TemplateInstanceStatic {
		new(view: Blaze.View): TemplateInstance;
	}
	interface TemplateInstance {
		subscriptionsReady(): boolean;
	}

}

declare namespace Cordova {
}

declare namespace DDP {
}

declare namespace DDPCommon {
	function MethodInvocation(options: {
			}): any;
}

declare namespace EJSON {
	var CustomType: CustomTypeStatic;
	interface CustomTypeStatic {
		new(): CustomType;
	}
	interface CustomType {
	}

}

declare namespace Match {
}

declare namespace Meteor {
	function onConnection(callback: Function): void;
	function publish(name: string, func: Function): void;
}

declare namespace Mongo {
	var Cursor: CursorStatic;
	interface CursorStatic {
		new<T>(): Cursor<T>;
	}
	interface Cursor<T> {
	}

}

declare namespace Npm {
	function require(name: string): any;
}

declare namespace Package {
}

declare namespace Plugin {
}

declare namespace Tracker {
	function Computation(): void;
	interface Computation {
	}

	var Dependency: DependencyStatic;
	interface DependencyStatic {
		new(): Dependency;
	}
	interface Dependency {
	}

}

declare namespace Session {
}

declare namespace HTTP {
}

declare namespace Email {
	function send(options: {
				from?: string;
				to?: string | string[];
				 cc?: string | string[];
				 bcc?: string | string[];
				 replyTo?: string | string[];
				subject?: string;
				text?: string;
				 html?: string;
				headers?: Object;
				attachments?: Object[];
				mailComposer?: MailComposer;
			}): void;
}

declare var CompileStep: CompileStepStatic;
interface CompileStepStatic {
	new(): CompileStep;
}
interface CompileStep {
	addAsset(options: {
			}, path: string, data: any /** Buffer **/ | string): any;
	addHtml(options: {
				section?: string;
				data?: string;
			}): any;
	addJavaScript(options: {
				path?: string;
				data?: string;
				sourcePath?: string;
			}): any;
	addStylesheet(options: {
			}, path: string, data: string, sourceMap: string): any;
	arch: any;
	declaredExports: any;
	error(options: {
			}, message: string, sourcePath?: string, line?: number, func?: string): any;
	fileOptions: any;
	fullInputPath: any;
	inputPath: any;
	inputSize: any;
	packageName: any;
	pathForSourceMap: any;
	read(n?: number): any;
	rootOutputPath: any;
}

declare var PackageAPI: PackageAPIStatic;
interface PackageAPIStatic {
	new(): PackageAPI;
}
interface PackageAPI {
}

declare var ReactiveVar: ReactiveVarStatic;
interface ReactiveVarStatic {
	new<T>(initialValue: T, equalsFunc?: Function): ReactiveVar<T>;
}
interface ReactiveVar<T> {
}

declare var Subscription: SubscriptionStatic;
interface SubscriptionStatic {
	new(): Subscription;
}
interface Subscription {
	added(collection: string, id: string, fields: Object): void;
	changed(collection: string, id: string, fields: Object): void;
	connection: Meteor.Connection;
	error(error: Error): void;
	onStop(func: Function): void;
	ready(): void;
	removed(collection: string, id: string): void;
	stop(): void;
	userId: string;
}

declare var Template: TemplateStatic;
interface TemplateStatic {
	new(): Template;
}
interface Template {
}

declare function execFileAsync(command: string, args?: any[], options?: {
				cwd?: Object;
				env?: Object;
				stdio?: any[] | string;
				destination?: any;
				waitForClose?: string;
			}): any;
declare function execFileSync(command: string, args?: any[], options?: {
				cwd?: Object;
				env?: Object;
				stdio?: any[] | string;
				destination?: any;
				waitForClose?: string;
			}): String;
declare function getExtension(): String;
