import React, { useState, useEffect } from 'react';
import { Modal, Form, message, Select, Input } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { updateManual } from '../../../../../_actions/manual_actions';

function ManualUpdateModal(props) {
  const {
    showUpdateConfirm,
    setshowUpdateConfirm,
    selectedManual,
    getManuals,
  } = props;
  const dispatch = useDispatch();
  const [manual, setmanual] = useState({});
  const [Engines, setEngines] = useState([]);
  const [Parts, setParts] = useState([]);

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
    setmanual(selectedManual);
    return () => {
      setmanual({});
    };
  }, [selectedManual]);

  const modalOnOk = manualText => {
    const body = {
      /* eslint no-underscore-dangle: 0 */
      _id: manual._id,
      id: manualText.id,
      name: manualText?.name,
      desc: manualText?.desc,
      part: manualText?.part,
      engine: manualText?.engine,
    };
    console.log('body: ', body);

    dispatch(updateManual(body))
      .then(res => {
        if (res.payload.success) {
          message.success('매뉴얼을 수정하였습니다.');
        } else {
          message.error('매뉴얼 수정을 실패하였습니다.: ', res.payload.message);
        }
      })
      .catch(err => {
        message.error('[error]: ', err);
      })
      .finally(() => {
        getManuals();
        setshowUpdateConfirm(false);
      });
  };

  return (
    <div>
      <Modal
        title="매뉴얼 정보 수정"
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
          onFinish={modalOnOk}
          key={manual}
          preserve={false}
        >
          <Form.Item label="ID" name="id" initialValue={selectedManual.id}>
            <Input
              id="id"
              name="id"
              type="text"
              autoComplete="on"
              rules={[{ required: true, message: '아이디를 입력하세요.' }]}
            />
          </Form.Item>
          <Form.Item
            label="이름"
            name="name"
            initialValue={selectedManual.name}
          >
            <Input
              id="name"
              name="name"
              type="text"
              autoComplete="on"
              rules={[{ required: true, message: '이름을 입력하세요.' }]}
            />
          </Form.Item>
          <Form.Item
            label="엔진"
            name="engine"
            initialValue={selectedManual?.engine?._id}
          >
            <Select id="engine" name="engine">
              <Select.Option>-</Select.Option>
              {Engines?.map(data => (
                <Select.Option value={data._id} key={data.name}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="부품"
            name="part"
            initialValue={selectedManual?.part?._id}
          >
            <Select
              id="part"
              name="part"
              defaultValue={selectedManual?.part?._id}
            >
              <Select.Option>-</Select.Option>
              {Parts?.map(data => (
                <Select.Option value={data._id} key={data.name}>
                  {data.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            label="설명"
            name="desc"
            initialValue={selectedManual.desc}
          >
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

export default ManualUpdateModal;

ManualUpdateModal.propTypes = {
  showUpdateConfirm: PropTypes.bool.isRequired,
  setshowUpdateConfirm: PropTypes.func.isRequired,
  selectedManual: PropTypes.objectOf(PropTypes.any).isRequired,
  getManuals: PropTypes.func.isRequired,
};
