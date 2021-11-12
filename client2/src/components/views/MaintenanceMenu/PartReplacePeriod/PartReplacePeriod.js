import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';
import PartUpdateModal from './Sections/PartUpdateModal';

function PartReplacePeriod(props) {
  const { user } = props;

  const [Parts, setParts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedPart, setselectedPart] = useState({});
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
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

  // 행에 있는 수정 버튼
  const updatePartsButton = part => {
    setselectedPart(...part);
    setshowUpdateConfirm(true);
  };

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
            {/* <Button onClick={() => updatePartsButton(Parts)}>
              <EditOutlined />
            </Button> */}
          </Space>
          {selectedPart && (
            <PartUpdateModal
              showUpdateConfirm={showUpdateConfirm}
              setshowUpdateConfirm={setshowUpdateConfirm}
              selectedPart={selectedPart}
              getParts={getParts}
            />
          )}
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

export default PartReplacePeriod;

PartReplacePeriod.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
