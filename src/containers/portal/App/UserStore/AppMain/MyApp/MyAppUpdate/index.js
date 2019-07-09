import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import AppUpdateForm from '../AppUpdateForm';
import AppUserForm from '../AppUserForm';
import AppExaForm from '../AppExaForm';
import StyleMyAppUpdate from './StyleMyAppUpdate';
import Footer from '../../../Footer';

const { TabPane } = Tabs;

class MyAppUpdate extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      APP_ID: prop.match.params.APP_ID,
      VER: prop.match.params.VER,
      uv: prop.match.params.uv,
      tabNum: prop.match.params.tabNum,
      svcyn: prop.match.params.svcyn,
    };
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    const { match } = nextProps;
    const { params } = match;
    const { APP_ID, tabNum, svcyn, uv, VER } = params; //eslint-disable-line
    this.setState({
      APP_ID,
      tabNum,
      svcyn,
      uv,
      VER,
    });
  }
  handleTabClicks = (activeKey) => {
    this.setState({
      tabNum: activeKey,
    });
  };
  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          minHeight: 'calc(100vh - 42px)',
          backgroundColor: '#f7f8f9',
        }}
      >
        <StyleMyAppUpdate>
          <Tabs defaultActiveKey="1" activeKey={this.state.tabNum} onTabClick={this.handleTabClicks}>
            <TabPane tab={intlObj.get(messages.tab1)} key="1">
              <AppUpdateForm APP_ID={this.state.APP_ID} VER={this.state.VER} uv={this.state.uv} history={this.props.history} />
            </TabPane>
            <TabPane tab={intlObj.get(messages.tab2)} key="2" disabled={this.state.uv === 'V'}>
              <AppUserForm APP_ID={this.state.APP_ID} VER={this.state.VER} uv={this.state.uv} history={this.props.history} />
            </TabPane>
            <TabPane tab={intlObj.get(messages.tab3)} key="3" disabled={this.state.svcyn === 'S' || this.state.svcyn === 'C' || this.state.uv === 'V'}>
              <AppExaForm APP_ID={this.state.APP_ID} VER={this.state.VER} EXA_MODE="U" history={this.props.history} />
            </TabPane>
          </Tabs>
        </StyleMyAppUpdate>
        <Footer />
      </div>
    );
  }
}

MyAppUpdate.propTypes = {
  history: PropTypes.object, //eslint-disable-line
  match: PropTypes.object, //eslint-disable-line
};

export default MyAppUpdate;
