class Food {
    constructor(param) {
        this.position = this.createRandonPoint(param.snakeBody);
        this.score = param.score;
    }

    getPoint() {
        return this.position;
    }

    getScore() {
        return this.score;
    }

    createRandonPoint(snakeBody){
        var randomX = Math.floor(Math.random() * 17 + 1);
        var randomY = Math.floor(Math.random() * 15 + 3);

        var randomPoint = new Point(randomX, randomY);

        ///check that the new random point does't inside the snake body, if yes, recall to createRandonPoint
        var include = false;
        for(var i =0; i<snakeBody.length; i++){
            if(snakeBody[i].equal(randomPoint)){
                include = true;
                break;
            }
        }
        return (!include) ? randomPoint : this.createRandonPoint(snakeBody);
    }

    loadPic(path) {
        var img = new Image();
        img.src = path;
        return img;
    };

}

/**
 * Strategy Patern
 * I use this pattern To determine for each object (food) whether it has a timeout or that it exists until it is eaten.
   In this way I can add or change objects without writing the timeout to each one and saving 'double coding'
 */

class Strategy{
    constructor(){

    }
    hasTimeOut(){

    }
}

class HasTimeOut extends Strategy{
    constructor(bonus){
        super();
        if (bonus) this.bonus = bonus;
        this.decreaseScore();
    }
    hasTimeOut(){
        return true;
    }
    //todo: to add more logic for that case...
    decreaseScore(){
        setInterval(()=>{
            if (this.bonus.score >= 0) this.bonus.score = this.bonus.score - 1;
        },50);
    }
}

class DoesntHasTimeOut extends Strategy{
    constructor(){
        super();
    }
    hasTimeOut(){
        return false;
    }

}

class Apple extends Food {
    constructor(param) {
        super(param);
        this.strategy = new DoesntHasTimeOut();
    }

    getPic() {
        return this.loadPic("img/apple.png");
    }
}

class Banana extends Food {
    constructor(param) {
        super(param);
        this.strategy = new DoesntHasTimeOut();
    }

    getPic() {
        return this.loadPic("img/banana.png");
    }
}

class Watermelon extends Food {
    constructor(param) {
        super(param);
        this.strategy = new DoesntHasTimeOut();
    }

    getPic() {
        return this.loadPic("img/watermelon.png");
    }
}


class Bonus extends Food {
    constructor(param) {
        super(param);
        // console.log("bonus,this.score=",this.score)
        this.strategy = new HasTimeOut(this);
    }

    getPic() {
        return this.loadPic("img/bonus.png");
    }
}

/**
 * Factory pattern
 */
class FoodFactory{
    createFood(type,props){
        switch(type){
            case "apple":{
                return new Apple(props);
            }
            case "banana":{
                return new Banana(props);
            }
            case "watermelon":{
                return new Watermelon(props);
            }
            case "bonus":{
                return new Bonus(props);
            }
        }
    }
}