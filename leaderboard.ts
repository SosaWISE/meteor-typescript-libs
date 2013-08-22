/// <reference path="meteor.d.ts" />
// Set up a collection to contain player information. On the server,
// it is backed by a MongoDB collection named "players".

interface Player {
	name: string;
	score: number;
}

var Players:ICollection<Player> = <ICollection<Player>>new Meteor.Collection("players");

if (Meteor.isClient) {
	Template.leaderboard({
		players: function() {
			return Players.find({}, {sort: {score: -1, name: 1}});
		},

		selected_name: function() {

			var player = Players.findOne(Session.get("selected_player"));
			return player && player.name;
		},

		// XXX remove once we have event delegation
		upvote_display: function() {
			var player = Players.findOne(Session.get("selected_player"));
			if (player && player.name)
				return 'block';
			else
				return 'none';
		},

		'click input.inc': function() {
			Players.update(Session.get("selected_player"), {$inc: {score: 5}});
		}
	});

	Template.player({
		selected: function() {
			return Session.equals("selected_player", this._id) ? "selected" : '';
		},

		'click *': function() {
			Session.set("selected_player", this._id);
		}
	});
}

// On server startup, create some players if the database is empty.
if (Meteor.isServer) {
	Meteor.startup(function() {
		if (Players.find().count() === 0) {
			var names = ["Ada Lovelace",
						 "Grace Hopper",
						 "Marie Curie",
						 "Carl Friedrich Gauss",
						 "Nikola Tesla",
						 "Claude Shannon"];
			for (var i = 0 ; i < names.length ; i++)
				Players.insert(<Player>{name: names[i], test: true, score: Math.floor(Random.fraction()*10)*5});
		}
	});
}
