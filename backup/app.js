/*
 * Create a list that holds all of your cards
 */
let cardsArray = [];
let openCards = [];
let openCardNames = [];
let matchCount = 0;
let moveCount = 0;

const superStar = 16;
const avgStar = 24;
let starCount = 3;

resetBoard();

function setUpListener() {
 	for(let i = 0; i < cardsArray.length; i++) {
 		$(cardsArray[i]).one("click", clickCard);
 		$(cardsArray[i]).children().one("click", clickCard);
 	}
}

function printArray(array) {
	console.log("array elements are:")
	for(var i = 0; i < array.length; i++) {
		console.log(array[i]);
	}
}

function resetBoard() {
 	cardsArray.length = 0;
 	var output = '';
 	matchCount = 0;

 	resetMoveCount();
 	resetStar();

 	cardsArray = shuffle($(".deck").find('img').toArray());
	for(let i = 0; i < cardsArray.length; i++) {
		var className = $(cardsArray[i]).attr('id');
		console.log("className " + $(cardsArray[i]).attr('id'));
		output += `<img src='img/${className}.png' class='hidden' id='${className}'>`
	}

	$(".deck").find('img').html(output);
	cardsArray =  $(".deck").toArray();
	printArray(cardsArray);
 	setUpListener();

    $('.restart').on("click", resetBoard);
}

function clickCard(event) {

	console.log("am here");
	console.log("event " + $(event.target).children().attr('id'));
	console.log("event current " + $(event.currentTarget).children().attr('class'));

	//event.stopPropagation();

	if(openCards.length < 2 && openCardNames.length < 2) {

		setMoveCount();
		setStar();

		openCards.push($(event.target).children());
		openCardNames.push($(event.target).children().attr('id'));
		$(event.target).children().toggleClass('hidden open show');
		printArray(openCards);

		if(openCards.length === 2) {

			var card1 = openCards[0];
			var card2 = openCards[1];

			console.log("cardName1 " + openCardNames[0]);
			console.log("cardName2 " + openCardNames[1]);

			if (openCardNames[0] === openCardNames[1]) {
				console.log("matched");
				setCardMatch(card1, card2);
				checkBoardWin();
				clearOpenCards();
			} else {
				console.log("cards do not match " + $(card1).attr('class') +" " +$(card2).attr('class'));
				setCardMismatch(card1, card2);
				console.log("cards do not match" + $(card1).attr('class') +" " +$(card2).attr('class'));
				clearOpenCards();
				setTimeout(function() {
					$(card1).toggleClass('hidden open show mismatch');
					$(card2).toggleClass('hidden open show mismatch');
				}, 400);
			}
		}
	} else {
		clearOpenCards();
	}
}

function setMoveCount() {
	moveCount += 1;
	$('.moves').text(moveCount);
}

function resetMoveCount() {
	moveCount = 0;
	$('.moves').text('');
}

function setStar() {
	if(moveCount > superStar) {
		if ((moveCount < avgStar) && (starCount === 3)) {
			starCount = 2;
			$('#star1').hide();
		} else if((moveCount > avgStar) && (starCount === 2)) {
			starCount = 1;
			$('#star2').hide();
		}
	}
}

function resetStar() {
	starCount = 3;
	$('#star1').show();
	$('#star2').show();
}


function setCardMatch(card1, card2) {
	matchCount += 2;
	$(card1).addClass('match');
	$(card2).addClass('match');
	$(card1).parent().off();
	$(card2).parent().off();
}

function checkBoardWin() {
	setTimeout(function() {
		if(matchCount === cardsArray.length) {
			//alert("Congratulations!!! You've cleared the board.");
			window.location.href = `win.html?moves=${moveCount}&stars=${starCount}`;
		}
	}, 400);
}

function setCardMismatch(card1, card2) {
	$(card1).addClass('mismatch');
	$(card2).addClass('mismatch');
	$(card1).one('click', clickCard);
	$(card2).one('click', clickCard);
}


function hideCards() {
	$(openCards[0]).removeClass('open show mismatch');
	$(openCards[1]).removeClass('open show mismatch');

	clearOpenCards();
}

 function clearOpenCards() {
 	openCards.length = 0;
 	openCardNames.length = 0;
 }

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/245097'
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