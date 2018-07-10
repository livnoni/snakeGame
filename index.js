function onGameOver(data) {
    var username;
    var username = prompt("Please enter your name:", "your name");
    if (username == null || username == "") {
        console.log("User cancelled the prompt.")
    } else {
        console.log("username=",username)
        console.log("data=",Object.assign(data,{name:username}));

    }

    var xhr = new XMLHttpRequest();
    xhr.open("POST", "https://livnonisnake.herokuapp.com/sendScore", true);
    xhr.open("POST", "http://localhost:5000/sendScore", true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify(data));



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