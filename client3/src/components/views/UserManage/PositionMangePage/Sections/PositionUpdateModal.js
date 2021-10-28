import React from 'react';
import { Modal, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updatePosition } from '../../../../../_actions/position_actions';

function PositionUpdateModal(props) {
  const { setShowUpdateModal, ShowUpdateModal, getPositions, Position } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = position => {
    const body = {
      _id: Position._id,
      id: position?.id,
      name: position?.name,
      desc: position?.desc,
    };

    dispatch(updatePosition(body))
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
        getPositions();
        setShowUpdateModal(false);
      });
  };

  return (
    <Modal
      title="직급 수정"
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
          label="직급 ID"
          name="id"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Position.id}
        >
          <Input type="text" placeholder="ID" id="id" name="id" />
        </Form.Item>
        <Form.Item
          label="직급 이름"
          name="name"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Position.name}
        >
          <Input type="text" placeholder="이름" id="name" name="name" />
        </Form.Item>
        <Form.Item
          label="직급 설명"
          name="desc"
          rules={[{ required: true, message: 'Please input this field!' }]}
          initialValue={Position.desc}
        >
          <Input type="text" placeholder="설명" id="desc" name="desc" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PositionUpdateModal;

PositionUpdateModal.propTypes = {
  ShowUpdateModal: PropTypes.bool.isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  getPositions: PropTypes.func.isRequired,
  Position: PropTypes.objectOf(PropTypes.any).isRequired,
};
