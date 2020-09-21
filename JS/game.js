var buttonColours = ["red", "green", "blue", "yellow"];

var gamePattern = [];
var userClickedPattern = [];

var level = 0;
var started = false;


$(document).on("keydown", function() {
  if (!started) {
    nextSequence();
    started = true;
  }
});

$(".panel").on("click", function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);

  playSounds(userChosenColour)

  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1)

});

function nextSequence() {

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(150).fadeOut(150).fadeIn(150);

  playSounds(randomChosenColour);

}

function playSounds(sound) {
  var playAudio = new Audio("sounds/" + sound + ".mp3");
  playAudio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");

  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed")
  }, 200);
}

function checkAnswer(currentLevel) {
  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
    if (gamePattern.length === userClickedPattern.length) {
      setTimeout(function() {
        nextSequence();
      }, 1000);
    }
  } else {
    $("body").addClass("game-over");
    playSounds("wrong");
    setTimeout(function() {
      $("body").removeClass("game-over");
    }, 300);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
