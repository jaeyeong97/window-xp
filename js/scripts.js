// 로딩 화면

const loadingScreen = document.querySelector('.loading-screen');
const loginScreen = document.querySelector('.login-screen');
const mainScreen = document.querySelector('.main-screen');

setTimeout(function () {
    loadingScreen.style.display = 'none';
    loginScreen.style.display = 'block';
    loginPassword1.focus();
}, 4000);

// 로딩 화면 끝
// 로그인 화면

const user = document.querySelectorAll('.back-gradient');
const loginPassword1 = document.querySelector('.login-password1');
const loginPassword2 = document.querySelector('.login-password2');
const loginBtn1 = document.querySelector('.login-btn1');
const loginBtn2 = document.querySelector('.login-btn2');
const passwordText1 = document.querySelector('.password-text1');
const passwordText2 = document.querySelector('.password-text2');

user.forEach((userElement, index) => {
    userElement.addEventListener('click', function () {
        const activeUser = document.querySelector('.back-gradient.active');
        if (activeUser) {
            activeUser.classList.remove('active');
        }
        userElement.classList.add('active');
        if (index === 0) {
            loginPassword1.focus();
        } else if (index === 1) {
            loginPassword2.focus();
        }
    });
});

const loginSuccess = () => {
    loginSuccessAnimation();
    setTimeout(() => {
        loginScreen.style.display = 'none';
        mainScreen.style.display = 'block';
    }, 1000);
};

const handleLogin = (passwordInput, correctPassword, passwordText) => {
    if (passwordInput.value === correctPassword) {
        loginSuccess();
    } else {
        passwordText.textContent = `비밀번호는 ${correctPassword} 입니다.`;
        passwordText.style.color = 'red';
        passwordInput.value = '';
    }
};

loginBtn1.addEventListener('click', () => handleLogin(loginPassword1, '1234', passwordText1));
loginBtn2.addEventListener('click', () => handleLogin(loginPassword2, '123', passwordText2));

loginPassword1.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleLogin(loginPassword1, '1234', passwordText1);
    }
});
loginPassword2.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        handleLogin(loginPassword2, '123', passwordText2);
    }
});

// 로그인 성공 애니메이션
const loginSuccessAnimation = () => {
    const left = document.querySelector('.left');
    const welcome = document.querySelector('.welcome');

    user.forEach(user => {
        if (!user.classList.contains('active')) {
            user.style.display = 'none';
        }
    });

    left.style.display = 'none';
    loginPassword1.style.display = 'none';
    loginPassword2.style.display = 'none';
    loginBtn1.style.display = 'none';
    loginBtn2.style.display = 'none';
    passwordText1.style.display = 'none';
    passwordText2.style.display = 'none';

    welcome.style.display = 'block';
};
// 로그인 화면 끝
// 메인 화면

const icons = document.querySelectorAll('.icon');

//아이콘 클릭 이벤트
function addIconClickListener(icon) {
    icon.addEventListener('click', function (event) {
        event.stopPropagation();
        document.querySelectorAll('.icon').forEach(i => {
            i.querySelector('.icon-img').style.opacity = '1';
            i.querySelector('.icon-img').style.backgroundColor = '';
            i.querySelector('.icon-text').style.backgroundColor = '';
        });
        const iconImg = icon.querySelector('.icon-img');
        const iconTxt = icon.querySelector('.icon-text');
        iconImg.style.opacity = '0.7';
        iconImg.style.backgroundColor = '#0B61FF';
        iconTxt.style.backgroundColor = '#0B61FF';
    });
}

document.querySelectorAll('.icon').forEach(addIconClickListener);

document.addEventListener('click', () => {
    document.querySelectorAll('.icon').forEach(i => {
        i.querySelector('.icon-img').style.opacity = '1';
        i.querySelector('.icon-img').style.backgroundColor = '';
        i.querySelector('.icon-text').style.backgroundColor = '';
    });
});

// 창 띄우기 공통
const fullScreenStates = {
    internet: false,
    memo: false,
    myComputer: false,
    rsp: false,
    quiz: false,
};

