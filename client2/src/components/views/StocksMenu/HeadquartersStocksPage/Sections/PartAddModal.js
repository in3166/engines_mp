import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { addPart } from '../../../../../_actions/part_actions';

function PartAddModal(props) {
  const { showAddConfirm, setshowAddConfirm } = props;
  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [form] = Form.useForm();

  // 수정 모달 OK 버튼 - redux
  const modalOnOk = part => {
    const body = {
      id: part?.id,
      name: part?.name,
      defaultLifespan: part?.defaultLifespan,
      price: part?.price,
      desc: part?.desc,
    };

    dispatch(addPart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품이 추가되었습니다.');
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('defaultLifespan').value = '';
        document.getElementById('price').value = '';
        document.getElementById('desc').value = '';
        setshowAddConfirm(false);
      });

    // form.resetFields();
  };

  return (
    <Modal
      title="부품 추가"
      style={{ top: 200 }}
      visible={showAddConfirm}
      onOk={form.submit}
      onCancel={() => setshowAddConfirm(false)}
    >
      <Form
        {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        name="userinfo-change"
        id="updateForm"
        form={form}
        onFinish={handleSubmit(modalOnOk)}
      >
        <Form.Item label="ID">
          <select
            name="part"
            id="part"
            className="form_select"
            {...register('part', { required: true })}
          >
            <option value={0}>part1</option>
            <option value={2}>part2</option>
            <option value={3}>part3</option>
          </select>
          {errors.part && errors.part.type === 'required' && (
            <p className="form_p">This role field is required</p>
          )}
        </Form.Item>
        <Form.Item label="재고">
          <input
            name="stock"
            id="stock"
            type="number"
            autoComplete="on"
            className="form_input"
            {...register('stock', { required: true })}
          />
          {errors.stock && errors.stock.type === 'required' && (
            <p className="form_p">This desc field is required</p>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
}

export default PartAddModal;

PartAddModal.propTypes = {
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};
