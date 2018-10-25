exports.run = async (client, message) => {
	const scorePoints = client.points.get(message.author.id).points;
	!scorePoints ? message.channel.send('You have no points yet.') : message.channel.send(`You have ${scorePoints} points!`);
};

exports.conf = {
  hidden: flase,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'points',
  description: 'points',
  usage: '$points',
  category: 'punten',
  extended: 'ja'
};