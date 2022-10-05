// 1. Done - Create grid html with javascript
// 2. Done - Create ships structure
// 3. Done - Logically place random ship on the board
// 4. Done Place ships function - validate its on the board, doesn't clash with other ships
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
    const shipPic = document.querySelector(".ships-rules__ships__" + ship );
    console.log (shipPic);
    shipPic.src = shipsArray[2].imageHit;
}
// function to handle miss
const missClick = () => {
    const btn1 = document.getElementById("11");
    btn1.addEventListener ("click", (event) => {
         btn1.style.backgroundImage = "url(./images/explosion1.gif)";
         btn1.style.backgroundSize = "cover";
         replaceToHitShipPic ("cruiser");
     })
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
            btn.style.color = "white";
            btn.style.fontSize = "18px"     
        }
    }))
} 
// create ship's location status array
const createShipLocationsStatus = (shipId, shipLocationArray) => {
    for (let i=0; i<shipsArray.length; i++) {
        if (shipsArray[i].id === shipId) {
            shipsArray[i].locationStatus.id = "notHit";
        }
    }
}
// return updated ship location status
const updateShipLocationStatus = (shipLocationArray, shipLocationStatusArray, buttonId) => {
    for (let i=0; i<shipLocationArray.length; i++) {
        if (shipLocationArray[i] === buttonId) 
            shipLocationStatusArray[i] = true;
    return shipLocationStatusArray;;
    }
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
    putShipsOnBoard();                   
    displayShips();
    const newGameButton = document.querySelector(".ships-rules__new-game");
    newGameButton.addEventListener ("click", (event) => {
        console.log("New Game button clicked")
        prepareNewGame();
    })
    
    const allButtons = document.getElementsByClassName("game-board__button");
    for (let i=0; i<allButtons.length;i++) {
        allButtons[i].addEventListener("click", (event) => {
            for (let j=0; j<shipsArray.length; j++) {
                updateShipLocationStatus(shipsArray[j].locationString, shipsArray[j].locationStatus, allButtons[i].id);
                console.log(shipsArray[j].name);
                console.log(shipsArray[j].locationString);
                console.log(shipsArray[j].locationStatus);
            }
            console.log(allButtons[i].id);
            
            allButtons[i].style.backgroundImage = "url(./images/explosion1.gif)";
            allButtons[i].style.backgroundSize = "cover";
        })
    }
    // get one button and try to click
     const btn1 = document.getElementById("11");
     console.log(typeof btn1);
     btn1.addEventListener ("click", (event) => {
         btn1.style.backgroundImage = "url(./images/explosion1.gif)";
         btn1.style.backgroundSize = "cover";
         replaceToHitShipPic ("cruiser");
     })

     // get another button and try to click
     const btn2 = document.getElementById("12");
     btn2.addEventListener ("click", (event) => {
         console.log("button 2 clicked");
         btn2.style.backgroundImage = "url(./images/explosion.gif)";
         btn2.style.backgroundSize = "cover";
     })

     // get another button and try to click
     const btn3 = document.getElementById("13");
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

