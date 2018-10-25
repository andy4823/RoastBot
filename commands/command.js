exports.run = (client, message, args) => {
  message.channel.send({embed: {
    color: 3447003,
    title: "Mijn commands zijn:",
    fields: [
      { name: "Roasts", value: "$roast\n$offensive ⚠USE AT YOUR OWN RISK⚠"},
      { name: "Random", value: "$gretavanfleet\n$ping\n$reee\n$roasted\n$slave\n$hellyeah\n$lamp\n$turk\n$marrokaan\n$6\n$know\n$smart\n$stupid\n$suckmydick" },
      { name: "utility", value: "$whatismyavatar\n$say (gebruik: $say (text)\n$weer"},
      { name: "Admin Commands", value: "$kick\n$ban"}
      ]
    }
  });
}