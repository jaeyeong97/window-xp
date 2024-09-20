// 퀴즈 모달 관련
const quizIcon = document.querySelector('.quiz-icon');
const quizModal = document.querySelector('.quiz-modal');
const quizHeader = document.querySelector('.quiz-modal-header1');
const quizFullScreenBtn = document.querySelector('.quiz-modal-header1-right-btn2');
const quizCloseBtn = document.querySelector('.quiz-modal-header1-right-btn3');
const quizMainIn = document.querySelector('.quiz-main-in');
const timerFill = document.querySelector(".timer-fill");
const quizLogin = document.querySelector('.quiz-login');
const answerButtons = document.querySelectorAll(".quiz-btn");
const quizStartBtn = document.querySelector('.quiz-start-btn');
const quizRestartBtn = document.querySelector('.quiz-restart-btn');
const quizResults = document.querySelector('.quiz-results');
const resultsCorrect = document.querySelector('.results-correct');
const resultsIncorrect = document.querySelector('.results-incorrect');
const quizUnderBar = document.querySelector('.quiz-modal-header1-right-btn1');
const o = document.querySelector('.o');
const x = document.querySelector('.x');

// 퀴즈 로그인

const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const signInUpBtnsWrap = document.querySelector('.show-wrap');
const toFirst = document.querySelectorAll('.to-first');

// 로그인/회원가입 토글 버튼
showSignupLink.addEventListener('click', (event) => {
    event.preventDefault();
    signInUpBtnsWrap.style.display = 'none';
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
});

showLoginLink.addEventListener('click', (event) => {
    event.preventDefault();
    signInUpBtnsWrap.style.display = 'none';
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// 돌아가기 버튼
toFirst.forEach((btn) => {
    btn.addEventListener('click', function () {
        loginForm.style.display = 'none';
        signupForm.style.display = 'none';
        signInUpBtnsWrap.style.display = 'block';
    })
})

// 회원가입
document.getElementById('signup').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('signup-id').value;
    const password = document.getElementById('signup-password').value;
    const passwordDoubleCheck = document.getElementById('signup-password-again').value;
    const idAlert = document.querySelector('.id-exist-alert');
    const passwordAlert = document.querySelector('.password-not-matched-alert');

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (id.length < 6 || id.length > 12) {
        idAlert.style.display = 'block';
        idAlert.textContent = '아이디는 6~12글자여야 합니다.'
        return;
    }
    if (users.some((user) => user.id === id)) {
        idAlert.style.display = 'block';
        idAlert.textContent = '이미 존재하는 아이디입니다.'
        return;
    }
    if (password !== passwordDoubleCheck) {
        passwordAlert.style.display = 'block';
        passwordAlert.textContent = '비밀번호가 일치하지 않습니다.'
        return;
    }
    if (password.length < 4) {
        passwordAlert.style.display = 'block';
        passwordAlert.textContent = '비밀번호는 최소 4글자 이상이여야 합니다.'
        return;
    }

    users.push({ id, password });

    localStorage.setItem('users', JSON.stringify(users));

    alert('회원가입에 성공하였습니다. 로그인 페이지로 돌아갑니다.');

    // 회원가입 성공 후 입력칸 비우기
    document.getElementById('signup-id').value = '';
    document.getElementById('signup-password').value = '';
    document.getElementById('signup-password-again').value = '';

    idAlert.style.display = 'none';
    passwordAlert.style.display = 'none';

    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
});

// 로그인
document.getElementById('login').addEventListener('submit', (event) => {
    event.preventDefault();
    const id = document.getElementById('login-id').value;
    const password = document.getElementById('login-password').value;

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find((user) => user.id === id && user.password === password);

    if (user) {
        loginForm.style.display = 'none';
        quizStartBtn.style.display = 'block';
    } else {
        alert('아이디나 비밀번호를 확인해주세요.');
    }
});

let quizBar;
// 퀴즈 창 열기
quizIcon.addEventListener('dblclick', function () {
    quizModal.style.display = 'block';

    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.quiz-bar');

    if (!existCheck) {
        quizBar = document.createElement('div');
        quizBar.classList.add('bar', 'quiz-bar');

        const img = document.createElement('img');
        img.src = 'img/q-blue.png';
        img.alt = 'quiz';

        const span = document.createElement('span');
        span.textContent = 'Quiz Game';

        quizBar.appendChild(img);
        quizBar.appendChild(span);
        statusBar.appendChild(quizBar);

        quizBar.addEventListener('click', function () {
            increaseZIndex(quizModal);
            quizModal.style.display = 'block';
        });
    }
});
// 퀴즈 창 닫기
quizCloseBtn.addEventListener('click', function () {
    quizModal.style.display = 'none';
    quizBar.remove();
    resetQuiz();
});
quizUnderBar.addEventListener('click', function () {
    quizModal.style.display = 'none';
});

