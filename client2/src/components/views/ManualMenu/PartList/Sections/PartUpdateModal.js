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
      section1: partText.section1,
      section2: partText.section2,
      name: partText?.name,
      defaultLifespan: partText?.defaultLifespan,
      expectLifespan: partText?.expectLifespan,
      actualLifespan: partText?.actualLifespan,
      price: partText?.price,
      desc: partText?.desc,
    };
    console.log('body: ', body);

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
        style={{ top: 50 }}
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
          key={part}
          preserve={false}
        >
          <Form.Item label="Section.1">
            <input
              id="section1"
              name="section1"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.section1}
              defaultValue={part?.section1}
              {...register('section1', { minLength: 5 })}
            />
            {errors.section1 && errors.section1.type === 'minLength' && (
              <p className="form_p">
                This field must have at least 5 characters
              </p>
            )}
          </Form.Item>
          <Form.Item label="Section.2">
            <input
              id="section2"
              name="section2"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.section2}
              defaultValue={part?.section2}
              {...register('section2', { minLength: 5 })}
            />
            {errors.section2 && errors.section2.type === 'minLength' && (
              <p className="form_p">
                This field must have at least 5 characters
              </p>
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
              {...register('name', { required: true, maxLength: 50 })}
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
              defaultValue={part?.defaultLifespan}
              {...register('defaultLifespan', { required: true })}
            />
            {errors.defaultLifespan &&
              errors.defaultLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
          <Form.Item label="예측 수명">
            <input
              name="expectLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.expectLifespan}
              defaultValue={part?.expectLifespan}
              {...register('expectLifespan', { required: true })}
            />
            {errors.expectLifespan &&
              errors.expectLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
          <Form.Item label="실수명">
            <input
              name="actualLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.actualLifespan}
              defaultValue={part?.actualLifespan}
              {...register('actualLifespan', { required: true })}
            />
            {errors.actualLifespan &&
              errors.actualLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
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
              {...register('price', { required: true, maxLength: 100 })}
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

export default PartUpdateModal;

PartUpdateModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  selectedPart: PropTypes.objectOf(PropTypes.any).isRequired,
  getParts: PropTypes.func.isRequired,
};
