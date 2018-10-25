exports.run = (client, message, args) => {
	message.delete();
  	message.channel.send('DAMN BOII YOU JUST GOT ROASTED').catch(console.error);
}