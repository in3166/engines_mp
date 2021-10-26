import React from 'react';
import { Modal, Form, InputNumber, Input, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateSitePart } from '../../../../../_actions/site_actions';

function BranchUpdatePartModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    reload,
    Sites,
    selectedRowKey,
  } = props;
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const modalOnOk = part => {
    const body = {
      /* eslint no-underscore-dangle: 0 */
      id: selectedRowKey[0].part._id,
      site: Sites.id,
      stock: part.stock,
    };

    dispatch(updateSitePart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품 재고를 수정했습니다.');
        } else {
          message.success(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        reload();
        setshowUpdateConfirm(false);
      });
  };
  return (
    <>
      {selectedRowKey.length === 1 && (
        <Modal
          title="부품 재고 수정"
          style={{ top: 200 }}
          visible={showUpdateConfirm}
          onOk={form.submit}
          onCancel={() => setshowUpdateConfirm(false)}
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
              <Input
                type="text"
                value={selectedRowKey[0].part.section1}
                readOnly
              />
            </Form.Item>
            <Form.Item label="Section.2">
              <Input
                type="text"
                value={selectedRowKey[0].part.section2}
                readOnly
              />
            </Form.Item>
            <Form.Item label="부품 이름">
              <Input type="text" value={selectedRowKey[0].part.name} readOnly />
            </Form.Item>
            <Form.Item label="부품 가격">
              <Input
                type="text"
                value={selectedRowKey[0].part.price}
                readOnly
              />
            </Form.Item>
            <Form.Item label="부품 설명">
              <Input type="text" value={selectedRowKey[0].part.desc} readOnly />
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
                placeholder={selectedRowKey[0].stock}
              />
            </Form.Item>
          </Form>
        </Modal>
      )}
    </>
  );
}

export default BranchUpdatePartModal;

BranchUpdatePartModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  Sites: PropTypes.objectOf(PropTypes.any).isRequired,
  selectedRowKey: PropTypes.arrayOf(PropTypes.any).isRequired,
};
