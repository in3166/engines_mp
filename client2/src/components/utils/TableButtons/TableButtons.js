import React from 'react';
import { Button, message, Popconfirm, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  DeleteFilled,
  QuestionCircleOutlined,
  EditOutlined,
  PlusOutlined,
} from '@ant-design/icons';

function TableButtons(props) {
  const {
    setShowAddModal,
    setShowUpdateModal,
    deleteConfirm,
    selectedRowKeys,
    setselectedPart,
  } = props;

  const handleUpdateButton = () => {
    if (selectedRowKeys?.length !== 1) {
      message.error('한 개의 요소만 선택하세요.');
    } else {
      setselectedPart(selectedRowKeys[0]);
      setShowUpdateModal(true);
    }
  };

  return (
    <div style={{ float: 'right' }}>
      <Space>
        <Button onClick={() => setShowAddModal(true)}>
          <PlusOutlined />
        </Button>
        <Button onClick={handleUpdateButton}>
          <EditOutlined />
        </Button>
        <Space size="middle">
          <Popconfirm
            placement="leftBottom"
            title="정말로 삭제하시겠습니까?"
            onConfirm={() => deleteConfirm(selectedRowKeys)}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button>
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </Space>
      </Space>
    </div>
  );
}

export default TableButtons;

TableButtons.propTypes = {
  setShowAddModal: PropTypes.func.isRequired,
  setShowUpdateModal: PropTypes.func.isRequired,
  deleteConfirm: PropTypes.func.isRequired,
  setselectedPart: PropTypes.func.isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
};
