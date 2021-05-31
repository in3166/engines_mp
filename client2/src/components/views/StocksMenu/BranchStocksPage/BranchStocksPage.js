import React, { useState } from 'react';
import {
  Layout,
  Breadcrumb,
  Table,
  Button,
  Radio,
  Popconfirm,
  Space,
} from 'antd';
// import { SearchOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import {
  DeleteFilled,
  // EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
// const { SubMenu } = Menu;
const { Content } = Layout;

const data = [
  {
    key: '1',
    id: 'id-1',
    name: 'a',
    desc: 98,
    qu: 60,
  },
  {
    key: '2',
    id: 'id-2',
    name: 'ac',
    desc: 98,
    qu: 66,
  },
  {
    key: '3',
    id: 'id-3',
    name: 'ab',
    desc: 98,
    qu: 90,
  },
  {
    key: '4',
    id: 'id-4',
    name: 'd',
    desc: 88,
    qu: 99,
  },
];

function BranchStocksPage(props) {
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
      title: 'Name',
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
      title: '재고',
      dataIndex: 'qu',
      sorter: {
        compare: (a, b) => a.qu - b.qu,
        multiple: 4,
      },
      width: 200,
    },
    {
      title: '주문',
      key: 'action',
      render: () => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 70,
      align: 'center',
      responsive: ['sm'],
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
          <Breadcrumb.Item>지사 재고 목록</Breadcrumb.Item>
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
        </Content>
      </Layout>
    </div>
  );
}

BranchStocksPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default BranchStocksPage;
