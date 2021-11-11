import React from 'react';
import { Modal, Form, message, Input, Select } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateExpert } from '../../../../../_actions/expert_actions';

function ExpertAuthUpdateModal(props) {
  const { setShowUpdateModal, ShowUpdateModal, getExperts, Expert } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = expert => {
    const body = {
      _id: Expert._id,
      id: expert.id,
      name: expert.name,
      desc: expert.desc,
      role: expert.role,
    };
    dispatch(updateExpert(body))
      .then(res => {
        if (res.payload.success) {
          message.success('그룹이 수정되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getExperts();
        setShowUpdateModal(false);
      });
  };

  return (
    <Modal
      title="전문가 그룹 수정"
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
        <Form.Item label="그룹 ID" name="id" initialValue={Expert.id}>
          <Input type="text" placeholder="ID" id="id" name="id" readOnly />
        </Form.Item>
        <Form.Item label="그룹 이름" name="name" initialValue={Expert.name}>
          <Input
            type="text"
            placeholder="이름"
            id="name"
            name="name"
            readOnly
          />
        </Form.Item>
        <Form.Item label="그룹 설명" name="desc" initialValue={Expert.desc}>
          <Input
            type="text"
            placeholder="설명"
            id="desc"
            name="desc"
            readOnly
          />
        </Form.Item>
        <Form.Item label="권한" name="role" initialValue={Expert.role}>
          <Select name="role" id="role" className="form_select">
            <Select.Option value={0}>일반 사용자 권한</Select.Option>
            <Select.Option value={2}>전문가 권한</Select.Option>
            <Select.Option value={3}>엔지니어 권한</Select.Option>
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default ExpertAuthUpdateModal;

ExpertAuthUpdateModal.propTypes = {
  ShowUpdateModal: PropTypes.bool.isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  getExperts: PropTypes.func.isRequired,
  Expert: PropTypes.objectOf(PropTypes.any).isRequired,
};
