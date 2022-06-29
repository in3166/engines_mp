import React from 'react';
import { Table, Button, Popconfirm, Space } from 'antd';
import PropTypes from 'prop-types';

import {
  DeleteFilled,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import columns from '../data/columns';

function ManualTable(props) {
  const {
    Manuals,
    setselectedRowKeys,
    selectedRowKeys,
    updateManualsButton,

    deleteManualsButton,
  } = props;

  const columnButton = [
    {
      title: '수정',
      key: 'action',
      render: manual => {
        return (
          <Space size="middle">
            <Button onClick={() => updateManualsButton(manual)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['lg'],
    },
    {
      title: '삭제',
      key: 'action',
      render: manual => {
        /* eslint no-underscore-dangle: 0 */
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteManualsButton([manual._id])}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['lg'],
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
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
  deleteManualsButton: PropTypes.func.isRequired,
  updateManualsButton: PropTypes.func.isRequired,
};
