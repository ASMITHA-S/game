const gameBoard = document.getElementById('gameBoard');
const context = gameBoard.getContext('2d');

const W = gameBoard.width;
const H = gameBoard.height;
const UNIT = 25;

const appleImg = new Image();
appleImg.src = 'assets/images/APPLE.png';

const snakeHeadImg = new Image();
snakeHeadImg.src = 'assets/images/HEAD.png'; // Replace with the actual path to your snake head image

// const snakeTailImg = new Image();
// snakeTailImg.src = 'assets/images/tail1.png'; 
const startAgainButton = document.getElementById('startAgainButton');

const scoreNum=document.getElementById('scoreVal');
let foodX;
let foodY;
let score = 0;
let active=true;
let paused = false;
let gameStarted=false;

let snake=[
    {x:UNIT*2,y:0},
    {x:UNIT,y:0},
    {x:0,y:0}
    
];

let xVel=25;
let yVel=0;
let timeoutDuration = 240;

window.addEventListener('keydown',keyPress)

startGame();

function startGame(){
    context.fillStyle = 'black';
    //context.strokeStyle = 'white';
    //fillReact(xstart,ystart,width,height)
    context.fillRect(0,0,W,H);
    createFood();
    displayFood();
   
    // drawSnake();
    // moveSnake();
    // clearBoard();
     drawSnake();
    //sessionTimeout();
}


function clearBoard(){
    context.fillStyle = 'black';

    //fillReact(xstart,ystart,width,height)
    context.fillRect(0,0,W,H);

}

function createFood(){
    foodX = Math.floor(Math.random()*W/UNIT)*UNIT;
    foodY = Math.floor(Math.random()*H/UNIT)*UNIT;

}

appleImg.onload = () => {
    displayFood();
};

function displayFood(){
    // context.fillStyle = 'BLUE';
    // context.fillRect(foodX,foodY,UNIT,UNIT)
    context.drawImage(appleImg, foodX, foodY, UNIT, UNIT);


}


snakeHeadImg.onload = () => {
    drawSnake();
};

// function drawSnake(){
//     context.fillStyle = 'yellow';
//     context.strokeStyle = 'black';
//     snake.forEach((snakePart)=>{
//         context.fillRect(snakePart.x,snakePart.y,UNIT,UNIT)
//         context.strokeRect(snakePart.x,snakePart.y,UNIT,UNIT)
//     })


// }

function drawSnake() {
    // Draw the snake's body'
    const smallerUnit = UNIT / 1.25;
    context.fillStyle = 'green';
    context.strokeStyle = 'black';
    for (let i = 1; i < snake.length; i++) {
        context.fillRect(snake[i].x, snake[i].y, UNIT, UNIT);
        context.strokeRect(snake[i].x, snake[i].y, UNIT, UNIT);
    }
    context.drawImage(snakeHeadImg, snake[0].x, snake[0].y, UNIT, UNIT);
   
}





function moveSnake(){
    const head = {x:snake[0].x+xVel,
                    y:snake[0].y+yVel}
    
    snake.unshift(head)
    if(snake[0].x==foodX && snake[0].y==foodY){
        score += 50;
        scoreNum.textContent=score;
        createFood();
        // Adjust the timeout duration based on the  food eaten
         timeoutDuration = Math.max(50, timeoutDuration - 5); 

        
        

    }
    else{
        snake.pop();
}
}

function sessionTimeout(){
    if(active && !paused){
        setTimeout(()=> {
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameover();
        sessionTimeout();
    },timeoutDuration);}

    else if(!active){
        
        clearBoard();
        context.font="bold 75px arial";
        context.fillStyle="red";
        context.textAlign ="center";
        context.fillText("GAME OVER!!!",W/2,H/2);

        // Display the start again button
        startAgainButton.style.display = "block";
    }
}

function keyPress(event){
    //active=true;
    if(!gameStarted){
        gameStarted=true;
        sessionTimeout();
    }

    //pause when space is pressed
    if(event.keyCode===32){
        console.log('clicked')
        if(paused){
            paused = false;
            sessionTimeout();
        }
        else{
            paused = true;
        }
    }
    const L = 37        //keycode for arrow keys
    const UP = 38
    const R = 39
    const D= 40

    switch(true){
        case(event.keyCode==L && xVel!= UNIT):
        xVel=-UNIT;
        yVel=0;
        break;

        case(event.keyCode==R && xVel!= -UNIT):
        xVel=UNIT;
        yVel=0;
        break;

        case(event.keyCode==UP && yVel!= UNIT):
        xVel=0;
        yVel=-UNIT;
        break;

        case(event.keyCode==D && yVel!= -UNIT):
        xVel=0;
        yVel=UNIT;
        break;
    }
    
   

}

function checkGameover() {
    // Check if the snake's head collides with any part of the snake's tail
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x === snake[i].x && snake[0].y === snake[i].y) {
            active = false;
            break;
        }
    }

    // Check if the snake hits the boundaries
    if (snake[0].x < 0 || snake[0].x >= W || snake[0].y < 0 || snake[0].y >= H) {
        active = false;
    }

    // Display the start again button if the game is over
    // if (!active) {
    //     startAgainButton.style.display = 'block';
    // }
}


  


startAgainButton.addEventListener('click', startAgain);
startAgainButton.style.display = 'none'; // Hide the button initially

function startAgain() {
  active = true;
  paused = false;
  score = 0;
  scoreNum.textContent = score;
  snake = [
    { x: 2 * UNIT, y: 0 },
    { x: UNIT, y: 0 },
    { x: 0, y: 0 }
  ];
  xVel = UNIT;
  yVel = 0;
  timeoutDuration = 240;
  gameStarted = false;
  startGame();

  // Hide the start again button
  startAgainButton.style.display = 'none';
 
}


  

