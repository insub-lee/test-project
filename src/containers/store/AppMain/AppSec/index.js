import React, { Component } from 'react';
import ReactDataGrid from 'react-data-grid';
import PropTypes from 'prop-types';
import { Input, Popover, Checkbox, Button } from 'antd';
import Modal from 'react-modal';
import { intlObj, lang } from 'utils/commonUtils';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Organization from 'containers/portal/components/Organization';
import * as Feed from 'components/Feedback/functions';
import cancelBtn from 'images/bizstore/cancel_button.png';
import reasonBtn from 'images/bizstore/reason_button.png';
import Select, { SelectOption } from '../../../../components/Select';
import messages from './messages';
import StyleDataGrid from '../../components/uielements/dataGrid.style';
import StyleApp from './StyleAppOpinion';
import Footer from '../../App/Footer';
import { BtnDkGray, BtnLgtGray } from '../../components/uielements/buttons.style';
import OpposeModal from './OpinionModal';

import injectReducer from '../../../../utils/injectReducer';
import injectSaga from '../../../../utils/injectSaga';

import reducer from './reducer';
import saga from './saga';

import * as selectors from './selectors';
import * as actions from './actions';

const Option = SelectOption;
let PAGE = 1;
const PAGE_CNT = 20;

class AppSec extends Component {
  constructor(props) {
    super(props);

    const { handleGetAppSecList } = props;

    this.state = {
      show: false,
      type: '',
      selectedApp: [],
      selectedAppCancel: undefined,
      selectedIndexes: [],
      organizationShow: false,
      checkedAll: false, // 그리드 헤더의 전체 체크박스 체크 유무
      columns: undefined,
      rowGetter: undefined,

      SORT_COLUMN: '',
      SORT_DIRECTION: '',
      APP_ID: 0,
      REQ_STATUS_CD: 'A',
      SEARCH_TEXT: '',
    };

    handleGetAppSecList(
      PAGE,
      PAGE_CNT,
      this.state.SORT_COLUMN,
      this.state.SORT_DIRECTION,
      this.state.APP_ID,
      this.state.REQ_STATUS_CD,
      this.state.SEARCH_TEXT,
    );
  }

  shouldComponentUpdate(nextProps) {
    const { appSecList } = nextProps;

    if (!appSecList) {
      return false;
    }

    return true;
  }

  componentDidUpdate(prevProps) {
    const {
      appSecList,
    } = this.props;

    const {
      selectedIndexes,
    } = this.state;

    if (appSecList && prevProps.appSecList && prevProps.appSecList.length !== appSecList.length) {
      selectedIndexes.map((i) => {
        if (appSecList[i - 1]) {
          appSecList[i - 1].check = 'true';
          return appSecList[i - 1];
        }
        return '';
      });
    }

    if (!this.state.columns && !this.state.rowGetter) {
      this.setColumnsAndRowGetter();
    }
  }

  onOppose = (type, selectedAppCancel) => {
    if (type === 'C') {
      this.setState({
        show: true,
        type,
        selectedAppCancel,
      });
    } else {
      this.setState({
        show: true,
        type,
      });
    }
  }

  onModal = () => {
    this.setState({
      organizationShow: true,
    });
  }

  onRowsSelected = (rows) => {
    const {
      selectedIndexes,
      selectedApp,
    } = this.state;

    const {
      appSecList,
    } = this.props;

    this.setState({
      selectedIndexes:
        selectedIndexes.findIndex(i => i === rows.RNUM) === -1 ?
          selectedIndexes.concat(rows.RNUM) : selectedIndexes,
      selectedApp:
        selectedApp.findIndex(i => i.SEC_REQ_ID === rows.SEC_REQ_ID) === -1 ?
          selectedApp.concat(appSecList[rows.RNUM - 1]) : selectedApp,
    });
  };

