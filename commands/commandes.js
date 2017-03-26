let Commandes = function() {
  this.command = '!commandes';
  this.description = 'Affiche la liste des commandes.';

  this.handle = (message, commands) => {
    message.channel.sendMessage(
`\`\`\`Les commandes :
${commands.filter((command) => {
  return command.description && command.command !== this.command;
}).map((command) => {
  return `${command.command} => ${command.description}`;
}).join("\n")}\`\`\`
`
    );
  }
}

module.exports = new Commandes();
