import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Route, Link, Switch } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { intlObj } from 'utils/commonUtils';
import { ThemeProvider } from 'styled-components';
import { Layout, Icon } from 'antd';
import themes from 'config/themes/index';
import AppWrapper from './AppWrapper';
import Trigger from './Trigger';
import storeHome from './images/system-admin-appstore.png';
import messages from './messages';
import Button from 'components/Button';
import { basicPath } from 'containers/common/constants';

import BcGuid from './BcMain/GuideSub';
import Bcask from './BcMain/BcaskSub';
import Bcaskinfo from './BcMain/BcaskinfoSub';
import Bcadmin from './BcMain/BcadminSub';
import Bcaskorg from './BcMain/BcaskorgSub';

import BcAdmin00 from './BcMain/BcAdmin00Sub';
import BcAdmin01 from './BcMain/BcAdmin01Sub';
import BcAdmin02 from './BcMain/BcAdmin02Sub';
import BcAdmin03 from './BcMain/BcAdmin03Sub';
import BcAdmin04 from './BcMain/BcAdmin04Sub';
import BcAdmin05 from './BcMain/BcAdmin05Sub';
import BcAdmin06 from './BcMain/BcAdmin06Sub';

import LeftMenu from './BcMain/LeftMenu';


const {
  Header,
  Content,
} = Layout;



class BcMain extends PureComponent {
  constructor() {
    super();

    this.state = {
      // visible: false,
    };
  }

  
  render() {
    return (
      <Content className="storeContent">
        <div className="appListWrapper">
          <LeftMenu history={this.props.history} />

        <div style={{ width: '100%' }}>
          <Switch>
            <Route exact path={`/${basicPath.APPS}/businesscard`} component={Bcask} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/GuideSub`} component={BcGuid} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskSub`} component={Bcask} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskinfoSub`} component={Bcaskinfo} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcadminSub`} component={Bcadmin} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin00Sub`} component={BcAdmin00} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin01Sub`} component={BcAdmin01} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin02Sub`} component={BcAdmin02} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin03Sub`} component={BcAdmin03} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin04Sub`} component={BcAdmin04} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin05Sub`} component={BcAdmin05} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcAdmin06Sub`} component={BcAdmin06} />
            <Route path={`/${basicPath.APPS}/businesscard/BcMain/BcaskorgSub`} component={Bcaskorg} />
          </Switch>
        </div>
        </div>
      </Content>
    );
  }
}
BcMain.propTypes = {
  history: PropTypes.object,    //eslint-disable-line
};
export default compose(
)(BcMain);

