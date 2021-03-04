const { RU_TO_LAT_FULL,RU_TO_LAT_HARD_ONLY, ALL_LETTERS_FULL,ALL_LETTERS_HARD_ONLY } = require('./alphabet.js');
const { Game } = require('./classes/game.js');
const { getRandomInt, random_choice, setCookie } = require("./classes/utility");
var $ = require("jquery");

  //DOM Manipulation

// Event handlers
function _correct_input(char, block) {
    try {
        return block.reading === char;
    } catch {
        null;
    }
}

function evaluate_input(e) {

    // Only evaluate input on enter
    if (e.key === 'Enter' || e.key === 'NumpadEnter') {
        //do nothing if no blocks on screen, just clear input
        if (window.game.blocks.length === 0) {
            $("input#letter_input").val("");
        } else {
            let block = window.game.blocks[0];
            let correct = _correct_input( $("input#letter_input").val()  , block);
            // clear the input
            $("input#letter_input").val("");
            //Get first letter div that does not have the cleared tag
            let letter = $('#canvas div:not(.cleared)').first();

            if (correct) {
                window.game.endless_points++;
            } else {
                if (window.game.endless_points > 0) {
                    window.game.endless_points--;
                }
                Game.show_wrong_answer_hint(block.letter);
            }

            window.game.blocks.shift();
            letter.addClass('cleared');
            if (window.game.letters_on_screen>=1){
                window.game.letters_on_screen--;
            }
                window.game.update_state();
        }
    }
}

function load_exams() {
    //load from cookies
    create_exam("alphabet_full", ALL_LETTERS_FULL);
    create_exam("alphabet_hard_only", ALL_LETTERS_HARD_ONLY);

}

function create_exam(exam_name, letters) {

    let base = "";
    letters.forEach((letter_div) => {
        base += `<div class="exam_row">
                     <div id=${letter_div} class="exam_item">${letter_div}</div>
                     <div id=${letter_div}0 class="exam_box failed"></div>
                     <div id=${letter_div}1 class="exam_box failed"></div>
                     <div id=${letter_div}2 class="exam_box failed"></div>
                 </div>`
    });
    $(`#${exam_name}`).append(base);
}

function show_exams() {
    $('#exams').slideToggle('slow');
    $('#canvas_wrapper').toggleClass('hide');
}

function toggle_exam() {
    $("#exam_mode").addClass('active');
    $("#endless_mode").removeClass('active');
    $("#exams").show();
    $('#syllabus').hide();
    $("#points").hide()
    window.game.current_mode = 'exam';

}

function set_full_syllabus(){
    //Selects what syllabus to use (what letters to pick form for challenge)
    window.game._set_syllabus(ALL_LETTERS_FULL);
    $('#btn_alphabet_full').addClass('active');
    $('#btn_alphabet_hard_only').removeClass('active');
}

function set_hard_only_syllabus(){
    window.game._set_syllabus(ALL_LETTERS_HARD_ONLY);
    $('#btn_alphabet_full').removeClass('active');
    $('#btn_alphabet_hard_only').addClass('active');
}

function toggle_endless() {
    $("#exam_mode").removeClass('active');
    $("#endless_mode").addClass('active');
    $("#exams").hide();
    $("#points").show();
    window.game.current_mode = 'endless';
}

function toggle_syllabus(){
    $("#syllabus").toggle('fast');
}

function pause_game() {
    window.game.pause_game();
}

//add event listeners
document.getElementById("show_exams").addEventListener('click', show_exams);
document.getElementById('endless_mode').addEventListener('click', toggle_endless);
document.getElementById('exam_mode').addEventListener('click', toggle_exam);
document.getElementById('pause').addEventListener('click', pause_game);

document.getElementById('btn_alphabet_full').addEventListener('click',set_full_syllabus);
document.getElementById('btn_alphabet_hard_only').addEventListener('click',set_hard_only_syllabus);


document.getElementById('syllabus_btn').addEventListener('click', toggle_syllabus);
document.getElementById("letter_input").addEventListener('keydown', evaluate_input);



$(document).ready(function () {
    load_exams();
    letters_on_screen = 0;
    canvas = $("#canvas");
    window.game = new Game();
    window.game.start_game();
    window.game.main_loop();
});