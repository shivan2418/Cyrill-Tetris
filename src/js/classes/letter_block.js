// Represents a hangul or jamo on the board
const {RU_TO_LAT_FULL,RUS_ALL_LETTERS_FULL} = require('../alphabet.js');

class LetterBlock{
    constructor(letter,syllabus){
        this.letter=letter;

        let readings = syllabus[letter];

        // more than 1 reading
        if (readings.includes(',')){
            let valid_readings = syllabus[letter].split(',');
            this.reading = valid_readings;
        }
        // just one reading
        else{
            this.reading = [ syllabus[letter] ]
        }
    }
}

module.exports = {LetterBlock: LetterBlock}