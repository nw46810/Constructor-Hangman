var prompt = require('prompt');
var clear = require('clear');
var Word = require('./word.js');
var gameFile = require('./game.js');



prompt.start();

game = {
	wordsWon : 0,
	guessesRemaining : 9, 
	currentWrd : null, 
	startGame : function (wrd){
		this.guessRemaining = 10;
		this.lettersAlreadyGuessed = "";
		//get a random word from the array
		this.currentWrd = new Word.Word(gameFile.wordsForGames.wordBank[Math.floor(Math.random()
			* gameFile.wordsForGames.wordBank.length)].toUpperCase());
		this.currentWrd.populateLetterObjectArray();
		this.keepPromptingUser();
	},
	
	keepPromptingUser : function(){
		var self = this;

		prompt.get(['guessLetter'], function(err, result) {
			clear();
			var promptInputEntered = result.guessLetter.toUpperCase();
			if (result.guessLetter.length>1 || self.lettersAlreadyGuessed.includes(promptInputEntered)
			 || /[^A-Z]/.test(promptInputEntered)) {
				console.log('\nERROR!!!, ' +
				'Please enter only one letter that has not been used already' +
				'\nThe letter or space you guessed is: ' + promptInputEntered +
				'\nLetters already guessed are '+self.lettersAlreadyGuessed +
			    '\n\nGuesses remaining: ', self.guessesRemaining + '\n' + 
			    self.currentWrd.wordRender(), '\nhere are the letters you guessed already: \n', self.lettersAlreadyGuessed);
				self.keepPromptingUser();
			}else{

		    console.log('The letter you guessed: ' + promptInputEntered);

		    self.lettersAlreadyGuessed += promptInputEntered;
		    //check if guess letter was correct
		    var howManyLettersInWordMatched = self.currentWrd.checkIfLetterFound(promptInputEntered);

		    //if incorrect then lose guess attempt
		    if (howManyLettersInWordMatched == 0){
		    	console.log('Please try again!');
		    	self.guessesRemaining--;
		    }else{
		    	console.log('Correct!');
	    		if(self.currentWrd.didWeFindTheWord()){
	    			console.log(self.currentWrd.wordRender() +'\n You did it, congratulations!');
			    	return; //end game
			    }
		    }

		    console.log('Guesses remaining: ', self.guessesRemaining);
		   	console.log(self.currentWrd.wordRender() + '\nCurrent letters you have guessed: \n'
		    	+ self.lettersAlreadyGuessed);

		    if ((self.guessesRemaining > 0) && (self.currentWrd.found == false)){
		    	self.keepPromptingUser();
		    }
		    else if(self.guessesRemaining == 0){
		    	clear();
		    	console.log('Game over, you word was ', self.currentWrd.word, ', try again later');
		    }else{
		    	console.log(self.currentWrd.wordRender());
		    }
		}
		});

	}


};

game.startGame();