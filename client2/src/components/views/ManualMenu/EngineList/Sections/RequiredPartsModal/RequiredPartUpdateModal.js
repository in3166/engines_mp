import React from 'react';
import { Modal, Form, Input, InputNumber, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateEnginRequiredPart } from '../../../../../../_actions/engine_actions';

function RequiredPartUpdateModal(props) {
  const {
    ShowPartUpdate,
    setShowPartUpdate,
    setShowPartsModal,
    selectedRowKeys,
    getEngines,
    EngineInfo,
  } = props;
  const dispatch = useDispatch();
  const [form] = Form.useForm();

  // partsinfo 출력
  const modalOnOk = num => {
    /* eslint no-underscore-dangle: 0 */

    const body = {
      partID: selectedRowKeys[0]._id,
      number: num.number,
      engine: EngineInfo._id,
    };

    console.log('EngineInfo:', EngineInfo);
    console.log(body);

    dispatch(updateEnginRequiredPart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('필요 부품이 수정되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getEngines();
        // setShowPartAdd(false);
      });

    getEngines();
    setShowPartsModal(false);
    // form.resetFields();
  };

  return (
    <>
      {ShowPartUpdate && (
        <Modal
          title="구성 부품 추가"
          width="80%"
          visible={ShowPartUpdate}
          onOk={form.submit}
          onCancel={() => setShowPartUpdate(false)}
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
            <Form.Item label="Section.1">
              <Input type="text" value={selectedRowKeys[0].section1} readOnly />
            </Form.Item>
            <Form.Item label="Section.2">
              <Input type="text" value={selectedRowKeys[0].section2} readOnly />
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
              name="number"
              label="재고"
              rules={[{ required: true, message: 'Please input this field!' }]}
            >
              <InputNumber
                name="number"
                id="number"
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
  setShowPartsModal: PropTypes.func.isRequired,
  getEngines: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  EngineInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};
