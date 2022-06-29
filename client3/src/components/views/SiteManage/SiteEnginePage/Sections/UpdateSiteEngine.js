import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input } from 'antd';

const UpdateSiteEngine = props => {
  const { setShowUpdateSiteEngine, ShowUpdateSiteEngine, getSites } = props;

  const [form] = Form.useForm();

  const modalOnOk = () => {
    getSites();
  };

  return (
    <Modal
      title="엔진 추가"
      width="80%"
      visible={ShowUpdateSiteEngine}
      onOk={form.submit}
      onCancel={() => setShowUpdateSiteEngine(false)}
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
          name="id"
          label="ID"
          rules={[
            { required: true, message: 'Please input this field!' },
            {
              type: 'string',
              min: 5,
              message: 'Please input at least 5 characters.',
            },
          ]}
        >
          <Input name="id" id="id" type="text" className="input_num" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

UpdateSiteEngine.propTypes = {
  setShowUpdateSiteEngine: PropTypes.func.isRequired,
  getSites: PropTypes.func.isRequired,
  ShowUpdateSiteEngine: PropTypes.bool.isRequired,
};

export default UpdateSiteEngine;