  onRowsDeselected = (rows) => {
    const {
      selectedIndexes,
      selectedApp,
    } = this.state;

    let index = selectedIndexes.findIndex(i => i === rows.RNUM);
    const selectedIndexesCopy = selectedIndexes.slice();
    selectedIndexesCopy.splice(index, 1);

    index = selectedApp.findIndex(i => i.APP_ID === rows.APP_ID);
    const selectedAppCopy = selectedApp.slice();
    selectedAppCopy.splice(index, 1);

    this.setState({
      selectedIndexes: selectedIndexesCopy,
      selectedApp: selectedAppCopy,
    });
  };

  /* eslint-disable */
  onChecked = (sta) => {
    if (sta.target.checked === true) {
      sta.target.value.check = 'true'
      this.onRowsSelected(sta.target.value);
    } else {
      delete sta.target.value.check;
      this.onRowsDeselected(sta.target.value);
    }
  }
  /* eslint-disable */

  setColumnsAndRowGetter = () => {
    this.setState({
      columns: [
        {
          key: 'CHECKBOX',
          name: <Checkbox
            checked={this.state.checkedAll}
            onChange={this.gridHeaderCheckboxOnChange}
          />,
          width: 60,
          formatter: this.SetCheckbox,
          getRowMetaData: data => data,
        },
        {
          key: 'STATUS',
          name: intlObj.get(messages.status),
          width: 60,
          sortable: true,
        },
        {
          key: 'SEC_CANCEL',
          name: intlObj.get(messages.cancelConfirm),
          width: 60,
          sortable: true,
          formatter: this.SetCancelButton,
          getRowMetaData: data => data,
        },
        {
          key: `NAME_${lang.getLang()}`,
          name: intlObj.get(messages.requestUser),
          width: 120,
          sortable: true,
          formatter: this.SetName,
          getRowMetaData: data => data,
        },
        {
          key: `APP_NAME_${lang.getLang()}`,
          name: intlObj.get(messages.Apps),
          // width: 365,
          sortable: true,
          resizable: true,
        },
        {
          key: 'VER',
          name: intlObj.get(messages.AppVersion),
          width: 85,
          sortable: true,
        },
        {
          key: 'UPD_DTTM',
          name: intlObj.get(messages.lastUpdateDate),
          width: 120,
          sortable: true,
        },
        {
          key: `CONF_USER_NAME_${lang.getLang()}`,
          name: intlObj.get(messages.confirmUser),
          width: 120,
          sortable: true,
          formatter: this.SetConfName,
          getRowMetaData: data => data,
        },
        {
          key: 'COMMENT',
          name: intlObj.get(messages.reason),
          width: 80,
          sortable: true,
          formatter: this.SetReason,
          getRowMetaData: data => data,
        },
      ],
      rowGetter: (i) => {
        if (i === (PAGE * PAGE_CNT) - 1) {
          PAGE += 1;
          this.props.handleGetAppSecList(
            PAGE,
            PAGE_CNT,
            this.state.SORT_COLUMN,
            this.state.SORT_DIRECTION,
            this.state.APP_ID,
            this.state.REQ_STATUS_CD,
            this.state.SEARCH_TEXT,
          );
        }
        return this.props.appSecList[i];
      },
    });
  }
  // 전체 체크박스 선택 후 columns값을 다시 넣어줌
  // react-data-grid가 columns값이 변경되도 바로 적용이 안되는 것 같음
  makeColumns = () => {
    const {
      checkedAll,
    } = this.state;

    return [
      {
        key: 'CHECKBOX',
        name: <Checkbox checked={checkedAll} onChange={this.gridHeaderCheckboxOnChange} />,
        width: checkedAll ? 60 : 60.01, // 이렇게 해야 하는 이유 알수없음..
        formatter: this.SetCheckbox,
        getRowMetaData: data => data,
        forceUpdate: true,
      },
      {
        key: 'STATUS',
        name: intlObj.get(messages.status),
        width: 60,
        sortable: true,
      },
      {
        key: 'SEC_CANCEL',
        name: intlObj.get(messages.cancelConfirm),
        width: 60,
        sortable: true,
      },
      {
        key: `NAME_${lang.getLang()}`,
        name: intlObj.get(messages.requestUser),
        width: 120,
        sortable: true,
        formatter: this.SetName,
        getRowMetaData: data => data,
      },
      {
        key: `APP_NAME_${lang.getLang()}`,
        name: intlObj.get(messages.Apps),
        // width: 365,
        sortable: true,
        resizable: true,
      },
      {
        key: 'VER',
        name: intlObj.get(messages.AppVersion),
        width: 85,
        sortable: true,
      },
      {
        key: 'UPD_DTTM',
        name: intlObj.get(messages.lastUpdateDate),
        width: 120,
        sortable: true,
      },
      {
        key: `CONF_USER_NAME_${lang.getLang()}`,
        name: intlObj.get(messages.confirmUser),
        width: 120,
        sortable: true,
        formatter: this.SetConfName,
        getRowMetaData: data => data,
      },
      {
        key: 'COMMENT',
        name: intlObj.get(messages.reason),
        width: 80,
        sortable: true,
        formatter: this.SetReason,
        getRowMetaData: data => data,
      },
    ];
  }

