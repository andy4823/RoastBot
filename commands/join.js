exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply("I've joined the server") .catch(console.log);
        });
    } else {
      message.reply('You need to join a voice channel first!');
    }
}
