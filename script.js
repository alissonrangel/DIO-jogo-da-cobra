let canvas = document.getElementById('snake');
let greenscoreh2 = document.getElementById('greenscore');
let orangescoreh2 = document.getElementById('orangescore');

let instructionsh4 = document.getElementById('instructions');

let context = canvas.getContext("2d");
let box = 32;
let snake1 = [];
let snake2 = [];
let greenscore = 0;
let orangescore = 0;

const MAX_SCORE = 10;

instructionsh4.innerHTML = `Vence quem comer ${MAX_SCORE} e não se morder`;

snake1[0] = {
    x: 8 * box,
    y: 8 * box
}

snake2[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction1 = "right1";
let direction2 = "left2";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

/*
function criarBG0() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}
*/

function criarBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function criarCobrinha1() {
    for (let i = 0; i < snake1.length; i++) {        
        context.fillStyle = 'green';
        context.fillRect(snake1[i].x, snake1[i].y, box, box);
    }
}

function criarCobrinha2() {
    for (let i = 0; i < snake2.length; i++) {        
        context.fillStyle = 'orange';
        context.fillRect(snake2[i].x, snake2[i].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = 'red';
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update1);
document.addEventListener('keydown', update2);

function update1(event) {
    if( event.keyCode == 37 && direction1 != 'right1' ) direction1 = 'left1';
    if( event.keyCode == 38 && direction1 != 'down1' ) direction1 = 'up1';
    if( event.keyCode == 39 && direction1 != 'left1' ) direction1 = 'right1';
    if( event.keyCode == 40 && direction1 != 'up1' ) direction1 = 'down1'; 
}

function update2(event) {
    if( event.keyCode == 65 && direction2 != 'right2' ) direction2 = 'left2';
    if( event.keyCode == 87 && direction2 != 'down2' ) direction2 = 'up2';
    if( event.keyCode == 68 && direction2 != 'left2' ) direction2 = 'right2';
    if( event.keyCode == 83 && direction2 != 'up2' ) direction2 = 'down2'; 
}

function restart() {
    document.location.reload(true);
}

function iniciarJogo() {
    if( snake1[0].x > 15 * box && direction1 == 'right1') snake1[0].x = 0;
    if( snake1[0].x < 0 && direction1 == 'left1') snake1[0].x = 16 * box;
    if( snake1[0].y > 15 * box && direction1 == 'down1') snake1[0].y = 0;
    if( snake1[0].y < 0 && direction1 == 'up1') snake1[0].y = 16 * box;

    if( snake2[0].x > 15 * box && direction2 == 'right2') snake2[0].x = 0;
    if( snake2[0].x < 0 && direction2 == 'left2') snake2[0].x = 16 * box;
    if( snake2[0].y > 15 * box && direction2 == 'down2') snake2[0].y = 0;
    if( snake2[0].y < 0 && direction2 == 'up2') snake2[0].y = 16 * box;
    
    for (let i = 1; i < snake1.length; i++) {
        if ( snake1[0].x == snake1[i].x && snake1[0].y == snake1[i].y){
            clearInterval(jogo);
            alert('The orange snake won!!!');
        }        
    }

    for (let i = 1; i < snake2.length; i++) {
        if ( snake2[0].x == snake2[i].x && snake2[0].y == snake2[i].y){
            clearInterval(jogo);
            alert('The green snake won!!!');   
        }        
    }

    criarBG();
    criarCobrinha1();
    criarCobrinha2();
    drawFood();
    
    let snake1X = snake1[0].x;
    let snake1Y = snake1[0].y;

    if ( direction1 == 'right1') snake1X += box;
    if ( direction1 == 'left1') snake1X -= box;
    if ( direction1 == 'up1') snake1Y -= box;
    if ( direction1 == 'down1') snake1Y += box;

    let snake2X = snake2[0].x;
    let snake2Y = snake2[0].y;

    if ( direction2 == 'right2') snake2X += box;
    if ( direction2 == 'left2') snake2X -= box;
    if ( direction2 == 'up2') snake2Y -= box;
    if ( direction2 == 'down2') snake2Y += box;

    if(snake1X != food.x || snake1Y != food.y){
        snake1.pop();
    } else {
        greenscore++;
        greenscoreh2.innerHTML = greenscore;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    if(snake2X != food.x || snake2Y != food.y){
        snake2.pop();
    } else {
        orangescore++;
        orangescoreh2.innerHTML = orangescore;
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
    }

    
    let newHead1 = {
        x: snake1X,
        y: snake1Y
    }

    let newHead2 = {
        x: snake2X,
        y: snake2Y
    }

    snake1.unshift(newHead1);
    snake2.unshift(newHead2);

    if (orangescore == MAX_SCORE){            
        clearInterval(jogo);
        alert('The orange snake won!!!');   
    }
    if (greenscore == MAX_SCORE){
        clearInterval(jogo);
        alert('The green snake won!!!');   
    }
}

let jogo = setInterval(iniciarJogo, 100);

