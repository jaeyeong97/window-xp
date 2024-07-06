let running;

export default function () {

    const gameArea = document.querySelector('.game-area');
    const rspModal = document.querySelector('.rock-scissors-paper-modal');
    const gameStartBtn = document.querySelector('.game-start');
    const beforeGameScreen = document.querySelector('.game-before-start-wrap');
    const scissors = document.querySelector('.scissors-img');
    const rock = document.querySelector('.rock-img');
    const paper = document.querySelector('.paper-img');
    const items = []; // 모든 아이템
    const itemSize = 50;
    const areaSize = 500;

    const images = {
        scissors: '../img/scissors.png',
        rock: '../img/rock.png',
        paper: '../img/paper.png'
    };

    const rspArr = ['scissors', 'rock', 'paper'];

    // 게임 시작 버튼
    gameStartBtn.addEventListener('click', function () {
        beforeGameScreen.style.display = 'none';
        gameArea.style.display = 'block';
        if (scissors.classList.contains('shaking')) {
            scissors.classList.remove('shaking');
        } else if (rock.classList.contains('shaking')) {
            rock.classList.remove('shaking');
        } else if (paper.classList.contains('shaking')) {
            paper.classList.remove('shaking');
        }
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
            let newTop = top + (Math.random() - 0.5) * 40; // 위아래 20px씩
            let newLeft = left + (Math.random() - 0.5) * 40; // 좌우 20px씩
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
            resetGame('가위');
        } else if (rockCount > 0 && scissorsCount === 0 && paperCount === 0) {
            resetGame('바위');
        } else if (paperCount > 0 && scissorsCount === 0 && rockCount === 0) {
            resetGame('보');
        }
    }

    // 게임을 초기화하는 함수
    function resetGame(winner) {
        const winnerText = document.querySelector('.winner-text');
        gameArea.innerHTML = '';
        items.length = 0;
        gameArea.style.display = 'none';
        winnerText.style.display = 'block';
        if (winner === '가위') {
            winnerText.textContent = '가위 승리!';
            scissors.classList.add('shaking');
        } else if (winner === '바위') {
            winnerText.textContent = '바위 승리!';
            rock.classList.add('shaking');
        } else if (winner === '보') {
            winnerText.textContent = '보 승리!';
            paper.classList.add('shaking');
        }
        beforeGameScreen.style.display = 'flex';
    };

    // 0.1초마다 실행
    running = setInterval(() => {
        if (rspModal.style.display === 'none') {
            clearInterval(running);
            gameArea.innerHTML = '';
            items.length = 0;
            return;
        }
        moveItems();
        checkCollisions();
    }, 100);
}