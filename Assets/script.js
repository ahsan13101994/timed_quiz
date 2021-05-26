// All BUTTONS FUNCTIONS
// START BUTTON 
$(".btn-dark").on("click", function () {
    $(".card").hide();
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-section").show();
    $("#button-section").show();
    quiz.run();
    quiz.qNumber = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.askQuestion();
    document.getElementById('userInput').value = " ";
})

// RESET BUTTON
$(".btn-secondary").on("click", function () {
    $(".highScorePage").hide();
    $(".final-page").hide();
    $(".timer").show();
    $(".timer").html("Time: 75")
    $(".highScore").html("View Highscores");
    $(".question-section").show();
    $("#button-section").show();
    quiz.run();
    quiz.qNumber = 0;
    quiz.correct = 0;
    quiz.incorrect = 0;
    quiz.askQuestion();
})

// SUBMIT BUTTON
$("#submitButton").on("click", function () {
    $(".highScorePage").show();
    quiz.highScorePage();
})

//BACK BUTTON + Reset Button
$("#back").on("click", function () {
    clearInterval(quiz.countDownTimer);
    $(".question-section").hide();
    $("#button-section").hide();
    $(".highScorePage").hide();
    $(".card").show();
    $(".timer").show();
    $(".timer").html("Time: 75");
    $(".highScore").show();
    $("#hsArray").empty();

})

$("#resetButton").on("click", function () {
    localStorage.clear();
    $("#hsArray").hide();
})


//Highscore button on top
$(".highScore").on("click", function () {
    quiz.counter = 0;
    quiz.highScorePage();
})

$("#button-section").on("click", ".answerButton", function (e) {
    var selectedAnswer = $(e.target).attr("data-name");
    quiz.checkAnswer(selectedAnswer);
})

