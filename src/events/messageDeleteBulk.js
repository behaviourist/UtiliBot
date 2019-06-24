module.exports = async (client, messages) => {
    console.log(`[BULK DELETE] Messages: ${messages.size} | Channel: ${messages.map(x => x.channel.name)[0]}`);
}