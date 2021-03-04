// Represents a hangul or jamo on the board
const {RU_TO_LAT,ALL_LETTERS} = require('../alphabet.js');

class LetterBlock{
    constructor(letter){
        this.letter=letter;
        this.reading = RU_TO_LAT[letter]
    }

}

module.exports = {LetterBlock: LetterBlock}