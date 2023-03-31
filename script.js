const prompt = require("prompt-sync")({ sigint: true });

//factory function for players
const Player =  (playerName, playerScore) => {
    const privateName = () => {
        return playerName;
    };
    const privateScore = () => {
        return  playerScore;
    };
    return {
        privateName,
        privateScore
    };
};

//module to play the game
const GameControl = (() => {
   
     //play a turn 
     const turn = (player) => {
        let tempRoll = roll();
        console.log(`${player.privateName()}, your roll is ${tempRoll}`);
        return {tempRoll};
    }
   
    //set up the players when the game loads
    const playerSetup = (playerCount) => {
        let allPlayers = [];
        if (playerCount > 6 || playerCount < 2) {
            console.log('invalid entry! 6 is the max and 2 is min.');
            playerSetup(prompt('how many people will be playing? '));
        }
        else {
            for (let p = 0; p < playerCount; p++) {
                let instanceName = prompt('what is your name? ');
                allPlayers[p] = Player(instanceName, 0);
            }
            play(playerCount, allPlayers);
            return {
                allPlayers,
                playerCount
            };
        };
        
    }
    
 //function to check if a player rolled a 1
 const oneCheck = (result) => {
    if (result == 1) {
        return true;
    }
    else {
        return false;
    }
}

    //function to check if a player has won the game
    const winCheck = (totalScore) => {
        if (totalScore >= 111) {
            return true;
        }
        else {
            return false;
        }
    }

    //play the game
    const play = (playerCount, allPlayers) => {
        let won = false
        while (won === false) {
            for (let i = 0; i < playerCount; i++) {
                let turnScore = 0;
                let activePlayer = allPlayers[i];
                let again = true;
                turnScore += turn(activePlayer);
                while (again) {
                    let input = prompt('would you like to roll again? Y or N').toUpperCase();
                    if (input == 'N') {
                        continue;
                    }
                    else {
                        let result = turn(activePlayer);
                        if (oneCheck(result) === true) {
                            console.log(`you rolled a one and lost ${turnScore} points`);
                            continue;
                        }
                        else {
                            turnScore += turn(activePlayer);
                        }
                        
                    };
                    
                };
                
            };
        };
    };

  //function to roll the dice
  const roll = () => {
    let result = Math.floor(Math.random() * 6);
    return result;
}

    //when the program loads, call the player setup function
    playerSetup(prompt('how many people will be playing?'));
    
  
    return {
        playerSetup,
        roll
    }
})();

console.log(GameControl.playerSetup.playerCount);