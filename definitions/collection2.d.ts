/// <reference path="meteor.d.ts" />
/// <reference path="simple-schema.d.ts" />

declare module Mongo {
    //var Collection2: Collection2Static;
    //interface Collection2Static {
    //    new<T>(name: string, options?: {
    //        connection?: Object;
    //        idGeneration?: string;
    //        transform?: Function;
    //    }): Collection2<T>;
    //}
    interface Collection2<T> extends Mongo.Collection<T>{
        attachSchema(schema: SimpleSchema): void;
        attachJSONSchema(schema: any): void;
    }
}