

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

//Add an event listener to open the cards when clicked.
deck.addEventListener("click", function(e) {
   e.target.classList.add('open'); 
});

let clickedCard = document.getElementsByClassName("open");
let clickedArray = [...clickedCard];


//Check if the matching card is already open
//var goodUsers = ["someuser1", "someuser2", "someuser3"];
//var users = ["someuser1", 'basuser'];
//var user;
//
//for (let i=0; i < clickedArray.length; i++) {
//  let clicked = clickedArray[i];
//  if (goodUsers.indexOf(user) >= 0) {
//    console.log(user + ' is a good user');
//  } else {
//    console.log(user + ' is BAD!!!');
//  }
//}


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