/**
 *  Meteor definitions for TypeScript
 *  author - Olivier Refalo - orefalo@yahoo.com
 *  author - David Allen - dave@fullflavedave.com
 *
 *  Thanks to Sam Hatoum for the base code for auto-generating this file.
 *
 *  supports Meteor 1.1.0.3
 */

/**
 * These are the modules and interfaces that can't be automatically generated from the Meteor data.js file
 */

interface EJSONable {
    [key: string]: number | string | boolean | Object | number[] | string[] | Object[] | Date | Uint8Array | EJSON.CustomType;
}
interface JSONable {
    [key: string]: number | string | boolean | Object | number[] | string[] | Object[];
}
interface EJSON extends EJSONable {}

declare module Match {
    var Any: any;
    var String: any;
    var Integer: any;
    var Boolean: any;
    var undefined: any;
    //function null();  // not allowed in TypeScript
    var Object: any;
    function Optional(pattern: any):boolean;
    function ObjectIncluding(dico: any):boolean;
    function OneOf(...patterns: any[]): any;
    function Where(condition: any): any;
}

declare module Meteor {
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
        requestOfflineToken?: Boolean;
        forceApprovalPrompt?: Boolean;
        userEmail?: string;
        loginStyle?: string;
    }

    function loginWithMeteorDeveloperAccount(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithFacebook(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithGithub(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithGoogle(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithMeetup(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithTwitter(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;
    function loginWithWeibo(options?: Meteor.LoginWithExternalServiceOptions, callback?: Function): void;

    interface UserEmail {
        address:string;
        verified:boolean;
    }

    interface User {
        _id?:string;
        username?:string;
        emails?:Meteor.UserEmail[];
        createdAt?: number;
        profile?: any;
        services?: any;
    }

    interface SubscriptionHandle {
        stop(): void;
        ready(): boolean;
    }

    interface Tinytest {
        add(name:string, func:Function): any;
        addAsync(name:string, func:Function): any;
    }

    enum StatusEnum {
        connected,
        connecting,
        failed,
        waiting,
        offline
    }

    interface LiveQueryHandle {
        stop(): void;
    }

    interface EmailFields {
        subject?: Function;
        text?: Function;
    }

    interface EmailTemplates {
        from: string;
        siteName: string;
        resetPassword: Meteor.EmailFields;
        enrollAccount:  Meteor.EmailFields;
        verifyEmail:  Meteor.EmailFields;
    }

    interface Connection {
        id: string;
        close: Function;
        onClose: Function;
        clientAddress: string;
        httpHeaders: Object;
    }
}

declare module Mongo {
    interface Selector extends Object {}
    interface Modifier {}
    interface SortSpecifier {}
    interface FieldSpecifier {
        [id: string]: Number;
    }
    enum IdGenerationEnum {
        STRING,
        MONGO
    }
    interface AllowDenyOptions {
        insert?: (userId: string, doc: any) => boolean;
        update?: (userId: string, doc: any, fieldNames: string[], modifier: any) => boolean;
        remove?: (userId: string, doc: any) => boolean;
        fetch?: string[];
        transform?: Function;
    }
}

declare module HTTP {

	interface HTTPRequest {
		content?:string;
		data?:any;
		query?:string;
		params?:{[id:string]:string};
		auth?:string;
		headers?:{[id:string]:string};
		timeout?:number;
		followRedirects?:boolean;
	}

	interface HTTPResponse {
		statusCode?:number;
		headers?:{[id:string]: string};
		content?:string;
		data?:any;
	}

    function call(method: string, url: string, options?: HTTP.HTTPRequest, asyncCallback?:Function):HTTP.HTTPResponse;
    function del(url: string, callOptions?: HTTP.HTTPRequest, asyncCallback?: Function): HTTP.HTTPResponse;
    function get(url: string, callOptions?: HTTP.HTTPRequest, asyncCallback?: Function): HTTP.HTTPResponse;
    function post(url: string, callOptions?: HTTP.HTTPRequest, asyncCallback?: Function): HTTP.HTTPResponse;
    function put(url: string, callOptions?: HTTP.HTTPRequest, asyncCallback?: Function): HTTP.HTTPResponse;

}

declare module Email {
    interface EmailMessage {
        from: string;
        to: string | string[];
        cc?: string | string[];
        bcc?: string | string[];
        replyTo?: string | string[];
        subject: string;
        text?: string;
        html?: string;
        headers?: {[id: string]: string};
    }
}

declare module DDP {
    interface DDPStatic {
        subscribe(name: string, ...rest: any[]);
        call(method: string, ...parameters: any[]):void;
        apply(method: string, ...parameters: any[]):void;
        methods(IMeteorMethodsDictionary: any): any;
        status():DDPStatus;
        reconnect(): void;
        disconnect(): void;
        onReconnect(): void;
    }

    interface DDPStatus {
        connected: boolean;
        status: Meteor.StatusEnum;
        retryCount: number;
        //To turn this into an interval until the next reconnection, use retryTime - (new Date()).getTime()
        retryTime?: number;
        reason?: string;
    }
}

declare module Random {
    function id(numberOfChars?: number): string;
    function secret(numberOfChars?: number): string;
    function fraction():number;
    function hexString(numberOfDigits:number):string; // @param numberOfDigits, @returns a random hex string of the given length
    function choice(array:any[]):string; // @param array, @return a random element in array
    function choice(str:string):string; // @param str, @return a random char in str
}

declare module Blaze {
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

declare module BrowserPolicy {

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

declare module Tracker {
    export var ComputationFunction: (computation: Tracker.Computation) => void;

}

declare var IterationCallback: <T>(doc: T, index: number, cursor: Mongo.Cursor<T>) => void;


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
    streamMessage();
    pipe(stream: any /** fs.WriteStream **/);
}

/**
 * These modules and interfaces are automatically generated from the Meteor api.js file
 */
declare module Accounts {
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
	function loggingIn(); /** TODO: add return value **/
	function logout(callback?: Function); /** TODO: add return value **/
	function logoutOtherClients(callback?: Function); /** TODO: add return value **/
}

declare module App {
	function accessRule(domainRule: string, options?: {
				launchExternal?: boolean;
			}): void;
	function configurePlugin(pluginName: string, config: Object): void;
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
	function setPreference(name: string, value: string): void;
}

declare module Assets {
}

declare module Blaze {
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
		find(selector?: string): Blaze.TemplateInstance;
		findAll(selector: string): Blaze.TemplateInstance[];
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

declare module Cordova {
}

declare module DDP {
}

declare module DDPCommon {
	function MethodInvocation(options: {
			}): any;
}

declare module EJSON {
	var CustomType: CustomTypeStatic;
	interface CustomTypeStatic {
		new(): CustomType;
	}
	interface CustomType {
	}

}

declare module Match {
}

declare module Meteor {
	function disconnect(): void;
	function loggingIn(): boolean;
	function loginWith<ExternalService>(options?: {
				requestPermissions?: string[];
				requestOfflineToken?: boolean;
				loginUrlParameters?: Object;
				userEmail?: string;
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

declare module Mongo {
	var Cursor: CursorStatic;
	interface CursorStatic {
		new<T>(): Cursor<T>;
	}
	interface Cursor<T> {
	}

}

declare module Npm {
}

declare module Package {
}

declare module Plugin {
}

declare module Tracker {
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

declare module Session {
	function equals(key: string, value: string | number | boolean | any /** Null **/ | any /** Undefined **/): boolean;
	function get(key: string): any;
	function set(key: string, value: EJSONable | any /** Undefined **/): void;
	function setDefault(key: string, value: EJSONable | any /** Undefined **/): void;
}

declare module HTTP {
}

declare module Email {
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

declare function getExtension(): String;
