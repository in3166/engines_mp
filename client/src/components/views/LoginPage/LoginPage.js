import React, {  useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { loginUser } from "../../../_actions/user_actions";
//import axios from 'axios';
import '../RegisterPage/Form.css';
import { useDispatch } from "react-redux";

function LoginPage(props) {
    const dispatch = useDispatch();

    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const password = useRef();
    password.current = watch("password");

    const onSubmit =(data) => {

          dispatch(loginUser(data))
            .then(res => {
              if (res.payload.loginSuccess) {
                window.localStorage.setItem('userId', res.payload.userId);
                // remember me
                // if (rememberMe === true) {
                //   window.localStorage.setItem('rememberMe', values.id);
                // } else {
                //   localStorage.removeItem('rememberMe');
                // }
                props.history.push("/");
              } else {
                alert(res.payload.message)
              }
            })
            .catch(err => {
                alert(err)
            });

    }

    //console.log(watch("email")); // you can watch individual input by pass the name of the input

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="form"
        >
            <div className="login_logo">
                <a href="/" className="form_a"><img className="logo" src="/logo.png" alt="logo" /></a>
            </div>

            <br />
            <br />
            <br />

            <label className="form_label">ID</label>
            <input className="form_input" name="id" type="text" error={errors.email}
                {...register("id", { required: true })}
            />
            {errors.id && <p className="form_p">This ID field is required</p>}


            <label className="form_label">Password</label>
            <input
            className="form_input"
                name="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && <p className="form_p">This password field is required</p>}
            {errors.password && errors.password.type === "minLength" && <p className="form_p">Password must have at least 8 characters</p>}

            {/* {errors.exampleRequired && <p>This field is required</p>} */}
            <input className="form_input" type="submit" value="로그인" />
            <div className="back">
                <Link to="/register" style={{fontWeight:'bold'}}>회원가입</Link> <br/>
                <Link to="/">취소</Link>
            </div>
        </form>
    )
}

export default LoginPage
