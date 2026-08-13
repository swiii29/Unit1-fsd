/* ==========================================
   UNIT 1 FULL STACK NOTES
   INTERACTIVE JAVASCRIPT
========================================== */


/* ==========================================
   DARK MODE
========================================== */

const themeToggle = document.getElementById("themeToggle");

themeToggle.addEventListener("click", () => {

    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {

        themeToggle.innerHTML = "☀️ Light Mode";

        localStorage.setItem("theme", "dark");

    } else {

        themeToggle.innerHTML = "🌙 Dark Mode";

        localStorage.setItem("theme", "light");

    }

});


/* Load saved theme */

if (localStorage.getItem("theme") === "dark") {

    document.body.classList.add("dark");

    themeToggle.innerHTML = "☀️ Light Mode";

}


/* ==========================================
   MOBILE SIDEBAR
========================================== */

const menuBtn = document.getElementById("menuBtn");

const sidebar = document.getElementById("sidebar");

if (menuBtn) {

    menuBtn.addEventListener("click", () => {

        sidebar.classList.toggle("open");

    });

}


/* Close sidebar after clicking a link */

document.querySelectorAll(".sidebar a").forEach(link => {

    link.addEventListener("click", () => {

        sidebar.classList.remove("open");

    });

});


/* ==========================================
   SEARCH
========================================== */

const searchInput =
    document.getElementById("searchInput");

const sections =
    document.querySelectorAll(".searchable");

const topicCount =
    document.getElementById("topicCount");


function updateTopicCount() {

    let visible = 0;

    sections.forEach(section => {

        if (section.style.display !== "none") {

            visible++;

        }

    });

    topicCount.textContent = visible;

}


searchInput.addEventListener("input", () => {

    const query =
        searchInput.value.toLowerCase().trim();


    sections.forEach(section => {

        const text =
            section.innerText.toLowerCase();


        if (text.includes(query)) {

            section.style.display = "";

        } else {

            section.style.display = "none";

        }

    });


    updateTopicCount();

});


updateTopicCount();


/* ==========================================
   READING PROGRESS
========================================== */

const progressBar =
    document.getElementById("progressBar");

const progressText =
    document.getElementById("progressText");


function updateProgress() {

    const scrollTop =
        window.scrollY;

    const documentHeight =
        document.documentElement.scrollHeight -
        window.innerHeight;


    if (documentHeight <= 0) return;


    const percentage =
        Math.round(
            (scrollTop / documentHeight) * 100
        );


    progressBar.style.width =
        percentage + "%";


    progressText.textContent =
        percentage + "% completed";

}


window.addEventListener(
    "scroll",
    updateProgress
);


updateProgress();


/* ==========================================
   QUIZ
========================================== */

const quizQuestions = [

    {
        question:
            "What are the three main components of Full Stack Development?",

        options: [
            "HTML, CSS, JavaScript",
            "Front-End, Back-End, Database",
            "Client, Browser, Server",
            "GET, POST, PUT"
        ],

        answer: 1
    },


    {
        question:
            "Which layer contains business rules?",

        options: [
            "Presentation Layer",
            "Database Layer",
            "Business Layer",
            "Browser Layer"
        ],

        answer: 2
    },


    {
        question:
            "Which stack uses React?",

        options: [
            "MEAN",
            "LAMP",
            "MERN",
            "RoR"
        ],

        answer: 2
    },


    {
        question:
            "What does JSON stand for?",

        options: [
            "Java Source Object Network",
            "JavaScript Object Notation",
            "Java Standard Object Name",
            "JavaScript Online Network"
        ],

        answer: 1
    },


    {
        question:
            "Which HTTP method is used to retrieve data?",

        options: [
            "POST",
            "PUT",
            "DELETE",
            "GET"
        ],

        answer: 3
    },


    {
        question:
            "Which status code means 'Not Found'?",

        options: [
            "200",
            "201",
            "404",
            "500"
        ],

        answer: 2
    },


    {
        question:
            "Which HTTP method is normally associated with creating a resource?",

        options: [
            "GET",
            "POST",
            "PUT",
            "DELETE"
        ],

        answer: 1
    },


    {
        question:
            "Which REST constraint means the server does not depend on previous requests?",

        options: [
            "Cacheability",
            "Uniform Interface",
            "Statelessness",
            "HATEOAS"
        ],

        answer: 2
    },


    {
        question:
            "Which MIME type represents JSON?",

        options: [
            "text/html",
            "application/json",
            "image/json",
            "text/json"
        ],

        answer: 1
    },


    {
        question:
            "Which success status code is expected for DELETE according to the PDF?",

        options: [
            "200",
            "201",
            "204",
            "404"
        ],

        answer: 2
    }

];


