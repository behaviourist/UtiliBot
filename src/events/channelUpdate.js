module.exports = async (client, oldChannel, newChannel) => {
    
    if(oldChannel.name === newChannel.name) return;
    console.log(`[CHANNEL UPDATED] Channel: ${oldChannel.name} to ${newChannel.name}`)
}