import React, { useState } from 'react';
import { Modal, Table, Button, message } from 'antd';
import PropTypes from 'prop-types';
// import {
//   PlusOutlined,
//   DeleteFilled,
//   QuestionCircleOutlined,
// } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import TableButtons from '../../../../../utils/TableButtons/TableButtons';
import PartAddModal from './RequiredPartAddModal';
import PartUpdateModal from './RequiredPartUpdateModal';
import { deleteEnginRequiredPart } from '../../../../../../_actions/engine_actions';

const { Column } = Table;
function RequiredPartsModal(props) {
  const { ShowPartsModal, setShowPartsModal, EngineInfo, getEngines } = props;
  const [ShowPartAdd, setShowPartAdd] = useState(false);
  const [ShowPartUpdate, setShowPartUpdate] = useState(false);
  const [selectedRowKeys, setselectedRowKeys] = useState([]);
  const [selectedPart, setselectedPart] = useState([]);
  const dispatch = useDispatch();
  // 필요 부품 꺼내기
  const newParts = EngineInfo.requiredParts.map((a, i) => {
    const temp = a.part;
    temp.requiredNumber = a.requiredNumber;
    temp.key = i;

    return a.part;
  });

  const rowSelection = {
    /* eslint no-underscore-dangle: 0 */
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

  const deleteConfirm = () => {
    if (selectedRowKeys.length === 0) {
      message.error('부품을 선택하세요.');
    } else {
      const partID = selectedRowKeys.map(e => e._id);
      const body = {
        engine: EngineInfo._id,
        partID,
      };

      dispatch(deleteEnginRequiredPart(body))
        .then(res => {
          if (res.payload.success) {
            message.success('필요 부품을 삭제하였습니다.');
          } else {
            message.error(res.payload.err);
          }
        })
        .catch(err => {
          message.error(`[Error]: ${err}`);
        })
        .finally(() => {
          getEngines();
          setShowPartsModal(false);
        });
    }
  };

  return (
    <Modal
      title={`${EngineInfo.name} 구성 부품`}
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

      <PartAddModal
        setShowPartAdd={setShowPartAdd}
        ShowPartAdd={ShowPartAdd}
        getEngines={getEngines}
        EngineInfo={EngineInfo}
        setShowPartsModal={setShowPartsModal}
      />

      <PartUpdateModal
        setShowPartUpdate={setShowPartUpdate}
        ShowPartUpdate={ShowPartUpdate}
        selectedRowKeys={selectedRowKeys}
        EngineInfo={EngineInfo}
        selectedPart={selectedPart}
        getEngines={getEngines}
        setShowPartsModal={setShowPartsModal}
      />

      <br />
      <br />
      <Table dataSource={newParts} rowSelection={rowSelection}>
        <Column title="Section.1" dataIndex="section1" key="section1" />
        <Column title="Section.1" dataIndex="section2" key="section2" />
        <Column title="이름" dataIndex="name" key="name" />
        <Column title="가격" dataIndex="price" key="price" />
        <Column title="설명" dataIndex="desc" key="desc" />
        <Column
          title="필요 개수"
          dataIndex="requiredNumber"
          key="requiredNumber"
          style={{ minWidth: '100px' }}
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
  EngineInfo: PropTypes.objectOf(PropTypes.any).isRequired,
};
