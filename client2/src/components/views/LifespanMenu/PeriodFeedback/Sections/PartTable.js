import React, { useState } from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';

import { DiffOutlined } from '@ant-design/icons';
import columns from '../data/columns';
import FeedbackModal from './FeedbackModal';

function PartTable(props) {
  const { Parts } = props;
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
};
