// 로딩 화면

const loadingScreen = document.querySelector('.loading-screen');
const loginScreen = document.querySelector('.login-screen');
const mainScreen = document.querySelector('.main-screen');

// 수정중
// setTimeout(function () {
//     loadingScreen.style.display = 'none';
//     loginScreen.style.display = 'block';
//     loginPassword1.focus();
// }, 5000);

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
// 로그인 성공 애니메이션 끝

// 로그인 화면 끝

// 메인 화면

const icons = document.querySelectorAll('.icon');

//아이콘 클릭 이벤트
icons.forEach((icon) => {
    icon.addEventListener('click', function (event) {
        event.stopPropagation();
        icons.forEach(i => {
            i.querySelector('.icon-img').style.opacity = '1';
            i.querySelector('.icon-img').style.backgroundColor = '';
            i.querySelector('.icon-text').style.backgroundColor = '';
        });
        const iconImg = icon.querySelector('.icon-img');
        const iconTxt = icon.querySelector('.icon-text');
        iconImg.style.opacity = '0.7';
        iconImg.style.backgroundColor = '#0B61FF';
        iconTxt.style.backgroundColor = '#0B61FF';
    })
})

document.addEventListener('click', () => {
    icons.forEach(i => {
        i.querySelector('.icon-img').style.opacity = '1';
        i.querySelector('.icon-img').style.backgroundColor = '';
        i.querySelector('.icon-text').style.backgroundColor = '';
    });
});
//아이콘 클릭 이벤트 끝

// 창 띄우기 공통
const fullScreenStates = {
    internet: false,
    memo: false,
    myComputer: false,
    rsp: false,
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
// 창 띄우기 공통 끝

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
// 모달 창 드레그 공통 끝


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
// 인터넷 창 띄우기 끝

// 인터넷 창 닫기
internetCloseBtn.addEventListener('click', function () {
    internetModal.style.display = 'none';
});
internetExit.addEventListener('click', function () {
    internetModal.style.display = 'none';
});
// 인터넷 창 닫기 끝

// 인터넷 창 확대 
internetFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(internetModal, 'internet', '70px', '120px', '700px', '500px');
});
internetHeader.addEventListener('dblclick', function () {
    fullScreenFunction(internetModal, 'internet', '70px', '120px', '700px', '500px');
});
// 인터넷 창 확대 끝

addDragFunctionality(internetModal, internetHeader);
// 인터넷 모달 관련 끝

// 메모장 모달 관련
const memoModal = document.querySelector('.memo-modal');
const memoCloseBtn = document.querySelector('.memo-modal-header1-right-btn3');
const memoFullScreenBtn = document.querySelector('.memo-modal-header1-right-btn2');
const memoHeader = document.querySelector('.memo-modal-header1');
const memoExit = document.querySelector('.exit-memo');

// 메모장 창 닫기
memoCloseBtn.addEventListener('click', function () {
    memoModal.style.display = 'none';
});
memoExit.addEventListener('click', function () {
    memoModal.style.display = 'none';
});
// 메모장 창 닫기 끝

// 메모장 창 확대
memoFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
});
memoHeader.addEventListener('dblclick', function () {
    fullScreenFunction(memoModal, 'memo', '100px', '150px', '400px', '370px');
});
// 메모장 창 확대 끝

// 메모장 열기
memoIcon.addEventListener('dblclick', function () {
    memoModal.style.display = 'block';
});
// 메모장 열기 끝

// 메모장 저장
// const saveMemo = document.querySelector('.save');
// const textarea = document.querySelector('.textarea');
// const iconWrap = document.querySelector('.icon-wrap');

// saveMemo.addEventListener('click', function () {
//     const memoText = textarea.value;

//     if (memoText !== '') {
//         const newIcon = document.createElement('div');
//         newIcon.classList.add('icon');

//         const iconImg = document.createElement('img');
//         iconImg.src = '../img/notepad.png';
//         iconImg.alt = 'notepad-icon';
//         iconImg.classList.add('icon-img');

//         const iconText = document.createElement('div');
//         iconText.classList.add('icon-text');
//         iconText.textContent = memoText;

