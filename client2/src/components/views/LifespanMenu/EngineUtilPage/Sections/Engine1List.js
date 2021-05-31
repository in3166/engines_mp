import React from 'react';
import { Table } from 'antd';
import { datas1, datas2 } from './datas';
import { columns1, columns2 } from './coulmns';

function Engine1List() {
  const expandedRowRender = () => {
    const columns = columns2;
    const data = datas2;
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = columns1;

  return (
    <Table
      size="small"
      columns={columns}
      dataSource={datas1}
      expandable={{ expandedRowRender }}
    />
  );
}

export default Engine1List;
