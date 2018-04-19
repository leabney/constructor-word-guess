//require Word & inquirer & chalk//
var Word = require('./word');
var inquirer = require('inquirer');
var chalk = require('chalk');

//setup validation for inquirer//
const requireSingleCharacter = value => {
    if (/^[a-zA-Z]+$/.test(value) && value.length === 1) {
        return true;
    }
    return 'Your guess should be a single letter.';
};

//additional variables//
var userGuess;
var words = ['The Lion King', 'Snow White and the Seven Dwarfs', 'Aladdin', 'Sleeping Beauty', 'The Little Mermaid', 'Lady and the Tramp', 'Toy Story', 'Bambi', 'Brave', 'Pinocchio', 'Alice in Wonderland', 'Cars', 'The Incredibles', 'The Hunchback of Notre Dame', 'Pocahontas', 'Dumbo', 'Beauty and the Beast', 'Fantasia', 'Mulan', 'Tangled', 'Frozen', 'Moana']
var current;
var currentWord;
var lettersLeft = 0;
var guesses;

//letters remaining//
function lettersRemaining() {
    lettersLeft = 0;
    for (var i = 0; i < currentWord.letters.length; i++) {
        if (currentWord.letters[i].guessed === 'false') {
            lettersLeft++;
        }
    }
}

//new word function//
function newWord() {
    current = words[Math.floor(Math.random() * words.length)];
    currentWord = new Word(current);
    letterGuess();
    guesses = 10;
}


//game setup//
function gameSetup(){
console.log('');
console.log(chalk.bgCyan('************************************'));
console.log(chalk.bgCyan('*  Welcome to Disney Movie Title   *'));
console.log(chalk.bgCyan('*          Word Guess Game         *'));
console.log(chalk.bgCyan('************************************'));
console.log('');
newWord();
}


function letterGuess() {
    console.log('');
    console.log('');
    console.log(chalk.cyan('Disney Movie Title:'));
    console.log('');
    console.log(chalk.cyan(currentWord.display()));
    console.log('');

    inquirer.prompt([
        {
            type: 'input',
            message: 'Enter your guess: ',
            name: 'guess',
            validate: requireSingleCharacter
        }

    ]).
        then(function (inquirerResponse) {
            var correct = false;
            userGuess = inquirerResponse.guess;

            currentWord.guess(userGuess);
            for (var i = 0; i < currentWord.letters.length; i++) {
                if (userGuess.toUpperCase() === currentWord.letters[i].character.toUpperCase()) {
                    correct = true;
                }
            }         

            if(correct===true){
                console.log('');
                console.log(chalk.green('Correct!'));
            }
            else{
                guesses--;

                if(guesses>0){
                console.log('');
                console.log(chalk.red('Incorrect!  '+ guesses + ' guess remaining.'))
                }
            };

            lettersRemaining();

            if (lettersLeft > 0 && guesses >0) {
                letterGuess();
            }
            else if (guesses===0){
                    console.log('');
                    console.log(chalk.bgRed('*************'));
                    console.log(chalk.bgRed('* GAME OVER *'));
                    console.log(chalk.bgRed('*************'));  
                    console.log('');
                    console.log('The correct response was: '+ current);
                    console.log('');

                inquirer.prompt([
                    {type: 'list',
                    choices: ['Yes','No'],
                    message: 'Would you like to play again?',
                    name: 'again'}
                ]).
                then(function(inquirerResponse){
                    if(inquirerResponse.again==='Yes'){
                        gameSetup();
                    }
                    else{
                        console.log('');
                        console.log(chalk.bgCyan('*****************************************'));
                        console.log(chalk.bgCyan('* Thanks for playing!  Come back again! *'));
                        console.log(chalk.bgCyan('*****************************************'));
                    }
                })
            }
            else {
                console.log('');
                console.log('');
                console.log('');
                console.log(chalk.bgCyan('*******************************************'));
                console.log(chalk.bgCyan('* You got it right! On to the next movie! *'));
                console.log(chalk.bgCyan('*******************************************'));
                console.log('');
                newWord();
            }
        })
};

gameSetup();