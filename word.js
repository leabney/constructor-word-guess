var Letter = require('./letter');

function Word(input) {
    this.letters = [];
    for (var i = 0; i < input.length; i++) {
        this.letters.push(new Letter(input[i], 'false'));
    };

    this.display = function () {
        var wordDisplay = '';
        for (var i = 0; i < this.letters.length; i++) {
            wordDisplay = wordDisplay + this.letters[i].display() + ' ';
        }
        return wordDisplay;
    };

    this.guess = function(input) {
        for (var i=0; i< this.letters.length; i++){
            this.letters[i].reveal(input);
        }
    
    }


}

module.exports = Word;