import React from 'react';
import { Table, Descriptions, Divider } from 'antd';
import PropTypes from 'prop-types';
import partCol from './coulmns';

function EngineList(props) {
  const { site, parts } = props;
  console.log(parts);
  return (
    <>
      <Descriptions size="small" bordered>
        <Descriptions.Item label="ID">{site.id}</Descriptions.Item>
        <Descriptions.Item label="Addres">{site.address}</Descriptions.Item>
        <Descriptions.Item label="Number">{site.phone}</Descriptions.Item>
      </Descriptions>
      <Divider plain>
        <strong>Part</strong>
      </Divider>
      <Table
        size="middle"
        columns={partCol}
        dataSource={parts}
        rowKey={a => a.part.id}
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  parts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
