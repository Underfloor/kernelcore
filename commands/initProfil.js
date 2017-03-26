const fs = require('fs');

let InitProfil = function () {
  this.command = ''; // handle any message to init profile id user hasn't

  this.handle = (message) => {
    if (!fs.existsSync(`./profiles/${message.author.id}`)) {
      let profil = // id, niveau, dispo, soutiens, date dernier soutien, messages
`${message.author.id}
0
0
0
0
0`
      ;

      fs.writeFile(`./profiles/${message.author.id}`, profil, {flag: 'w'}, (err) => {
        if (!err) {
          console.log(`${message.author.id} : profile saved.`);
        }
      });
    }
  }
}

module.exports = new InitProfil();
