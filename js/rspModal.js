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

// z-index 함수
rspModal.addEventListener('click', function () {
    increaseZIndex(rspModal);
});

// 드레그 함수
addDragFunctionality(rspModal, rspHeader);