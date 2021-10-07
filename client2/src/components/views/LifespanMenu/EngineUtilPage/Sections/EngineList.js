import React from 'react';
import { Table, Descriptions, Divider } from 'antd';
import PropTypes from 'prop-types';
import { engineCol, partCol } from './coulmns';

function EngineList(props) {
  const { site, engines } = props;

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
      <Descriptions size="small" bordered>
        <Descriptions.Item label="ID">{site.id}</Descriptions.Item>
        <Descriptions.Item label="Addres">{site.address}</Descriptions.Item>
        <Descriptions.Item label="Number">{site.phone}</Descriptions.Item>
      </Descriptions>
      <Divider plain>
        <strong>Engine</strong>
      </Divider>
      <Table
        size="middle"
        columns={engineCol}
        dataSource={engines}
        expandable={{ expandedRowRender }}
        rowKey="name"
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  site: PropTypes.objectOf(PropTypes.object).isRequired,
  engines: PropTypes.arrayOf(PropTypes.object).isRequired,
};
