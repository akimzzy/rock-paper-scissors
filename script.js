// Rules----------------------------------------------------------------------------------------------------------------
const showRules = (() => {
    const rules = document.querySelectorAll([".rulesBox__bg", ".rulesBox"])
    const rulesBtn = document.querySelector(".rules")
    const cancleBtn = document.querySelector(".rulesBox__cancel") 
    
    // rules Array
    const rulesArr = [...rules];

    // Display rules when clicked
    rulesBtn.addEventListener("click", () => {
        rulesArr.forEach(cur => {
            cur.classList.remove("noDisplay") 
        })
    })
    
    // Hide rules when clicked
    cancleBtn.addEventListener("click", () => {
        rulesArr.forEach(cur => {
            cur.classList.add("noDisplay") 
        })
    })
})() 


// -----------------------------------------------------Game--------------------------------------------------------------

// change to Paper
const changePaper = (box, image) => {
    box.className ="paperColor picked__player";
    image.className = "paperImage picked__player--imgBox";
}
// change to Rock
const changeRock = (box, image) => {
    box.className = "rockColor picked__player";
    image.className = "rockImage picked__player--imgBox"; 
}
// change to Scissors
const changeScissors = (box, image) => {
    box.className = "scissorsColor picked__player";
    image.className = "scissorsImage picked__player--imgBox"; 
}

// Global score(to be updated as game is playing)
let score = 0;

// html element where updated score will be displayed
const ScoreBoard = document.querySelector(".scoreBoard__score");

// variable for player choice and house choice
let playerChoice, computerChoice;

// DOM element to display win or lose
const decisionDOM = document.querySelector(".picked__result--heading");

// Game function
const game = (() => {

    // function to get random number between 0, 1, 2
    const randNum = () => { return Math.floor((Math.random() * 3))};

    // Posible options available
    const choices = ["paper", "rock", "scissors"];

    // DOM Element to manipulate as game is being played
    const game = document.querySelector(".game");
    const picked = document.querySelector(".picked");
    const playerChoiceBox = document.querySelector(".picked__player");
    const playerChoiceImg = document.querySelector(".picked__player--imgBox"); 

    // Array of DOM element of options to be selected
    const choicesArr = [...(document.querySelectorAll(".game__box"))];

    // Add event listener to each of the array 
    choicesArr.map(cur => {

        // Click even listener
        cur.addEventListener("click", () => {

            // fade off game when clicked
            game.classList.add("noDisplay");

            // Display picked when clicked
            picked.classList.remove("noDisplay");

            // if paper is clicked .....
            if (cur.classList.contains("game__paper")) {

                // Calls function to change player choice
                changePaper(playerChoiceBox, playerChoiceImg);

                // Save player choice to playerChoice variable decleared ealier 
                playerChoice = choices[0];
            }

            // If rock is clicked ......
            else if (cur.classList.contains("game__rock")) {

                // Calls function to change player choice
                changeRock(playerChoiceBox, playerChoiceImg)

                // Save player choice to playerChoice variable decleared ealier 
                playerChoice = choices[1];
            }

            // If sciscsors is clicked
            else if (cur.classList.contains("game__scissors")) { 

                // Calls function to change player choice
                changeScissors(playerChoiceBox, playerChoiceImg)

                // Save player choice to playerChoice variable decleared ealier 
                playerChoice = choices[2];
            } 

            // Wait .5s before calling House decision function
            setTimeout(() => {

                // house function called with the random number function above passed in as argument
                houseChoice(choices[randNum()]);

                // Update Score function
                updateScore();

                // Set score to innerHtml of scoreboard
                ScoreBoard.innerHTML = score;

                // Display decison DOM element to know winner
                decisionDOM.classList.remove("noDisplay")
            }, 500);

        })
    })
    
    // House Choice Function
    const computerChoiceBox = document.querySelector(".picked__computer");
    const computerChoiceImg = document.querySelector(".picked__computer--imgBox");

    // function for house to select options and style page according to the choice made 
    const houseChoice = (selected) => {

        // Display Computer Choice
        computerChoiceBox.classList.remove("noDisplay");

        // changing style in respect of choice made and saving computer choice to computerChoice varible decleared aboce
        if (selected === "paper") {
            changePaper(computerChoiceBox, computerChoiceImg);
            computerChoice = choices[0];
        } else if (selected === "rock") {
            changeRock(computerChoiceBox, computerChoiceImg);
            computerChoice = choices[1];
        } else if (selected === "scissors") {
            changeScissors(computerChoiceBox, computerChoiceImg);
            computerChoice = choices[2];
        }
    }

    // update score acording to the rules
    const updateScore = () => {
        
        if (playerChoice === computerChoice) {
            decisionDOM.innerHTML = "DRAW";
        } else if (playerChoice === "paper" && computerChoice === "rock") {
            decisionDOM.innerHTML = "YOU WIN";
            score++;
        } else if (playerChoice === "rock" && computerChoice === "paper") {
            decisionDOM.innerHTML = "YOU LOSE";
            score--;
        } else if (playerChoice === "scissors" && computerChoice === "paper") {
            decisionDOM.innerHTML = "YOU WIN";
            score++;
        } else if (playerChoice === "paper" && computerChoice === "scissors") {
            decisionDOM.innerHTML = "YOU LOSE";
            score--;
        } else if (playerChoice === "rock" && computerChoice === "scissors") {
            decisionDOM.innerHTML = "YOU WIN";
            score++;
        } else if (playerChoice === "scissors" && computerChoice === "rock") {
            decisionDOM.innerHTML = "YOU LOSE";
            score--;
        }
    }

    // Function for play again button
    const replay = () => {
        game.classList.remove("noDisplay");
        picked.classList.add("noDisplay"); 
        computerChoiceBox.className = "picked__computer noDisplay";
        decisionDOM.className = "picked__result--heading noDisplay";
    }

    const replayBtn = document.querySelector(".picked__replay");
    replayBtn.addEventListener("click", () => { 
        replay()
    })
})()