let Avatar = function() {
  this.command = '!avatar';
  this.description = 'Affiche votre image de profil.';
  
  this.handle = (message) => {
    message.channel.sendMessage(message.author.avatarURL);
  };
}

module.exports = new Avatar();
