const Discord = require("discord.js");
exports.run = async(client, message, args) => {

    /* Defining from & to*/
    let from = args.slice(0, 1).join(" ");
    let to = args.slice(1, 2).join(" ");

    /* Defining the EMOJIS [list of the number emojis: 0-9 & 0-9 gif] (contact XkijuX#6667 to get them ;)*/
    let animated = "<a:0_:487992911103918081>";
    let array = [ "<:0_:487985095706411018>", "<:1_:487985106829574164>","<:2_:487985116048654337>","<:3_:487985123590144010>","<:4_:487985138538643476>","<:5_:487985145786400779>","<:6_:487985159916879872>","<:7_:487985169157062666>","<:8_:487985177486950424>","<:9_:487985187519463465>"]

    /* Embed Formatting */
    const help = new Discord.RichEmbed()
        .setColor("#33ccff")
        .addField("Sassocket number generator 101 :robot:", "\n**Format**: \n```https\n$random <from*> [to*]``` \n**<>** = Optional\n**[]** = Needed\n** * ** = A number between **0** and **9999**")
        .setFooter(" © andy4823", client.user.avatarURL)
        .setTimestamp();

    const start = new Discord.RichEmbed()
        .setColor("#33ccff")
        .addField("Getting The Number 🎲", "<a:0_:487992911103918081><a:0_:487992911103918081><a:0_:487992911103918081><a:0_:487992911103918081>")
        .setFooter(" © andy4823", client.user.avatarURL)
        .setTimestamp();



    /* Checking different values for info */
    if(from === "help") return message.channel.send(help);
    if(!from && !to) return message.channel.send(help);
    if (!to) {
        to = from;
        from = 1;
    }
    if(from >= 9999 || from < 0) return message.channel.send("Please use the right format 😊", {embed : help});
    if(to > 9999 || to <= 0)  return message.channel.send("Please use the right format 😊", {embed : help});

    /* Validating */
    if (!from) return message.channel.send(format);
    if (!/^[0-9]*$/.exec(to + from)) return message.channel.send("Please use the right format 😊", {embed : help});
    if (to - from <= 0) return message.channel.send("Please make sure that ``from`` **Is'nt** higher than ``to``", {embed : help});

    /* Sending the First Message*/
    const msg = await message.channel.send(start);

    /* Message Countdown */
    for(var i = 5; i > 0; i--) {
        await sleep(1000);
        await msg.edit(i)
        if(i == 1) {
          await sleep(1000);
          await msg.edit("GETTING NUMBER:");
        }
    }

   /* Formatting the answer */
    let number = await NumberPicker(from, to).toString();
    let NumberArray = [];
    switch (number.toString().length) {
        case 0:
               NumberArray = [0, 0, 0, 0];
          break;
        case 1:
              NumberArray = [0, 0 , 0, number];
          break;
        case 2:
              NumberArray = [0, 0 , number.slice(0,1), number.slice(1,2)];
          break;
        case 3:
              NumberArray = [0, number.slice(0,1), number.slice(1,2), number.slice(2,3)];
          break;
        case 4:
              NumberArray = [number.slice(0,1), number.slice(1,2), number.slice(2,3), number.slice(3,4)];
        break;
  }
  for(var i = 0; i < 4; i++) {
    const start = new Discord.RichEmbed()
        .setColor("#33ccff")
        .setFooter(" © andy4823", client.user.avatarURL)
        .setTimestamp();
    switch (i) {
      case 0:
            start.addField("Getting The Number 🎲", animated + animated + animated + array[NumberArray[3]]);
        break;
      case 1:
          start.addField("Getting The Number 🎲",  animated + animated + array[NumberArray[2]] + array[NumberArray[3]]);
        break;
      case 2:
          start.addField("Getting The Number 🎲", animated + array[NumberArray[1]] + array[NumberArray[2]] + array[NumberArray[3]]);
        break;
      case 3:
          start.addField("Your NUMBER is 🎲", array[NumberArray[0]] + array[NumberArray[1]] + array[NumberArray[2]] + array[NumberArray[3]]);
          start.setColor("#33ccff");
        break;
    }
    await sleep(500);
    await msg.edit(start);
  }


   /* Console Logs For Testing*/
   console.log("Numbers: " + from + " | "+ to);
   console.log("Numbers Length:" + number.toString().length);
   console.log("Picked: " + number);
   console.log("NumberArray: " + NumberArray);
}

/* List Of Functions*/
function NumberPicker(min, max) {
  return Math.floor(Math.random() * (Math.floor(max) - Math.ceil(min))) + Math.ceil(min);
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}