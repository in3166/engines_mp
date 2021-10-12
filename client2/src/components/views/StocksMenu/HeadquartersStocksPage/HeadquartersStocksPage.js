import React, { useState, useEffect } from 'react';
import { Breadcrumb, Table, Button, Divider, Spin, message } from 'antd';
import PropTypes from 'prop-types';
import { PlusOutlined, EditOutlined, DeleteFilled } from '@ant-design/icons';
import axios from 'axios';
import SiteDescription from '../../../utils/SiteDescription/SiteDescription';
import columns from './data/columns';
import PartAddModal from './Sections/PartAddModal';
import '../formStyle.css';

function HeadquartersStocksPage(props) {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  // const [value, setValue] = useState(1);
  const { user } = props;
  const [Sites, setSites] = useState({});
  const [loading, setLoading] = useState(false);

  const onSelectChange = selectedRowKeys => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    setselectedRowKeys(selectedRowKeys);
  };

  const reload = () => {
    setLoading(true);
    axios
      .post('/api/sites/headParts')
      .then(res => {
        if (res.data.success) {
          // console.log(res.data.sites);
          setSites(...res.data.sites);
        } else {
          message.error(res.data.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(reload);

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
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>본사 재고 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        {/* <div>
          <Radio.Group onChange={onChange} value={value} defaultValue={1}>
            <Radio value={1}>부품</Radio>
            <Radio value={2}>자재</Radio>
          </Radio.Group>
        </div> */}

        <SiteDescription site={Sites} />
        <Divider plain>
          <strong>Stock</strong>
        </Divider>

        <div style={{ float: 'right' }}>
          <Button onClick={() => setshowAddConfirm(true)}>
            <PlusOutlined />
          </Button>
          <PartAddModal
            showAddConfirm={showAddConfirm}
            setshowAddConfirm={setshowAddConfirm}
          />
          <Button onClick>
            <EditOutlined />
          </Button>
          <Button onClick>
            <DeleteFilled />
          </Button>
        </div>
        <br />
        <br />
        <Spin spinning={loading}>
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={Sites.partStock}
            rowKey={a => a.part.id}
          />
        </Spin>
      </div>
    </>
  );
}

HeadquartersStocksPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default HeadquartersStocksPage;
