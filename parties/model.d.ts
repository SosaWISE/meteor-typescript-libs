/// <reference path="../meteor.d.ts" />
/// <reference path="../underscore.d.ts" />
interface PartyDAO {
    _id?: string;
    owner?: string;
    x?: number;
    y?: number;
    title?: string;
    description?: string;
    public?: boolean;
    invited?: Array;
    rsvps?: Array;
}

declare var Parties:Meteor.Collection<PartyDAO>;
