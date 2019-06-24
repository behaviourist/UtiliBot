const Discord = require('discord.js');

module.exports.run = async (client, message, args) => {
    const member = message.mentions.members.first() || message.guild.members.get(args[0]) || message.member;

    let status = {
        "dnd": "Do Not Disturb",
        "idle": "Idle",
        "offline": "Offline",
        "online": "Online"
    }

    let types = {
        "0": "Playing",
        "1": "Streaming",
        "2": "Listening to",
        "3": "Watching"
    }

    const embed = new Discord.RichEmbed()
        .setColor("BLUE")
        .setTitle(`» Description about ${member.displayName}`)
        .addField("» Join Date", member.joinedAt, true)
        .addField("» Account Creation Date", member.user.createdAt, true)
        .addField("» Tag", member.user.tag, true)
        .addField("» ID", member.id, true)
        .addField("» Is a Bot?", member.user.bot ? "Yes" : "No", true)
        .addField("» Has Nitro?", member.user.premium ? "Yes" : "No", true)
        .addField("» Presence", member.user.presence.game ? types[member.user.presence.game.type] + " " + member.user.presence.game.name : "Doing nothing.", true)
        .addField("» Status", status[member.user.presence.status], true)
        .addField("» Spotify",
            member.user.presence.game.name.toLowerCase() === "spotify"
                && member.presence.game
                ? `**Song**: ` + member.user.presence.game.details +
                `\n**Artist(s)**:` + member.user.presence.game.state.replace(/;/g, ', ') +
                `\n**Album**: ` + member.user.presence.game.assets.largeText
                : "Unable to display.", true)
        .setThumbnail(member.user.presence.game ? member.user.presence.game.name.toLowerCase() === "spotify" ? `https://i.scdn.co/image/${member.user.presence.game.assets.largeImage.replace('spotify:', '')}` : member.user.displayAvatarURL : member.user.displayAvatarURL)
        .setFooter("UtiliBot", client.user.displayAvatarURL)
        .setTimestamp();

    message.channel.send(embed);
}

module.exports.config = {
    name: "userinfo",
    aliases: ["ui"],
    description: "Shows information about the given member",
    params: [
        {
            name: "User",
            type: "Mention or ID",
            required: false
        }
    ]
}