import React, { useState } from 'react';
import { Layout, Breadcrumb, Table, Button, Tabs, Radio } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// const { SubMenu } = Menu;
const { Content } = Layout;
const { TabPane } = Tabs;
const data = [
  {
    key: '1',
    name: 'a',
    chinese: 98,
    math: 60,
    english: 70,
  },
  {
    key: '2',
    name: 'ac',
    chinese: 98,
    math: 66,
    english: 89,
  },
  {
    key: '3',
    name: 'ab',
    chinese: 98,
    math: 90,
    english: 70,
  },
  {
    key: '4',
    name: 'd',
    chinese: 88,
    math: 99,
    english: 89,
  },
];

function SitePartsListPage(props) {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [value, setValue] = useState(1);
  const { user } = props;
  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };
  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 1,
      },
      width: 100,
    },
    {
      title: 'Engine',
      dataIndex: 'chinese',
      sorter: {
        compare: (a, b) => a.chinese - b.chinese,
        multiple: 2,
      },
      width: 200,
    },
    {
      title: 'Description',
      dataIndex: 'math',
      sorter: {
        compare: (a, b) => a.math - b.math,
        multiple: 3,
      },
    },
    {
      title: '예상 수명',
      dataIndex: 'english',
      sorter: {
        compare: (a, b) => a.english - b.english,
        multiple: 4,
      },
      width: 200,
    },
  ];

  if (!user?.userData?.isAuth) return null;

  const rowSelection = {
    selectedRowKey,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <Breadcrumb style={{ margin: '16px 0' }}>
          <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
          <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
          <Breadcrumb.Item>사이트별 목록 관리</Breadcrumb.Item>
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
          <Tabs
            defaultActiveKey="1"
            size="large"
            style={{ background: 'white', padding: '0 20px 10px 20px' }}
          >
            <TabPane tab="Site-1" key="1">
              <div style={{ float: 'left' }}>
                <Radio.Group onChange={onChange} value={value} defaultValue={1}>
                  <Radio value={1}>부품</Radio>
                  <Radio value={2}>자재</Radio>
                </Radio.Group>
              </div>
              <div style={{ float: 'right' }}>
                <Button>추가</Button>
                <Button>삭제</Button>
                <br />
                <br />
              </div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </TabPane>
            <TabPane tab="Site-2" key="2" />
            <TabPane tab="Site-3" key="3" />
            <TabPane tab="Site-4" key="4" />
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

SitePartsListPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default SitePartsListPage;
