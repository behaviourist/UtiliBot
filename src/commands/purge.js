const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
    let amount = parseInt(args[0]);

    amount >= 100
        ? amount = 100
        : amount <= 0
            ? amount = 0
            : isNaN(amount)
                ? amount = 10
                : amount;

    message.channel.bulkDelete(amount).then(() => message.channel.send(`Deleted ${amount} messages`)).catch(console.error);
}

module.exports.config = {
    name: "purge",
    aliases: ["p"],
    description: "Deletes a specified amount of messages",
    params: [
        {
            name: "Amount",
            type: "Number",
            required: false
        }
    ]
}