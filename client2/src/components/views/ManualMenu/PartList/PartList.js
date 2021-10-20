import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space } from 'antd';
import PropTypes from 'prop-types';
// import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';
import PartDeleteModal from './Sections/PartDeleteModal';
import PartUpdateModal from './Sections/PartUpdateModal';
import PartAddModal from './Sections/PartAddModal';
import TableButtons from '../../../utils/TableButtons/TableButtons';

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

  // 행에 있는 수정 버튼
  const updatePartsButton = part => {
    setselectedPart(...part);
    setshowUpdateConfirm(true);
  };

  if (!user?.userData?.isAuth) return null;

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
            <TableButtons
              setShowAddModal={setshowAddConfirm}
              setShowUpdateModal={setshowUpdateConfirm}
              deleteConfirm={deletePartsButton}
              selectedRowKeys={selectedRowKeys}
              setselectedPart={setselectedPart}
            />

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
