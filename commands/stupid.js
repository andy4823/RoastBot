exports.run = (client, message, args) => {
	message.channel.send('9 + 10 = ?').catch(console.error);
}