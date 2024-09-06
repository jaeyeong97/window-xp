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

// 모달 전체화면
const fullScreenStates = {
    internet: false,
    memo: false,
    myComputer: false,
    rsp: false,
    quiz: false,
    folder: false,
};

// 전체화면 함수
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

// 공통 z-index
let zIndexValue = 1;

function increaseZIndex(modal) {
    zIndexValue++;
    modal.style.zIndex = zIndexValue;
}

// 푸터 실시간
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