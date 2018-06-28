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

    static loadPic(path) {
        var img = new Image();
        img.src = path;
        return img;
    };

}

class Apple extends Food {
    constructor(param) {
        super(param);
    }

    static getPic() {
        return this.loadPic("img/food.png");
    }
}


class Bonus extends Food {
    constructor() {
        super(score);
    }

    static getPic() {
        return this.loadPic("img/food.png");
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
            case "bonus":{
                return new Apple(props);
            }
        }
    }
}