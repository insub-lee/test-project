import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import { Input, DatePicker, Checkbox } from 'antd';
import Modal from 'react-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import * as feed from 'components/Feedback/functions';

import { Link } from 'react-router-dom';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import { intlObj, lang } from 'utils/commonUtils';
import messages from './messages';

import Select, { SelectOption } from '../../../../../components/Select';
import StyleDataGrid from '../../../components/uielements/dataGrid.style';
import StyleApp from './StyleAppOpinion';
import Footer from '../../../App/Footer';
import { BtnDkGray, BtnLgtGray } from '../../../components/uielements/buttons.style';
import OpposeModal from '../OpinionModal';

import injectReducer from '../../../../../utils/injectReducer';
import injectSaga from '../../../../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import * as selectors from './selectors';
import * as actions from './actions';

const Option = SelectOption;
const dateFormat = 'YYYY-MM-DD';

let pageNum = 20;
const pageIndex = 10;

class SetStatus extends Component {
  render() {
    const status = this.props.value;
    const approv = this.props.dependentValues;

    if (status === 'P') {
      return (
        <div className="progress" title={intlObj.get(messages.doApply)}>
          {lang.get('APP_STATUS', approv)}
        </div>
      );
    } else if (status === 'C') {
      return (
        <div className="progress" title={intlObj.get(messages.doComplete)}>
          {lang.get('APP_STATUS', approv)}
        </div>
      );
    } else if (status === 'R') {
      return (
        <div className="progress" title={intlObj.get(messages.doOppo)}>
          {lang.get('APP_STATUS', approv)}
        </div>
      );
    }
  }
}

class AppOpinion extends Component {
  constructor(prop) {
    super(prop);

    const originalRows = this.props.opiList;
    // const rows = originalRows.slice(0);

    this.state = {
      show: false,
      selectedApp: [],
      selectedIndexes: [],
      originalRows,
      oneDate: '',
      sortType: '',
    };

    this.props.getOpinionData(this.state.sortType, pageNum);
    this.props.getOppoList();
    this.props.getComboList();

    this.onOppose = this.onOppose.bind(this);
    this.unOppose = this.unOppose.bind(this);
    this.onChangeViewType = this.onChangeViewType.bind(this);
    this.searchApp = this.searchApp.bind(this);
    this.onChangeAll = this.onChangeAll.bind(this);
    this.onAccept = this.onAccept.bind(this);
    this.paging = this.paging.bind(this);

    this.columns = [
      {
        key: 'CHECKBOX',
        // name: <Checkbox onChange={this.onChangeAll} />,
        name: '',
        width: 60,
        sortable: false,
        formatter: this.SetCheckbox,
        getRowMetaData: data => data,
      },
      {
        key: 'APV_STATUS_CD',
        name: `${intlObj.get(messages.status)}`,
        width: 80,
        sortable: true,
        formatter: SetStatus,
        getRowMetaData: data => data,
      },
      {
        key: 'NAME_KOR',
        name: `${intlObj.get(messages.requestUser)}`,
        width: 120,
        sortable: true,
        formatter: this.SetName,
        getRowMetaData: data => data,
      },
      {
        key: 'APP_NAME_KOR',
        name: `${intlObj.get(messages.Apps)}`,
        // width: 470,
        // resizable: true,
        sortable: true,
        formatter: this.setApps,
        getRowMetaData: data => data,
      },
      {
        key: 'VER',
        name: `${intlObj.get(messages.AppVersion)}`,
        width: 70,
        sortable: true,
      },
      {
        key: 'SVC_REQ_DT',
        name: `${intlObj.get(messages.doService)}`,
        width: 80,
        sortable: true,
        formatter: this.setDate,
      },
      {
        key: 'REQ_DTTM',
        name: `${intlObj.get(messages.doOpinion)}`,
        width: 80,
        sortable: true,
      },
    ];
  }

  shouldComponentUpdate(nextProps) {
    const {
      opiList,
    } = nextProps;

    if (opiList.length === undefined) {
      return false;
    }
    return true;
  }

