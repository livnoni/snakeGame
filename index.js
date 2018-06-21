
const box = 32;
const ground = new Image();
ground.src = "img/ground.png";
const soundPath = {
    dead: "audio/dead.mp3",
    eat: "audio/eat.mp3",
    up: "audio/up.mp3",
    left: "audio/left.mp3",
    right: "audio/right.mp3",
    down: "audio/down.mp3"
};
let snakeDirection;

//notes: thier isnt realy destructor  in Js , delete operator can only deleter properties, not the object inself.

class BackgroundListener{
    constructor(sound){
        document.addEventListener("keydown", direction);
        var self = this;
        function direction(event){
            if(event.keyCode == 37 && snakeDirection != "RIGHT"){
                snakeDirection = "LEFT";
                self.toString()
                sound.play("left");
            }else if(event.keyCode == 38 && snakeDirection != "DOWN"){
                snakeDirection = "UP";
                self.toString()
                sound.play("up");
            }else if(event.keyCode == 39 && snakeDirection != "LEFT"){
                snakeDirection = "RIGHT";
                self.toString()
                sound.play("right");
            }else if(event.keyCode == 40 && snakeDirection != "UP"){
                snakeDirection = "DOWN";
                self.toString()
                sound.play("down");
            }
        }
    }
    toString(){
        console.log(`direction changed to -> ${snakeDirection}`);
    }
}



class Point {
    constructor(x, y) {
        this.x = x * box;
        this.y = y * box;
        console.log(`created new Point[${this.x/box},${this.y/box}]`);
    }
    getX(){
        return this.x;
    }
    getY(){
        return this.y;
    }
    destructor (){
        console.log(`delete Point[${this.x/box},${this.y/box}]`);
        delete this.x;
        delete this.y;
    }

}

class Game {
    constructor(backgroundImg, soundPath, snake) {
        this.backgroundImg = backgroundImg;
        this.sound = new Sound(soundPath);
        this.snake = snake;
        new BackgroundListener(this.sound);

    }
    draw(){
        const cvs = document.getElementById("snake");
        const ctx = cvs.getContext("2d");
        ctx.drawImage(ground, 0, 0);

        for(var i =0; i< this.snake.getLength(); i++){
            ctx.fillStyle = (i==0) ? "green" : "white";
            ctx.fillRect(this.snake.getHeadX(), this.snake.getHeadY(), box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snake.getHeadX(), this.snake.getHeadY(), box, box);
        }

    }

    async startGame(){
        while(true){
            await timeout(100);
            this.draw()
        }

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

    }
}

class Sound {
    constructor(soundPath) {
        var counter = 0;
        for(var soundName in soundPath){
            counter++;
            this[soundName] = this._createAudioFile(soundPath[soundName]);
            console.log(`created new sound of ${soundName}.`);
        }
        console.log(`Audio class have created successfully ${counter} sounds.`);
    }

    _createAudioFile(path) {
        const audio = new Audio();
        audio.src = path;
        return audio;
    }

    play(sound){
        this[sound].play();
    }
}

class Snake {
    constructor(point) {
        this._body = [];
        this._body.push(point);
    }

    getHeadX(){
        return this._body[0].getX();
    }
    getHeadY(){
        return this._body[0].getY();
    }
    getLength(){
        return this._body.length;
    }

    addBox() {

    }

    move(direction) {

    }
}

function loadPic(path) {
    var img = new Image();
    img.src = path;
    return img;
};


class Food {
    constructor(position, score) {
        this.position = position;
        this.score = score;
    }

    disappear() {
    };
}

class Apple extends Food {
    constructor() {
        super(position, score);
    }

    // static pic = loadPic("img/food.png");
    static getPic() {
        return loadPic("img/food.png");
    }
}

class Banana extends Food {
    constructor() {
        super(position, score);
    }

    static getPic() {
        return loadPic("img/food.png");
    }
}

class Bonus extends Food {
    constructor() {
        super(position, score);
    }

    static getPic() {
        return loadPic("img/food.png");
    }
}


var game = new Game(ground, soundPath, new Snake(new Point(9,10)));
game.startGame();