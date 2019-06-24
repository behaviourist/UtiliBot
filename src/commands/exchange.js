const Discord = require("discord.js");
const request = require("request");

const supportedCurrencies = [
    "USD", "CAD", "NZD",
    "AUD", "CLP", "GBP",
    "JPY", "CNY", "SGD",
    "HKD", "DKK", "SEK",
    "ISK", "CHF", "BRL",
    "EUR", "RUB", "PLN",
    "THB", "KRW", "TWD"
];

module.exports.run = async (client, message, args) => {
    const currency = args[0].toUpperCase();
    if (!currency || !supportedCurrencies.includes(currency)) return message.channel.send(`Please enter a currency from the list below\n\n\`${supportedCurrencies.join(", ")}\`.`);

    const value = args[1];
    if (!value) return message.channel.send(`Please enter a value of ${currency} to convert into BTC.`);

    request(`https://blockchain.info/tobtc?currency=${currency}&value=${value}`, (err, resp, body) => {
        if (err && resp.statusCode !== 200) return;

        if (body === "Parameter <currency> with unsupported symbol") return message.channel.send("Unsupported currency code.");

        return message.channel.send(
            new Discord.RichEmbed()
                .setTitle(`${currency} to BTC`)
                .setDescription(`${currency} ${parseInt(value).toLocaleString()} = ${body} BTC`)
                .setColor("BLUE")
                .setTimestamp()
        );
    });
}

module.exports.config = {
    name: "exchange",
    aliases: ["exchangebtc"],
    description: "Converts real world currency value into bitcoin",
    params: [
        {
            name: "Currency",
            type: "String",
            required: true
        },
        {
            name: "Value",
            type: "Number",
            required: true
        }
    ]
}