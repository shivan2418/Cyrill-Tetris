const { RU_TO_LAT, ALL_LETTERS } = require('./alphabet.js');
const { Game } = require('./classes/game.js');
const { getRandomInt, random_choice, setCookie } = require("./classes/utility");
var $ = require("jquery");

  //DOM Manipulation

// Event handlers
function check_input_correct(text_input, jamo_on_screen) {
    let correct = RU_TO_LAT[text_input] === jamo_on_screen;
    return correct;
}

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
            window.game.blocks.shift();
            if (correct) {
                window.game.endless_points++;
                $("#canvas div:first-child").stop();
                $("#canvas div:first-child").remove();
                

            } else {
                if (window.game.endless_points > 0) {
                    window.game.endless_points--;
                }
                window.game.show_wrong_answer_hint(block.letter);
            }
            letters_on_screen--;
            window.game.update_state();
        }
    }
}

function load_exams() {
    //load from cookies
    create_exam("alphabet", ALL_LETTERS)

}

function create_exam(exam_name, letters) {

    let base = "";
    letters.forEach((jamo_div) => {
        base += `<div class="exam_row">
                     <div id=${jamo_div} class="exam_item">${jamo_div}</div>
                     <div id=${jamo_div}0 class="exam_box failed"></div>
                     <div id=${jamo_div}1 class="exam_box failed"></div>
                     <div id=${jamo_div}2 class="exam_box failed"></div>
                 </div>`
    });
    $(`#${exam_name}`).append(base);
}

function show_exams() {
    $('#exams').slideToggle('slow');
    $('#canvas_wrapper').toggleClass('hide');
}

function add_letter() {
    let letter = random_choice(ALL_LETTERS);

    $('#canvas').append(`<div class='alive canvas_jamo'>${letter}</div>`)
    letters_on_screen++;
    let new_letter = $("#canvas div:last-child");
    let canvas_width = $("#canvas").width();
    let letter_width = new_letter.width();

    let minimum = 0;
    let maximum = canvas_width - letter_width;
    let pos = getRandomInt(minimum, maximum);
    // Adjust letter css
    new_letter.css("right", `${pos}px`);
    new_letter.css("top", `-${new_letter.height() / 2}px`);

    move_latest_letter();
}

function move_latest_letter() {
    let canvas = $("#canvas");
    let letter = $("#canvas div:last-child");
    letter.animate(
        {
            top: `${canvas.height() - letter.height()}px`
        },
        {
            'duration': 5000, "complete": function () {
                letters_on_screen--;
                console.log(`letters on screen:${letters_on_screen}`)
                show_wrong_answer_hint($(this).text());
                $(this).remove();
            },
            'progress': function (animation, progress, msRemaining) {
                if (msRemaining < 2500 && !$(this).hasClass("red_text")) {
                    $(this).addClass('red_text')
                }
            },
            "easing": "linear"
        }

    );
}

function toggle_exam() {
    $("#exam_mode").addClass('active');
    $("#endless_mode").removeClass('active');
    $("#exams").show();
    $("#points").hide()
    window.game.current_mode = 'exam';

}

function toggle_endless() {
    $("#exam_mode").removeClass('active');
    $("#endless_mode").addClass('active');
    $("#exams").hide();
    $("#points").show();
    window.game.current_mode = 'endless';

}

function pause_game() {
    window.game.pause_game();
}

//add event listeners
document.getElementById("show_exams").addEventListener('click', show_exams);
document.getElementById('endless_mode').addEventListener('click', toggle_endless);
document.getElementById('exam_mode').addEventListener('click', toggle_exam);
document.getElementById('pause').addEventListener('click', pause_game)
document.getElementById("letter_input").addEventListener('keydown', evaluate_input)

$(document).ready(function () {
    load_exams();
    letters_on_screen = 0;
    canvas = $("#canvas");
    window.game = new Game();
    window.game.start_game();
    window.game.main_loop();
});