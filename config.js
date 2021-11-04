const config = {
    box: 32,
    soundPath: {
        dead: "audio/dead.mp3",
        eat: "audio/eat.mp3",
        bonus: "audio/bonus.wav",
        up: "audio/up.mp3",
        left: "audio/left.mp3",
        right: "audio/right.mp3",
        down: "audio/down.mp3"
    },
    groundPath: "img/ground.png",
    gameSpeed: 100,
    foods: [{name: "apple", score: 10}, {name: "banana", score: 15}, {name: "watermelon", score: 20}],
    bonus:{name:"bonus", score:100},
    startGetBonusRandomAfterEatNumOfFood : 3,
    getBonusAfterEveryNumOfFood: 3,
    maxIntervalGetBonus: 10,
    numOfFirstTopScores: 30,
    nodeServerAddress: "https://livnonisnake.herokuapp.com"
};

//GLOBAL VARIABLES:
var snakeDirection;
var scores;