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
    folder: false,
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
const internetUnderBar = document.querySelector('.internet-modal-header1-right-btn1');

let internetBar;

// 인터넷 창 띄우기
internetIcon.addEventListener('dblclick', function () {
    internetModal.style.display = 'block';

    // 상태바 추가
    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.internet-bar');

    if (!existCheck) {
        internetBar = document.createElement('div');
        internetBar.classList.add('bar', 'internet-bar');

        const img = document.createElement('img');
        img.src = 'img/internet_header_logo.png';
        img.alt = 'internet';

        const span = document.createElement('span');
        span.textContent = 'InternetExplorer';

        internetBar.appendChild(img);
        internetBar.appendChild(span);
        statusBar.appendChild(internetBar);

        internetBar.addEventListener('click', function () {
            increaseZIndex(internetModal);
            internetModal.style.display = 'block';
        });
    }

});

// 인터넷 창 닫기
internetCloseBtn.addEventListener('click', function () {
    internetModal.style.display = 'none';
    internetBar.remove();
});
internetExit.addEventListener('click', function () {
    internetModal.style.display = 'none';
    internetBar.remove();
});
internetUnderBar.addEventListener('click', function () {
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
const memoUnderBar = document.querySelector('.memo-modal-header1-right-btn1');

let num = 0;

let memoBar;

// 메모장 열기
memoIcon.addEventListener('dblclick', function () {
    memoModal.style.display = 'block';

    // 상태바 추가
    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.memo-bar');

    if (!existCheck) {
        memoBar = document.createElement('div');
        memoBar.classList.add('bar', 'memo-bar');

        const img = document.createElement('img');
        img.src = 'img/notepad.png';
        img.alt = 'notepad';

        const span = document.createElement('span');
        span.textContent = 'Untitled - Notepad';

        memoBar.appendChild(img);
        memoBar.appendChild(span);
        statusBar.appendChild(memoBar);

        memoBar.addEventListener('click', function () {
            increaseZIndex(memoModal);
            memoModal.style.display = 'block';
        });
    }
});

// 메모장 창 닫기
memoCloseBtn.addEventListener('click', function () {
    memoModal.style.display = 'none';
    memoBar.remove();
    textarea.value = '';
});
memoExit.addEventListener('click', function () {
    memoModal.style.display = 'none';
    memoBar.remove();
    textarea.value = '';
});
memoUnderBar.addEventListener('click', function () {
    memoModal.style.display = 'none';
});

// 메모장 창 확대
memoFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
});
memoHeader.addEventListener('dblclick', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
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
        iconText.classList.add('icon-text'); // 아이콘이름 부분
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
const myComputerUnderBar = document.querySelector('.my-computer-modal-header1-right-btn1');

let myComputerBar;

// 내 컴퓨터 창 열기
myComputerIcon.addEventListener('dblclick', function () {
    myComputerModal.style.display = 'block';

    // 상태바 추가
    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.my-computer-bar');

    if (!existCheck) {
        myComputerBar = document.createElement('div');
        myComputerBar.classList.add('bar', 'my-computer-bar');

        const img = document.createElement('img');
        img.src = 'img/computer.png';
        img.alt = 'computer';

        const span = document.createElement('span');
        span.textContent = 'My Computer';

        myComputerBar.appendChild(img);
        myComputerBar.appendChild(span);
        statusBar.appendChild(myComputerBar);

        myComputerBar.addEventListener('click', function () {
            increaseZIndex(myComputerModal);
            myComputerModal.style.display = 'block';
        });
    }
});
// 내 컴퓨터 창 닫기
myComputerCloseBtn.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
    myComputerBar.remove();
});
myComputerExit.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
    myComputerBar.remove();
});
myComputerUnderBar.addEventListener('click', function () {
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
let running;
let selectedTeam = '';

const rspIcon = document.querySelector('.rsp-icon');
const rspModal = document.querySelector('.rock-scissors-paper-modal');
const rspFullScreenBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn2');
const rspCloseBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn3');
const rspHeader = document.querySelector('.rock-scissors-paper-modal-header1');
const gameArea = document.querySelector('.game-area');
const beforeGameScreen = document.querySelector('.game-before-start-wrap');
const gameResultWrap = document.querySelector('.game-result');
const gameStartBtn = document.querySelector('.game-start');
const scissorsBox = document.querySelector('.scissors-box');
const rockBox = document.querySelector('.rock-box');
const paperBox = document.querySelector('.paper-box');
const rspUnderBar = document.querySelector('.rock-scissors-paper-modal-header1-right-btn1');

const items = []; // 모든 아이템
const itemSize = 50;
const areaSize = 500;

let rspBar;

// 가위바위보 모달 열기
rspIcon.addEventListener('dblclick', function () {
    rspModal.style.display = 'flex';
    beforeGameScreen.style.display = 'flex';

    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.rsp-bar');

    if (!existCheck) {
        rspBar = document.createElement('div');
        rspBar.classList.add('bar', 'rsp-bar');

        const img = document.createElement('img');
        img.src = 'img/rock.png';
        img.alt = 'rsp';

        const span = document.createElement('span');
        span.textContent = 'RSP Game';

        rspBar.appendChild(img);
        rspBar.appendChild(span);
        statusBar.appendChild(rspBar);

        rspBar.addEventListener('click', function () {
            increaseZIndex(rspModal);
            rspModal.style.display = 'flex';
        });
    }

    if (!running) {
        running = setInterval(() => {
            if (rspModal.style.display === 'none') {
                clearInterval(running);
                running = null;
                gameArea.innerHTML = '';
                gameArea.style.display = 'none';
                items.length = 0;
                return;
            }
            moveItems();
            checkCollisions();
        }, 100);
    }
    rockBox.style.backgroundColor = 'initial';
    scissorsBox.style.backgroundColor = 'initial';
    paperBox.style.backgroundColor = 'initial';
    rockBox.querySelector('span').style.display = 'none';
    scissorsBox.querySelector('span').style.display = 'none';
    paperBox.querySelector('span').style.display = 'none';
});

// 가위바위보 모달 닫기
rspCloseBtn.addEventListener('click', function () {
    rspModal.style.display = 'none';
    beforeGameScreen.style.display = 'none';
    gameResultWrap.style.display = 'none';
    gameArea.style.display = 'none';
    selectedTeam = '';
    clearInterval(running);
    running = null;
    gameArea.innerHTML = '';
    items.length = 0;
    rspBar.remove();
});
rspUnderBar.addEventListener('click', function () {
    rspModal.style.display = 'none';
});

// 가위바위보 창 확대
rspFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});
rspHeader.addEventListener('dblclick', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});

