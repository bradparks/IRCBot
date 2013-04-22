#!/usr/bin/env mode

// Written by: Brian Cain
// brianccain@gmail.com
// https://github.com/briancain/IRCBot

var config = {
    channels : ["#churchofswole"],
    server   : "irc.freenode.net",
    botName  : "TrollBot",
    realName : "freedomBot9001",
    userName : "america",
};

var phrases = [
   "Freedom isn't free.",
   "i hurd dat",
   "Let me show you something: http://goo.gl/uCJvV",
   "mah gunz",
];

var patterns = [
    /hello/i, 
    /TrollBot/i, 
    /( ͡° ͜ʖ ͡°)/i, 
    /iunruh/i,
];

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
  
  var me = /TrollBot/i;
  //if(who == "TrollBot"){
  if(who.match(me)){
    return;
  }
  bot.say(channel, who + ": ( ͡° ͜ʖ ͡°) <| Hey brah |");
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
    
    if(text.match(patterns[1])){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[Math.floor(Math.random() * phrases.length)] + ' |');
    }
    else if(text.match(patterns[2])){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | You\'re speaking my language, guy! |');
    }
    else if(text.match(patterns[3])){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Hey I know that guy! |');
    }
    else if(text == '!roll'){
        var val = Math.floor(Math.random()*6+1);
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Rolled a die and got a ' + val + ' |'); 
    }
    else if(text == '!about'){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | TrollBot 1.0 Developed by `brian |');
    }
    else if(text == '!help'){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Commands: !roll, !about, !help |');
    }

    /*if(!text.match(patterns[0])){
        return;
    }
    bot.say(from, "¿Que?");
    */
});

// Listen for any message, say to him/her in the room
/*
bot.addListener("message", function(from, to, text, message) {
    var pattern = /hello/i;

    if(!text.match(pattern)){
        return;
    }
    bot.say(config.channels[0], "¿Public que?");
});
*/
