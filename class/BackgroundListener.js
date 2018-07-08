class BackgroundListener {
    constructor(sound) {
        this.sound = sound;

        this.keyboardListener();
        this.touchListener();

    }

    keyboardListener() {
        document.addEventListener("keydown", direction);

        var self = this;

        function direction(event) {

            if ((event.keyCode == 37 || event.keyCode == 65) && snakeDirection != "RIGHT") {
                self.move("left");
            } else if ((event.keyCode == 38 || event.keyCode == 87) && snakeDirection != "DOWN") {
                self.move("up");
            } else if ((event.keyCode == 39 || event.keyCode == 68) && snakeDirection != "LEFT") {
                self.move("right");
            } else if ((event.keyCode == 40 || event.keyCode == 83) && snakeDirection != "UP") {
                self.move("down");
            }
        }
    }

    touchListener() {
        //this for mobiles:
        document.addEventListener('touchstart', handleTouchStart, false);
        document.addEventListener('touchmove', handleTouchMove, false);

        var self = this;

        var xDown = null;
        var yDown = null;

        function handleTouchStart(evt) {
            xDown = evt.touches[0].clientX;
            yDown = evt.touches[0].clientY;
        };

        function handleTouchMove(evt) {
            if (!xDown || !yDown) {
                return;
            }

            var xUp = evt.touches[0].clientX;
            var yUp = evt.touches[0].clientY;

            var xDiff = xDown - xUp;
            var yDiff = yDown - yUp;

            if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
                if (xDiff > 0) {
                    /* left swipe */
                    self.move("left");
                } else {
                    /* right swipe */
                    self.move("right");
                }
            } else {
                if (yDiff > 0) {
                    /* up swipe */
                    self.move("up");
                } else {
                    /* down swipe */
                    self.move("down");
                }
            }
            /* reset values */
            xDown = null;
            yDown = null;
        }
    }

    move(direction) {
        snakeDirection = direction.toUpperCase();
        this.toString();
        this.sound.play(direction.toLowerCase());
    }

    toString() {
        console.log(`direction changed to -> ${snakeDirection}`);
    }
}

