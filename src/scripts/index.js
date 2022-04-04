// cards array
const cards = [
	{
		name: 'aspade',
		img: 'images/Aspade.png',
	},
	{
		name: 'jspade',
		img: 'images/Jspade.png',
	},
	{
		name: 'kspade',
		img: 'images/Kspade.png',
	},
	{
		name: 'qspade',
		img: 'images/Qspade.png',
	},
	{
		name: 'adiamond',
		img: 'images/Adiamond.png',
	},
	{
		name: 'jdiamond',
		img: 'images/Jdiamond.png',
	},
	{
		name: 'kdiamond',
		img: 'images/Kdiamond.png',
	},
	{
		name: 'qdiamond',
		img: 'images/Qdiamond.png',
	},
	{
		name: 'aspade',
		img: 'images/Aspade.png',
	},
	{
		name: 'jspade',
		img: 'images/Jspade.png',
	},
	{
		name: 'kspade',
		img: 'images/Kspade.png',
	},
	{
		name: 'qspade',
		img: 'images/Qspade.png',
	},
	{
		name: 'adiamond',
		img: 'images/Adiamond.png',
	},
	{
		name: 'jdiamond',
		img: 'images/Jdiamond.png',
	},
	{
		name: 'kdiamond',
		img: 'images/Kdiamond.png',
	},
	{
		name: 'qdiamond',
		img: 'images/Qdiamond.png',
	},
];

$(document).ready(function () {
	$('#restart').click(startGame);
	startGame();
	$('#gameOver').addClass('d-none');
});

let checkMatchArray = [];
let checkMatchArrayId = [];
let matchCount = 0;

function startGame() {
	$('#gameOver').addClass('d-none');
	// clear board
	$('#board').empty();
	// create board
	createBoard();
	// shuffling card
	shuffleCard(cards);
}

// draw board
function createBoard() {
	let cardsCount = cards.length;
	for (let i = 0; i < cardsCount; i++) {
		$('#board').append($(document.createElement('img')).attr({ src: 'images/card_back.png', 'data-id': i }).click(flipCard));
	}
}

// when card is clicked, shows the card
function flipCard() {
	$(this).unbind();
	// store clicked data-id attribute
	let targetId = $(this).attr('data-id');
	// show card
	$(this).attr('src', cards[targetId].img);
	// get and store clicked card name
	checkMatchArray.push(cards[targetId].name);
	// get and store clicked card data-id
	checkMatchArrayId.push(targetId);
	// when clicked card name array length is 2, call checkMatch function
	if (checkMatchArray.length == 2) {
		$('img').unbind();
		checkMatch();
	}
}

// check for match
function checkMatch() {
	// get and store the first and second clicked card src
	let matchSrcOne = cards[checkMatchArrayId[0]].img;
	let matchSrcTwo = cards[checkMatchArrayId[1]].img;
	// get and store the first and second clicked card ids
	let matchIdOne = $('img')[checkMatchArrayId[0]];
	let matchIdTwo = $('img')[checkMatchArrayId[1]];
	// checking if card name is equal
	if (checkMatchArray[0] === checkMatchArray[1]) {
		// if true, change card src and removeEventListener click
		$(matchIdOne).attr('src', matchSrcOne).unbind();
		$(matchIdTwo).attr('src', matchSrcTwo).unbind();
		// increment match count
		matchCount++;
		$('img').bind('click', flipCard);
	} else {
		// if false, changes img src back after 1 second
		setTimeout(() => {
			$(matchIdOne).attr('src', 'images/card_back.png');
			$(matchIdTwo).attr('src', 'images/card_back.png');
			$('img').bind('click', flipCard);
		}, 1000);
	}
	// reset clicked name and id array
	checkMatchArray = [];
	checkMatchArrayId = [];

	// check if match count is equal to cards
	if (matchCount === cards.length / 2) {
		matchCount = 0;
		$('#gameOver').addClass('d-flex').removeClass('d-none');
	}
}

// shuffle cards array
// console.log(cards.sort(() => 0.5 - Math.random()));
function shuffleCard(array) {
	let top = array.length - 1;
	let current;
	while (top != 0) {
		current = Math.floor(Math.random() * top);
		[array[current], array[top]] = [array[top], array[current]];
		top--;
	}
	return array;
}

// console.log(shuffleCard(cards));
