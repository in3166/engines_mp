import React, { useState, useEffect } from 'react';
// import {useSelector} from 'react-redux'
import { Transfer, Button, message, Breadcrumb, Spin } from 'antd';
import axios from 'axios';
import { ReloadOutlined } from '@ant-design/icons';
import PropTypes from 'prop-types';
import './Sections/antdTransfer.css';

function AddExpertPage(props) {
  const [userList, setUserList] = useState([]);
  const [targetKeys, settargetKeys] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = props;
  // const [selectedKeys, setselectedKeys] = useState([]);

  const getAllUsers = () => {
    setLoading(true);
    const targetKeys2 = [];
    const tempUser = [];

    axios.get('/api/users/getAllUsers').then(res => {
      for (let i = 0; i < res.data.users.length; i += 1) {
        const data = {
          key: i.toString(),
          id: `${res.data.users[i].id}`,
          // description: `description of content${i + 1}`,
          chosen: res.data.users[i].role,
        };
        // 전문가의 경우 타겟 오른쪽 박스
        if (data.chosen === 2) {
          targetKeys2.push(data.key);
        }
        // 일반 사용자나 전문가일 경우 list에 넣기
        if (data.chosen === 0 || data.chosen === 2) {
          tempUser.push(data);
        }
      }
      tempUser.sort((a, b) => a.id.localeCompare(b.id));
      setUserList(tempUser);
      settargetKeys(targetKeys2);
    });
    setTimeout(() => {
      setLoading(false);
    }, 500);
  };

  useEffect(() => {
    // if (user?.userData?.isAdmin)
    getAllUsers();
    return () => setLoading(false);
  }, [user]);
  // 모든 사용자 불러오기

  const handleChange = (targetKey, direction, movekey) => {
    // console.log('direction:', direction, ' / movekey: ',movekey)
    // console.log('targetKey:', targetKey)

    const body = {
      users: userList.filter(userfilter => {
        return movekey.find(o => o === userfilter.key);
      }),
      direction,
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

  //  const handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
  //     console.log('selectedKeys: ',selectedKeys)
  //     console.log('sourceSelectedKeys: ',sourceSelectedKeys)
  //     console.log('targetSelectedKeys: ',targetSelectedKeys)
  //     setselectedKeys(
  //         [...sourceSelectedKeys, ...targetSelectedKeys]
  //     );
  //     console.log('after selectedKeys: ',selectedKeys)
  //   };

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
      <Breadcrumb style={{ margin: '16px 0' }}>
        <Breadcrumb.Item>Home</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 관리</Breadcrumb.Item>
        <Breadcrumb.Item>전문가 등록</Breadcrumb.Item>
      </Breadcrumb>
      <div style={{ backgroundColor: 'white', padding: 20 }}>
        <Spin spinning={loading}>
          <Transfer
            locale={{ itemUnit: '명', itemsUnit: '명' }}
            dataSource={userList}
            titles={['일반 사용자', '전문가']}
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
        </Spin>
      </div>
    </>
  );
}

AddExpertPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default AddExpertPage;