//         newIcon.appendChild(iconImg);
//         newIcon.appendChild(iconText);

//         iconWrap.appendChild(newIcon);

//         textarea.value = '';
//         alert('메모가 저장되었습니다.');
//     } else {
//         alert('메모를 입력해주세요.');
//     }
// });
// 메모장 저장 끝

addDragFunctionality(memoModal, memoHeader);
// 메모장 모달 관련 끝

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
// 내 컴퓨터 창 열기 끝
// 내 컴퓨터 창 닫기
myComputerCloseBtn.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
});
myComputerExit.addEventListener('click', function () {
    myComputerModal.style.display = 'none';
});
// 내 컴퓨터 창 닫기 끝

// 내 컴퓨터 창 확대
myComputerFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(myComputerModal, 'myComputer', '30px', '50px', '600px', '530px');
});
myComputerHeader.addEventListener('dblclick', function () {
    fullScreenFunction(myComputerModal, 'myComputer', '30px', '50px', '600px', '530px');
});
// 내 컴퓨터 창 확대 끝

addDragFunctionality(myComputerModal, myComputerHeader);
// 내 컴퓨터 모달 관련 끝

// 가위바위보 모달 관련
const rspIcon = document.querySelector('.rsp-icon');
const rspModal = document.querySelector('.rock-scissors-paper-modal');
const rspFullScreenBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn2');
const rspCloseBtn = document.querySelector('.rock-scissors-paper-modal-header1-right-btn3');
const rspHeader = document.querySelector('.rock-scissors-paper-modal-header1');
const gameArea = document.querySelector('.game-area');
const gameStartBtn = document.querySelector('.game-start');

// 가위바위보 모달 열기
rspIcon.addEventListener('dblclick', async function () {
    rspModal.style.display = 'flex';
    gameStartBtn.style.display = 'block';
    try {
        const module = await import('../js/rsp.js');
        module.default();
    } catch (error) {
        console.error('가위바위보 스크립트 에러', error);
    }
});
// 가위바위보 모달 열기 끝
// 가위바위보 모달 닫기
rspCloseBtn.addEventListener('click', function () {
    rspModal.style.display = 'none';
    gameArea.style.display = 'none';
});
// 가위바위보 모달 닫기 끝
// 가위바위보 창 확대
rspFullScreenBtn.addEventListener('click', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});
rspHeader.addEventListener('dblclick', function () {
    fullScreenFunction(rspModal, 'rsp', '30px', '50px', '600px', '629px');
});
// 가위바위보 창 확대 끝

addDragFunctionality(rspModal, rspHeader);
// 가위바위보 모달 관련 끝
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
// 공통 z-index 끝
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
const linkToComputer = document.querySelector('.main-computer-link');
const linkToMemo = document.querySelector('.main-memo-link');

// 시작메뉴 열기
startMenu.addEventListener('click', function () {
    startMenuModal.style.display === 'block' ? startMenuModal.style.display = 'none' : startMenuModal.style.display = 'block';
});
// 시작메뉴 열기 끝
// 시작메뉴 외 클릭시 닫기
document.addEventListener('click', function (event) {
    if (!startMenu.contains(event.target) && !startMenuModal.contains(event.target)) {
        startMenuModal.style.display = 'none';
    }
});
// 시작메뉴 외 클릭시 닫기 끝
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
// 로그오프 모달 끝

// 인터넷 열기
linkToInternet.addEventListener('click', function () {
    internetModal.style.display = 'block';
    startMenuModal.style.display = 'none';
});
// 인터넷 열기 끝
// 메모장 열기
linkToMemo.addEventListener('click', function () {
    memoModal.style.display = 'block';
    startMenuModal.style.display = 'none';
});
// 메모장 열기 끝
//  내 컴퓨터 열기
linkToComputer.addEventListener('click', function () {
    myComputerModal.style.display = 'block';
    startMenuModal.style.display = 'none';
});
//  내 컴퓨터 열기 끝

// 시작 메뉴 끝
// 푸터 끝
// 메인 화면 끝