  /* eslint-disable */
  // 전체 체크박스 체크
  checkAll = () => {
    const {
      appSecList,
    } = this.props;

    const selectedIndexesArr = [];
    const selectedAppArr = [];
    appSecList.map((item) => {
      if (item.REQ_STATUS_CD === 'P') {
        selectedIndexesArr.push(item.RNUM);
        selectedAppArr.push(item);
        item.check = true;
      }
    });

    this.setState({
      selectedIndexes: selectedIndexesArr,
      selectedApp: selectedAppArr,
    });
  }
  /* eslint-disable */

  /* eslint-disable */
  // 전체 체크박스 체크를해제
  notCheckAll = () => {
    const {
      appSecList,
    } = this.props;

    appSecList.map((item) => {
      delete item.check;
    });

    this.setState({
      selectedIndexes: [],
      selectedApp: [],
    });
  }
  /* eslint-disable */

  // 헤더의 전체 체크박스 클릭 이벤트
  gridHeaderCheckboxOnChange = () => {
    const {
      checkedAll,
      rowGetter,
    } = this.state;

    this.setState({
      checkedAll: !checkedAll,
    }, () => {
      if (this.state.checkedAll) {
        this.checkAll();
      } else {
        this.notCheckAll();
      }

      this.setState({
        columns: this.makeColumns(),
        rowGetter,
      });
    });
  }

  unOppose = () => {
    this.setState({
      show: false,
    });
  }

  confirmOnClick = (loadingSet) => {
    const {
      selectedApp,
    } = this.state;
    const {
      handleConfirmRequest,
    } = this.props;

    Feed.showConfirm(intlObj.get(messages.confirmReq), intlObj.get(messages.commentConfirmReq), () => {
      const REQ_ID_ARR = selectedApp.map(app => app.SEC_REQ_ID);

      handleConfirmRequest(REQ_ID_ARR, loadingSet);
    });
  }

  handleClickToMoveToSite = (profile, type) => { //eslint-disable-line
    switch (type) {
      case 'org':
        this.setState({
          userProfile: profile,
        }, () => {
          this.onModal();
        });
        break;
      // case 'talk':
      //   window.open(`http://cube.skhynix.com/web/BizWorks/Default.jsp?type=DM&empno=${profile.EMP_NO}`);
      //   break;
      // case 'mail':
      //   window.open(`https://email.skhynix.com/WOW/MailA/Message/AddNewMessage.aspx?a=New&to=${profile.EMAIL}`);
      //   break;
      // case 'todo':
      //   window.open(`http://schedule.skhynix.com/task/AddTask.aspx?a=New&exuserid=${profile.EMP_NO}`);
      //   break;
      // case 'hithanks':
      //   window.open(`http://thanks.skhynix.com/front/TR/ht_thanks_proc_pop.do?recvMemId=${profile.EMP_NO}`);
      //   break;
      default:
        alert('준비중입니다.');
        return false;
    }
  }

