import React from 'react';
import { Tooltip } from 'antd';

const columns = [
  {
    title: 'ID',
    dataIndex: 'id',
    sorter: {
      compare: (a, b) => a.section2.localeCompare(b.section2),
      multiple: 2,
    },
    width: 60,
    align: 'center',
    responsive: ['md'],
  },
  {
    title: '이름',
    dataIndex: 'name',
    sorter: {
      compare: (a, b) => a.name.localeCompare(b.name),
      multiple: 2,
    },
    width: 100,
    align: 'center',
  },
  {
    title: '엔진',
    dataIndex: ['engine', 'name'],
    sorter: {
      compare: (a, b) => a.engine.name.localeCompare(b.engine.name),
      multiple: 2,
    },
    width: 110,
    align: 'center',
  },
  {
    title: '부품',
    dataIndex: ['part', 'name'],
    sorter: {
      compare: (a, b) => a.part.name.localeCompare(b.part.name),
      multiple: 2,
    },
    width: 110,
    align: 'center',
  },
  {
    title: '설명',
    dataIndex: 'desc',
    sorter: {
      compare: (a, b) => a.desc.localeCompare(b.desc),
      multiple: 3,
    },
    responsive: ['sm'],
    width: 230,
    align: 'center',
    onCell: () => {
      return {
        style: {
          whiteSpace: 'nowrap',
          // maxWidth: 250,
        },
      };
    },
    render: text => (
      <Tooltip title={text}>
        <div style={{ textOverflow: 'ellipsis', overflow: 'hidden' }}>
          {text}
        </div>
      </Tooltip>
    ),
  },
];

export default columns;
