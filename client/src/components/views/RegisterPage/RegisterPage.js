import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
//import axios from 'axios';
import { Link } from 'react-router-dom';
import './Form.css';

function RegisterPage() {
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
        className="form"
            onSubmit={handleSubmit(onSubmit)}
        >
            <label className="form_title">회원가입</label>
            <label className="form_label">Email</label>
            <input name="email" type="email" error={errors.email} className="form_input"
                {...register("email", { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && <p className="form_p">This email field is required</p>}

            <label className="form_label">Name</label>
            <input
            className="form_input"
                name="name"
                {...register("name", { required: true, maxLength: 10 })}
            />
            {errors.name && errors.name.type === "required" && <p className="form_p">This name field is required</p>}
            {errors.name && errors.name.type === "maxLength" && <p className="form_p">Your input exceed maximum input</p>}

            <label className="form_label">Password</label>
            <input
             className="form_input"
                name="password"
                type="password"
                {...register("password", { required: true, minLength: 8 })}
            />
            {errors.password && errors.password.type === "required" && <p className="form_p">This password field is required</p>}
            {errors.password && errors.password.type === "minLength" && <p className="form_p">Password must have at least 8 characters</p>}

            <label className="form_label">Password Confirm</label>
            <input
            className="form_input"
                name="password_confirm"
                type="password"
                {...register("password_confirm", { required: true, validate: (value) => value === password.current })}
            />
            {errors.password_confirm && errors.password_confirm.type === "required" && <p className="form_p">This password confirm field is required</p>}
            {errors.password_confirm && errors.password_confirm.type === "validate" && <p className="form_p">The password do not match</p>}


            {/* {errors.exampleRequired && <p>This field is required</p>} */}
            <input type="submit" className="form_input" value="등록" />
            <div className="back">
                <Link to="/">돌아가기</Link>
            </div>
        </form>
    )
}

export default RegisterPage
