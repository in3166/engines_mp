import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { addManual } from '../../../../../_actions/manual_actions';

function ManualAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getManuals } = props;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [form] = Form.useForm();
  const modalOnOk = manual => {
    const body = {
      id: manual?.id,
      name: manual?.name,
      desc: manual?.desc,
    };

    dispatch(addManual(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품이 추가되었습니다.');
          getManuals();
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        // document.getElementById('id').value = '';
        // document.getElementById('name').value = '';
        // document.getElementById('life').value = '';
        // document.getElementById('price').value = '';
        // document.getElementById('desc').value = '';
        setshowAddConfirm(false);
        reset();
      });
  };

  return (
    <div>
      <Modal
        title="부품 추가"
        style={{ top: 50 }}
        visible={showAddConfirm}
        onOk={form.submit}
        onCancel={() => setshowAddConfirm(false)}
        destroyOnClose
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          id="updateForm"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
          preserve={false}
        >
          <Form.Item label="ID">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              {...register('id', { minLength: 3 })}
            />
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">
                This field must have at least 3 characters
              </p>
            )}
          </Form.Item>
          <Form.Item label="이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              {...register('name', { required: true, maxLength: 50 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="설명">
            <input
              id="desc"
              name="desc"
              type="text"
              autoComplete="on"
              error={errors.desc}
              {...register('desc', { maxLength: 100 })}
              className="form_input"
            />
            {errors.desc && errors.desc.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default ManualAddModal;

ManualAddModal.propTypes = {
  getManuals: PropTypes.func.isRequired,
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};
