
## 사용 모듈
- axios
- react-hook-form: 회원가입, 로그인
- React Router Dom: 페이지 이동 시 사용
- http-proxy-middleware: proxy 사용

## 모듈 다운로드
`npm install`

## 구조
- Redux 위한 폴더
  - _actions
  - _reducer

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
- proxy 파일 대신 package.json 안에  // "proxy": "http://localhost:5000", 추가해도 됨.