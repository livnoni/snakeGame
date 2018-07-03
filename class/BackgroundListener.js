class BackgroundListener {
    constructor(sound) {
        document.addEventListener("keydown", direction);
        var self = this;

        function direction(event) {

            window.alert("keydown="+event);



            if ((event.keyCode == 37 || event.keyCode == 65) && snakeDirection != "RIGHT") {
                snakeDirection = "LEFT";
                self.toString();
                sound.play("left");
            } else if ((event.keyCode == 38 || event.keyCode == 87) && snakeDirection != "DOWN") {
                snakeDirection = "UP";
                self.toString();
                sound.play("up");
            } else if ((event.keyCode == 39 || event.keyCode == 68) && snakeDirection != "LEFT") {
                snakeDirection = "RIGHT";
                self.toString();
                sound.play("right");
            } else if ((event.keyCode == 40 || event.keyCode == 83) && snakeDirection != "UP") {
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