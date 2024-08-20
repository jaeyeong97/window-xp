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
