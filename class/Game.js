/**
 * Single-tone Class
 */
class Game {
    constructor() {
        if (!Game._singleton) {
            console.log(`create new Game`);
            this.sound = new Sound(config.soundPath);
            this.snake = new Snake();
            this.background = new Background(config.groundPath);
            this.backgroundListener = new BackgroundListener(this.sound);
            this.foodFactory = new FoodFactory();
            this.score = 0;
            this.manageFood = new Game.ManageFood(this.snake);
            this.gameOver = false;
            this.pauseGame = false;
            this.relativeScore = null;
            Game._singleton = this;
        } else {
            console.log(`already exist Game!`);
            Game._singleton.snake = new Snake();
            Game._singleton.score = 0;
            Game._singleton.manageFood = new Game.ManageFood(Game._singleton.snake);
            Game._singleton.relativeScore = null;
            Game._singleton.gameOver = false;
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
        ctx.fillStyle = "white";
        ctx.font = "30px Change one";
        if(this.relativeScore) ctx.fillText(`Your rate is ${(this.relativeScore)}`, 6 * config.box, 18.8 * config.box);


        for (var i = 0; i < this.snake.getLength(); i++) {
            ctx.fillStyle = (i == 0) ? "green" : "white";
            ctx.fillRect(this.snake._body[i]._x, this.snake._body[i]._y, config.box, config.box);

            ctx.strokeStyle = "red";
            ctx.strokeRect(this.snake._body[i]._x, this.snake._body[i]._y, config.box, config.box);
        }

        this.manageFood.printFoods();

        var newPosition = this.snake.move(snakeDirection);

        var isEaten = this.manageFood.eat(this.snake, this.sound, this.score);
        if (isEaten.status) {
            this.score = isEaten.score;
            this.relativeScore = this._GetRelativeRateResults(this.score);
        } else {
            this.snake.pop();
        }

        this.snake.grow(newPosition);

        this._isFinish();


    }

    async startGame() {
        this.apple = this.foodFactory.createFood("apple", {
            score: config.appleScore,
            snakeBody: this.snake.getSnakeBody()
        });
        while (!this.gameOver) {
            if (this.pauseGame) {
                await timeout(config.gameSpeed);
            } else {
                await timeout(config.gameSpeed);
                this.draw();
            }
        }

        function timeout(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

    }

    _isFinish() {
        if (this.snake.getHeadX() < config.box || this.snake.getHeadX() > 17 * config.box || this.snake.getHeadY() < 3 * config.box || this.snake.getHeadY() > 17 * config.box || this._collision(this.snake.getHeadPosition())) {
            this.backgroundListener._downloadScoresAndShow();
            console.log("game over!");
            snakeDirection = null;
            this.gameOver = true;
            this.manageFood.onGameOver();
            this.sound.play("dead");
            setTimeout(() => {
                onGameOver({score: this.score});
            }, 100)
        }
    }

    _collision(newHead) {
        return this.snake.include(newHead);
    }

    _GetRelativeRateResults(score) {
        for (var i = 0; i < scores.length; i++) {
            if(score > scores[i].score){
                return scores[i].id;
            }
        }
        return scores.length;
    }
}

Game.pause = function (backgroundListener) {
    game.pauseGame = true;
    backgroundListener.listen = false;
};

Game.resume = function (backgroundListener) {
    game.pauseGame = false;
    backgroundListener.listen = true;
};

Game._singleton = null;
Game.ManageFood = class {
    constructor(snake) {
        this.snake = snake;
        this._foods = [];
        this.foodFactory = new FoodFactory();
        this.counter = 0;
        this.bonusTimeOut = [];
        this.addFood();
    }

    addBonus(timeout, sound) {
        this.bonusTimeOut.push(setTimeout(() => {
            var bonus = true;
            for (var i = 0; i < this._foods.length; i++) {
                if (this._foods[i] instanceof Bonus) {
                    bonus = false;
                }
            }

            if (bonus && this.counter > (config.startGetBonusRandomAfterEatNumOfFood || 1)) {
                this._foods.push(this.foodFactory.createFood(config.bonus.name, {
                    score: config.bonus.score,
                    snakeBody: this.snake.getSnakeBody()
                }));
                sound.play("bonus");
            }
        }, timeout));
    }

    addFood(sound) {
        var newFood;
        if (this.counter % 2 == 0) {
            newFood = config.foods[0]; //the first one is an apple...
        } else {
            newFood = config.foods[Math.floor(Math.random() * Math.floor(config.foods.length))];
        }
        this._foods.push(this.foodFactory.createFood(newFood.name, {
            score: newFood.score,
            snakeBody: this.snake.getSnakeBody()
        }));
        this.counter++;

        var rand = (Math.floor(Math.random() * Math.floor(config.maxIntervalGetBonus || 10)) + 1) * 1000;

        if (this.counter % (config.getBonusAfterEveryNumOfFood | 3) == 0) this.addBonus(rand, sound)
    }

    printFoods() {
        // console.log("this._food=",this._foods)
        for (var i = 0; i < this._foods.length; i++) {
            Game.ManageFood.ctx.drawImage(this._foods[i].getPic(), this._foods[i].getPoint().x, this._foods[i].getPoint().y);
            Game.ManageFood.ctx.fillStyle = "white";
            Game.ManageFood.ctx.font = "30px Change one";

            /**
             * Dynamically check what object class:
             */
            if (this._foods[i].constructor.name == "Bonus") {
                Game.ManageFood.ctx.fillText(` = ${this._foods[i].getScore()}`, 16 * config.box, 2.2 * config.box);
                Game.ManageFood.ctx.drawImage(this._foods[i].getPic(), 15 * config.box, 1.3 * config.box);
            } else {
                Game.ManageFood.ctx.fillText(` = ${this._foods[i].getScore()}`, 16 * config.box, 1.1 * config.box);
                Game.ManageFood.ctx.drawImage(this._foods[i].getPic(), 15 * config.box, 0.3 * config.box);
            }
        }
    }

    eat(snake, sound, score) {
        for (var i = 0; i < this._foods.length; i++) {
            if (this._foods[i].score <= 0) {
                this._foods.splice(i, 1);
                i--;
            }
        }


        for (var i = 0; i < this._foods.length; i++) {
            if (snake.getHeadPosition().equal(this._foods[i].getPoint())) {
                sound.play("eat");
                var tempfood = this._foods[i];
                this._foods.splice(i, 1);
                if (tempfood instanceof Bonus) {
                    return {status: true, score: score + tempfood.getScore()};
                } else {
                    this.addFood(sound);
                    return {status: true, score: score + tempfood.getScore()};
                }
            }
        }
        return {status: false};
    }

    onGameOver() {
        for (var i = 0; i < this.bonusTimeOut.length; i++) {
            clearTimeout(this.bonusTimeOut[i]);
        }
    }


};
Game.ManageFood.cvs = document.getElementById("snake");
Game.ManageFood.ctx = Game.ManageFood.cvs.getContext("2d");
