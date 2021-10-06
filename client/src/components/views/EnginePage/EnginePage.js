import React from 'react';
// import axios from 'axios';
// import Navbar from '../NavBar/NavBar';
// //import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import { Layout, Breadcrumb } from 'antd';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';

import datas from './Data/datas';
import columns from './Data/Columns';
import EngineTable from './Sections/EngineTable';

const { Content } = Layout;

function EnginePage(props) {
  const { user } = props;

  if (!user?.userData?.isAuth) {
    return null;
  }

  // id 열에 검색버튼

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>Home</Breadcrumb.Item>
          <Breadcrumb.Item>Engine</Breadcrumb.Item>
          <Breadcrumb.Item>Engine-1</Breadcrumb.Item>
        </Breadcrumb>
        <Content
          className="site-layout-background"
          style={{
            padding: 24,
            margin: 0,
            minHeight: 280,
            width: '98%',
            height: '100%',
            border: '1px solid',
          }}
        >
          <div className="chart">
            <Line
              data={datas.chartData}
              legend={datas.legend}
              options={datas.options}
            />
          </div>
          <br />
          <hr />
          <br />
          <EngineTable columns={columns} dataSource={datas.data} user={user} />
        </Content>
      </Layout>
    </div>
  );
}

EnginePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EnginePage;
