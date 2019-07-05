import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Button } from 'antd';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
import Modal from 'react-modal';

// import reducer from './reducer';
// import saga from './saga';
// import * as selectors from './selectors';
// import * as actions from './actions';
// import messages from './messages';

// import StyleTopMenu from './StyleTopMenu';
import { BtnDkGray, BtnBizPreview, BtnBizSettings }
  from '../uielements/buttons.style';

import RootRouter from './rootRouter';

class AppPreview extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
    };

    // this.props.execApps(this.props.home);
  }

  render() {
    const {
      BIZGRP_ID,
    } = this.state;

    const {
      bizInfo,

      confirmBizGroup,

      history,
      bizGroupInfo,
      treeData,
      selectedIndex,

      saveData,
      home,
    } = this.props;

    const customstyle = {
      content: {
        width: 900,
        height: 500,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        overflow: 'hidden',
      },
    };

    return (
      <div>
        <RootRouter //eslint-disable-line
          setMyMenuData={this.props.setMyMenuData}
          selectedApp={this.props.selectedApp}
          set={false}
        />
      </div>
    );
  }
}

AppPreview.propTypes = {

};

export default AppPreview;

