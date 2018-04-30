

//----Variable Declarations----//

//For Deck Shuffle:
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let card = deck.querySelectorAll("li");
let shuffledArray = [];
let openArray = [];//the array which will contain opened cards
let twoClicked = true;

//For Move Counter:
let moves = document.querySelector(".moves");
let moveNumber = 0;

//For Star Rating:
let stars = document.querySelector(".stars");
let star3 = document.querySelector("#star3");
let star2 = document.querySelector("#star2");
let star1 = document.querySelector("#star1");
let starfish = document.querySelectorAll(".starfish");

//For Timer:
let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let min = 0;
let sec = 0;

//For Restart:
let restart = document.querySelector(".restart");

//For Winner's Wiggle:
let fish = deck.querySelectorAll("img");
let headerFish = document.querySelectorAll(".header-fish");

//For End of Game Modal:
let matchNumber = 0;
let modal = document.getElementById("modal");
let time = document.getElementById("time");
let score = document.getElementById("score");
let playAgain = document.getElementById("play-again");

//--------Shuffle and Deal the Deck----------//

//Create an array of the cards
let cardArray = [...cards];

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

// Use the shuffled array to change the deck's cards.
function dealCards() { 
    shuffledArray = shuffle(cardArray);
    for (let i = 0; i < shuffledArray.length; i++) {
 	 	deck.innerHTML = ""; //erase the prior version of deck
 	 	shuffledArray.forEach(function(card) {
 	 		deck.appendChild(card); //populate a newly shuffled version
 	 	})};
};

dealCards();

//---------Event Listener and Card Match Functions-----------//

//add the event listener

deck.addEventListener("click", matchCard); //when a card on the deck is clicked

function matchCard (e) {
    
    if (openArray.length < 2) { //until 2 cards are open
        e.target.classList.add('open'); //open the card
        openArray.push(e.target);//and add it to the array
    };
    
    if (openArray.length == 2) { //once you have 2 cards
        
        //make sure you don't include the same card twice
        let firstID = openArray[0].getAttribute('id');
        let secondID = openArray[1].getAttribute('id');
        if (firstID == secondID) {
            openArray.pop();
        }
        
        //compare the cards
        let firstCard = openArray[0].innerHTML;
        let secondCard = openArray[1].innerHTML;
        if (firstCard == secondCard) { 
            yesMatch();
        } else {
            noMatch();
        }
    };
    
//    update the move counter
    addMove();
    
//    change the star rating
    starRating();
};

function yesMatch () {
    setTimeout (function () {
        openArray[0].classList.add('match', "lock");//add the match class
        openArray[1].classList.add('match', "lock");
        openArray.length = 0;//and clear the array. from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    }, 850); //keep the pair open for a time before adding match and lock
    matchNumber++; //increment the number of matches
    matchWiggle();
    if (matchNumber === 8) { //when the game is completed,
        wiggle();
        setTimeout (function () {
            callModal(); //trigger modal
        }, 1500);
    }
};

function noMatch () {
    setTimeout (function () {
        openArray[0].classList.remove('open'); //close the cards
        openArray[1].classList.remove('open');
        openArray.length = 0; //and clear the array
    }, 850); //keep the non-matched pair open for a time before closing
};

//-----------Move Counter Function-----------//
function addMove () {
    ++moveNumber; //with each click, increment by 1
    moves.innerHTML = moveNumber; //show the number in the counter
    if (moveNumber === 1) {
        runTimer();
    }
};

//---------Star Rating Function---------//
function starRating () {
    if (moveNumber >= 23) { //hide the 3rd star from 23 moves
        star3.style.display = "none";
    } 
    if (moveNumber >= 46) { //hide the 2nd star from 46 moves
        star2.style.display = "none";
    }
};

function starRestore () { //on restart, show all stars
    for (i = 0; i < starfish.length; i++) {
        starfish[i].style.display = "inline-block";
        };
}

//-------------Timer--------------//
function runTimer () {
    Interval = setInterval ( function () {
        sec++;
        if (sec <= 9) {
            seconds.innerHTML = "0" + sec; 
        } else if (sec == 59) {
            sec = 0;
            setTimeout ( function () {
                min++;
                minutes.innerHTML = min;
            }, 1000);
        } else { 
            seconds.innerHTML = sec;
            }
//         if (sec === 60) {
//                min++;
//                sec = 0;
//                minutes.innerHTML = min;
//        }
    }, 1000);
}

//-----------Restart-------------//
restart.addEventListener("click", restartGame);

function restartGame () {
    shuffle(cardArray);
    dealCards();
    closeCards();
    openArray = [];
    moveNumber = 0;
    matchNumber = 0;
    star2.innerHTML = "<i class=\"fa fa-star\"></i>";
    star3.innerHTML = "<i class=\"fa fa-star\"></i>";
    clearInterval(Interval);
    min = 0;
    sec = 0;
    minutes.innerText = "0";
    seconds.innerText = "0";
    unWiggle();
    starRestore();
};

function closeCards () {
    for (i = 0; i < card.length; i++) {
    card[i].classList.remove("open", "match", "lock");
    };
}
//-----------Winner's Wiggle---------//

function wiggle () {
    setTimeout (function() {
        for (i = 0; i < fish.length; i++) {
        fish[i].classList.add("animated", "infinite", "bounce");
        };
    }, 850);
}


function unWiggle () {
    for (i = 0; i < fish.length; i++) {
    fish[i].classList.remove("animated", "infinite", "bounce");
    };
}

function matchWiggle () {
    setTimeout (function() {
        for (i = 0; i < headerFish.length; i++) {
        headerFish[i].classList.add("animated", "bounce");
        };
    }, 850);
    setTimeout (function() {
        for (i = 0; i < headerFish.length; i++) {
        headerFish[i].classList.remove("animated", "bounce");
        };
    }, 1500);
    
}
//-------------Modal------------//

function callModal () {
    setTimeout (function () {
    modal.style.display = "block";
    time.innerHTML = min + ":" +  sec;
    score.innerHTML = stars.innerHTML;
    }, 1000);
}

//---------Play Again------------//

playAgain.addEventListener("click", startOver);

function startOver () {
    restartGame();
    modal.style.display = "none";
}
