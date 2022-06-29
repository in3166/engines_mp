import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { addEngine } from '../../../../../_actions/engine_actions';

function EngineAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getEngines } = props;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();

  const [form] = Form.useForm();

  const modalOnOk = part => {
    const body = {
      id: part?.id,
      name: part?.name,
      defaultLifespan: part?.life,
    };

    dispatch(addEngine(body))
      .then(res => {
        if (res.payload.success) {
          message.success('엔진이 추가되었습니다.');
          getEngines();
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        // state로 변경
        document.getElementById('id').value = '';
        document.getElementById('name').value = '';
        document.getElementById('life').value = '';
        setshowAddConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="엔진 추가"
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
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              {...register('id', { required: true, minLength: 3 })}
            />
            {errors.id && <p className="form_p">This id field is required</p>}
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">ID must have at least 3 characters</p>
            )}
          </Form.Item>
          <Form.Item label="엔진 이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              {...register('name', { required: true, maxLength: 15 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="기본 수명">
            <input
              id="life"
              name="life"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.life}
              {...register('life', { required: true })}
            />
            {errors.life && errors.life.type === 'required' && (
              <p className="form_p">This life field is required</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EngineAddModal;

EngineAddModal.propTypes = {
  getEngines: PropTypes.func.isRequired,
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};
