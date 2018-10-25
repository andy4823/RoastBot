const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const config = require("./config.json");
const fs = require("fs");
const talkedRecently = new Set();

function roasted() {
    var rand = ['ik bel greenpeace voor jou dikke walvis lichaam','jezus man wat een hoofd!', 'SO DE TERING','tuberculose slet', 'tyfus wees kind', 'ik krijg gelijk cholera als ik naar je kijk'];

    return rand[Math.floor(Math.random()*rand.length)];
} 

client.on("message", (message) => {
  if (message.content.startsWith(config.prefix + "roast")) {
    message.channel.send(roasted() + message.mentions.members.first());
  } else
  if (message.content.startsWith(config.prefix + "offensive")) {
    message.channel.send(Offensive() + message.mentions.members.first());
  }
});

function Offensive() {
    var OFFrand = ['Ik maak van je moeder de nieuwe anne faber', 'anne frank is nog charmanter dan jij', 'godverdomme zeg wtf heb jij voor een tumor hoofd', ' ik gooi je toekomstige kinderen voor de trein terwijl ik thomas de trein theme song aan zet', 'ik hoop dat je zelfmoord actie gaat falen', 'zelfs de trein breekt als je ervoor springt!', 'mensen horen je normaal tegen te houden maar iedereen wil jou zelfmoord zien plegen'];

    return OFFrand[Math.floor(Math.random()*OFFrand.length)];
}

fs.readdir("./events/", (err, files) => {
	if (err) return console.error(err);
	files.forEach(file => {
		const event = require(`./events/${file}`);
		let eventName = file.split(".")[0];
		client.on(eventName, event.bind(null, client));
	});
});


 
client.on("ready", () => {
  console.log("I am online!");
  client.user.setActivity('you getting ROASTED', { type: 'WATCHING' })
});
 
client.on("message", (message) => {
  if (message.author.bot) return;
  //client.pointsMonitor(client, message);
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  try {
  	let commandFile = require(`./commands/${command}.js`);
	commandFile.run(client, message, args);  
  } catch (err) {
  	console.error(err);
  }



});

client.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "monkaS"));
});

client.on("message", message => {
  if (message.author.bot) return;
  if (message.guild) {

  }
});

client.on("ready", () => {
  
})


client.login(config.token);