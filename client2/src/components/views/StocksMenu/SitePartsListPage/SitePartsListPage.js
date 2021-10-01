import React, { useState } from 'react';
import { Layout, Breadcrumb, Table, Button, Tabs, Radio } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';

// const { SubMenu } = Menu;
const { Content } = Layout;
const { TabPane } = Tabs;
const data = [
  {
    key: 1,
    id: 'p113',
    name: 'Part1',
    desc: '부품 설명1',
    en: 'engine1',
  },
  {
    key: 2,
    id: 'p213',
    name: 'Part2',
    desc: '부품 설명2',
    en: 'engine1',
  },
  {
    key: 3,
    id: 'p313',
    name: 'Part3',
    desc: '부품 설명3',
    en: 'engine1',
  },
  {
    key: 4,
    id: 'p413',
    name: 'Part4',
    desc: '부품 설명4',
    en: 'engine2',
  },
  {
    key: 5,
    id: 'p513',
    name: 'Part5',
    desc: '부품 설명5',
    en: 'engine2',
  },
  {
    key: 6,
    id: 'p613',
    name: 'Part6',
    desc: '부품 설명6',
    en: 'engine3',
  },
  {
    key: 7,
    id: 'p613',
    name: 'Part6',
    desc: '부품 설명6',
    en: 'engine3',
  },
  {
    key: 8,
    id: 'p613',
    name: 'Part6',
    desc: '부품 설명6',
    en: 'engine3',
  },
  {
    key: 9,
    id: 'p613',
    name: 'Part6',
    desc: '부품 설명6',
    en: 'engine3',
  },
  {
    key: 10,
    id: 'p613',
    name: 'Part6',
    desc: '부품 설명6',
    en: 'engine3',
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
      title: 'ID',
      dataIndex: 'id',
      sorter: {
        compare: (a, b) => a.id.localeCompare(b.id),
        multiple: 1,
      },
      width: 100,
    },
    {
      title: '부품 이름',
      dataIndex: 'name',
      sorter: {
        compare: (a, b) => a.name.localeCompare(b.name),
        multiple: 2,
      },
      width: 200,
    },
    {
      title: '설명',
      dataIndex: 'desc',
      sorter: {
        compare: (a, b) => a.desc.localeCompare(b.desc),
        multiple: 3,
      },
    },
    {
      title: '엔진',
      dataIndex: 'en',
      sorter: {
        compare: (a, b) => a.en.localeCompare(b.en),
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
                <Button>수정</Button>
                <Button>삭제</Button>
                <br />
                <br />
              </div>
              <Table
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
                pagination={{ pageSize: 5 }}
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
