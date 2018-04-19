function Letter(character, guessed) {
    this.character = character;

    if (this.character === ' ') {
        this.guessed = 'true'
    }
    else { this.guessed = guessed };

    this.display = function () {
        if (this.guessed === true || this.character === ' ') {
            return character;
        }
        else {
            return '_';
        }
    }
    this.reveal = function (guess) {
        if (guess.toUpperCase() === this.character.toUpperCase()) {
            this.guessed = true;
            return guessed;
        }
    }


};

module.exports = Letter