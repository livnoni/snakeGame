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