// 1. Done - Create grid html with javascript
// 2. Done - Create ships structure
// 3. Done - Logically place random ship on the board
// 4. Done Place ships function - validate its on the board, doesn't clash with other ships
// 5. Done - Hit function
// 6. Not needed Miss function
// 7. Done - Create other graphic parts of the game  
// 8. Not needed Game over
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
    for (let i=1; i<11; i++) {
        for (let j=1; j<11; j++) {
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
    const shipPic = document.querySelector(".ships-rules__ships__" + ship.picClass );
    console.log (shipPic);
    shipPic.src = ship.imageHit;
}
// just for development - function to display ships on the board
const displayShips = () => {
    shipsArray.forEach((ship => {
        const shipLocations = ship.locationString;
        let btn = "";
        console.log(`${ship.name} ${ship.id} ${ship.size} ${ship.locationString}`);
        for (let i=0; i<ship.locationString.length; i++) {
            btn = document.getElementById(ship.locationString[i]);
            btn.style.backgroundColor = "black";
            btn.innerHTML = btn.id;
            //btn.style.color = "white";
            btn.style.fontSize = "18px"     
        }
    }))
} 
// function to return updated ship location status
const updateShipLocationStatus = (shipLocationArray, shipLocationStatusArray, buttonId) => {
    for (let i=0; i<shipLocationArray.length; i++) {
        if (shipLocationArray[i] === buttonId) {
            shipLocationStatusArray[i] = true;                   
        }               
    }
    return shipLocationStatusArray;
} 
// function to return if a clicked button is a hit
const buttonImage = (buttonId) => {
    let isHit = false;
    for (let i=0; i<shipsArray.length; i++) {
        for (let j=0; j<shipsArray[i].locationString.length; j++) {
            //console.log("shipsArray[i].locationString[j] " + shipsArray[i].locationString[j] + "buttonId " + buttonId);
            if (shipsArray[i].locationString[j] == buttonId ) isHit = true;
        }
    }
    return isHit;
}

// function to return if a ship is destroyed
const isShipDestroyed = (ship) => {
    let isDestroyed = false;
    let counter = 0;
    for (let i=0; i<ship.locationStatus.length; i++) {
        if (ship.locationStatus[i] == true) counter++;
    }
    if (ship.locationStatus.length === counter) isDestroyed = true;
    return isDestroyed;
} 

const prepareNewGame = () => {
    gameStarted = true;
    console.log (gameStarted);
    container.innerHTML="";
    container.style.backgroundImage = "url(./images/battleship-background3.jpg)"
    createBoard();
    shipsAndRules.innerHTML = "";
    shipsAndRules.innerHTML = 
                    `<div class="ships-rules__ships">                                            
                        <button type="button" class="ships-rules__new-game">New Game</button>
                        <button type="button" class="ships-rules__reveal-ships">Reveal Ships</button>  
                        ${gameShipsPanel()}   
                    </div>`  
    putShipsOnBoard();                   
    //displayShips();
    const newGameButton = document.querySelector(".ships-rules__new-game");
    newGameButton.addEventListener ("click", (event) => {
        console.log("New Game button clicked")
        prepareNewGame();
    })
    const revealShipsButton = document.querySelector(".ships-rules__reveal-ships");
    revealShipsButton.addEventListener ("click", (event) => {
        console.log("Reveal ships button clicked");
        displayShips();
    })
    const allButtons = document.getElementsByClassName("game-board__button");
    for (let i=0; i<allButtons.length;i++) {
        //let btnHit = false;
        allButtons[i].addEventListener("click", (event) => {
            
            for (let j=0; j<shipsArray.length; j++) {
                updateShipLocationStatus(shipsArray[j].locationString, shipsArray[j].locationStatus, allButtons[i].id);
                if (isShipDestroyed(shipsArray[j])) replaceToHitShipPic(shipsArray[j]);
                console.log("Is ship destroyed: " + isShipDestroyed(shipsArray[j]));
                console.log(shipsArray[j].name);
                console.log(shipsArray[j].locationString);
                console.log(shipsArray[j].locationString.length);
                console.log(shipsArray[j].locationStatus);
            }

            console.log(allButtons[i].id);
            if (buttonImage(allButtons[i].id)) {
                allButtons[i].style.backgroundImage = "url(./images/explosion1.gif)";
                allButtons[i].style.backgroundSize = "cover";
            }   
            else {
                allButtons[i].style.backgroundImage = "url(./images/water-splash.gif)";
                allButtons[i].style.backgroundSize = "cover";
            }
            
        })
    }             
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
   const direction = Math.floor(Math.random() * directions.length) ;
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

// generate ship location status
const shipLocationStatus = (size) => {
    let locationStatus = [];
    for (let i=0; i < size; i++) {
            locationStatus[i] = false;
        }
    return locationStatus;
    }    

// generate ships location and validate within board and collision
const putShipsOnBoard = () => {
    shipsArray.forEach((ship => {
        let location = generateShipLocation(ship.size);
        let locationString = shipStringLocation(location);
        let locationStatus = shipLocationStatus(ship.size);
        console.log(`${ship.name} was initially generated, and its initial location is ${locationString} and its location status is ${locationStatus}`);
        let shipWithinBoard = validateShipWithinBoard (location);
        let collide = validateShipsDoNotCollide(ship.id,locationString);
            
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
            locationStatus = shipLocationStatus(ship.size);
            console.log(`Attempt # ${counter} to generate ${ship.name}, its location is ${locationString}`);
            shipWithinBoard = validateShipWithinBoard (location);
            collide = validateShipsDoNotCollide(ship.id,locationString);
        }
        ship.location = location;
        ship.locationString  = locationString;
        ship.locationStatus = locationStatus;
        console.log(`${ship.name} size is ${ship.size} and its location is ${ship.locationString} and its location status is ${locationStatus}`);
         
       } // for each end
    ))    
    // shipsArray.forEach((ship => {
    //     console.table(ship.location);
    //     console.log("this is a string location " + ship.locationString);
    //     console.log("this is a ship location status " + ship.locationStatus);
    // }))
    }