addDragFunctionality(rspModal, rspHeader);

const images = {
    scissors: '../img/scissors.png',
    rock: '../img/rock.png',
    paper: '../img/paper.png'
};

const rspArr = ['scissors', 'rock', 'paper'];

scissorsBox.addEventListener('click', function () {
    selectedTeam = '가위';
    scissorsBox.querySelector('span').style.display = 'block';
    rockBox.querySelector('span').style.display = 'none';
    paperBox.querySelector('span').style.display = 'none';
    scissorsBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    rockBox.style.backgroundColor = 'initial';
    paperBox.style.backgroundColor = 'initial';
});

rockBox.addEventListener('click', function () {
    selectedTeam = '바위';
    scissorsBox.querySelector('span').style.display = 'none';
    rockBox.querySelector('span').style.display = 'block';
    paperBox.querySelector('span').style.display = 'none';
    rockBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    scissorsBox.style.backgroundColor = 'initial';
    paperBox.style.backgroundColor = 'initial';
});

paperBox.addEventListener('click', function () {
    selectedTeam = '보';
    scissorsBox.querySelector('span').style.display = 'none';
    rockBox.querySelector('span').style.display = 'none';
    paperBox.querySelector('span').style.display = 'block';
    paperBox.style.backgroundColor = 'rgba(255, 255, 255, 0.2)';
    scissorsBox.style.backgroundColor = 'initial';
    rockBox.style.backgroundColor = 'initial';
});

// 게임 시작 버튼
gameStartBtn.addEventListener('click', function () {
    if (!selectedTeam) {
        alert('팀을 선택해주세요!');
        return;
    }
    beforeGameScreen.style.display = 'none';
    gameArea.style.display = 'block';

    for (let i = 0; i < 10; i++) {
        rspArr.forEach(rsp => createItem(rsp));
    }
});

// 새로운 아이템 생성
function createItem(rsp) {
    const item = document.createElement('div');
    item.classList.add(rsp); // 클래스네임 설정
    item.style.backgroundImage = `url('${images[rsp]}')`;
    // 랜덤한 위치에 아이템 배치
    item.style.top = `${Math.random() * (areaSize - itemSize)}px`;
    item.style.left = `${Math.random() * (areaSize - itemSize)}px`;
    gameArea.appendChild(item);
    items.push(item);
}

