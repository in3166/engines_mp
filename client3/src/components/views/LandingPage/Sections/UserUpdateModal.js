import React from 'react';
import { Modal, Form, Select, Input, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { updateUser } from '../../../../_actions/user_actions';

const { Option } = Select;
function UserUpdateModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    getAllUsers,
    selectedUsers,
    Departments,
    Positions,
    Sites,
  } = props;
  const dispatch = useDispatch();

  console.log('selectedUsers[0]?.role?.: ', selectedUsers[0]?.role);
  // 수정 모달 OK 버튼 - redux
  const modalOnOk = user => {
    console.log('user?.: ', selectedUsers);

    const department = Departments.find(v => {
      return v.name === user?.department;
    });

    const position = Positions.find(v => {
      return v.name === user?.position;
    });

    const site = Sites.find(v => {
      return v.name === user?.site;
    });
    let role = '';
    switch (user.role) {
      case '일반 사용자':
        role = { id: 0, name: user.role };
        break;
      // case '전문가':
      //   role = { id: 2, name: user.role };
      //   break;
      case '엔지니어':
        role = { id: 3, name: user.role };
        break;
      default:
        break;
    }
    const body = {
      _id: selectedUsers[0]?._id,
      id: selectedUsers[0]?.id,
      newid: user?.id,
      name: user?.name,
      email: user?.email,
      site: site._id,
      department: department._id,
      position: position._id,
      role,
    };
    console.log('body: ', body);
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
        destroyOnClose
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={modalOnOk}
          preserve={false}
        >
          <Form.Item
            label="ID"
            name="id"
            initialValue={selectedUsers[0]?.id}
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
            label="이름"
            name="name"
            initialValue={selectedUsers[0]?.name}
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
            initialValue={selectedUsers[0]?.email}
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
              name="email"
              className="form_input"
              type="email"
              autoComplete="on"
            />
          </Form.Item>
          <Form.Item
            label="사이트"
            name="site"
            initialValue={selectedUsers[0]?.site}
            rules={[{ required: true, message: 'This site field is required' }]}
          >
            <Select name="site" id="site" className="form_select">
              {Sites.map(v => (
                <Option value={v.name} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="부서"
            name="department"
            initialValue={selectedUsers[0]?.department}
            rules={[
              { required: true, message: 'This department field is required' },
            ]}
          >
            <Select name="department" id="department" className="form_select">
              {Departments.map(v => (
                <Option value={v.name} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="직급"
            name="position"
            initialValue={selectedUsers[0]?.position}
            rules={[
              { required: true, message: 'This position field is required' },
            ]}
          >
            <Select name="position" id="position" className="form_select">
              {Positions.map(v => (
                <Option value={v.name} key={v._id}>
                  {v.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="권한"
            name="role"
            initialValue={selectedUsers[0]?.role}
            rules={[{ required: true, message: 'This role field is required' }]}
          >
            <Select name="role" id="role" className="form_select">
              <Option value="일반 사용자">일반 사용자</Option>
              <Option value="엔지니어">엔지니어</Option>
            </Select>
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
  Departments: PropTypes.arrayOf(PropTypes.any).isRequired,
  Positions: PropTypes.arrayOf(PropTypes.any).isRequired,
  Sites: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default UserUpdateModal;
