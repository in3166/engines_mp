import React, { useState } from 'react';
import { Input, Button, Space } from 'antd';
import Highlighter from 'react-highlight-words';
import { SearchOutlined } from '@ant-design/icons';

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

  const filterDropdown = ({
    setSelectedKeys,
    selectedKeys,
    confirm,
    clearFilters,
  }) => {
    return (
      <div style={{ padding: 8 }}>
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
    );
  };

  const filterIcon = filtered => (
    <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />
  );

  const onFilter = (value, record) => {
    return record[dataIndex]
      ? record[dataIndex]
          .toString()
          .toLowerCase()
          .includes(value.toString().toLowerCase())
      : '';
  };

  const render = text =>
    searchedColumn === dataIndex ? (
      <Highlighter
        highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
        searchWords={[searchText]}
        autoEscape
        textToHighlight={text.toString() || ''}
      />
    ) : (
      text
    );
  return { filterIcon, filterDropdown, onFilter, render };
}

export default ColumnSearch;
