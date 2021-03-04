// Global settings module

//Animation
var HINT_FADEIN= 500;
var HINT_DELAY = 1000;
var HINT_FADEOUT = 500;

// CANVAS
var XCOLS = 20;
var COL_WIDTH = 20;

var YROWS = 30;
var ROW_HEIGHT = 20;

var width = XCOLS*COL_WIDTH;
var height = YROWS*ROW_HEIGHT;

// BLOCKS
var MAX_BLOCKS_ON_SCREEN = 4

// how many ms for a letter to drop from top to bottom
var BLOCK_SPEED = 7000;
var NEW_BLOCK_DELAY = 4;
module.exports= {NEW_BLOCK_DELAY, XCOLS,COL_WIDTH,YROWS,ROW_HEIGHT,width,height,MAX_BLOCKS_ON_SCREEN,BLOCK_SPEED,HINT_FADEIN,HINT_FADEOUT,HINT_DELAY};

