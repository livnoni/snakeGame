/**
 * Single-tone Class
 */
class Game {
    constructor(soundPath, snake) {
        if(! Game._singleton){
            console.log(`create new Game`);
            this.sound = new Sound(soundPath);
            this.snake = snake;
            this.background = new Background(config.groundPath);
            new BackgroundListener(this.sound);
            this.foodFactory = new FoodFactory();
            this.score = 0;
            this.gameOver = false;
            Game._singleton = this;
        }else{
            console.log(`already exist Game!`);
            Game._singleton.snake = snake;
            Game._singleton.score = 0;
            return Game._singleton;
        }

    }

    draw() {
        const cvs = document.getElementById("snake");
        const ctx = cvs.getContext("2d");
        ctx.drawImage(this.background.pic, 0, 0);

        ctx.fillStyle = "white";
        ctx.font = "48px Change one";
        ctx.fillText(this.score, 2 * config.box, 1.6 * config.box);
        ctx.fillText("Livnoni Snake", 5 * config.box, 1.6 * config.box);


        console.log("snake body=", this.snake._body);


        for (var i = 0; i < this.snake.getLength(); i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(this.snake._body[i].x, this.snake._body[i].y, config.box, config.box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snake._body[i].x, this.snake._body[i].y, config.box, config.box);
        }

        ctx.drawImage(Apple.getPic(), this.apple.getPoint().getX(), this.apple.getPoint().getY());

        var newPosition = this.snake.move(snakeDirection);

        //check if snake eat the apple:
        if (this.snake.getHeadPosition().equal(this.apple.getPoint())) {
            this.sound.play("eat");
            this.score += this.apple.getScore();
            this.apple = this.foodFactory.createFood("apple",{score:config.appleScore});
        } else {
            this.snake.pop();
        }

        this.snake.grow(newPosition);

        this._isFinish();


    }

    async startGame() {
        this.gameOver = false;
        this.apple = this.foodFactory.createFood("apple",{score:config.appleScore});
        while (!this.gameOver) {
            await timeout(config.gameSpeed);
            this.draw()
        }

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

    }

    _isFinish() {
        if (this.snake.getHeadX() < config.box || this.snake.getHeadX() > 17 * config.box || this.snake.getHeadY() < 3 * config.box || this.snake.getHeadY() > 17 * config.box || this._collision(this.snake.getHeadPosition())) {
            console.log("game over!");
            snakeDirection = null;
            this.gameOver = true;
            this.sound.play("dead");
            // this.snake.destructor();
            setTimeout(() => {
                onGameOver();
            }, 100)
        }
    }

    _collision(newHead) {
        return this.snake.include(newHead);
    }

}
Game._singleton = null;