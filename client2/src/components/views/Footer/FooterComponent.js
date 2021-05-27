import React from 'react';

import { Layout } from 'antd';

const { Footer } = Layout;

function FooterComponent() {
  return (
    <div style={{ display: 'inline' }}>
      <Footer
        style={{
          textAlign: 'center',
          padding: '3px 3px 3px 3px',
          backgroundColor: 'white',
        }}
      >
        JintecgEng ©2021
      </Footer>
    </div>
  );
}

export default FooterComponent;
