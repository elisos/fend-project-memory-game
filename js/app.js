

//define variables
let cards = document.getElementsByClassName("card");
let deck = document.querySelector(".deck");
let card = deck.querySelectorAll("li");
let shuffledArray = [];

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


//add the event listener

deck.addEventListener("click", matchCard); //when a card on the deck is clicked

let openArray = [];//the array which will contain opened cards

function matchCard (e) {
    
    if (openArray.length < 2) { //until 2 cards are open
        e.target.classList.add('open'); //open the card
        openArray.push(e.target);//and add it to the array
    };
    
    if (openArray.length == 2) { //once you have 2 cards
        let firstCard = openArray[0].innerHTML;
        let secondCard = openArray[1].innerHTML;
        if (firstCard == secondCard) { //compare cards
            yesMatch();
        } else { //if no match
            noMatch();
        }
    }
    
};

function yesMatch () {
    setTimeout (function () {
        openArray[0].classList.add('match');//add the match class
        openArray[1].classList.add('match');
        openArray.length = 0;//and clear the array
    }, 750);
};

function noMatch () {
    setTimeout (function () {
        openArray[0].classList.remove('open'); //close the cards
        openArray[1].classList.remove('open');
        openArray.length = 0; //and clear the array
    }, 750);
};

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */