class BackgroundListener {
    constructor(sound, observer) {
        this.sound = sound;
        this.observer = observer;
        this.listen = true;

        this.keyboardListener();
        this.touchListener();
        this.pauseGameListener();
        this.viewScoresListener();
        this.downloadScoresAsCSV();
        this._downloadScoresAndShow();
        this.disableArrowKeys();
        this.showScoresListener();

        this.lastEventTime = new Date();
    }

    keyboardListener() {
        document.addEventListener("keydown", direction);

        var self = this;

        function direction(event) {

            console.log("event.keyCode=", event.keyCode)

            if ((event.keyCode == 37 || event.keyCode == 65) && snakeDirection != "RIGHT") {
                self.move("left");
            } else if ((event.keyCode == 38 || event.keyCode == 87) && snakeDirection != "DOWN") {
                self.move("up");
            } else if ((event.keyCode == 39 || event.keyCode == 68) && snakeDirection != "LEFT") {
                self.move("right");
            } else if ((event.keyCode == 40 || event.keyCode == 83) && snakeDirection != "UP") {
                self.move("down");
            } else if (event.keyCode == 80) {
                self._pauseGmae();
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
        var self = this;
        if (self.listen) {
            var currentEventTime = new Date();
            var timediff = currentEventTime - this.lastEventTime;
            if(timediff < config.gameSpeed){
                setTimeout(()=>{
                    _move();
                }, config.gameSpeed - timediff)
            }else{
                _move();
            }
        }

        function _move(){
            snakeDirection = direction.toUpperCase();
            self.observer.notify(new Event(`direction -> ${snakeDirection}`,0));
            self.toString();
            self.sound.play(direction.toLowerCase());
            self.lastEventTime = currentEventTime;
        }
    }

    pauseGameListener() {
        var self = this;
        document.getElementById("pauseBtn").addEventListener("click", function () {
            this._pauseGmae();
        });
    }

    downloadScoresAsCSV() {
        document.getElementById("downloadScores").addEventListener("click", function () {
            $("#score-table").tabulator("download", "csv", "data.csv"); //download table data as a CSV formatted file with a file name of data.csv
        });
    }

    _pauseGmae(){
        var status = document.getElementById("pauseBtn").innerHTML;
        if (status == "pause") {
            Game.pause(self);
            this.observer.notify(new Event(`pause button -> pause`,0));
            document.getElementById("pauseBtn").innerHTML = "continue";
        } else {
            Game.resume(self);
            this.observer.notify(new Event(`pause button -> continue`,0));
            document.getElementById("pauseBtn").innerHTML = "pause";
        }
    }

    viewScoresListener() {
        var self = this;
        document.getElementById("viewScores").addEventListener("click", function () {
            self.observer.notify(new Event(`viewScores`,0));
            document.getElementById("loader").style.display = "block";
            self._downloadScoresAndShow();
        });
    }

    _downloadScoresAndShow(){
        this._httpGetAsync(`${config.nodeServerAddress}/scores`, (data)=>{
            console.log("got:",data);
            data = JSON.parse(data);
            for(var i=0; i<data.length; i++){
                data[i].mark = data[i].score/100;
                data[i].id = i+1;
            }
            document.getElementById("downloadScores").disabled = false;
            //load sample data into the table
            $("#score-table").tabulator("setData", data.slice(0,config.numOfFirstTopScores));
            scores = data;
            document.getElementById("totalGames").innerText = `${scores.length} Total games so far !`;
            document.getElementById("showAllScores").style.display = "block";
            document.getElementById("loader").style.display = "none";
        })
    }

    showScoresListener(){
        var self = this;
        document.getElementById("showAllScores").addEventListener("click", function () {
            var showAllScoresButton = document.getElementById("showAllScores");
            if(showAllScoresButton.innerHTML == "Show all Scores"){
                self._showAllScores();
                showAllScoresButton.innerHTML = "Minimize Score"
            }else{
                self._minimizeScores();
                showAllScoresButton.innerHTML = "Show all Scores"
            }
        });
    }

    _showAllScores(){
        $("#score-table").tabulator("setData", scores);
    }
    _minimizeScores(){
        $("#score-table").tabulator("setData", scores.slice(0,config.numOfFirstTopScores));
    }

    _httpGetAsync(theUrl, callback) {
        var xmlHttp = new XMLHttpRequest();
        xmlHttp.onreadystatechange = function() {
            if (xmlHttp.readyState == 4 && xmlHttp.status == 200)
                callback(xmlHttp.responseText);
        };
        xmlHttp.open("GET", theUrl, true); // true for asynchronous
        xmlHttp.send(null);
    }

    disableArrowKeys(){
        window.addEventListener("keydown", function(e) {
            // space and arrow keys
            if([32, 37, 38, 39, 40].indexOf(e.keyCode) > -1) {
                e.preventDefault();
            }
        }, false);
    }

    toString() {
        console.log(`direction changed to -> ${snakeDirection}`);
    }
}

