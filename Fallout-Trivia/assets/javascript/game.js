// trivia questions, possible answers, and answer results
var triviaQuestions = [
  {
    question: "What is the modern currency in Fallout?",
    answerList: ["caps", "rupees", "yen", "US dollars"],
    answer: 0,
    image: "..assets/images/gif-1.gif"
  },
  {
    question: "What tribe lives in Red Rock Canyon?",
    answerList: [
      "Great Khans",
      "The Legion",
      "The Boomers",
      "Brotherhood of Steel"
    ],
    answer: 0,
    image: "..assets/images/gif-19.gif"
  },
  {
    question: "What was the apex predator of the wasteland?",
    answerList: ["Mole rat", "Rad scorpion", "Ferral Goul", "Death claw"],
    answer: 3,
    image: "..assets/images/gif-10.gif"
  },
  {
    question: "What company created Fallout?",
    answerList: ["Bethseda", "Microsoft", "Piranha", "Sony"],
    answer: 0,
    image: "..assets/images/gif-18.gif"
  },
  {
    question: "Where are the Boomers located?",
    answerList: [
      "Nellis Air Force Base",
      "New Vegas",
      "The Bunker",
      "Mojave Desert"
    ],
    answer: 0,
    image: "..assets/images/gif-4.gif"
  },
  {
    question: "What is the name of the man that shot you?",
    answerList: ["Benny", "Diggs", "Marco", "Timmothy"],
    answer: 0,
    image: "..assets/images/gif-20.gif"
  },
  {
    question: "Where are the Boomers originally from?",
    answerList: ["Vault 112", "Vault 76", "Vault 121", "Vault 34"],
    answer: 3,
    image: "..assets/images/gif-1.gif"
  },
  {
    question: "What society is cannabalistic?",
    answerList: [
      "White Glove Society",
      "The Legion",
      "Great Khans",
      "Super Mutants"
    ],
    answer: 1,
    image: "..assets/images/gif-6.gif"
  },
  {
    question: "What kind of gun do you start out with in the game?",
    answerList: [
      "9mm pistol",
      "Don't start game witha gun.",
      "10mm pistol",
      "bb gun"
    ],
    answer: 0,
    image: "..assets/images/gif-8.gif"
  },
  {
    question: "what faction is the ncr's rival?",
    answerList: [
      "The Boomers",
      "Caesar's legion",
      "Brotherhood of Steel",
      "Great Khans"
    ],
    answer: 1,
    image: "..assets/images/gif-13.gif"
  },
  {
    question: "what's the name of the robot that dug you up??",
    answerList: ["Billy", "Sammy", "Victor", "R2v6"],
    answer: 2,
    image: "..assets/images/gif-7.gif"
  },
  {
    question: "where is the bison and steve hotel located?",
    answerList: ["Nipton", "New Vegas", "Quarry Junction", "Primm"],
    answer: 3,
    image: "..assets/images/gif-19.gif"
  },
  {
    question: "what resides in quarry junction?",
    answerList: ["Rad scorpions", "Ferral ghouls", "Death claws", "Raiders"],
    answer: 3,
    image: "..assets/images/gif-22.gif"
  },
  {
    question: "Who is in charge of new vegas?",
    answerList: ["White Glove Society", "Raiders", "Mr. House", "Great Khans"],
    answer: 2,
    image: "..assets/images/gif-9.gif"
  },
  {
    question: "What town do you wake up in?",
    answerList: ["goodsprings", "Nipton", "New Vegas", "Primm"],
    answer: 0,
    image: "..assets/images/gif-21.gif"
  }
];
//creating timer for game
//10 second countdown for each question
//If question is answered correctly, an associated gif will play with each question. An individual gif is assigned to each question.
//If answered incorrectly, a gif of an explosion will play and screen will flash red for 3 seconds.
//At end of game, if all questions are answered correctly a message will appear saying welcome to vault 112.
//If all questions weren't answered correctly a "game Over" message will appear and an explosion gif will play.
///Time Rules:
//1. 10 second countdown per question
//2. if time runs out, question is wrong
// 3. reset timer after question is answered.
var time;
var game = {
  score: 0,
  seconds: 10,
  countDown: function() {//reorganized function to only worry about countdown. Singularily focused goal.
    game.seconds--;
    console.log(game.seconds);
    var timeLeft = $("#timeLeft")//try out with a p tag and a div.---->
    $("#timeLeft").html("<h3>Time Remaining: " + game.seconds + "</h3>");
    if(game.seconds < 1) {
      clearInterval(time);
      var message = $("<p>");
      message.text("Time's up!")
      $("#game-board").appendTo(message);
    }
  }, 
 
  //timer 30
  //look up set interval. timer on page every 1 second, update what is displayed
  scoreRound: function() {
    //countdown();
    //scoreRound function-- declared selectedAnswer, getting answer from user's guess. From input checked, you're
    var selectedAnswer = $("input:checked").attr("choice").stringify;
    
    console.log("selectedAnswer is " + JSON.stringify(selectedAnswer));
    $("#game-board").empty(); //clears previous message--suggest using .clear method
    var message = $("#message-input"); //declaring message as a paragraph or setting to display in p tag.
    var correctMessage = $("#correctAnswers")
    var incorrectMessage = $("#incorrectAnswers")
    if (
      selectedAnswer ===
      triviaQuestions[this.currentIndex].answerList[
        triviaQuestions[this.currentIndex].answer
      ]
    ) {
      this.score++;
      correctMessage.text("That's correct!");
      $("#game-board").appendTo(correctMessage);//create new div that holds gifs and append to it if questions are right.
    } else {
      incorrectMessage.text("Sorry, that's incorrect.");//create a new div to hold incorrect gif 
      $("#game-board").appendTo(incorrectMessage);
    }
    //skips over to next question
    this.currentIndex++; //incriments every time scoreRoundFunction is rendered
    //var that = this;//could improve this. Set timeout
    //setTimeout(this.renderNextQuestion.bind(this), 3000); //times out after 3 seconds. Reurns value in runtime.
  },
  currentIndex: 0, // current index starts at zero, then increases whenever question is accessed.
  //define first key
  handleStart: function() {
    //when start button is clicked, renderNextQuestion is called.
    var that = this;
    // want start button to start timer, generate first question, and start game
  },
  renderNextQuestion: function() {
    console.log(game.seconds);
    time = setInterval(game.countDown, 1000);
    //game.countDown;
    //renders next question and empties the gameboard after answer is selected
    //$("#game-board").empty();
    this.renderQuestion(triviaQuestions[this.currentIndex]); //As if currentQuestion in renderQuestion function is = riviaQuestions[this.currentIndex
  },
  renderQuestion: function(currentQuestion) {
    // creation of submit button.
    var questionBox = $("#currentQuestion");
    var scoreButton = $("<button>");
    var that = this;
    scoreButton.text("Next question.");
    scoreButton.on("click", function() {
    that.scoreRound();
      console.log(scoreButton)
    });

   // var questionStem = $("<p>"); //console.log a value to understand what value is. Used this to solve issue of questions not appearing when start button was clicked.
    questionBox.addClass("question");
    questionBox.text(currentQuestion.question);
    var answerBox = $(".answerList");
    answerBox.addClass("answer");
    for (var j = 0; j < currentQuestion.answerList.length; j++) {
      //nested for loop
      var radioBtn = $(
        '<input type="radio">' + currentQuestion.answerList[j] + "</input>"
      );
      radioBtn.attr("name", j);
      radioBtn.attr("choice", currentQuestion.answerList[j]);
      radioBtn.appendTo(answerBox);
    }
    // questionBox.append(questionBox);
    // questionBox.append(answerBox);
    $("#game-board").append(questionBox);
    $("#game-board").append(scoreButton);
  }

};
//game.handleStart();
$("#start-button").on("click", function() {//handlestart function
  //call back function--this refers to an object that code is stored in. "Why we're here"
  //hiding start button after clicked this.hide sets display to none...hide start button without taking it off page. 0 height and width
  $(this).hide(); //hides start
  game.countDown;
  game.renderNextQuestion();
});

