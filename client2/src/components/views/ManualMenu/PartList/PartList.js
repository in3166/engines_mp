import React, { useState } from 'react';
import { Breadcrumb, Table, Button, Radio, Popconfirm } from 'antd';
import PropTypes from 'prop-types';
import {
  DeleteFilled,
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import columns from './data/columns';

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

function PartList(props) {
  const { user } = props;
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [value, setValue] = useState(1);

  if (!user?.userData?.isAuth) return null;

  const onSelectChange = selectedRowKeys => {
    // console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const onChange = e => {
    console.log('radio checked', e.target.value);
    setValue(e.target.value);
  };

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
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>지사 재고 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div>
          <Radio.Group onChange={onChange} value={value} defaultValue={1}>
            <Radio value={1}>부품</Radio>
            <Radio value={2}>자재</Radio>
          </Radio.Group>
        </div>
        <div style={{ float: 'right' }}>
          <Button>
            <PlusOutlined />
          </Button>
          <Button>
            <EditOutlined />
          </Button>
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
          <br />
          <br />
        </div>
        <Table
          rowSelection={rowSelection}
          columns={columns}
          dataSource={data}
        />
      </div>
    </>
  );
}

export default PartList;

PartList.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
