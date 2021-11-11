import React, { useEffect, useState } from 'react';
import { Transfer, Button, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import axios from 'axios';

const ExpertTransfer = props => {
  const { userList, ExpertGroup, getAllUsers } = props;

  const [targetKeys, settargetKeys] = useState([]);
  const [ExpertsList, setExpertsList] = useState([]);

  const tellExperts = () => {
    const targetKeys2 = [];
    const tempUser = [];
    for (let i = 0; i < userList.length; i += 1) {
      const data = {
        key: i.toString() + ExpertGroup.name,
        id: `${userList[i].id}`,
        // description: `description of content${i + 1}`,
        role: userList[i].role,
      };
      // 전문가의 경우 타겟 오른쪽 박스
      if (data.role.name === ExpertGroup.name) {
        targetKeys2.push(data.key);
      }
      // console.log(data);
      // 일반 사용자나 전문가일 경우 list에 넣기
      if (
        (data.role.id === 2 && data.role.name === ExpertGroup.name) ||
        (data.role.id !== 2 && data.role.id !== 1)
      ) {
        tempUser.push(data);
      }
    }
    tempUser.sort((a, b) => a.id.localeCompare(b.id));
    setExpertsList(tempUser);
    settargetKeys(targetKeys2);
  };

  const useMountEffect = fun => {
    useEffect(fun, [userList]);
  };

  useMountEffect(tellExperts);

  const handleChange = (targetKey, direction, movekey) => {
    // console.log('direction:', direction, ' / movekey: ',movekey)
    // console.log('targetKey:', targetKey)

    const body = {
      users: ExpertsList.filter(userfilter => {
        return movekey.find(o => o === userfilter.key);
      }),
      direction,
      role: { id: ExpertGroup.role, name: ExpertGroup.name },
    };
    // console.log(body);
    axios
      .post('/api/users/changeExpertRole', body)
      .then(res => {
        if (res.data.success) {
          settargetKeys(targetKey);
          getAllUsers();
          message.success('권한이 성공적으로 변경되었습니다.');
        }
      })
      .catch(err => {
        if (err) message.error('권한 변경 오류');
      });
  };

  const renderFooter = () => (
    <Button
      size="small"
      style={{ float: 'right', margin: 5 }}
      onClick={getAllUsers}
    >
      <ReloadOutlined />
    </Button>
  );

  return (
    <>
      <Transfer
        locale={{ itemUnit: '명', itemsUnit: '명' }}
        dataSource={ExpertsList}
        titles={['Users', ExpertGroup.name]}
        showSearch
        listStyle={{
          width: '100%',
          height: 400,
        }}
        operations={['추가', '제거']}
        targetKeys={targetKeys}
        // selectedKeys={selectedKeys}
        // onSelectChange={handleSelectChange}
        onChange={handleChange}
        render={item => `${item.id}`}
        footer={renderFooter}
      />
    </>
  );
};

ExpertTransfer.propTypes = {
  userList: PropTypes.arrayOf(PropTypes.any).isRequired,
  ExpertGroup: PropTypes.objectOf(PropTypes.any).isRequired,
  getAllUsers: PropTypes.func.isRequired,
};

export default ExpertTransfer;
