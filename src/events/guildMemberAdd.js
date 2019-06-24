module.exports = async (client, member) => {
    console.log(`[MEMBER JOINED] Member: ${member.displayName} | Server: ${member.guild.name}`)
}