import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';

import ReactDataGrid from 'react-data-grid';

import { Select, Input, Modal } from 'antd';

import Footer from 'containers/admin/App/Footer';
import StyleDataGrid from 'containers/admin/components/uielements/dataGrid.style.js';
import { LinkBtnDkGray, LinkBtnLgtGray } from 'containers/admin/components/uielements/buttons.style.js';
import StyledButton from 'components/Button/StyledButton.js';
import * as feed from 'components/Feedback/functions';
import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actionTypes from './actions';
import StyleDaemonList from './StyleDaemonList';

import messages from '../messages';

const { Option } = Select;

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

class DaemonList extends React.Component {
  constructor(prop) {
    super(prop);
    this.columns = [
      {
        key: 'DAEMON_ID',
        name: 'ID',
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: `NAME_${lang.getLang()}`,
        name: `${intlObj.get(messages.daemonName)}`,
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter2,
        getRowMetaData: data => data,
      },
      {
        key: 'DAEMON_KEY',
        name: `${intlObj.get(messages.daemoKey)}`,
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'STOP_YN',
        name: `${intlObj.get(messages.stopYn)}`,
        visible: true,
        sortable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'SCHEDULE',
        name: `${intlObj.get(messages.schedule)}`,
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'REG_DTTM',
        name: `${intlObj.get(messages.regDttm)}`,
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'UPD_DTTM',
        name: `${intlObj.get(messages.updDttm)}`,
        visible: true,
        sortable: true,
        resizable: true,
        formatter: this.detailLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'RUN',
        name: `RUN`,
        visible: true,
        sortable: false,
        formatter: this.runLinkFormatter,
        getRowMetaData: data => data,
      },
      {
        key: 'LOG',
        name: `LOG`,
        visible: true,
        sortable: false,
        formatter: this.logLinkFormatter,
        getRowMetaData: data => data,
      },
    ];

    let dtKeyword = '';
    let dtSortColumn = '';
    let dtSortDirection = '';
    let dtStopYn = '';

    // 상세에서 넘어온 Data
    if (this.props.history.location.state !== null && this.props.history.location.state !== undefined) {
      const location = this.props.history.location.state;
      dtKeyword = location.keyword;
      dtSortColumn = location.sortColumn;
      dtSortDirection = location.sortDirection;
      dtStopYn = location.stopYn;
    }

    this.state = {
      keyword: dtKeyword,
      sortColumnParam: dtSortColumn,
      sortDirectionParam: dtSortDirection,
      stopYn: dtStopYn,
    };

    this.props.getDaemonList(this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keyword, this.state.stopYn);
  }

  runLinkFormatter = val => (
    <LinkBtnLgtGray
      onClick={() => feed.showConfirm(`${intlObj.get(messages.startDaemonConfirm)}`, '', () => this.props.startDaemon(val.dependentValues.DAEMON_ID))}
    >
      {intlObj.get(messages.lblRun)}
    </LinkBtnLgtGray>
  );

  logLinkFormatter = val => (
    <LinkBtnDkGray onClick={() => this.handleLogLinkClick(val.dependentValues.DAEMON_ID)}>{intlObj.get(messages.lblLogList)}</LinkBtnDkGray>
  );

  detailLinkFormatter = val => <hltext onClick={() => this.handleDetailLinkClick(val.dependentValues.DAEMON_ID)}>{val.value}</hltext>;

  detailLinkFormatter2 = val => {
    const linkRow = lang.get('NAME', val.dependentValues);
    return <hltext onClick={() => this.handleDetailLinkClick(val.dependentValues.DAEMON_ID)}>{linkRow}</hltext>;
  };

  statusFormatter = val => <format>{statusSwitch(val.dependentValues.STOP_YN)}</format>;

  handleLogLinkClick = daemonId => {
    const data = {
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keyword: this.state.keyword,
      stopYn: this.state.stopYn,
    };
    this.props.history.push({
      pathname: `/admin/adminmain/daemon/log/${daemonId}`,
      state: data,
    });
  };

  handleDetailLinkClick = daemonId => {
    const data = {
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keyword: this.state.keyword,
      stopYn: this.state.stopYn,
    };
    this.props.history.push({
      pathname: `/admin/adminmain/daemon/detail/${daemonId}`,
      state: data,
    });
  };

