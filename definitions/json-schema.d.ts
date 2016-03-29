/// <reference path="simple-schema.d.ts" />

declare var JSONSchema: JSONSchemaStatic;

interface JSONSchemaDefinition {
    [attribute: string]: any
}

interface JSONSchemaStatic {
    new(definition: JSONSchemaDefinition, options?: any): JSONSchema;
}

interface JSONSchema {
    toSimpleSchema(): SimpleSchema;
}