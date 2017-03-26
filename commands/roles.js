let Roles = function() {
  this.command = '!roles';
  this.description = 'Affiche la liste des rôles possibles.';

  this.handle = (message) => {
    message.channel.sendMessage('Liste des rôles.', {
      file: 'images/roles.jpg'
    });
  }
}

module.exports = new Roles();
