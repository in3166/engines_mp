import React from 'react';
import { Layout, Breadcrumb, Row, Col } from 'antd';

const { Content } = Layout;

function LandingPage() {
  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>DashBoard</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 12,
            margin: 0,
            minHeight: 280,
            height: '100%',
            border: '1px solid',
          }}
        >
          <Row gutter={[16, 16]}>
            <Col lg={8} xs={23}>
              <div>부품 관리</div>
            </Col>
            <Col lg={8} xs={23}>
              <div>자재 관리</div>
            </Col>
          </Row>
        </Content>
      </Layout>
    </div>
  );
}

export default LandingPage;
