const fs = require('fs');

let Merci = function() {
  this.command = '!merci';
  this.description = 'Remercie un membre de la communauté.',

  this.handle = (message) => {
    let userMentioned = message.mentions.users.first();

    if (userMentioned !== undefined && userMentioned !== message.author && !userMentioned.bot) {
      var userProfile = JSON.parse(fs.readFileSync(`./profiles/${message.author.id}`));

      if (userProfile.lastSupport === null || userProfile.lastSupport - 18000000 < Date.now()) {
        var mentionedProfile = JSON.parse(fs.readFileSync(`./profiles/${userMentioned.id}`));
        mentionedProfile.supports++;

        userProfile.lastSupport = message.createdTimestamp;

        fs.writeFileSync(`./profiles/${message.author.id}`, JSON.stringify(userProfile));
        fs.writeFileSync(`./profiles/${mentionedProfile.id}`, JSON.stringify(mentionedProfile));

        message.channel.sendMessage(
          `${userMentioned} obtient un soutien de plus, pour un total de ${mentionedProfile.supports}.`
        );
      } else {
        message.reply('Vous avez déjà soutenu un créateur ces 5 dernières heures.');
      }
    } else {
      message.channel.sendMessage('```!merci @pseudo (vous ne pouvez pas vous remercier, vous pouvez soutenir une fois toute les 5 heures).');
    }
  }
}

module.exports = new Merci();
