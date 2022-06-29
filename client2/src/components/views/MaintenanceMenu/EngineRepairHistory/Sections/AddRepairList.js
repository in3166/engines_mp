import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import axios from 'axios';
import moment from 'moment';

const AddRepairList = props => {
  const { SelectedRepair, setShowAddModal, ShowAddModal, reload } = props;
  const [form] = Form.useForm();

  const modalOnOk = input => {
    const body = {
      id: SelectedRepair.id,
      part: input.part,
      status: input.status,
      date: input.date.format('YYYY-MM-DD HH:mm:ss'),
    };

    axios
      .post('/api/sites/addSiteEngineMaintenance', body)
      .then(res => {
        console.log(res);
      })
      .catch(err => console.log(`${err}`))
      .finally(() => {
        setShowAddModal(false);
        reload();
      });
  };

  return (
    <Modal
      title="수정 이력 추가"
      style={{ top: 200 }}
      visible={ShowAddModal}
      destroyOnClose
      onOk={form.submit}
      onCancel={() => setShowAddModal(false)}
    >
      <Form
        {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        name="userinfo-change"
        id="updateForm"
        form={form}
        onFinish={modalOnOk}
        preserve={false}
      >
        <Form.Item
          label="엔진 이름"
          name="engine"
          initialValue={SelectedRepair?.engine?.name}
        >
          <Input type="text" id="engine" name="engine" readOnly />
        </Form.Item>
        <Form.Item label="부품" name="part">
          <Select id="part" name="part">
            {SelectedRepair?.engine?.requiredParts.map(v => (
              <Select.Option value={v.part._id} key={v.part._id}>
                {v.part.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="상태" name="status">
          <Select id="status" name="status">
            <Select.Option value="정비">정비</Select.Option>
            <Select.Option value="교체">교체</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="날짜" name="date">
          <DatePicker
            id="date"
            name="date"
            showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
            format="YYYY-MM-DD HH:mm:ss"
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddRepairList.propTypes = {
  SelectedRepair: PropTypes.objectOf(PropTypes.any).isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  reload: PropTypes.func.isRequired,
  ShowAddModal: PropTypes.bool.isRequired,
};

export default AddRepairList;
