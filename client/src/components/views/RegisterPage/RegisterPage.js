// import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
// import axios from 'axios';
import { message } from 'antd';
import { Link, useHistory } from 'react-router-dom';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_actions';
import './Form.css';

function RegisterPage() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [Departments, setDepartments] = useState([]);
  const [Positions, setPositions] = useState([]);
  const [Sites, setSites] = useState([]);
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const password = useRef();
  password.current = watch('password');

  const getAllDepartments = () => {
    axios.get('/api/departments/getAllDepartments').then(res => {
      setDepartments(res.data.departments);
    });
  };

  const getAllPositions = () => {
    axios.get('/api/positions/getAllPositions').then(res => {
      setPositions(res.data.positions);
    });
  };

  const getAllSites = () => {
    axios.get('/api/sites/getAllSites').then(res => {
      setSites(res.data.sites);
    });
  };

  useEffect(() => {
    getAllDepartments();
    getAllPositions();
    getAllSites();
  }, []);

  const onSubmit = data => {
    console.log(data);

    dispatch(registerUser(data))
      .then(res => {
        if (res.payload.success) {
          message.success(`[Success]: ${res.payload.message}`);
          history.push('/login');
        } else {
          message.error(`[Error]: ${res.payload.message}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });

    // axios.post('/api/users/register', data)
    // .then((res) => {
    //     if(res.data.success){
    //         props.history.push("/login");
    //     }else{
    //         alert(res.data.err)
    //     }
    //     //console.log(res.data.id, res.data.userId, res.data.loginSuccess, res.data.message)
    // })
  }; // your form submit function which will invoke after successful validation

  // console.log(watch("email")); // you can watch individual input by pass the name of the input

  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <div className="login_logo">
        <a href="/" className="form_a">
          <img className="logo" src="/logo.png" alt="logo" />
        </a>
      </div>

      <p className="form_label">ID</p>
      <input
        name="id"
        type="text"
        error={errors.id}
        className="form_input"
        autoComplete="on"
        {...register('id', { required: true, minLength: 5 })}
      />
      {errors.id && errors.id.type === 'required' && (
        <p className="form_p">This id field is required</p>
      )}
      {errors.id && errors.id.type === 'minLength' && (
        <p className="form_p">ID must have at least 5 characters</p>
      )}

      <p className="form_label">Password</p>
      <input
        className="form_input"
        name="password"
        type="password"
        autoComplete="new-password"
        {...register('password', { required: true, minLength: 7 })}
      />
      {errors.password && errors.password.type === 'required' && (
        <p className="form_p">This password field is required</p>
      )}
      {errors.password && errors.password.type === 'minLength' && (
        <p className="form_p">Password must have at least 7 characters</p>
      )}

      <p className="form_label">Password Confirm</p>
      <input
        className="form_input"
        name="password_confirm"
        type="password"
        autoComplete="new-password"
        {...register('password_confirm', {
          required: true,
          validate: value => value === password.current,
        })}
      />
      {errors.password_confirm &&
        errors.password_confirm.type === 'required' && (
          <p className="form_p">This password confirm field is required</p>
        )}
      {errors.password_confirm &&
        errors.password_confirm.type === 'validate' && (
          <p className="form_p">The password do not match</p>
        )}

      <p className="form_label">Email</p>
      <input
        name="email"
        type="email"
        error={errors.email}
        className="form_input"
        autoComplete="on"
        {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && errors.email.type === 'required' && (
        <p className="form_p">This email field is required</p>
      )}
      {errors.email && errors.email.type === 'pattern' && (
        <p className="form_p">Your input is wrong.</p>
      )}
      <p className="form_label">Name</p>
      <input
        className="form_input"
        name="name"
        autoComplete="on"
        {...register('name', { required: true, maxLength: 15 })}
      />
      {errors.name && errors.name.type === 'required' && (
        <p className="form_p">This name field is required</p>
      )}
      {errors.name && errors.name.type === 'maxLength' && (
        <p className="form_p">Your input exceed maximum input</p>
      )}

      <p className="form_label">Site</p>
      <select
        className="form_input form_select"
        name="site"
        autoComplete="on"
        {...register('site', { required: true })}
      >
        <option>-</option>
        {Sites.map(v => (
          <option value={v._id} key={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <p className="form_label">Department</p>
      <select
        className="form_input form_select"
        name="department"
        autoComplete="on"
        {...register('department', { required: true })}
      >
        <option>-</option>
        {Departments.map(v => (
          <option value={v._id} key={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* {errors.department && errors.department.type === 'required' && (
        <p className="form_p">This department field is required</p>
      )}
      {errors.department && errors.department.type === 'maxLength' && (
        <p className="form_p">Your input exceed maximum input</p>
      )} */}

      <p className="form_label">Position</p>
      <select
        className="form_input form_select"
        name="position"
        autoComplete="on"
        {...register('position', { required: true })}
      >
        <option>-</option>
        {Positions.map(v => (
          <option value={v._id} key={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      {/* {errors.exampleRequired && <p>This field is required</p>} */}
      <input type="submit" className="form_input" value="등록" />
      <div className="back">
        <Link to="/login">취소</Link>
      </div>
    </form>
  );
}

export default RegisterPage;