var Counter = 0;
var hrLine = document.createElement("hr");
var highScore = 0;
var quiz = {
    currentQuestion: "",
    correct: 0,
    incorrect: 0,
    counter: 0,
    countDownTimer: null,
    qNumber: 0,


//Timer
    run: function () {
        clearInterval(this.countDownTimer);
        this.countDownTimer = setInterval(this.decrement, 1000);
        quiz.counter = 75;
    },

    decrement: function () {
        quiz.counter--;
        $(".timer").html("Time: " + quiz.counter);
        if (quiz.counter <= 0) {
            $("#timeout")[0].play();
            quiz.counter = 0;
            clearInterval(quiz.countDownTimer);
            quiz.finalPage();
            $(".question-section").hide();
            $("#button-section").hide();
        }
    },

// Java Fundemental Quiz was taken from w3schools
    questions: [
        {
            qText: "Inside which HTML element do we put the JavaScript?",
            choices: ["<scripting>", "<script>", "<js>", "<javascript>"],
            answer: "<script>"
        },

        {
            qText: "The external JavaScript file must contain the <script> tag.",
            choices: ["True", "False"],
            answer: "False"
        },

        {
            qText: "How do you create a function in JavaScript?",
            choices: ["function myFunction[]", "function = myFunction()", "function:myFunction()", "function myFunction()"],
            answer: "function = myFunction()",
        },
      
        {
            qText: 'How do you call a function named "myFunction"?',
            choices: ["call function myFunction()", "call myFunction()", "myFunction()", "function.myFunction()"],
            answer: "myFunction()",
        },

        {
            qText: "How to write an IF statement in JavaScript?",
            choices: ["if(i == 5)", "if i == 5 then", "if i = 5", "if i = 5 then"],
            answer: "if(i == 5)",
        },
       
        {
            qText: "How does a WHILE loop start?",
            choices: ["while (i <= 10)", "while i = 1 to 10", "while(i <= 10;  i++)", "while i <= 10"],
            answer: "while (i <= 10)",
        },

        {
            qText: "How can you add a comment in a JavaScript?",
            choices: ["<!--This is a comment-->", '"This is a comment"', "// This is a comment", "***This is a comment***"],
            answer: "// This is a comment",
        },
    ],


    askQuestion: function () {
        $(".question-section").empty();
        $(".checkInput").empty();
        $(".ready").empty();
        $(".question-section").html("<p>" + this.questions[this.qNumber].qText + "</p>");
        this.buttonGenerator();
    },

    //BUTTON GENERATOR METHOD 
    buttonGenerator: function () {
        $("#button-section").empty();0 
        for (var i = 0; i < this.questions[this.qNumber].choices.length; i++) {
            $("#button-section").append("<li>");
            var a = $("<button>");
            a.addClass("answerButton");
            a.attr("data-name", this.questions[this.qNumber].choices[i]);
            a.text(this.questions[this.qNumber].choices[i]);
            $("#button-section").append(a);  
            $("#button-section").append("</li>");          
        };
    },

    // CHECK IF THE ANSWER IS CORRECT, WRONG OR TIMED OUT
    checkAnswer: function (selectedAnswer) {

        if (selectedAnswer === this.questions[this.qNumber].answer) {
            $("#win")[0].play();
            this.correct++;
            $(".checkInput").html("<hr id='win'/>Correct!");
            this.qNumber++;
        }
        else {
            $("#lose")[0].play();
            this.incorrect++;
            quiz.counter = quiz.counter - 10;
            $(".checkInput").html("<hr id='lose'/> Wrong!");
            this.qNumber++;
        }
        this.answerPage();
    },

    //ANSWER PAGE 
    answerPage: function () {
        setTimeout(function () {
            if (quiz.qNumber < quiz.questions.length) {
                quiz.askQuestion();
            }
            else {
                quiz.finalPage();
            }
        }, 1000
        )
    },

    viewHighScore: function () {
        $(".highScore").html("Highscore: " + highScore);
    },

    // Last Page
    finalPage: function () {
        $(".question-section").empty();
        $("#button-section").empty();
        $(".checkInput").empty();
        $(".timer").hide();
        $(".final-page").show();
        $("#message").html("<h2>All done!</h2><p>Here are your results:</p>");
        $("#score").html("Your final score is " + quiz.counter);
        $("#correct").html("Correct Guesses: " + this.correct);
        $("#incorrect").html("Incorrect Guesses: " + this.incorrect);
        clearInterval(quiz.countDownTimer);
    },

    // Highscore Log
    highScorePage: function () {
        clearInterval(quiz.countDownTimer);
        $(".card").hide();
        $(".final-page").hide();
        $(".timer").hide();
        $(".timer").html("Time: 75")
        $(".highScore").hide();
        $(".question-section").hide();
        $("#button-section").hide();
        $(".highScorePage").show();
        $("#hsArray").show();
        


        //Initals Styling
        var userScoreList = document.getElementById('userInput').value.toUpperCase().substring(0, 4); 
        if (userScoreList == false){
            userScoreList = "***";
        };
                
        const scoreValues = {
            score: quiz.counter,  
            initials: userScoreList  
        };

        const MAX_HIGH_SCORES = 5; 

        const highScoresArray = JSON.parse(localStorage.getItem("highScoresArray")) || [];
        highScoresArray.push(scoreValues);
        highScoresArray.sort((a, b) => b.score - a.score);
        highScoresArray.splice(5);

        //Local Score Storage
        localStorage.setItem('highScoresArray', JSON.stringify(highScoresArray));
        console.log(highScoresArray);

        // Create the list
        const highScoresList = document.getElementById("#hsArray");
        const highScores = JSON.parse(localStorage.getItem("highScoresArray")) || [];

            highScoresArray.map(scoreValues => {
                if(scoreValues.score !=0){
                console.log(scoreValues.initials + " --- " + scoreValues.score);
                $("#hsArray").append('<li>' + scoreValues.initials + " --- " + scoreValues.score + '</li>');
                }
            });
    }
}
