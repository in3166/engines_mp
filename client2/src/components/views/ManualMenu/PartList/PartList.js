import React, { useState, useEffect } from 'react';
import { Breadcrumb, Button, message, Spin } from 'antd';
import PropTypes from 'prop-types';
import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';
import PartDeleteModal from './Sections/PartDeleteModal';
import PartUpdateModal from './Sections/PartUpdateModal';
import PartAddModal from './Sections/PartAddModal';

function PartList(props) {
  const { user } = props;

  const [Parts, setParts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedPart, setselectedPart] = useState({});
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
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

  const deletePartsButton = () => {
    if (selectedRowKeys.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      setshowDeleteConfirm(true);
    }
  };

  const updatePartsButton = (part, one) => {
    if (selectedRowKeys.length === 1) {
      part.forEach((e, i) => {
        /* eslint no-underscore-dangle: 0 */
        if (e._id === selectedRowKeys[0]) setselectedPart(part[i]);
      });
      setshowUpdateConfirm(true);
    } else if (one) {
      // 행에 있는 수정 버튼
      setselectedPart(...part);
      setshowUpdateConfirm(true);
    } else {
      message.error('부품 한 개를 선택하세요.');
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
          <Button onClick={() => setshowAddConfirm(true)}>
            <PlusOutlined />
          </Button>
          <Button onClick={() => updatePartsButton(Parts)}>
            <EditOutlined />
          </Button>

          <Button onClick={deletePartsButton}>
            <DeleteFilled />
          </Button>
          <PartAddModal
            showAddConfirm={showAddConfirm}
            setshowAddConfirm={setshowAddConfirm}
            getParts={getParts}
          />
          {selectedPart && (
            <PartUpdateModal
              showUpdateConfirm={showUpdateConfirm}
              setshowUpdateConfirm={setshowUpdateConfirm}
              selectedPart={selectedPart}
              getParts={getParts}
            />
          )}
          <PartDeleteModal
            showDeleteConfirm={showDeleteConfirm}
            setshowDeleteConfirm={setshowDeleteConfirm}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getParts={getParts}
          />
        </div>
        <br />
        <br />

        <Spin spinning={loading}>
          <PartTable
            Parts={Parts}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getParts={getParts}
            updatePartsButton={updatePartsButton}
          />
        </Spin>
      </div>
    </>
  );
}

export default PartList;

PartList.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
