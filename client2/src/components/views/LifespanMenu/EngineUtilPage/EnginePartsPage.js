import React, { useState } from 'react';
import { Layout, Breadcrumb, Table, Button, Tabs } from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import Engine1List from './Sections/Engine1List';
import { datas1 as data } from './Sections/datas';
// const { SubMenu } = Menu;
const { Content } = Layout;
const { TabPane } = Tabs;

function UnitListPage(props) {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const { user } = props;
  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
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
      title: '이름',
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
      title: '필요 수량',
      dataIndex: 'qu',
      sorter: {
        compare: (a, b) => a.qu - b.qu,
        multiple: 4,
      },
      width: 200,
    },
    {
      title: '예상 수명',
      dataIndex: 'lifespan',
      sorter: {
        compare: (a, b) => a.lifespan - b.lifespan,
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
          <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
          <Breadcrumb.Item>엔진별 부품 목록</Breadcrumb.Item>
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
            <TabPane tab="Engine-1" key="1">
              <Engine1List />
            </TabPane>
            <TabPane tab="Engine-2" key="2">
              <div style={{ float: 'right' }}>
                <Button>추가</Button>
                <Button>수정</Button>
                <Button>삭제</Button>
                <br />
                <br />
              </div>
              <Table
                size="small"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </TabPane>
            <TabPane tab="Engine-3" key="3">
              <Table
                size="small"
                rowSelection={rowSelection}
                columns={columns}
                dataSource={data}
              />
            </TabPane>
          </Tabs>
        </Content>
      </Layout>
    </div>
  );
}

UnitListPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UnitListPage;
