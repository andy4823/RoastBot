const Discord = require("discord.js");
const client = new Discord.Client();
const SQLite = require("better-sqlite3");
const sql = new SQLite('./scores.sqlite');
const config = require("./config.json");
const fs = require("fs");
const talkedRecently = new Set();
const r2 = require("r2");
const querystring = require("querystring");


const DOG_API_URL = "https://api.thedogapi.com/";
const DOG_API_KEY = "5ab63e48-e889-4d90-bd11-09979f542e92";
const CAT_API_KEY = "2fa40a8f-388d-4136-9264-d9f65287c830";
const CAT_API_URL = "https://api.thecatapi.com/";

function roasted() {
    var rand = ['ik bel greenpeace voor jou dikke walvis lichaam','jezus man wat een hoofd!', 'SO DE TERING','tuberculose slet', 'tyfus wees kind', 'ik krijg gelijk cholera als ik naar je kijk', 'je bent zo klein dat je 12 jaar bent en een kettingroker ;)'];

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
    var OFFrand = ['Ik maak van je moeder de nieuwe anne faber', 'anne frank is nog charmanter dan jij', 'godverdomme zeg wtf heb jij voor een tumor hoofd', ' ik gooi je toekomstige kinderen voor de trein terwijl ik thomas de trein theme song aan zet', 'ik hoop dat je zelfmoord actie gaat falen', 'zelfs de trein breekt als je ervoor springt!', 'mensen horen je normaal tegen te houden maar iedereen wil jou zelfmoord zien plegen', 'Er is nog genoeg tijd om een klerenhanger door je hoofd te steken.'];

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

client.on("message", (message) => {
  if(message.content.includes('xD')) {
    message.reply('Dont use `XD` here fucking idiot. How old are you, 12?');
  } 
  else if(message.content.includes('sem')) {
    message.reply('<:sem:512213320372322324> https://cdn.discordapp.com/emojis/512213320372322324.png?v=1');
  } 
  else if(message.content.includes('heil')) {
    message.reply('卐 https://www.youtube.com/watch?v=-6CAJG0NvSk 卐');
  } 
  else if(message.content.includes('kanker')) {
    message.reply('dat was geen paracetamolletje https://cdn.discordapp.com/attachments/322057072944480256/512926067141640192/paracetamol.jpg');
  } 
  else if(message.content.includes('FAG')) {
    message.reply('<:sem:512213320372322324>')
  } 
  else if(message.content.includes('nazi')) {
    message.reply('https://www.youtube.com/watch?v=fc-DgRO1SrQ');
  } 
  else if(message.content.includes('mij')) {
    message.reply('https://www.youtube.com/watch?v=UVLwvCAKYs4'); 
  } 
  else if(message.content.includes('weghalen')) {
    message.reply('https://cdn.discordapp.com/attachments/486080193463844877/512608473889112064/Untitled.mp4');
  } 
  else if(message.content.includes('carlo')) {
    message.reply('NIET ZO SCHELDEN HIER');
  } 
  else if(message.content.includes('@Carloooooo')) {
    message.reply('https://www.youtube.com/watch?v=fc-DgRO1SrQ');
  } 
  else if (message.content.includes('ballentent')) {
    message.reply('https://www.youtube.com/watch?v=iE4jLaOJw9M'); 
  } 
  else if (message.content.includes('bruh')) {
    message.reply('https://www.youtube.com/watch?v=2ZIpFytCSVc');
  }
  else if (message.content.includes('nino')) {
    message.reply('ik ben gestopt met porno kijken voor haar. -nino');
  }
  else if (message.content.includes('kanker aap')) {
    message.reply('ik weet meer over pornosites dan over mn opleiding - nino2k19');
  }
  else if (message.content.includes('meow')) {
    message.reply('https://cdn.discordapp.com/attachments/222432979761364993/542710061315784734/G6POsyg_-_Imgur_1.gif');
  }
});

client.on('guildMemberAdd', (guildMember) => {
   guildMember.addRole(guildMember.guild.roles.find(role => role.name === "WollahFakkaBroer"));
});


client.on('message', message => {
  if (message.content === 'woof') {
    messageRecieved(message);
  }
});



client.on('error', data => {
  console.log('error',data);
  // attempt reconnection x times, after x seconds, exponential backoff
});

async function messageRecieved(message)
{
  try{
    // pass the name of the user who sent the message for stats later, expect an array of images to be returned.
    var images = await loadImage(message.author.username);

    // get the Image, and first Breed from the returned object.
    var image = images[0];
    var breed = image.breeds[0];

    console.log('message processed','showing',breed)
    // use the *** to make text bold, and * to make italic
    message.channel.send( "***"+breed.name + "*** \r *"+breed.temperament+"*", { files: [ image.url ] } );
    // if you didn't want to see the text, just send the file

  }catch(error)
  {
    console.log(error)
  }
}

async function loadImage(sub_id)
{
  // you need an API key to get access to all the iamges, or see the requests you've made in the stats for your account
  var headers = {
      'X-API-KEY': DOG_API_KEY,
  }
  var query_params = {
    'has_breeds':true, // we only want images with at least one breed data object - name, temperament etc
    'mime_types':'jpg,png', // we only want static images as Discord doesn't like gifs
    'size':'small',   // get the small images as the size is prefect for Discord's 390x256 limit
    'sub_id': sub_id, // pass the message senders username so you can see how many images each user has asked for in the stats
    'limit' : 1       // only need one
  }
  // convert this obejc to query string 
  let queryString = querystring.stringify(query_params);

  try {
    // construct the API Get request url
    let _url = DOG_API_URL + `v1/images/search?${queryString}`;
    // make the request passing the url, and headers object which contains the API_KEY
    var response = await r2.get(_url , {headers} ).json
  } catch (e) {
      console.log(e)
  }
  return response;

}



client.on("ready", () => {
  // Check if the table "points" exists.
  const table = sql.prepare("SELECT count(*) FROM sqlite_master WHERE type='table' AND name = 'scores';").get();
  if (!table['count(*)']) {
    // If the table isn't there, create it and setup the database correctly.
    sql.prepare("CREATE TABLE scores (id TEXT PRIMARY KEY, user TEXT, guild TEXT, points INTEGER, level INTEGER);").run();
    // Ensure that the "id" row is always unique and indexed.
    sql.prepare("CREATE UNIQUE INDEX idx_scores_id ON scores (id);").run();
    sql.pragma("synchronous = 1");
    sql.pragma("journal_mode = wal");
  }

  // And then we have two prepared statements to get and set the score data.
  client.getScore = sql.prepare("SELECT * FROM scores WHERE user = ? AND guild = ?");
  client.setScore = sql.prepare("INSERT OR REPLACE INTO scores (id, user, guild, points, level) VALUES (@id, @user, @guild, @points, @level);");
});

client.on("message", message => {
  // Ignore bots, DMs and group messages. 
  if (message.author.bot || !message.guild) return;
  

  /* 
    START Points CODE
  */ 

  // Initialize ("declare") the points. If we did this in the condition it would not be
  // available later in commands. Because "scopes"! 
  let score;
  
  if (message.guild) {
    // Try to get the current user's score. 
    score = client.getScore.get(message.author.id, message.guild.id);
    
    // If the score doesn't exist (new user), initialize with defaults. 
    if (!score) {
      score = { id: `${message.guild.id}-${message.author.id}`, user: message.author.id, guild: message.guild.id, points: 0, level: 1 };
    }
    
    // Increment points.
    score.points++;
    
    // Calculate the current level through MATH OMG HALP.
    const curLevel = Math.floor(0.1 * Math.sqrt(score.points));
    
    // Check if the user has leveled up, and let them know if they have:
    if(score.level < curLevel) {
      // Level up!
      message.reply(`You've leveled up to level **${curLevel}**! Ain't that amazing?`);
    }

    // Save data to the sqlite table. 
    // This looks super simple because it's calling upon the prepared statement!
    client.setScore.run(score);
  }
  if (message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "points") {
    return message.reply(`You currently have ${score.points} points and are level ${score.level}!`);
  }
  
  if(command === "give") {
    // Limited to guild owner - adjust to your own preference!
    if(!message.author.id === message.guild.owner) return message.reply("You're not the boss of me, you can't do that!");
  
    // Try to get the user from mention. If not found, get the ID given and get a user from that ID. 
    const user = message.mentions.users.first() || client.users.get(args[0]);
    if(!user) return message.reply("You must mention someone or give their ID!");
  
    // Read the amount of points to give to the user. 
    const pointsToAdd = parseInt(args[1], 10);
    if(!pointsToAdd) return message.reply("You didn't tell me how many points to give...");
  
    // Get their current points. This can't use `score` because it's not the same user ;)
    let userscore = client.getScore.get(user.id, message.guild.id);
    
    // It's possible to give points to a user we haven't seen, so we need to initiate defaults here too!
    if (!userscore) {
      userscore = { id: `${message.guild.id}-${user.id}`, user: user.id, guild: message.guild.id, points: 0, level: 1 };
    }
    
    // Increment the score. 
    userscore.points += pointsToAdd;
  
    // We also want to update their level (but we won't notify them if it changes)
    let userLevel = Math.floor(0.1 * Math.sqrt(score.points));
    userscore.level = userLevel;
  
    // And we save it!
    client.setScore.run(userscore);
  
    return message.channel.send(`${user.tag} has received ${pointsToAdd} points and now stands at ${userscore.points} points.`);
  }
  
  if(command === "leaderboard") {
    // Grab the 
    const top10 = sql.prepare("SELECT * FROM scores WHERE guild = ? ORDER BY points DESC LIMIT 10;").all(message.guild.id);

    // Now shake it and show it! (as a nice embed, too!)
    const embed = new Discord.RichEmbed()
      .setTitle("Leaderboard")
      .setAuthor(client.user.username, client.user.avatarURL)
      .setDescription("Our top 10 points leaders!")
      .setColor(0x00AE86);

    for(const data of top10) {
      embed.addField(client.users.get(data.user).tag, `${data.points} points (level ${data.level})`);
    }
    return message.channel.send({embed});
  }
  
});
client.login(config.token);