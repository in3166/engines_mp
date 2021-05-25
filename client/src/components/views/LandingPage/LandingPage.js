import React from 'react';
// import axios from 'axios';

// import Navbar from '../NavBar/NavBar';
// import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';

import { Doughnut, Line } from 'react-chartjs-2';
import { Layout, Breadcrumb, Row, Col, Progress } from 'antd';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';

// const { SubMenu } = Menu;
const { Content } = Layout;

const data = {
  labels: ['Red', 'Green', 'Yellow'],
  datasets: [
    {
      data: [300, 50, 100],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
      hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
    },
  ],
};

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65],
      fill: true,
      backgroundColor: 'rgba(75,192,192,0.2)',
      borderColor: 'rgba(75,192,192,1)',
    },
    {
      label: 'Second dataset',
      data: [33, 25, 35, 51, 54, 76],
      fill: false,
      borderColor: '#742774',
    },
  ],
};

const options = {
  responsive: true,
  maintainAspectRatio: false,
  // tooltips 사용시
  tooltips: {
    enabled: true,
    mode: 'nearest',
    position: 'average',
    intersect: false,
  },
  scales: {
    xAxes: [
      {
        //   position: "top", //default는 bottom
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Step',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          // beginAtZero: true,
          maxTicksLimit: 10, // x축에 표시할 최대 눈금 수
        },
      },
    ],
    yAxes: [
      {
        display: true,
        //   padding: 10,
        scaleLabel: {
          display: true,
          labelString: 'Coverage',
          fontFamily: 'Montserrat',
          fontColor: 'black',
        },
        ticks: {
          beginAtZero: true,
          stepSize: 20,
          min: 0,
          max: 100,
          // y축 scale 값에 % 붙이기 위해 사용
          callback(value) {
            return `${value}%`;
          },
        },
      },
    ],
  },
};

const legend = {
  display: true,
  labels: {
    fontColor: 'black',
  },
  position: 'top', // label를 넣어주지 않으면 position이 먹히지 않음
};

function LandingPage() {
  // const [getMessage, setGetMessage] = useState({})
  // const [PredictMessage, setPredictMessage] = useState({})

  // useEffect(() => {
  //     axios.get('/api/test').then(response => {
  //         console.log("test", response)
  //         setGetMessage(response)
  //     }).catch(error => {
  //         console.log(error)
  //     })

  //     axios.post('/api/predict').then(response => {
  //         console.log("predict", response)
  //         setPredictMessage(response)
  //     }).catch(error => {
  //         console.log(error)
  //     })

  // }, [])

  return (
    <div style={{ width: '100%' }}>
      {/* <div>
                {getMessage.status === 200 ?
                    <h3>{getMessage.data.message}</h3>
                    :
                    <h3>/test/LOADING</h3>}
                <hr />
                {PredictMessage.status === 200 ?
                    <h3>{PredictMessage.data.message}</h3>
                    :
                    <h3>/predict/LOADING</h3>}
            </div> */}
      {/* <Layout>
                <Navbar />
                <Layout>
                    <SideBar /> */}
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

            <Col xl={6} lg={12} md={12} xs={23}>
              <div className="chart">
                <h2>Engine1</h2>
                <Doughnut data={data} />
              </div>
            </Col>

            <Col xl={6} lg={12} md={12} xs={23}>
              <div className="chart">
                <h2>Engine2</h2>
                <Doughnut data={data} />
              </div>
            </Col>
            <Col xl={6} lg={12} md={12} xs={23}>
              <div className="chart">
                <h2>Engine3</h2>
                <Doughnut data={data} />
              </div>
            </Col>

            <Col xl={6} lg={12} md={12} xs={23}>
              <div className="chart">
                <h2>Engine4</h2>
                <Doughnut data={data} />
              </div>
            </Col>
          </Row>
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
      {/* </Layout>
            </Layout> */}
    </div>
  );
}

export default LandingPage;
