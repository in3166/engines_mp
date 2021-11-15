import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space } from 'antd';
import PropTypes from 'prop-types';
// import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';

function OrderParts(props) {
  const { user } = props;

  const [Parts, setParts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  // console.log(Parts);

  const getParts = () => {
    setloading(true);
    dispatch(getAllParts())
      .then(res => {
        // console.log('res: ', res);
        if (res.payload.success) {
          setselectedRowKeys([]);
          setParts(res.payload.parts);
          // console.log('set parts: ', res.payload.parts);
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

  useMountEffect(getParts);

  // if (!user?.userData?.isAuth) return null;
  console.log(user);
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>부품 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>부품 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Space>
            {/* <Button onClick={() => setshowAddConfirm(true)}>
              <PlusOutlined />
            </Button>
            <Button onClick={() => updatePartsButton(Parts)}>
              <EditOutlined />
            </Button>
            <Button onClick={deletePartsButton}>
              <DeleteFilled />
            </Button> */}
          </Space>
        </div>
        <br />
        <br />

        <Spin spinning={loading}>
          <PartTable
            Parts={Parts}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getParts={getParts}
          />
        </Spin>
      </div>
    </>
  );
}

export default OrderParts;

OrderParts.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
