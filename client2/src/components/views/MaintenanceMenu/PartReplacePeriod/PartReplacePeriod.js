import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin } from 'antd';
import { useDispatch } from 'react-redux';
import { getAllParts } from '../../../../_actions/part_actions';
import PartTable from './Sections/PartTable';
import PartUpdateModal from './Sections/PartUpdateModal';

function PartReplacePeriod() {
  const [Parts, setParts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedPart, setselectedPart] = useState({});
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getParts = () => {
    setloading(true);
    dispatch(getAllParts())
      .then(res => {
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

  // 행에 있는 수정 버튼
  const updatePartsButton = part => {
    setselectedPart(...part);
    setshowUpdateConfirm(true);
  };

  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 주기 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품 별 교체 시기</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>부품 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
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
