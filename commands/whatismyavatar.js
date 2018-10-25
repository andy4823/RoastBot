exports.run = (client, message, args) => {
	message.reply(message.author.avatarURL).catch(console.error);
}