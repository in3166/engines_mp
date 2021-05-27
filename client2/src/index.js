import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd/dist/antd.css';
import { BrowserRouter } from 'react-router-dom';
// app에 redux 연결
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import promiseMiddleware from 'redux-promise';
import ReduxThunk from 'redux-thunk';
import reportWebVitals from './reportWebVitals';
import App from './App';
import Reducer from './_reducers';

// thunk, promise 미들웨어 적용
const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk,
)(createStore);

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider
        store={createStoreWithMiddleware(
          Reducer,
          // redux devtool 사용(크롬)
          window.__REDUX_DEVTOOLS_EXTENSION__ &&
            window.__REDUX_DEVTOOLS_EXTENSION__(),
        )}
      >
        <App />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
