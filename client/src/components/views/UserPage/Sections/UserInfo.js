import React from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { changeUser } from '../../../../_actions/user_actions';

function UserInfo(props) {
  const { user, layout } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const onSubmit = data => {
    console.log(data);
    const body = {
      id: user.userData.id,
      email: data.email,
      name: data.name,
      department: data.department,
      position: data.position,
    };

    dispatch(changeUser(body))
      .then(res => {
        if (res.payload.success) {
          message.success('개인정보가 변경되었습니다.');
        } else {
          message.error('개인정보가 변경을 실패하였습니다. ', res.payload.err);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
  };

  return (
    <div>
      <Form
        {...layout}
        name="userinfo-change"
        onFinish={handleSubmit(onSubmit)}
      >
        <Form.Item label="ID">
          <p className="userpage_label">{user.userData.id}</p>
        </Form.Item>

        <Form.Item label="권한">
          <p className="userpage_label">
            {user.userData.role === 0 ? '일반 사용자' : '관리자'}
          </p>
        </Form.Item>

        <Form.Item label="Email">
          <input
            name="email"
            className="userpage_input"
            type="email"
            autoComplete="on"
            error={errors.email}
            placeholder={user.userData.email}
            defaultValue={user.userData.email}
            {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
          />
          {errors.email && (
            <p className="form_p">This email field is required</p>
          )}
        </Form.Item>

        <Form.Item label="이름">
          <input
            className="userpage_input"
            {...register('name', { required: true, maxLength: 15 })}
            placeholder={user.userData.name}
            defaultValue={user.userData.name}
            autoComplete="on"
            name="name"
          />
          {errors.name && errors.name.type === 'required' && (
            <p className="form_p">This name field is required</p>
          )}
          {errors.name && errors.name.type === 'maxLength' && (
            <p className="form_p">Your input exceed maximum input</p>
          )}
        </Form.Item>

        <Form.Item label="부서">
          <input
            className="userpage_input"
            {...register('department', { required: true, maxLength: 20 })}
            placeholder={user.userData.department}
            defaultValue={user.userData.department}
            autoComplete="on"
            name="department"
          />
          {errors.department && errors.department.type === 'required' && (
            <p className="form_p">This department field is required</p>
          )}
          {errors.department && errors.department.type === 'maxLength' && (
            <p className="form_p">Your input exceed maximum input</p>
          )}
        </Form.Item>

        <Form.Item label="직급">
          <input
            className="userpage_input"
            {...register('position', { required: true, maxLength: 20 })}
            placeholder={user.userData.position}
            defaultValue={user.userData.position}
            autoComplete="on"
            name="position"
          />
          {errors.position && errors.position.type === 'required' && (
            <p className="form_p">This position field is required</p>
          )}
          {errors.position && errors.position.type === 'maxLength' && (
            <p className="form_p">Your input exceed maximum input</p>
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

UserInfo.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
  layout: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserInfo;
