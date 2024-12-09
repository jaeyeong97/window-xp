# Windows XP 재구현 프로젝트

바닐라 자바스크립트를 사용하여 Windows XP의 경험을 웹에서 재구현한 프로젝트입니다. 로딩 화면부터 로그인 화면, 바탕화면까지 구현하여 추억의 Windows XP를 경험할 수 있도록 했습니다.

## 프로젝트 기능

- **로딩 화면**: Windows XP 로딩 화면을 구현했습니다.
- **로그인 화면**: 로그인 화면을 통해 Windows XP 로그인을 다시 경험할 수 있도록 UI를 만들었습니다.
- **바탕화면**: Windows XP의 바탕화면을 재현하였습니다.
  - **내 컴퓨터**: Windows XP 스타일로 내 컴퓨터 아이콘을 클릭하여 포트폴리오, 깃허브등 사이트로 이동가능하게 했습니다.
  - **메모장**: 간단한 메모장 기능을 구현했습니다. 메모를 저장할 경우 바탕화면에 새로운 아이콘이 생성됩니다.
  - **폴더**: 폴더 안에는 퍼블리싱한 프로젝트들이 링크되어 있어 확인 가능합니다.
  - **가위바위보 게임**: 팀을 선택하여 가위, 바위, 보 이미지가 애니메이션처럼 움직이다가 하나의 팀만 남았을 경우 승패가 결정됩니다.
  - **상식 퀴즈**: 간단한 로그인/회원가입 기능이 있으며, 상식 퀴즈 게임을 통해 맞힌 문제 수를 확인할 수 있습니다.

- **창 관리 기능**:
  - 각 창을 더블 클릭하면 전체 화면으로 전환됩니다.
  - 여러 창을 열었을 때 클릭한 창이 최상단으로 오도록 `z-index`를 조정했습니다.

- **상태바**:
  - 하단 상태바에는 현재 시간이 실시간으로 표시됩니다.
  - '컴퓨터 종료' 버튼을 클릭하면 실제 웹사이트가 닫히는 기능을 구현했습니다.

## 주요 기술 스택

- **Vanilla JavaScript**: 순수 자바스크립트를 사용하여 전체 프로젝트를 구현.
- **HTML/CSS**: 기본적인 스타일링과 레이아웃 구성에 사용.

## 프로젝트 주소

https://window-xp.netlify.app/
