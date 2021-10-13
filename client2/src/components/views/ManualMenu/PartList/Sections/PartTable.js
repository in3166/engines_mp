import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
// import {
//   DeleteFilled,
//   PlusOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';
import columns from '../data/columns';

function PartTable(props) {
  const { Parts, selectedRowKey, setselectedRowKeys } = props;

  const onSelectChange = (selectedRowKeys, selectedRows) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
    const tempRow = [];
    selectedRows.forEach(v => {
      tempRow.push(v._id);
    });
    /* eslint no-underscore-dangle: 0 */
    setselectedRowKeys(tempRow);
  };

  const rowSelection = {
    selectedRowKey,
    onChange: onSelectChange,
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
        columns={columns}
        dataSource={Parts}
        rowKey="id"
      />
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRowKey: PropTypes.arrayOf(PropTypes.string).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
};
