const { LetterBlock } = require("./letter_block.js");
const { ALL_LETTERS_FULL,ALL_LETTERS_HARD_ONLY, RU_TO_LAT_FULL } = require("../alphabet.js");
const { XCOLS, COL_WIDTH, ROW_HEIGHT, YROWS } = require('../settings.js');
const { setCookie, getRandomInt, random_choice } = require('./utility');
const {NEW_BLOCK_DELAY, BLOCK_SPEED,HINT_DELAY,HINT_FADEIN,HINT_FADEOUT} = require('../settings.js');

class Game {

    constructor(){

      this.running = false;
      this.endless_points = 0;
      this.block_speed = BLOCK_SPEED;
      this.blocks = [];
      this.current_mode = 'endless';
      this.current_exam = null;

    
      this.last_block_added_time = null;
      this.last_blocked_added_in_round = 0;
      
      this.letters_on_screen=0;

      //exam
      this.exam_progress={};

      //syllabus
      this.syllabus = ALL_LETTERS_FULL;

      // Constants
      this.MAX_BLOCKS_ON_SCREEN = 5; // max blocks at once on screen
      this.NEW_BLOCK_DELAY = NEW_BLOCK_DELAY; // second delay between adding new blocsk
    
      this.shown_blocks_endless = {}

    }

    

  static show_wrong_answer_hint(letter) {
      //Show a hint with the jamo and the reading. 
      $("#wrong_answer_hint").text(`${letter} : ${RU_TO_LAT_FULL[letter]}`);
      $("#wrong_answer_hint").fadeIn(HINT_FADEIN).delay(HINT_DELAY).fadeOut(HINT_FADEOUT);
  }
  

  move_latest_letter() {
    let canvas = $("#canvas");
    let letter = $("#canvas div:last-child");
    let game = this;
    letter.animate(
      {
        top: `${canvas.height() - letter.height()}px`
      },
      {
        'duration': game.block_speed, 
        "done": function () {


          // If this letter has already been cleared then just do nothing.
          if (!$(this).hasClass('cleared')){
            Game.show_wrong_answer_hint($(this).text());
            game.letters_on_screen--;
            game.blocks.shift();
            
          } 
          $(this).remove();         
          
        },
        'progress': function (animation, progress, msRemaining) {
          if (msRemaining < game.block_speed/2 && !$(this).hasClass("red_text")) {
            $(this).addClass('red_text')
          }
        },
        "easing": "linear"
      }

    );
  }

  add_letter_to_canvas(letter) {
    let new_letter_block = new LetterBlock(letter);
    console.log(`${new_letter_block.letter}:${new_letter_block.reading}`);
    this.blocks.push(new_letter_block);
    this.last_block_added_time = Math.floor(Date.now() / 1000);
    this.letters_on_screen++;

    $('#canvas').append(`<div class='alive canvas_letter'>${letter}</div>`)

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
    return random_choice(this.syllabus);

  }

  choose_new_block_exam() {
    
    // if all equally progressed then just choose one
    let unique_values = new Set(Object.values(this.exam_progress));
    if (unique_values.size===1){
      return random_choice(Object.keys(this.exam_progress));
    }

    // discard all that are not the lowest freq
    let min_progress = Math.min(...Object.values(this.exam_progress));
    let candidates = Object.entries(this.exam_progress).filter( ([key,value])=> value<=min_progress );
    candidates = candidates.map(el => el[0]);
    let choice = random_choice(candidates);
    return choice;
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

    }, 250);
  }

  endless_main_loop() {
     // skip if paused.
     if (!this.running){
      return;
    }
    
    // Skip if too many blocks on screen
    if (letters_on_screen>=this.MAX_BLOCKS_ON_SCREEN){
      return;
    }
    // Skip if block added too recently
    if ( (Math.floor(Date.now() / 1000)-this.last_block_added_time) < this.NEW_BLOCK_DELAY ){
      return;
    }

    let letter = this.choose_new_block_endless();
    this.add_letter_to_canvas(letter);

  }

  exam_main_loop() {

    // skip if paused.
    if (!this.running){
      return;
    }

    // Skip if too many blocks on screen
    if (letters_on_screen>=this.MAX_BLOCKS_ON_SCREEN){
      return;
    }
    // Skip if block added too recently
    if ( (Math.floor(Date.now() / 1000)-this.last_block_added_time) < this.NEW_BLOCK_DELAY ){
      return;
    }

    let letter = this.choose_new_block_exam();
    this.add_letter_to_canvas(letter);
    
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
    this.running ? $("#pause").text("Pause game") : $("#pause").text("Resume game");
    console.log(this.running);
  }

  _set_syllabus(syl){
    this.syllabus=syl;
  }

  _set_blockspeed(speed){
    this.block_speed=speed;
  }

  _reset_exam_progress(){
    //Takes the current syllabus and sets the counter of how many correct
    this.exam_progress={}
    this.syllabus.forEach(letter=>{
      this.exam_progress[letter]=0;
    });
  }

  _increase_progress(letter){
    if (this.exam_progress[letter]<3){
      this.exam_progress[letter]++;

      let first_element = $(`#${this.current_exam} #${letter}`);
      let first_failed = $(first_element).siblings().filter(':not(.passed)').first()
      first_failed.removeClass('failed');
      first_failed.addClass('passed');
    
    }    
  }

  _decrease_progress(letter){
    if (this.exam_progress[letter]>0){
      this.exam_progress[letter]--;

      let first_element = $(`#${this.current_exam} #${letter}`);
      let first_failed = $(first_element).siblings().filter(':not(.failed)').first()
      first_failed.addClass('failed');
      first_failed.removeClass('passed');

    }    

  }

}

module.exports = { Game };
