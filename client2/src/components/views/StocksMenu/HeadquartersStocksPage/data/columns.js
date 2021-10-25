import React from 'react';
import {
  //   DeleteFilled,
  QuestionCircleOutlined,
  SendOutlined,
} from '@ant-design/icons';
import { Button, Popconfirm, Space } from 'antd';

const columns = [
  {
    title: 'Section.1',
    dataIndex: ['part', 'section1'],
    sorter: {
      compare: (a, b) => a.part.section1.localeCompare(b.part.section1),
      multiple: 1,
    },
    width: 80,
  },
  {
    title: 'Section.2',
    dataIndex: ['part', 'section2'],
    sorter: {
      compare: (a, b) => a.part.section2.localeCompare(b.part.section2),
      multiple: 1,
    },
    width: 80,
  },
  {
    title: 'Name',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 2,
    },
    width: 100,
  },
  {
    title: '설명',
    dataIndex: ['part', 'desc'],
    sorter: {
      compare: (a, b) => a.part.desc.localeCompare(b.part.desc),
      multiple: 3,
    },
  },
  {
    title: '재고',
    dataIndex: 'stock',
    sorter: {
      compare: (a, b) => a.stock - b.stock,
      multiple: 4,
    },
    showSorterTooltip: false,
    width: 150,
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
