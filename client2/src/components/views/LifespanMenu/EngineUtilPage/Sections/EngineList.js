import React from 'react';
import { Table, Divider } from 'antd';
import PropTypes from 'prop-types';
import { engineCol, partCol } from './coulmns';
import SiteDescription from '../../../../utils/SiteDescription/SiteDescription';

function EngineList(props) {
  const { site, engine } = props;

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
      <SiteDescription site={site} />
      <Divider plain>
        <strong>Engine</strong>
      </Divider>
      <Table
        size="middle"
        columns={engineCol}
        dataSource={engine}
        expandable={{ expandedRowRender }}
        rowKey="name"
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  engine: PropTypes.arrayOf(PropTypes.object).isRequired,
};
