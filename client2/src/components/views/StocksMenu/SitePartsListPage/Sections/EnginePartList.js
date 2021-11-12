import React from 'react';
import { Table, Divider } from 'antd';
import PropTypes from 'prop-types';
import SiteDescription from '../../../../utils/SiteDescription/SiteDescription';
import partCol from './coulmns';

function EngineList(props) {
  const { site, parts } = props;
  return (
    <>
      <SiteDescription site={site} />
      <Divider plain>
        <strong>Part</strong>
      </Divider>
      <Table
        size="middle"
        columns={partCol}
        dataSource={parts}
        rowKey={a => a?.part?.name}
        style={{ overflow: 'auto' }}
        scroll
      />
    </>
  );
}

export default EngineList;

EngineList.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
  parts: PropTypes.arrayOf(PropTypes.object).isRequired,
};
