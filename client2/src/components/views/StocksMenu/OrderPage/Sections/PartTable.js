import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';
// import {
//   DeleteFilled,
//   PlusOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';

import { SendOutlined } from '@ant-design/icons';
import columns from '../data/columns';
import OrderModal from './OrderModal';

function PartTable(props) {
  const { Parts, setselectedRowKeys, selectedRowKeys } = props;
  const [ShowOrderModal, setShowOrderModal] = useState(false);
  const [SelectedPart, setSelectedPart] = useState({});
  const orderClickHandler = part => {
    setSelectedPart(part);
    setShowOrderModal(true);
  };
  const columnButton = [
    {
      title: '주문',
      key: 'action',
      render: part => {
        return (
          <Space size="middle">
            <Button onClick={() => orderClickHandler(part)}>
              <SendOutlined />
            </Button>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['xl'],
    },
  ];

  const columns2 = [...columns, ...columnButton];
  console.log(selectedRowKeys);
  const rowSelection = {
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      console.log(sel2);
      setselectedRowKeys(sel2);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };
  return (
    <>
      <Table
        rowSelection={rowSelection}
        columns={columns2}
        dataSource={Parts}
        rowKey="_id"
        showSorterTooltip={false}
        style={{ overflow: 'auto' }}
        scroll
      />
      <OrderModal
        ShowOrderModal={ShowOrderModal}
        setShowOrderModal={setShowOrderModal}
        part={SelectedPart}
      />
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
};
