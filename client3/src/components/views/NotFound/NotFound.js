import React from 'react';
import { Layout } from 'antd';
import { Link } from 'react-router-dom';

const { Content } = Layout;

function NotFound() {
  return (
    <Layout style={{ padding: '30px', overflow: 'auto' }}>
      <Content
        className="site-layout-background"
        style={{
          padding: 70,
          margin: 0,
          minHeight: 280,
          height: '100%',
          border: '1px solid',
          textAlign: 'center',
        }}
      >
        <h1 style={{ fontSize: 60 }}>Not Found Page</h1>
        <Link to="/">홈으로</Link>
      </Content>
    </Layout>
  );
}

export default NotFound;
