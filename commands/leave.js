exports.run = (client, message, args) => {
    if (message.member.voiceChannel) {
      message.member.voiceChannel.leave()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('Ewa kniffo ik ben geleaved') .catch(console.log);
        });
    } else {
      message.reply('You need to join a voice channel first!');
    }
}