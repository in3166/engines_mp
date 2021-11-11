import React from 'react';
import { Modal, Form, message, Input, Select } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { registerUser } from '../../../../_actions/user_actions';
// import './formStyle.css';

const { Option } = Select;

function UserAddModal(props) {
  const {
    showAddConfirm,
    setshowAddConfirm,
    getAllUsers,
    Departments,
    Sites,
    Positions,
  } = props;
  const dispatch = useDispatch();

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
    console.log('body: ', body);
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
        // document.getElementById('id').value = '';
        // document.getElementById('password').value = '';
        // document.getElementById('name').value = '';
        // document.getElementById('email').value = '';
        // document.getElementById('position').value = '';
        // document.getElementById('department').value = '';
        // document.getElementById('role').value = '';
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
        destroyOnClose
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          id="updateForm"
          form={form}
          onFinish={modalOnOk}
          preserve={false}
        >
          <Form.Item
            label="ID"
            name="id"
            rules={[
              {
                required: true,
                message: 'This id field is required',
              },
              {
                type: 'string',
                min: 5,
                message: 'ID must have at least 5 characters',
              },
            ]}
          >
            <Input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
            />
          </Form.Item>
          <Form.Item
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: 'This password field is required',
              },
              {
                type: 'string',
                min: 7,
                message: 'The password must have at least 5 characters',
              },
            ]}
          >
            <Input
              id="password"
              name="password"
              type="password"
              autoComplete="new-password"
              className="form_input"
            />
          </Form.Item>
          <Form.Item
            label="이름"
            name="name"
            rules={[
              {
                required: true,
                message: 'This name field is required',
              },
              {
                type: 'string',
                min: 5,
                message: 'Your input exceed maximum input',
              },
            ]}
          >
            <Input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                message: 'This email field is required',
              },
              {
                type: 'email',
                message: 'Your input is wrong.',
              },
            ]}
          >
            <Input
              id="email"
              name="email"
              className="form_input"
              type="text"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item
            label="사이트"
            name="site"
            rules={[{ required: true, message: 'This site field is required' }]}
          >
            <Select name="site" id="site" className="form_select">
              {Sites.map(v => (
                <Option value={v._id} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="부서"
            name="department"
            rules={[
              { required: true, message: 'This department field is required' },
            ]}
          >
            <Select name="department" id="department" className="form_select">
              {Departments.map(v => (
                <Option value={v._id} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="직급"
            name="position"
            rules={[
              { required: true, message: 'This position field is required' },
            ]}
          >
            <Select name="position" id="position" className="form_select">
              {Positions.map(v => (
                <Option value={v._id} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="권한"
            name="role"
            rules={[{ required: true, message: 'This role field is required' }]}
          >
            <Select name="role" id="role" className="form_select">
              <Option value={0}>일반 사용자</Option>
              <Option value={3}>엔지니어</Option>
            </Select>
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
  Departments: PropTypes.arrayOf(PropTypes.any).isRequired,
  Positions: PropTypes.arrayOf(PropTypes.any).isRequired,
  Sites: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserAddModal;
