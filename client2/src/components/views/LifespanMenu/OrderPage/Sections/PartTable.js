import React from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';
import { SendOutlined } from '@ant-design/icons';
import columns from '../../PeriodFeedback/data/columns';

function PartTable(props) {
  const { Parts, setselectedRowKeys, selectedRowKeys } = props;
  const orderClickHandler = () => {};
  const columnButton = [
    {
      title: '주문',
      key: 'action',
      render: part => {
        return (
          <Space size="middle">
            <Button onClick={() => orderClickHandler([part], true)}>
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
  const rowSelection = {
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
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
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
};
