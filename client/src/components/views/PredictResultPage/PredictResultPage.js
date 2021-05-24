import React, { useState, useEffect } from 'react';
import { Layout, Breadcrumb, Button, Spin, message } from 'antd';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import datas from './Sections/datas';

const { Content } = Layout;

function PredictResultPage() {
  const [Render, setRender] = useState(false);
  const [LineDatas, setLineDatas] = useState({});
  const [loading, setLoading] = useState(false);

  const renderLine = () => {
    if (loading) setLoading(false);
    return (
      <div className="chart" style={{ minHeight: 600 }}>
        <Line
          data={LineDatas?.chartData}
          legend={LineDatas?.legend}
          options={LineDatas?.options}
        />
      </div>
    );
  };

  const flaskReq = async () => {
    await setLoading(true);
    await axios.get('/api/predict/engine1').then(async res => {
      if (res.data.success) {
        const { a, date, x } = res.data.data;
        // console.log(a, x);
        const dataLine = datas(date, x, a);
        // console.log('dateline: ', dataLine);
        await setLineDatas(dataLine);
        await setRender(true);
        message.success('Success!');
      } else {
        setLoading(false);
        message.error('결과를 가져오지 못했습니다.');
      }
    });
  };

  useEffect(() => {
    if (loading) {
      flaskReq();
    }
  }, [loading]);

  return (
    <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>예측 결과 분석</Breadcrumb.Item>
        <Breadcrumb.Item>기계 분석</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading} tip="Loading..." size="large">
        <Content
          className="site-layout-background"
          style={{
            padding: 12,
            margin: 0,
            minHeight: 700,
            height: '100%',
            border: '1px solid',
          }}
        >
          <div>
            <Button onClick={() => setLoading(true)} disabled={loading}>
              Flask Api 요청
            </Button>
            <br />
            <br />
            {Render && renderLine()}
          </div>
        </Content>
      </Spin>
    </Layout>
  );
}

export default PredictResultPage;
