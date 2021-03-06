
//variables

//variables to hold array of quiz questions and answers

var myQuestions = [
    {
        question: "How old was the oldest living chicken?",
		answers: {
            a: '5 years',
			b: '2 years',
            c: '12 years',
            d: '22 years'
		},
		correctAnswer: 'c'
    },
    {
        question: "When a hen stops laying eggs and tries to sit on them to hatch them, what is the name of that condition?",
		answers: {
            a: 'Going broody',
			b: 'Egg sitty',
            c: 'Going sitty',
            d: 'Nesty'
		},
		correctAnswer: 'a'
	},
    {
        question: "How big was the world's largest chicken?",
		answers: {
            a: '17 pounds',
			b: '23 pounds',
            c: '29 pounds',
            d: '37 pounds'
		},
		correctAnswer: 'b'
    },
    {
        question: "Chickens were first domesticated for what purpose?",
		answers: {
            a: 'Eggs',
			b: 'Meat',
            c: 'House pets',
            d: 'Cockfighting'
		},
		correctAnswer: 'd'
    },
    {
        question: "What is the total population of chickens living today?",
		answers: {
            a: '19 million',
			b: '115 million',
            c: '1.6 billion',
            d: '19 billion'
		},
		correctAnswer: 'd'
	},
	{
        question: "Mike the headless chicken became famous for surving how long after being beheaded?",
		answers: {
            a: '2 weeks ',
			b: '6 months',
            c: '18 months',
            d: '2 years'
		},
		correctAnswer: 'c'
	}
];


// on page load, timer starts counting down from 120 seconds 

function startTimer(duration, display) {
    var timer = duration, minutes, seconds;
    setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;
        
        display.text(minutes + ":" + seconds);
        
        if (--timer < 0) {
            //stop timer
            display.text("Times up!"); 
            //stop quiz
            showResults(); //I can't get this to work. I think it's a scoping problem but I don't know how to fix it.  
            
        }
    }, 1000);
    
}

//setting the 2 minute timer
jQuery(function ($) {
    var twoMinutes = 60 * 2;
    display = $('#time');
    startTimer(twoMinutes, display);
    
});


//variables to populate HTML 

var quizContainer = document.getElementById('quiz');
var resultsContainer = document.getElementById('results');
var submitButton = document.getElementById('submit');

generateQuiz(myQuestions, quizContainer, resultsContainer, submitButton);

function generateQuiz(questions, quizContainer, resultsContainer, submitButton){

    function showQuestions(questions, quizContainer){
        //output= user answers, answer = correct answer key
        var output = [];
        var answers;
//for loop to loop over each question
        for(var i=0; i<questions.length; i++){
            
            // first reset the list of answers
            answers = [];

            //add a radio selector for each question in the HTML
            for(answerLetter in questions[i].answers){
                answers.push(
                    '<label>'
                        + '<input type="radio" name="question'+i+'" value="'+answerLetter+'">'
                        + answerLetter + ': '
                        + questions[i].answers[answerLetter]
                    + '</label>'
                );
            }

            // also put in question and answers
            output.push(
                '<div class="question">' + questions[i].question + '</div>'
                + '<div class="answers">' + answers.join('') + '</div>'
            );
        }

        //take radio selector, questions, answers, and put it all into the page in one string
        quizContainer.innerHTML = output.join('');
    }


    function showResults(questions, quizContainer, resultsContainer){
        
        // put answers into variable
        var answerContainers = quizContainer.querySelectorAll('.answers');
        
        // keep track of submitted answers and set intital correct to 0
        var userAnswer = '';
        var numCorrect = 0;
        
        // loop through each question
        for(var i=0; i<questions.length; i++){

            // get the user's input
            userAnswer = (answerContainers[i].querySelector('input[name=question'+i+']:checked')||{}).value;
            
            if(userAnswer===questions[i].correctAnswer){
                // if they get it right, increase the correct number
                numCorrect++;
                 //  display this next to question answered correctly
                answerContainers[i].append(" -- You got this one right!");
            }
            // if they get it wrong
            else{
                //  display this next to question answered incorrectly
                answerContainers[i].append(" -- You got this one wrong!");
            }
        }

        // show total correct out of total possible
        resultsContainer.innerHTML = 'Your final score is ' + numCorrect + ' out of ' + questions.length + '. Well done!';
    }

    // display questions
    showQuestions(questions, quizContainer);
    
    //display results
    submitButton.onclick = function(){
        showResults(questions, quizContainer, resultsContainer);
    }

}

