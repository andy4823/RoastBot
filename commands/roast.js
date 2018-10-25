exports.run = (client, message, args) => {

	function roasten() {
		var roast = ["ik bel greenpeace voor jou dikke walvis lichaam","jezus man wat een hoofd!", "SO DE TERING","tuberculose slet", "tyfus wees kind"];

		return roast[Math.floor(Math.random()*roast.length)];	
		message.channel.send(roast).then().catch(console.error);
	}
}