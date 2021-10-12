import React from 'react';
import {
  //   DeleteFilled,
  QuestionCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: ['part', 'id'],
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
  },
  {
    title: 'Name',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 200,
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
  },
  {
    title: '재고',
    dataIndex: 'stock',
    sorter: {
      compare: (a, b) => a.qu - b.qu,
      multiple: 4,
    },
    width: 200,
  },
  {
    title: '주문',
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
              <SendOutlined />
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
