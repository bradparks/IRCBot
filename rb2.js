#!/usr/bin/env mode

// Written by: Brian Cain
// brianccain@gmail.com

var config = {
    channels : ["#churchofswole"],
    server   : "irc.freenode.net",
    botName  : "ReggieBot2",
    realName : "freedomBot9001",
    userName : "america",
    
};

// Get the lib
var irc = require("./node-irc/lib/irc.js");

var bot = new irc.Client(config.server, config.botName, 
        {channels: config.channels, userName: config.userName, realName: config.realName 
});

bot.addListener('error', function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  bot.say(channel, who + "...dude...welcome back!");
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
    var pattern = /hello/i;

    if(!text.match(pattern)){
        return;
    }
    bot.say(from, "¿Que?");
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
    var pattern = /hello/i;

    if(!text.match(pattern)){
        return;
    }
    bot.say(config.channels[0], "¿Public que?");
});
