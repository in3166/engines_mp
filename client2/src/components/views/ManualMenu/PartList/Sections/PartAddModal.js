import React from 'react';
import { Modal, Form, message } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { addPart } from '../../../../../_actions/part_actions';

function PartAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getParts } = props;

  const dispatch = useDispatch();

  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();

  const [form] = Form.useForm();

  const modalOnOk = part => {
    const body = {
      section1: part?.section1,
      section2: part?.section2,
      name: part?.name,
      defaultLifespan: part?.defaultLifespan,
      expectLifespan: part?.expectLifespan,
      actualLifespan: part?.actualLifespan,
      price: part?.price,
      desc: part?.desc,
    };

    dispatch(addPart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('부품이 추가되었습니다.');
          getParts();
        } else {
          message.error(res.payload.message);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
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
          <Form.Item label="Section.1">
            <input
              id="section1"
              name="section1"
              type="text"
              autoComplete="on"
              className="form_input"
              error={errors.section1}
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
              id="defaultLifespan"
              name="defaultLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.defaultLifespan}
              {...register('defaultLifespan', { required: true })}
            />
            {errors.defaultLifespan &&
              errors.defaultLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
          <Form.Item label="예측 수명">
            <input
              id="expectLifespan"
              name="expectLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.expectLifespan}
              {...register('expectLifespan', { required: true })}
            />
            {errors.expectLifespan &&
              errors.expectLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
          <Form.Item label="실수명">
            <input
              id="actualLifespan"
              name="actualLifespan"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.actualLifespan}
              {...register('actualLifespan', { required: true })}
            />
            {errors.actualLifespan &&
              errors.actualLifespan.type === 'required' && (
                <p className="form_p">This field is required</p>
              )}
          </Form.Item>
          <Form.Item label="가격(원)">
            <input
              id="price"
              name="price"
              className="form_input"
              type="text"
              autoComplete="on"
              error={errors.price}
              {...register('price', { required: true, maxLength: 50 })}
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

export default PartAddModal;

PartAddModal.propTypes = {
  getParts: PropTypes.func.isRequired,
  showAddConfirm: PropTypes.bool.isRequired,
  setshowAddConfirm: PropTypes.func.isRequired,
};
