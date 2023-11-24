let moves = [];
let playerMoves = [];
let currentIndex = 0;
let currentLevel = 1;
const colors = ["green", "red", "yellow", "blue"];

function getRandom() {
    const value = Math.random();
    return Math.floor(value * 4);
}

function addNextMove() {
    moves.push(getRandom());
    console.log(moves);
}

function playMoves() {

    $.each(moves, function (index, value) {

        setTimeout(function () {
            const button = $("#" + colors[value]);

            setTimeout(function () {
                button.addClass("pressed");
                const sound = new Audio("sounds/" + colors[value] + ".mp3");
                sound.play();
            }, 500 * index);

            setTimeout(function () {
                button.removeClass("pressed");
            }, 500 * (index + 1));
        }, 400 * (index));
    },)

}

function addNextStage() {
    $("#level-title2").text("Current Level : " + currentLevel)
    addNextMove();
    setTimeout(function () {
        playMoves();
    }, 1000)


}

function lost() {
    currentLevel = 1
    setTimeout(function () {
        const body = $("body");

        setTimeout(function () {
            body.addClass("game-over");
            const sound = new Audio("sounds/wrong.mp3");
            sound.play();
        }, 500 * 1.1);

        setTimeout(function () {
            body.removeClass("game-over");
        }, 500 * (1.1 + 1));
    }, 300 * (1.1));
    $("#level-title2").text("Press Any Keyboard Key to Start");
    moves = [];
    playerMoves = [];
    currentIndex = 0;
}

$(".btn").on("click", function () {
    const sound = new Audio("sounds/" + this.id + ".mp3");
    const button = $("#" + this.id);
    sound.play();
    press(button);
    const buttonValue = $.inArray(this.id, colors);
    if (buttonValue === moves[currentIndex]) {
        currentIndex++

        if (currentIndex === moves.length) {
            currentLevel++;
            currentIndex = 0;
            addNextStage();
        }


    } else {
        currentIndex = 0
        lost()
    }

})

function press(button){
    setTimeout(function () {
                button.addClass("pressed");
            setTimeout(function () {
                button.removeClass("pressed");
            }, 200);
        }, 200);
    }

$(document).on("keypress", addNextStage)


