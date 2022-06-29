import React from 'react';
import { Doughnut, Line } from 'react-chartjs-2';
import { Layout, Breadcrumb, Row, Col, Progress, Collapse } from 'antd';
import { data, chartData, options, legend } from './data';

const { Content } = Layout;
const { Panel } = Collapse;

function LandingPage() {
  return (
    <div style={{ width: '100%' }}>
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
            <div
              className="chart"
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                justifyContent: 'space-around',
                alignItems: 'center',
              }}
            >
              <Progress
                type="circle"
                percent={30}
                width={80}
                strokeWidth={10}
              />
              <Progress
                type="circle"
                percent={70}
                width={80}
                strokeWidth={10}
                status="exception"
              />
              <Progress
                type="circle"
                percent={100}
                width={80}
                strokeWidth={10}
              />
            </div>
          </Col>
          <Col lg={8} xs={23}>
            <div className="chart">
              <Line data={chartData} legend={legend} options={options} />
            </div>
          </Col>

          <Col lg={8} xs={23}>
            <div className="chart">
              <Progress percent={30} />
              <Progress percent={50} status="active" />
              <Progress percent={70} status="exception" />
              <Progress percent={100} />
            </div>
          </Col>

          <Col lg={24} xs={24}>
            <Collapse defaultActiveKey={['1']}>
              <Panel header="본사" key="1">
                <Row gutter={[16, 16]}>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine1</h2>
                      <Doughnut data={data[0]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine2</h2>
                      <Doughnut data={data[1]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine3</h2>
                      <Doughnut data={data[2]} />
                    </div>
                  </Col>

                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine4</h2>
                      <Doughnut data={data[3]} />
                    </div>
                  </Col>
                </Row>
              </Panel>

              <Panel header="site2" key="2">
                <Row gutter={[16, 16]}>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine1</h2>
                      <Doughnut data={data[2]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine2</h2>
                      <Doughnut data={data[1]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine3</h2>
                      <Doughnut data={data[0]} />
                    </div>
                  </Col>
                </Row>
              </Panel>
              <Panel header="site3" key="3">
                <Row gutter={[16, 16]}>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine1</h2>
                      <Doughnut data={data[3]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine2</h2>
                      <Doughnut data={data[0]} />
                    </div>
                  </Col>
                </Row>
              </Panel>
              <Panel header="s44" key="4">
                <Row gutter={[16, 16]}>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine1</h2>
                      <Doughnut data={data[1]} />
                    </div>
                  </Col>
                  <Col xl={6} lg={12} md={23} xs={23}>
                    <div className="chart">
                      <h2>Engine2</h2>
                      <Doughnut data={data[2]} />
                    </div>
                  </Col>
                </Row>
              </Panel>
            </Collapse>
          </Col>
        </Row>
      </Content>
    </div>
  );
}

export default LandingPage;
