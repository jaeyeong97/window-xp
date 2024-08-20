// 인터넷 모달
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

// z-index 함수
internetModal.addEventListener('click', function () {
    increaseZIndex(internetModal);
});

// 드레그 함수
addDragFunctionality(internetModal, internetHeader);