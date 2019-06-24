const request = require("request");

const versions = [
    "stable",
    "master"
]

module.exports.run = async (client, message, args) => {
    if (!args || args.length === 0) return message.channel.send("Please provide a search query.");

    let version = args.pop();
    if (!version || !versions.includes(version)) {
        args.push(version);
        version = "stable";
    }

    request(`https://djsdocs.sorta.moe/main/${version}/embed?q=${encodeURIComponent(args.join(" "))}`,
        (err, resp, body) => {
            if (err && resp.statusCode !== 200) return;

            body = JSON.parse(body);

            if (body && !body.error) {
                message.channel.send({ embed: body });
            } else {
                message.channel.send("I could not find anything for the given search parameters");
            }
        });
}

module.exports.config = {
    name: "discorddocs",
    aliases: ["djs", "searchdjsdocs"],
    description: "Searches the documentation for discord.js with given query",
    params: [
        {
            name: "Query",
            type: "String",
            required: true
        },
        {
            name: "Version",
            type: "String",
            required: true
        }
    ]
}