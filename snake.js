const cvs = document.getElementById("snake");
const ctx = cvs.getContext("2d");

//set the speed:
var speed = 100;
var timer = 0;
let gameTimer = setInterval(()=>{timer++},1000);

//create the unit:
const box = 32;

//load images:

const ground = new Image();
ground.src = "img/ground.png";

const foodImg = new Image();
foodImg.src = "img/food.png";

//load the audio files:

const dead = new Audio();
const eat = new Audio();
const up = new Audio();
const left = new Audio();
const right = new Audio();
const down = new Audio();

dead.src = "audio/dead.mp3";
eat.src = "audio/eat.mp3";
up.src = "audio/up.mp3";
left.src = "audio/left.mp3";
right.src = "audio/right.mp3";
down.src = "audio/down.mp3";

//create the snake:

let snake = [];
snake[0] ={
    x: 9 * box,
    y: 10 * box
};

//create the food:

let food = {
    x: Math.floor(Math.random()*17+1) * box,
    y: Math.floor(Math.random()*15+3) * box
};

//create the score:

let score = 0;

//control the snake:

let d;

document.addEventListener("keydown", direction);

function direction(event){
    if(event.keyCode == 37 && d != "RIGHT"){
        d = "LEFT";
        left.play();
    }else if(event.keyCode == 38 && d != "DOWN"){
        d = "UP";
        up.play();
    }else if(event.keyCode == 39 && d != "LEFT"){
        d = "RIGHT";
        right.play();
    }else if(event.keyCode == 40 && d != "UP"){
        d = "DOWN";
        down.play();
    }
}

//check collision function:
function collision(head,array){
    for(var i=0; i<array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false;
}


//draw everything to the canvas:

function draw(){
    ctx.drawImage(ground, 0, 0);

    for(var i =0; i< snake.length; i++){
        ctx.fillStyle = (i==0) ? "green" : "white";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);

        ctx.strokeStyle = "red";
        ctx.strokeRect(snake[i].x, snake[i].y, box, box);
    }

    ctx.drawImage(foodImg,food.x ,food.y);

    //old snake position:
    let snakeX = snake[0].x;
    let snakey = snake[0].y;



    //which direction
    if(d == "LEFT") snakeX -= box;
    if(d == "UP") snakey -= box;
    if(d == "RIGHT") snakeX += box;
    if(d == "DOWN") snakey += box;

    //if the snake eats the food:
    if(snakeX == food.x && snakey == food.y){
        clearTimeout(game);
        speed = speed -1;
        game = setInterval(draw, speed);

        eat.play();
        score ++;
        food = {
            x: Math.floor(Math.random()*17+1) * box,
            y: Math.floor(Math.random()*15+3) * box
        };
        //we will not remove the tail
    }else{
        //remove the tail:
        snake.pop();
    }

    //add new head:
    let newHead = {
        x: snakeX,
        y: snakey
    };

    //game over:

    if(snakeX < box || snakeX > 17 *box || snakey < 3*box || snakey > 17*box || collision(newHead,snake)){
        clearTimeout(game);
        clearTimeout(gameTimer);
        dead.play();
    }

    snake.unshift(newHead);

    ctx.fillStyle = "white";
    ctx.font = "48px Change one";
    ctx.fillText(score, 2*box, 1.6*box);
    ctx.fillText("Livnoni Snake", 4*box, 1.6*box);
    ctx.font = "20px Change one";
    ctx.fillText(`duration: ${timer} sec`, 14*box, 1.6*box);



};

let game = setInterval(draw, speed);