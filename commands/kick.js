exports.run = (client, message, args) => {
	let member = message.mentions.members.first();
 	let reason = args.slice(1).join(" ");
  	member.kick(reason);
}