import React, { useRef } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changePassord } from '../../../../_actions/user_actions';

function PasswordChange(props) {
  const { user, layout } = props;

  const dispatch = useDispatch();
  const password = useRef();
  const {
    register,
    watch,
    formState: { errors },
    handleSubmit,
  } = useForm();
  password.current = watch('password');

  const onSubmit = data => {
    const body = {
      id: user.userData.id,
      password: data.password,
    };

    dispatch(changePassord(body))
      .then(res => {
        if (res.payload.success) {
          message.success('비밀번호가 변경되었습니다.');
        } else {
          message.error('비밀번호 변경을 실패하였습니다.');
        }
      })
      .catch(err => {
        message.age(`[Error]: ${err}`);
      });
  };

  return (
    <div>
      <Form
        {...layout}
        name="password-change"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label="비밀번호">
          <input
            className="userpage_input"
            name="password"
            type="password"
            {...register('password', { required: true, minLength: 8 })}
          />
          {errors.password && errors.password.type === 'required' && (
            <p className="form_p">This password field is required</p>
          )}
          {errors.password && errors.password.type === 'minLength' && (
            <p className="form_p">Password must have at least 8 characters</p>
          )}
        </Form.Item>

        <Form.Item label="비밀번호 확인">
          <input
            className="userpage_input"
            name="password_confirm"
            type="password"
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
        </Form.Item>

        <Form.Item {...{ wrapperCol: { span: 14, offset: 5 } }}>
          <Button type="primary" htmlType="submit">
            저장
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}

PasswordChange.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  layout: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default PasswordChange;
