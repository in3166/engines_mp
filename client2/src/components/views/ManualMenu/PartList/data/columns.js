import React from 'react';
import { Button, Popconfirm, Space } from 'antd';
import {
  DeleteFilled,
  QuestionCircleOutlined,
  EditOutlined,
} from '@ant-design/icons';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 200,
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
  },
  {
    title: '재고',
    dataIndex: 'qu',
    sorter: {
      compare: (a, b) => a.qu - b.qu,
      multiple: 4,
    },
    width: 200,
  },
  {
    title: '수정',
    key: 'action',
    render: () => {
      return (
        <Space size="middle">
          <Button>
            <EditOutlined />
          </Button>
        </Space>
      );
    },
    width: 70,
    align: 'center',
    responsive: ['sm'],
  },
  {
    title: '삭제',
    key: 'action',
    render: () => {
      return (
        <Space size="middle">
          <Popconfirm
            placement="leftBottom"
            title="정말로 삭제하시겠습니까?"
            onConfirm
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
    responsive: ['sm'],
  },
];

export default columns;