  closeModal = () => {
    this.setState({
      organizationShow: false,
    });
  }

  SetCheckbox = (val) => {
    const reqStatusCd = val.dependentValues.REQ_STATUS_CD;
    // 요청 상태가 '신청'인 항목에 대해서만 체크박스 생성
    if (reqStatusCd === 'P') {
      return (
        <Checkbox
          checked={val.dependentValues.check}
          onChange={this.onChecked}
          value={val.dependentValues}
        />
      );
    } else {
      return (
        <Checkbox
          checked={val.dependentValues.check}
          onChange={this.onChecked}
          value={val.dependentValues}
          disabled={true}
        />
      );
    }
    return '';
  }

  SetName = val =>
    (
      <Popover
        placement="rightTop"
        content={(
          <div>
            <ul className="userProfileMenuList">
              <li><Button onClick={() => this.handleClickToMoveToSite({ USER_ID: val.dependentValues.USER_ID }, 'org')} type="button" className="highlight icon-info">{intlObj.get(messages.userProfile)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite(val.dependentValues, 'talk')} type="button" className="icon-talk">{intlObj.get(messages.sendToCube)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite(val.dependentValues, 'mail')} type="button" className="icon-mail">{intlObj.get(messages.sendToMail)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite(val.dependentValues, 'todo')} type="button" className="icon-todo">{intlObj.get(messages.todoRegist)}</Button></li>
              {/* <li><Button onClick={() => this.handleClickToMoveToSite(val.dependentValues, 'hithanks')} type="button" className="icon-hithanks">{intlObj.get(messages.hyThanks)}</Button></li> */}
            </ul>
          </div>
        )}
        trigger="hover"
        overlayClassName="userProfileMenu"
      >
        <span style={{ cursor: 'pointer' }}>{lang.get('NAME', val.dependentValues)}</span>
      </Popover>
    )

  SetCancelButton = val => {
    if (val.dependentValues.REQ_STATUS_CD === 'C') {
      return (
        <span
          style={{
            backgroundImage: `url(${cancelBtn})`,
            width: '40px',
            height: '22px',
            display: 'block',
            cursor: 'pointer'
          }}
          title={intlObj.get(messages.cancelConfirm)}
          onClick={() => this.onOppose('C', val.dependentValues)}
          onKeyUp={(e) => { if (e.keyCode === 13) this.onOppose('C', val.dependentValues); }}
          role="button"
          tabIndex="0"
        ></span>
      );
    }

    return '';
  }

  SetConfName = val =>
    (
      <Popover
        placement="rightTop"
        content={(
          <div>
            <ul className="userProfileMenuList">
              <li><Button onClick={() => this.handleClickToMoveToSite({ USER_ID: val.dependentValues.CONF_USER_USER_ID }, 'org')} type="button" className="highlight icon-info">{intlObj.get(messages.userProfile)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite({ EMP_NO: val.dependentValues.CONF_USER_EMP_NO }, 'talk')} type="button" className="icon-talk">{intlObj.get(messages.sendToCube)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite({ EMAIL: val.dependentValues.CONF_USER_EAMIL }, 'mail')} type="button" className="icon-mail">{intlObj.get(messages.sendToMail)}</Button></li>
              <li><Button onClick={() => this.handleClickToMoveToSite({ EMP_NO: val.dependentValue.CONF_USER_EMP_NO }, 'todo')} type="button" className="icon-todo">{intlObj.get(messages.todoRegist)}</Button></li>
              {/* <li><Button onClick={() => this.handleClickToMoveToSite({ EMP_NO: val.dependentValues.CONF_USER_EMP_NO }, 'hithanks')} type="button" className="icon-hithanks">{intlObj.get(messages.hyThanks)}</Button></li> */}
            </ul>
          </div>
        )}
        trigger="hover"
        overlayClassName="userProfileMenu"
      >
        <span style={{ cursor: 'pointer' }}>{lang.get('CONF_USER_NAME', val.dependentValues)}</span>
      </Popover>
    )

