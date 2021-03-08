// Represents a hangul or jamo on the board
const {RU_TO_LAT_FULL,ALL_LETTERS_FULL} = require('../alphabet.js');

class LetterBlock{
    constructor(letter){
        this.letter=letter;

        let readings = RU_TO_LAT_FULL[letter];

        // more than 1 reading
        if (readings.includes(',')){
            let valid_readings = RU_TO_LAT_FULL[letter].split(',');
            this.reading = valid_readings;
        }
        // just one reading
        else{
            this.reading = [ RU_TO_LAT_FULL[letter] ]
        }
    }
}

module.exports = {LetterBlock: LetterBlock}