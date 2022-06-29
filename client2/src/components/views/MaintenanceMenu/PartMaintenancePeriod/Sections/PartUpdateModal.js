import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { Modal, Form, message } from 'antd';
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
      maintenancePeriod: partText?.maintenancePeriod,
    };

    dispatch(updatePart(body))
      .then(res => {
        if (res.payload.success) {
          message.success('정비 주기를 수정하였습니다.');
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
              readOnly
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
              readOnly
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
              readOnly
              {...register('name', { required: true, maxLength: 50 })}
            />
            {errors.name && errors.name.type === 'required' && (
              <p className="form_p">This name field is required</p>
            )}
            {errors.name && errors.name.type === 'maxLength' && (
              <p className="form_p">Your input exceed maximum input</p>
            )}
          </Form.Item>

          <Form.Item label="정비 주기">
            <input
              name="maintenancePeriod"
              className="form_input"
              type="number"
              autoComplete="on"
              error={errors.maintenancePeriod}
              defaultValue={part?.maintenancePeriod}
              {...register('maintenancePeriod', { required: true })}
            />
            {errors.maintenancePeriod &&
              errors.maintenancePeriod.type === 'required' && (
                <p className="form_p">This field is required</p>
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
