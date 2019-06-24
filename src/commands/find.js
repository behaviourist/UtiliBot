const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const user = message.mentions.members.first() || client.users.get(args[0]);

    if (user) {
        const mapped = client.guilds.map(g => {
            if (g.members.find(member => member.id === user.id)) return g.name;
        });

        message.channel.send(`Servers in common between the bot and ${user}:\n\n\`${mapped.join("\n")}\``);
    }
}

module.exports.config = {
    name: "find",
    aliases: ["search", "track"],
    description: "Finds all the servers the given user and the bot have in common",
    params: [
        {
            name: "User",
            type: "Mention or ID",
            required: true
        }
    ]
}