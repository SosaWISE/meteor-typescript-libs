declare module Meteor {
    export function npmRequire(moduleName: string): Function;
}

declare module Async {
    export function runSync(func:(done:(error:any, result:any) => void) => void):{error: any; result: any;};
    export function wrap(funcOrObject: Function | Object, functionNameOrFunctionNameList?: string | string[]):Function;
}