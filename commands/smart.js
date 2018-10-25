exports.run = (client, message, args) => {
  	message.delete();
  	message.channel.send('Andy is smart :D ').catch(console.error);
}