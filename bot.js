#!/usr/bin/env node

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

// Given phrases that the bot will use

var phrases = [
    "It is known.",
    "Hodor",
    "Are you down?",
    "Can you quack like a duck?",
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
    "8-) Deal with it.",
    "Thanks, Obama!",
    "Yeah Mr. White! Yeah science!",
    "I ( ͡° ͜ʖ ͡°) Ted",
];

var facephrase = [
    "You're speaking my language, guy!",
    "Ah the face, an excellent choice.",
    "( ͡° ͜ʖ ͡°)-tacular",
    "(╯ ͡° ͜ʖ ͡°) ╯︵ ┻━┻( ͡° ͜ʖ ͡°)",
    "( ͡° ͜ʖ ͡°) ┬─┬ ︵ /(.□. \\)",
    "ʕノ•ᴥ•ʔノ ︵ ┻━┻( ͡° ͜ʖ ͡°)",
    "(ﾉಥ益ಥ）ﾉ ┻━┻( ͡° ͜ʖ ͡°)",
    "You think someone would really do that? Just go on the internet and ( ͡° ͜ʖ ͡°)?",
    "ᕦ( ͡° ͜ʖ ͡°)ᕤ Do you even lift?",
];

var greetings = [
   "Hey brah",
   "Hello thar",
   "sup",
   "mah boi",
   "sup mayne",
   "Hay",
   "yo bro",
];

var buzzwords = [
    "Big Data",
    "The Cloud",
    "Web 2.0",
    "ENTERPRISE",
    "Synergy",
    "Vlog",
    "Aggregator",
    "Social Networking",
    "Webscale",
    "User generated content",
    "Deliverables",
    "DEVELOPERS",
    "AGILE",
    "WATERFALL",
    "Interoperability",
    "Let's touch base",
    "Follow the sun",
    "C0 Coverage",
    "Whiteboard a solution",
    "Parametric Polymorphism",
    "Work toward a \"solve\"",
    "Extensibility Framework",
    "Enterprise Service Bus",
    "THE BLOGOSPHERE",
    "Convention over Configuration",
    "Homomorphic Push Down Automation",
    "Monolithic",
    "Fully parallelizable",
    "Exit strategy",
    "Peer-to-Peer botnet",
    "User friendly",
    "User experience",
    "Sharding",
    "NoSQL database",
    "Infinite scalability",
    "Service-oriented architecture",
    "Adoption-ready",
    "Asynchronous pipeline",
    "Node.js"
];

// Regex patterns

var patterns = [
    /hello/i, 
    /TrollBot/i, 
    /( ͡° ͜ʖ ͡°)/i, 
    /is it happening/i,
    /say hello to/i,
    /it is known/i,
    /PaulBot/i,
    /ReggieBot/i,
    /h.*o.*d.*o.*r.*/i,
    /are you down/i,
    /^!d\d+$/i,
    /s\/\w+\/\w+\//,
    /s\/([^\/]*)\/([^\/]*)\//,
];

var rank_patterns = [
    /^[a-zA-z\d]*\+\+/i,
    /^[a-zA-z\d]*\-\-/i,
];

// Get the lib
var irc = require("./node-irc/lib/irc.js");
var proof = require("./proofs.js");

// Init bot with config
var bot = new irc.Client(config.server, config.botName, 
        {channels: config.channels, userName: config.userName, realName: config.realName 
});

// Error listener
bot.addListener("error", function(message) {
    console.error('ERROR: %s: %s', message.command, message.args.join(' '));
});

// Listen for joins
bot.addListener("join", function(channel, who) {
  // Welcome them in!
  
  var me = patterns[1];
  var regbot = patterns[7];

  if(who.match(me) || who.match(regbot)){ // if the person who joins is me or ReggieBot, return
    return;
  }
  bot.say(channel, who + ': ( ͡° ͜ʖ ͡°) < | ' + greetings[Math.floor(Math.random() * greetings.length)] + ' |');
});

var prev = "";
var usr = "";

function setUser(text){
    usr = text;
}

function getUser(){
    return usr;
}

function setMessage(text){
    prev = text;
}

function getMessage(){
    return prev;
}

// Listen for any message
bot.addListener("message", function(from, to, text, message) {
    
    var msg = getMessage();
    var usr = getUser();
    setMessage(text); // needs who said it
    setUser(from);

    // bot.say(to, 'The previous message was: ' + msg);

    if(text.match(patterns[12])){ // s/before/after style replacement
        var words = text.match(patterns[12]);

        try{
            if(msg.match(words[1])){
                var newstr = msg.replace(words[1], words[2]);
                bot.say(to, '( ͡° ͜ʖ ͡°) < | Wut ' + usr + ' meant 2 say wuz: ' + newstr + ' |');
            }
        }
        catch (e) {
            console.log("An error has been thrown");
            console.log(e);
            bot.say(to, '( ͡° ͜ʖ ͡°) < | ' + from + ' is trying to kill me!! |');
        }
    }
    else if(text.match(patterns[1])){ // if someone says my name or directs a message at me
        var sayhello = text.substring(10, 22);
        //bot.say(to, sayhello);
        if(sayhello.match(patterns[4])){ // if they have said 'say hello to'
            var name = text.substring(23, text.length);
            name.trim();
            //bot.say(to, name);
            if(name.match(patterns[6])){ // if the name is PaulBot_
                bot.say(to, 'PaulBot_: ( ͡° ͜ʖ ͡°) < | is it happening? |');
            }
            else { // Otherwise say hello to the given name
                bot.say(to, name + ': ( ͡° ͜ʖ ͡°) < | ' + greetings[Math.floor(Math.random() * greetings.length)] + ' |');
            }
        }
        else{ // otherwise, send a random phrase to the one who originally sent the message
            bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[Math.floor(Math.random() * phrases.length)] + ' |');
        }
    }
    else if(text.match(patterns[2])){ // if someone posts the face
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + facephrase[Math.floor(Math.random() * facephrase.length)] + ' |');
    }
    else if(text.match(patterns[5])){ // if someone says 'it is known'
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[0] + ' |');
    }
    else if(text.match(patterns[8])){ // Hodor
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[1] + ' |');
    }
    else if(text.match(patterns[9])){ // GOAT
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[Math.floor(Math.random() * (4-2)+2)] + ' |');
    }
    else if(text == '!buzzword'){ // Says a random buzzword
            bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + buzzwords[Math.floor(Math.random() * buzzwords.length)] + ' |');
    }
    else if(text == '!roll'){ // roll the dice
        var val = Math.floor((Math.random()*6)+1);
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Rolled a die and got a ' + val + ' |'); 
    }
    else if(text.match(patterns[10])){ // N sided die
        var sides = text.substring(2, text.length);
        var intSide = parseInt(sides);

        if(intSide <= 0) return;

        var val = Math.floor((Math.random()*intSide)+1);
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Rolled a ' + intSide + ' sided die and got a ' + val + ' |'); 
    }
    else if(text == '!proof'){ // Display a proof
        var pro = proof.getProof();
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + pro + ' |'); 
    }
    else if(text == '!about'){ // prints about
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | TrollBot 1.1 Developed by `brian |');
    }
    else if(text == '!help' || text == '!halp'){ // prints given ! commands
        bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | Commands: !about, !buzzword, !d<number> (i.e. !d20), !proof, !roll, !help |');
    }
    else if(text == '!debug'){ // debug logic
        //if(from == '`brian'){
        //    bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[16] + ' |');
        //    bot.say(to, from + ': ( ͡° ͜ʖ ͡°) < | ' + phrases[17] + ' |');
        //}
    }
});
