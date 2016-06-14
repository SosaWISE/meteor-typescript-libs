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
 * These are the client modules and interfaces that can't be automatically generated from the Meteor data.js file
 */

declare namespace Meteor {
    /** Start definitions for Template **/
    interface Event {
        type:string;
        target:HTMLElement;
        currentTarget:HTMLElement;
        which: number;
        stopPropagation():void;
        stopImmediatePropagation():void;
        preventDefault():void;
        isPropagationStopped():boolean;
        isImmediatePropagationStopped():boolean;
        isDefaultPrevented():boolean;
    }

    interface EventHandlerFunction extends Function {
        (event?:Meteor.Event, templateInstance?: Blaze.TemplateInstance):void;
    }

    interface EventMap {
        [id:string]:Meteor.EventHandlerFunction;
    }
    /** End definitions for Template **/

    interface LoginWithExternalServiceOptions {
        requestPermissions?: string[];
        requestOfflineToken?: boolean;
        loginUrlParameters?: {[param: string]: any}
        loginHint?: string;
        loginStyle?: string;
        redirectUrl?: "popup" | "redirect";
        profile?: any;
        email?: string;
    }

    function loginWithMeteorDeveloperAccount(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithFacebook(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithGithub(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithGoogle(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithMeetup(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithTwitter(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithWeibo(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function _sleepForMs(milliseconds: number): void;

    interface SubscriptionHandle {
        stop(): void;
        ready(): boolean;
    }
}

declare namespace Blaze {
    interface View {
        name: string;
        parentView: Blaze.View;
        isCreated: boolean;
        isRendered: boolean;
        isDestroyed: boolean;
        renderCount: number;
        autorun(runFunc: Function): void;
        onViewCreated(func: Function): void;
        onViewReady(func: Function): void;
        onViewDestroyed(func: Function): void;
        firstNode(): Node;
        lastNode(): Node;
        template: Blaze.Template;
        templateInstance(): any;
    }
    interface Template {
        viewName: string;
        renderFunction: Function;
        constructView(): Blaze.View;
    }
}

declare namespace BrowserPolicy {

    interface framing {
        disallow():void;
        restrictToOrigin(origin:string):void;
        allowAll():void;
    }
    interface content {
        allowEval():void;
        allowInlineStyles():void;
        allowInlineScripts():void;
        allowSameOriginForAll():void;
        allowDataUrlForAll():void;
        allowOriginForAll(origin:string):void;
        allowImageOrigin(origin:string):void;
        allowFrameOrigin(origin:string):void;
        allowContentTypeSniffing():void;
        allowAllContentOrigin():void;
        allowAllContentDataUrl():void;
        allowAllContentSameOrigin():void;

        disallowAll():void;
        disallowInlineStyles():void;
        disallowEval():void;
        disallowInlineScripts():void;
        disallowFont():void;
        disallowObject():void;
        disallowAllContent():void;
        //TODO: add the basic content types
        // allow<content type>Origin(origin)
        // allow<content type>DataUrl()
        // allow<content type>SameOrigin()
        // disallow<content type>()
    }
}


declare namespace Accounts {
	function changePassword(oldPassword: string, newPassword: string, callback?: Function): void;
	function forgotPassword(options: {
				email?: string;
			}, callback?: Function): void;
	function onEmailVerificationLink(callback: Function): void;
	function onEnrollmentLink(callback: Function): void;
	function onResetPasswordLink(callback: Function): void;
	function resetPassword(token: string, newPassword: string, callback?: Function): void;
	var ui: {
		config(options: {
				requestPermissions?: Object;
				requestOfflineToken?: Object;
				forceApprovalPrompt?: Object;
				passwordSignupFields?: string;
			}): void;
	};
	function verifyEmail(token: string, callback?: Function): void;
	function loggingIn(): boolean;
	function logout(callback?: Function): void;
	function logoutOtherClients(callback?: Function): void;
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
}

declare namespace Blaze {
	function Each(argFunc: Function, contentFunc: Function, elseFunc?: Function): Blaze.View;
	function If(conditionFunc: Function, contentFunc: Function, elseFunc?: Function): Blaze.View;
	function Let(bindings: Function, contentFunc: Function): Blaze.View;
	var Template: TemplateStatic;
	interface TemplateStatic {
		new(viewName?: string, renderFunction?: Function): Template;
		// It should be [templateName: string]: TemplateInstance but this is not possible -- user will need to cast to TemplateInstance
		[templateName: string]: any | Template; // added "any" to make it work
		head: Template;
		find(selector:string):Blaze.Template;
		findAll(selector:string):Blaze.Template[];
		$:any; 
	}
	interface Template {
	}

	var TemplateInstance: TemplateInstanceStatic;
	interface TemplateInstanceStatic {
		new(view: Blaze.View): TemplateInstance;
	}
	interface TemplateInstance {
		$(selector: string): any;
		autorun(runFunc: Function): Object;
		data: Object;
		find(selector?: string): HTMLInputElement;
		findAll(selector: string): HTMLInputElement[];
		firstNode: Object;
		lastNode: Object;
		subscribe(name: string, ...args: any[]): Meteor.SubscriptionHandle;
		subscriptionsReady(): boolean;
		view: Object;
	}

	function Unless(conditionFunc: Function, contentFunc: Function, elseFunc?: Function): Blaze.View;
	var View: ViewStatic;
	interface ViewStatic {
		new(name?: string, renderFunction?: Function): View;
	}
	interface View {
	}

	function With(data: Object | Function, contentFunc: Function): Blaze.View;
	var currentView: Blaze.View;
	function getData(elementOrView?: HTMLElement | Blaze.View): Object;
	function getView(element?: HTMLElement): Blaze.View;
	function isTemplate(value: any): boolean;
	function remove(renderedView: Blaze.View): void;
	function render(templateOrView: Template | Blaze.View, parentNode: Node, nextNode?: Node, parentView?: Blaze.View): Blaze.View;
	function renderWithData(templateOrView: Template | Blaze.View, data: Object | Function, parentNode: Node, nextNode?: Node, parentView?: Blaze.View): Blaze.View;
	function toHTML(templateOrView: Template | Blaze.View): string;
	function toHTMLWithData(templateOrView: Template | Blaze.View, data: Object | Function): string;
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
	function disconnect(): void;
	function loggingIn(): boolean;
	function loginWith<ExternalService>(options?: {
				requestPermissions?: string[];
				requestOfflineToken?: boolean;
				loginUrlParameters?: Object;
				loginHint?: string;
				loginStyle?: string;
				redirectUrl?: string;
			}, callback?: Function): void;
	function loginWithPassword(user: Object | string, password: string, callback?: Function): void;
	function logout(callback?: Function): void;
	function logoutOtherClients(callback?: Function): void;
	function reconnect(): void;
	function status(): Meteor.StatusEnum;
	function subscribe(name: string, ...args: any[]): Meteor.SubscriptionHandle;
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
}

declare namespace Package {
}

declare namespace Plugin {
}

declare namespace Tracker {
	function Computation(): void;
	interface Computation {
		firstRun: boolean;
		invalidate(): void;
		invalidated: boolean;
		onInvalidate(callback: Function): void;
		onStop(callback: Function): void;
		stop(): void;
		stopped: boolean;
	}

	var Dependency: DependencyStatic;
	interface DependencyStatic {
		new(): Dependency;
	}
	interface Dependency {
		changed(): void;
		depend(fromComputation?: Tracker.Computation): boolean;
		hasDependents(): boolean;
	}

	var active: boolean;
	function afterFlush(callback: Function): void;
	function autorun(runFunc: (computation: Tracker.Computation) => void, options?: {
				onError?: Function;
			}): Tracker.Computation;
	var currentComputation: Tracker.Computation;
	function flush(): void;
	function nonreactive(func: Function): void;
	function onInvalidate(callback: Function): void;
}

declare namespace Session {
	function equals(key: string, value: string | number | boolean | any /** Null **/ | any /** Undefined **/): boolean;
	function get(key: string): any;
	function set(key: string, value: EJSONable | any /** Undefined **/): void;
	function setDefault(key: string, value: EJSONable | any /** Undefined **/): void;
}

declare namespace HTTP {
}

declare namespace Email {
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
	get(): T;
	set(newValue: T): void;
}

declare var Subscription: SubscriptionStatic;
interface SubscriptionStatic {
	new(): Subscription;
}
interface Subscription {
}

declare var Template: TemplateStatic;
interface TemplateStatic {
	new(): Template;
	// It should be [templateName: string]: TemplateInstance but this is not possible -- user will need to cast to TemplateInstance
	[templateName: string]: any | Template; // added "any" to make it work
	head: Template;
	find(selector:string):Blaze.Template;
	findAll(selector:string):Blaze.Template[];
	$:any; 
	body: Template;
	currentData(): {};
	deregisterHelper(name: string): void;
	instance(): Blaze.TemplateInstance;
	parentData(numLevels?: number): {};
	registerHelper(name: string, helperFunction: Function): void;
}
interface Template {
	created: Function;
	destroyed: Function;
	events(eventMap: Meteor.EventMap): void;
	helpers(helpers:{[id:string]: any}): void;
	onCreated: Function;
	onDestroyed: Function;
	onRendered: Function;
	rendered: Function;
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
