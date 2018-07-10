var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

var MongoClient = require('mongodb').MongoClient;

function writeToDB(obj, collectionName){
    MongoClient.connect(process.env.mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db("snakeGame");
        dbo.collection(collectionName).insertOne(obj, function(err, res) {
            if (err) throw err;
            console.log(`1 document inserted -> [${JSON.stringify(obj)}]`);
            db.close();
        });
    });
}


app.get('/score', function (req, res) {
    console.log("got /score request.");
    var temp = [{name: "yehuda", score: 400}, {name: "sharon", score: 300}, {name: "yarden", score: 200}, {name: "boaz", score: 100}];
    res.end(JSON.stringify(temp))
});

app.post('/sendScore', function(req, res) {
    console.log("got post sendScore");
    console.log("req.body=",req.body);


    var name = req.body.name;
    var score = req.body.score;

    writeToDB({name , score}, "scores");


    //send to DB:


    res.send("succsefully got score="+score+" to "+name);
});


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});