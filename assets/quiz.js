//this is what is going to be used for target
var quizContainer = document.querySelector(".quiz-container");
var build = document.querySelector(".QA");

//answers that were correct counter & game score
var AnswersThatWereCorrect = 0;
var score = 0;
//timer length and interval
    var sec = 30;
    var runtimer = setInterval (timer, 1000)

//questions used for quiz
var MQ =[
    {
        THEQuestions: "Who invented Javascript?",
    PossibleAnswers: {
        1: "Douglas Crockford",
        2: "Sheryl Sandberg",
        3: "Brendan Eich"
        },
    correctAnswer: 3
    },
    {
        THEQuestions: "Which one of these is a JavaScript package manager?",
    PossibleAnswers: {
        1: "Node.js",
        2: "TypeScript",
        3: "npm"
        },
    correctAnswer: 3
    },
    {
        THEQuestions: "Which tool can you use to ensure code quality?",
    PossibleAnswers: {
        1: "ESLint",
        2: "jQuery",
        3: "RequireJS"
        },
    correctAnswer: 1
    }
];



var onerun = 0;
//this is creating the QRD(Question and Response Divs) for the game & deleting Starting screen
function buildGame() {
    //if the homescreen exist then delete everything
    var HS = document.querySelectorAll(".start");
    if (HS){
        for(let deleteHS of HS) {
            deleteHS.remove();
        }
    }


    //questions div
    var QD = document.createElement("div");
    QD.id = "questions";
    build.appendChild(QD);

    //responses div
    var RD = document.createElement("div");
    RD.className = "responses";
    build.appendChild(RD);


};

var QN = 0;
var rise =0;
function QandA() {

    //if that object doesnt exist then return
    if (!MQ[QN]){
        console.log("out of questions");
        HighscorePage("Quiz Completed");
        return;
    }
    //makes questions
    var PostQuestions = document.querySelector("#questions");

    var question = document.createElement("h1");
    question.className = "question";
    question.textContent = MQ[QN].THEQuestions;//.questions
   
    // this is the part that adds the element to the html page
    PostQuestions.appendChild(question);
    
    //makes responses
    var responses = document.querySelector(".responses");
    for (i = 0;i < 3; i++) {
    //this is going to create the button number for the questions
    var buttonNum = i + 1;
    var button = document.createElement("button");
    button.className = "btn";
    button.id =buttonNum;
    button.setAttribute("name", "button")
    button.setAttribute("value", "nextQuestion");
    button.textContent = buttonNum + ". "+ MQ[QN].PossibleAnswers[buttonNum];//

    responses.appendChild(button);
    };
};



function HighscorePage () {
    buildGame();
    deleteTask();
    //delete/stop timer
    clearInterval(runtimer);
    document.querySelector(".timer").remove();
    //create the Highscore page
    var HighscorePageCreation = build;
    var HighscoreHeader = document.createElement("div");
    HighscoreHeader.className = "HighscoreHeader";
    var Header = document.createElement("h1");
    Header.textContent = "HIGH SCORE(S)";
    HighscoreHeader.appendChild(Header);
    HighscorePageCreation.appendChild(HighscoreHeader);
    var YourScoreBox = document.createElement("div");
    YourScoreBox.className = "score";
    var YourScore = document.createElement("h2")
    YourScore.textContent= "Your score was " + score;
    YourScoreBox.appendChild(YourScore);
    HighscorePageCreation.appendChild(YourScoreBox);

    console.log(score);
    
    
}



function answerchecker (userAnswer) {
    //this will use the box id and the QN (question number) variable to find the correct answer
    var rightOrWrong = document.querySelector(".rightOrWrong");    
    var answer = MQ[QN].correctAnswer;

    if(answer){
        if (answer == userAnswer){   
            rightOrWrong.textContent= "Correct!";
            AnswersThatWereCorrect++;
        }
        if (answer!= userAnswer){
            rightOrWrong.textContent= "Wrong!";
            sec= sec -10;
        }   
    }
    else {
        console.log("place holder");
    }

    QN =QN + 1;
    return;
}



function deleteTask () {
var PostQuestions = document.querySelector("#questions");
if(PostQuestions) {
    PostQuestions.remove();
}
var responses = document.querySelector(".responses");
if (responses) {
    responses.remove();    
}
};



function save () {
var score = 0
window.localStorage.setItem(user ,JSON.stringify(score))
}


function timer(){
        document.getElementById('countDown').innerHTML='00:'+sec;
        score = sec
        sec--;
        if (sec <= 0) { 
            clearInterval(timer);
            HighscorePage();
        }
}

//pretty much the controll of the whole application
function Clicked (){
//tells me the value of what was clicked on the screen within the quiz-container div
var selectedAnswer = event.target.value
console.log(selectedAnswer);
var userAnswer = event.target.id;
console.log(userAnswer);

//what ever the value was equal to will be what decided that the function will runn
if (!selectedAnswer){
    alert('nothing selected');
    return;
}
if (selectedAnswer == "startQuiz") {
    buildGame();
    QandA();
    timer( );
    return;
}
if(selectedAnswer == "nextQuestion"){
    answerchecker(userAnswer);
    deleteTask();
    buildGame();
    QandA();
}
if(selectedAnswer == "Highscore") {
    HighscorePage();
}

};


quizContainer.addEventListener("click", Clicked);
