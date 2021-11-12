import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Form, Input, Select, DatePicker } from 'antd';
import moment from 'moment';

const AddRepairList = props => {
  const { SelectedRepair, setShowAddModal, ShowAddModal } = props;
  console.log(SelectedRepair);
  return (
    <Modal
      title="수정 이력 추가"
      style={{ top: 200 }}
      visible={ShowAddModal}
      destroyOnClose
      // onOk={form.submit}
      onCancel={() => setShowAddModal(false)}
    >
      <Form
        {...{ labelCol: { span: 6 }, wrapperCol: { span: 14 } }}
        name="userinfo-change"
        id="updateForm"
        // form={form}
        // onFinish={handleSubmit(modalOnOk)}
        preserve={false}
      >
        <Form.Item label="엔진 이름">
          <Input type="text" value={SelectedRepair?.engine?.name} readOnly />
        </Form.Item>
        <Form.Item label="부품">
          <Select>
            {SelectedRepair?.engine?.requiredParts.map(v => (
              <Select.Option value={v.part._id}>{v.part.name}</Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item label="상태">
          <Select>
            <Select.Option value="정비">정비</Select.Option>
            <Select.Option value="교체">교체</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="날짜">
          <DatePicker
            onChange
            onOk
            showTime={{ format: 'HH:mm:ss' }}
            format="YYYY-MM-DD HH:mm:ss"
            defaultValue={moment('2015/01/01', 'YYYY-MM-DD HH:mm:ss')}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

AddRepairList.propTypes = {
  SelectedRepair: PropTypes.objectOf(PropTypes.any).isRequired,
  setShowAddModal: PropTypes.func.isRequired,
  ShowAddModal: PropTypes.bool.isRequired,
};

export default AddRepairList;
