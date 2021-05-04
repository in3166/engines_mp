C:/jupyter/linear/Jintech/engine2/web-react

## 사용 모듈

- axios
- react-hook-form: 회원가입, 로그인 form
- React Router Dom: 페이지 이동 시 사용
- http-proxy-middleware: proxy 사용
- chart.js: npm install --save chart.js@2.9.4 react-chartjs-2 (최신버전 사용 시 오류 발생)
- react-highlight-words

- redux
  - store에 state 변경을 하려면 dispatch(action)으로 하는데 `Action`은 plain object(객체 형식)
  - 그런데 store은 항상 객체 형식으로 받지 않고 'Promise'나 'function' 등의 형태로도 받음
- react-redux

- redux-promise: dispatch에게 `Promise`을 받는 방법을 알려주는 미들웨어
- redux-thunk: dispatch에게 `function`을 받는 방법을 알려주는 미들웨어

## 모듈 다운로드

`npm install`

## 구조

- Redux 위한 폴더

  - \_actions
  - \_reducer

- Page들

  - componenets/views

- 해당 페이지 관련 css, componenet

  - compoenets/views/Sections

- Routing 관련

  - App.js

- 환경 변수 정의

  - Config.js

- hoc

  - Higher Order Componenet
  - 권한 확인 기능

- 여러 군데에서 쓰일 component
  - utils

## 참고

- proxy 파일 대신 package.json 안에 // "proxy": "http://localhost:5000", 추가해도 됨.