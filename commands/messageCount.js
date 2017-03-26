const fs = require('fs');

let MessageCount = function() {
  this.command = '', // handle any message to set count

  this.handle = (message, commands) => {
    for (command of commands) {
      if (command.command !== "" && message.content.startsWith(command.command)) {
        return;
      }
    }
    let profil = JSON.parse(fs.readFileSync(`./profiles/${message.author.id}`));

    profil.messages++;

    fs.writeFileSync(`./profiles/${message.author.id}`, JSON.stringify(profil));
  }
}

module.exports = new MessageCount();
