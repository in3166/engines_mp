# 엔진 관리 및 고장 예측 서비스

- 공장 엔진의 고장 예측을 경고해주고 회원과 엔진/부품의 정보를 관리해주는 서비스

![화면](https://user-images.githubusercontent.com/45654988/202990874-a60c6d98-fe8f-4595-bc1e-59884e235c6b.PNG)

<br>

## Client

`React` `Redux` `Redux-thunk` `Redux-promise` `Antd` `Chart.js`

### Site/엔진/부품 관리

- Site, 엔진, 부품, 회원을 추가, 삭제, 수정할 수 있다.

- Site 별로 엔진을 관리한다.
  - 해당 Site에 엔진을 추가, 삭제할 수 있다.

- 엔진 별로 필요 부품을 관리한다.
  - 엔진에 필요한 부품을 추가, 삭제할 수 있다.

- 공장별 엔진, 부품, 수량 등 기본 데이터 관리
  - 부족한 부품이나 재고가 적은 경우 알림 서비스 및 주문 기능 제공

### 회원 관리 페이지

- 로그인, 회원가입

  - 회원마다 권한을 부여한다.
    - 관리자
    - 일반 사용자
    - 엔지니어

### 고장 예측 페이지

- 각 엔진 별 데이터를 받아 엔진의 고장 여부 및 예측을 보여준다.
  - 압력, 온도 등의 데이터를 보여준다.
  - 예측 정보를 API에서 받아와 그래프로 그려준다.
  - 예측 정보가 특정 수치(기준)를 넘어가면 사용자에게 알람을 해준다.

  <br>

- 전문가 피드백 기능 (현재 프로젝트에는 포함되어 있지 않음)
  - 고장 예측 알고리즘과 전문가의 분석을 제공하고 분석된 내용을 토대로 알람 기능을 제공
  - 부품/자재의 현재 수량과 필요 수량을 비교하여 주문 기능 제공

<br>

### 구조

- \_actions
- \_reducer
- components
  - views
  - _shared
- hoc
- hooks

### 참고

- proxy 파일 대신 package.json 안에 // "proxy": "http://localhost:5000", 추가해도 됨.
- jwt refresh token 미구현
- 서버 고려 사항: xss filter(sanitize-html), csrf, halmet(http 헤더)

- Conditional Rendering 중 잠깐 화면이 나오는 문제

  - Client3의 `RanderingPage`
  - userData가 undefined이어도 있는걸로 생각한다.
  - `user?.userData?.role !== undefined`를 추가해 해결

- `Added non-passive event listener to a scroll-blocking 'wheel' event.` 경고 발생

  - `https://unpkg.com/default-passive-events` 사용
  - => ANTD 사용 중 오류 발생 -> 해제

- vscode `listen EACCES: permission denied` (포트 사용 중)
  - `net stop winnat`
  - `net start winnat`

### 라이브러리

- `axios`
- `prop-types`
- `antd`
- `react-hook-form`: 회원가입, 로그인 form
- `React-Router-Dom`: 페이지 이동 시 사용
- `http-proxy-middleware`: proxy 사용
- `chart.js`: `npm install --save chart.js@2.9.4 react-chartjs-2` (최신버전 사용 시 오류 발생)
- `react-highlight-words`
- `redux`
  - store에 state 변경을 하려면 dispatch(action)으로 하는데 `Action`은 plain object(객체 형식)
  - 그런데 store은 항상 객체 형식으로 받지 않고 'Promise'나 'function' 등의 형태로도 받음
- `react-redux`
- `redux-promise`: dispatch에게 `Promise`을 받는 방법을 알려주는 미들웨어
- `redux-thunk`: dispatch에게 `function`을 받는 방법을 알려주는 미들웨어

<br><br>

## Server (Express)

`express` `mongoose`

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

### 라이브러리

- `bcrypt`
- `jsonwebtoken`
- `concurrently`
- `async`
- `axios`
- `Mongoose`

<br><br>

## 서비스 화면

<img src="https://github.com/in3166/predict_react/blob/master/img/메인.png" />
<img src="https://github.com/in3166/predict_react/blob/master/img/예측.png" />

![pre_set](https://user-images.githubusercontent.com/45654988/202990738-9ff5cd14-0fdb-4c1b-86dc-19a48e8024c0.JPG)
![pre_user](https://user-images.githubusercontent.com/45654988/202990792-05ba8691-7a12-4ab0-b27d-41df1c3e4c7c.JPG)
![pre_bu](https://user-images.githubusercontent.com/45654988/176819081-f8282c54-207c-4d92-be1e-48e679231fe1.JPG)

![erd](https://user-images.githubusercontent.com/45654988/202990982-47661afc-0eee-4182-bf96-c2212738d464.PNG)

<br><br>

## 고장예측 API

`Jupyter Nodebook` `python` `tensorflow` `keras` `pandas` `Flask`

- 시계열 데이터를 입력받으면 예측 데이터와 그래프를 반환
  - *위 기술을 공부하여 예제 프로젝트를 위해 임시로 생성했습니다.*
<br>

- `LSTM (상태유지 스택 순환신경망)` 알고리즘 사용하여 예측 데이터 생성
- 데이터를 평탄화하여 시계열 데이터로 만들고 예측 데이터를 반환한다.

```py
# ...
x1 = x1.ewm(170).mean()
scaler, train, test = prepare_data(x1, n_test, n_lag, n_seq)
# ...
# fit model
model = fit_lstm(train, n_lag, n_seq, n_batch, n_epochs, n_neurons)
# ...
from keras.models import load_model
new_model.save('model1.h5')
# ...
# make forecasts
forecasts = make_forecasts(new_model, n_batch, train, test, n_lag, n_seq)
```

```md
Output exceeds the size limit. Open the full output data in a text editor
Model: "sequential"
_________________________________________________________________
Layer (type)                 Output Shape              Param #   
=================================================================
lstm (LSTM)                  (100, 1, 100)             160000    
_________________________________________________________________
lstm_1 (LSTM)                (100, 1, 90)              68760     
_________________________________________________________________
bidirectional (Bidirectional (100, 120)                72480     
_________________________________________________________________
dense (Dense)                (100, 300)                36300     
=================================================================
Total params: 337,540
Trainable params: 337,540
Non-trainable params: 0
```

<img src="https://github.com/in3166/engines_mp/blob/master/img/data1.PNG" width="50%" />

<img src="https://github.com/in3166/engines_mp/blob/master/img/data2.PNG" width="90%" />

<img src="https://github.com/in3166/engines_mp/blob/master/img/data3.jpg" width="90%" />

<br><br>

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

      ```json
      {
        "IP": "http://ip"
      }
      ```

    - App.js
    - Navbar/
    - setupProxy.js

- gitignore 수정 후 적용하기
  - 우선 git 캐시 삭제 후 커밋하기
    - `git rm --cached setupProxy.js`
