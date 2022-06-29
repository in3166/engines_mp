import React, { useState } from 'react';
import { Table, Button, Divider, Spin, message, Popconfirm, Space } from 'antd';
import PropTypes from 'prop-types';
import {
  PlusOutlined,
  EditOutlined,
  DeleteFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';
import axios from 'axios';

import columns from '../data/columns';
import SiteDescription from '../../../../utils/SiteDescription/SiteDescription';
import BranchAddPartModal from './BranchAddPartModal';
import BranchUpdatePartModal from './BranchUpdatePartModal';
import '../../formStyle.css';

function BranchTabContent(props) {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  const { Sites, Parts, reload } = props;

  const rowSelection = {
    ...selectedRowKey?.part?._id,
    onChange: (selectedRowKeys, site) => {
      setselectedRowKeys(site);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  const onclickUpdate = () => {
    if (selectedRowKey.length === 1) {
      setshowUpdateConfirm(true);
    } else {
      message.error('한 개의 부품을 선택하세요.');
    }
  };

  const onDeleteConfirm = () => {
    if (selectedRowKey.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      const parts = selectedRowKey.map(e => {
        /* eslint no-underscore-dangle: 0 */
        return e.part._id;
      });

      const body = {
        id: Sites.id,
        parts,
      };
      axios
        .post('/api/sites/deleteSitePart', body)
        .then(res => {
          if (res.data.success) {
            message.success('부품을 삭제하였습니다.');
          }
        })
        .catch(err => message.error(err))
        .finally(reload());
    }
  };
  return (
    <div style={{ padding: 20, backgroundColor: 'white' }}>
      <SiteDescription site={Sites} />
      <Divider plain>
        <strong>Stock</strong>
      </Divider>

      <div style={{ float: 'right' }}>
        <Space>
          <Button onClick={() => setshowAddConfirm(true)}>
            <PlusOutlined />
          </Button>

          <Button onClick={onclickUpdate}>
            <EditOutlined />
          </Button>

          <BranchAddPartModal
            showAddConfirm={showAddConfirm}
            setshowAddConfirm={setshowAddConfirm}
            Sites={Sites}
            reload={reload}
          />

          {showUpdateConfirm && (
            <BranchUpdatePartModal
              showUpdateConfirm={showUpdateConfirm}
              setshowUpdateConfirm={setshowUpdateConfirm}
              Sites={Sites}
              reload={reload}
              selectedRowKey={selectedRowKey}
            />
          )}

          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={onDeleteConfirm}
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
      </div>
      <br />
      <br />
      <Spin spinning={false}>
        <Table
          showSorterTooltip={false}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={Parts}
          rowKey={a => a.part.name}
          style={{ overflow: 'auto' }}
          scroll
        />
      </Spin>
    </div>
  );
}

export default BranchTabContent;

BranchTabContent.propTypes = {
  Sites: PropTypes.objectOf(PropTypes.any).isRequired,
  Parts: PropTypes.arrayOf(PropTypes.any).isRequired,
  reload: PropTypes.func.isRequired,
};
