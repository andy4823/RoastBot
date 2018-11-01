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



client.on("ready", () => {
  
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {

    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }
 
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.on("message", message => {
  if (message.author.bot) return;
  let score;
  if (message.guild) {
    score = client.getScore.get(message.author.id, message.guild.id);
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 }
    }
    score.points++;
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    if(score.level < curLevel) {
      score.level++;
      message.reply(`Ewa Fakka jij bent een level omhoog je bent nu level **${curLevel}**!   `);
    }
    client.setScore.run(score);
  }
  if (message.content.indexOf(config.prefix) !== 0) return;
 
  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();
 
  // Command-specific code here!
    if(command === "points") {
    return message.reply(`Ewa You currently have ${score.points} points and are level ${score.level}!`);
  }
    if(command === "give") {
  // Limited to guild owner - adjust to your own preference!
  if(!message.author.id === message.guild.owner) return message.reply("Yain't the boss of me, you can't do that!");
 
  const user = message.mentions.users.first() || client.users.get(args[0]);
  if(!user) return message.reply("You must mention someone or give their ID!");
 
  const pointsToAdd = parseInt(args[1], 10);
  if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...")
 
  // Get their current points.
  let userscore = client.getScore.get(user.id, message.guild.id);
  // Create data for a user we haven't seen before in the server
  if (!userscore) {
    userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 }
  }
  userscore.points += pointsToAdd;
 
  // We also want to update their level (but we won't (@)notify them if it changes)
  let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
  userscore.level = userLevel;
 
  // And we save it!
  client.setScore.run(userscore);
 
  return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
}
 
if(command === "leaderboard") {
  const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);
 
    // Now shake it and show it! (as a nice embed, too!)
  const embed = new Discord.RichEmbed()
    .setTitle("Leaderboard")
    .setAuthor(client.user.username, client.user.avatarURL)
    .setDescription("Our top 10 points leaders!")
    .setColor("orange");
 
  for(const data of top10) {
    embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
  }
  return message.channel.send({embed});
}

});
client.login(config.token);