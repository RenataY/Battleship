// 1. Done - Create grid html with javascript
// 2. Done - Create ships structure
// 3. Logically place random ship on the board
// 4. Place ships function - validate its on the board, doesn't clash with other ships
// 5. Hit function
// 6. Miss function
// 7. Done - Create other graphic parts of the game  
// 8. Game over
// 9. Done-  New game

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
// function to create html for pictures of ships on the right side after game started
const gameShipsPanel = () => {
    for (let i=0; i<shipsArray.length; i++) {
        shipsAndRules.innerHTML +=  `<img src=${shipsArray[i].image} alt="${shipsArray[i].name} image" class="ships-rules__ships__${shipsArray[i].picClass}"></img>`
    }
    return shipsAndRules.innerHTML;
}

// function to replace a ship picture with hit ship picture
const replaceToHitShipPic = (ship) => {
    const shipPic = document.querySelector(".ships-rules__ships__" + ship );
    console.log (shipPic);
    shipPic.src = shipsArray[2].imageHit;
}

const prepareNewGame = () => {
    gameStarted = true;
    console.log (gameStarted);
    container.innerHTML="";
    container.style.backgroundImage = "url(./images/battleship-background3.jpg)"
    // add event listener for all buttons inside the function
    createBoard();
    shipsAndRules.innerHTML = "";
    shipsAndRules.innerHTML = 
                    `<div class="ships-rules__ships">
                        ${gameShipsPanel()}                        
                        <button type="button" class="ships-rules__new-game">New Game</button>
                    </div>`     
    
    const newGameButton = document.querySelector(".ships-rules__new-game");
    newGameButton.addEventListener ("click", (event) => {
        console.log("New Game button clicked")
        prepareNewGame();
    })
    // get one button and try to click
     const btn1 = document.getElementById("01");
     btn1.addEventListener ("click", (event) => {
         btn1.style.backgroundImage = "url(./images/explosion1.gif)";
         btn1.style.backgroundSize = "cover";
         replaceToHitShipPic ("cruiser");
     })

     // get another button and try to click
     const btn2 = document.getElementById("02");
     btn2.addEventListener ("click", (event) => {
         console.log("button 2 clicked");
         btn2.style.backgroundImage = "url(./images/explosion.gif)";
         btn2.style.backgroundSize = "cover";
     })

     // get another button and try to click
     const btn3 = document.getElementById("03");
     btn3.addEventListener ("click", (event) => {
         console.log("button 3 clicked");
         btn3.style.backgroundImage = "url(./images/water-splash.gif)";
         btn3.style.backgroundSize = "cover";
     })
             
}

// start the game, main function
playButton.addEventListener("click", (event) => {
    prepareNewGame();
})



