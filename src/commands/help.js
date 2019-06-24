const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    const embed = new Discord.RichEmbed().setColor("BLUE");
    const commands = client.commands.array();
    if (!args[0]) {
        for (let i = 0; i < commands.length; i++) {
            let command = commands[i];

            embed.addField(`${client.prefix}${command.config.name}`, command.config.description);
        }
    } else {
        const command = client.commands.get(args[0]) || client.commands.get(client.aliases.get(args[0]));
        if (!command) return message.channel.send("Invalid Command.");

        embed.addField("Description", command.config.description);

        for (const param of command.config.params) {
            embed.addField("Name", param.name, true);
            embed.addField("Type", param.type, true);
            embed.addField("Required", param.required ? "Yes" : "No", true);
        }
    }

    message.channel.send(embed);
}

module.exports.config = {
    name: "help",
    aliases: [],
    description: "Shows information about all commands",
    params: [
        {
            name: "Command Name",
            type: "String",
            required: false
        }
    ]
}