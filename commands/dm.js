exports.run = async function (Memer, msg, args) {
	if (!Memer.config.devs.includes(msg.author.id)) {
		return
	}
	try {
		const channel = await Memer.client.getDMChannel(args[0])
		channel.createMessage({
			embed: {
				color: Memer.colors.purple,
				title: '📫 You have received a message from the developers!',
				description: args.slice(1).join(' '),
				footer: { text: 'To reply, please use pls bother.' }
			}
		})
		await msg.addReaction('📧')
	} catch (e) {
		await msg.addReaction('❌')
		msg.channel.createMessage(`**Fuck!** *${e.message}*`)
	}
}