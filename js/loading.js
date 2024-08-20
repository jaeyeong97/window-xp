const loadingScreen = document.querySelector('.loading-screen');
const loginScreen = document.querySelector('.login-screen');
const mainScreen = document.querySelector('.main-screen');

setTimeout(function () {
    loadingScreen.style.display = 'none';
    loginScreen.style.display = 'block';
    loginPassword1.focus();
}, 4000);