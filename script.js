document.addEventListener('DOMContentLoaded', function() {
    const quizQuestions = [
        {
            question: "What is the primary purpose of a blockchain?",
            options: [
                "To create a centralized database",
                "To enable secure, decentralized record-keeping",
                "To replace traditional banking systems",
                "To increase internet browsing speed"
            ],
            answer: 1,
            explanation: "Blockchain is designed for secure, decentralized record-keeping across a network of computers."
        },
        {
            question: "Which component is NOT part of blockchain's layered architecture?",
            options: [
                "Application Layer",
                "Consensus Layer", 
                "Central Authority Layer",
                "Network Layer"
            ],
            answer: 2,
            explanation: "Blockchain has no central authority layer - that's the whole point of decentralization!"
        },
        {
            question: "What does Proof-of-Work (PoW) consensus mechanism require?",
            options: [
                "Staking cryptocurrency",
                "Solving complex mathematical problems",
                "Voting by network participants",
                "Approval from a central authority"
            ],
            answer: 1,
            explanation: "PoW requires miners to solve computationally difficult problems to validate transactions."
        },
        {
            question: "Which feature distinguishes smart contracts?",
            options: [
                "They require human intervention to execute",
                "They are written in natural language",
                "They automatically execute when conditions are met",
                "They are only used in private blockchains"
            ],
            answer: 2,
            explanation: "Smart contracts automatically execute predefined actions when conditions are satisfied."
        },
        {
            question: "What is a blockchain 'block' primarily composed of?",
            options: [
                "A collection of transactions",
                "A single large transaction",
                "Network configuration data",
                "User account information"
            ],
            answer: 0,
            explanation: "Blocks contain batches of valid transactions that are hashed and encoded."
        }
    ];

    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options-container');
    const progressElement = document.getElementById('progress');
    const progressFill = document.getElementById('progress-fill');
    const nextBtn = document.getElementById('next-btn');
    const prevBtn = document.getElementById('prev-btn');
    const submitBtn = document.getElementById('submit-btn');
    const resultContainer = document.getElementById('result-container');
    const questionContainer = document.getElementById('question-container');
    const scoreElement = document.getElementById('score');
    const totalElement = document.getElementById('total');
    const resultFeedback = document.getElementById('result-feedback');
    const restartBtn = document.getElementById('restart-btn');

    let currentQuestion = 0;
    let score = 0;
    let userAnswers = new Array(quizQuestions.length).fill(null);

    function initQuiz() {
        totalElement.textContent = quizQuestions.length;
        showQuestion();
    }

    function showQuestion() {
        const question = quizQuestions[currentQuestion];
        questionElement.textContent = question.question;
        
        optionsContainer.innerHTML = '';
        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            if (userAnswers[currentQuestion] === index) {
                button.classList.add('selected');
            }
            button.textContent = option;
            button.addEventListener('click', () => selectOption(index));
            optionsContainer.appendChild(button);
        });

        progressElement.textContent = `Question ${currentQuestion + 1} of ${quizQuestions.length}`;
        progressFill.style.width = `${(currentQuestion / (quizQuestions.length)) * 100}%`;

        prevBtn.disabled = currentQuestion === 0;
        nextBtn.classList.toggle('hidden', currentQuestion === quizQuestions.length - 1);
        submitBtn.classList.toggle('hidden', currentQuestion !== quizQuestions.length - 1);
    }

    function selectOption(index) {
        // Remove selected class from all options
        document.querySelectorAll('.option-btn').forEach(btn => {
            btn.classList.remove('selected');
        });
        
        event.target.classList.add('selected');
        userAnswers[currentQuestion] = index;
    }

    function nextQuestion() {
        if (currentQuestion < quizQuestions.length - 1) {
            currentQuestion++;
            showQuestion();
        }
    }

    function prevQuestion() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion();
        }
    }

    function submitQuiz() {
        // Calculate score
        score = 0;
        quizQuestions.forEach((question, index) => {
            if (userAnswers[index] === question.answer) {
                score++;
            }
        });

        scoreElement.textContent = score;
        questionContainer.classList.add('hidden');
        resultContainer.classList.remove('hidden');

        let feedbackHTML = '<h3>Question Review:</h3><ul>';
        quizQuestions.forEach((question, index) => {
            const isCorrect = userAnswers[index] === question.answer;
            const userAnswerText = userAnswers[index] !== null ? 
                question.options[userAnswers[index]] : 'Not answered';
            
            feedbackHTML += `
                <li>
                    <p><strong>Question ${index + 1}:</strong> ${question.question}</p>
                    <p>Your answer: ${userAnswerText}</p>
                    <p class="${isCorrect ? 'correct-answer' : ''}">Correct answer: ${question.options[question.answer]}</p>
                    <p>Explanation: ${question.explanation}</p>
                </li>
            `;
        });
        feedbackHTML += '</ul>';
        resultFeedback.innerHTML = feedbackHTML;
    }

    function restartQuiz() {
        currentQuestion = 0;
        score = 0;
        userAnswers = new Array(quizQuestions.length).fill(null);
        questionContainer.classList.remove('hidden');
        resultContainer.classList.add('hidden');
        showQuestion();
    }

    nextBtn.addEventListener('click', nextQuestion);
    prevBtn.addEventListener('click', prevQuestion);
    submitBtn.addEventListener('click', submitQuiz);
    restartBtn.addEventListener('click', restartQuiz);

    initQuiz();
});
