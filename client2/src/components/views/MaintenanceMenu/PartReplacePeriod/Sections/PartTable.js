import React from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';

import { EditOutlined } from '@ant-design/icons';
import columns from '../data/columns';

function PartTable(props) {
  const { Parts, updatePartsButton } = props;

  const columnButton = [
    {
      title: '수정',
      key: 'action',
      render: part => {
        return (
          <Space size="middle">
            <Button onClick={() => updatePartsButton([part], true)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
    },
  ];

  const columns2 = [...columns, ...columnButton];

  return (
    <>
      <Table
        columns={columns2}
        dataSource={Parts}
        rowKey="_id"
        showSorterTooltip={false}
        style={{ overflow: 'auto' }}
        scroll
      />
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  updatePartsButton: PropTypes.func.isRequired,
};
