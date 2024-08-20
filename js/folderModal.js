
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

// z-index 함수
folderModal.addEventListener('click', function () {
    increaseZIndex(folderModal);
});

// 드레그 함수
addDragFunctionality(folderModal, folderHeader);