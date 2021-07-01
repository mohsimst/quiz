  // console.log(quiz[4]);

  const questionNumber = document.querySelector(".question-number"); 
  const questionText = document.querySelector(".question-text"); 
  const optionContainer = document.querySelector(".option-container");
  const answerIndicatorContainer = document.querySelector(".answers-indicator");
  const homeBox = document.querySelector(".home-box");
  const quizBox = document.querySelector(".quiz-box");
  const resultBox = document.querySelector(".result-box");


  let questionCounter = 0;
  let currentQuestion;
  let availableQuestions = [];
  let availableOptions = [];
  let correctAnswers = 0;
  let attempt = 0;
 


  //push the question into availableWuestions Array
  function setAvailableQuestions(){
  const totalQuestion = quiz.length;
  for(let i=0;i<totalQuestion;i++){
  // console.log(i);
  availableQuestions.push(quiz[i]);
  }
  // console.log(availableQuestions);
  }
  // set question number and question and options
  function getNewQuestion(){
  //set question number
  questionNumber.innerHTML = "Question " + (questionCounter + 1) + " of " + quiz.length;

  //set question Text
  // get random question
  const questionIndex = availableQuestions[Math.floor(Math.random() * availableQuestions.length)]
  // console.log(questionIndex);
  currentQuestion = questionIndex;
  // console.log(currentQuestion.q);
  questionText.innerHTML = currentQuestion.q;
  // get the positions of 'questionIndex' from the availableQuestions Array
  const index1= availableQuestions.indexOf(questionIndex);
  // remove the 'questionIndex' from the availableQuestions Array, so that question does not repeat
  availableQuestions.splice(index1,1);
  // console.log(index1);
  // console.log(questionIndex);
  // console.log(availableQuestions);

  // get options
  // get the length of optiond=s
  const optionLen = currentQuestion.options.length
  // console.log(currentQuestion.options);
  // push options inti availableOptions Array
  for(let i = 0; i<optionLen; i++){
  availableOptions.push(i);
  }
  optionContainer.innerHTML = '';
  let animationDelay = 0.15;
  // console.log(availableOptions);

  // create options in innerHTML 
  for(let i =0; i<optionLen; i++){
  // random option
  const optionIndex = availableOptions[Math.floor(Math.random()* availableOptions.length)];
  // get the position of option Index from the availableOptions Array
  const index2 = availableOptions.indexOf(optionIndex);
  // remove the optionIndex from the availableOptions Array, so that the option does not repeat
  availableOptions.splice(index2,1);
  // console.log(optionIndex);
  // console.log(availableOptions);

  const option = document.createElement("div");
  option.innerHTML = currentQuestion.options[optionIndex];
  option.id = optionIndex;
  option.style.animationDelay = animationDelay + 's';
  animationDelay = animationDelay + 0.15;
  option.className = "option";
  optionContainer.appendChild(option)
  option.setAttribute("onclick","getResult(this)");
  }
  questionCounter++
  }
  // get the result of current attempt question
  function getResult(element){
    const id = parseInt(element.id);
  // get the answer by comparing the id of clicked option
  if (id === currentQuestion.answer){
    // set the green color to the correct option
    element.classList.add("correct");
    // add the indicator to correct mark
    updateAnswerIndicator("correct");
    correctAnswers++;
  }else{
  // set the red color to the incorrect option
    element.classList.add("wrong");
    // add the indicator to wrong mark
    updateAnswerIndicator("wrong");

    // if the answer is incorrect the show the correct option by adding green color the correct option
  const optionLen = optionContainer.children.length; 
  for(let i=0; i<optionLen; i++){
  if(parseInt(optionContainer.children[i].id) === currentQuestion.answer){
      optionContainer.children[i].classList.add("correct");
      
  }
  }

  }
  attempt++;
  unclickableOptions();
  }

  // make all the options unclickable once the user selecta option (RESTRICT THE USER TO CHANGE THE OPTION AGAIN)
  function unclickableOptions(){
    const optionLen = optionContainer.children.length;
  for(let i=0; i<optionLen; i++){
    optionContainer.children[i].classList.add("already-answered");
  }
  }

  function answerIndicator(){
    answerIndicatorContainer.innerHTML = '';
    const totalQuestion = quiz.length;
    for(let i=0; i<totalQuestion; i++){
      const indicator = document.createElement("div");
      answerIndicatorContainer.appendChild(indicator);
  }
  }
  function updateAnswerIndicator(markType){
    answerIndicatorContainer.children[questionCounter-1].classList.add(markType)
  }
  function next(){
  if (questionCounter === quiz.length) {
      quizOver();
  } else {
      getNewQuestion();
  }
  }

  function quizOver(){
    // hide quiz box 
    quizBox.classList.add("hide");
    // show result box
    resultBox.classList.remove("hide");
    quizResult();

  }
  
  function quizResult(){
   resultBox.querySelector(".total-question").innerHTML = quiz.length;
   resultBox.querySelector(".total-attempt").innerHTML = attempt;
   resultBox.querySelector(".total-correct").innerHTML = correctAnswers;
   resultBox.querySelector(".total-wrong").innerHTML = attempt - correctAnswers;
   const percentage = (correctAnswers/quiz.length)*100;
   resultBox.querySelector(".percentage").innerHTML = percentage.toFixed(2) + "%"; 
   resultBox.querySelector(".total-score").innerHTML = correctAnswers+ "/" + quiz.length;
  }
  function resetQuiz(){
    questionCounter = 0;
    correctAnswers = 0;
    attempt = 0;
   

  }
  function tryAgainQuiz(){
    // hide the resultBox
    resultBox.classList.add("hide");
    // show the quizBox
    quizBox.classList.remove("hide");
    resetQuiz();
    startQuiz();

  }
  function goToHome(){
    // hide the result box
    resultBox.classList.add("hide");
    // show the home box
    homeBox.classList.remove("hide")
    resetQuiz();
  }

  // ### STARTING POINT ######
  
  function startQuiz(){

    /// hide home box
    homeBox.classList.add("hide");
    // show quiz box
    quizBox.classList.remove("hide");
  //first we will set all questions in availableQuestions Array
    setAvailableQuestions();
  // then second we will call getNewQuestion(); function
    getNewQuestion();
  // to create indicator of answers
    answerIndicator();
  }
  window.onload = function(){
    homeBox.querySelector(".total-question").innerHTML = quiz.length;
  }