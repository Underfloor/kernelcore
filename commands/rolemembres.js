let RoleMembres = function() {
  this.command = '!rolemembres';
  this.description = 'Affiche les membres d\'un rôle.';

  this.getRole = (rolesMap, roleName) => {
    for (role of rolesMap) {
      if (role[1].name === roleName) {
        return role;
      }
    }
  };

  this.hasRole = (rolesMap, roleName) => {
    for (role of rolesMap) {
      if (role[1].name && role[1].name === roleName) {
        return true;
      }
    }

    return false;
  }

  this.getUsers = (membersMap, roleName) => {
    let users = [];
    for (user of membersMap) {
      if (user[1].roles && this.hasRole(user[1].roles.entries(), roleName)) {
        users.push(user[1].user.username);
      }
    }

    return users;
  }
  
  this.handle = (message) => {
    let roleName = message.content.split(" ").slice(1)[0];
    let role = this.getRole(message.guild.roles.entries(), roleName);
    
    if (role !== undefined) {
      message.channel.sendMessage(
`Le rôle ${roleName} est tenu par les membres suivants:
${this.getUsers(message.guild.members.entries(), roleName).join(", ")}`
      );
    }
  };
}

module.exports = new RoleMembres();
