module.exports = async (client, message) => {
    console.log(`[DELETE] Message: ${message.embeds.length >= 1 ? "An embed" : message.content} | Author: ${message.author.tag}`);
}