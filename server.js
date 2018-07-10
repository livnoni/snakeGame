var express = require('express');
var app = express();


app.get('/score', function (req, res) {
    console.log("got /score request.");
    var temp = [{name: "yehuda", score: 400}, {name: "sharon", score: 300}, {name: "yarden", score: 200}, {name: "boaz", score: 100}];
    res.end(JSON.stringify(temp))
});

app.post('/sendScore', function(req, res) {
    console.log("got post sendScore");

    var name = req.body.name;
    var score = req.body.score;

    res.send("succsefully got score="+score+" to "+name);
});


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});