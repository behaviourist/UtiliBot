module.exports = async (client, oldMessage, newMessage) => {
    console.log(`[MESSAGE UPDATE] Old: ${oldMessage.embeds.length >= 1 ? "An embed" : oldMessage.content} | New: ${newMessage.embeds.length >= 1 ? "An embed" : newMessage.content} | Author: ${newMessage.author.tag}`);
}