const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (client, message, args) => {
    let regions = {
        'us-central': ':flag_us: US Central',
        'us-south': ':flag_us: US South',
        'us-east': ':flag_us: US East',
        'us-west': ':flag_us: US West',
        'russia': ':flag_ru: Russia',
        'brazil': ':flag_br: Brazil',
        'eu-central': ':flag_eu: EU Central',
        'eu-west': ':flag_eu: EU West',
        'hongkong': ':flag_hk: Hong Kong',
        'japan': ':flag_jp: Japan',
        'singapore': ':flag_sg: Singapore',
        'southafrica': ':flag_za: South Africa',
        'sydney': ':flag_au: Sydney'
    }

    let ecf = {
        0: '[No Verification](https://support.discordapp.com/hc/article_attachments/115001337572/None_Verification_Level.png)',
        1: '[Low](https://support.discordapp.com/hc/article_attachments/115001337592/Low_Verification_Level.png)',
        2: '[Medium](https://support.discordapp.com/hc/article_attachments/115001343811/Medium_Verification_Level.png)',
        3: '[(╯°□°）╯︵ ┻━┻](https://support.discordapp.com/hc/article_attachments/115001343791/TableFlip_Verification.png)',
        4: '[┻━┻ ﾐヽ(ಠ益ಠ)ノ彡┻━┻](https://support.discordapp.com/hc/article_attachments/115001343751/Double_TableFlip_Verification.png)'
    }

    let dnd = message.guild.members.filter(m => m.user.presence.status === 'dnd').size;
    let online = message.guild.members.filter(m => m.user.presence.status === 'online').size;
    let offline = message.guild.members.filter(m => m.user.presence.status === 'offline').size;
    let busy = message.guild.members.filter(m => m.user.presence.status === 'idle').size;

    let users = message.guild.members.filter(m => !m.user.bot).size;
    let bots = message.guild.members.filter(m => m.user.bot).size;

    let embed = new Discord.RichEmbed()
        .setAuthor(`${message.guild.name}'s Info`, message.guild.iconURL)
        .setThumbnail(message.guild.iconURL)
        .setColor('BLUE')
        .addField('» Created At', `${moment(message.guild.createdTimestamp).format('ddd Do MMM YYYY [|] HH:mm:ss [GMT]Z')} | ${moment(message.guild.createdTimestamp).fromNow()}`)
        .addField('» Users', `${message.guild.memberCount} Members \n${users} humans 👱 \n${bots} bots 🤖`)
        .addField('» ID', message.guild.id)
        .addField('» Region', regions[message.guild.region])
        .addField('» Verification Level', `${ecf[message.guild.verificationLevel]}`)
        .addField('» Users Online', online + dnd + busy)
        .addField('» Users Offline', offline)

    message.channel.send(embed);
}

module.exports.config = {
    name: "serverinfo",
    aliases: ["info", "si"],
    description: "Gives information about the server",
    params: []
}