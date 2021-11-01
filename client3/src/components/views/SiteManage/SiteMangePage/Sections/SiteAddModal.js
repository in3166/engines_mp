import React from 'react';
import { Modal, Form, message, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { addSite } from '../../../../../_actions/site_actions';

function SiteAddModal(props) {
  const { setShowAddModal, ShowAddModal, getSites } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = site => {
    const body = {
      id: site?.id,
      name: site?.name,
      country: site?.country,
      address: site?.address,
      phone: site?.phone,
    };

    dispatch(addSite(body))
      .then(res => {
        if (res.payload.success) {
          message.success('사이트가 추가되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getSites();
        setShowAddModal(false);
      });
  };

  return (
    <Modal
      title="사이트 추가"
      visible={ShowAddModal}
      onOk={form.submit}
      onCancel={() => setShowAddModal(false)}
      style={{ top: 100 }}
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
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input type="text" placeholder="ID" id="id" name="id" />
        </Form.Item>
        <Form.Item
          label="이름"
          name="name"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input type="text" placeholder="이름" id="name" name="name" />
        </Form.Item>
        <Form.Item
          label="국가"
          name="country"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input type="text" placeholder="국가" id="desc" name="desc" />
        </Form.Item>
        <Form.Item
          label="주소"
          name="address"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input type="text" placeholder="주소" id="desc" name="desc" />
        </Form.Item>
        <Form.Item
          label="연락처"
          name="phone"
          rules={[{ required: true, message: 'Please input this field!' }]}
        >
          <Input type="text" placeholder="연락처" id="desc" name="desc" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default SiteAddModal;

SiteAddModal.propTypes = {
  ShowAddModal: PropTypes.bool.isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  getSites: PropTypes.func.isRequired,
};
