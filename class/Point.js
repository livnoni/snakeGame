class Point {
    constructor(x, y) {
        this.x = x * config.box;
        this.y = y * config.box;
        console.log(`created new Point[${this.x / config.box},${this.y / config.box}]`);
    }

    getX() {
        return this.x;
    }

    getY() {
        return this.y;
    }

    setX(x) {
        this.x = x * config.box;
    }

    setY(y) {
        this.y = y * config.box;
    }

    equal(point) {
        if (this.x == point.x && this.y == point.y) {
            return true;
        }
        return false;
    }

    destructor() {
        console.log(`delete Point[${this.x / config.box},${this.y / config.box}]`);
        delete this.x;
        delete this.y;
    }

}