import React from 'react';
// import axios from 'axios';
// import Navbar from '../NavBar/NavBar';
// //import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import { Table, Layout, Breadcrumb } from 'antd';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
// import Highlighter from 'react-highlight-words';
// import { SearchOutlined } from '@ant-design/icons';
import ColumnSearch from './Sections/ColumnSearch';
import datas from './Sections/datas';

const { Content } = Layout;

function EnginePage(props) {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      ...ColumnSearch('name'),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      ...ColumnSearch('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      ...ColumnSearch('address'),
    },
  ];

  const { user } = props;
  if (!user?.userData?.isAuth) {
    return null;
  }

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
          <Table columns={columns} dataSource={datas.data} />
        </Content>
      </Layout>
    </div>
  );
}

EnginePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default EnginePage;
