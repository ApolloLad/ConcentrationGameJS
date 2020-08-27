"using strict";

//holds the number of total cards
var cardNumber;
//holds all the card object from the nodeList
var cards = [];
//variable to hold nodeList of cards
var cardList;
//holds a nodeList of card values
var cardValueList;
//variable that holds the values from the nodeList
var cardValues = [];
//variable for holding the game div
var gameBody;
//holds the header for keeping track of moves
var movesHeader;
//keeps track of number of moves
var moves = 0;
//two arrays that holds symbols used in game
var symbols1 = ["!", "@", "#", "$", "%", "^", "&", "*"];
var symbols2 = ["!", "@", "#", "$", "%", "^", "&", "*"];
//array that will hold a combination of both symbol arrays
var symbols3;
//keeps track of how many indexes we need for randomizing symbols
var indexArray = [];
//array to hold number of flipped cards
var flippedCards = [];
//holds the number of cards with the class "matched"
var matchedCards = document.getElementsByClassName("matched");
//holds the form object
var startForm = document.getElementById("startForm");
//holds the title of moves
var movesTitle;
//variable that holds the gameBoard
var gameBoard

//on page load, add a listener to the start game button
window.onload = function(){
    document.getElementById("startButton").addEventListener("click", startGame);
};


//function that starts the game
function startGame()
{
    //empty the flipped cards array
    flippedCards = [];
    //get number of symbols the user chose
    symbols = parseInt(document.getElementById("numSymbols").value);
    //gets total number of cards 
    cardNumber = symbols * 2;
    //hide the input form
    startForm.classList.toggle("hidden");
    //draw game header
    drawGameHeader();
    //draw the game board
    drawGameBoard(symbols, cardNumber);
    //initialize game board
    initGameBoard(symbols);
}

/*
This function creates the game header by creating and then
appending elements that show the user how many moves have been done
*/
function drawGameHeader()
{
    gameBody = document.getElementById("game");
    movesHeader = document.createElement("div");
    movesHeader.setAttribute("id", "movesHeader");
    movesTitle = document.createElement("h2");
    movesHeader.appendChild(movesTitle);
    gameBody.appendChild(movesHeader);
    updateMoves();
}

/*
function to draw the gameboard.
*/
function drawGameBoard(userNumber, numberOfCards)
{
    //keeps track of the number of rows
    var numOfRows;
    //defines the gameboard as a new div and 
    //defines it's class as gameBoard
    gameBoard = document.createElement("DIV");
    gameBoard.setAttribute("class", "gameBoard");

    //to keep the board as even as possible, if the user has 
    //chosen less than 6 symbols, we want to place that number
    // of cards on a row. Then double it by making two rows
    if(userNumber < 6)
    {
        numOfRows = 2;
        //outer loop creates a ul element for the row and 
        //the inner element creates the appropriate number li elements.
        //It assigns a "col-1" class to give a grid view
        for(var i = 0; i < numOfRows; i++)
        {
            var newRow = document.createElement("ul");
            newRow.setAttribute("class", "row");
            newRow.setAttribute("id", "row" + i.toString());
            for(var j = 0; j < userNumber; j++)
            {
                var newCard = document.createElement("li");
                newCard.setAttribute("class", "col-1");
                var cardValue = document.createElement("p");
                newCard.appendChild(cardValue);
                newRow.appendChild(newCard);
            }
            gameBoard.appendChild(newRow);
        }
    }
    //if the user has chosen 6 or more symbols, 
    //we keep each row limited to 4 cards to provide a more 
    //even look
    else
    {
        //defines how many rows we need if we have 4 "columns"
        numOfRows = Math.round(numberOfCards / 4);
        //outer loop creates a ul element for the row and 
        //the inner element creates the appropriate number li elements.
        //It assigns a "col-1" class to give a grid view
        for(var i = 0; i < numOfRows; i++)
        {
            var newRow = document.createElement("ul");
            newRow.setAttribute("class", "row");
            newRow.setAttribute("id", "row" + i.toString());
            for(var j = 0; j < 4; j++)
            {
                var newCard = document.createElement("li");
                newCard.setAttribute("class", "col-1");
                var cardValue = document.createElement("p");
                newCard.appendChild(cardValue);
                newRow.appendChild(newCard);
            }
            gameBoard.appendChild(newRow);
        }
    }
    //append the gameBoard to the gameBody
    gameBody.appendChild(gameBoard);
}

