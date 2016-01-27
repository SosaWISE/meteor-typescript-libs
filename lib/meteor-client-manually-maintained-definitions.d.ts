/**
 * These are the client modules and interfaces that can't be automatically generated from the Meteor data.js file
 */

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
    function _sleepForMs(milliseconds: number): void;

    interface SubscriptionHandle {
        stop(): void;
        ready(): boolean;
    }
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

