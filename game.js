var gamePattern = [];
var userClickedPattern = [];
var level = 0
var buttonColor = ["red", "blue", "green", "yellow"]


    


    
   


$(document).keypress(function() {
    if (level === 0) {
        nextSequence();
    }
});






function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log("Success");
        
        // Check if user has finished the sequence
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
                userClickedPattern = []; // Reset userClickedPattern to an empty array
            }, 1000);
        }
    } else {
        console.log("Wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("h1").text("Game Over, Press Any Key to Restart");
        startOver();
        }
    }
    
    function nextSequence() {
        var randomNumber = Math.floor(Math.random() * 4); // Generate a random number between 0 and 3
        var randomChosenColor = buttonColor[randomNumber];
        gamePattern.push(randomChosenColor);
        $("#" + randomChosenColor).fadeOut(500, function() {
            $(this).fadeIn(500);
            playSound(randomChosenColor);

        });
        level++;
        $("h1").text("Level " + level);

    }


function playSound(col) {
    var mp = new Audio("sounds/" + col + ".mp3");
    mp.play();

}

$("#" + gamePattern[0]).fadeOut(500, function () {
    $(this).fadeIn(500);
    playSound(gamePattern[0]);
});

$(".btn").click(function (event) {
    var userChosenColor = event.target.id;
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length - 1);
})


function animatePress(currentColor) {

    $("#" + currentColor).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColor).removeClass("pressed")}
        ,100)
    
};

function startOver(){
    level = 0;
    gamePattern = [];
    userClickedPattern = [];

}

