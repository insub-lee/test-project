import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Select, DatePicker, Input, Button } from 'antd';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

const Options = Select.Option;
const { TextArea } = Input;
const dateFormat = 'YYYY-MM-DD';
const testEmpNum = '99999999';
const LOCK_TABLE = 'FAB_INFORM_NOTICE';

class InformNoticeDetail extends PureComponent {
  constructor(props) {
    super(props);
    const { uid } = this.props.match.params;
    this.state = {
      PARAM_NOTICE: '',
      NOTICE_DT: moment().format(dateFormat),
      PARAM_TYPE: 'D',
      PARAM_U_ID: uid,
      LOCK_TABLE_KEY: uid,
      PARAM_CHANGE_BY: testEmpNum,
      PARAM_EDMS_ID: '',
      LOCK_SABUN: testEmpNum,
      PARAM_BEBER: '',
      PARAM_STAND: '',
      PARAM_ARBPL: '',
      SHIFT: '',
      fabName: '',
      sdptName: '',
    };
    const param = {
      uid,
    };
    this.props.handleLoadingFabParam();
    this.props.handleLoadingNoticeDetail(param);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.informNoticeDetail !== nextProps.informNoticeDetail) {
      this.setState({
        PARAM_NOTICE: nextProps.informNoticeDetail.NOTICE,
        NOTICE_DT: nextProps.informNoticeDetail.NOTICE_DT,
        PARAM_EDMS_ID: nextProps.informNoticeDetail.EDMS_ID,
        PARAM_BEBER: nextProps.informNoticeDetail.BEBER,
        PARAM_STAND: nextProps.informNoticeDetail.STAND,
        PARAM_ARBPL: nextProps.informNoticeDetail.ARBPL,
        SHIFT: nextProps.informNoticeDetail.SHIFT,
        // informNoticeDetail: nextProps.informNoticeDetail,
      });
    }
  }

  componentDidUpdate() {
    if (this.props.saveResult !== '') {
      alert(this.props.saveResult);
      if (this.props.saveResult === '저장되었습니다.') window.close();
    }
  }

  onChangeNotice = (e) => {
    this.setState({
      PARAM_NOTICE: e.target.value,
    });
  }

  handleClose = () => {
    window.close();
  }

  handleSave = () => {
    const { handleInformNoticeSave } = this.props;
    const {
      PARAM_TYPE, PARAM_U_ID, PARAM_NOTICE, PARAM_CHANGE_BY, PARAM_EDMS_ID, LOCK_SABUN, LOCK_TABLE_KEY,
    } = this.state;
    if (PARAM_NOTICE === '') {
      alert('[Notice]는 필수 입력 조건입니다.');
      return;
    }
    /* 인터락 체크
    */
    const param = {
      PARAM_TYPE, PARAM_U_ID, PARAM_NOTICE, PARAM_CHANGE_BY, PARAM_EDMS_ID, LOCK_TABLE, LOCK_SABUN, LOCK_TABLE_KEY,
    };
    /*
      저장 api 호출
    */
    handleInformNoticeSave(param);
  }

  handleFabChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      PARAM_BEBER: event,
      PARAM_STAND: undefined,
      PARAM_ARBPL: undefined,
    });
    const i = this.props.fabList.find(e => e.CODE === event);
    this.setState({
      fabName: i.NAME,
      sdptName: '',
    });
  }

  handleTeamChange = (event) => {
    const { handleLoadingTeamParam } = this.props;
    handleLoadingTeamParam(event);
    this.setState({
      PARAM_STAND: event,
      PARAM_ARBPL: undefined,
    });
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      PARAM_ARBPL: event,
    });
    // const i = this.props.sdptList.find(e => e.CODE === event);
    // this.setState({
    //   sdptName: i.NAME,
    // });
  }

  render() {
    console.log(this.state);
    console.log(this.props);
    if (this.state.PARAM_BEBER !== '' && this.state.fabName === '') {
      this.handleFabChange(this.state.PARAM_BEBER);
      this.handleSdptChange(this.state.PARAM_ARBPL);
    }

    const {
      sdptList,
    } = this.props;
    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">Inform Notice Register</h2>
          <Button className="btn-popup-close" onClick={this.handleClose}>닫기</Button>
        </header>
        <main className="popup-content">
          <table className="data-table">
            <tr>
              <th className="required" >NOTICE DATE</th>
              <td>
                <DatePicker
                  style={{ width: '140px' }}
                  value={moment(this.state.NOTICE_DT)}
                  format={dateFormat}
                  disabled
                />
              </td>
              <th className="required">SDPT</th>
              <td>
                <Select
                  defaultValue={this.state.PARAM_ARBPL}
                  value={this.state.PARAM_ARBPL}
                >
                  { sdptList.map(sdptKey => <Options /* onDeselect, onSelect */ value={sdptKey.CODE}>{sdptKey.NAME}</Options>) }
                </Select>
              </td>
              <th className="required">SHIFT</th>
              <td>
                <Select
                  defaultValue={this.state.SHIFT}
                  value={this.state.SHIFT}
                >
                  <Options value="COMMON">공통사항</Options>
                  <Options value="A">A</Options>
                  <Options value="B">B</Options>
                  <Options value="C">C</Options>
                </Select>
              </td>
            </tr>
            <tr>
              <th>Notice</th>
              <td colSpan="5"><TextArea onChange={this.onChangeNotice} rows={10} value={this.state.PARAM_NOTICE} /></td>
            </tr>
            <tr>
              <th>첨부문서</th>
              <td colSpan="5">
                <Button className="btn-attach-file">첨부파일</Button>
                {/* { this.state.PARAM_EDMS_ID === '' ? '없음' : `id:${this.state.PARAM_EDMS_ID}`} */}
              </td>
            </tr>
          </table>
        </main>
        <footer>
          <div className="btn-group">
            <div className="right">
              <Button
                title="저장"
                type="primary"
                className="btn-apply save"
                onClick={this.handleSave}
              >
                저장
              </Button>
            </div>
          </div>
        </footer>
      </section>
    );
  }
}

InformNoticeDetail.propTypes = {
  handleLoadingNoticeDetail: PropTypes.func.isRequired,
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handleInformNoticeSave: PropTypes.func.isRequired,
  // handlePmSheetSearch: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  sdptList: PropTypes.object,
  informNoticeDetail: PropTypes.object,
  saveResult: PropTypes.string,
  match: PropTypes.object.isRequired,
  // signStatusList: PropTypes.array,
  // pmSheetDataList: PropTypes.array,
};

InformNoticeDetail.defaultProps = {
  fabList: [],
  sdptList: [],
  informNoticeDetail: [],
  saveResult: '',
};

const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  flList: selectors.makeFlList(),
  modelList: selectors.makeModelList(),
  versionList: selectors.makeVersionList(),
  signStatusList: selectors.makeSignStatusList(),
  informNoticeList: selectors.makeInformNoticeList(),
  informNoticeDetail: selectors.makeInformNoticeDetail(),
  saveResult: selectors.makeSaveResult(),
  // pmSheetDataList: selectors.makePmSheetDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handleLoadingNoticeDetail: param => dispatch(actions.informNoticeDetail(param)),
    handleInformNoticeSearch: param => dispatch(actions.informNoticeSearch(param)),
    handleInformNoticeSave: param => dispatch(actions.informNoticeSave(param)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNoticeDetail);
