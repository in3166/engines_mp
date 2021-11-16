import React, { useEffect, useState } from 'react';
import { Modal, Form, message, Select, Input } from 'antd';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import axios from 'axios';
import { addManual } from '../../../../../_actions/manual_actions';

function ManualAddModal(props) {
  const { showAddConfirm, setshowAddConfirm, getManuals } = props;
  const [Parts, setParts] = useState([]);
  const [Engines, setEngines] = useState([]);
  const dispatch = useDispatch();

  const [form] = Form.useForm();

  const getParts = () => {
    axios.get('/api/parts/getAllParts').then(res => {
      console.log(res.data.parts);
      setParts(res.data.parts);
    });
  };

  const getEngines = () => {
    axios.get('/api/engines/getAllEngines').then(res => {
      console.log(res.data.engines);
      setEngines(res.data.engines);
    });
  };

  useEffect(() => {
    getParts();
    getEngines();
  }, []);

  const modalOnOk = manual => {
    const body = {
      id: manual?.id,
      name: manual?.name,
      desc: manual?.desc,
      part: manual?.part,
      engine: manual?.engine,
    };
    console.log(body);
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
        setshowAddConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="부품 추가"
        style={{ top: 50 }}
        visible={showAddConfirm}
        onOk={form.submit}
        onCancel={() => {
          setshowAddConfirm(false);
        }}
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
          <Form.Item label="ID" name="id">
            <Input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              rules={[{ required: true, message: '아이디를 입력하세요.' }]}
            />
          </Form.Item>
          <Form.Item label="이름" name="name">
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="on"
              rules={[{ required: true, message: '이름을 입력하세요.' }]}
            />
          </Form.Item>
          <Form.Item label="엔진" name="engine">
            <Select name="engine" id="engine">
              <Select.Option>-</Select.Option>
              {Engines?.map(data => (
                <Select.Option value={data._id} key={data.name}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="부품" name="part">
            <Select id="part" name="part">
              <Select.Option>-</Select.Option>
              {Parts?.map(data => (
                <Select.Option value={data._id} key={data.name}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item label="설명" name="desc">
            <Input
              id="desc"
              name="desc"
              type="text"
              autoComplete="on"
              rules={[{ required: true, message: '이름을 입력하세요.' }]}
            />
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
