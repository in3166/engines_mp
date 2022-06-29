import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
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

import columns from './data/columns';
import {
  getAllDepartments,
  deleteDepartment,
} from '../../../../_actions/department_actions';
import DepartmentAddModal from './Sections/DepartmentAddModal';
import DepartmentUpdateModal from './Sections/DepartmentUpdateModal';

function DepartmentManagePage() {
  const dispatch = useDispatch();
  const [Departments, setDepartments] = useState([]);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [ShowAddModal, setShowAddModal] = useState(false);
  const [ShowUpdateModal, setShowUpdateModal] = useState(false);
  const [SelectedDepartment, setSelectedDepartment] = useState({});

  const getDepartments = () => {
    setLoading(true);
    dispatch(getAllDepartments())
      .then(res => {
        if (res.payload.success) {
          setDepartments(res.payload.departments);
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
  useMountEffect(getDepartments);

  const onClickUpdate = depart => {
    setSelectedDepartment(depart);
    setShowUpdateModal(true);
  };

  const deleteConfirm = depart => {
    let body;
    if (depart) {
      body = {
        _id: depart,
      };
    } else {
      const selID = selectedRowKeys.map(v => v._id);
      body = {
        _id: selID,
      };
    }
    dispatch(deleteDepartment(body))
      .then(res => {
        const oktem = [];
        const failtem = [];

        if (res.payload.success) {
          res.payload.ok.forEach(v => {
            Departments.forEach(e => {
              if (e._id === v) oktem.push(e.id);
            });
          });
          message.success('부서를 삭제했습니다.');
          message.success(`[성공]: ${oktem}`);
          if (res.payload.fail.length !== 0) {
            res.payload.fail.forEach(v => {
              Departments.forEach(e => {
                if (e._id === v) failtem.push(e.name);
              });
            });

            message.warning('사용자 필드가 참조하고 있습니다.');
            message.warning(`[실패]: ${failtem}`);
          }
        } else {
          message.error('부서 삭제 실패: 사용자 필드가 참조하고 있습니다.');
        }
      })
      .catch(err => {
        message.error(`[Error]: `, err);
      })
      .finally(() => {
        getDepartments();
      });
  };

  const col2 = [
    {
      title: '수정',
      dataIndex: 'update',
      key: '4',
      render: (r, departUp) => {
        return (
          <Space size="middle">
            <Button onClick={() => onClickUpdate(departUp)}>
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
      render: (r, departDel) => {
        return (
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm={() => deleteConfirm([departDel._id])}
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
        <Breadcrumb.Item>사용자 관리</Breadcrumb.Item>
        <Breadcrumb.Item>부서 관리</Breadcrumb.Item>
      </Breadcrumb>
      <Spin spinning={Loading}>
        <div style={{ backgroundColor: 'white', padding: 20 }}>
          <div style={{ float: 'left', paddingLeft: '7px' }}>
            <h3>
              <strong>부서 목록</strong>
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
              <Button onClick={getDepartments}>
                <ReloadOutlined />
              </Button>
            </Space>
            <DepartmentAddModal
              getDepartments={getDepartments}
              ShowAddModal={ShowAddModal}
              setShowAddModal={setShowAddModal}
            />
            <DepartmentUpdateModal
              getDepartments={getDepartments}
              ShowUpdateModal={ShowUpdateModal}
              setShowUpdateModal={setShowUpdateModal}
              Department={SelectedDepartment}
            />
            <br />
            <br />
          </div>

          <Table
            style={{ overflow: 'auto' }}
            rowSelection={rowSelection}
            columns={col}
            dataSource={Departments}
            tableLayout="auto"
            rowKey="_id"
          />
        </div>
      </Spin>
    </>
  );
}

export default DepartmentManagePage;
