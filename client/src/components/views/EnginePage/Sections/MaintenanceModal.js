import React from 'react';
import { Modal, Table, Button } from 'antd';
import PropTypes from 'prop-types';

const { Column, ColumnGroup } = Table;
function MaintenanceModal(props) {
  const { ShowMaintenanceModal, setShowMaintenanceModal, MaintenanceInfo } =
    props;
  console.log('MaintenanceInfo: ', MaintenanceInfo);
  // const newParts = PartsInfo.map((a, i) => {
  //   const temp = a.part;
  //   temp.requiredNumber = a.requiredNumber;
  //   temp.key = i;

  //   return a.part;
  // });
  // const data = [
  //   {
  //     siteId: 's123',
  //     siteName: 'site1',
  //     address: 'korea 1-1',
  //     partId: 'p1',
  //     partName: 'part1',
  //     price: 300,
  //     repairNum: 3,
  //     date: '2020-01-02',
  //   },
  // ];

  return (
    <Modal
      title="수리 이력"
      width="90%"
      visible={ShowMaintenanceModal}
      onCancel={() => setShowMaintenanceModal(false)}
      footer={[
        <Button key="back" onClick={() => setShowMaintenanceModal(false)}>
          OK
        </Button>,
      ]}
    >
      <Table dataSource={MaintenanceInfo}>
        <ColumnGroup title="Site">
          <Column title="ID" dataIndex='["site", "id"]' key="id" />
          <Column title="이름" dataIndex="site" key="name" />
          <Column title="주소" dataIndex="address" key="price" />
        </ColumnGroup>
        <ColumnGroup title="Part">
          <Column title="ID" dataIndex="partId" key="id" />
          <Column title="이름" dataIndex="partName" key="partName" />
          <Column title="가격" dataIndex="price" key="price" />
          <Column title="개수" dataIndex="repairNum" key="repairNum" />
        </ColumnGroup>
        <Column title="날짜" dataIndex="date" key="date" />
        <Column title="날짜" dataIndex="date" key="date" />
        <Column title="날짜" dataIndex="date" key="date" />
      </Table>
    </Modal>
  );
}

export default MaintenanceModal;

MaintenanceModal.propTypes = {
  ShowMaintenanceModal: PropTypes.bool.isRequired,
  setShowMaintenanceModal: PropTypes.func.isRequired,
  MaintenanceInfo: PropTypes.arrayOf(PropTypes.object).isRequired,
};
