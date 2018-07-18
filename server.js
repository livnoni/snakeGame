var config = {DataBaseName: "snakegame", collection: "scores"};
var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();

app.use(cors());
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({extended: true})); // support encoded bodies

var MongoClient = require('mongodb').MongoClient;

function writeToDB(obj) {
    MongoClient.connect(process.env.mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.DataBaseName);
        dbo.collection(config.collection).insertOne(obj, function (err, res) {
            if (err) throw err;
            console.log(`1 document inserted -> [${JSON.stringify(obj)}]`);
            db.close();
        });
    });
}

app.get('/scores', async function (req, res) {
    console.log("got /score request.");
    MongoClient.connect(process.env.mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.DataBaseName);
        dbo.collection(config.collection).find({}).toArray(function (err, result) {
            if (err) throw err;
            result.sort(function(a,b){return b.score - a.score});
            // console.log(result);
            db.close();
            res.end(JSON.stringify(result));
        });
    });
});

app.post('/sendScore', function (req, res) {
    console.log("got post sendScore");

    var name = req.body.name;
    var score = req.body.score;
    var events = req.body.events;

    try{
        events = JSON.parse(atob(events));

        var eventsScore = 0;
        for(var i=0; i<events.length; i++){
            eventsScore = eventsScore + events[i].score;
        }
        if(score == eventsScore){
            writeToDB({name, score}, "scores");
            //send to DB:
            res.send("successfully got score=" + score + " to " + name);
        }else{
            res.send("Data not valid.");
        }
    }catch (err){
        res.send("Error accord");
    }



});

app.post('/deleteScore', function (req, res) {
    console.log("got delete deleteScore");

    var name = req.body.name;
    var score = req.body.score;

    MongoClient.connect(process.env.mongoUrl, function(err, db) {
        if (err) throw err;
        var dbo = db.db(config.DataBaseName);
        dbo.collection(config.collection).deleteOne({name: name, score:Number(score)}, function(err, obj) {
            if (err) throw err;
            console.log("1 document deleted");
            db.close();
            res.send("successfully delete score=" + score + " to " + name);
        });
    });

});


// Initialize the app.
var server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});