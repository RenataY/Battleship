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
    //console.log(withinBoard);
    return (withinBoard);
}

// function to validate if one ship colides with other ships
const validateShipsDoNotCollide = (id,shipLocationArrayOfStrings) => {
    let isCollision = "Ships do not collide";
    let prevShipsLocations = [];
    for (let i =0; i<id-1; i++) {
        prevShipsLocations = prevShipsLocations.concat(shipsArray[i].locationString);
    }  
    for (let i=0; i<shipLocationArrayOfStrings.length; i++) {
        for (let j=0; j<prevShipsLocations.length; j++) {
            if (shipLocationArrayOfStrings[i] === prevShipsLocations[j]) {
                isCollision = "Ships collide";
                console.log(shipLocationArrayOfStrings[i] + " " + prevShipsLocations[j])
            
            }
        }
    }  
    //console.log(prevShipsLocations);
    return isCollision;
}
// convert array of arrays ship location to string
const shipStringLocation = (location) => {
    let locationString = [];
    for (let i=0; i<location.length; i++) {
            locationString[i] = location[i].join("");
        }
    return locationString;
    }

// generate ships location and validate within board and collision
shipsArray.forEach((ship => {
    let location = generateShipLocation(ship.size);
    let locationString = shipStringLocation(location);
    console.log(`${ship.name} was initially generated, and its initial location is ${locationString}`);
    //console.log(locationString);
    let shipWithinBoard = validateShipWithinBoard (location);
    //console.log("isWithinBoard " + shipWithinBoard);
    let collide = validateShipsDoNotCollide(ship.id,locationString);
    //console.log("collision " + collide);
    
    let counter = 0;
    
    while ((shipWithinBoard == false || collide == "Ships collide") && counter < 10) {
        //|| collide == "Ships collide"
        console.log ("regenerating ship location attempt # " + counter) ;
        counter++;
        if (counter === 9) {
             console.log("couldn't generate valid location for ship within 10 attempts");
             break;
         }
        location = generateShipLocation(ship.size);
        locationString  = shipStringLocation(location);
        console.log(`Attempt # ${counter} to generate ${ship.name}, its location is ${locationString}`);
        shipWithinBoard = validateShipWithinBoard (location);
        //console.log("isWithinBoard2 " + shipWithinBoard);
        collide = validateShipsDoNotCollide(ship.id,locationString);
        //console.log("collision2 " + collide);

    }
    ship.location = location;
    ship.locationString  = locationString;
    console.log(`${ship.name} size is ${ship.size} and its location is ${ship.locationString}`);
    //console.table(ship.location);    
} // for each end
))

shipsArray.forEach((ship => {
    console.table(ship.location);
    console.log(ship.locationString);
}))