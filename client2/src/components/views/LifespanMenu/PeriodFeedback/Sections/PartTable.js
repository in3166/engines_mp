import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';
// import {
//   DeleteFilled,
//   PlusOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';

import { DiffOutlined } from '@ant-design/icons';
import columns from '../data/columns';
import FeedbackModal from './FeedbackModal';

function PartTable(props) {
  const { Parts, setselectedRowKeys, selectedRowKeys } = props;
  const [ShowFeedbackModal, setShowFeedbackModal] = useState(false);
  const [SelectedPart, setSelectedPart] = useState({});
  const orderClickHandler = part => {
    setSelectedPart(part);
    setShowFeedbackModal(true);
  };
  const columnButton = [
    {
      title: '피드백',
      key: 'action',
      render: part => {
        return (
          <Space size="middle">
            <Button onClick={() => orderClickHandler(part)}>
              <DiffOutlined />
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
  console.log(rowSelection);

  return (
    <>
      <Table
        // rowSelection={rowSelection}
        columns={columns2}
        dataSource={Parts}
        rowKey="_id"
        showSorterTooltip={false}
        style={{ overflow: 'auto' }}
        scroll
      />
      <FeedbackModal
        ShowFeedbackModal={ShowFeedbackModal}
        setShowFeedbackModal={setShowFeedbackModal}
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
