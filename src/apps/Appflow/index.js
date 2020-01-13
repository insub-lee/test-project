import React, { Component } from 'react';
import { Layout, Menu, Icon, Breadcrumb, Button } from 'antd';
import { Route, Switch } from 'react-router-dom';
import { push } from 'react-router-redux';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

// import Logo from 'images/bizmicro_logo.png';

// import WorkflowLineComponent from './WorkflowLineComponent';
// import ApprovalList from './ApprovalList';
// import ApprovalDetail from './ApprovalDetail';
import Draft from './User/Draft';
// import ComponentMgnt from './ComponentMgnt';
// import StyledWorkflow from './StyledWorkflow';

import Process from './Admin/Process';
import ProcessModal from './ProcessModal';
import SignLine from './Admin/SignLine';
import SignLineModal from './Modal/SignLineModal';

class Workflow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      signlineVisible: false,
      signline: [],
    };
  }

  linkTo = menu => {
    this.props.historyPush(menu.item.props.link);
  };

  signlineOpenHandler = () => {
    this.setState({ signlineVisible: true });
  };

  signlineCloseHandler = () => {
    this.setState({ signlineVisible: false });
  };

  signlineCallbackHandler = users => {
    this.setState({
      signlineVisible: false,
      signline: users,
    });
  };

  render() {
    const { Content, Sider, Footer } = Layout;
    const { page, category } = this.props.match.params;
    const { signlineVisible } = this.state;

    return (
      <div>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider collapsible>
            <Menu defaultSelectedKeys={['line']} selectedKeys={[category]} mode="inline" onClick={this.linkTo}>
              <Menu.Item key="line" link="/apps/workflow/component/view/line">
                <Icon type="code" />
                <span>결재 컴포넌트</span>
              </Menu.Item>
              <Menu.Item key="process" link="/apps/workflow/component/view/process">
                <Icon type="code" />
                <span>결재선관리</span>
              </Menu.Item>
              <Menu.Item key="signline" link="/apps/workflow/component/view/signline">
                <Icon type="code" />
                <span>결재선(빌더 글등록)</span>
              </Menu.Item>
            </Menu>
            <Menu defaultSelectedKeys={['draft']} selectedKeys={[category]} mode="inline" onClick={this.linkTo}>
              <Menu.Item key="draft" link="/apps/WorkFlow/User/Draft/draft">
                <Icon type="code" />
                <span>기안함</span>
              </Menu.Item>
              <Menu.Item key="unApproval" link="/apps/WorkFlow/User/Draft/unApproval">
                <Icon type="code" />
                <span>미결함</span>
              </Menu.Item>
              <Menu.Item key="approval" link="/apps/WorkFlow/User/Draft/approval">
                <Icon type="code" />
                <span>기결함</span>
              </Menu.Item>
            </Menu>
          </Sider>
          <Layout style={{ background: '#fff' }}>
            <Content style={{ margin: '0 16px' }}>
              <Breadcrumb style={{ margin: '16px 0' }}>
                <Breadcrumb.Item></Breadcrumb.Item>
              </Breadcrumb>
              {/* <WorkflowLineComponent /> */}
              {/* <SignLine signline={signline} /> */}
              <Switch>
                {/* <Route path="/apps/workflow/component/view/line" component={WorkflowLineComponent} /> */}
                <Route path="/apps/workflow/component/view/process" component={Process} />
                <Route path="/apps/workflow/component/view/signline" component={SignLine} />
                <Route path="/apps/WorkFlow/User/Draft/:CATE" component={Draft} />
                {/* <Route path="/apps/workflow/approval/list/:category" component={ApprovalList} />
                <Route path="/apps/workflow/approval/view/:category/:draftId/:queId" component={ApprovalDetail} /> */}
              </Switch>
            </Content>
            <Button key="signline" onClick={this.signlineOpenHandler}>
              결재선지정
            </Button>
            <Footer style={{ textAlign: 'center' }}>Ant Design ©2019</Footer>
            {/* <ProcessModal ref={this.processModalRef} /> */}
            <SignLineModal visible={signlineVisible} closeHandler={this.signlineCloseHandler} callbackHandler={this.signlineCallbackHandler} />
            <ProcessModal />
          </Layout>
        </Layout>
      </div>
    );
  }
}

Workflow.propTypes = {
  match: PropTypes.object.isRequired,
  historyPush: PropTypes.func,
};

const mapDispatchToProps = dispatch => ({
  historyPush: url => dispatch(push(url)),
});

const withConnect = connect(null, mapDispatchToProps);

export default compose(withConnect)(Workflow);
