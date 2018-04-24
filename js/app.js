

//define variables
let cards = document.getElementsByClassName("card");
const deck = document.querySelector(".deck");
let card = deck.querySelectorAll("li");
let shuffledArray = [];
let openArray = [];//the array which will contain opened cards
let moves = document.querySelector(".moves");
let moveNumber = 0;

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
    
    //update the move counter
    addMove();
    
    //change the star rating
    starRating();
};

function yesMatch () {
    setTimeout (function () {
        openArray[0].classList.add('match');//add the match class
        openArray[1].classList.add('match');
        openArray.length = 0;//and clear the array. from https://stackoverflow.com/questions/1232040/how-do-i-empty-an-array-in-javascript
    }, 850); //keep the pair open for a time before adding match
};

function noMatch () {
    setTimeout (function () {
        openArray[0].classList.remove('open'); //close the cards
        openArray[1].classList.remove('open');
        openArray.length = 0; //and clear the array
    }, 850); //keep the non-matched pair open for a time before closing
};

function addMove () {
    moveNumber++;
    moves.innerHTML = moveNumber;
}

function starRating () {
    if (moveNumber <== 23) {
        
    } else if ((moveNumber > 23) && (moveNumber <==46)) {
        
    } else {
        
    }
}

/*
 * 
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */