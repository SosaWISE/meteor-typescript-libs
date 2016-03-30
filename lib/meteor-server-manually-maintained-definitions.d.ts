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