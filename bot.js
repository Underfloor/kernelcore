// JavaScript source code
/*
  Bot destiné au Discord de Kernel Concept
  
  @author ql28
  @thanks Zatsune No Mokou, Nigth

*/

// import the discord.js module
const Discord = require('discord.js');

// imports commands
const commands = [
  require("./commands/initProfil"),
  require("./commands/messageCount"),
  require("./commands/avatar"),
  require("./commands/mesroles"),
  require("./commands/roles"),
  require("./commands/commandes"),
  require("./commands/merci"),
  require("./commands/dispo"),
  require("./commands/profil")
];

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = 'Mjk1MzYxNjA0NjA4OTgzMDQw.C7ikdQ.Xk1kIYUgDzf6NOl1H5Z4Zy8GxgI';

// the ready event is vital, it means that your bot will only start reacting to information
// from Discord _after_ ready is emitted.
bot.on('ready', () => {
    console.log('I am ready!');
});

// create an event listener for messages
bot.on('message', message => {

    // --------------------- LISTE DES COMMANDES ------------------------//
    if (message.author.bot) {
        return;
    }

    for (command of commands) {
      if (message.content.startsWith(command.command)) {
        command.handle(message, commands);
      }
    }
});

// log our bot in
bot.login(token);
