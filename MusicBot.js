const Discord = require("discord.js");
const client = new Discord.Client();

client.on("ready", () => {
  console.log("I am ready!");
});

// join en leave gedeelte 
client.on("message", (message) => {
	if (!message.guild) return;

	  if (message.content === '$join') {
    // Only try to join the sender's voice channel if they are in one themselves
    if (message.member.voiceChannel) {
      message.member.voiceChannel.join()
        .then(connection => { // Connection is an instance of VoiceConnection
          message.reply('I have successfully connected to the channel!') .catch(console.log);
        })  
    } else {
      message.reply('You need to join a voice channel first!');
    }
  }
});

client.on("message", (message) => {
	if (!message.guild) return; 
		if (message.content === '$leave') {
			message.reply('I have successfully disconnected from the voicechannel!')
			{
	if (message.member.voiceChannel) { 
		message.member.voiceChannel.leave(); 
		
					
	}	}	
		}

});


//music gedeelte
/* const fs = require('fs');
const ytdl = require('ytdl-core');

const streamOptions = { seek: 0, volume: 1 };
var voiceChannel = message.member.voiceChannel;
        voiceChannel.join().then(connection => {
            console.log("joined channel");
            const stream = ytdl('https://www.youtube.com/watch?v=gOMhN-hfMtY', { filter : 'audioonly' });
            const dispatcher = connection.playStream(stream, streamOptions);
            dispatcher.on("end", end => {
                console.log("left channel");
                voiceChannel.leave();
            });
        }).catch(err => console.log(err)); */
 
