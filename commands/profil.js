const fs = require('fs');
const Jimp = require('jimp');

let Profil = function() {
  this.command = '!profil';
  this.description = 'Génère une image de profil pour un membre';

  this.handle = (message) => {
    let userMentioned = message.mentions.users.first();
    
    if (userMentioned === undefined) {
      userMentioned = message.author;
    }
    if (userMentioned.bot) {
      return;
    }

    let userProfile = JSON.parse(fs.readFileSync(`./profiles/${message.author.id}`));

    let fileName = 'images/template.png';
    let template;
    let p1 = Jimp.read(fileName);
    let p2 = Jimp.read(userMentioned.avatarURL);
    let p3 = Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);

    Promise.all([p1, p2, p3]).then((images) => {
      let [template, avatar, font] = images;
      avatar = avatar.scaleToFit(128, 128);
      template.blit(avatar, 128, 0);
      template.print(font, 10, 10, userMentioned.username);
      template.print(font, 10, 30, `niveau : ${userProfile.level}`);
      template.print(font, 10, 50, `disponible : ${userProfile.disponibility ? "oui" : "non"}`);
      template.print(font, 10, 70, `merci : ${userProfile.supports}`);
      template.print(font, 10, 90, `messages: ${userProfile.messages}`);
      template.write('images/template_temp.png', () => {
        message.channel.sendMessage('', {
          file: "images/template_temp.png"
        });
      });
    }).catch((err) => {
      console.log(err);
    });
  }
}

module.exports = new Profil();
