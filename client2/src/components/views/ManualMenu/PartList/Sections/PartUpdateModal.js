import React, { useState, useEffect } from 'react';
import { Modal, Form, message } from 'antd';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { updatePart } from '../../../../../_actions/part_actions';

function PartUpdateModal(props) {
  const { showUpdateConfirm, setshowUpdateConfirm, selectedPart, getParts } =
    props;
  const dispatch = useDispatch();
  const [part, setpart] = useState({});
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [form] = Form.useForm();
  useEffect(() => {
    setpart(selectedPart);
    reset(selectedPart); // 처음 설정 시 value가 안먹히는 문제 해결
    return () => {
      setpart({});
    };
  }, [reset, selectedPart]);

  const modalOnOk = partText => {
    const body = {
      /* eslint no-underscore-dangle: 0 */
      _id: part._id,
      id: partText.id,
      name: partText?.name,
      life: partText?.life,
      price: partText?.price,
      desc: partText?.desc,
    };

    dispatch(updatePart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('성공');
        } else {
          message.error('실패: ', res.payload.message);
        }
      })
      .catch(err => {
        message.error('[error]: ', err);
      })
      .finally(() => {
        getParts();
        setshowUpdateConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="부품 정보 수정"
        style={{ top: 200 }}
        visible={showUpdateConfirm}
        onOk={form.submit}
        onCancel={() => setshowUpdateConfirm(false)}
      >
        <Form
          {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
          name="userinfo-change"
          form={form}
          onFinish={handleSubmit(modalOnOk)}
          key={part}
        >
          <Form.Item label="ID">
            <input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.id}
              defaultValue={part?.id}
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
              defaultValue={part?.name}
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
              name="life"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.life}
              defaultValue={part?.defaultLifespan}
              {...register('life', { required: true })}
            />
            {errors.life && errors.life.type === 'required' && (
              <p className="form_p">This life field is required</p>
            )}
          </Form.Item>
          <Form.Item label="가격(원)">
            <input
              name="price"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.price}
              defaultValue={part?.price}
              {...register('price', { required: true, maxLength: 20 })}
            />
            {errors.price && errors.price.type === 'required' && (
              <p className="form_p">This price field is required</p>
            )}
            {errors.price && errors.price.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
          <Form.Item label="설명">
            <input
              name="desc"
              type="text"
              autoComplete="on"
              error={errors.desc}
              defaultValue={part?.desc}
              {...register('desc', { required: true, maxLength: 20 })}
              className="form_input"
            />
            {errors.desc && errors.desc.type === 'required' && (
              <p className="form_p">This desc field is required</p>
            )}
            {errors.desc && errors.desc.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default PartUpdateModal;

PartUpdateModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  selectedPart: PropTypes.objectOf(PropTypes.any).isRequired,
  getParts: PropTypes.func.isRequired,
};