let currentQuestion = 0;

let score = 0;

let answered = false;


const quizContainer =
    document.getElementById("quizContainer");

const nextButton =
    document.getElementById("nextQuestion");

const quizResult =
    document.getElementById("quizResult");


function loadQuestion() {

    answered = false;

    quizResult.innerHTML = "";


    const question =
        quizQuestions[currentQuestion];


    quizContainer.innerHTML = `

        <div class="quiz-card">

            <div class="quiz-question">

                Q${currentQuestion + 1}.
                ${question.question}

            </div>

            <div id="options"></div>

        </div>

    `;


    const options =
        document.getElementById("options");


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");


            button.className =
                "quiz-option";


            button.textContent =
                option;


            button.addEventListener(
                "click",
                () => {

                    selectAnswer(
                        button,
                        index
                    );

                }
            );


            options.appendChild(button);

        }
    );

}


function selectAnswer(button, index) {

    if (answered) return;

    answered = true;


    const question =
        quizQuestions[currentQuestion];


    const buttons =
        document.querySelectorAll(
            ".quiz-option"
        );


    if (index === question.answer) {

        button.classList.add("correct");

        score++;

        quizResult.innerHTML =
            "✅ Correct!";

    } else {

        button.classList.add("wrong");

        buttons[
            question.answer
        ].classList.add("correct");

        quizResult.innerHTML =
            "❌ Not quite! The highlighted answer is correct.";

    }

}


nextButton.addEventListener(
    "click",
    () => {

        if (!answered) {

            quizResult.innerHTML =
                "👆 Choose an answer first.";

            return;

        }


        currentQuestion++;


        if (
            currentQuestion >=
            quizQuestions.length
        ) {

            showFinalScore();

        } else {

            loadQuestion();

        }

    }
);


function showFinalScore() {

    quizContainer.innerHTML = `

        <div class="quiz-card">

            <div style="font-size:45px;">
                🎉
            </div>

            <h2>
                Quiz Complete!
            </h2>

            <p style="margin-top:10px;">
                You scored
                <strong>
                    ${score}/${quizQuestions.length}
                </strong>
            </p>

        </div>

    `;


    nextButton.textContent =
        "Restart Quiz 🔄";


    quizResult.innerHTML =
        score >= 8
            ? "🔥 Excellent! You're exam ready!"
            : score >= 5
                ? "👍 Good! Revise the weak topics once."
                : "📚 Go through the notes once more.";


    nextButton.onclick =
        restartQuiz;

}


function restartQuiz() {

    currentQuestion = 0;

    score = 0;

    nextButton.textContent =
        "Next Question →";


    nextButton.onclick =
        null;


    loadQuestion();

}


loadQuestion();


/* ==========================================
   ACTIVE SIDEBAR LINK
========================================== */

const navLinks =
    document.querySelectorAll(
        ".sidebar nav a"
    );


const observer =
    new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {

                        link.classList.remove(
                            "active"
                        );

                    });


                    const active =
                        document.querySelector(
                            `.sidebar nav a[href="#${entry.target.id}"]`
                        );


                    if (active) {

                        active.style.background =
                            "#f1edff";

                        active.style.color =
                            "#7c3aed";

                    }

                }

            });

        },

        {
            threshold: 0.25
        }

    );


document
    .querySelectorAll("section[id]")
    .forEach(section => {

        observer.observe(section);

    });
