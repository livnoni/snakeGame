var express = require('express');
var app = express();


app.get('/score', function (req, res) {
    console.log("got /score request.");
    var temp = [{name: "yehuda", score: 400}, {name: "sharon", score: 300}, {name: "yarden", score: 200}, {name: "boaz", score: 100}];
    res.end(JSON.stringify(temp))
});

var server = app.listen(8080, function () {

    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port)

});