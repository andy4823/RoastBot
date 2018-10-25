exports.run = (client, message, args) => {
	message.channel.send('@everyone ik ben nu offline. tot ziens :bye:');
	message.delete();
}