  SetReason = val => {
    return (
      <Popover
        placement="bottomRight"
        content={
          <div>
            {val.dependentValues.REQ_STATUS_CD === 'P' ? intlObj.get(messages.requestReason) : val.dependentValues.REQ_STATUS_CD === 'R' ? intlObj.get(messages.returnReason) : intlObj.get(messages.confirmReason)}
            &nbsp;:&nbsp;
            {val.dependentValues.REQ_STATUS_CD === 'P' ? val.dependentValues.CONTENT : val.dependentValues.COMNT}
          </div>
        }
        trigger="click">
        <span
          style={{
            backgroundImage: `url(${reasonBtn})`,
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            height: '15px',
            display: 'block',
            cursor: 'pointer',
          }}
          title={intlObj.get(messages.reason)}
        ></span>
      </Popover>
    );
  }

  render() {
    const {
      appSecList,
      appAuthCnl,
      handleGetAppSecList,
      handleReturnRequest,
      handleCancelRequest,
    } = this.props;
    const {
      selectedAppCancel,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
      type,

      organizationShow,
      userProfile,
    } = this.state;

    const loadingSet = {
      PAGE,
      PAGE_CNT,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
    };

    const EmptyData = () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: 'calc(100vh - 306px)',
          color: '#404040',
        }}
      >
        <p>{intlObj.get(messages.search)}</p>
      </div>
    );

    const handleGridSort = (sortColumn, sortDirection) => {
      this.setState({
        SORT_COLUMN: sortColumn,
        SORT_DIRECTION: sortDirection,
      }, () => {
        handleGetAppSecList(
          PAGE,
          PAGE_CNT,
          sortColumn,
          sortDirection,
          APP_ID,
          REQ_STATUS_CD,
          SEARCH_TEXT,
        );
      });
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

    const selectboxStatusOnChange = (v) => {
      this.setState({
        REQ_STATUS_CD: v,
        selectedIndexes: [],
        selectedApp: [],
      });
      handleGetAppSecList(PAGE, PAGE_CNT, SORT_COLUMN, SORT_DIRECTION, APP_ID, v, SEARCH_TEXT);
    };

    const handleKeyPress = (val) => {
      if (val.key === 'Enter') {
        PAGE = 1;
        handleGetAppSecList(
          PAGE,
          PAGE_CNT,
          SORT_COLUMN,
          SORT_DIRECTION,
          APP_ID,
          REQ_STATUS_CD,
          SEARCH_TEXT,
        );
      }
    };

    const onChangeSearch = (val) => {
      this.setState({
        SEARCH_TEXT: val.target.value,
      });
    };

    const searchOnClick = () => {
      PAGE = 1;
      handleGetAppSecList(
        PAGE,
        PAGE_CNT,
        SORT_COLUMN,
        SORT_DIRECTION,
        APP_ID,
        REQ_STATUS_CD,
        SEARCH_TEXT,
      );
    };

    return (
      <div>
        <Organization
          show={organizationShow}
          closeModal={this.closeModal}
          isModal={true}
          isProfile={true}
          userProfile={userProfile}
        />
        <StyleApp>
          <div className="searchBox">
            <Select
              defaultValue="A"
              style={{ width: 130 }}
              onChange={selectboxStatusOnChange}
            >
              <Option value="A">{intlObj.get(messages.all)}</Option>
              <Option value="P">{intlObj.get(messages.request)}</Option>
              <Option value="C">{intlObj.get(messages.confirm)}</Option>
              <Option value="R">{intlObj.get(messages.return)}</Option>
              {/* 취소는 REQ_STATUS_CD가 뭐지? */}
              <Option value="N">{intlObj.get(messages.cancel)}</Option>
            </Select>

            {/* 오른쪽 */}
            <div className="searchWrapper">
              <Input
                placeholder={intlObj.get(messages.inputKeyword)}
                title={intlObj.get(messages.search)}
                maxLength="100"
                onChange={onChangeSearch}
                onKeyPress={handleKeyPress}
              />
              <button
                title={intlObj.get(messages.search)}
                className="searchBtn"
                onClick={searchOnClick}
              />
            </div>
          </div>
          <StyleDataGrid>
            <ReactDataGrid
              columns={this.state.columns ? this.state.columns : []}
              rowGetter={this.state.rowGetter ?
                this.state.rowGetter :
                () => appSecList[0]}
              rowsCount={appSecList.length}
              emptyRowsView={EmptyData}
              onGridSort={handleGridSort}
              className="appSec"
              minHeight={window.innerHeight - 270}
            />
          </StyleDataGrid>
          <div className="buttonWrapper">
            <BtnLgtGray style={{ marginRight: 10 }} onClick={() => this.onOppose('R')} >
              {intlObj.get(messages.return)}
            </BtnLgtGray>
            <BtnDkGray onClick={() => { this.confirmOnClick(loadingSet); }}>
              {intlObj.get(messages.confirm)}
            </BtnDkGray>
          </div>
          <Modal
            isOpen={this.state.show}
            onRequestClose={this.unOppose}
            contentLabel="Oppose"
            style={customstyle}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            portalClassName="CommonModal"
          >{/* 비즈스토어 react-modal에서 portalClassName은 'CommonModal'입니다. */}
            <OpposeModal
              selectedApp={this.state.selectedApp}
              selectedAppCancel={selectedAppCancel}
              appAuthCnl={appAuthCnl ? appAuthCnl.response.appAuthCnl : undefined}
              closeModal={this.unOppose}
              handleReturnRequest={handleReturnRequest}
              handleCancelRequest={handleCancelRequest}
              loadingSet={loadingSet}
              type={type}
            />
          </Modal>
        </StyleApp>
        <Footer />
      </div>
    );
  }
}

