# 공장 별 엔진 기능 장애 경고(고장 예측) 서비스 개발 [진행중]

- 각 엔진별 데이터들을 받아서 엔진의 고장 여부 및 예측을 보여주는 서비스
  <br>

**<세부 기능>**

- 사용자 관리 (회원가입, 로그인, 직급별 권한 관리)

- 공장별 엔진, 부품, 수량 등 기본 데이터 관리

  - 부족한 부품이나 재고가 적은 경우 알림 서비스 및 주문 기능 제공

- 전문가 피드백 기능
  - 고장 예측 알고리즘과 전문가의 분석을 제공하고 분석된 내용을 토대로 알람 기능을 제공하고
  - 부품/자재의 현재 수량과 필요 수량을 비교하여 주문 기능 제공

<br><br>

## Client

### 구조

- Redux 폴더

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

### 참고

- proxy 파일 대신 package.json 안에 // "proxy": "http://localhost:5000", 추가해도 됨.
- jwt refresh token 미구현
- 서버 고려 사항: xss filter(sanitize-html), csrf, halmet(http 헤더)

- Conditional Rendering 중 잠깐 화면이 나오는 문제

  - Client3의 `LanderingPage`
  - userData가 undefined이어도 있는걸로? 생각
  - `user?.userData?.role !== undefined`를 추가해 해결

- `Added non-passive event listener to a scroll-blocking 'wheel' event.` 경고 발생
  - `https://unpkg.com/default-passive-events` 사용

### 사용 모듈

- React 라이브러리
- `axios`
- `prop-types`
- `npm i @ant-design/icons`
- `react-hook-form`: 회원가입, 로그인 form
- `React Router Dom`: 페이지 이동 시 사용
- `http-proxy-middleware`: proxy 사용
- `chart.js`: `npm install --save chart.js@2.9.4 react-chartjs-2` (최신버전 사용 시 오류 발생)
- `react-highlight-words`
- `redux`
  - store에 state 변경을 하려면 dispatch(action)으로 하는데 `Action`은 plain object(객체 형식)
  - 그런데 store은 항상 객체 형식으로 받지 않고 'Promise'나 'function' 등의 형태로도 받음
- `react-redux`
- `redux-promise`: dispatch에게 `Promise`을 받는 방법을 알려주는 미들웨어
- `redux-thunk`: dispatch에게 `function`을 받는 방법을 알려주는 미들웨어
- `npm install react-icons --save`

<br><br>

## Server

### 구조

- /config

  - 환경 변수 정의

- /middleware
  - auth.js
  - token과 cookie에 사용자 동일 비교
- /models
  - mongoDB 모델 정의
- /routes
  - 라우팅

### 참고

- git clone 주의사항

  - server/config/dev.js 생성

  - 포트설정

    - client 프로젝트 별로 package.json의 start에 설정
    - Window: `"start": "set PORT=3006 && react-scripts start"`
    - CentOS: `"start": "export PORT=3006 react-scripts start"`
    - Linux: `"start": "PORT=3006 react-scripts start"`

  - `npm install`

    - 리눅스에선 서버 프로젝트와 클라이언트 프로젝트 별로 설치해야줘야한다.
    - global로 설치하면 2번만 해도될 수 있다. (확인 필요)

  - 주소 수정

    - 프로젝트별 IP 변수 추가

      - ./src/ipconfig.json 파일로 통합

    - App.js
    - Navbar/
    - setupProxy.js

- gitignore 수정 후 적용하기
  - 우선 git 캐시 삭제 후 커밋하기
    - `git rm --cached setupProxy.js`

### 사용 모듈

- `Express`
- `bcrypt 라이브러리`
- `jsonwebtoken 라이브러리`
- `concurrently 라이브러리`
- `async 라이브러리`

<br><br>

## API

- python 고장 예측 알고리즘 API

<br><br>

## DB

- Mongo DB
- Mongoose 라이브러리

<br><br>

## 서비스 화면

<img src="https://github.com/in3166/predict_react/blob/master/img/메인.png" />
<img src="https://github.com/in3166/predict_react/blob/master/img/예측.png" />
<img src="https://github.com/in3166/predict_react/blob/master/img/user.png" />
<img src="https://github.com/in3166/predict_react/blob/master/img/user1.png" />
<img src="https://github.com/in3166/predict_react/blob/master/img/user2.png" />
