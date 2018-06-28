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

    ContextInterface (){
        this.strategy.AlgorithmInterface()
    }

    loadPic(path) {
        var img = new Image();
        img.src = path;
        return img;
    };

}

/**
 * Strategy Patern
 * I use thi pattern To determine for each object (food) whether it has a timeout or that it exists until it is eaten.
   In this way I can add or change objects without writing the timeout to each one and saving 'double coding'
 */

class Strategy{
    constructor(){

    }
    hasTimeOut(){

    }
}

class HasTimeOut extends Strategy{
    constructor(){
        super();
    }
    hasTimeOut(){
        return true;
    }
    //todo: to add more logic for that case...
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
        this.strategy = new HasTimeOut();
    }

    getPic() {
        return this.loadPic("img/apple.png");
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
                return new Apple(props);
            }
        }
    }
}