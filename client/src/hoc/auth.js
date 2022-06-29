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
      dispatch(auth()).then(res => {
        if (!res.payload.isAuth) {
          if (option) {
            history.push('/login');
          }
        } else if (adminRoute && !res.payload.isAdmin) {
          history.push('/');
        } else if (option === false) {
          history.push('/');
        }
      });
    }, [dispatch, history]);
    return <SpecificComponent {...props} user={user} />;
  }

  return AuthenticationCheck;
}