//timer function

//array to contain 15 questions
/* var gifArray = ['question1', 'question2', 'question3', 'question4', 'question5', 'question6', 'question7', 'question8', 'question9', 'question10', 'question11', 'question12', 'question13','question14','question15'];
//
//
var currentQuestion;
var correctAnswer;
 var incorrectAnswer;
  var unanswered;
  var seconds;
   var time;
   var answered;
   var userSelect;
var messages = {
	correct: "Yes, that's right!",
	incorrect: "No, that's not it.",
	endTime: "Out of time!",
	finished: "Alright! Let's see how well you did."
}
// $("#finalMessage").append("<img src ='..assets/images/gif-1.gif'>");
//The Start of the Chain that sets off everything off.
$('#startBtn').on('click', function(){
	$(this).hide();
	newGame();
});
//
$('#startOverBtn').on('click', function(){
	$(this).hide();
	newGame();
});
//empties out child nodes so nothing is under them.
function newGame(){
	$('#finalMessage').empty();//empty out or clear out div elements inside of the finalMessage
	$('#correctAnswers').empty();
	$('#incorrectAnswers').empty();
	$('#unanswered').empty();
	currentQuestion = 0;
	correctAnswer = 0;
	incorrectAnswer = 0;
	unanswered = 0;
	newQuestion();
}
//
function newQuestion(){
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();
	answered = true;

	//sets up new questions & answerList
	$('#currentQuestion').html('Question #'+(currentQuestion+1)+'/'+triviaQuestions.length);
	$('.question').html('<h2>' + triviaQuestions[currentQuestion].question + '</h2>');
	for(var i = 0; i < 4; i++){
		var choices = $('<div>');
		choices.text(triviaQuestions[currentQuestion].answerList[i]);
		choices.attr({'data-index': i });
		choices.addClass('thisChoice');
		$('.answerList').append(choices);
	}
	countdown();
	//clicking an answer will pause the time and setup answerPage
	$('.thisChoice').on('click',function(){
		userSelect = $(this).data('index');
		console.log(userSelect)
		clearInterval(time);
		answerPage();

	});
}

function countdown(){
	seconds = 15;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	answered = true;
	//sets timer to go down
    time = setInterval(showCountdown, 1000);
}

function showCountdown(){
	seconds--;
	$('#timeLeft').html('<h3>Time Remaining: ' + seconds + '</h3>');
	if(seconds < 1){
		clearInterval(time);
		answered = false;
		answerPage();
	}
}

function answerPage(){
	$('#currentQuestion').empty();
	$('.thisChoice').empty(); //Clears question page
	$('.question').empty();

	var rightAnswerText = triviaQuestions[currentQuestion].answerList[triviaQuestions[currentQuestion].answer];
	var rightAnswerIndex = triviaQuestions[currentQuestion].answer;
	$('#finalMessage').empty();
	$('#finalMessage').append('<img src="/assets/images/gif-1.gif">')

	//checks to see correct, incorrect, or unanswered
	if((userSelect == rightAnswerIndex) && (answered == true)){
		correctAnswer++;
		$('#message').html(messages.correct);
	} else if((userSelect != rightAnswerIndex) && (answered == true)){
		incorrectAnswer++;
		$('#message').html(messages.incorrect);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
	} else{
		unanswered++;
		$('#message').html(messages.endTime);
		$('#correctedAnswer').html('The correct answer was: ' + rightAnswerText);
		answered = true;
	}

	if(currentQuestion == (triviaQuestions.length-1)){
		setTimeout(scoreboard, 5000)
	} else{
		currentQuestion++;
		setTimeout(newQuestion, 5000);
	}
}

function scoreboard(){
	$('#timeLeft').empty();
	$('#message').empty();
	$('#correctedAnswer').empty();
	$('#gif').empty();

	$('#finalMessage').html(messages.finished);
	$('#correctAnswers').html("Correct Answers: " + correctAnswer);
	$('#incorrectAnswers').html("Incorrect Answers: " + incorrectAnswer);
	$('#unanswered').html("Unanswered: " + unanswered);
	$('#startOverBtn').addClass('reset');
	$('#startOverBtn').show();
	$('#startOverBtn').html('Start Over?');
}*/