// 아이템 랜덤 이동 함수
function moveItems() {
    items.forEach(item => {
        const top = parseFloat(item.style.top);
        const left = parseFloat(item.style.left);
        let newTop = top + (Math.random() - 0.5) * 30; // 위아래 15px씩
        let newLeft = left + (Math.random() - 0.5) * 30; // 좌우 15px씩
        // 이동 위치가 게임영역 벗어나지않게
        if (newTop < 0) {
            newTop = 0;
        } else if (newTop > areaSize - itemSize) {
            newTop = areaSize - itemSize;
        }

        if (newLeft < 0) {
            newLeft = 0;
        } else if (newLeft > areaSize - itemSize) {
            newLeft = areaSize - itemSize;
        }

        item.style.top = `${newTop}px`;
        item.style.left = `${newLeft}px`;
    });
}

// 아이템 충돌 확인
function checkCollisions() {
    for (let i = 0; i < items.length; i++) {
        for (let j = i + 1; j < items.length; j++) {
            if (isColliding(items[i], items[j])) { // 충돌이 발생하면
                handleCollision(items[i], items[j]); // 충돌 처리
            }
        }
    }
}

// 두 아이템이 충돌했는지 확인하는 함수
function isColliding(item1, item2) {
    const top1 = item1.offsetTop;
    const left1 = item1.offsetLeft;
    const width1 = item1.offsetWidth;
    const height1 = item1.offsetHeight;

    const top2 = item2.offsetTop;
    const left2 = item2.offsetLeft;
    const width2 = item2.offsetWidth;
    const height2 = item2.offsetHeight;

    // 두 사각형이 겹치는지 확인
    return (left1 + width1 >= left2 && left1 <= left2 + width2 && top1 + height1 >= top2 && top1 <= top2 + height2);

}

// 충돌을 처리하는 함수
function handleCollision(item1, item2) {
    const classList1 = item1.classList;
    const classList2 = item2.classList;

    if (classList1.contains('scissors') && classList2.contains('rock')) {
        changeRsp(item1, 'rock');
        changeRsp(item2, 'rock');
    } else if (classList1.contains('rock') && classList2.contains('scissors')) {
        changeRsp(item1, 'rock');
        changeRsp(item2, 'rock');
    } else if (classList1.contains('rock') && classList2.contains('paper')) {
        changeRsp(item1, 'paper');
        changeRsp(item2, 'paper');
    } else if (classList1.contains('paper') && classList2.contains('rock')) {
        changeRsp(item1, 'paper');
        changeRsp(item2, 'paper');
    } else if (classList1.contains('paper') && classList2.contains('scissors')) {
        changeRsp(item1, 'scissors');
        changeRsp(item2, 'scissors');
    } else if (classList1.contains('scissors') && classList2.contains('paper')) {
        changeRsp(item1, 'scissors');
        changeRsp(item2, 'scissors');
    }

    checkWinCondition(); // 승리 확인
}

// rsp 변경
function changeRsp(item, newRsp) {
    item.className = `item ${newRsp}`;
    item.style.backgroundImage = `url('${images[newRsp]}')`;
}

// 승리 확인
function checkWinCondition() {
    let scissorsCount = 0;
    let rockCount = 0;
    let paperCount = 0;

    // 각 타입의 아이템 개수 세기
    items.forEach(item => {
        if (item.classList.contains('scissors')) scissorsCount++;
        if (item.classList.contains('rock')) rockCount++;
        if (item.classList.contains('paper')) paperCount++;
    });

    // 하나의 타입만 남았는지 확인
    if (scissorsCount > 0 && rockCount === 0 && paperCount === 0) {
        gameResult('가위');
    } else if (rockCount > 0 && scissorsCount === 0 && paperCount === 0) {
        gameResult('바위');
    } else if (paperCount > 0 && scissorsCount === 0 && rockCount === 0) {
        gameResult('보');
    }
}