  // Input 검색값 변경 시
  handleSearch = e => {
    this.setState({ keyword: e.target.value });
  };

  // Input 키 누를 때
  handleKeyPress = e => {
    if (e.key === 'Enter') {
      this.handleClick();
    }
  };

  // rowGetter
  rowGetter = rowNumber => {
    const { daemonList } = this.props;
    return daemonList[rowNumber];
  };

  handleStatusSelect = e => {
    this.setState({ stopYn: e }, () => {
      this.props.getDaemonList(this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keyword, this.state.stopYn);
    });
  };

  // 검색아이콘 클릭 시(조회)
  handleClick = () => {
    this.props.getDaemonList(this.state.sortColumnParam, this.state.sortDirectionParam, this.state.keyword, this.state.stopYn);
  };

  // Grid sort
  handleGridSort = (sortColumn, sortDirection) => {
    this.setState({
      sortColumnParam: sortDirection === 'NONE' ? '' : sortColumn,
      sortDirectionParam: sortDirection === 'NONE' ? '' : sortDirection,
    });

    this.props.getDaemonList(sortColumn, sortDirection, this.state.keyword, this.state.stopYn);
  };

  render() {
    const { daemonList, history } = this.props;
    const initGrid = {
      sortColumnParam: this.state.sortColumnParam,
      sortDirectionParam: this.state.sortDirectionParam,
      keyword: this.state.keyword,
      stopYn: this.state.stopYn,
    };
    return (
      <div>
        <StyleDaemonList>
          <h3 className="pageTitle">{intlObj.get(messages.daemonManage)}</h3>
          <div className="searchBox">
            <Select value={this.state.stopYn} onChange={this.handleStatusSelect} style={{ width: 120, marginRight: 10 }} dropdownStyle={{ fontSize: 13 }}>
              <Option value="N">{intlObj.get(messages.statusWork)}</Option>
              <Option value="Y">{intlObj.get(messages.statusStop)}</Option>
              <Option value="">{intlObj.get(messages.lblAll)}</Option>
            </Select>

            {/* 오른쪽 */}
            <div className="searchWrapper">
              <Input value={this.state.keyword} onChange={this.handleSearch} onKeyPress={this.handleKeyPress} placeholder={intlObj.get(messages.inputSearch)} />
              <button title={intlObj.get(messages.search)} className="searchBtn" onClick={this.handleClick} />
            </div>
          </div>
          <StyleDataGrid className="globalLang">
            <ReactDataGrid
              columns={this.columns.filter(column => column.visible === true)}
              rowGetter={this.rowGetter}
              rowsCount={daemonList.length}
              onGridSort={this.handleGridSort}
              emptyRowsView={EmptyData}
              onRowClick={this.onRowClick}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <StyledButton
              className="btn-primary"
              style={{ float: 'right' }}
              onClick={() => history.push({ pathname: '/admin/adminmain/daemon/daemonReg', state: initGrid })}
            >
              {intlObj.get(messages.lblReg)}
            </StyledButton>
          </div>
        </StyleDaemonList>
        <Footer />
      </div>
    );
  }
}

DaemonList.propTypes = {
  getDaemonList: PropTypes.func, //eslint-disable-line
  startDaemon: PropTypes.func, //eslint-disable-line
  daemonList: PropTypes.array, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  isLoading: PropTypes.bool, //eslint-disable-line
};

DaemonList.defaultProps = {
  daemonList: [],
};

const mapDispatchToProps = dispatch => ({
  getDaemonList: (sortColumn, sortDirection, keyword, stopYn) => dispatch(actionTypes.getDaemonList(sortColumn, sortDirection, keyword, stopYn)),
  startDaemon: daemonId => dispatch(actionTypes.startDaemon(daemonId)),
});

const mapStateToProps = createStructuredSelector({
  daemonList: selectors.makeSelectDaemonList(),
  isLoading: selectors.makeIsLoading(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/adminmain/daemon/list', saga });
const withReducer = injectReducer({ key: 'admin/adminmain/daemon/list', reducer });

export default compose(withReducer, withSaga, withConnect)(DaemonList);
