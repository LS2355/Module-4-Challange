

var PostQuestions = document.querySelector("#questions");
var responses = document.querySelector(".responses");

const MyQuestions = [
    :
]
function createQuestion() {


var question = document.createElement("h1");
question.className = "question";
question.textContent = "What values can a boolian have!"
// this is the part that adds the element to the html page
PostQuestions.appendChild(question)
};

function showResponses () {

    for (i = 0;i < 3; i++) {
    //this is going to create the button number for the questions
    var buttonNum = i + 1;
    var test="testrtertret";
    var button = document.createElement("button");
    button.className = "btn";
    button.textContent = buttonNum + ". "+test;

    responses.appendChild(button);
}
};

function run() {
createQuestion();
showResponses();
} ;

