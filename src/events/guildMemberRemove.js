module.exports = async (client, member) => {
    console.log(`[MEMBER LEFT] Member: ${member.displayName} | Server: ${member.guild.name}`)
}