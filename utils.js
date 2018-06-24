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

class BackgroundListener {
    constructor(sound) {
        document.addEventListener("keydown", direction);
        var self = this;

        function direction(event) {
            if (event.keyCode == 37 && snakeDirection != "RIGHT") {
                snakeDirection = "LEFT";
                self.toString();
                sound.play("left");
            } else if (event.keyCode == 38 && snakeDirection != "DOWN") {
                snakeDirection = "UP";
                self.toString();
                sound.play("up");
            } else if (event.keyCode == 39 && snakeDirection != "LEFT") {
                snakeDirection = "RIGHT";
                self.toString();
                sound.play("right");
            } else if (event.keyCode == 40 && snakeDirection != "UP") {
                snakeDirection = "DOWN";
                self.toString();
                sound.play("down");
            }
        }
    }

    toString() {
        console.log(`direction changed to -> ${snakeDirection}`);
    }
}


class Point {
    constructor(x, y) {
        this.x = x * box;
        this.y = y * box;
        console.log(`created new Point[${this.x / box},${this.y / box}]`);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x * box;
    }

    setY(y) {
        this.y = y * box;
    }

    equal(point) {
        if (this.x == point.x && this.y == point.y) {
            return true;
        }
        return false;
    }

    destructor() {
        console.log(`delete Point[${this.x / box},${this.y / box}]`);
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

        this.apple = new Apple({score: 10});
        this.score = 0;
        this.gameOver = false;


    }

    draw() {
        const cvs = document.getElementById("snake");
        const ctx = cvs.getContext("2d");
        ctx.drawImage(ground, 0, 0);

        ctx.fillStyle = "white";
        ctx.font = "48px Change one";
        ctx.fillText(this.score, 2 * box, 1.6 * box);
        ctx.fillText("Livnoni Snake", 5 * box, 1.6 * box);


        console.log("snake body=", this.snake._body);


        for (var i = 0; i < this.snake.getLength(); i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(this.snake._body[i].x, this.snake._body[i].y, box, box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snake._body[i].x, this.snake._body[i].y, box, box);
        }

        ctx.drawImage(Apple.getPic(), this.apple.getPoint().getX(), this.apple.getPoint().getY());

        var newPosition = this.snake.move(snakeDirection);


        //check if snake eat the apple:
        if (this.snake.getHeadPosition().equal(this.apple.getPoint())) {
            this.sound.play("eat");
            this.score += this.apple.getScore();
            this.apple = new Apple({score: 10});
        } else {
            this.snake._body.pop();

        }

        this.snake.grow(newPosition);

        this._isFinish();


    }

    async startGame() {
        while (!this.gameOver) {
            await timeout(100);
            this.draw()
        }

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

    }

    _isFinish(){
        if(this.snake.getHeadX() < box || this.snake.getHeadX() > 17 *box || this.snake.getHeadY() < 3*box || this.snake.getHeadY() > 17*box || this._collision(this.snake.getHeadPosition())){
            console.log("game over!");
            this.gameOver = true;
            this.sound.play("dead");
            this.snake.destructor();
        }
    }
    _collision(newHead) {
        return this.snake.include(newHead);
    }

}

class Sound {
    constructor(soundPath) {
        var counter = 0;
        for (var soundName in soundPath) {
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

    play(sound) {
        this[sound].play();
    }
}

class Snake {
    constructor(point) {
        this._body = [];
        this._body.push(point);
    }

    getHeadPosition() {
        return this._body[0];
    }

    getDeepHeadPosition() {
        return JSON.parse(JSON.stringify(this.getHeadPosition()));
    }

    getHeadX() {
        return this._body[0].getX();
    }

    getHeadY() {
        return this._body[0].getY();
    }

    setHeadX(x) {
        // this._body[0].setX(x);
        this._body[0].x = x * box;
    }

    setHeadY(y) {
        // this._body[0].setY(y);
        this._body[0].y = y * box;
    }

    getLength() {
        return this._body.length;
    }

    /**
     * add new body using unshift function (new variable at position 0, shift all the elements right...)
     * @param point
     */
    grow(point) {
        if (point) this._body.unshift(point);
    }

    /**
     * calac the next posiotion of the snake (depend the direction or the click event from the user)
     * @param direction
     * @returns {Point}
     */
    move(direction) {
        var tempPoint = this.getDeepHeadPosition();

        //which direction
        if (direction == "LEFT") tempPoint.x -= box;
        if (direction == "UP") tempPoint.y -= box;
        if (direction == "RIGHT") tempPoint.x += box;
        if (direction == "DOWN") tempPoint.y += box;

        return new Point(tempPoint.x / box, tempPoint.y / box);
    }

    include(point){
        //i =1 because the new head (_body[0] always equal to newHead...)
        for(var i =1; i<this._body.length; i++){
            if(this._body[i].equal(point)){
                return true;
            }
        }
        return false;
    }

    destructor(){
        for(var i=0; i<this._body.length; i++){
            this._body[i].destructor();
        }
    }
}

function loadPic(path) {
    var img = new Image();
    img.src = path;
    return img;
};


class Food {
    constructor(param) {
        this.position = new Point(Math.floor(Math.random() * 17 + 1), Math.floor(Math.random() * 15 + 3));
        this.score = param.score;
    }

    getPoint() {
        return this.position;
    }

    getScore() {
        return this.score;
    }
}

class Apple extends Food {
    constructor(param) {
        super(param);
    }

    static getPic() {
        return loadPic("img/food.png");
    }
}


class Bonus extends Food {
    constructor() {
        super(score);
    }

    static getPic() {
        return loadPic("img/food.png");
    }
}

export {Game, Snake, Point};