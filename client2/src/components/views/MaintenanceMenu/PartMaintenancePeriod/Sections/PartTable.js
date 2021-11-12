import React from 'react';
import { Table, Button, Space } from 'antd';
import PropTypes from 'prop-types';
// import {
//   DeleteFilled,
//   PlusOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';

import { EditOutlined } from '@ant-design/icons';
import columns from '../data/columns';

function PartTable(props) {
  const { Parts, updatePartsButton } = props;
  // 개별 삭제 버튼

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
  // console.log(selectedRowKeys);
  // const rowSelection = {
  //   ...selectedRowKeys._id,
  //   onChange: (selectedRowKey, sel2) => {
  //     console.log(sel2);
  //     setselectedRowKeys(sel2);
  //   },
  //   selections: [
  //     Table.SELECTION_ALL,
  //     Table.SELECTION_NONE,
  //     Table.SELECTION_INVERT,
  //   ],
  // };
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
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  // selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  // setselectedRowKeys: PropTypes.func.isRequired,
  updatePartsButton: PropTypes.func.isRequired,
};
