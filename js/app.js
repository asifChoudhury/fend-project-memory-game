// grab the card element
let cards = document.getElementsByClassName('card');

// grab the card deck
let deck = document.getElementsByClassName('deck')[0];

// track the number of moves
let moves = 0;

// reset the deck at the begining of the game
resetCards();

/*
 * reset the deck by creating and shuffling a new deck of cards
 */
function resetCards() {
    // cards array
    let allCards = [];

    // add cards one by one to the array
    for(let index = 0; index < cards.length; index++) {
        allCards.push(cards[index]);
    }

    //clear the cards from the deck
    deck.innerHTML = '';

    // reset moves counter
    moves = 0;

    // display the moves counter
    document.getElementsByClassName('moves')[0].innerHTML = moves;

    // shuffle the cards
    let shuffledCards = shuffle(allCards);

    // add each card's HTML to the page
    shuffledCards.forEach(function(card) {
        deck.appendChild(card);
    });

    // start the game
    play();
}// function createCards()

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

// logic for the game
function play() {
    // handle user's click
    deck.addEventListener('click', function(e) {
        // display the card's symbol
        displayCardSymbol(e.target);

        // add the opened card to an array of opened cards
        addToOpenList(e.target);

        // if the cards do match, lock the cards in the open position
        if(match) {
            lockCards(e.target);
        } else { // if the cards do not match, remove the cards from the list and hide the card's symbol
            removeFromOpenList(e.target);
            hideSymbol(e.target);
        }

        // increment the move counter and display it on the page
        incrementMoves();

        if(allCardsMatched()) {
            //display a message with the final score

        }

    });
}