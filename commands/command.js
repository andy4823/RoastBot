exports.run = (client, message, args) => {
  message.channel.send({embed: {
    color: 3447003,
    title: "Mijn commands zijn:",
    fields: [
      { name: "Roasts", value: "$roast\n$offensive ⚠USE AT YOUR OWN RISK⚠"},
      { name: "Random", value: "$gretavanfleet\n$ping\n$reee\n$roasted\n$slave\n$hellyeah\n$lamp\n$turk\n$marrokaan" },
      { name: "utility", value: "$whatismyavatar\n$say (gebruik: $say (text)"},
      { name: "Admin Commands", value: "$kick\n$ban"}
      ]
    }
  });
}