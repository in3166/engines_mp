import React, { useState } from 'react';
import {
  Table,
  Button,
  Spin,
  Breadcrumb,
  Space,
  Popconfirm,
  message,
} from 'antd';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import UpdateModal from './Sections/UpdateModal';
import { datas2 } from './datas/datas';
import columns from './datas/coulmns';

function LifeCodePage() {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState({});
  const [loading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  // 수정 버튼 modal 열기
  const onClickUpdate = data => {
    const tempData = { ...data };
    console.log(data);
    setModalData(tempData);
    setModalVisible(true);
  };

  const rowSelection = {
    ...selectedRowKeys.id,
    onChange: (a, record) => {
      setSelectedRowKeys(record);
    },
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
        <Breadcrumb.Item>수명 데이터 관리</Breadcrumb.Item>
        <Breadcrumb.Item>사용 연한 기초 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={loading}>
        <div style={{ padding: 20, backgroundColor: 'white' }}>
          <div style={{ float: 'left' }}>
            <h3>
              <strong>사용 연한 기초</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={onClickUpdate}>
                <PlusOutlined />
              </Button>
              <Button onClick={onClickUpdate}>
                <EditOutlined />
              </Button>
              <Space size="middle">
                <Popconfirm
                  placement="leftBottom"
                  title="정말로 삭제하시겠습니까?"
                  onConfirm={() => {
                    message.success('삭제 완료');
                  }}
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
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={datas2}
            bordered
            tableLayout="auto"
            scroll
          />
        </div>
      </Spin>

      <UpdateModal
        modalData={modalData}
        selectedRowKeys={selectedRowKeys}
        setselectedRowKeys={setSelectedRowKeys}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
      />
    </>
  );
}

export default LifeCodePage;
