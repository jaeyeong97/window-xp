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

// z-index 함수
memoModal.addEventListener('click', function () {
    increaseZIndex(memoModal);
});

// 드레그 함수
addDragFunctionality(memoModal, memoHeader);
