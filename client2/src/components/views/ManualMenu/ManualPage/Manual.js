import React, { useState, useEffect } from 'react';
import { Breadcrumb, message, Spin, Space, Button, Popconfirm } from 'antd';
import { useDispatch } from 'react-redux';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';
import ManualTable from './Sections/ManualTable';
import ManualUpdateModal from './Sections/ManualUpdateModal';
import ManualAddModal from './Sections/ManualAddModal';
import { getAllManuals } from '../../../../_actions/manual_actions';

function Manual() {
  const [Manuals, setManuals] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedManual, setselectedManual] = useState({});
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  const [loading, setloading] = useState(false);
  const dispatch = useDispatch();

  const getManuals = () => {
    setloading(true);
    dispatch(getAllManuals())
      .then(res => {
        if (res.payload.success) {
          setselectedRowKeys([]);
          setManuals(res.payload.manuals);
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

  // 행에 있는 수정 버튼
  const updateManualsButton = manual => {
    setselectedManual(manual);
    setshowUpdateConfirm(true);
  };
  const deleteManualsButton = manual => {
    let tmep = manual;
    if (manual.length > 0 && typeof manual[0] !== 'string') {
      tmep = tmep.map(v => v._id);
    }
    const body = {
      manual: tmep,
    };

    axios
      .post('/api/manuals/deleteManuals', body)
      .then(res => {
        if (res.data.success) {
          message.success('매뉴얼을 삭제하였습니다.');
        } else {
          message.error('매뉴얼 삭제를 실패하였습니다.');
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => getManuals());
  };
  return (
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>엔진 정비 메뉴얼</Breadcrumb.Item>
        <Breadcrumb.Item>매뉴얼 입력/수정</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ padding: 20, backgroundColor: 'white' }}>
        <div style={{ float: 'left' }}>
          <h3>
            <strong>매뉴얼 목록</strong>
          </h3>
        </div>
        <div style={{ float: 'right' }}>
          <Space>
            <Button onClick={() => setshowAddConfirm(true)}>
              <PlusOutlined />
            </Button>
            <Button onClick={() => updateManualsButton(selectedRowKeys[0])}>
              <EditOutlined />
            </Button>
            <Space size="middle">
              <Popconfirm
                placement="leftBottom"
                title="정말로 삭제하시겠습니까?"
                onConfirm={() => deleteManualsButton(selectedRowKeys)}
                okText="Yes"
                cancelText="No"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
              >
                <Button>
                  <DeleteFilled />
                </Button>
              </Popconfirm>
            </Space>
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
            deleteManualsButton={deleteManualsButton}
          />
        </Spin>
      </div>
    </>
  );
}

export default Manual;
