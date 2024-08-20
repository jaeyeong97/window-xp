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

// z-index 함수
myComputerModal.addEventListener('click', function () {
    increaseZIndex(myComputerModal);
});

// 드레그 함수
addDragFunctionality(myComputerModal, myComputerHeader);
