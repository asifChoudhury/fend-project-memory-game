let cards = document.getElementsByClassName('card'); // grab the card element
let deck = document.getElementsByClassName('deck')[0]; // grab the card deck
let movesClass = document.getElementsByClassName('moves')[0]; // grab the moves class
let stars = document.getElementsByClassName('fa-star'); // grab the fa-stars class
const restart = document.getElementsByClassName('restart')[0]; // grab the restart class
let timer = document.getElementById('timer');

let moves = 0; // track the number of moves
let numMatch = 0; // track the number of matches

let allCards = []; // cards array
let openedCards = []; // array of opened cards

let length = cards.length; // number of cards
// add cards from the DOM to an array
for(let index = 0; index < length; index++) {
    allCards.push(cards[index]);
}

let time;
let seconds = 0;
let minutes = 0;

startTimer(); // start the timer
resetCards(); // reset the deck at the begining of the game
startGame(); // start the game

// reload the game when restart button is clicked
restart.addEventListener('click', function(e) {
    restartGame();
});

/*
 *
 */
function startTimer() {
    time = setTimeout(add, 1000);
}

/*
 *
 */
function add() {
    seconds++;
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
            resetTimer();
        }
    }

    timer.textContent = (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

    startTimer();
}

/*
 * reset the deck by creating and shuffling a new deck of cards
 */
function resetCards() {
    deck.innerHTML = ''; //clear the cards from the deck

    moves = 0; // reset moves counter
    numMatch = 0; // reset the number of matches

    // remove the color from the stars
    let numElements = stars.length;
    for(let i = 0; i < numElements; i++) {
        stars[i].classList.remove('color-star');
    }

    movesClass.innerHTML = moves; // display the moves counter

    let shuffledCards = shuffle(allCards); // shuffle the cards
    // add each card's HTML to the page
    shuffledCards.forEach(function(card) {
        deck.appendChild(card);
    });
}

/*
 * Shuffle function from http://stackoverflow.com/a/2450976
 */
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
 * logic for the game
 */
function startGame() {
    //let count = 0;

    // handle user's click
    deck.addEventListener('click', function(e) {
        if(!e.target.classList.contains('open')) { // prevent user from clicking the same card twice
            displayCardSymbol(e.target); // display the card's symbol
            addToOpenList(e.target); // add the opened card to an array of opened cards

            // if there's already another card in the list, compare them
            if (openedCards.length == 2) {
                let card1 = openedCards[0]; // the card that's already on the list
                let card2 = openedCards[1]; // the card just selected

                // if the cards do match, lock the cards in the open position
                if(card1.children[0].classList.item(1) === card2.children[0].classList.item(1)) {
                    // add animation when there's a match
                    addClass(card1, card2, 'match')
                    addClass(card1, card2, 'animate-match');

                    clearList(); // clear the list of opened cards
                    numMatch++; // increment the number of matches

                } else { // if the cards do not match, remove the cards from the list and hide the card's symbol
                    setTimeout(function(){
                        addClass(card1, card2, 'animate-mismatch'); // add animation when there's a mismatch

                        // hide the cards
                        removeClass(card1, card2, 'open');
                        removeClass(card1, card2, 'show');
                    }, 300);

                    setTimeout(function(){
                        clearList(); // remove the list of opened cards
                        removeClass(card1, card2, 'animate-mismatch'); // once animation is completed, remove the class from the cards

                    }, 1000);
                }

                incrementMovesAndDisplay(); // increment the move counter and display it on the page
            }

            // if all cards matched, display congratulatory message
            if(allCardsMatched()) {
                let numStars = assignStars();

                // color the stars achieved
                for(let i = 0; i < numStars; i++) {
                    stars[i].classList.add('color-star');
                }

                //display a message with the final score
                setTimeout(function(){
                    alert('Congratulations! You won!' + '\n' + 'With ' + moves + ' moves and ' + numStars + ' Stars.' + '\n' + 'Woooooo!');
                }, 500);

                // restart the game after 1s
                setTimeout(function(){
                    restartGame();
                }, 1000);
            }
        }
    });
}

/*
 * display the selected card's symbol
 */
function displayCardSymbol(card) {
    card.classList.add('card', 'open', 'show');
}

/*
 * add the opened card to an array of opened cards
 */
function addToOpenList(card) {
    openedCards.push(card);
}

/*
 * clear the list of opened cards
 */
function clearList() {
    openedCards.length = 0;
}

/*
 * add css classes
 */
function addClass(card1, card2, classToAdd) {
    card1.classList.add(classToAdd);
    card2.classList.add(classToAdd);
}

/*
 * remove css classes
 */
function removeClass(card1, card2, classToRemove) {
    card1.classList.remove(classToRemove);
    card2.classList.remove(classToRemove);
}

/*
 * increment the move counter and display it on the page
 */
function incrementMovesAndDisplay() {
    moves++;
    movesClass.innerHTML = moves;
}

/*
 * return true if all cards are matched
 */
function allCardsMatched() {
    // there're 16 cards in total, so there're 8 matches possible. The game finishes when ther're 8 matches.
    if(numMatch === 8) {
        return true;
    }

    return false;
}

/*
 * assign number of stars based on the number of moves
 */
function assignStars() {
    let numStars = 0;

    // assign number of stars based on the number of moves
    if(moves < 14) {
        numStars = 3;
    } else if(moves < 18) {
        numStars = 2;
    } else {
        numStars = 1;
    }

    return numStars;
}

/*
 * reload the document and reset the timer
 */
function restartGame() {
    resetTimer();
    location.reload();
}

/*
 * reset the timer
 */
function resetTimer() {
    timer.textContent = "00:00";
    seconds = 0;
    minutes = 0;

    startTimer(); //start the timer again
}