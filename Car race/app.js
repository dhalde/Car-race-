
const score = document.querySelector(".score");
const startScreen = document.querySelector(".startScreen");
const game_content = document.querySelector(".game_content");


console.log(score);

let keys = {
    ArrowUp: false,
    ArrowDown: false,
    ArrowRight: false,
    ArrowLeft: false
}

startScreen.addEventListener("click", start); // after clicking on screen startFunction should start
let player = { speed: 8, score: 0 };  // created an empty obj

document.addEventListener("keydown", keyDown); /*this is for knowing which button has pressed */
document.addEventListener("keyup", keyUp);

function keyDown(e) {
    e.preventDefault();
    keys[e.key] = true;  //created an obj keys when ever we Keydown val set to true 
    console.log(e.key);
    console.log(keys);
}
function keyUp(e) {
    e.preventDefault();
    keys[e.key] = false;  // KeyUp : val set to False 
    console.log(keys);

}

function isCollision(a, b) {
    aRect = a.getBoundingClientRect();
    bRect = b.getBoundingClientRect();

    return !((aRect.bottom < bRect.top) || (aRect.top > bRect.bottom) || (aRect.right < bRect.left) ||
        (aRect.left > bRect.right))
    // return ((aRect.top == bRect.bottom) || (aRect.bottom > bRect.top) || (aRect.right == bRect.left) ||
    //     (aRect.left == bRect.right)) 

}

function endGame() {
    player.start = false;
    startScreen.classList.remove('hide');  // By adding we are disableing the start Screen
    startScreen.innerHTML = "Game over <br> Your Score is :" + player.score + "<br> Press Here to Start Again!"
}

function moveLines() {
    let lines = document.querySelectorAll('.line');
    lines.forEach(function (items) {
        if (items.y > 825) {
            items.y -= 830;
        }
        items.y += player.speed;
        // console.log("my items " + items.y);
        items.style.top = items.y + "px";

    })
}
function moveEnemy(car) {
    let enemy = document.querySelectorAll('.enemy');
    enemy.forEach(function (items) {

        // car and enemyCar as parameter
        if (isCollision(car, items)) {
            console.log("car collided");
            endGame();
        }

        if (items.y > 800) {
            items.y = -300;
            items.style.left = Math.floor(Math.random() * 300) + "px";
        }
        items.y += player.speed;
        // console.log("my items " + items.y);
        items.style.top = items.y + "px";

    })
}

function gamePlay() {
    // console.log("iam played");

    let car = document.querySelector('.car');
    let road = game_content.getBoundingClientRect();
    // console.log(road);

    if (player.start) {

        moveLines();
        moveEnemy(car);  // giving car as a parameter

        //moving car 
        if (keys.ArrowUp && player.y > (road.top + 150)) { player.y -= player.speed }
        if (keys.ArrowDown && player.y < (road.bottom - 70)) { player.y += player.speed }
        if (keys.ArrowRight && player.x <= (road.width - 50)) { player.x += player.speed }
        if (keys.ArrowLeft && player.x > 0) { player.x -= player.speed }

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";

        player.score++;
        score.innerText = "Score :" + player.score;

        window.requestAnimationFrame(gamePlay);  //animation started very imp line to know more(google)


    }

}

function start() {
    // game_content.classList.remove('hide');  // By removing main game content should be visible
    score.classList.remove('hide');  // By removing main game content should be visible
    startScreen.classList.add('hide');  // By adding we are disableing the start Screen
    game_content.innerHTML = "";

    let car = document.createElement('div');  //Creating a car when the start fun run 
    car.classList.add("car");
    game_content.appendChild(car);

    for (var x = 0; x < 6; x++) {

        let roadLine = document.createElement('div');
        roadLine.classList.add("line");
        roadLine.y = (x * 165);
        roadLine.style.top = roadLine.y + "px";
        game_content.appendChild(roadLine);
    }


    player.start = true;   // giving val to player obj  when it is true the animation should start
    player.score = 0;

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    // console.log("top value is " + car.offsetTop);
    // console.log("bottom val is" + car.offsetLeft);

    for (var x = 0; x < 3; x++) {

        let enemyCar = document.createElement('div');
        enemyCar.classList.add("enemy");
        enemyCar.y = ((x + 1) * 400) * -1;
        enemyCar.style.top = enemyCar.y + "px";
        enemyCar.style.background = "blue";
        enemyCar.style.left = Math.floor(Math.random() * 400) + "px";
        game_content.appendChild(enemyCar);
    }
    window.requestAnimationFrame(gamePlay);
}

// we are giving color to our enemyCar using hexcode sys
// function randomColor() {
//     function c() {
//         let hex = Math.floor(Math.random() * 256).toString(16); // converting number to string
//         return ("0" + String(hex)) / substr(-2);   // we want only two substring and we are adding 0 incase there is only one num is given by random();
//     }
//     return "#" + c() + c() + c();
// }