import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Breadcrumb,
  Table,
  Button,
  Divider,
  Spin,
  message,
  Popconfirm,
  Space,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteFilled,
  QuestionCircleOutlined,
} from '@ant-design/icons';

import SiteDescription from '../../../utils/SiteDescription/SiteDescription';
import columns from './data/columns';
import PartAddModal from './Sections/PartAddModal';
import PartUpdateModal from './Sections/PartUpdateModal';
import '../formStyle.css';

function HeadquartersStocksPage() {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  const [showAddConfirm, setshowAddConfirm] = useState(false);
  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);

  const [Sites, setSites] = useState({});
  const [loading, setLoading] = useState(false);

  const reload = () => {
    setLoading(true);
    axios
      .post('/api/sites/headParts')
      .then(res => {
        if (res.data.success) {
          setSites(...res.data.sites);
        } else {
          message.error(res.data.err);
        }
      })
      .catch(err => {
        message.error(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const useMountEffect = fun => useEffect(fun, []);
  useMountEffect(reload);
  const rowSelection = {
    ...selectedRowKey._id,
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
    <>
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>부품/자재 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부품/자재 재고 관리</Breadcrumb.Item>
        <Breadcrumb.Item>본사 재고 목록</Breadcrumb.Item>
      </Breadcrumb>
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

            <PartAddModal
              showAddConfirm={showAddConfirm}
              setshowAddConfirm={setshowAddConfirm}
              Sites={Sites}
              reload={reload}
            />

            <Button onClick={onclickUpdate}>
              <EditOutlined />
            </Button>
            {showUpdateConfirm && (
              <PartUpdateModal
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
        <Spin spinning={loading}>
          <Table
            showSorterTooltip={false}
            rowSelection={rowSelection}
            columns={columns}
            dataSource={Sites.partStock}
            rowKey={a => a.part.name}
            style={{ overflow: 'auto' }}
            scroll
          />
        </Spin>
      </div>
    </>
  );
}

export default HeadquartersStocksPage;
