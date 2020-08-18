const { prefix } = require("../../config.json");
module.exports = async (client, message) => {
    client.prefix = prefix;

    if (message.author.bot || !message.guild) return;
    const prefixRegex = new RegExp(`^(<@!?${client.user.id}>|\\${client.prefix})\\s*`);

    if (!prefixRegex.test(message.content)) return;

    const args = message.content.slice(message.content.match(prefixRegex)[0].length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if (!command) return;
    if (!client.commands.has(command) && !client.aliases.has(command)) return;

    message.mentions.users.delete(client.user.id); message.mentions.members.delete(client.user.id);

    const rCommand = client.commands.get(command) || client.commands.get(client.aliases.get(command));

    if (!rCommand) return;
    else rCommand.run(client, message, args);
}
