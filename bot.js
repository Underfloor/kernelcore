// JavaScript source code
/*
  Bot destiné au Discord de Kernel Concept
  
  @author ql28
  @thanks Zatsune No Mokou, Nigth

*/

// import the discord.js module
const Discord = require('discord.js');

// other imports
const fs = require('fs');

// imports commands
const commands = [
  require("./commands/initProfil"),
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
    // commande !createProfile -> creation du profil d'un membre (à automatiser à la 1ere connexion sur le serveur) 
    else if (message.content === '!initProfil') {
        var fichiermembre = '';
        fichiermembre = message.author.id + '\n'; //id
        fichiermembre += '0\n'; //niveau principal
        fichiermembre += '0\n'; //dispo
        fichiermembre += '0\n'; //nombre de soutien
        fichiermembre += '0\n'; //date dernier soutien
        fichiermembre += '0\n'; //nombre de messages

        fs.writeFile('./profiles/' + message.author.id, fichiermembre, { flag: 'w' }, function (err) {
            if (!err) console.log("It's saved!");
        });
    }
    // commande !initAllProfils -> génère le fichier profil de chaque membre (admin)
    else if (message.content.startsWith('!initAllProfils') && message.author.id === '274276871514882059') {
        
        for (var [key, membre] of message.guild.members.entries()){
            var fichiermembre = '';
            fichiermembre = membre.id + '\n'; //id
            fichiermembre += '0\n'; //niveau principal
            fichiermembre += '0\n'; //disponibilité
            fichiermembre += '0\n'; //nombre de soutien
            fichiermembre += '0\n'; //date dernier soutien
            fichiermembre += '0\n'; //nombre de messages

            fs.writeFile('./profiles/' + membre.id, fichiermembre, { flag: 'w' }, function (err) {
                if (!err) console.log("It's saved!");
            });
        }
    }

    for (command of commands) {
      if (message.content.startsWith(command.command)) {
        command.handle(message, commands);
      }
    }
});

bot.on('guildMemberAdd', membre => {
    message.channel.sendMessage('Bienvenue sur Kernel Concept ' + membre + ' !');

    var fichiermembre = '';
    fichiermembre = membre.id + '\n'; //id
    fichiermembre += '0\n'; //niveau principal
    fichiermembre += '0\n'; //dispo
    fichiermembre += '0\n'; //nombre de soutien
    fichiermembre += '0\n'; //date dernier soutien
    fichiermembre += '0\n'; //nombre de messages

    fs.writeFile('./profiles/' + membre.id, fichiermembre, { flag: 'w' }, function (err) {
        if (!err) console.log("New profile member saved!");
    });
});


// log our bot in
bot.login(token);
