const { LetterBlock } = require("./letter_block.js");
const { ALL_LETTERS, RU_TO_LAT } = require("../alphabet.js");
const { XCOLS, COL_WIDTH, ROW_HEIGHT, YROWS } = require('../settings.js');
const { setCookie, getRandomInt, random_choice } = require('./utility');

class Game {

    running = false;
    endless_points = 0;
    block_speed = 10000;
    blocks = [];
    current_mode = 'endless';
    blocks_seen = 0;
    round = 0;
  
    last_block_added_time = null;
    last_blocked_added_in_round = 0;
    
    // Constants
    MAX_BLOCKS_ON_SCREEN = 5; // max blocks at once on screen
    NEW_BLOCK_DELAY = 3; // second delay between adding new blocsk
  
    shown_blocks_endless = {}

  show_wrong_answer_hint(letter) {
      //Show a hint with the jamo and the reading. 
      $("#wrong_answer_hint").text(`${letter} : ${RU_TO_LAT[letter]}`);
      $("#wrong_answer_hint").fadeIn(500).delay(500).fadeOut(500);
  }
  


  move_latest_letter() {
    let canvas = $("#canvas");
    let letter = $("#canvas div:last-child");
    letter.animate(
      {
        top: `${canvas.height() - letter.height()}px`
      },
      {
        'duration': this.block_speed, "complete": function () {
          letters_on_screen--;
          window.game.blocks.shift();
          console.log(`letters on screen:${letters_on_screen}`)
          window.game.show_wrong_answer_hint($(this).text());
          $(this).remove();
        },
        'progress': function (animation, progress, msRemaining) {
          if (msRemaining < this.block_speed/3 && !$(this).hasClass("red_text")) {
            $(this).addClass('red_text')
          }
        },
        "easing": "linear"
      }

    );
  }

  add_letter_to_canvas(letter) {
    let new_letter_block = new LetterBlock(letter);
    this.blocks.push(new_letter_block);
    console.log(this.blocks);
    this.last_block_added_time = Math.floor(Date.now() / 1000);
    letters_on_screen++;

    $('#canvas').append(`<div class='alive canvas_jamo'>${letter}</div>`)

    let new_letter = $("#canvas div:last-child");
    let canvas_width = $("#canvas").width();
    let letter_width = new_letter.width();

    let minimum = 0;
    let maximum = canvas_width - letter_width;
    let pos = getRandomInt(minimum, maximum);
    // Adjust letter css
    new_letter.css("right", `${pos}px`);
    new_letter.css("top", `-16px`);

    this.move_latest_letter();

  }






  choose_new_block_endless() {
    return random_choice(ALL_LETTERS);

  }

  choose_new_block_exam() {
    null;
  }


  // Game state
  update_state() {
    $("#points").text(`${this.endless_points}`);
  }

  main_loop() {
    setInterval(() => {
      if (this.current_mode === 'endless') {
        this.endless_main_loop();
      } else {
        this.exam_main_loop();
      }

    }, 1000);
  }

  endless_main_loop() {

    if (letters_on_screen>=this.MAX_BLOCKS_ON_SCREEN){
      return;
    }
    if ( (Math.floor(Date.now() / 1000)-this.last_block_added_time) < this.NEW_BLOCK_DELAY ){
      return;
    }

    let letter = this.choose_new_block_endless();
    this.add_letter_to_canvas(letter);

    this.last_blocked_added_in_round = this.round;

  }

  exam_main_loop() {
    console.log('exam');
    null;
  }

  start_game() {
    if (!this.running) {
      // this.reset_game();
      this.running = true;
    }
  }
  reset_game() {
    this.running = false;
    this.blocks_seen = 0;
    this.endless_points = 0;
    this.blocks = [];
    this.block_speed = 1000;
    this.round = 0;
    this.last_blocked_added_in_round = 0;
    this.update_state();


  }
  pause_game() {
    this.running ? this.running = false : this.running = true;
    this.running ? $("#pause").val("Pause game") : $("#pause").val("Resume game");
    console.log(this.running);
  }
}

module.exports = { Game };
