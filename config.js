const config = {
    box: 32,
    soundPath: {
        dead: "audio/dead.mp3",
        eat: "audio/eat.mp3",
        up: "audio/up.mp3",
        left: "audio/left.mp3",
        right: "audio/right.mp3",
        down: "audio/down.mp3"
    },
    groundPath: "img/ground.png",
    gameSpeed: 100,
    // appleScore: 10,
    // bananaScore: 15,
    // watermelonScore: 20,
    foods: [{name: "apple", score: 10}, {name: "banana", score: 15}, {name: "watermelon", score: 20}]
};

//GLOBAL VARIABLES:
var snakeDirection;
