class Point {
    constructor(x, y) {
        this._x = x * config.box;
        this._y = y * config.box;
        // console.log(`created new Point[${this._x / config.box},${this._y / config.box}]`);
    }

    get x(){
        return this._x;
    }

    get y(){
        return this._y;
    }

    equal(point) {
        if (this.x == point.x && this.y == point.y) {
            return true;
        }
        return false;
    }

    destructor() {
        // console.log(`delete Point[${this.x / config.box},${this.y / config.box}]`);
        delete this.x;
        delete this.y;
    }

}