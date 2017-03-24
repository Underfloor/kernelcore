// JavaScript source code
/*
  Bot destin� au Discord de Kernel Concept
  
  @author ql28
  @thanks Zatsune No Mokou, Nigth

*/

// import the discord.js module
const Discord = require('discord.js');

// other imports
const fs = require('fs');
const Jimp = require('jimp')

// create an instance of a Discord Client, and call it bot
const bot = new Discord.Client();

// the token of your bot - https://discordapp.com/developers/applications/me
const token = '';

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
    // commande !avatar -> affiche l'avatar du membre en grand
    else if (message.content === '!avatar') {
        message.channel.sendMessage(message.author.avatarURL);
    }
    // commande !myroles -> affiche la liste des r�les d'un membre
    else if (message.content === '!mesroles') {
        message.channel.sendMessage("Liste des roles de " + message.author.username + " :");
        var ret = '';
        for (var [key, rolemembre] of message.member.roles.entries()){
            if(rolemembre.name !== "@everyone"){
                ret =  ret + " | " + rolemembre.name;
            }
        }
        message.channel.sendMessage("" + ret);
    }
    // commande !roles -> affiche la liste des r�les du serveur
    else if (message.content === '!roles') {
        message.channel.sendMessage("", { file: "images/roles.jpg"});
        /*message.channel.sendMessage("Liste des roles :");
        var ret = '';
        for (var [key, roleserveur] of message.guild.roles.entries()){
            if(roleserveur.name !== "@everyone"){   
                ret =  ret + " | " + roleserveur.name;
            }
        }
        message.channel.sendMessage("" + ret);*/
    }
    // commande !createProfile -> creation du profil d'un membre (� automatiser � la 1ere connexion sur le serveur) 
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
    // commande !merci -> donne un point de soutien au membre cit�
    else if (message.content.startsWith('!merci')) {
        //recuperation du 1er membre mentionn�
        let userMentioned = message.mentions.users.first();
        //si un membre est mentionn� et si l'auteur du message n'a pas envoy� de message r�cemment
        if(userMentioned !== undefined && userMentioned !== message.author){
            var dernierSoutien = fs.readFileSync('./profiles/' + message.author.id).toString().split("\n");
            if(dernierSoutien[4] + 18000000 < Date.now()){
                var data = fs.readFileSync('./profiles/' + userMentioned.id).toString().split("\n");
                var nbmerci = parseInt(data[3])+1;
                data.splice(3, 1, nbmerci);
                var text = data.join("\n");
                fs.writeFile('./profiles/' + userMentioned.id, text, function (err) {
                    if (err) return console.log(err);
                });
                var dataAuthor = fs.readFileSync('./profiles/' + message.author.id).toString().split("\n");
                var lastmerci = message.createdTimestamp;
                data.splice(4, 1, lastmerci);
                var text = data.join("\n");
                fs.writeFile('./profiles/' + message.author.id, text, function (err) {
                    if (err) return console.log(err);
                });
                message.channel.sendMessage(userMentioned + ' obtient un soutien de plus, il en a ' + nbmerci + ' !');
            }
            else{
                message.reply('vous avez d�j� soutenu un cr�a ces 5 derni�re heures, attendez un peu !');
            }
        }
        else{
            message.channel.sendMessage('```!merci @pseudo (un soutien toutes les 5 heures; vous ne pouvez pas vous auto-remercier !)```');
        }
    }
    // commande !profile ->g�n�re une image du profil d'un membre de Kernel Concept
    else if (message.content.startsWith('!profil')) {
        //recuperation du 1er membre mentionn�
        let userMentioned = message.mentions.users.first();
        //si un utilisateur est mentionn�, r�cup�rer le profil de ce dernier
        if(userMentioned !== undefined){
            //r�cup�ration du contenu du fichier profil
            var profil = fs.readFileSync('./profiles/' + userMentioned.id).toString().split("\n");

            var fileName = 'images/template.png';
            var template;
            var p1 = Jimp.read(fileName);
            var p2 = Jimp.read(userMentioned.avatarURL);
            var p3 = Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

            //ajout de l'image de profil au template
            Promise.all([p1, p2, p3]).then(function (images) {
                let [template, avatar, font] = images;
                avatar = avatar.scaleToFit(128,128);    
                template.blit(avatar, 128, 0);
                template.print(font, 10, 10, userMentioned.username);
                template.print(font, 10, 30, 'niveau : ' + profil[1]);
                template.print(font, 10, 50, 'xp : ' + profil[2]);
                template.print(font, 10, 70, 'merci : ' + profil[3]).write('images/template_temp.png', function(){message.channel.sendMessage("", { file: "images/template_temp.png"});});
            }).catch(function (err) {
                console.log(err);
            });
        }
        //si pas d'utilisateur mentionn�, r�cup�rer le profil de celui qui a tap� la commande
        else{
            //r�cup�ration du contenu du fichier profil
            var profil = fs.readFileSync('./profiles/' + message.author.id).toString().split("\n");

            var fileName = 'images/template.png';
            var template;
            var p1 = Jimp.read(fileName);
            var p2 = Jimp.read(message.author.avatarURL);
            var p3 = Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

            //ajout de l'image de profil au template
            Promise.all([p1, p2, p3]).then(function (images) {
                let [template, avatar, font] = images;
                avatar = avatar.scaleToFit(128,128);    
                template.blit(avatar, 128, 0);
                template.print(font, 10, 10, message.author.username);
                template.print(font, 10, 30, 'niveau : ' + profil[1]);
                template.print(font, 10, 50, 'xp : ' + profil[2]);
                template.print(font, 10, 70, 'merci : ' + profil[3]).write('images/template_temp.png', function(){message.channel.sendMessage("", { file: "images/template_temp.png"});});
            }).catch(function (err) {
                console.log(err);
            });
        }
    }
    else if (message.content.startsWith('!dispo')) {

        let args = message.content.split(" ").slice(1);
        let rep = args[0];
        var profilMembre = fs.readFileSync('./profiles/' + message.author.id).toString().split("\n");
        if(rep === 'oui' && profilMembre[2] !== 0){
            var fichiermembre = '';
            fichiermembre = message.author.id + '\n'; //id
            fichiermembre += profilMembre[1] + '\n'; //niveau principal
            fichiermembre += 0 + '\n'; //dispo
            fichiermembre += profilMembre[3] + '\n'; //nombre de soutien
            fichiermembre += profilMembre[4] + '\n'; //date dernier soutien
            fichiermembre += profilMembre[5] + '\n'; //nombre de messages

            fs.writeFile('./profiles/' + message.author.id, fichiermembre, { flag: 'w' }, function (err) {
                if (!err) console.log("It's saved!");
            });
        }
        else if(rep === 'non' && profilMembre[2] !== 1){
            var fichiermembre = '';
            fichiermembre = message.author.id + '\n'; //id
            fichiermembre += profilMembre[1] + '\n'; //niveau principal
            fichiermembre += 1 + '\n'; //dispo
            fichiermembre += profilMembre[3] + '\n'; //nombre de soutien
            fichiermembre += profilMembre[4] + '\n'; //date dernier soutien
            fichiermembre += profilMembre[5] + '\n'; //nombre de messages

            fs.writeFile('./profiles/' + message.author.id, fichiermembre, { flag: 'w' }, function (err) {
                if (!err) console.log("It's saved!");
            });
        }
        else{
            message.channel.sendMessage('```!dispo oui|non (indiquez si vous �tes disponibles pour participer � des projets ou d�j� occup�.)```');
        }

        for (var [key, membre] of message.guild.members.entries()){
            var fichiermembre = '';
            fichiermembre = membre.id + '\n'; //id
            fichiermembre += '0\n'; //niveau principal
            fichiermembre += '0\n'; //disponibilit�
            fichiermembre += '0\n'; //nombre de soutien
            fichiermembre += '0\n'; //date dernier soutien
            fichiermembre += '0\n'; //nombre de messages

            fs.writeFile('./profiles/' + membre.id, fichiermembre, { flag: 'w' }, function (err) {
                if (!err) console.log("It's saved!");
            });
        }
    }

    // commande !initAllProfils -> g�n�re le fichier profil de chaque membre (admin)
    else if (message.content.startsWith('!initAllProfils') && message.author.id === '274276871514882059') {
        
        for (var [key, membre] of message.guild.members.entries()){
            var fichiermembre = '';
            fichiermembre = membre.id + '\n'; //id
            fichiermembre += '0\n'; //niveau principal
            fichiermembre += '0\n'; //disponibilit�
            fichiermembre += '0\n'; //nombre de soutien
            fichiermembre += '0\n'; //date dernier soutien
            fichiermembre += '0\n'; //nombre de messages

            fs.writeFile('./profiles/' + membre.id, fichiermembre, { flag: 'w' }, function (err) {
                if (!err) console.log("It's saved!");
            });
        }
    }
    // commande !commandes -> affiche la liste des commandes du bot Kernel Core
    else if (message.content.startsWith('!commandes')) {
        var affichageCommande = '';
        affichageCommande = '```!profil -> affiche votre profil.\n';
        affichageCommande += '!profil @pseudo -> affiche le profil d\'un membre � partir de son @.\n';
        affichageCommande += '!mesroles -> affiche la liste de vos r�les.\n';
        affichageCommande += '!roles -> affiche la liste de tous les r�les du serveur.\n';
        affichageCommande += '!dispo oui|non -> indique si vous �tes disponibles pour participer � des projets ou d�j� occup�.\n';
        affichageCommande += '!initProfil -> r�-initialise votre profil. /!\\ \n```';
        message.channel.sendMessage(affichageCommande);
    }
});

bot.on('guildMemberAdd', membre => {
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