$(document).ready(function () {
    questionCounter = 0;
    var timer = 30;

    var questions = [
        {
            question: 'What pasta shape means "little ears" in Italian?',
            imageUrl: "<img class='hintImage' src='assets/images/orecchiette.jpg'>",
            choices: ["Tagliatelle", "Cavatappi", "Orecchiette", "Campanelle"],
            correctAnswer: "Orecchiette",
        },
        {
            question: 'What term means "to cut vegetables, fruits, or cheeses into thin strips"?',
            imageUrl: "<img class='hintImage' src='assets/images/julienne.jpg'>",
            choices: ["Julienne", "Chiffonade", "Dice", "Bruinoise"],
            correctAnswer: "Julienne",
        }
    ];

    //creates start button on initial screen
    function startButton() {
        startScreen = "<p class='text-center'><a class='btn btn-primary start-button' href='#' role='button'>Start Quiz</a></p>";
        $(".mainArea").html(startScreen);
    }

   startButton();

   //gives start button functionality
   $("body").on("click", ".start-button", function(event){
    generateHTML();
    
   });

   //generates the question
   function generateHTML() {
	gameHTML = "<p class='text-center timerP'>Time: <span class='timer'> 30 </span></p><p class='hintImageP'>" + questions[questionCounter].imageUrl + "</p><p class='text-left questionP'>"  + questions[questionCounter].question + "</p><p class='answer'>A. " + questions[questionCounter].choices[0] + "</p><p class='answer'>B. "+ questions[questionCounter].choices[1] +"</p><p class='answer'>C. "+ questions[questionCounter].choices[2] +"</p><p class='answer'>D. "+ questions[questionCounter].choices[3] +"</p>";
    $(".mainArea").html(gameHTML);
}

});
