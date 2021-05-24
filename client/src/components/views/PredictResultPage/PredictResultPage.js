import React from 'react';
import { Layout, Breadcrumb, Button } from 'antd';
import axios from 'axios';

const { Content } = Layout;

function PredictResultPage() {
  const flaskReq = () => {
    axios.get('/api/predict/engine1').then(res => {
      console.log(res);
    });
  };
  return (
    <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>예측 결과 분석</Breadcrumb.Item>
        <Breadcrumb.Item>기계 분석</Breadcrumb.Item>
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
        <div>
          <Button onClick={flaskReq}>Flask Api 요청</Button>
        </div>
      </Content>
    </Layout>
  );
}

export default PredictResultPage;
