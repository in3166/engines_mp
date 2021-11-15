import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space, Button, Select } from 'antd';
import PropTypes from 'prop-types';
// import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { ReloadOutlined } from '@ant-design/icons';
import Search from 'antd/lib/input/Search';
import ManualTable from './Sections/ManualTable';
// import TableButtons from '../../../utils/TableButtons/TableButtons';
import { getAllManuals } from '../../../../_actions/manual_actions';
import DateFormat from '../../../utils/DateFormatFunc/DateFormat';

function ManualSearchModule(props) {
  const { user } = props;

  const [Manuals, setManuals] = useState([]);
  const [SearchedManuals, setSearchedManuals] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [SelectValue, setSelectValue] = useState('id');
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getManuals = () => {
    setloading(true);
    dispatch(getAllManuals())
      .then(res => {
        // console.log('res: ', res);
        if (res.payload.success) {
          setselectedRowKeys([]);
          res.payload.manuals.map(v => {
            const newManu = v;
            newManu.updatedAt = DateFormat(new Date(v.updatedAt));
            return newManu;
          });

          setManuals(res.payload.manuals);
          setSearchedManuals(res.payload.manuals);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setloading(false);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getManuals);
  // if (!user?.userData?.isAuth) return null;
  console.log(user);

  const onSearchHandler = text => {
    if (text === '') {
      setSearchedManuals(Manuals);
      return;
    }
    const searched = Manuals.filter(v => {
      return v[`${SelectValue}`]?.includes(text);
    });
    setSearchedManuals(searched);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>메뉴얼 검색 모듈</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>메뉴얼 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Space>
            <Button onClick={getManuals}>
              <ReloadOutlined />
            </Button>
          </Space>
        </div>
        <br />
        <br />
        <Search
          addonBefore={
            <Select
              style={{ width: '150px' }}
              defaultValue="id"
              onChange={v => setSelectValue(v)}
            >
              <Select.Option value="id">ID</Select.Option>
              <Select.Option value="name">name</Select.Option>
              <Select.Option value="target">엔진/부품</Select.Option>
              <Select.Option value="desc">설명</Select.Option>
            </Select>
          }
          placeholder="검색어를 입력하세요."
          allowClear
          enterButton="Search"
          size="large"
          onSearch={onSearchHandler}
        />
        <br />
        <br />
        <Spin spinning={loading}>
          <ManualTable
            Manuals={SearchedManuals}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getManuals={getManuals}
          />
        </Spin>
      </div>
    </>
  );
}

export default ManualSearchModule;

ManualSearchModule.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};