const fullScreenFunction = (modal, modalName, defaultTop, defaultLeft, defaultWidth, defaultHeight) => {
    if (!fullScreenStates[modalName]) {
        modal.style.top = '0';
        modal.style.left = '0';
        modal.style.width = '100%';
        modal.style.height = 'calc(100% - 35px)';
        fullScreenStates[modalName] = true;
    } else {
        modal.style.top = defaultTop;
        modal.style.left = defaultLeft;
        modal.style.width = defaultWidth;
        modal.style.height = defaultHeight;
        fullScreenStates[modalName] = false;
    }
};

// 모달 창 드레그 공통
const addDragFunctionality = (modal, header) => {
    let isDragging = false;
    let initialX;
    let initialY;

    header.addEventListener('mousedown', (e) => {
        isDragging = true;
        initialX = e.clientX - modal.offsetLeft;
        initialY = e.clientY - modal.offsetTop;
    });

    document.addEventListener('mousemove', (e) => {
        if (isDragging) {
            const newX = e.clientX - initialX;
            const newY = e.clientY - initialY;
            modal.style.left = `${newX}px`;
            modal.style.top = `${newY}px`;
        }
    });

    document.addEventListener('mouseup', () => {
        isDragging = false;
    });
};

// 인터넷 모달 관련
const memoIcon = document.querySelector('.memo-icon');
const internetHeader = document.querySelector('.internet-modal-header1');
const internetModal = document.querySelector('.internet-modal');
const internetIcon = document.querySelector('.internet-icon');
const internetCloseBtn = document.querySelector('.internet-modal-header1-right-btn3');
const internetFullScreenBtn = document.querySelector('.internet-modal-header1-right-btn2');
const internetExit = document.querySelector('.exit-internet');

// 인터넷 창 띄우기
internetIcon.addEventListener('dblclick', function () {
    internetModal.style.display = 'block';
});

// 인터넷 창 닫기
internetCloseBtn.addEventListener('click', function () {
    internetModal.style.display = 'none';
});
internetExit.addEventListener('click', function () {
    internetModal.style.display = 'none';
});

// 인터넷 창 확대 
internetFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(internetModal, 'internet', '70px', '120px', '700px', '500px');
});
internetHeader.addEventListener('dblclick', function () {
    fullScreenFunction(internetModal, 'internet', '70px', '120px', '700px', '500px');
});

addDragFunctionality(internetModal, internetHeader);

// 메모장 모달 관련
const memoModal = document.querySelector('.memo-modal');
const memoCloseBtn = document.querySelector('.memo-modal-header1-right-btn3');
const memoFullScreenBtn = document.querySelector('.memo-modal-header1-right-btn2');
const memoHeader = document.querySelector('.memo-modal-header1');
const memoExit = document.querySelector('.exit-memo');
const saveMemo = document.querySelector('.save-memo');
const textarea = document.querySelector('.textarea');
const iconWrap = document.querySelector('.ms-icon-wrap');
let num = 0;

// 메모장 창 닫기
memoCloseBtn.addEventListener('click', function () {
    memoModal.style.display = 'none';
    textarea.value = '';
});
memoExit.addEventListener('click', function () {
    memoModal.style.display = 'none';
    textarea.value = '';
});

// 메모장 창 확대
memoFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
});
memoHeader.addEventListener('dblclick', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
});

// 메모장 열기
memoIcon.addEventListener('dblclick', function () {
    memoModal.style.display = 'block';
});

// 메모장 저장
saveMemo.addEventListener('click', function () {
    const memoText = textarea.value;
    if (memoText !== '') {
        num++;
        const newIcon = document.createElement('div');
        newIcon.classList.add('icon');

        const iconImg = document.createElement('img');
        iconImg.src = '../img/notepad.png';
        iconImg.alt = 'notepad-icon';
        iconImg.classList.add('icon-img');

        const iconText = document.createElement('div');
        iconText.classList.add('icon-text');
        iconText.textContent = `제목 없음${num}`;

        newIcon.appendChild(iconImg);
        newIcon.appendChild(iconText);

        iconWrap.appendChild(newIcon);

        textarea.value = '';
        alert('메모가 저장되었습니다.');

        memoModal.style.display = 'none';

        newIcon.addEventListener('dblclick', function () {
            memoModal.style.display = 'block';
            textarea.value = memoText;
        });
        addIconClickListener(newIcon);
    } else {
        alert('메모를 입력해주세요.');
    }
});

addDragFunctionality(memoModal, memoHeader);

