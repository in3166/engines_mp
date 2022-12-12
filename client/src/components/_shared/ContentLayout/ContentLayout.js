import React from 'react';
import { Layout } from 'antd';
import PropTypes from 'prop-types';
import BackTopUtil from '../BackTopUtil/BackTopUtil';
import Navbar from '../../views/NavBar/NavBar';
import SideBar from '../../views/SideBar/SideBar';
import FooterComponent from '../../views/Footer/FooterComponent';

const { Content } = Layout;

function ContentLayout(props) {
  const { children } = props;

  return (
    <Layout>
      <Navbar />
      <Layout>
        <SideBar />
        <Layout style={{ padding: '0px 24px 24px', overflow: 'auto' }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              minHeight: 280,
              width: '100%',
              height: '100%',
              // border: '1px solid',
            }}
          >
            {children}
          </Content>
        </Layout>
      </Layout>
      <FooterComponent />
      <BackTopUtil />
    </Layout>
  );
}

export default ContentLayout;

ContentLayout.propTypes = {
  children: PropTypes.objectOf(PropTypes.any).isRequired,
};
