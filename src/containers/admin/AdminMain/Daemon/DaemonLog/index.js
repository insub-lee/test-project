import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj } from 'utils/commonUtils';
import moment from 'moment';
import ReactDataGrid from 'react-data-grid';

import { Select, DatePicker, Modal } from 'antd';

import Footer from 'containers/admin/App/Footer';
import StyleDataGrid from 'containers/admin/components/uielements/dataGrid.style.js';
import { LinkBtnDkGray, LinkBtnLgtGray } from 'containers/admin/components/uielements/buttons.style.js';
import StyledButton from 'components/Button/StyledButton.js';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actionTypes from './actions';
import StyleDaemonLog from './StyleDaemonLog';

import messages from '../messages';

const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';

const setListState = state => ({
  sortColumn: state.listSortColumn,
  sortDirection: state.listSortDirection,
  keyword: state.listKeyword,
  stopYn: state.listStopYn,
});

const statusSwitch = stopYn => {
  switch (stopYn) {
    case 'Y':
      return intlObj.get(messages.statusStop);
    case 'N':
      return intlObj.get(messages.statusWork);
    default:
      return '';
  }
};

// 검색결과 없을 때 표시(임시)
const EmptyData = () => (
  <div style={{ textAlign: 'center', fontSize: 15, fontWeight: 800, padding: 15 }}>
    <span>{intlObj.get(messages.noSearch)}</span>
  </div>
);

