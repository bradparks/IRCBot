#!/usr/bin/env node

// Written by: Brian Cain
// brianccain@gmail.com
// https://github.com/briancain/IRCBot

var config = {
    channels : ["#ksucdc"],
    server   : "irc.freenode.net",
    botName  : "richard_stallman",
    realName : "Richard Stallman",
    userName : "rms",
};

// Given phrases that the bot will use

var phrases = [
    "I'd just like to interject for a moment, ",
    "The Linux Kernel is great and all, but have you heard of GNU/Hurd?",
    "Let me sing you the song of my people: http://goo.gl/e8Nue",
];

var gnulinux = [
    "What you're referring to as Linux, is in fact, GNU/Linux, or as I've recently taken to calling it, GNU plus Linux. Linux is not an operating system unto itself, but rather another free component of a fully functioning GNU system made useful by the GNU corelibs, shell utilities and vital system components comprising a full OS as defined by POSIX.",
    "Many computer users run a modified version of the GNU system every day, without realizing it. Through a peculiar turn of events, the version of GNU which is widely used today is often called \"Linux\", and many of its users are not aware that it is basically the GNU system, developed by the GNU Project.",
    "There really is a Linux, and these people are using it, but it is just a part of the system they use. Linux is the kernel: the program in the system that allocates the machine's resources to the other programs that you run. The kernel is an essential part of an operating system, but useless by itself; it can only function in the context of a complete operating system.",
    "Linux is normally used in combination with the GNU operating system: the whole system is basically GNU with Linux added, or GNU/Linux. All the so-called \"Linux\" distributions are really distributions of GNU/Linux.",
];

// Regex patterns
// Apparently javascript doesn't support lookbacks for RE's
// var bad_patterns = [
//     /(?i)(?<!gnu.)linux(?!.*kernel)/i,
//     /(?i)gnu[\+|\/]linux/i,
//     /(?i)(?<!gnu.)linux(?=.*kernel)/i,
// ];

var patterns = [
    /linux/i,
    /GNU\/Linux/i,
    /gnu plus linux/i,
    /gnu linux/i,
    /linux kernel/i,
    /free software/i,
];

// Get the lib
var irc = require("./node-irc/lib/irc.js");

// Init bot with config
var bot = new irc.Client(config.server, config.botName, 
        {channels: config.channels, userName: config.userName, realName: config.realName 
});

// Error listener
bot.addListener("error", function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

// Listen for any message
bot.addListener("message", function(from, to, text, message) {
    if(from.match(/TrollBot/i)){ return; }

    if(text.match(patterns[4])){
        bot.say(to, from + ": " + phrases[1]);
    }
    else if(text.match(patterns[0]) && !text.match(patterns[1]) && !text.match(patterns[2]) && !text.match(patterns[2])){
        bot.say(to, phrases[0]+from);
        bot.say(to, gnulinux[Math.floor(Math.random() * gnulinux.length)]);
    }
    else if(text.match(patterns[5])){
        bot.say(to, from + ": " + phrases[2]);
    }
});
