import React from 'react';
import { Descriptions } from 'antd';
import PropTypes from 'prop-types';

function SiteDescription(props) {
  const { site } = props;

  return (
    <Descriptions size="small" bordered>
      <Descriptions.Item label="ID">{site.id}</Descriptions.Item>
      <Descriptions.Item label="Addres">{site.address}</Descriptions.Item>
      <Descriptions.Item label="Number">{site.phone}</Descriptions.Item>
    </Descriptions>
  );
}

export default SiteDescription;

SiteDescription.propTypes = {
  site: PropTypes.objectOf(PropTypes.any).isRequired,
};
