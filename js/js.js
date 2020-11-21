const game = document.querySelector("canvas");
const ctx = game.getContext("2d");
const BOX = 32;
let h2 = document.querySelector("h2");
let score = 0;
let dir;
let b = true;
let food = {
    x: Math.floor((Math.random() * 18 + 1)) * BOX,
    y: Math.floor((Math.random() * 18 + 1)) * BOX,
};
let snake = [];
snake[0] = {
    x: 9*BOX,
    y: 9*BOX,
};

function drawBackground() {
    for (let i = 0; i < 19; i++)
        for (let j = 0; j < 19; j++) {
            ctx.beginPath();
            // ctx.lineWidth = "4";
            ctx.strokeStyle = "gray";
            ctx.rect(i * BOX, j * BOX, BOX+1, BOX+1);
            ctx.stroke();
        }
}

document.addEventListener("keydown",direction);
function direction(event) {
    if(event.keyCode === 37 && dir !=="right") dir = "left"
    else if(event.keyCode === 38 && dir !=="down") dir = "up"
    else if(event.keyCode === 39 && dir !=="left") dir = "right"
    else if(event.keyCode === 40 && dir !=="up") dir = "down"
}

function eatTail(head, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (head.x === arr[i].x && head.y === arr[i].y)
            clearInterval(timer);
    }
}
// ctx.fillStyle = "red";
// ctx.fillRect(food.x,food.y,BOX,BOX);
function drawGame(){

    ctx.clearRect(0,0,608,608);
    ctx.fillStyle = "red";
    ctx.fillRect(food.x,food.y,BOX,BOX);
    drawBackground();
    for (let i = 0; i < snake.length; i++){
        ctx.fillStyle = "green";
        ctx.fillRect(snake[i].x,snake[i].y,BOX,BOX);
    }
    let  snakeX = snake[0].x;
    let  snakeY = snake[0].y;


    if(snakeX === food.x && snakeY === food.y) {
        score++;
        do {
            b = true;
            food = {
                x: Math.floor((Math.random() * 18 + 1)) * BOX,
                y: Math.floor((Math.random() * 18 + 1)) * BOX,
            };
            for (let i = 0; i < snake.length; i++) {
                if (food.x === snake[i].x && food.y === snake[i].y){
                    b = false;
                    break;
                }
            }
        }while (!b);
        b = false;
        ctx.fillStyle = "red";
        ctx.fillRect(food.x,food.y,BOX,BOX);
    } else
        snake.pop();


    if(snakeX < BOX - BOX|| snakeX > BOX * 18 + 1 || snakeY < BOX - BOX || snakeY > BOX * 18 + 1)
        clearInterval(timer);

    if(dir === "left") snakeX -= BOX;
    else if(dir === "right") snakeX += BOX;
    else if(dir === "up") snakeY -= BOX;
    else if(dir === "down") snakeY += BOX;

    let newHead ={
        x: snakeX,
        y: snakeY,
    };
    eatTail(newHead, snake);

    snake.unshift(newHead);
    h2.textContent = ""+score;
}

let timer  = setInterval(drawGame,100);

function log_pos() {
    console.log(snake);
}