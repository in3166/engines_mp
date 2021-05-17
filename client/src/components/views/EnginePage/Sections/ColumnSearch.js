import React, { useState } from 'react';
// import axios from 'axios';
// import Navbar from '../NavBar/NavBar';
// //import Footer from '../Footer/Footer';
// import SideBar from '../SideBar/SideBar';
// import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
// import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
// const { SubMenu } = Menu;
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

function ColumnSearch(dataIndex) {
  const [searchText, setsearchText] = useState('');
  const [searchedColumn, setsearchedColumn] = useState('');
  const [, setsearchInput] = useState({});

  const handleSearch = (selectedKeys, confirm, data) => {
    confirm();
    setsearchText(selectedKeys[0]);
    setsearchedColumn(data);
  };

  const handleReset = clearFilters => {
    clearFilters();
    setsearchText('');
  };

  return {
    filterDropdown: (setSelectedKeys, selectedKeys, confirm, clearFilters) => (
      <div style={{ padding: 8 }}>
        {console.log(setSelectedKeys, selectedKeys)}
        <Input
          ref={node => {
            setsearchInput(node);
          }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
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
    ),
    filterIcon: filtered => (
      <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
    ),

    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex]
            .toString()
            .toLowerCase()
            .includes(value.toLowerCase())
        : '',
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text || ''}
        />
      ) : (
        text
      ),
  };
}

ColumnSearch.propTypes = {
  filterDropdown: PropTypes.shape({
    selectedKeys: PropTypes.arrayOf(PropTypes.object).isRequired,
    confirm: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }).isRequired,
};
ColumnSearch.propTypes = {
  filterDropdown: PropTypes.shape({
    selectedKeys: PropTypes.arrayOf(PropTypes.object).isRequired,
    confirm: PropTypes.func.isRequired,
    clearFilters: PropTypes.func.isRequired,
  }).isRequired,
};

export default ColumnSearch;
