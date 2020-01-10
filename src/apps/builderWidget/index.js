import React, { Component } from 'react';
import { Layout, Menu, Icon, Breadcrumb } from 'antd';

import BuilderBoard from './BuilderBoard';
import BuilderWidgetSetting from './widgetSetting';

class BuilderWidget extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { Content, Sider, Footer } = Layout;
    const category = '';

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible>
            <Menu defaultSelectedKeys={['line']} selectedKeys={[category]} mode="inline" onClick={this.linkTo}>
              {/* <Menu.Item key="rootMap" link="/apps/admin/adminmain/classify/rootmap">
                <Icon type="code" />
                <span>분류체계관리</span>
              </Menu.Item> */}
            </Menu>
          </Sider>
          <Layout style={{ background: '#fff' }}>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              <BuilderBoard />
              {/* <BuilderWidgetSetting /> */}
            </Content>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2019</Footer>
          </Layout>
        </Layout>
      </div>
    );
  }
}

export default BuilderWidget;
