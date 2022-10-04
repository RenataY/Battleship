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
                                            
                        <button type="button" class="ships-rules__new-game">New Game</button>
                        ${gameShipsPanel()}   
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

const directions = ["up", "down", "right", "left"];

const generateShipLocation = (ship_lenght) => {
   const shipLocation = []; 
   const x = [];
   const y = [];
   x[0] = Math.floor(Math.random() * 10 + 1);
   y[0] = Math.floor(Math.random() * 10 + 1);
   shipLocation.push([x[0],y[0]]);
   //console.log("start x: " + x[0]);
   //console.log("start y: " + y[0]);
   const direction = Math.floor(Math.random() * directions.length) ;
   //const direction = 3 ;
   //console.log("direction: " + direction);
   for (let i = 1; i<ship_lenght; i++) {
    switch (direction) {
        case 0:
            //console.log("up");            
            x[i] = x[i-1];
            //console.log("next x :" + x[i]);
            y[i] = y[i-1] - 1;
            
            //console.log("next y :" + y[i]);             
            break;
        case 1:
            //console.log("down");
            x[i] = x[i-1];
            //console.log("next x :" + x[i]);
            y[i] = y[i-1] + 1;
            //console.log("next y :" + y[i]);  
            break;   
        case 2:
            //console.log("right");
            x[i] = x[i-1] + 1;
            //console.log("next x :" + x[i]);
            y[i] = y[i-1];
            //console.log("next y :" + y[i]); 
            break;
        case 3:
            //console.log("left");
            x[i] = x[i-1] - 1;
            //console.log("next x :" + x[i]);
            y[i] = y[i-1];
            //console.log("next y :" + y[i]);   
            break;
    }  // switch end
    shipLocation.push([x[i],y[i]]);
    } //loop end
    //console.log("ship's x coordinate: " + x);
    //console.log("ship's y coordinate: " + y);
    return (shipLocation);     
   } // function end


const validateShipWithinBoard = (shipLocation) => {
    let withinBoard = true;
    
    for (let i=0; i<shipLocation.length; i++) {
        //console.log(shipLocation[i]);
        for (let j=0; j<shipLocation[i].length; j++) {
            //console.log(shipLocation[i][j]);
            if ( shipLocation[i][j] > 10 || shipLocation[i][j] < 1) {
                withinBoard = false;
            }
        }
    }   
    console.log(withinBoard);
    return (withinBoard);
}

// function to validate if two ships colide
const validateShipsDoNotColide = (shipLocation1ArrayOfStrings,shipLocation2ArrayOfString) => {
    let isCollision = "Ships do not collide";
        for (let i=0; i<shipLocation1ArrayOfStrings.length; i++) {
            for (let j=0; j<shipLocation2ArrayOfString.length; j++) {
                if (shipLocation1ArrayOfStrings[i] === shipLocation2ArrayOfString[j]) {
                    isCollision = "Ships collide";
                    console.log(shipLocation1ArrayOfStrings[i] + " " + shipLocation2ArrayOfString[j])
                
                }
            }
        }
    return isCollision;
}

// generate ships location


let location = generateShipLocation (6);
let isWithinBoardShip1 = validateShipWithinBoard (location);
console.log("isWithinBoardShip1 " + isWithinBoardShip1)
// validate ship within board
let counter1 = 0;
while (isWithinBoardShip1 == false && counter1 < 10) {
    console.log ("regenerating ship1 location attempt # " + counter1) ;
    counter1++;
    if (counter1 === 9) {
         console.log("couldn't generate valid location for ship 1 within 10 attempts");
         break;
     }
    
    location = generateShipLocation(6);
    isWithinBoardShip1 = validateShipWithinBoard (location);
}
console.table(location);

let location2 = generateShipLocation (5);
let isWithinBoardShip2 = validateShipWithinBoard (location2);
console.log("isWithinBoardShip2 " + isWithinBoardShip2);
let counter2 = 0;
while (isWithinBoardShip2 === false && counter2 < 10 ) {
    console.log ("regenerating ship2 location attempt # " + counter2) ;
    counter2++;
     if (counter2 == 9) {
         console.log("couldn't generate valid location for ship 2 within 10 attempts");
         break;
     }    
    location2 = generateShipLocation(5);
    isWithinBoardShip2 = validateShipWithinBoard (location2);

}
console.table(location2);
//console.log(validateShipsDoNotColide (["21","22","23"], ["13","23","33"]));
// create an array of strings as a ship location
const shipStringLocation = (location) => {
    let locationString = [];
    for (let i=0; i<location.length; i++) {
        locationString[i] = location[i].join("");
    }
    return locationString;
}
let ship1StringLocation = shipStringLocation(location);
let ship2StringLocation = shipStringLocation(location2);
console.log(validateShipsDoNotColide (ship1StringLocation, ship2StringLocation));
let collide = validateShipsDoNotColide (ship1StringLocation, ship2StringLocation);
let counter3 = 0;
// while ships collide regenerate last created ship location in less than 10 attempts
while (collide === "Ships collide" && counter3 <10 ) {
    console.log ("regenerating ship2 location due to collision attempt # " + counter3) ;
    counter3++;
    if (counter3 == 9) {
        console.log("couldn't generate valid location for ship 2 due to collision within 10 attempts");
        break;
    }    
    location2 = generateShipLocation(5);
    ship2StringLocation = shipStringLocation(location2);
    collide = validateShipsDoNotColide (ship1StringLocation, ship2StringLocation);
}








