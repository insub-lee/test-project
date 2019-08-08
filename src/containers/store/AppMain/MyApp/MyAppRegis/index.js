import React from 'react';
import PropTypes from 'prop-types';
import { Tabs } from 'antd';

import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import AppRegisForm from '../AppRegisForm';
import StyleMyAppRegis from './StyleMyAppRegis';
import Footer from '../../../App/Footer';

const { TabPane } = Tabs;

class MyAppRegis extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
    };
  }

  render() {
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          backgroundColor: '#f7f8f9',
          minHeight: 'calc(100vh - 42px)',
        }}
      >
        <StyleMyAppRegis>
          <Tabs defaultActiveKey="1">
            <TabPane tab={intlObj.get(messages.tab1)} key="1">
              <AppRegisForm
                history={this.props.history}
              />
            </TabPane>
            <TabPane tab={intlObj.get(messages.tab2)} key="2" disabled >{intlObj.get(messages.tab2)}</TabPane>
            {/* <TabPane tab={intlObj.get(messages.tab3)} key="3" disabled >{intlObj.get(messages.tab3)}</TabPane> */}
          </Tabs>
        </StyleMyAppRegis>
        <Footer />
      </div>
    );
  }
}

MyAppRegis.propTypes = {
  history: PropTypes.object, //eslint-disable-line
};

export default MyAppRegis;
