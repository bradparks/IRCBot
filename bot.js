#!/usr/bin/env mode

// Written by: Brian Cain
// brianccain@gmail.com
// https://github.com/briancain/IRCBot

var config = {
    channels : ["#ksucdc"],
    server   : "irc.freenode.net",
    botName  : "TrollBot",
    realName : "freedomBot9001",
    userName : "america",
};

var phrases = [
    "Freedom isn't free.",
    "HURD DAT.",
    "Let me show you something: http://goo.gl/uCJvV",
    "mah gunz.",
    "mah boi",
    "Spaghetti",
    "Trolololololo.",
    "mah dragonz.",
    "Spagheeeetttttiiiiiiii",
    "We have to cook.",
    "It is known.",
    "8-) Deal with it.",
];

var facephrase = [
    "You're speaking my language, guy!",
    "Ah the face, an excellent choice.",
    "( ͡° ͜ʖ ͡°)-tacular",
    "(╯°□°）╯︵ ┻━┻( ͡° ͜ʖ ͡°)",
    "( ͡° ͜ʖ ͡°) ┬─┬ ︵ /(.□. \\)",
];

var greetings = [
   "Hey brah",
   "Hello thar",
   "sup",
   "mah boi",
   "Hay",
];

var patterns = [
    /hello/i, 
    /TrollBot/i, 
    /( ͡° ͜ʖ ͡°)/i, 
    /is it happening/i,
];

// Get the lib
var irc = require("./node-irc/lib/irc.js");

var bot = new irc.Client(config.server, config.botName, 
        {channels: config.channels, userName: config.userName, realName: config.realName 
});

bot.addListener("error", function(message) {
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
  bot.say(channel, who + ': ( ͡° ͜ʖ ͡°) < | ' + greetings[Math.floor(Math.random() * greetings.length)] + ' |');
});

// Listen for any message, PM said user when he posts
bot.addListener("message", function(from, to, text, message) {
    
    if(text.match(patterns[1])){
        if(text.length > 23){
            var sayhello = text.substring(11, 23);
            var name = text.substring(23, text.length);
            name.trim();
            bot.say(to, name + ': ( ͡° ͜ʖ ͡°) < | ' + greetings[Math.floor(Math.random() * greetings.length)] + ' |');
        }
        else{
            bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[Math.floor(Math.random() * phrases.length)] + ' |');
        }
    }
    else if(text.match(patterns[2])){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + facephrase[Math.floor(Math.random() * facephrase.length)] + ' |');
    }
    else if(text == '!roll'){
        var val = Math.floor((Math.random()*6)+1);
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Rolled a die and got a ' + val + ' |'); 
    }
    else if(text == '!about'){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | TrollBot 1.0 Developed by `brian |');
    }
    else if(text == '!help'){
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Commands: !roll, !about, !help |');
    }
    else if(text == '!debug'){
        //bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + facephrase[4] + ' |');
    }
});
