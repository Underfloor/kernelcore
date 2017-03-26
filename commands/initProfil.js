const fs = require('fs');

let InitProfil = function () {
  this.command = ''; // handle any message to init profile id user hasn't

  this.handle = (message) => {
    if (!fs.existsSync(`./profiles/${message.author.id}`)) {
      let profil = {
        id: message.author.id,
        level: 0,
        disponibility: false,
        supports: 0,
        lastSupport: null,
        messages: 0
      };

      fs.writeFileSync(`./profiles/${message.author.id}`, JSON.stringify(profil));
    }
  }
}

module.exports = new InitProfil();
