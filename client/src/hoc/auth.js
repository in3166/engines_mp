import axios from 'axios';
import React,{useEffect, useState} from 'react';

export default function foo(SpecificComponent, option, adminRoute = null) {
    // null: 아무나, true: 로그인 유저만 출입 가능, false: 로그인x 출입/ adminRoute=true: 관리자만 출입가능
    function AuthenticationCheck(props) {
        const [user, setUser] = useState({});
        useEffect(() => {

            axios.get('/api/users/auth')
            .then( res=>{
                 setUser(res.data);
                if(!res.data.isAuth){
                    // 로그인하지 않은 상태
                    if(option){
                        props.history.push('/login');
                    }

                }else {
                    //로그인한 상태
                    if(adminRoute && res.data.isAdmin){
                        props.history.push('/');
                    }else{
                        if(option === false){
                            props.history.push('/');
                        }
                    }
                }
                console.log(user)
            })
    
        }, [])
        return (
            <SpecificComponent {...props} user={user}/>
        )
    }

    return AuthenticationCheck
}