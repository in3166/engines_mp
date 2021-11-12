import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';

import columns from '../data/columns';

function ManualTable(props) {
  const { Manuals } = props;
  // 개별 삭제 버튼

  return (
    <>
      <Table
        columns={columns}
        dataSource={Manuals}
        rowKey="_id"
        showSorterTooltip={false}
        style={{ overflow: 'auto' }}
        scroll
      />
    </>
  );
}

export default ManualTable;

ManualTable.propTypes = {
  Manuals: PropTypes.arrayOf(PropTypes.object).isRequired,
};
