// 1. Create grid html with javascript
// 2. Create ships structure
// 3. Logically place random ship on the board
// 4. Place ships function - validate its on the board, doesn't clash with other ships
// 5. Hit function
// 6. Miss function
// 7. Create other graphic parts of the game  
// 8. Game over
// 9. New game

import shipsArray from "./battleships.js";
console.log (shipsArray);

// get game board container
const container = document.querySelector(".game-board");

// create one cell
const createBoardCell = (id) => {
    return `<button type="button" id=${id} class="game-board__button"></button>`
} 

// create 10 x 10 board

const createBoard = () => {
    for (let i=0; i<10; i++) {
        for (let j=0; j<10; j++) {
            container.innerHTML += createBoardCell(`${i}${j}`)
        }
    }
}

//createBoard();

// get one button and try to click, concerned as it is transparent
const btn1 = document.getElementById("01");
console.log(btn1);
btn1.addEventListener ("click", (event) => {
    console.log("button 1 clicked");
    btn1.style.backgroundImage = "url(./images/explosion1.gif)";
    btn1.style.backgroundSize = "cover";
})

// get another button and try to click, concerned as it is transparent
const btn2 = document.getElementById("02");
console.log(btn2);
btn2.addEventListener ("click", (event) => {
    console.log("button 2 clicked");
    btn2.style.backgroundImage = "url(./images/explosion.gif)";
    btn2.style.backgroundSize = "cover";
})

// get another button and try to click, concerned as it is transparent
const btn3 = document.getElementById("03");
console.log(btn3);
btn3.addEventListener ("click", (event) => {
    console.log("button 3 clicked");
    btn3.style.backgroundImage = "url(./images/water-splash.gif)";
    btn3.style.backgroundSize = "cover";
})