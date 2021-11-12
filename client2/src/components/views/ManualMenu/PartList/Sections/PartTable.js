import React from 'react';
import { Table, Button, Popconfirm, Space, message } from 'antd';
import PropTypes from 'prop-types';
// import {
//   DeleteFilled,
//   PlusOutlined,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';

import {
  DeleteFilled,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import columns from '../data/columns';

function PartTable(props) {
  const {
    Parts,
    setselectedRowKeys,
    selectedRowKeys,
    updatePartsButton,
    getParts,
  } = props;
  // 개별 삭제 버튼
  const deleteConfirm = id => {
    const body = {
      id: [id],
    };

    axios
      .post('/api/parts/deleteParts', body)
      .then(res => {
        if (res.data.success) {
          message.success('부품을 삭제하였습니다.');
        } else {
          message.error(
            '부품 삭제를 실패하였습니다. (다른 필드가 참조하고 있습니다.)',
          );
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => getParts());
  };

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
      responsive: ['xl'],
    },
    {
      title: '삭제',
      key: 'action',
      render: part => {
        /* eslint no-underscore-dangle: 0 */
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm(part._id)}
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
    </>
  );
}

export default PartTable;

PartTable.propTypes = {
  Parts: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedRowKeys: PropTypes.arrayOf(PropTypes.any).isRequired,
  setselectedRowKeys: PropTypes.func.isRequired,
  getParts: PropTypes.func.isRequired,
  updatePartsButton: PropTypes.func.isRequired,
};
