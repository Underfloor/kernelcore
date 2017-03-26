const fs = require('fs');

let Dispo = function() {
  this.command = '!dispo';
  this.description = 'Indique votre disponibilité.';
  
  this.handle = (message) => {
    let flag = message.content.split(" ").slice(1)[0];

    if (flag === "oui" || flag === "non") {
      let userProfile = JSON.parse(fs.readFileSync(`./profiles/${message.author.id}`));
      userProfile.disponibility = flag === "oui";

      fs.writeFileSync(`./profiles/${message.author.id}`, JSON.stringify(userProfile));

      message.channel.sendMessage(`${message.author.username} est maintenant ${flag === "oui" ? "disponnible" : "indisponnible"} pour participer à des projets !`);
    } else {
      message.channel.sendMessage('```!dispo oui|non (indiquez si vous êtes disponible pour participé à des projets).```');
    }
  };
}

module.exports = new Dispo();
