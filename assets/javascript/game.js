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
            imageUrl: "<img src='assets/images/orecchiette.jpg' class='answerImg img-fluid'>",
            choices: ["Tagliatelle", "Cavatappi", "Orecchiette", "Campanelle"],
            correctAnswer: "Orecchiette",
        },
        {
            question: 'What term means "to cut vegetables, fruits, or cheeses into thin strips"?',
            imageUrl: "<img src='assets/images/julienne.jpg' class='answerImg img-fluid'>",
            choices: ["Julienne", "Chiffonade", "Dice", "Bruinoise"],
            correctAnswer: "Julienne",
        },
        {
            question: 'V.S., V.S.O.P., and V.V.S.O.P. are all different ratings of what?',
            imageUrl: "<img src='assets/images/alcohol.jpg' class='answerImg img-fluid'>",
            choices: ["Tequila", "Cognac", "Whiskey", "Wine"],
            correctAnswer: "Cognac",
        },
        {
            question: 'What is autolyze?',
            imageUrl: "<img src='assets/images/autolyze.jpg' class='answerImg img-fluid'>",
            choices: ["Equal parts flour and water and a small amount of commerical yeast", "A mixture of water and flour that has been converted into a leavening agent", "A portion of the dough that is already populated with yeast", "A process in which flour and water are mixed and allowed to rest for a period of time"],
            correctAnswer: "A process in which flour and water are mixed and allowed to rest for a period of time",
        },
        {
            question: 'A roux is typically made with flour and what else?',
            imageUrl: "<img src='assets/images/roux.jpg' class='answerImg img-fluid'>",
            choices: ["Butter", "Stock", "Egg whites", "Water"],
            correctAnswer: "Butter",
        },
        {
            question: 'What temperature should poultry be cooked to?',
            imageUrl: "<img src='assets/images/poultry-temp.jpg' class='answerImg img-fluid'>",
            choices: ["125°", "185°", "165°", "150°"],
            correctAnswer: "165°",
        },
        {
            question: 'What is ther difference between broth and stock?',
            imageUrl: "<img src='assets/images/stock.jpg' class='answerImg img-fluid'>",
            choices: ["Broth is completely clear", "Stock is reduced by half", "Broth is made with meat, not just bones", "Broth is cooked for a shorter amount of time"],
            correctAnswer: "Broth is made with meat, not just bones",
        },
        {
            question: 'What is the difference between ice cream and gelato?',
            imageUrl: "<img src='assets/images/gelato.jpg' class='answerImg img-fluid'>",
            choices: ["Gelato has less fat and air", "Gelato has more fat and less air", "Gelato has more air and less less", "Gelato contains egg whites"],
            correctAnswer: "Gelato has less fat and air",
        },
        {
            question: 'What herb is this?',
            imageUrl: "<img src='assets/images/tarragon.jpg' class='answerImg img-fluid'>",
            choices: ["Rosemary", "Dill", "Coriander", "Tarragon"],
            correctAnswer: "Tarragon",
        },
    ];

    var reactionGifsBad = ["are-you-kidding-me.gif", "you-shouldnt-be-near-food.gif", "wrong.gif", "cant-even.gif", "seriously.gif", "get-your-shit-together.gif", "no-way.gif"];
    var reactionGifsGood = ["nice-work-there.gif", "dancing-in-kitchen.gif", "yes.gif", "alex-wink.gif", "still-got-it.gif", "rad.gif", "unstoppable.gif"];
    

    //creates start button on initial screen
    function startButton() {
        startScreen = "<div id='instructions'>Are you a food genius? <br> Could you make it in culinary school? <br> <b> Prove it! </b> <br> You'll have 30 seconds each to answer " +  (questions.length + 1) + " questions. <br> Push the button below to begin. </div><div id='startDiv' class='text-center'><a class='start-button btn-block' href='#' role='button'>Start Quiz</a></div>";
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
        gameHTML = "<p class='text-center timerP'><span id='timer'>Time: <span class='timer'> 30 </span></span></p><p id='hintImage' class='hintImageP'>" + questions[questionCounter].imageUrl + "</p><div id='question' class='text-center'><span class='question'><b>" + questions[questionCounter].question + "</b></span></div><div id='answerDiv'><div id='ans1' class='answer'>" + questions[questionCounter].choices[0] + "</div><div id='ans2' class='answer'>" + questions[questionCounter].choices[1] + "</div><div id='ans3' class='answer'>" + questions[questionCounter].choices[2] + "</div><div id='ans4' class='answer'>" + questions[questionCounter].choices[3] + "</div></div>";
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
        var randGoodGif = reactionGifsGood[Math.floor(Math.random() * reactionGifsGood.length)];
        gameHTML = "</span></p>" + "<p class='text-center'>Correct! <br> The answer is: <b>" + questions[questionCounter].correctAnswer + "</b></p>" + "<img src='assets/images/ramsey/" + randGoodGif + "' class='img-wrong img-fluid'>";
        $(".mainArea").html(gameHTML);
        setTimeout(next, 3000);
    };

    function generateLoss() {
        var randBadGif = reactionGifsBad[Math.floor(Math.random() * reactionGifsBad.length)];
        gameHTML = "</span></p>" + "<p class='text-center'>Wrong! <br> The correct answer is: <b>" + questions[questionCounter].correctAnswer + "</b></p>" + "<img src='assets/images/ramsey/" + randBadGif + "' class='img-wrong img-fluid'>";
        $(".mainArea").html(gameHTML);
        setTimeout(next, 3000);
        incorrect++;
    };

    function generateTimeOut() {
        unanswered++;
        gameHTML =  "<p class='text-center'>You ran out of time!  <br> The correct answer was: <b>" + questions[questionCounter].correctAnswer + "</b></p>" + "<img src='assets/images/ramsey/can-you-wake-up.gif' class='img-wrong'>";
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
            if (timer <= 10) {
                $('#timer').addClass("timerEnd");
            };
            $(".timer").html(timer);
        }
    };

    function finalScreen() {
        $('.timer').hide();
        gameHTML = "<div id='results' class='text-center'> <p> <h2>Here's how you did! </h2> </p>" + "<p class='summary-correct'>Correct Answers: " + correct + "</p>" + "<p>Wrong Answers: " + incorrect + "</p>" + "<p>Unanswered: " + unanswered + "</p> </div>" + "<p class='text-center reset-button-container'><a class='btn btn-block reset-button' href='#' role='button'>Retake The Quiz!</a></p>";
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
