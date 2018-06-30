/**
 * Single-tone Class
 */
class Game {
    constructor(soundPath, snake) {
        if (!Game._singleton) {
            console.log(`create new Game`);
            this.sound = new Sound(soundPath);
            this.snake = snake;
            this.background = new Background(config.groundPath);
            new BackgroundListener(this.sound);
            this.foodFactory = new FoodFactory();
            this.score = 0;
            this.manageFood = new Game.ManageFood();
            this.gameOver = false;
            Game._singleton = this;
        } else {
            console.log(`already exist Game!`);
            Game._singleton.snake = snake;
            Game._singleton.score = 0;
            Game._singleton.manageFood = new Game.ManageFood();
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


        // console.log("snake body=", this.snake._body);


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
        } else {
            this.snake.pop();
        }

        this.snake.grow(newPosition);

        this._isFinish();


    }

    async startGame() {
        this.gameOver = false;
        this.apple = this.foodFactory.createFood("apple", {score: config.appleScore});
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
Game.ManageFood = class {
    constructor() {
        this._foods = [];
        this.foodFactory = new FoodFactory();
        this.counter = 0;
        this.addFood();
        this.addBonus();
    }

    addBonus(timeout, sound) {
        setTimeout(() => {
            var bonus = true;
            console.log("this.counter=", this.counter)
            for (var i = 0; i < this._foods.length; i++) {
                if (this._foods instanceof Bonus) {
                    bonus = false;
                }
            }
            if (bonus && this.counter > (config.startGetBonusRandomAfterEatNumOfFood || 1)) {
                this._foods.push(this.foodFactory.createFood(config.bonus.name, {score: config.bonus.score}));
                sound.play("bonus");
            }
        }, timeout)
    }

    addFood(sound) {
        var newFood;
        if (this.counter % 2 == 0) {
            newFood = config.foods[0]; //the first one is an apple...
        } else {
            newFood = config.foods[Math.floor(Math.random() * Math.floor(config.foods.length))];
        }
        this._foods.push(this.foodFactory.createFood(newFood.name, {score: newFood.score}));
        this.counter++;

        var rand = (Math.floor(Math.random() * Math.floor(config.maxIntervalGetBonus || 10)) + 1) * 1000;

        if(this.counter % (config.getBonusAfterEveryNumOfFood | 3) == 0) this.addBonus(rand, sound)
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
        // console.log("gotScore=",score);
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


};
Game.ManageFood.cvs = document.getElementById("snake");
Game.ManageFood.ctx = Game.ManageFood.cvs.getContext("2d");
