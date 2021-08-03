// assign each variable to it's specific place in the html
const question = document.querySelector('#question');
const choices = Array.from(document.querySelectorAll('.choice-text'));
const progressText = document.querySelector('#progressText');
const ScoreText = document.querySelector('#score');
const progressBarFull = document.querySelector('#progress-BarFull');

let currentQuestion = {}
let acceptingAnswers = true
let score = 0
let questionCounter = 0
let availableQuestions = []
//lets add some questions
let questions = [
    {
        question: 'What was the name of the research ship Charles Darwin traveled with?',
        choice1: 'Charlotte',
        choice2: 'The Beagle',
        choice3: 'SeaMermaid',
        choice4: 'Titanic',
        answer: 2,

    },
    {
        question: 'What was the shortest war in human history?',
        choice1: 'The war between England and Zanzibar',
        choice2: 'The war between Greece and France',
        choice3: 'The war between Egypt and Israel',
        choice4: 'The war between Germany and italy',
        answer: 1,

    },
    {
        question: 'How many years did the 100 years war last?',
        choice1: '100 years',
        choice2: '106 years',
        choice3: '116 years',
        choice4: '89 years',
        answer: 3,

    },
    {
        question: 'How long did the war between England and Zanzibar last?',
        choice1: '3 hours',
        choice2: 'between 8 to 12 hours',
        choice3: '3 days',
        choice4: 'Between 38 & 45 minutes',
        answer: 4,
    },
    {
        question: 'In which year did Hitler commit suicide?',
        choice1: '1944',
        choice2: '1945',
        choice3: '1946',
        choice4: '1948',
        answer: 2,
    },
    {
        question: 'In which year was John F. Kennedy assassinated?',
        choice1: '1962',
        choice2: '1963',
        choice3: '1964',
        choice4: '1967',
        answer: 2,
    },
    {
        question: 'One of the ancient world wonders, the “Hanging Gardens,” was found in which city?',
        choice1: 'Cairo',
        choice2: 'Alexandria',
        choice3: 'Babylon',
        choice4: 'Troy',
        answer: 3,
    },
    {
        question: 'Greenland was a colony of which country until 1981?',
        choice1: 'Canada',
        choice2: 'Denmark',
        choice3: 'Russia',
        choice4: 'USA',
        answer: 2,
    },
    {
        question: 'How many days in a week were there in ancient Roman times?',
        choice1: '5',
        choice2: '6',
        choice3: '7',
        choice4: '8',
        answer: 4,
    },
    {
        question: 'Which organization was awarded the Nobel Peace Prize in 1917?',
        choice1: 'The Red Cross',
        choice2: 'The UNICEF',
        choice3: 'OPEC',
        choice4: 'UN',
        answer: 1,
    },
    {
        question: 'How many days was William Harrison President of the United States?',
        choice1: '11 days',
        choice2: '25 days',
        choice3: '32 days',
        choice4: '46 days',
        answer: 3,
    },
    {
        question: 'Which King of England was executed in 1649 during the English Civil War?',
        choice1: 'Charles I',
        choice2: 'The Charles II',
        choice3: 'Charles V',
        choice4: 'Charles VI',
        answer: 1,
    },
    {
        question: 'Which city has more than third of the world monuments',
        choice1: 'Luxor',
        choice2: 'Cairo',
        choice3: 'Dubai',
        choice4: 'London',
        answer: 1,
    },
    {
        question: 'Where was the oldest civilization on Earth',
        choice1: 'China',
        choice2: 'India',
        choice3: 'Spain',
        choice4: 'Egypt',
        answer: 4,
    },
    {
        question: 'The ancient city of Rome was built on how many hills?',
        choice1: '6',
        choice2: '5',
        choice3: '7',
        choice4: '8',
        answer: 3,
    },
    {
        question: 'Who is known for running through the streets crying Eureka?',
        choice1: 'Archimedes',
        choice2: 'Aristotle',
        choice3: 'columbus',
        choice4: 'Al Idrisi',
        answer: 1,
    },
    {
        question: 'Which century did the French Revolution take place in?',
        choice1: '15',
        choice2: '17',
        choice3: '16',
        choice4: '18',
        answer: 4,
    },
    {
        question: 'The Tallest building in ancient history and still one of the world wonders',
        choice1: 'The Babylon Gardens',
        choice2: 'The Light House of Alexandria',
        choice3: 'The Great Pyramid of Giza',
        choice4: 'Abu simple temple',
        answer: 3,
    },
    {
        question: 'The construction of the Berlin Wall begin in what year?',
        choice1: '1963',
        choice2: '1961',
        choice3: '1967',
        choice4: '1965',
        answer: 2,
    },
    {
        question: 'The Ptolemy dynasty ruled which ancient kingdom?',
        choice1: 'Greece',
        choice2: 'Roman',
        choice3: 'North Africa',
        choice4: 'Egypt',
        answer: 4,
    }
]

// initiate calculate score to 100 and max questions to 10
const ScorePoints = 1
const MaxQuestions = 20


// create the start trivia function
startGame = () => {
    questionsCounter = 0
    Score = 0
    availableQuestions = [...questions]
    getNewQuestion()
}


// get questions from the array
getNewQuestion = () => {
    if (availableQuestions.length === 0 || questionCounter > MaxQuestions) {
        localStorage.setItem('mostRecentScore', score)
        return window.location.assign('end.html')
    }
    questionsCounter++;
    progressText.innerText = `Question ${questionsCounter} of ${MaxQuestions}`
    progressBarFull.style.width = `${(questionsCounter / MaxQuestions) * 100}%`

    // loop the questions inside the array
    const questionIndex = Math.floor(Math.random() * availableQuestions.length)
    currentQuestion = availableQuestions[questionIndex]
    question.innerText = currentQuestion.question


    choices.forEach(choice => {
        const number = choice.dataset['number']
        choice.innerText = currentQuestion['choice' + number]
    })
    //splice the question from the array
    availableQuestions.splice(questionIndex, 1)

    acceptingAnswers = true

}

choices.forEach(choice => {
    choice.addEventListener('click', e => {
        if (!acceptingAnswers) return

        acceptingAnswers = false
        const selectedChoice = e.target
        const selectedAnswer = selectedChoice.dataset['number']

        let classToApply = selectedAnswer == currentQuestion.answer ? 'correct': 'incorrect'

        // so every time the user selected the right answer we need to increase the score points
        if (classToApply === 'correct') {
            incrementScore(ScorePoints)
        }

        // target the parent element to add the score when ever its right
        selectedChoice.parentElement.classList.add(classToApply)

        //  set time to move from a question to another after the user choose the answer
        setTimeout(() => {
            selectedChoice.parentElement.classList.remove(classToApply)
            getNewQuestion()
        }, 100)
    })
})

incrementScore = num => {
    score += num
    ScoreText.innerText = score

}


startGame()