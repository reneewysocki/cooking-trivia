$(document).ready(function () {
    var questionCounter = 0;
    var timer = 30;
    var correct = 0;
    var incorrect = 0;
    var unanswered = 0;
    var theClock;
    var startScreen;
    var gameHTML;

    var questions = [
        {
            question: 'What pasta shape means "little ears" in Italian?',
            imageUrl: "<img src='assets/images/orecchiette.jpg'  width='500' height=auto>",
            choices: ["Tagliatelle", "Cavatappi", "Orecchiette", "Campanelle"],
            correctAnswer: "Orecchiette",
        },
        {
            question: 'What term means "to cut vegetables, fruits, or cheeses into thin strips"?',
            imageUrl: "<img src='assets/images/julienne.jpg' width='500' height=auto'>",
            choices: ["Julienne", "Chiffonade", "Dice", "Bruinoise"],
            correctAnswer: "Julienne",
        },
        {
            question: 'V.S., V.S.O.P., and V.V.S.O.P. are all different ratings of what?',
            imageUrl: "<img src='assets/images/alcohol.jpg' width='500' height=auto'>",
            choices: ["Tequila", "Cognac", "Whiskey", "Wine"],
            correctAnswer: "Cognac",
        },
        {
            question: 'What is court-bouillon?',
            imageUrl: "<img src='assets/images/court-bouillon.jpg' width='500' height=auto'>",
            choices: ["French seasoning blend", "Clarified stock", "Water bath for keeping things warm", "Broth used to poach other foods"],
            correctAnswer: "Broth used to poach other foods",
        },
        {
            question: 'A roux is typically made with flour and what else?',
            imageUrl: "<img src='assets/images/roux.jpg' width='500' height=auto'>",
            choices: ["Butter", "Stock", "Egg whites", "Water"],
            correctAnswer: "Butter",
        },
        {
            question: 'What temperature should poultry be cooked to?',
            imageUrl: "<img src='assets/images/poultry-temp.jpg' width='500' height=auto'>",
            choices: ["125°", "185°", "165°", "150°"],
            correctAnswer: "165°",
        },
        {
            question: 'What is ther difference between broth and stock?',
            imageUrl: "<img src='assets/images/stock.jpg' width='500' height=auto'>",
            choices: ["Broth is completely clear", "Stock is reduced by half", "Broth is made with meat, not just bones", "Broth is cooked for a shorter amount of time"],
            correctAnswer: "Broth is made with meat, not just bones",
        },
        {
            question: 'What is the difference between ice cream and gelato?',
            imageUrl: "<img src='assets/images/gelato.jpg' width='500' height=auto'>",
            choices: ["Gelato has less fat and air", "Gelato has more fat and less air", "Gelato has more air and less less", "Gelato contains egg whites"],
            correctAnswer: "Gelato has less fat and air",
        },
        {
            question: 'What herb is this?',
            imageUrl: "<img src='assets/images/tarragon.jpg' width='500' height=auto'>",
            choices: ["Rosemary", "Dill", "Coriander", "Tarragon"],
            correctAnswer: "Tarragon",
        },
    ];

    //creates start button on initial screen
    function startButton() {
        startScreen = "<p class='text-center'><a class='btn btn-primary start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

    startButton();

    //gives start button functionality
    $("body").on("click", ".start-button", function (event) {
        generateHTML();
        timerWrapper();
    });

    //generates the question
    function generateHTML() {
        gameHTML = "<p class='text-center timerP'>Time: <span class='timer'> 30 </span></p><p class='hintImageP'>" + questions[questionCounter].imageUrl + "</p><p class='text-left questionP'>" + questions[questionCounter].question + "</p><p class='answer'>" + questions[questionCounter].choices[0] + "</p><p class='answer'>" + questions[questionCounter].choices[1] + "</p><p class='answer'>" + questions[questionCounter].choices[2] + "</p><p class='answer'>" + questions[questionCounter].choices[3] + "</p>";
        $(".mainArea").html(gameHTML);
    }

    //allows answers to be clicked and compared.
    $("body").on("click", ".answer", function (event) {
        //answeredQuestion = true;
        var selectedAnswer = $(this).text();
        //console.log(selectedAnswer);
        //console.log(questions[questionCounter].correctAnswer);
        if (selectedAnswer === questions[questionCounter].correctAnswer) {
            // console.log("Correct Answer");
            generateWin();
            clearInterval(theClock);
        }
        else {
            //console.log("Incorrect Answer");
            generateLoss();
            clearInterval(theClock);
        }
    });

    function generateWin() {
        correct++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + questions[questionCounter].correctAnswer + "</p>" + questions[questionCounter].imageUrl;
        $(".mainArea").html(gameHTML);
        setTimeout(next, 2000);
    };

    function generateLoss() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + questions[questionCounter].correctAnswer + "</p>" + "<img class='center-block img-wrong' src='assets/images/ramsey/are-you-kidding-me.gif'>";
        $(".mainArea").html(gameHTML);
        setTimeout(next, 2000);
        incorrect++;
    };

    function generateTimeOut() {
        unanswered++;
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + questions[questionCounter].correctAnswer + "</p>" + "<img class='center-block img-wrong' src='assets/images/ramsey/can-you-wake-up.gif'>";
        $(".mainArea").html(gameHTML);
        setTimeout(next, 3000);

    }

    function next() {
        if (questionCounter < (questions.length - 1)) {
            questionCounter++;
            generateHTML();
            timer = 30;
            timerWrapper();
        }
        else {
            finalScreen();
            timer = 0;
            console.log("end")
        }
    };

    function timerWrapper() {
        theClock = setInterval(thirtySeconds, 1000);
        function thirtySeconds() {
            if (timer === 0) {
                clearInterval(theClock);
                generateTimeOut();
            }
            if (timer > 0) {
                timer--;
            }
            $(".timer").html(timer);
        }
    };

    function finalScreen() {
        gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + timer + "</span></p>" + "<p class='text-center'>Here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + incorrect + "</p>" + "<p>Unanswered: " + unanswered + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
        $(".mainArea").html(gameHTML);
    }

    $("body").on("click", ".reset-button", function () {
        resetGame();
    });

    function resetGame() {
        questionCounter = 0;
        correct = 0;
        incorrect = 0;
        unanswered = 0;
        timer = 30;
        generateHTML();
        timerWrapper();
    }

});
