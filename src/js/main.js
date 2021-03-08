const {
    SYLLABUS_NAMES,
    SYLLABUS_DICT,
    RU_TO_LAT_FULL,
    RU_TO_LAT_HARD_ONLY,
    RUS_ALL_LETTERS_FULL,
    RUS_ALL_LETTERS_HARD_ONLY
} = require('./alphabet.js');
const {Game} = require('./classes/game.js');
const {getRandomInt, random_choice, setCookie} = require("./classes/utility");
var $ = require("jquery");

//DOM Manipulation

// Event handlers
function _correct_input(char, block) {
    try {
        return block.reading.indexOf(char) !== -1
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
            let correct = _correct_input($("input#letter_input").val(), block);
            // clear the input
            $("input#letter_input").val("");
            //Get first letter div that does not have the cleared tag
            let letter = $('#canvas div:not(.cleared)').first();

            if (correct) {
                if (window.game.current_mode === 'exam') {
                    window.game._increase_progress(letter.text());
                } else if (window.game.current_mode === 'endless') {
                    window.game.endless_points++;
                }

            } else if (!correct) {
                if (window.game.current_mode === 'exam') {
                    window.game._decrease_progress(letter.text());
                } else {
                    if (window.game.endless_points > 0) {
                        window.game.endless_points--;
                    }
                }
                window.game.show_wrong_answer_hint(block.letter);
            }

            window.game.blocks.shift();
            letter.addClass('cleared');
            if (window.game.letters_on_screen >= 1) {
                window.game.letters_on_screen--;
            }
            // if there are no more letters on the screen set the delay so that a new one can be added at once
            if (window.game.letters_on_screen === 0) {
                window.game.last_block_added_time = (Math.floor(Date.now() / 1000)) - 1000;
            }
            window.game.update_state();
        }
    }
}

function load_exams_and_syllabus() {
    // Creates exams and syllabus buttons based on alphabet.js
    Object.entries(SYLLABUS_DICT).forEach(([key, value]) => {
        create_exam(`${key}`, value);
        create_syllabus(key, value);
    });
}

function create_syllabus(exam_name, letters) {
    let new_syllabus_btn = `<button class="choose_syllabus btn btn-primary" data-name="${exam_name}">${SYLLABUS_NAMES[exam_name]}</button>`
    $("#syllabus_menu").append(new_syllabus_btn);
}

function create_exam(exam_name, letters) {
    //create button to select the exam
    let new_exam_btn = `<button class="choose_exam btn btn-primary"  id="btn_${exam_name}" data-name="${exam_name}">${SYLLABUS_NAMES[exam_name]}</button>`;

    $('#choose_exam_menu').append(new_exam_btn);

    // create div to hold the exam
    let new_exam = `<div data-exam=${exam_name} id=${exam_name} class=exam></div>`;
    $('#exams').append(new_exam);

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

function toggle_exam() {
    let disp = $("#choose_exam_menu").css('display')
    if (disp === "none") {
        $("#choose_exam_menu").show('fast');
    } else {
        $("#choose_exam_menu").hide('fast');
    }

}

function toggle_endless() {
    $("#exam_mode_btn").removeClass('active');
    $("#endless_mode_btn").addClass('active');
    $("#exams").hide();
    $("#points").show();
    window.game.current_mode = 'endless';
}

function toggle_speed() {
    $("#speed_menu").toggle('fast');
}

function toggle_syllabus() {
    $("#syllabus_menu").toggle('fast');
}

function toggle_challenge_mode(){
    window.game.challenge_mode = !window.game.challenge_mode;
    if (window.game.challenge_mode){
        $("#challenge_mode_btn").addClass('active')
    }else{
        $("#challenge_mode_btn").removeClass('active')
    }
}

function pause_game() {
    window.game.pause_game();
}

function toggle_show_hints() {
    window.game.show_hints = !window.game.show_hints;
}

//add event listeners
document.getElementById('endless_mode_btn').addEventListener('click', toggle_endless);
document.getElementById('exam_mode_btn').addEventListener('click', toggle_exam);
document.getElementById('pause_btn').addEventListener('click', pause_game);

document.getElementById('syllabus_btn').addEventListener('click', toggle_syllabus);
document.getElementById("letter_input").addEventListener('keydown', evaluate_input);

document.getElementById("speed_btn").addEventListener('click', toggle_speed);

document.getElementById('challenge_mode_btn').addEventListener('click',toggle_challenge_mode)

$('.speed_btn').on('click', (e) => {
    let speed = $(e.target).data('speed');
    window.game._set_blockspeed(speed);
    $('#speed_menu').hide('fast');
});


$('#speed_custom').on('click', (e) => {
    let speed = window.prompt('Enter how many seconds you have to answer');
    if (speed !== null && speed !== "" && parseFloat(speed) >= 0.1) ;
    window.game._set_blockspeed(parseFloat(speed) * 1000);
    $("#speed_menu").hide('fast');
});

$('#show_hints').on('change', (e) => {
    toggle_show_hints()
})


$(document).ready(function () {
    // Load exams
    load_exams_and_syllabus();

    // event listeners for dynamically created buttons
    $(".choose_syllabus").on('click', (e) => {
        let syl_name = $(e.target).data('name');
        let syl = SYLLABUS_DICT[syl_name];
        window.game._set_syllabus(syl);
        $('#syllabus_menu').hide('fast');
    });

    $('.choose_exam').on('click',(e)=>{
        let exam_name = $(e.target).data('name');
        let syl = SYLLABUS_DICT[exam_name];
        window.game._set_syllabus(syl);

        $(`#${exam_name}`).css('display','flex');

        $("#exam_mode_btn").addClass('active');
        $("#endless_mode_btn").removeClass('active');
        $("#choose_exam_menu").hide('fast');

    })

    // create game object in the global scope
    window.game = new Game();
    window.game.start_game();
    //start the main loop
    window.game.main_loop();
});