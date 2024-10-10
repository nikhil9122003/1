const quizForm = document.getElementById('quizForm');
const submitBtn = document.getElementById('submitBtn');
const correctAnswers = {
    q1: 'C',
    q2: 'B'
};

// Initial timer setup
let timeLeft = 60; // Set timer to 60 seconds by default
let timerInterval;
const timerDisplay = document.getElementById('time');

// Countdown Timer Function
function countdown() {
    timerInterval = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            submitQuizAutomatically(); // Automatically submit the quiz when time is up
        }
    }, 1000);
}

// Automatically submit the quiz when time is up
function submitQuizAutomatically() {
    submitBtn.disabled = true;
    quizForm.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.disabled = true; // Disable all options
    });

    // Automatically show the result and display the popup
    alert('Time is up! Your quiz has been submitted automatically.');
    gradeQuiz();
}

// Grade the quiz
function gradeQuiz() {
    // Stop the timer if quiz is submitted before time up
    clearInterval(timerInterval);

    // Clear previous results
    const questionContainers = document.querySelectorAll('.question');
    questionContainers.forEach(container => {
        const radios = container.querySelectorAll('input[type="radio"]');
        radios.forEach(radio => {
            radio.parentElement.classList.remove('correct', 'incorrect');
        });
    });

    let score = 0;

    // Check each answer and apply the colors for correct/incorrect
    for (const [question, correctAnswer] of Object.entries(correctAnswers)) {
        const selectedAnswer = quizForm[question].value;

        const container = document.getElementById(`${question}-container`);
        const radios = container.querySelectorAll('input[type="radio"]');

        radios.forEach(radio => {
            if (radio.value === correctAnswer) {
                // Mark the correct answer in green
                radio.parentElement.classList.add('correct');
            }
            if (radio.checked && radio.value !== correctAnswer) {
                // Mark the wrong selected answer in red
                radio.parentElement.classList.add('incorrect');
            }
        });

        // Calculate score
        if (selectedAnswer === correctAnswer) {
            score++;
        }
    }

    // Display the score
    document.getElementById('result').innerHTML = `<h3>Your Score: ${score} out of ${Object.keys(correctAnswers).length}</h3>`;
}

// Reset timer and start countdown on page load
window.addEventListener('load', () => {
    timeLeft = 60; // Reset to default 60 seconds on page load
    timerDisplay.textContent = timeLeft; // Update timer display
    countdown(); // Start the countdown
});

// Handle quiz submission
quizForm.addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission if timer is active
    gradeQuiz(); // Grade the quiz and stop the timer
});

