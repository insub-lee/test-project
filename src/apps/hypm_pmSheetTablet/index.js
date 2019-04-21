/* eslint-disable react/prefer-stateless-function */
import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import PmSheetList from './PmSheetList';
import PmSheetList2 from './PmSheetList/index2.js';
import SheetView from './PmSheetList/sheetView';
import SheetView2 from './PmSheetList/sheetView2';
import InformNoteDetailPopup from './Popup/InformNoteDetailPopup';
import Workorder from './Popup/WorkOrderDetailPopup';
import DelayCausePopup from './Popup/DelayCausePopup';

const basicUrl = ['/apps/pmSheetTablet', '/sm/pmSheetTablet', '/sm/pmSheetTablet2'];

class PMSheetList extends Component {
  constructor(props) {
    super(props);
    this.props = props;

    let mainUrl = null; // basicUrl[0]
    if (props.history.location.pathname === basicUrl[0]) {
      mainUrl = '/apps/pmSheetTablet/pmList';
    } else if (props.history.location.pathname === basicUrl[1]) {
      mainUrl = '/sm/pmSheetTablet/pmList';
    } else if (props.history.location.pathname === basicUrl[2]) {
      mainUrl = '/sm/pmSheetTablet/pmList2';
    }

    this.state = {
      currentLocation: mainUrl,
    };

    if (mainUrl !== null) {
      props.history.replace(mainUrl);
    }
  }

  componentWillReceiveProps(nextProps) {
    const { history } = nextProps;
    const { currentLocation } = this.state;

    const {
      location,
    } = history;

    const {
      pathname,
    } = location;

    if (currentLocation !== pathname) {
      if (!basicUrl.includes(pathname)) {
        this.setState({
          currentLocation: pathname,
        });
      } else {
        history.replace(currentLocation);
      }
    }
  }

  // app모드에서 화면 값 유지
  shouldComponentUpdate(nextProps) {
    const { history } = nextProps;
    const pathArray = history.location.pathname.split('/');

    const { currentLocation } = this.state;

    if (currentLocation === history.location.pathname && pathArray[1] === 'apps') {
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        {/* 기입바람 */}
		    <Route path="/apps/pmSheetTablet" component={PmSheetList} exact />
		    <Route path="/sm/pmSheetTablet" component={PmSheetList} exact />
		    <Route path="/sm/pmSheetTablet2" component={PmSheetList2} exact />
        {/* 기입바람 */}
        <Route path="/apps/pmSheetTablet/pmList" component={PmSheetList} exact />
        <Route path="/sm/pmSheetTablet/pmList" component={PmSheetList} exact />
        <Route path="/sm/pmSheetTablet/pmList2" component={PmSheetList2} exact />
        {/* 기입바람 */}
        <Route path="/apps/pmSheetTablet/pmSheet" component={SheetView} exact />
        <Route path="/sm/pmSheetTablet/pmSheet" component={SheetView} exact />
        <Route path="/sm/pmSheetTablet/pmSheet2" component={SheetView2} exact />
        {/* 기입바람 */}
        <Route path="/apps/pmSheetTablet/Popup/InformNoteDetailPopup/:PARAM" component={InformNoteDetailPopup} exact />
        <Route path="/sm/pmSheetTablet/Popup/InformNoteDetailPopup/:PARAM" component={InformNoteDetailPopup} exact />
        {/* 기입바람 */}
        <Route path="/apps/pmSheetTablet/Popup/Workorder/:PARAM" component={Workorder} exact />
        <Route path="/sm/pmSheetTablet/Popup/Workorder/:PARAM" component={Workorder} exact />

      </div>
    );
  }
}

PMSheetList.propTypes = {

  history: PropTypes.object.isRequired,
};

export default PMSheetList;
