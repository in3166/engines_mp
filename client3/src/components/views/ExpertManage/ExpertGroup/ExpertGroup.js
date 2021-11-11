import React, { useEffect, useState } from 'react';
import {
  Table,
  Space,
  Button,
  message,
  Popconfirm,
  Spin,
  Breadcrumb,
} from 'antd';
import {
  PlusOutlined,
  DeleteFilled,
  EditOutlined,
  QuestionCircleOutlined,
  ReloadOutlined,
} from '@ant-design/icons';
// import axios from 'axios';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import columns from './data/columns';
import {
  getAllExperts,
  deleteExpert,
} from '../../../../_actions/expert_actions';
import ExpertGroupAddModal from './Sections/ExpertGroupAddModal';
import ExpertGroupUpdateModal from './Sections/ExpertGroupUpdateModal';

function ExpertGroup(props) {
  const dispatch = useDispatch();
  const { user } = props;
  const [Experts, setExperts] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedExpert, setSelectedExpert] = useState({});
  console.log(user);
  // console.log(Experts);
  console.log('selectedRowKeys; ', ...selectedRowKeys);

  const getExperts = () => {
    setLoading(true);
    dispatch(getAllExperts())
      .then(res => {
        if (res.payload.success) {
          setExperts(res.payload.experts);
        } else {
          message.error(`[Error]: ${res.payload.err}`);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      })
      .finally(() => {
        setTimeout(() => {
          setLoading(false);
        }, 200);
      });
  };

  const useMountEffect = fun => {
    useEffect(fun, []);
  };
  useMountEffect(getExperts);

  const onClickUpdate = expertGroup => {
    console.log('expertGroup up: ', expertGroup);
    setSelectedExpert(expertGroup);
    setShowUpdateModal(true);
  };

  const deleteConfirm = expertGroup => {
    console.log('expertGroup del: ', expertGroup);
    let body;
    if (expertGroup) {
      body = {
        name: expertGroup,
      };
    } else {
      const name = selectedRowKeys.map(v => v.name);
      body = {
        name,
      };
    }
    console.log('body: ', body);
    dispatch(deleteExpert(body))
      .then(res => {
        if (res.payload.success) {
          message.success('전문가 그룹을 삭제했습니다.');
          message.success(`[성공]: ${res.payload.ok}`);
          console.log('성공: ', res.payload.ok);
          if (res.payload.fail.length !== 0) {
            message.warning('사용자 필드가 참조하고 있습니다.');
            message.warning(`[실패]: ${res.payload.fail}`);
          }
        } else {
          message.error(
            '전문가 그룹 삭제 실패: 사용자 필드가 참조하고 있습니다.',
          );
        }
      })
      .catch(err => {
        message.error(`[Error]: `, err);
      })
      .finally(() => {
        getExperts();
      });
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: '4',
      render: (r, expertGroupUp) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(expertGroupUp)}>
              <EditOutlined />
            </Button>
          </Space>
        );
      },
      width: 50,
      align: 'center',
    },
    {
      title: '삭제',
      key: '5',
      render: (r, expertGroupDel) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm([expertGroupDel.name])}
              okText="Yes"
              cancelText="No"
              icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
            >
              <Button>
                <DeleteFilled />
              </Button>
            </Popconfirm>
          </Space>
        );
      },
      width: 50,
      align: 'center',
      responsive: ['sm'],
    },
  ];
  const col = [...columns, ...col2];

  const rowSelection = {
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      setselectedRowKeys(sel2);
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
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 관리</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 그룹</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>전문가 그룹 목록</strong>
            </h3>
          </div>
          <div style={{ float: 'right' }}>
            <Space>
              <Button onClick={() => setShowAddModal(true)}>
                <PlusOutlined />
              </Button>
              <Space size="middle">
                <Popconfirm
                  placement="leftBottom"
                  title="정말로 삭제하시겠습니까?"
                  onConfirm={() => deleteConfirm()}
                  okText="Yes"
                  cancelText="No"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                >
                  <Button>
                    <DeleteFilled />
                  </Button>
                </Popconfirm>
              </Space>
              <Button onClick={getExperts}>
                <ReloadOutlined />
              </Button>
            </Space>
            <ExpertGroupAddModal
              getExperts={getExperts}
              ShowAddModal={ShowAddModal}
              setShowAddModal={setShowAddModal}
            />
            <ExpertGroupUpdateModal
              getExperts={getExperts}
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              Expert={SelectedExpert}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={Experts}
            tableLayout="auto"
            rowKey="_id"
          />
        </div>
      </Spin>
    </>
  );
}

export default ExpertGroup;

ExpertGroup.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};
