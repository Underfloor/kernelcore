let MesRoles = function() {
  this.command = '!mesroles';
  this.description = 'Affiche vos rôles.';

  this.getRoles = (rolesMap) => {
    let roles = [];

    for (role of rolesMap) {
      if (role[1].name && role[1].name !== '@everyone') {
        roles.push(role[1].name);
      }
    }

    return roles.join(" | ");
  };

  this.handle = (message) => {
    message.channel.sendMessage(
`Liste des rôles de ${message.author.username} :
${this.getRoles(message.member.roles.entries())}
`);
  };
}

module.exports = new MesRoles();
