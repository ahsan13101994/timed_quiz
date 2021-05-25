

// TIMER
// Selects element by class
var timeEl = document.querySelector(".time");

// Selects element by id
var mainEl = document.getElementById("main");

var secondsLeft = 60;

function setTime() {
  // Sets interval in variable
  var timerInterval = setInterval(function() {
    secondsLeft--;
    timeEl.textContent = secondsLeft + " seconds left times up!";

    if(secondsLeft === 0) {
      // Stops execution of action at set interval
      clearInterval(timerInterval);
      // Calls function to create and append image
      sendMessage();
    }

  }, 1000);
}

// Function to create and append colorsplosion image
function sendMessage() {
  timeEl.textContent = " ";
  var quizOver = document.createElement("div");
  quizOver.textContent = "Times UP! 🐱.";
  mainEl.appendChild(quizOver);

}

setTime();

// Section - subtract time from timer Interval if question is wrong
var count = 0;
//  Select increment and decrement button elements
var decrementEl = document.querySelector("#decrement");
var countEl = document.querySelector("#count");

// Updates count on page
function setCounterText() {
  countEl.textContent = count;
}

// Attach event listener to decrement button element
decrementEl.addEventListener("click", function() {
  // Action will subtract the timer number if answer is wrong
  if (count > 0) { 
    count--; something - timerInterval
    setCounterText();
  }
});