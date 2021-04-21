import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';

import axios from 'axios';
import '../RegisterPage/Form.css';

function LoginPage() {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const password = useRef();
    password.current = watch("password");
    const onSubmit = data => {
        console.log(data);
        //Axios...
    }; // your form submit function which will invoke after successful validation

    //console.log(watch("email")); // you can watch individual input by pass the name of the input

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="login_logo">
                <a href="/"><img className="logo" src="/logo.png" alt="logo" /></a>
            </div>

            <br />
            <br />
            <br />

            <label>ID</label>
            <input name="id" type="text" error={errors.email}
                {...register("id", { required: true })}
            />
            {errors.id && <p>This ID field is required</p>}


            <label>Password</label>
            <input
                name="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
            {errors.password && errors.password.type === "minLength" && <p>Password must have at least 8 characters</p>}

            {/* {errors.exampleRequired && <p>This field is required</p>} */}
            <input type="submit" value="로그인" />
            <div className="back">
                <Link to="/">돌아가기</Link>
            </div>
        </form>
    )
}

export default LoginPage
