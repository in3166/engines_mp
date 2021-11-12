import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space } from 'antd';
import PropTypes from 'prop-types';
// import { DeleteFilled, PlusOutlined, EditOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import ManualTable from './Sections/ManualTable';
import ManualDeleteModal from './Sections/ManualDeleteModal';
import ManualUpdateModal from './Sections/ManualUpdateModal';
import ManualAddModal from './Sections/ManualAddModal';
import TableButtons from '../../../utils/TableButtons/TableButtons';
import { getAllManuals } from '../../../../_actions/manual_actions';

function Manual(props) {
  const { user } = props;

  const [Manuals, setManuals] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedManual, setselectedManual] = useState({});
  const [showDeleteConfirm, setshowDeleteConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  // console.log(Manuals);

  const getManuals = () => {
    setloading(true);
    dispatch(getAllManuals())
      .then(res => {
        // console.log('res: ', res);
        if (res.payload.success) {
          setselectedRowKeys([]);
          setManuals(res.payload.manuals);
          // console.log('set manuals: ', res.payload.manuals);
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

  const deleteManualsButton = () => {
    if (selectedRowKeys.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      setshowDeleteConfirm(true);
    }
  };

  // 행에 있는 수정 버튼
  const updateManualsButton = manual => {
    setselectedManual(...manual);
    setshowUpdateConfirm(true);
  };

  // if (!user?.userData?.isAuth) return null;
  console.log(user);
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>메뉴얼 입력/수정</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>메뉴얼 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Space>
            <TableButtons
              setShowAddModal={setshowAddConfirm}
              setShowUpdateModal={setshowUpdateConfirm}
              deleteConfirm={deleteManualsButton}
              selectedRowKeys={selectedRowKeys}
              setselectedPart={setselectedManual}
            />

            {/* <Button onClick={() => setshowAddConfirm(true)}>
              <PlusOutlined />
            </Button>
            <Button onClick={() => updateManualsButton(Manuals)}>
              <EditOutlined />
            </Button>
            <Button onClick={deleteManualsButton}>
              <DeleteFilled />
            </Button> */}
          </Space>
          <ManualAddModal
            showAddConfirm={showAddConfirm}
            setshowAddConfirm={setshowAddConfirm}
            getManuals={getManuals}
          />
          {selectedManual && (
            <ManualUpdateModal
              showUpdateConfirm={showUpdateConfirm}
              setshowUpdateConfirm={setshowUpdateConfirm}
              selectedManual={selectedManual}
              getManuals={getManuals}
            />
          )}
          <ManualDeleteModal
            showDeleteConfirm={showDeleteConfirm}
            setshowDeleteConfirm={setshowDeleteConfirm}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getManuals={getManuals}
          />
        </div>
        <br />
        <br />

        <Spin spinning={loading}>
          <ManualTable
            Manuals={Manuals}
            selectedRowKeys={selectedRowKeys}
            setselectedRowKeys={setselectedRowKeys}
            getManuals={getManuals}
            updateManualsButton={updateManualsButton}
          />
        </Spin>
      </div>
    </>
  );
}

export default Manual;

Manual.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