class DaemonLog extends React.Component {
  constructor(prop) {
    super(prop);
    const daemonId = prop.match.params.DAEMON_ID ? prop.match.params.DAEMON_ID : 0;
    const location = this.props.history.location.state;
    this.columns = [
      {
        key: 'START_DTTM',
        name: `${intlObj.get(messages.startDttm)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'END_DTTM',
        name: `${intlObj.get(messages.endDttm)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'RUN_TYPE',
        name: `${intlObj.get(messages.runType)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'SUCCESS_YN',
        name: `${intlObj.get(messages.successYn)}`,
        visible: true,
        sortable: true,
        resizable: true,
      },
      {
        key: 'RESULT',
        name: `LOG`,
        visible: true,
        sortable: false,
        formatter: this.logViewFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'ERROR',
        name: `ERROR_LOG`,
        visible: true,
        sortable: false,
        formatter: this.errLogViewFormatter,
        getRowMetaData: data => data,
      },
    ];

    this.state = {
      daemonId,
      periodDates: [moment().subtract(1, 'month'), moment()],
      sortColumnParam: '',
      sortDirectionParam: '',
      startDttm: '',
      endDttm: '',
      runType: '',
      successYn: '',
      visible: false,
      listSortColumn: location === undefined ? '' : location.sortColumnParam,
      listSortDirection: location === undefined ? '' : location.sortDirectionParam,
      listKeyword: location === undefined ? '' : location.keyword,
      listStopYn: location === undefined ? '' : location.stopYn,
    };
    this.dateSet();
    this.props.getDaemonLogList(
      this.state.daemonId,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.startDttm,
      this.state.endDttm,
      this.state.runType,
      this.state.successYn,
    );
  }

  onClickToList = () => {
    // console.log('!!!!!!', data);
    this.props.history.push({
      pathname: '/admin/adminmain/daemon',
      state: setListState(this.state),
    });
  };

  logViewFormatter = val => {
    const log = JSON.parse(val.dependentValues.RESULT_LOG);
    const resultLog = JSON.stringify(log, undefined, 2);
    return <LinkBtnLgtGray onClick={() => this.handleLogViewClick(resultLog)}>{intlObj.get(messages.lblLogView)}</LinkBtnLgtGray>;
  };

  errLogViewFormatter = val => { 
    const log = JSON.parse(val.dependentValues.ERROR_LOG);
    const errorLog = log.Error ? log.Error.replace(/^"(.*)"$/, '$1') : '';
    return <LinkBtnLgtGray onClick={() => this.handleLogViewClick(errorLog)}>{intlObj.get(messages.lblLogView)}</LinkBtnLgtGray>;
  };

  handleLogViewClick = data => {
    this.setState({ modalTitle: 'LOG', visible: true, logData: data });
  };

  // rowGetter
  rowGetter = rowNumber => {
    const { daemonLogList } = this.props;
    return daemonLogList[rowNumber];
  };

  StatusFormatter = val => <format>{statusSwitch(val.dependentValues.STOP_YN)}</format>;

  handleRunTypeSelect = e => {
    this.setState({ runType: e }, () => {
      this.dateSet();
      this.props.getDaemonLogList(
        this.state.daemonId,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.startDttm,
        this.state.endDttm,
        this.state.runType,
        this.state.successYn,
      );
    });
  };

  handleSuccessSelect = e => {
    this.setState({ successYn: e }, () => {
      this.dateSet();
      this.props.getDaemonLogList(
        this.state.daemonId,
        this.state.sortColumnParam,
        this.state.sortDirectionParam,
        this.state.startDttm,
        this.state.endDttm,
        this.state.runType,
        this.state.successYn,
      );
    });
  };

  // 검색아이콘 클릭 시(조회)
  handleClick = () => {
    this.dateSet();
    this.props.getDaemonLogList(
      this.state.daemonId,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.startDttm,
      this.state.endDttm,
      this.state.runType,
      this.state.successYn,
    );
  };

  // Grid sort
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortDirection === 'NONE' ? '' : sortColumn,
      sortDirectionParam: sortDirection === 'NONE' ? '' : sortDirection,
    });
    this.dateSet();
    this.props.getDaemonLogList(
      this.state.daemonId,
      this.state.sortColumnParam,
      this.state.sortDirectionParam,
      this.state.startDttm,
      this.state.endDttm,
      this.state.runType,
      this.state.successYn,
    );
  };

  dateSet = () => {
    if (
      this.state.periodDates.length !== 0 &&
      this.state.periodDates[0]._isValid === true && //eslint-disable-line
      this.state.periodDates[1]._isValid === true //eslint-disable-line
    ) {
      this.state.startDttm = moment(this.state.periodDates[0]).format(dateFormat);
      this.state.endDttm = moment(this.state.periodDates[1]).format(dateFormat);
    } else {
      this.state.startDttm = '';
      this.state.endDttm = '';
    }
  };

  onPeriodChange = dates => {
    this.setState({
      periodDates: [dates[0], dates[1]],
    });
  };

  handleModalClose = () => {
    this.setState({
      visible: false,
    });
  };

  render() {
    const { daemonLogList } = this.props;
    return (
      <div>
        <Modal
          title={this.state.modalTitle}
          visible={this.state.visible}
          width={600}
          onOk={this.handleModalClose}
          onCancel={this.handleModalClose}
          bodyStyle={{ maxHeight: 600 }}
          cancelButtonProps={{ style: { display: 'none' } }}
        >
          <textarea style={{ width: 550, height: 550 }} readOnly value={this.state.logData} />
        </Modal>
        <StyleDaemonLog>
          <h3 className="pageTitle">{intlObj.get(messages.daemonManage)}</h3>
          <div className="searchBox">
            <label htmlFor="runType">{intlObj.get(messages.runType)}</label>
            <Select
              id="runType"
              value={this.state.runType}
              onChange={this.handleRunTypeSelect}
              style={{ width: 120, marginRight: 10 }}
              dropdownStyle={{ fontSize: 13 }}
            >
              <Option value="">{intlObj.get(messages.lblAll)}</Option>
              <Option value="BATCH">BATCH</Option>
              <Option value="API">API</Option>
            </Select>
            <label htmlFor="successYn">{intlObj.get(messages.successYn)}</label>
            <Select
              id="successYn"
              value={this.state.successYn}
              onChange={this.handleSuccessSelect}
              style={{ width: 120, marginRight: 10 }}
              dropdownStyle={{ fontSize: 13 }}
            >
              <Option value="">{intlObj.get(messages.lblAll)}</Option>
              <Option value="Y">Y</Option>
              <Option value="N">N</Option>
            </Select>
            <RangePicker
              className="RangePicker"
              format={dateFormat}
              ranges={{
                Today: [moment(), moment()],
                'This Month': [moment().startOf('month'), moment().endOf('month')],
              }}
              onChange={this.onPeriodChange}
              showToday
              value={this.state.periodDates !== '' ? this.state.periodDates : null}
              allowClear={false}
              id="n4"
            />
            <StyledButton title={intlObj.get(messages.search)} className="btn-primary" onClick={this.handleClick}>
              {intlObj.get(messages.search)}
            </StyledButton>
          </div>
          <StyleDataGrid className="globalLang">
            <ReactDataGrid
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={daemonLogList.length}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <StyledButton className="btn-light" style={{ float: 'left' }} onClick={this.onClickToList}>
              {intlObj.get(messages.lblList)}
            </StyledButton>
          </div>
        </StyleDaemonLog>
        <Footer />
      </div>
    );
  }
}

DaemonLog.propTypes = {
  getDaemonLogList: PropTypes.func, //eslint-disable-line
  daemonLogList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
};

DaemonLog.defaultProps = {
  daemonLogList: [],
};

const mapDispatchToProps = dispatch => ({
  getDaemonLogList: (daemonId, sortColumn, sortDirection, startDttm, endDttm, runType, successYn) =>
    dispatch(actionTypes.getDaemonLogList(daemonId, sortColumn, sortDirection, startDttm, endDttm, runType, successYn)),
});

const mapStateToProps = createStructuredSelector({
  daemonLogList: selectors.makeSelectDaemonLogList(),
  isLoading: selectors.makeIsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/adminmain/daemon/log', saga });
const withReducer = injectReducer({ key: 'admin/adminmain/daemon/log', reducer });

export default compose(withReducer, withSaga, withConnect)(DaemonLog);
