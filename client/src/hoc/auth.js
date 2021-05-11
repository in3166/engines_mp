import React,{useEffect} from 'react';
import { auth } from '../_actions/user_actions';
import { useSelector, useDispatch } from "react-redux";

export default function foo(SpecificComponent, option, adminRoute = null) {
    // null: 아무나, true: 로그인 유저만 출입 가능, false: 로그인x 출입/ adminRoute=true: 관리자만 출입가능
    function AuthenticationCheck(props) {

        let user = useSelector(state => state.user);
        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth())

            .then( res=>{
                if (!res.payload.isAuth) {
                    if (option) {
                        props.history.push('/login')
                    }
                    //Loggined in Status 
                } else {
                    //supposed to be Admin page, but not admin person wants to go inside
                    if (adminRoute && !res.payload.isAdmin) {
                        props.history.push('/')
                    }
                    //Logged in Status, but Try to go into log in page 
                    else {
                        if (option === false) {
                            props.history.push('/')
                        }
                    }
                }
            })
    
        }, [dispatch, props.history])
        return (
            <SpecificComponent {...props} user={user} />
        )
    }

    return AuthenticationCheck
}