  onChangeAll(a) {
    if (a.target.checked === true) {
      // const cList = [];
      const rows = this.props.opiList;

      for (let i = 0; i < rows.length; i += 1) {
        if (rows[i].APV_STATUS_CD === 'P') {
          this.onRowsSelected(rows[i]);
        }
      }

      //   this.onRowsSelected(cList);
    } else {
      this.setState({ selectedApp: [] });
    }
  }

  opposeConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.checkOppo)}`, '', () => this.onOppose());
  }

  onOppose() {
    if (this.state.selectedApp.length > 0) {
      this.setState({
        show: true,
      });
    } else {
      message.warning(
        <MessageContent>
          {intlObj.get(messages.noList)}
        </MessageContent>,
        3,
      );
    }
  }

  onChecked = (sta) => {
    if (sta.target.checked === true) {
      sta.target.value.check = 'true';
      this.onRowsSelected(sta.target.value);
      this.setState({ reload: true });
    } else {
      delete sta.target.value.check;
      this.onRowsDeselected(sta.target.value);
      this.setState({ reload: false });
    }
  }

  onRowsSelected = (rows) => {
    this.state.selectedApp.push([rows.APV_REQ_ID,
    rows.APP_NAME_KOR,
    rows.NAME_KOR,
    rows.VER,
    rows.SVC_REQ_DT,
    rows.EMP_NO,
    rows.APP_ID,
    ]);
  };

  onRowsDeselected = (rows) => {
    const idx = this.state.selectedApp.findIndex(s => s[0] === rows.APV_REQ_ID);
    this.state.selectedApp.splice(idx, 1);
  };

  onChangeViewType(type) {
    this.setState({ sortType: type });

    this.props.getSearchOpinionData(
      type,
      this.state.dateType,
      this.state.oneDate,
      this.state.searchKeyword,
    );
  }

  onOneChange = (date) => {
    const dateForm = this.timeToDate(date);
    this.setState({
      oneDate: dateForm,
    });
  }

  onChangeSearch = (e) => {
    this.setState({ searchKeyword: e.target.value });
  }

  onChangeSearchType = (type) => {
    this.setState({ dateType: type });
  }

  applyConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.checkApply)}`, '', () => this.onAccept());
  }

  onAccept() {
    const id = [];
    const ver = [];
    const date = [];
    const appID = [];
    let chageDate = [];

    this.state.selectedApp.map(list => id.push(list[0]));
    this.state.selectedApp.map(list => ver.push(list[3]));
    this.state.selectedApp.map(list => date.push(list[4]));
    this.state.selectedApp.map(list => appID.push(list[6]));

    for (let i = 0; i < date.length; i += 1) {
      if (date[i] !== undefined) {
        const year = date[i].substring(0, 4);
        const month = date[i].substring(4, 6);
        const day = date[i].substring(6, 8);

        const chDate = year + '.' + month + '.' + day;

        chageDate.push(chDate);
      } else {
        chageDate.push('');
      }
    }

    this.props.acceptApps(id, appID, ver, chageDate);

    this.setState({ selectedApp: [] });
  }

  paging() {
    pageNum += pageIndex;
    this.props.getOpinionData(this.state.sortType, pageNum);
  }

  setApps = (val) => {
    const value = val.dependentValues;

    return (
      <div className="apps">
        <Link
          to={{ pathname: '/store/appMain/AppOpinion/ExaminePage', state: { status: value, oppoList: this.props.oppoList } }}
          title={val.value}
        >
          {val.value}
        </Link>
      </div>
    );
  }

  setDate = (val) => {
    if (val.value !== '') {
      const timestamp = val.value;
      const year = timestamp.substring(0, 4);
      const month = timestamp.substring(4, 6);
      const day = timestamp.substring(6, 8);

      const changeDate = year + '.' + month + '.' + day;

      return (
        <div className="accept">
          {changeDate}
        </div>
      );
    }
    return (
      <div className="accept">
        {intlObj.get(messages.nowAccept)}
      </div>
    );
  }

  SetName = (val) => {
    const empNo = val.dependentValues.EMP_NO;
    return (
      <div title={empNo}>
        <div className="contents">
          {val.value}<br />
          <div className="ellipsis">
            ({empNo})
          </div>
        </div>
      </div>
    );
  };

  SetCheckbox = (val) => {
    const check = val.dependentValues.APV_STATUS_CD;
    if (check === 'P') {
      return (
        <div>
          <div className="contents">
            <Checkbox
              onChange={this.onChecked}
              value={val.dependentValues}
              checked={val.dependentValues.check ? true : false}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="contents">
        </div>
      );
    }
  };

  unOppose(stat) {
    this.setState({
      show: false,
    });

    if (stat === 'true') {
      this.setState({ selectedApp: [] });
    }
  }

  timeToDate = (val) => {
    const timestamp = new Date(val).getTime();
    const todate = ('00'.concat(new Date(timestamp).getDate())).slice(-2);
    const tomonth = ('00'.concat(new Date(timestamp).getMonth() + 1)).slice(-2);
    const toyear = new Date(timestamp).getFullYear();
    const originalDate = `${toyear}${tomonth}${todate}`;
    return originalDate;
  }

  searchApp() {
    this.props.getSearchOpinionData(
      this.state.sortType,
      this.state.dateType,
      this.state.oneDate,
      this.state.searchKeyword,
    );
  }

  render() {
    const list = this.props.opiList;
    const test = this.props.comboList;

    const EmptyData = () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '55vh',
          color: '#404040',
        }}
      >
        <p>{intlObj.get(messages.noAppOpList)}</p>
      </div>
    );

    const rowGetter = (i) => {
      if (list.size === undefined) {
        if (i === pageNum - 1) {
          this.paging();
        }
        return list[i];
      }
    };

    const onRowsSelected = (rows) => {
      this.setState({
        selectedIndexes: this.state.selectedIndexes.concat(rows.map(r => r.rowIdx)),
      });
      for (let i = 0; i < rows.length; i += 1) {
        this.state.selectedApp.push([
          rows[i].row.APV_REQ_ID,
          rows[i].row.APP_NAME_KOR,
          rows[i].row.NAME_KOR]);
      }
    };

    const onRowsDeselected = (rows) => {
      const rowIndexes = rows.map(r => r.rowIdx);
      const empNoArr = rows.map(r => r.row.APV_REQ_ID);
      this.setState({
        selectedIndexes: this.state.selectedIndexes.filter(i => rowIndexes.indexOf(i) === -1),
      });
      for (let i = 0; i < rows.length; i += 1) {
        const idx = this.state.selectedApp.findIndex(s => s[0][0] === empNoArr[i]);
        this.state.selectedApp.splice(idx, 1);
      }
    };

    const handleGridSort = (sortColumn, sortDirection) => {
      const comparer = (a, b) => {
        if (sortDirection === 'ASC') {
          return (a[sortColumn] > b[sortColumn]) ? 1 : -1;
        } else if (sortDirection === 'DESC') {
          return (a[sortColumn] < b[sortColumn]) ? 1 : -1;
        }
      };

      const rows = sortDirection === 'NONE' ? this.state.originalRows.slice(0) : list.sort(comparer);

      this.setState({ rows });
    };

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

    const RenderComboBox = (test) => {
      if (test.length > 0) {
        return (
          <Select
            defaultValue=""
            style={{ width: 120 }}
            onChange={this.onChangeViewType}
          >
            <Option value="">{intlObj.get(messages.all)}</Option>
            {test.map(i => (
              <Option value={i.CODE_CD}>{lang.get('NAME', i)}</Option>
            ))}
          </Select>
        );
      }
    };

    return (
      <div>
        <StyleApp>
          <div className="searchBox">
            {/* <Select
              defaultValue=""
              style={{ width: 120 }}
              onChange={this.onChangeViewType}
            > */}
            {RenderComboBox(test)}

            {/* <Option value="">{intlObj.get(messages.all)}</Option>
              <Option value="P">{intlObj.get(messages.doApply)}</Option>
              <Option value="R">{intlObj.get(messages.doOppo)}</Option>
              <Option value="C">{intlObj.get(messages.doComplete)}</Option>
            </Select> */}


            {/* 오른쪽 */}
            <div style={{ float: 'right' }}>
              <Select
                defaultValue={intlObj.get(messages.selecDate)}
                style={{ width: 130 }}
                onChange={this.onChangeSearchType}
              >
                <Option value="">{intlObj.get(messages.selecDate)}</Option>
                <Option value="S">{intlObj.get(messages.doService)}</Option>
                <Option value="O">{intlObj.get(messages.doOpinion)}</Option>
              </Select>
              <DatePicker
                format={dateFormat}
                //   value={this.state.oneDate}
                onChange={this.onOneChange}
                placeholder="날짜 선택"
                showToday={true}
                style={{ width: 120, margin: ' 0 5px' }}
              />
              <div className="searchWrapper">
                <Input
                  placeholder={intlObj.get(messages.seacrhText)}
                  // title={intlObj.get(messages.search)}
                  maxLength="100"
                  onChange={this.onChangeSearch}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      this.props.getSearchOpinionData(
                        this.state.sortType,
                        this.state.dateType,
                        this.state.oneDate,
                        this.state.searchKeyword,
                      );
                    }
                  }}
                />
                <button
                  title={intlObj.get(messages.search)}
                  className="searchBtn"
                  onClick={this.searchApp}
                />
              </div>
            </div>
          </div>
          <StyleDataGrid>
            {this.props.opiList.size === undefined ?
              <ReactDataGrid
                ref={node => this.grid = node}
                rowKey="APP_ID"
                columns={this.columns}
                rowGetter={rowGetter}
                rowsCount={this.props.opiList.length}
                emptyRowsView={EmptyData}
                onGridSort={handleGridSort}
                rowSelection={{
                  showCheckbox: false,
                  enableShiftSelect: true,
                  onRowsSelected,
                  onRowsDeselected,
                  selectBy: {
                    indexes: this.state.selectedIndexes,
                  },
                }}
              />
              :
              false
            }
          </StyleDataGrid>
          <div className="buttonWrapper">
            <BtnLgtGray style={{ marginRight: 10 }} onClick={this.opposeConfirm} >
              {intlObj.get(messages.doOppo)}
            </BtnLgtGray>
            <BtnDkGray onClick={this.applyConfirm} color="primary">
              {intlObj.get(messages.confirm)}
            </BtnDkGray>
            {/* <BtnDkGray onClick={this.applyConfirm} color="warning" rounded>
              {intlObj.get(messages.confirm)}
            </BtnDkGray> */}
          </div>
          <Modal
            isOpen={this.state.show}
            onRequestClose={this.unOppose}
            contentLabel="Oppose"
            style={customstyle}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            portalClassName="CommonModal"
          >
            <OpposeModal
              selectedApp={this.state.selectedApp}
              closeModal={this.unOppose}
              radioList={this.props.oppoList}
            />
          </Modal>
        </StyleApp>
        <Footer />
      </div>
    );
  }
}

AppOpinion.propTypes = {
};

export function mapDispatchToProps(dispatch) {
  return {
    getOpinionData: (sort, pageNum) => dispatch(actions.getOpinionData(sort, pageNum)),
    getSearchOpinionData: (sortType, dateType, date, keyword) =>
      dispatch(actions.getSearchOpinionData(sortType, dateType, date, keyword)),
    acceptApps: (id, appID, ver, date) => dispatch(actions.acceptApps(id, appID, ver, date)),
    getOppoList: () => dispatch(actions.getOppoList()),
    getComboList: () => dispatch(actions.getComboList()),
  };
}

const mapStateToProps = createStructuredSelector({
  opiList: selectors.makeOpinionList(),
  oppoList: selectors.makeOppoList(),
  comboList: selectors.makeComboList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'opinionList', reducer });
const withSaga = injectSaga({ key: 'opinionList', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppOpinion);
