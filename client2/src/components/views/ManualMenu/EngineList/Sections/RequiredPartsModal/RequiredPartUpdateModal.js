import React from 'react';
import { Button, Modal, Form, Input, InputNumber } from 'antd';
import PropTypes from 'prop-types';

function RequiredPartUpdateModal(props) {
  const { ShowPartUpdate, setShowPartUpdate, selectedRowKeys, getEngines } =
    props;
  const [form] = Form.useForm();
  console.log(selectedRowKeys);

  const modalOnOk = () => {
    // const body = {
    //   id: RadioValue,
    //   stock: part?.stock,
    //   site: selectedRowKeys.id,
    // };

    // dispatch(addEnginRequiredPart(body))
    //   .then(res => {
    //     if (res.payload.success) {
    //       message.success('필요 부품이 추가되었습니다.');
    //     } else {
    //       message.error(res.payload.message);
    //     }
    //   })
    //   .catch(err => {
    //     message.error(`[Error]: ${err}`);
    //   })
    //   .finally(() => {
    //     document.getElementById('stock').value = '';
    //     getEngines();
    //     setShowPartAdd(false);
    //   });
    getEngines();
    // form.resetFields();
  };

  return (
    <>
      {ShowPartUpdate && (
        <Modal
          title="구성 부품 추가"
          width="80%"
          visible={ShowPartUpdate}
          onCancel={() => setShowPartUpdate(false)}
          style={{ top: 170 }}
          footer={[
            <Button key="back" onClick={() => setShowPartUpdate(false)}>
              OK
            </Button>,
          ]}
        >
          <Form
            {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
            name="userinfo-change"
            id="updateForm"
            form={form}
            onFinish={modalOnOk}
            preserve={false}
          >
            <Form.Item label="부품 ID">
              <Input type="text" value={selectedRowKeys[0].id} readOnly />
            </Form.Item>
            <Form.Item label="부품 이름">
              <Input type="text" value={selectedRowKeys[0].name} readOnly />
            </Form.Item>
            <Form.Item label="부품 가격">
              <Input type="text" value={selectedRowKeys[0].price} readOnly />
            </Form.Item>
            <Form.Item label="부품 설명">
              <Input type="text" value={selectedRowKeys[0].desc} readOnly />
            </Form.Item>

            <Form.Item
              name="stock"
              label="재고"
              rules={[{ required: true, message: 'Please input this field!' }]}
            >
              <InputNumber
                name="stock"
                id="stock"
                type="number"
                className="input_num"
                placeholder={selectedRowKeys[0].requiredNumber}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default RequiredPartUpdateModal;

RequiredPartUpdateModal.propTypes = {
  ShowPartUpdate: PropTypes.bool.isRequired,
  setShowPartUpdate: PropTypes.func.isRequired,
  getEngines: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
};