// 내 컴퓨터 모달 관련
const myComputerModal = document.querySelector('.my-computer-modal');
const myComputerIcon = document.querySelector('.computer-icon');
const myComputerCloseBtn = document.querySelector('.my-computer-modal-header1-right-btn3');
const myComputerFullScreenBtn = document.querySelector('.my-computer-modal-header1-right-btn2');
const myComputerHeader = document.querySelector('.my-computer-modal-header1');
const myComputerExit = document.querySelector('.exit-my-computer');

// 내 컴퓨터 창 열기
myComputerIcon.addEventListener('dblclick', function () {
    myComputerModal.style.display = 'block';
});
// 내 컴퓨터 창 닫기
myComputerCloseBtn.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
});
myComputerExit.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
});

// 내 컴퓨터 창 확대
myComputerFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(myComputerModal, 'myComputer', '30px', '50px', '600px', '530px');
});
myComputerHeader.addEventListener('dblclick', function () {
    fullScreenFunction(myComputerModal, 'myComputer', '30px', '50px', '600px', '530px');
});

addDragFunctionality(myComputerModal, myComputerHeader);

// 가위바위보 모달 관련
const rspIcon = document.querySelector('.rsp-icon');
const rspModal = document.querySelector('.rock-scissors-paper-modal');
const rspFullScreenBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn2');
const rspCloseBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn3');
const rspHeader = document.querySelector('.rock-scissors-paper-modal-header1');
const gameArea = document.querySelector('.game-area');
const gameStartBtn = document.querySelector('.game-start');
const beforeGameScreen = document.querySelector('.game-before-start-wrap');
const scissors = document.querySelector('.scissors-img');
const rock = document.querySelector('.rock-img');
const paper = document.querySelector('.paper-img');
const winnerText = document.querySelector('.winner-text');

// 가위바위보 스크립트 실행
async function loadAndStartGame() {
    rspModal.style.display = 'flex';
    beforeGameScreen.style.display = 'flex';
    try {
        const module = await import('../js/rsp.js');
        module.default();
    } catch (error) {
        console.error('가위바위보 스크립트 에러', error);
    }
}
// 가위바위보 모달 열기
rspIcon.addEventListener('dblclick', loadAndStartGame);

// 가위바위보 모달 닫기
rspCloseBtn.addEventListener('click', function () {
    rspModal.style.display = 'none';
    gameArea.style.display = 'none';
    winnerText.style.display = 'none';
    if (scissors.classList.contains('shaking')) {
        scissors.classList.remove('shaking');
    } else if (rock.classList.contains('shaking')) {
        rock.classList.remove('shaking');
    } else if (paper.classList.contains('shaking')) {
        paper.classList.remove('shaking');
    }
});
// 가위바위보 창 확대
rspFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});
rspHeader.addEventListener('dblclick', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});

addDragFunctionality(rspModal, rspHeader);

// 퀴즈 모달 관련
const quizIcon = document.querySelector('.quiz-icon');
const quizModal = document.querySelector('.quiz-modal');
const quizCloseBtn = document.querySelector('.quiz-modal-header1-right-btn3');
const quizFullScreenBtn = document.querySelector('.quiz-modal-header1-right-btn2');
const quizHeader = document.querySelector('.quiz-modal-header1');
const quizStartBtn = document.querySelector('.quiz-start-btn');
const quizMainIn = document.querySelector('.quiz-main-in');
const timerFill = document.querySelector(".timer-fill");
const answerButtons = document.querySelectorAll(".quiz-btn");
const quizStartBtnWrap = document.querySelector('.quiz-start-btn-wrap');
const quizResults = document.querySelector('.quiz-results');
const resultsCorrect = document.querySelector('.results-correct');
const resultsIncorrect = document.querySelector('.results-incorrect');
const quizRestartBtn = document.querySelector('.quiz-restart-btn');
const o = document.querySelector('.o');
const x = document.querySelector('.x');

// 퀴즈 창 열기
quizIcon.addEventListener('dblclick', function () {
    quizModal.style.display = 'block';
});
// 퀴즈 창 닫기
quizCloseBtn.addEventListener('click', function () {
    quizModal.style.display = 'none';
    resetQuiz();
});
// 퀴즈 창 전체화면
quizFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(quizModal, 'quiz', '70px', '120px', '550px', '600px');
});
quizHeader.addEventListener('dblclick', function () {
    fullScreenFunction(quizModal, 'quiz', '70px', '120px', '550px', '600px');
});

