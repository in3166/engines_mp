// import React from 'react';
// import { Space, Button, Popconfirm } from 'antd';
// import {
//   DeleteFilled,
//   EditOutlined,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.id.localeCompare(b.id),
      multiple: 1,
    },
    width: 100,
    minWidth: 10,
    align: 'center',
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 160,
    minWidth: 10,
    align: 'center',
    responsive: ['sm'],
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
    width: 240,
    minWidth: 10,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '기본 수명',
    dataIndex: 'lifespan',
    sorter: {
      compare: (a, b) => a - b,
      multiple: 3,
    },
    width: 110,
    minWidth: 10,
    align: 'center',
  },
  // {
  //   title: '수정',
  //   dataIndex: 'update',
  //   key: 'action',
  //   render: () => {
  //     // onClick={() => onClickUpdate(userUp)}>
  //     return (
  //       <Space size="middle">
  //         <Button>
  //           <EditOutlined />
  //         </Button>
  //       </Space>
  //     );
  //   },
  //   width: 70,
  //   minWidth: 10,
  //   align: 'center',
  // },
  // {
  //   title: '삭제',
  //   key: 'action',
  //   render: () => {
  //     return (
  //       <Space size="middle">
  //         <Popconfirm
  //           placement="leftBottom"
  //           title="정말로 삭제하시겠습니까?"
  //           //  onConfirm={() => deleteConfirm(userDel)}
  //           okText="Yes"
  //           cancelText="No"
  //           icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
  //         >
  //           <Button>
  //             <DeleteFilled />
  //           </Button>
  //         </Popconfirm>
  //       </Space>
  //     );
  //   },
  //   width: 70,
  //   minWidth: 10,
  //   align: 'center',
  //   responsive: ['sm'],
  // },
];

export default columns;
