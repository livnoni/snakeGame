function onGameOver(data) {
    var username = prompt("Please enter your name:", "your name");
    if (username == null || username == "") {
        console.log("User cancelled the prompt.")
    } else {
        if(username == "your name") username = "Unknown Player";
        console.log("username=",username);
        console.log("data=",Object.assign(data,{name:username}));

        var xhr = new XMLHttpRequest();
        xhr.open("POST", `${config.nodeServerAddress}/sendScore`, true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify(data));

    }





    if (confirm("Do you want to play again ?")) {
        var game = new Game(config.soundPath, new Snake());
        console.log("game=\n"+JSON.stringify(game));
        game.startGame();

    } else {

    }
}

////////////////////////////////////////////////////////////
///////////////////////RUN-GAME/////////////////////////////
////////////////////////////////////////////////////////////

var game = new Game(config.soundPath, new Snake());
console.log("game=\n"+JSON.stringify(game));
game.startGame();