import React, { useEffect, useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import './Form.css';

function RegisterPage() {
    const { register, watch, formState: { errors }, handleSubmit } = useForm();
    const password = useRef();
    password.current = watch("password");
    const onSubmit = data => {
        console.log(data);
        //Axios...
    }; // your form submit function which will invoke after successful validation

    console.log(watch("email")); // you can watch individual input by pass the name of the input


    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className="title">회원가입</label>
            <label>Email</label>
            <input name="email" type="email" error={errors.email}
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p>This email field is required</p>}

            <label>Name</label>
            <input
                name="name"
                {...register("name", { required: true, maxLength: 10 })}
            />
            {errors.name && errors.name.type === "required" && <p>This name field is required</p>}
            {errors.name && errors.name.type === "maxLength" && <p>Your input exceed maximum input</p>}

            <label>Password</label>
            <input
                name="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && <p>This password field is required</p>}
            {errors.password && errors.password.type === "minLength" && <p>Password must have at least 8 characters</p>}

            <label>Password Confirm</label>
            <input
                name="password_confirm"
                type="password"
                {...register("password_confirm", { required: true, validate: (value) => value === password.current })}
            />
            {errors.password_confirm && errors.password_confirm.type === "required" && <p>This password confirm field is required</p>}
            {errors.password_confirm && errors.password_confirm.type === "validate" && <p>The password do not match</p>}


            {/* {errors.exampleRequired && <p>This field is required</p>} */}
            <input type="submit" value="등록" />
            <div className="back">
                <a href="/">돌아가기</a>
            </div>
        </form>
    )
}

export default RegisterPage
