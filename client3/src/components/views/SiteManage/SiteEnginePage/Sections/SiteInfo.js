import React from 'react';
import { Divider, Descriptions } from 'antd';
import PropTypes from 'prop-types';

function SiteInfo(props) {
  const { site } = props;
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
    </>
  );
}

export default SiteInfo;

SiteInfo.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
};
