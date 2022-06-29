import React from 'react';
import { Table } from 'antd';
import PropTypes from 'prop-types';
import { engineCol, partCol } from './coulmns';

function EngineList(props) {
  const { engine } = props;
  console.log('engine: ', engine);

  const expandedRowRender = record => {
    return (
      <Table
        size="small"
        columns={partCol}
        dataSource={record.requiredParts}
        rowKey={a => a.part.id}
        bordered
      />
    );
  };

  return (
    <>
      <Table
        size="middle"
        columns={engineCol}
        dataSource={engine}
        expandable={{ expandedRowRender }}
        rowKey="id"
        style={{ overflow: 'auto' }}
        scroll
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  engine: PropTypes.arrayOf(PropTypes.object).isRequired,
};
