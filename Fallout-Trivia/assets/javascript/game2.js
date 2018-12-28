// trivia questions, possible answers, and answer results
var triviaQuestions = [
  {
    question: "What is the modern currency in Fallout?",
    answerList: ["caps", "rupees", "yen", "US dollars"],
    answer: 0
  },
  {
    question: "What tribe lives in Red Rock Canyon?",
    answerList: [
      "Great Khans",
      "The Legion",
      "The Boomers",
      "Brotherhood of Steel"
    ],
    answer: 0
  },
  {
    question: "What was the apex predator of the wasteland?",
    answerList: ["Mole rat", "Rad scorpion", "Ferral Goul", "Death claw"],
    answer: 3
  },
  {
    question: "What company created Fallout?",
    answerList: ["Bethseda", "Microsoft", "Piranha", "Sony"],
    answer: 0
  },
  {
    question: "Where are the Boomers located?",
    answerList: [
      "Nellis Air Force Base",
      "New Vegas",
      "The Bunker",
      "Mojave Desert"
    ],
    answer: 0
  },
  {
    question: "What is the name of the man that shot you?",
    answerList: ["Benny", "Diggs", "Marco", "Timmothy"],
    answer: 0
  },
  {
    question: "Where are the Boomers originally from?",
    answerList: ["Vault 112", "Vault 76", "Vault 121", "Vault 34"],
    answer: 3
  },
  {
    question: "What society is cannabalistic?",
    answerList: [
      "White Glove Society",
      "The Legion",
      "Great Khans",
      "Super Mutants"
    ],
    answer: 1
  },
  {
    question: "What kind of gun do you start out with in the game?",
    answerList: [
      "9mm pistol",
      "Don't start game witha gun.",
      "10mm pistol",
      "bb gun"
    ],
    answer: 0
  },
  {
    question: "what faction is the ncr's rival?",
    answerList: [
      "The Boomers",
      "Caesar's legion",
      "Brotherhood of Steel",
      "Great Khans"
    ],
    answer: 1
   
  },
  {
    question: "what's the name of the robot that dug you up??",
    answerList: ["Billy", "Sammy", "Victor", "R2v6"],
    answer: 2
  },
  {
    question: "where is the bison and steve hotel located?",
    answerList: ["Nipton", "New Vegas", "Quarry Junction", "Primm"],
    answer: 3
  },
  {
    question: "Which of these American cities is present in Fallout 2?",
    answerList: ["Chicago", "Denver", "Reno", "San Francisco"],
    answer: 3
  },
  {
    question: "Who is in charge of new vegas?",
    answerList: ["White Glove Society", "Raiders", "Mr. House", "Great Khans"],
    answer: 2
  },
  {
    question: "What town do you wake up in?",
    answerList: ["goodsprings", "Nipton", "New Vegas", "Primm"],
    answer: 0
  },
  {
    question:
      "In Fallout 4, A super mutant who takes in the culture and words of Shakespeare, but still enjoys the thrill of killing and smashing things. Who is this creature?",
    answerList: ["Strong", "Don Don", "Fist", "Meat", "Bill"],
    answer: 0
  },
  {
    question: "When does the Fallout series take place?",
    answerList: [
      "future",
      "past",
      "present day",
      "in an alternate reality",
      "Takes fantasy world, therfore, time is unknown."
    ],
    answer: 0
  },
  {
    question:
      "In Fallout 4, A resident of Diamond City, she is an embattled newspaper reporter who wants to expose the truth to the people, though she has only made many enemies within and outside the city. Who is she?",
    answerList: ["Piper", "Sue", "Curie", "Magnolia", "Jaxx"],
    answer: 0
  }
];
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
  scoreRound: function() {
    var selectedAnswer = $("input:checked").attr("choice");
    $("#game-board").empty();
    var message = $("<p>");
    if (
      selectedAnswer ===
      triviaQuestions[this.currentIndex].answerList[
        triviaQuestions[this.currentIndex].answer
      ]
    ) {
      this.score++;
      message.text("That's correct!");
      $("#game-board").append(message);
    } else {
      message.text("Sorry, that's incorrect.");
      $("#game-board").append(message);
    } 
    if(selectedAnswer ==(triviaQuestions.length-1)){////trying to set in timer here
      setTimeout(scoreboard, 5000)
    } else {

      
    }
    this.currentIndex++;
   
  },
  currentIndex: 0,
  //define first key
  handleStart: function() {
    var that = this;
    // want start button to start timer, generate first question, and start game  
    $("#start-button").on("click", function() {
      //call back function--this refers to an object that code is stored in. "Why we're here"
      //hiding start button after clicked this.hide sets display to none...hide start button without taking it off page. 0 height and width
      $(this).hide(); //hides start
      that.renderNextQuestion();
    });
  },
  renderNextQuestion: function() {
    time = setInterval(game.countDown, 1000);
    //renders next question and empties the gameboard after answer is selected
    $("#game-board").empty();
    this.renderQuestion(triviaQuestions[this.currentIndex]);
  },
  renderQuestion: function(currentQuestion) {
    var questionBox = $("<div>");
    var scoreButton = $("<button>");
    var that = this;
    scoreButton.text("Next question.");
    scoreButton.on("click", function() {
      that.scoreRound();
    });
    var questionStem = $("<p>");
    questionStem.addClass("question");
    questionStem.text(currentQuestion.question);
    var answerBox = $("<div>");
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
    questionBox.append(questionStem);
    questionBox.append(answerBox);
    $("#game-board").append(questionBox);
    $("#game-board").append(scoreButton);
  },
 
};
game.handleStart();


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
