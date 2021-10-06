import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { auth } from '../_actions/user_actions';

export default function foo(SpecificComponent, option, adminRoute = null) {
  // null: 아무나, true: 로그인 유저만 출입 가능, false: 로그인x 출입/ adminRoute=true: 관리자만 출입가능
  function AuthenticationCheck(props) {
    const user = useSelector(state => state.user);

    const dispatch = useDispatch();
    const history = useHistory();

    useEffect(() => {
      // auth는 토큰 비교
      dispatch(auth()).then(res => {
        if (!res.payload.isAuth) {
          if (option) {
            history.push('/login');
          }
          // Loggined in Status
        } else if (adminRoute && !res.payload.isAdmin) {
          // supposed to be Admin page, but not admin person wants to go inside
          history.push('/');
        } else if (option === false) {
          // Logged in Status, but Try to go into log in page
          history.push('/');
        }
      });
    }, [dispatch, history]);
    // ... Prop spreading is forbidden: rule 삭제 후 수정
    return <SpecificComponent {...props} loaded user={user} />;
  }

  return AuthenticationCheck;
}
