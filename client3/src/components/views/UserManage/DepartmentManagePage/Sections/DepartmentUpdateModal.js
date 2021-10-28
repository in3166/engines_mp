import React from 'react';
import { Modal, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateDepartment } from '../../../../../_actions/department_actions';

function DepartmentUpdateModal(props) {
  const { setShowUpdateModal, ShowUpdateModal, getDepartments, Department } =
    props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = depart => {
    const body = {
      _id: Department._id,
      id: depart?.id,
      name: depart?.name,
      desc: depart?.desc,
    };

    dispatch(updateDepartment(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부서가 수정되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getDepartments();
        setShowUpdateModal(false);
      });
  };

  return (
    <Modal
      title="부서 수정"
      visible={ShowUpdateModal}
      onOk={form.submit}
      onCancel={() => setShowUpdateModal(false)}
      style={{ top: 170 }}
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
          label="부서 ID"
          name="id"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Department.id}
        >
          <Input type="text" placeholder="ID" id="id" name="id" />
        </Form.Item>
        <Form.Item
          label="부서 이름"
          name="name"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Department.name}
        >
          <Input type="text" placeholder="이름" id="name" name="name" />
        </Form.Item>
        <Form.Item
          label="부서 설명"
          name="desc"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Department.desc}
        >
          <Input type="text" placeholder="설명" id="desc" name="desc" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default DepartmentUpdateModal;

DepartmentUpdateModal.propTypes = {
  ShowUpdateModal: PropTypes.bool.isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  getDepartments: PropTypes.func.isRequired,
  Department: PropTypes.objectOf(PropTypes.any).isRequired,
};
