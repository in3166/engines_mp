import React, { useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
// import {
//   PlusOutlined,
//   DeleteFilled,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';
import TableButtons from '../../../../../utils/TableButtons/TableButtons';
import PartAddModal from './RequiredPartAddModal';
import PartUpdateModal from './RequiredPartUpdateModal';

const { Column } = Table;
function RequiredPartsModal(props) {
  const { ShowPartsModal, setShowPartsModal, PartsInfo, getEngines } = props;
  const [ShowPartAdd, setShowPartAdd] = useState(false);
  const [ShowPartUpdate, setShowPartUpdate] = useState(false);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedPart, setselectedPart] = useState([]);

  const newParts = PartsInfo.requiredParts.map((a, i) => {
    const temp = a.part;
    temp.requiredNumber = a.requiredNumber;
    temp.key = i;

    return a.part;
  });

  const rowSelection = {
    /* eslint no-underscore-dangle: 0 */
    ...selectedRowKeys._id,
    onChange: (selectedRowKey, sel2) => {
      console.log(sel2);
      // setselKey(selectedRowKey);
      setselectedRowKeys(sel2);
    },
    selections: [
      Table.SELECTION_ALL,
      Table.SELECTION_NONE,
      Table.SELECTION_INVERT,
    ],
  };

  const deleteConfirm = () => {
    if (selectedRowKeys.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      console.log(selectedRowKeys);
      getEngines();
    }
  };

  return (
    <Modal
      title={`${PartsInfo.name} 구성 부품`}
      width="90%"
      visible={ShowPartsModal}
      onCancel={() => setShowPartsModal(false)}
      footer={[
        <Button key="back" onClick={() => setShowPartsModal(false)}>
          OK
        </Button>,
      ]}
    >
      <TableButtons
        setShowAddModal={setShowPartAdd}
        setShowUpdateModal={setShowPartUpdate}
        deleteConfirm={deleteConfirm}
        selectedRowKeys={selectedRowKeys}
        setselectedPart={setselectedPart}
      />
      {/* <div style={{ float: 'right' }}>
        <Space>
          <Button onClick={() => setShowPartAdd(true)}>
            <PlusOutlined />
          </Button>
          <Space size="middle">
            <Popconfirm
              placement="leftBottom"
              title="정말로 삭제하시겠습니까?"
              onConfirm //= {() => deleteConfirm(part._id)}
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
      </div> */}

      <PartAddModal
        setShowPartAdd={setShowPartAdd}
        ShowPartAdd={ShowPartAdd}
        getEngines={getEngines}
        PartsInfo={PartsInfo}
      />

      <PartUpdateModal
        setShowPartUpdate={setShowPartUpdate}
        ShowPartUpdate={ShowPartUpdate}
        selectedRowKeys={selectedRowKeys}
        selectedPart={selectedPart}
        getEngines={getEngines}
      />

      <br />
      <br />
      <Table dataSource={newParts} rowSelection={rowSelection}>
        <Column title="ID" dataIndex="id" key="id" />
        <Column title="이름" dataIndex="name" key="name" />
        <Column title="가격" dataIndex="price" key="price" />
        <Column title="설명" dataIndex="desc" key="desc" />
        <Column
          title="필요 개수"
          dataIndex="requiredNumber"
          key="requiredNumber"
        />
      </Table>
    </Modal>
  );
}

export default RequiredPartsModal;

RequiredPartsModal.propTypes = {
  ShowPartsModal: PropTypes.bool.isRequired,
  setShowPartsModal: PropTypes.func.isRequired,
  getEngines: PropTypes.func.isRequired,
  PartsInfo: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
};