AppSec.propTypes = {
  appSecList: PropTypes.array.isRequired,
  appAuthCnl: PropTypes.array.isRequired,

  handleGetAppSecList: PropTypes.func.isRequired,
  handleReturnRequest: PropTypes.func.isRequired,
  handleCancelRequest: PropTypes.func.isRequired,
  handleConfirmRequest: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetAppSecList: (
      page,
      pageCnt,
      SORT_COLUMN,
      SORT_DIRECTION,
      APP_ID,
      REQ_STATUS_CD,
      SEARCH_TEXT,
    ) =>
      dispatch(actions.getAppSecList(
        page,
        pageCnt,
        SORT_COLUMN,
        SORT_DIRECTION,
        APP_ID,
        REQ_STATUS_CD,
        SEARCH_TEXT,
      )),
    handleReturnRequest: (
      REQ_ID_ARR,
      COMMENT,
      loadingSet,
    ) =>
      dispatch(actions.returnRequest(REQ_ID_ARR, COMMENT, loadingSet)),
    handleCancelRequest: (
      REQ_ID,
      COMMENT,
      loadingSet,
    ) =>
      dispatch(actions.cancelRequest(REQ_ID, COMMENT, loadingSet)),
    handleConfirmRequest: (
      REQ_ID_ARR,
      loadingSet,
    ) =>
      dispatch(actions.confirmRequest(REQ_ID_ARR, loadingSet)),
  };
}

const mapStateToProps = createStructuredSelector({
  appSecList: selectors.makeAppSecList(),
  appAuthCnl: selectors.makeAppAuthCnl(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'appSec', reducer });
const withSaga = injectSaga({ key: 'appSec', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppSec);
