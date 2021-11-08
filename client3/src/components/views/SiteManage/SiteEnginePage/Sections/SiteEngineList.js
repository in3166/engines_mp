import React from 'react';
import PropTypes from 'prop-types';
import { Space, Button, Popconfirm } from 'antd';
import {
  DeleteFilled,
  EditOutlined,
  PlusOutlined,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import RequriedList from './RequriedList';
import AddEngine from './AddEngine';

const SiteEngineList = props => {
  const {
    setShowAddEngine,
    ShowAddEngine,
    ShowRequiredParts,
    setShowRequiredParts,
    RequiredPartsInfo,
  } = props;
  return (
    <div style={{ float: 'right' }}>
      <Space>
        <Button onClick={() => setShowAddEngine(true)}>
          <PlusOutlined />
        </Button>
        <Button onClick>
          <EditOutlined />
        </Button>
        <Space size="middle">
          <Popconfirm
            placement="leftBottom"
            title="정말로 삭제하시겠습니까?"
            // onConfirm={() => deleteConfirm()}
            okText="Yes"
            cancelText="No"
            icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
          >
            <Button>
              <DeleteFilled />
            </Button>
          </Popconfirm>
        </Space>
        {ShowRequiredParts && (
          <RequriedList
            engines={RequiredPartsInfo}
            ShowRequiredParts={ShowRequiredParts}
            setShowRequiredParts={setShowRequiredParts}
          />
        )}
        <AddEngine
          ShowAddEngine={ShowAddEngine}
          setShowAddEngine={setShowAddEngine}
        />
      </Space>
    </div>
  );
};

SiteEngineList.propTypes = {
  setShowAddEngine: PropTypes.func.isRequired,
  ShowAddEngine: PropTypes.bool.isRequired,
  setShowRequiredParts: PropTypes.func.isRequired,
  ShowRequiredParts: PropTypes.bool.isRequired,
  RequiredPartsInfo: PropTypes.arrayOf(PropTypes.any).isRequired,
};

export default SiteEngineList;
