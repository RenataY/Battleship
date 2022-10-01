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
let gameStarted = false;

// get game board container
const container = document.querySelector(".game-board");

// get play button
const playButton = document.querySelector(".game-board__playbutton");

// get ships and rules section
const shipsAndRules = document.querySelector(".ships-rules");

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

playButton.addEventListener("click", (event) => {
    gameStarted = true;
    console.log (gameStarted);
    container.innerHTML="";
    container.style.backgroundImage = "url(./images/battleship-background3.jpg)"
    // add event listener for all buttons inside the function
    createBoard();
    shipsAndRules.innerHTML = "";
    // create array of objects for pictures and classes and refactor below to function
    shipsAndRules.innerHTML = 
                    `<div class="ships-rules__ships">
                        <img src="./images/aircraft-carrier.png" alt="aircraft carrier image" class="ships-rules__ships__aircraft">
                        <img src="./images/battleship.png" alt="battleship image" class="ships-rules__ships__battleship">
                        <img src="./images/cruiser.png" alt="cruiser image" class="ships-rules__ships__cruiser">
                        <img src="./images/submarine1.png" alt="submarine image" class="ships-rules__ships__submarine1">
                        <img src="./images/submarine2.png" alt="submarine image" class="ships-rules__ships__submarine2">
                        <img src="./images/patrol-boat1.png" alt="patrolboat 1 image" class="ships-rules__ships__patrol1"> 
                        <img src="./images/patrol-boat2.png" alt="patrolboat 2 image" class="ships-rules__ships__patrol2"> 
                        <button type="button" class="ships-rules__new-game">New Game</button>
                    </div>`
     // get one button and try to click, concerned as it is transparent
     const btn1 = document.getElementById("01");
     btn1.addEventListener ("click", (event) => {
         btn1.style.backgroundImage = "url(./images/explosion1.gif)";
         btn1.style.backgroundSize = "cover";
     })

     // get another button and try to click, concerned as it is transparent
     const btn2 = document.getElementById("02");
     btn2.addEventListener ("click", (event) => {
         console.log("button 2 clicked");
         btn2.style.backgroundImage = "url(./images/explosion.gif)";
         btn2.style.backgroundSize = "cover";
     })

     // get another button and try to click, concerned as it is transparent
     const btn3 = document.getElementById("03");
     btn3.addEventListener ("click", (event) => {
         console.log("button 3 clicked");
         btn3.style.backgroundImage = "url(./images/water-splash.gif)";
         btn3.style.backgroundSize = "cover";
     })
             
})

