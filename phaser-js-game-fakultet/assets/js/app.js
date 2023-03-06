var config = {
    type: Phaser.AUTO,
    width: 850,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 300 },
            debug: false
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

var game = new Phaser.Game(config);

// variables
var timerValue;
var gameOver = false;

var timeText;
var counter = 60;
var totalPoints = 0;
var pointsText;

var leftButton;
var rightButton;

var leftTegImageOne;
var leftTegImageTwo;
var rightTegImageOne;
var rightTegImageTwo;

var leftTextImgTwo;
var leftTextImgOne;
var rightTextImgOne;
var rightTextImgTwo;

// random numbers
var left_side_numbers = {
    randomNmbLeftForOne: 0,
    randomNmbLeftForTwo: 0
};
var right_side_numbers = {
    randomNmbRightForOne: 0,
    randomNmbRightForTwo: 0
};

function preload () {
    this.load.image('pozadina', 'assets/images/background.png');
    this.load.image('teg', 'assets/images/teg.png');

    this.load.image('leftBtn', 'assets/images/leftBtn.png');
    this.load.image('equalBtn', 'assets/images/equalBtn.png');
    this.load.image('rightBtn', 'assets/images/rightBtn.png');
}

function create () {
    this.add.image(400, 300, 'pozadina');

    // TEXT in images - number of KG
    addTegovi(this);

    // TIMER
    if (!timerValue) {
        clearInterval(timerValue);
    }
    timerValue = setInterval(timeCounter, 1000);
    timeText = this.add.text(600, 16, 'Време: ' + counter, { fontSize: '32px', fill: 'brown' });

    // SCORE
    pointsText = this.add.text(350, 16, 'Поени: ' + totalPoints, { fontSize: '32px', fill: 'brown' });

    // QUESTION text
    this.add.text(180, 350, 'Која страна тежи повеќе ?', { fontSize: '28px', fill: 'brown' });

    // Buttons
    this.leftButton = this.add.sprite(200, 500, 'leftBtn').setInteractive();
    this.leftButton.displayWidth = 140;
    this.leftButton.displayHeight = 100;

    this.equalButton = this.add.sprite(400, 500, 'equalBtn').setInteractive();
    this.equalButton.displayWidth = 140;
    this.equalButton.displayHeight = 100;

    this.rightButton = this.add.sprite(600, 500, 'rightBtn').setInteractive();
    this.rightButton.displayWidth = 140;
    this.rightButton.displayHeight = 100;

    this.leftButton.on('pointerdown', () => { buttonActionClick('left', this) });
    this.equalButton.on('pointerdown', () => { buttonActionClick('equal', this) });
    this.rightButton.on('pointerdown', () => { buttonActionClick('right', this) });
}

function update() {
    if (gameOver) {
        return;
    }
}

// CUSTOM FUNCTIONS
function timeCounter()
{
        counter--;
        timeText.setText('Време: ' + counter);
        if(counter <= 0) {
            const swalWithBootstrapButtons = Swal.mixin({
                confirmButtonClass: 'btn btn-yes',
                cancelButtonClass: 'btn btn-no',
                buttonsStyling: false,
            })
            swalWithBootstrapButtons({
                text: "Времето истече, вашите освоени поени се: " + totalPoints,
                type: 'success',
                showCancelButton: true,
                confirmButtonText: 'Нова игра',
                cancelButtonText: 'Исклучи игра',
                reverseButtons: true
            }).then((result) => {
                if (result.value) {
                    document.location.reload();
                } else if ( result.dismiss === Swal.DismissReason.cancel ) {
                    gameOver = true;
                    game.destroy();
                }
            })

            gameOver = true;
            game.destroy();
            clearInterval(timerValue);
        }
}

function buttonActionClick(buttonClicked, gameInstanca) { // left/right/equal button onclick
    var total_left =  left_side_numbers.randomNmbLeftForOne + left_side_numbers.randomNmbLeftForTwo;
    var total_right =  right_side_numbers.randomNmbRightForOne + right_side_numbers.randomNmbRightForTwo;
    if(buttonClicked == 'left' && total_left > total_right) {
        totalPoints++;
        pointsText.setText('Поени: ' + totalPoints);
        correctAnswer();
    } else if(buttonClicked == 'right' && total_right > total_left) {
        totalPoints++;
        pointsText.setText('Поени: ' + totalPoints);
        correctAnswer();
    } else if(buttonClicked == 'equal' && total_right == total_left) {
        totalPoints++;
        pointsText.setText('Поени: ' + totalPoints);
        correctAnswer();
    } else {
        wrongAnswer();
    }

    destroyImagesAndText(gameInstanca);
}

function correctAnswer() {
    swal({
        title: "ТОЧНО!",
        type: "success",
        timer: 1000
    });
}

function wrongAnswer() {
    swal({
        title: "НЕТОЧНО!",
        type: "error",
        timer: 1000
    });
}

function destroyImagesAndText(gameInstanca) {
    leftTegImageOne.destroy();
    leftTegImageTwo.destroy();
    rightTegImageOne.destroy();
    rightTegImageTwo.destroy();
    leftTextImgOne.destroy();
    leftTextImgTwo.destroy();
    rightTextImgOne.destroy();
    rightTextImgTwo.destroy();
    addTegovi(gameInstanca); // again render tegovi with KG text
}

// random tegovi
function addTegovi(gameInstanca) {
    // LEFT side images
    leftTegImageTwo = gameInstanca.add.image(150, 200, 'teg');
    leftTegImageOne = gameInstanca.add.image(250, 200, 'teg');
    
    // RIGHT side images
    rightTegImageOne = gameInstanca.add.image(550, 200, 'teg');
    rightTegImageTwo = gameInstanca.add.image(650, 200, 'teg');

    // LEFT SIDE
    left_side_numbers.randomNmbLeftForOne = randomIntFromInterval(1, 10);
    leftTextImgOne = gameInstanca.add.text(230, 200, left_side_numbers.randomNmbLeftForOne + 'кг', { fontSize: '26px', fill: 'white' });
    left_side_numbers.randomNmbLeftForTwo = randomIntFromInterval(1, 10);
    leftTextImgTwo = gameInstanca.add.text(130, 200, left_side_numbers.randomNmbLeftForTwo + 'кг', { fontSize: '26px', fill: 'white' });
    // RIGHT SIDE
    right_side_numbers.randomNmbRightForOne = randomIntFromInterval(1, 10);
    rightTextImgOne = gameInstanca.add.text(520, 200, right_side_numbers.randomNmbRightForOne + 'кг', { fontSize: '26px', fill: 'white' });
    right_side_numbers.randomNmbRightForTwo = randomIntFromInterval(1, 10);
    rightTextImgTwo = gameInstanca.add.text(630, 200, right_side_numbers.randomNmbRightForTwo + 'кг', { fontSize: '26px', fill: 'white' });

    let randomNmbLeft = randomIntFromInterval(1, 2);
    if(randomNmbLeft == 1) {
        leftTegImageTwo.destroy();
        leftTextImgTwo.destroy();
    }

    let randomNmbRight = randomIntFromInterval(1, 2);
    if(randomNmbRight == 1) {
        rightTegImageTwo.destroy();
        rightTextImgTwo.destroy();
    }
}

// random number
function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}