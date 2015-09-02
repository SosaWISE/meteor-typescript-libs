/**
 * These are the modules and interfaces that can't be automatically generated from the Meteor data.js file
 */

declare module Meteor {
    interface Tinytest {
        add(name:string, func:Function): any;
        addAsync(name:string, func:Function): any;
    }
}