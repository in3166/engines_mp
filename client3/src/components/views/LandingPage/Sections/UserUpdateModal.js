import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { updateUser } from '../../../../_actions/user_actions';
import getRole from './getRole';
import './formStyle.css';

function UserUpdateModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    getAllUsers,
    selectedUsers,
  } = props;
  const dispatch = useDispatch();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = user => {
    const body = {
      id: selectedUsers[0]?.id,
      newid: user?.id,
      name: user?.name,
      email: user?.email,
      department: user?.department,
      position: user?.position,
      role: user?.role,
    };
    console.log(body);
    dispatch(updateUser(body))
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
      });

    setshowUpdateConfirm(false);
  };

  const [form] = Form.useForm();

  return (
    <div>
      <Modal
        title="회원 정보 수정"
        style={{ top: 90 }}
        visible={showUpdateConfirm}
        onOk={form.submit}
        onCancel={() => setshowUpdateConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
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
              defaultValue={selectedUsers[0]?.id}
              {...register('id', { required: true, minLength: 5 })}
            />
            {errors.id && <p className="form_p">This id field is required</p>}
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">ID must have at least 5 characters</p>
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
              defaultValue={selectedUsers[0]?.name}
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
              name="email"
              className="form_input"
              type="email"
              autoComplete="on"
              error={errors.email}
              defaultValue={selectedUsers[0]?.email}
              {...register('email', { required: true, pattern: /^\S+@\S+$/i })}
            />
            {errors.email && errors.email.type === 'required' && (
              <p className="form_p">This email field is required</p>
            )}
            {errors.department && errors.email.type === 'pattern' && (
              <p className="form_p">Your input is wrong.</p>
            )}
          </Form.Item>
          <Form.Item label="부서">
            <input
              name="department"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.department}
              defaultValue={selectedUsers[0]?.department}
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
              name="position"
              type="text"
              autoComplete="on"
              error={errors.position}
              defaultValue={selectedUsers[0]?.position}
              {...register('position', { required: true, maxLength: 20 })}
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
              defaultValue={getRole(selectedUsers[0]?.role)}
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

UserUpdateModal.propTypes = {
  selectedUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  getAllUsers: PropTypes.func.isRequired,
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
};

export default UserUpdateModal;
