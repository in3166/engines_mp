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
import SiteDescription from '../../../../utils/SiteDescription/SiteDescription';
import columns from '../data/columns';
// import PartAddModal from './Sections/PartAddModal';
// import PartUpdateModal from './Sections/PartUpdateModal';
import '../../formStyle.css';

function BranchTabContent(props) {
  const [selectedRowKey, setselectedRowKeys] = useState([]);
  //  const [showAddConfirm, setshowAddConfirm] = useState(false);
  //  const [showUpdateConfirm, setshowUpdateConfirm] = useState(false);
  // const [value, setValue] = useState(1);
  const { Sites, Parts } = props;
  //  const [Sites, setSites] = useState({});
  console.log(Sites);
  console.log(Parts);
  const onSelectChange = (selectedRowKeys, site) => {
    setselectedRowKeys(site);
  };

  //   const reload = () => {
  //     setLoading(true);
  //     axios
  //       .post('/api/sites/headParts')
  //       .then(res => {
  //         if (res.data.success) {
  //           // console.log(res.data.sites);
  //           setSites(...res.data.sites);
  //         } else {
  //           message.error(res.data.err);
  //         }
  //       })
  //       .catch(err => {
  //         message.error(err);
  //       })
  //       .finally(() => {
  //         setLoading(false);
  //       });
  //   };

  // const onChange = e => {
  //   console.log('radio checked', e.target.value);
  //   setValue(e.target.value);
  // };

  //   const useMountEffect = fun => useEffect(fun, []);
  //   useMountEffect(reload);

  const rowSelection = {
    selectedRowKey,
    onChange: onSelectChange,
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  const onclickUpdate = () => {
    if (selectedRowKey.length === 1) {
      // setshowUpdateConfirm(true);
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
        .catch(err => message.error(err));
      // .finally(reload());
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
          <Button onClick>
            <PlusOutlined />
          </Button>

          <Button onClick={onclickUpdate}>
            <EditOutlined />
          </Button>

          {/* <PartAddModal
            showAddConfirm={showAddConfirm}
            setshowAddConfirm={setshowAddConfirm}
            Sites={Sites}
            reload={reload}
          />

          <PartUpdateModal
            showUpdateConfirm={showUpdateConfirm}
            setshowUpdateConfirm={setshowUpdateConfirm}
            Sites={Sites}
            reload={reload}
            selectedRowKey={selectedRowKey}
          /> */}

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
          rowSelection={rowSelection}
          columns={columns}
          dataSource={Parts}
          rowKey={a => a.part.id}
        />
      </Spin>
    </div>
  );
}

export default BranchTabContent;

BranchTabContent.propTypes = {
  Sites: PropTypes.objectOf(PropTypes.any).isRequired,
  Parts: PropTypes.arrayOf(PropTypes.any).isRequired,
};
