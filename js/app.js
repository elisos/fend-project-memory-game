

//----Variable Declarations----//

//For Deck Shuffle:
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let card = deck.querySelectorAll("li");
let shuffledArray = [];
let openArray = [];//the array which will contain opened cards

//For Move Counter:
let moves = document.querySelector(".moves");
let moveNumber = 0;

//For Star Rating:
let stars = document.querySelector(".stars");
let star3 = stars.lastElementChild;
let star2 = star3.previousElementSibling;

//For Timer:
let timer = document.getElementById("timer");
let minutes = document.getElementById("minutes");
let seconds = document.getElementById("seconds");
let min = 0;
let sec = 0;

//For End of Game:
let matchNumber = 0;
let modal = document.getElementById("modal");

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
}

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
    }
    
//    update the move counter
    addMove();
    
//    change the star rating
    starRating();
};

function yesMatch () {
    setTimeout (function () {
        openArray[0].classList.add('match');//add the match class
        openArray[1].classList.add('match');
        openArray.length = 0;//and clear the array. from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    }, 850); //keep the pair open for a time before adding match
    matchNumber++; //increment the number of matches
    if (matchNumber === 8) {
            callModal();
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
    moveNumber++; //with each click, increment by 1
    moves.innerHTML = moveNumber; //show the number in the counter
    if (moveNumber === 1) {
        runTimer();
    }
}

//---------Star Rating Function---------//
function starRating () {
    if (moveNumber >= 23) { //turn the 3rd star empty from 23 moves
        star3.innerHTML = "<i class=\"fa fa-star-o\"></i>";
    } 
    if (moveNumber >= 46) { //turn the 2nd star empty from 46 moves
        star2.innerHTML = "<i class=\"fa fa-star-o\"></i>";
    }
}

//-------------Timer--------------//
function runTimer () {
    Interval = setInterval ( function () {
        sec++;
        if (sec <= 9) {
            seconds.innerHTML = "0" + sec; 
        } else { 
            seconds.innerHTML = sec;
            }
         if (sec === 60) {
                min++;
                sec = 0;
                minutes.innerHTML = min;
        } 
    }, 1000);
}

//-------------Modal------------//

function callModal () {
    setTimeout (function () {
    modal.style.display = "block";
    }, 1000);
}





// *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
// */