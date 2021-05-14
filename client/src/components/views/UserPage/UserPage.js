import React, { useState } from 'react';
import {
  Layout,
  Input,
  Tabs,
  PageHeader,
  Card,
  message,
  Form,
  Button,
} from 'antd';
import axios from 'axios';
import PasswordChange from './Sections/PasswordChange';
import UserInfo from './Sections/UserInfo';
// import {useSelector} from 'react-redux'

const { Content } = Layout;
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 14 },
};

function UserPage(props) {
  const { userData } = props.user;
  // const user = useSelector(state => state.user.userData);
  // console.log('userselect', user)
  const [passwordCheck, setpasswordCheck] = useState(false);

  if (userData == null) {
    return null;
  }

  const onSubmit = (data) => {
    const body = {
      id: userData.id,
      password: data.password,
    };

    axios
      .post('/api/users/passwordCheck', body)
      .then((res) => {
        if (res.data.success) {
          setpasswordCheck(true);
        } else {
          message.error(res.data.err);
        }
      })
      .catch((err) => {
        alert(`[Error]: ${err}`);
      });
  };

  return (
    <div style={{ width: '100%' }}>
      <Layout style={{ padding: '0 24px 24px', overflow: 'auto' }}>
        <PageHeader title="User Page" />

        <Content
          className="site-layout-background"
          style={{
            padding: 12,
            margin: 0,
            minHeight: 280,
            height: '100%',
          }}
        >
          {passwordCheck ? (
            <Tabs
              defaultActiveKey="1"
              size="large"
              style={{ background: 'white', padding: '0 20px 10px 20px' }}
            >
              <TabPane tab="개인정보" key="1">
                <UserInfo userData={userData} layout={layout} />
              </TabPane>
              <TabPane tab="비밀번호 변경" key="2">
                <PasswordChange userData={userData} layout={layout} />
              </TabPane>
            </Tabs>
          ) : (
            <Card title="비밀번호 확인" bordered style={{ width: 600 }}>
              <Form
                {...{ labelCol: { span: 8 }, wrapperCol: { span: 12 } }}
                name="password-check"
                onFinish={onSubmit}
              >
                <Form.Item
                  label="비밀번호"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input type="password" />
                </Form.Item>
                <Form.Item {...{ wrapperCol: { offset: 8, span: 16 } }}>
                  <Button type="primary" htmlType="submit">
                    확인
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          )}
        </Content>
      </Layout>
    </div>
  );
}

export default UserPage;
