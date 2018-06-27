function onGameOver() {
    if (confirm("Do you want to play again ?")) {
        var game = new Game(config.soundPath, new Snake());
        console.log("game=\n"+JSON.stringify(game))
        game.startGame();

    } else {

    }
}

////////////////////////////////////////////////////////////
///////////////////////RUN-GAME/////////////////////////////
////////////////////////////////////////////////////////////

var game = new Game(config.soundPath, new Snake());
console.log("game=\n"+JSON.stringify(game))
game.startGame();