/*
this function initializes the game board. It 
does so by keeping track of card objects and card 
values and then randomly assigns symbols to cards.
*/
function initGameBoard(symbols)
{
    //two nodeLists that keep track of the card objects and 
    //their value
    cardList = document.querySelectorAll("li");
    cardValueList = document.querySelectorAll("p");
    //the symbols3 array will hold 2 times the number
    //of symbols the user chose per game requirnments
    symbols3 = [symbols * 2];

    //fill the symbols3 array with 2 of each symbol
    for(var i = 0; i < symbols; i++)
    {
        symbols3[i] = symbols1[i];
        symbols3[i+symbols] = symbols2[i];
    }
    //fill the cards array with all the objects from the 
    //cardList node list so the objects can be manipulated 
    //and give them a class of "card". Also, adds 3 event
    //listeners for the needed function calls
    for(var j = 0; j < cardList.length; j++)
    {
        cards.push(cardList[j]);
        cards[j].classList.toggle("card");
        cards[j].addEventListener("click", showCard);
        cards[j].addEventListener("click", cardFlipped);
        cards[j].addEventListener("click", victory);

    }
    //fill the cardValues array with all the objects from the 
    //cardValueList node list so the objects can be manipulated
    //assign a class of "cardValue"
    for(var a = 0; a < cardValueList.length; a++)
    {
        cardValues.push(cardValueList[a]);
        cardValues[a].classList.toggle("cardValue");
    }

    //fill the index array with total number of indexes needed
    for(var l = 0; l < symbols*2; l++)
    {
        indexArray[l] = l;
    }
    //shuffle the indexArray
    for(var p = 0; p < indexArray.length; p++)
    {
        var j = Math.floor(Math.random() * i)
        var temp = indexArray[p]
        indexArray[p] = indexArray[j]
        indexArray[j] = temp
    }
    //using the shuffled indexArray, assign the cardValues, which are 
    // p tags inside each card, with a random symbol and hide unnecessary cards
    for(var z = 0; z < cardValues.length; z++)
    {
        cardValues[z].innerHTML = symbols3[indexArray[z]];
        if(cardValues[z].innerHTML === "undefined")
        {
            cards[z].classList.toggle("hidden");
        }
        //set the id of each card to its value so a comparison can be made later
        cards[z].setAttribute("id", symbols3[indexArray[z]]);
        
    } 
}

//function to update the display of move numbers
function updateMoves()
{
    movesTitle.innerHTML = "Moves: " + moves.toString();
}

//function to show the card. Updates the class of each card with
//classes that modify display
function showCard()
{
    this.classList.toggle("flipped");
    this.classList.toggle("disabled");
}

//function to handle once a card is flipped
function cardFlipped()
{
    //push object into the flippedCards array
    flippedCards.push(this);
    var length = flippedCards.length;
    //if two cards have been selected increment moves 
    // and compare cards using the ids defined earlier
    if(length === 2)
    {
        moves++;
        updateMoves();
        if(flippedCards[0].id === flippedCards[1].id)
        {
            cardsMatch();
        }
        else
        {
            dontMatch();
        }
    }
}

//function that handles if the cards match. 
function cardsMatch()
{
    //assign the winning cards with classes that define them as matched
    //and disable them
    flippedCards[0].classList.add("matched", "disabled");
    flippedCards[1].classList.add("matched", "disabled");
    flippedCards[0].classList.remove("flipped");
    flippedCards[1].classList.remove("flipped");
    //clear flippedCards array for next pair
    flippedCards = [];
}

//function that handles if the cards don't match
function dontMatch()
{
    //temporarily disable game board until the cards are unflipped
    disableCards();
    //unflip cards after brief pause
    setTimeout(function(){
        flippedCards[0].classList.remove("flipped", "unmatched", "disabled");
        flippedCards[1].classList.remove("flipped", "unmatched", "disabled");
        //reenable game board
        enableCards();
        flippedCards = [];
    }, 800);
}

//function to disable game board so user can't overload the board
function disableCards()
{
    for(var i = 0; i < cards.length; i++)
    {
        cards[i].classList.add("disabled");
        
    }
}

//function that reenables board
function enableCards()
{
    
    for(var i = 0; i < cards.length; i++)
    {
        cards[i].classList.remove("disabled");
    }
    
}

//function that handles if the user wins. Hides game content and then creates and 
//displays victory message
function victory()
{
    if(matchedCards.length == symbols*2)
    {
        movesHeader.classList.toggle("hidden");
        gameBoard.classList.toggle("hidden");
        var jumbotron = document.createElement("h2");
        jumbotron.setAttribute("id", "victoryHeader");
        var victoryBody = document.createElement("p");
        victoryBody.setAttribute("id", "victoryBody");
        jumbotron.innerHTML = "Congratulations!";
        victoryBody.innerHTML = "You completed the game in " + moves.toString() + " moves!";
        gameBody.appendChild(jumbotron);
        gameBody.appendChild(victoryBody);
        //provides a button so user can play again
        var playAgainInput = document.createElement("button");
        playAgainInput.setAttribute("id", "playAgain");
        playAgainInput.setAttribute("onclick", "refreshPage()");
        playAgainInput.textContent = "Play Again?";
        gameBody.appendChild(playAgainInput);
    }
}

//function that refreshes the page if user wishes to play again
function refreshPage()
{
    location.reload();
}