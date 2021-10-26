import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { registerUser } from '../../../../_actions/user_actions';
import './formStyle.css';

function UserAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getAllUsers } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = user => {
    const body = {
      id: user?.id,
      name: user?.name,
      email: user?.email,
      department: user?.department,
      position: user?.position,
      role: user?.role,
    };

    dispatch(registerUser(body))
      .then(res => {
        if (res.payload.success) {
          message.success('회원 정보가 수정되었습니다.');
          getAllUsers();
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        document.getElementById('id').value = '';
        document.getElementById('password').value = '';
        document.getElementById('name').value = '';
        document.getElementById('email').value = '';
        document.getElementById('position').value = '';
        document.getElementById('department').value = '';
        document.getElementById('role').value = '';
        setshowAddConfirm(false);
      });

    // form.resetFields();
  };

  return (
    <div>
      <Modal
        title="회원 추가"
        style={{ top: 90 }}
        visible={showAddConfirm}
        onOk={form.submit}
        onCancel={() => setshowAddConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          id="updateForm"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
        >
          <Form.Item label="ID">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              {...register('id', { required: true, minLength: 5 })}
            />
            {errors.id && errors.id.type === 'required' && (
              <p className="form_p">This id field is required</p>
            )}
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">ID must have at least 5 characters</p>
            )}
          </Form.Item>
          <Form.Item label="Password">
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="form_input"
              error={errors.password}
              {...register('password', { required: true, minLength: 7 })}
            />
            {errors.password && errors.password.type === 'required' && (
              <p className="form_p">This password field is required</p>
            )}
            {errors.password && errors.password.type === 'minLength' && (
              <p className="form_p">assword must have at least 7 characters</p>
            )}
          </Form.Item>
          <Form.Item label="이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              {...register('name', { required: true, maxLength: 15 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="Email">
            <input
              id="email"
              name="email"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.email}
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === 'required' && (
              <p className="form_p">This email field is required</p>
            )}
            {errors.email && errors.email.type === 'pattern' && (
              <p className="form_p">Your input is wrong.</p>
            )}
          </Form.Item>
          <Form.Item label="부서">
            <input
              id="department"
              name="department"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.department}
              {...register('department', { required: true, maxLength: 20 })}
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
              id="position"
              name="position"
              type="text"
              autoComplete="on"
              error={errors.position}
              {...register('position', { required: true, maxLength: 10 })}
              className="form_input"
            />
            {errors.position && errors.position.type === 'required' && (
              <p className="form_p">This position field is required</p>
            )}
            {errors.position && errors.position.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="권한">
            <select
              name="role"
              id="role"
              className="form_select"
              {...register('role', { required: true })}
            >
              <option value={0}>일반 사용자</option>
              <option value={2}>전문가</option>
              <option value={3}>엔지니어</option>
            </select>
            {errors.role && errors.role.type === 'required' && (
              <p className="form_p">This role field is required</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

UserAddModal.propTypes = {
  getAllUsers: PropTypes.func.isRequired,
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};

export default UserAddModal;
