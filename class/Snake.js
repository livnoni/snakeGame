class Snake {
    constructor() {
        this._body = [];
        this.initialSnake();
        console.log(`created new Snake class`);
        console.log("snake body=",this._body)
    }

    initialSnake() {
        this._body.push(new Point(9, 10));
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
        this._body[0].x = x * config.box;
    }

    setHeadY(y) {
        this._body[0].y = y * config.box;
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
        if (direction == "LEFT") tempPoint.x -= config.box;
        if (direction == "UP") tempPoint.y -= config.box;
        if (direction == "RIGHT") tempPoint.x += config.box;
        if (direction == "DOWN") tempPoint.y += config.box;

        return new Point(tempPoint.x / config.box, tempPoint.y / config.box);
    }

    include(point) {
        //i = 1 because the new head (_body[0] always equal to newHead...)
        for (var i = 1; i < this._body.length; i++) {
            if (this._body[i].equal(point)) {
                return true;
            }
        }
        return false;
    }

    pop() {
        var tempPoint = this._body.pop();
        tempPoint.destructor();
    }

    destructor() {
        for (var i = 0; i < this._body.length; i++) {
            this._body[i].destructor();
        }
    }
}