addDragFunctionality(quizModal, quizHeader);

// 퀴즈 시작 버튼
quizStartBtn.addEventListener('click', function () {
    quizStartBtnWrap.style.display = 'none';
    quizMainIn.style.display = 'block';
    showQuestion();
});
// 퀴즈 재시작 버튼
quizRestartBtn.addEventListener('click', function () {
    resetQuiz();
    quizStartBtnWrap.style.display = 'flex';
});
// 퀴즈 메인
const questions = [
    {
        question: "1 + 1 = ?",
        answers: ["0", "2", "창문"],
        correct: 2
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
    }, 1000);
}

// 답변 클릭시 실행 함수
const selectAnswer = (index) => {
    const correctNum = document.querySelector('.correct-num');
    const leftNum = document.querySelector('.left-num');
    const inCorrectNum = document.querySelector('.incorrect-num');

    clearInterval(timerInterval);

    answerButtons.forEach(btn => btn.disabled = true);

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
    quizStartBtnWrap.style.display = 'flex';
}
// 결과 보기
const showResults = () => {
    quizMainIn.style.display = 'none';
    quizResults.style.display = 'block';
    resultsCorrect.textContent = `정답: ${correctIndex}개`;
    resultsIncorrect.textContent = `오답: ${inCorrectIndex}개`;
}

// 공통 z-index
let zIndexValue = 1;

internetModal.addEventListener('click', function () {
    zIndexValue++;
    internetModal.style.zIndex = zIndexValue;
});
myComputerModal.addEventListener('click', function () {
    zIndexValue++;
    myComputerModal.style.zIndex = zIndexValue;
});
memoModal.addEventListener('click', function () {
    zIndexValue++;
    memoModal.style.zIndex = zIndexValue;
});
rspModal.addEventListener('click', function () {
    zIndexValue++;
    rspModal.style.zIndex = zIndexValue;
})
quizModal.addEventListener('click', function () {
    zIndexValue++;
    quizModal.style.zIndex = zIndexValue;
});
// 메인 화면 끝

// 푸터
function updateTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    let period = hours < 12 ? '오전' : '오후';

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;

    const clock = `${period} ${hours}:${minutes}`;
    document.querySelector('.time').textContent = clock;
}

setInterval(updateTime, 1000);

updateTime();

// 시작 메뉴
const startMenu = document.querySelector('.start-menu');
const startMenuModal = document.querySelector('.start-menu-modal');
const turnOffBtn = document.querySelector('.menu-turn-off-btn');
const logOffModal = document.querySelector('.log-off-modal');
const logOffModalCancel = document.querySelector('.cancel');
const turnOffComputer = document.querySelector('.turn-off-computer');
const linkToInternet = document.querySelector('.main-internet-link');
const linkToComputer = document.querySelectorAll('.main-computer-link');
const linkToMemo = document.querySelector('.main-memo-link');

// 시작메뉴 열기
startMenu.addEventListener('click', function () {
    startMenuModal.style.display === 'block' ? startMenuModal.style.display = 'none' : startMenuModal.style.display = 'block';
});

// 시작메뉴 외 클릭시 닫기
document.addEventListener('click', function (event) {
    if (!startMenu.contains(event.target) && !startMenuModal.contains(event.target)) {
        startMenuModal.style.display = 'none';
    }
});

// 로그오프 모달
turnOffBtn.addEventListener('click', function () {
    logOffModal.style.display = 'block';
    startMenuModal.style.display = 'none';
    mainScreen.classList.add('toGrayAnimation');
});

logOffModalCancel.addEventListener('click', function () {
    logOffModal.style.display = 'none';
    mainScreen.style.filter = 'initial';
    mainScreen.classList.remove('toGrayAnimation');
});

turnOffComputer.addEventListener('click', function () {
    window.close();
});

// 인터넷 열기
linkToInternet.addEventListener('click', function () {
    internetModal.style.display = 'block';
    startMenuModal.style.display = 'none';
});

// 메모장 열기
linkToMemo.addEventListener('click', function () {
    memoModal.style.display = 'block';
    startMenuModal.style.display = 'none';
});

//  내 컴퓨터 열기
linkToComputer.forEach((icon) => {
    icon.addEventListener('click', function () {
        myComputerModal.style.display = 'block';
        startMenuModal.style.display = 'none';
    });
})
// 푸터 끝