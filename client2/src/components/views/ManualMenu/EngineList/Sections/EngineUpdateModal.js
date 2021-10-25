import React, { useState, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updateEngine } from '../../../../../_actions/engine_actions';

function EngineUpdateModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    selectedEngine,
    getEngines,
  } = props;
  const dispatch = useDispatch();
  const [Engine, setEngine] = useState({});

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [form] = Form.useForm();
  useEffect(() => {
    setEngine(selectedEngine);
    reset(selectedEngine); // 처음 설정 시 value가 안먹히는 문제 해결
    return () => {
      setEngine({});
    };
  }, [reset, selectedEngine]);

  const modalOnOk = engine => {
    const body = {
      /* eslint no-underscore-dangle: 0 */
      _id: Engine._id,
      id: engine.id,
      name: engine?.name,
      defaultLifespan: engine?.defaultLifespan,
    };

    dispatch(updateEngine(body))
      .then(res => {
        if (res.payload.success) {
          message.success('성공');
        } else {
          message.error('실패: ', res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        getEngines();
        setshowUpdateConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="부품 정보 수정"
        style={{ top: 200 }}
        visible={showUpdateConfirm}
        destroyOnClose
        onOk={form.submit}
        onCancel={() => setshowUpdateConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
          key={Engine}
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
              defaultValue={Engine?.id}
              {...register('id', { required: true, minLength: 3 })}
            />
            {errors.id && <p className="form_p">This id field is required</p>}
            {errors.id && errors.id.type === 'minLength' && (
              <p className="form_p">ID must have at least 3 characters</p>
            )}
          </Form.Item>
          <Form.Item label="부품 이름">
            <input
              id="name"
              name="name"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.name}
              defaultValue={Engine?.name}
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
              name="defaultLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.defaultLifespan}
              defaultValue={Engine?.defaultLifespan}
              {...register('defaultLifespan', { required: true })}
            />
            {errors.defaultLifespan &&
              errors.defaultLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default EngineUpdateModal;

EngineUpdateModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  selectedEngine: PropTypes.objectOf(PropTypes.any).isRequired,
  getEngines: PropTypes.func.isRequired,
};
