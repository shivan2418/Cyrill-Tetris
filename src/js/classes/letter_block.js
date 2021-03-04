// Represents a hangul or jamo on the board
const {RU_TO_LAT_FULL,ALL_LETTERS_FULL} = require('../alphabet.js');

class LetterBlock{
    constructor(letter){
        this.letter=letter;
        this.reading = RU_TO_LAT_FULL[letter]
    }
}

module.exports = {LetterBlock: LetterBlock}