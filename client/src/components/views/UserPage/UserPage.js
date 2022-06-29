import React, { useState } from 'react';
import PropTypes from 'prop-types';
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

const { Content } = Layout;
const { TabPane } = Tabs;

const layout = {
  labelCol: { span: 5 },
  wrapperCol: { span: 13 },
};

function UserPage(props) {
  const { user } = props;

  const [passwordCheck, setpasswordCheck] = useState(false);

  if (user.userData == null) {
    return null;
  }

  const onSubmit = data => {
    const body = {
      id: user.userData.id,
      password: data.password,
    };

    axios
      .post('/api/users/passwordCheck', body)
      .then(res => {
        if (res.data.success) {
          setpasswordCheck(true);
        } else {
          message.error(res.data.err);
        }
      })
      .catch(err => {
        message.error(`[Error]: ${err}`);
      });
  };

  return (
    <div style={{ width: '100%', flex: '1 1 0', minWidth: '0' }}>
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
                <UserInfo user={user} layout={layout} />
              </TabPane>
              <TabPane tab="비밀번호 변경" key="2">
                <PasswordChange user={user} layout={layout} />
              </TabPane>
            </Tabs>
          ) : (
            <Card title="비밀번호 확인" bordered style={{ width: '100%' }}>
              <Form
                {...{ labelCol: { span: 7 }, wrapperCol: { span: 11 } }}
                name="password-check"
                onFinish={onSubmit}
              >
                <input
                  type="text"
                  hidden
                  value={`${user.userData.id}`}
                  autoComplete="off"
                  readOnly
                />
                <Form.Item
                  label="비밀번호"
                  name="password"
                  rules={[
                    { required: true, message: 'Please input your password!' },
                  ]}
                >
                  <Input type="password" autoComplete="new-password" />
                </Form.Item>
                <Form.Item {...{ wrapperCol: { offset: 7, span: 16 } }}>
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

UserPage.propTypes = {
  user: PropTypes.objectOf(PropTypes.object).isRequired,
};

export default UserPage;
