import React from 'react';
import { BackTop } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const style = {
  height: 40,
  width: 40,
  lineHeight: '40px',
  borderRadius: 4,
  backgroundColor: '#1088e9',
  color: '#fff',
  textAlign: 'center',
  fontSize: 14,
};

function BackTopUtil() {
  return (
    <div style={{ opacity: 0.7 }}>
      <BackTop style={{ right: '20px' }}>
        <div style={style}>
          <UpOutlined />
        </div>
      </BackTop>
    </div>
  );
}

export default BackTopUtil;
