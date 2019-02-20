exports.run = (client, message, args) => {
 message.channel.sendMessage({
        "embed": {
                title: 'Buienradar',
                url: 'http://www.buienradar.nl/',
                "image": {
                "url": "https://api.buienradar.nl/image/1.0/RadarMapNL?w=500&h=512",
                }
            }
    });
}