// 게임 결과창 함수
function gameResult(winner) {
    const winText = document.querySelector('.win');
    const loseText = document.querySelector('.lose');
    const winnerText = document.querySelector('.winner-text');
    const rockResultImg = document.querySelector('.rock-result');
    const scissorsResultImg = document.querySelector('.scissors-result');
    const paperResultImg = document.querySelector('.paper-result');
    gameResultWrap.style.display = 'flex';
    items.length = 0;
    gameArea.innerHTML = '';
    gameArea.style.display = 'none';
    scissorsResultImg.style.display = 'none';
    rockResultImg.style.display = 'none';
    paperResultImg.style.display = 'none';
    winText.style.display = 'none';
    loseText.style.display = 'none';

    if (winner === '가위') {
        if (selectedTeam === '가위') {
            winText.style.display = 'block';
        } else {
            winText.style.display = 'none';
            loseText.style.display = 'block';
        }
        scissorsResultImg.style.display = 'block';
        winnerText.textContent = '가위가 마지막까지 생존하였습니다!';
    } else if (winner === '바위') {
        if (selectedTeam === '바위') {
            winText.style.display = 'block';

        } else {
            winText.style.display = 'none';
            loseText.style.display = 'block';
        }
        rockResultImg.style.display = 'block';
        winnerText.textContent = '바위가 마지막까지 생존하였습니다!';
    } else if (winner === '보') {
        if (selectedTeam === '보') {
            winText.style.display = 'block';
        } else {
            winText.style.display = 'none';
            loseText.style.display = 'block';
        }
        paperResultImg.style.display = 'block';
        winnerText.textContent = '보가 마지막까지 생존하였습니다!';
    }
    selectedTeam = '';
};
// 가위바위보 모달 끝

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

    alert('회원가입 성공!');

    // 회원가입 성공 후 입력칸, alert 비우기
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
        alert('로그인 성공!');
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

addDragFunctionality(quizModal, quizHeader);

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

// 폴더 모달 관련
const folderIcon = document.querySelector('.folder-icon');
const folderModal = document.querySelector('.folder-modal');
const folderHeader = document.querySelector('.folder-modal-header1');
const folderFullScreenBtn = document.querySelector('.folder-modal-header1-right-btn2');
const folderCloseBtn = document.querySelector('.folder-modal-header1-right-btn3');
const folderExit = document.querySelector('.exit-folder');
const folderUnderBar = document.querySelector('.folder-modal-header1-right-btn1');

let folderBar;

// 폴더 창 열기
folderIcon.addEventListener('dblclick', function () {
    folderModal.style.display = 'block';

    const statusBar = document.querySelector('.status-bar');
    const existCheck = statusBar.querySelector('.folder-bar');

    if (!existCheck) {
        folderBar = document.createElement('div');
        folderBar.classList.add('bar', 'folder-bar');

        const img = document.createElement('img');
        img.src = 'img/com_f6.png';
        img.alt = 'folder';

        const span = document.createElement('span');
        span.textContent = 'Publishing Folder';

        folderBar.appendChild(img);
        folderBar.appendChild(span);
        statusBar.appendChild(folderBar);

        folderBar.addEventListener('click', function () {
            increaseZIndex(folderModal);
            folderModal.style.display = 'block';
        });
    }
});
// 폴더 창 닫기
folderCloseBtn.addEventListener('click', function () {
    folderModal.style.display = 'none';
    folderBar.remove();
});
folderExit.addEventListener('click', function () {
    folderModal.style.display = 'none';
    folderBar.remove();
});
folderUnderBar.addEventListener('click', function () {
    folderModal.style.display = 'none';
});

// 폴더 창 전체화면
folderFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(folderModal, 'folder', '50px', '105px', '650px', '630px');
});
folderHeader.addEventListener('dblclick', function () {
    fullScreenFunction(folderModal, 'folder', '50px', '105px', '650px', '630px');
});

addDragFunctionality(folderModal, folderHeader);
// 폴더 모달 끝
// 공통 z-index
let zIndexValue = 1;

function increaseZIndex(modal) {
    zIndexValue++;
    modal.style.zIndex = zIndexValue;
}

// 각 모달 클릭 시 z-index 증가
internetModal.addEventListener('click', function () {
    increaseZIndex(internetModal);
});
myComputerModal.addEventListener('click', function () {
    increaseZIndex(myComputerModal);
});
memoModal.addEventListener('click', function () {
    increaseZIndex(memoModal);
});
rspModal.addEventListener('click', function () {
    increaseZIndex(rspModal);
});
quizModal.addEventListener('click', function () {
    increaseZIndex(quizModal);
});
folderModal.addEventListener('click', function () {
    increaseZIndex(folderModal);
});
// 메인 화면 끝

// 푸터

// 실시간
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