// 퀴즈 창 전체화면
quizFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(quizModal, 'quiz', '55px', '120px', '550px', '630px');
});
quizHeader.addEventListener('dblclick', function () {
    fullScreenFunction(quizModal, 'quiz', '55px', '120px', '550px', '630px');
});

// 퀴즈 시작 버튼
quizStartBtn.addEventListener('click', function () {
    quizLogin.style.display = 'none';
    quizMainIn.style.display = 'block';
    showQuestion();
});
// 퀴즈 재시작 버튼
quizRestartBtn.addEventListener('click', function () {
    resetQuiz();
    quizLogin.style.display = 'flex';
});
// 퀴즈 메인
const questions = [
    {
        question: "1 + 1 = ?",
        answers: ["0", "2", "창문"],
        correct: 1
    },
    {
        question: "지구를 영어로?",
        answers: ["Earth", "Jupiter", "Mars"],
        correct: 0
    },
    {
        question: "인구가 가장 많은 나라는?",
        answers: ["중국", "인도", "미국"],
        correct: 1
    },
    {
        question: "새끼 손가락을 다른말로 하면?",
        answers: ["약지", "중지", "소지"],
        correct: 2
    },
    {
        question: "태양계에서 가장 큰 행성은 무엇인가요?",
        answers: ["화성", "금성", "목성"],
        correct: 2
    },
    {
        question: "대한민국에서 가장 높은산은?",
        answers: ["설악산", "지리산", "한라산"],
        correct: 2
    },
    {
        question: "'물티슈'의 영어표기로 알맞은 것은?",
        answers: ["wet tissue", "water tissue", "hand tissue"],
        correct: 0
    },
    {
        question: "가정의 달은 몇 월 일까요?",
        answers: ["4월", "5월", "6월"],
        correct: 1
    },
    {
        question: "지구에서 가장 큰 바다는?",
        answers: ["태평양", "인도양", "대서양"],
        correct: 0
    },
    {
        question: "스마트폰을 기기에 접촉해 카드결제를 할 수 있는 통신기술의 이름은?",
        answers: ["WIFI", "NFC", "TAG"],
        correct: 1
    },
];

let questionIndex = 0;
let correctIndex = 0;
let inCorrectIndex = 0;
let timerInterval;

// 문제 보여주는 함수
const showQuestion = () => {
    const questionElement = document.querySelector(".question-text");

    questionElement.textContent = questions[questionIndex].question;
    answerButtons.forEach((btn, index) => {
        btn.textContent = questions[questionIndex].answers[index];
        btn.classList.remove("incorrect");
        btn.classList.remove("correct");
        btn.disabled = false;
        btn.onclick = () => selectAnswer(index); // forEach로 인한 이벤트리스너 중복 방지
        o.style.display = 'none';
        x.style.display = 'none';
    });

    // 타이머 초기화
    clearInterval(timerInterval);
    timerFill.style.width = '100%';

    // 타이머 시작
    let timeLeft = 10;
    timerInterval = setInterval(() => {
        timeLeft--;
        timerFill.style.width = `${(timeLeft / 10) * 100}%`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            selectAnswer(-1);
        }
    }, 1000); // 1000ms마다 실행
}

// 답변 클릭시 실행 함수
const selectAnswer = (index) => {
    const correctNum = document.querySelector('.correct-num');
    const leftNum = document.querySelector('.left-num');
    const inCorrectNum = document.querySelector('.incorrect-num');

    answerButtons.forEach(btn => btn.disabled = true); // 중복 버튼 클릭 방지

    if (index === questions[questionIndex].correct) {
        answerButtons[index].classList.add('correct');
        o.style.display = 'block';
        correctIndex++;
    } else {
        if (index !== -1) answerButtons[index].classList.add('incorrect');
        x.style.display = 'block';
        inCorrectIndex++;
    }
    leftNum.textContent = `${questions.length - 1 - questionIndex}개`;
    correctNum.textContent = `${correctIndex}개`;
    inCorrectNum.textContent = `${inCorrectIndex}개`

    setTimeout(() => {
        questionIndex++;
        if (questionIndex < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    }, 500);
}
// 퀴즈 리셋
const resetQuiz = () => {
    clearInterval(timerInterval);
    questionIndex = 0;
    correctIndex = 0;
    inCorrectIndex = 0;
    timerFill.style.width = '100%';
    quizMainIn.style.display = 'none';
    quizResults.style.display = 'none';
    quizLogin.style.display = 'flex';
}
// 결과 보기
const showResults = () => {
    quizMainIn.style.display = 'none';
    quizResults.style.display = 'flex';
    resultsCorrect.textContent = `정답: ${correctIndex}개`;
    resultsIncorrect.textContent = `오답: ${inCorrectIndex}개`;
}

// z-index 함수
quizModal.addEventListener('click', function () {
    increaseZIndex(quizModal);
});

// 드레그 함수
addDragFunctionality(quizModal, quizHeader);