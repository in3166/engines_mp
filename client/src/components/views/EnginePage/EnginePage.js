import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from '../NavBar/NavBar';
// //import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import { Table, Layout, Breadcrumb, Input, Button, Space } from 'antd';

import { Line } from 'react-chartjs-2';
import PropTypes from 'prop-types';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

const { Content } = Layout;

const chartData = {
  labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  datasets: [
    {
      label: 'First dataset',
      data: [33, 53, 85, 41, 44, 65, 70, 55],
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

const data = [
  {
    key: '1',
    name: 'John Brown',
    age: 32,
    address: 'New York No. 1 Lake Park',
  },
  {
    key: '2',
    name: 'Joe Black',
    age: 42,
    address: 'London No. 1 Lake Park',
  },
  {
    key: '3',
    name: 'Jim Green',
    age: 32,
    address: 'Sidney No. 1 Lake Park',
  },
  {
    key: '4',
    name: 'Jim Red',
    age: 32,
    address: 'London No. 2 Lake Park',
  },
];

function EnginePage(props) {
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setsearchedColumn] = useState('');
  const [, setsearchInput] = useState({});

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(dataIndex);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('');
  };

  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => {
    return (
      <div style={{ padding: 8 }}>
        {console.log(setSelectedKeys, selectedKeys)}
        <Input
          ref={node => {
            setsearchInput(node);
          }}
          placeholder="Search name"
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, 'name')}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, 'name')}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button
            onClick={() => handleReset(clearFilters)}
            size="small"
            style={{ width: 90 }}
          >
            Reset
          </Button>
        </Space>
      </div>
    );
  };

  //   getColumnSearchProps.filterDropdown.propTypes = {
  //     confirm: PropTypes.elementType.isRequired,
  //     selectedKeys: PropTypes.elementType.isRequired,
  //     clearFilters: PropTypes.elementType.isRequired,
  //     setSelectedKeys: PropTypes.elementType.isRequired,
  //   };

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      width: '30%',
      filterDropdown,
      filterIcon: filtered => (
        <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
      ),
      onFilter: (value, record) =>
        record.name
          ? record.name.toString().toLowerCase().includes(value.toLowerCase())
          : '',
      render: text =>
        searchedColumn === 'name' ? (
          <Highlighter
            highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
            searchWords={[searchText]}
            autoEscape
            textToHighlight={text || ''}
          />
        ) : (
          text
        ),
    },
    {
      title: 'Age',
      dataIndex: 'age',
      key: 'age',
      width: '20%',
      // ...ColumnSearch('age'),
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      // ...ColumnSearch('address'),
    },
  ];

  const { user } = props;
  if (!user) {
    return null;
  }
  // const { isAuth } = user?.userData?.isAuth;

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
            height: '100%',
            border: '1px solid',
          }}
        >
          <div className="chart">
            <Line data={chartData} legend={legend} options={options} />
          </div>
          <br />
          <hr />
          <br />
          <Table columns={columns} dataSource={data} />
        </Content>
        {/* <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer> */}
      </Layout>
    </div>
  );
}

EnginePage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

// EnginePage.getColumnSearchProps.propTypes = {
//   filterDropdown: PropTypes.shape({
//     confirm: PropTypes.elementType.isRequired,
//     selectedKeys: PropTypes.elementType.isRequired,
//     setSelectedKeys: PropTypes.elementType.isRequired,
//   }).isRequired,
// };

export default EnginePage;
