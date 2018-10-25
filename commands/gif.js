var request = this.getWrexMods().require("request");

var url = "https://api.imgur.com/3/gallery/search/?q=" + tempVars("search");
var client_id = "492256246934798336";
var tempVarName = "imgur";

try {
    request.get({
        url: url,
        json: true,
        headers: {
            'Authorization': 'Client-ID ' + client_id
        }
    }, (err, res, data) => {

        if (err) {
            console.error(err.stack ? err.stack : err);
        }

        this.storeValue(data, 1, tempVarName, cache);
        this.callNextAction(cache);
    });
} catch (err) {
    console.error(err.stack ? err.stack : err);
}