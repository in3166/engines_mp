import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, message } from 'antd';
import PropTypes from 'prop-types';
import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';
import PartDeleteModal from './Sections/PartDeleteModal';

function PartList(props) {
  const { user } = props;

  const [Parts, setParts] = useState([]);
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const dispatch = useDispatch();

  console.log(Parts);

  const getParts = () => {
    dispatch(getAllParts())
      .then(res => {
        console.log(res);
        if (res.payload.success) {
          setParts(res.payload.parts);
        } else {
          message.error(res.payload.err);
        }
      })
      .catch(err => {
        message.error(err);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };

  useMountEffect(getParts);

  const deleteUsersButton = () => {
    if (selectedRowKey.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      setshowDeleteConfirm(true);
    }
  };

  if (!user?.userData?.isAuth) return null;

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>지사 재고 목록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'right' }}>
          <Button>
            <PlusOutlined />
          </Button>
          <Button>
            <EditOutlined />
          </Button>
          <Button onClick={deleteUsersButton}>
            <DeleteFilled />
          </Button>
          <PartDeleteModal
            showDeleteConfirm={showDeleteConfirm}
            setshowDeleteConfirm={setshowDeleteConfirm}
            selectedRowKey={selectedRowKey}
            setselectedRowKeys={setselectedRowKeys}
            getParts={getParts}
          />
          <br />
          <br />
        </div>
        <PartTable
          Parts={Parts}
          selectedRowKey={selectedRowKey}
          setselectedRowKeys={setselectedRowKeys}
        />
      </div>
    </>
  );
}

export default PartList;

PartList.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
