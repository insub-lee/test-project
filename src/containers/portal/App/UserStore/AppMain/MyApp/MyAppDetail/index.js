import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';

import * as feed from 'components/Feedback/functions';
import { Radio, Input, Tabs } from 'antd';
import { Link } from 'react-router-dom';

import { injectIntl } from 'react-intl';
import { intlObj, lang } from 'utils/commonUtils';
import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import AntRadiobox from 'containers/store/components/uielements/radiobox.style';
import ModalDrag from 'components/ModalDrag';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleMyAppDetail from './StyleMyAppDetail';
// import StyleStatusTable from './StyleStatusTable';
import { LinkBtnList, LinkBtnUpdate, BtnGray, BtnDkGray, BtnLgtGray } from '../../../components/uielements/buttons.style';

import Modals from '../../../../../../../components/Modal';
import ModalStyle from '../../../components/Modal/StyleModal';
import WithDirection from 'config/withDirection';
// import AppDetail from '../AppDetail';
// import AppExaModal from '../AppExaModal';
import messages from '../messages';
import AppDetailForm from '../AppDetailForm';
import AppDetailUserForm from '../AppDetailUserForm';
import AppExaForm from '../AppExaForm';
import Footer from '../../../Footer';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const RadioGroup = AntRadiobox(Radio.Group);
const { TextArea } = Input;
const { TabPane } = Tabs;

class MyAppDetail extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      ModalVisible: false,
      // appExaShow: false,
      stopReason: '1',
      reasonText: '',
      APV_STATUS_CODE: '',
      APP_ID: prop.match.params.APP_ID,
      VER: prop.match.params.VER,
      tabNum: '1',
    };
    this.props.getMyAppDetail(this.state.APP_ID, this.state.VER);
    window.scrollTo(0, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      APV_STATUS_CODE: nextProps.appinfo.APV_STATUS_CODE,
    });
  }

  // componentDidUpdate(prevProps, prevState) { //eslint-disable-line
  //   if (this.props.serviceStopOk !== prevProps.serviceStopOk) {
  //     this.state.ModalVisible = false;
  //     this.props.history.push('/store/appMain/MyApp');
  //   }
  // }

  managerPop = () => {
    feed.success('개발 예정인 기능 입니다.');
  };

  serviceStopGo = () => {
    // this.setState({ ModalVisible: true });
    this.props.serviceStop(this.state.APP_ID, this.state.VER, this.state.stopReason, this.state.reasonText, this.props.history);
  };

  modalHandleChk = () => {
    feed.showConfirm(`${intlObj.get(messages.serviceStopYn)}`, '', this.serviceStopGo);
  };

  modalHandleOk = () => {
    if (this.state.stopReason === '4' && this.state.reasonText.replace(/(\s*)/g, '').length === 0) {
      message.error(<MessageContent>{intlObj.get(messages.stopReasonChk)}</MessageContent>, 3);
    } else {
      this.modalHandleChk();
    }
  };
  /* eslint-disable */
  handleTabClicks = activeKey => {
    this.setState({
      tabNum: activeKey === '3' ? '1' : activeKey,
    });
  };
  render() {
    const { VER, APP_ID, APV_STATUS_CODE, tabNum } = this.state;

    const modalHandleCancel = () => {
      this.setState({ ModalVisible: false });
    };
    // const appExaModalHandleOk = () => {
    //   this.setState({ appExaShow: true });
    // };

    // const appExaModalHandleCancel = () => {
    //   this.setState({ appExaShow: false });
    // };
    const serviceStopOpen = () => {
      this.setState({ ModalVisible: true });
    };
    const serviceOpen = () => {
      this.props.serviceRestart(APP_ID, VER, this.props.history);
    };
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const onChangeStopReason = e => {
      this.setState({
        stopReason: e.target.value,
      });
      if (e.target.value !== '4') {
        this.setState({
          reasonText: '',
        });
      }
    };
    const onChangeReasonText = val => {
      this.setState({ reasonText: val.target.value });
    };
    const loopStopList = data =>
      data.map(item => (
        <Radio value={item.CODE_CD} key={item.CODE_CD} style={radioStyle}>
          {lang.get('NAME', item)}
          {item.CODE_CD === '4' ? (
            <TextArea
              placeholder={intlObj.get(messages.serviceStopMent1)}
              // readOnly={this.state.stopReason === '4' ? '' : 'readOnly'}
              disabled={this.state.stopReason === '4' ? '' : true}
              maxLength="1000"
              onChange={onChangeReasonText}
              defaultValue={this.state.reasonText}
            />
          ) : (
            ''
          )}
        </Radio>
      ));
    return (
      <div
        style={{
          display: 'flex',
          flexFlow: 'column',
          backgroundColor: '#f7f8f9',
          minHeight: 'calc(100vh - 42px)',
        }}
      >
        {/* <AppExaModal
          show={this.state.appExaShow}
          closeModal={appExaModalHandleCancel}
          APP_ID={this.state.APP_ID}
          VER={this.state.VER}
          history={this.props.history}
        /> */}
        <Modal
          visible={this.state.ModalVisible}
          // title={intlObj.get(messages.serviceStopMent2)}
          title={<ModalDrag title={intlObj.get(messages.serviceStopMent2)} num={0} />}
          onOk={this.modalHandleOk}
          onCancel={modalHandleCancel}
          maskClosable={false}
          centered
          footer={[
            <BtnLgtGray key="back" onClick={modalHandleCancel}>
              {intlObj.get(messages.cancel)}
            </BtnLgtGray>,
            <BtnDkGray
              key="submit"
              loading={this.state.loading}
              onClick={this.modalHandleOk}
              // className={this.state.qnaOn ? '' : 'disabled'}
            >
              {intlObj.get(messages.confirm)}
            </BtnDkGray>,
          ]}
          className="storeModal serviceStop"
        >
          <p className="targetApp">
            <span className="title">{intlObj.get(messages.serviceStopMent3)}</span>
            {lang.get('NAME', this.props.appinfo)}
          </p>
          <div className="grayBox">
            <p>{intlObj.get(messages.serviceStopMent4)}</p>
            <RadioGroup onChange={onChangeStopReason} value={this.state.stopReason} style={{ width: '100%' }}>
              {loopStopList(this.props.serviceStopCodeList)}
            </RadioGroup>
          </div>
        </Modal>
        <StyleMyAppDetail>
          {/* 심사완료 */}
          <div style={{ display: APV_STATUS_CODE === 'NC' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.appReviewCompleted)}</span>
            </h1>
          </div>
          {/* 반려 */}
          <div style={{ display: APV_STATUS_CODE === 'R' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.searchTypeR)}</span>
            </h1>
          </div>
          {/* 심사 중 */}
          <div style={{ display: APV_STATUS_CODE === 'P' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.appReview)}</span>
            </h1>
          </div>
          {/* APP 임시저장 */}
          <div style={{ display: APV_STATUS_CODE === 'N' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.temporarySave)}</span>
            </h1>
          </div>
          {/* Service 중 */}
          <div style={{ display: APV_STATUS_CODE === 'S' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.appService)}</span>
            </h1>
          </div>
          {/* 중지 */}
          <div style={{ display: APV_STATUS_CODE === 'C' ? 'block' : 'none' }}>
            <h1 className="pageTitle">
              {lang.get('NAME', this.props.appinfo)}
              <span className="currentState">{intlObj.get(messages.stopAppService)}</span>
            </h1>
          </div>
          {/* App 정보 */}
          <Tabs defaultActiveKey="1" onTabClick={this.handleTabClicks}>
            <TabPane tab={intlObj.get(messages.tab1)} key="1">
              <AppDetailForm APP_ID={this.state.APP_ID} VER={this.state.VER} history={this.props.history} mod={1} />
            </TabPane>
            <TabPane tab={intlObj.get(messages.tab2)} key="2">
              <AppDetailUserForm APP_ID={this.state.APP_ID} VER={this.state.VER} history={this.props.history} mod={1} />
            </TabPane>
            <TabPane tab={intlObj.get(messages.tab3)} key="3">
              <AppExaForm APP_ID={this.state.APP_ID} VER={this.state.VER} EXA_MODE="D" history={this.props.history} />
            </TabPane>
          </Tabs>
          {/* 반려 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'NC' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
          </div>
          {/* 반려 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'R' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
            <div className="alignRight">
              <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/U/${APP_ID}/${VER}/${tabNum}/${APV_STATUS_CODE}`}>
                <BtnGray>{intlObj.get(messages.Modified)}</BtnGray>
              </Link>
              {/* <BtnDkGray
                onClick={appExaModalHandleOk}
              >
                {intlObj.get(messages.examinReq)}
              </BtnDkGray> */}
            </div>
          </div>
          {/* 심사 중 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'P' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
          </div>
          {/* 임시저장 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'N' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
            <div className="alignRight">
              <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/U/${APP_ID}/${VER}/${tabNum}/${APV_STATUS_CODE}`}>
                <BtnGray>{intlObj.get(messages.Modified)}</BtnGray>
              </Link>
              {/* <BtnDkGray
                onClick={appExaModalHandleOk}
              >
                {intlObj.get(messages.examinReq)}
              </BtnDkGray> */}
            </div>
          </div>
          {/* Service 중 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'S' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
            <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/V/${APP_ID}/${VER}/1/${APV_STATUS_CODE}`}>
              <LinkBtnUpdate>{intlObj.get(messages.verUpdate)}</LinkBtnUpdate>
            </Link>
            <div className="alignRight">
              <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/U/${APP_ID}/${VER}/${tabNum}/${APV_STATUS_CODE}`}>
                <BtnGray>{intlObj.get(messages.Modified)}</BtnGray>
              </Link>
              <BtnDkGray onClick={serviceStopOpen}>{intlObj.get(messages.stop)}</BtnDkGray>
            </div>
          </div>
          {/* 중지 */}
          <div className="buttonsWrapper bottom" style={{ display: APV_STATUS_CODE === 'C' ? 'block' : 'none' }}>
            <Link to="/portal/store/appMain/MyApp">
              <LinkBtnList>{intlObj.get(messages.list)}</LinkBtnList>
            </Link>
            <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/V/${APP_ID}/${VER}/1/${APV_STATUS_CODE}`}>
              <LinkBtnUpdate>{intlObj.get(messages.verUpdate)}</LinkBtnUpdate>
            </Link>
            <div className="alignRight">
              <Link to={`/portal/store/appMain/MyApp/MyAppUpdate/U/${APP_ID}/${VER}/${tabNum}/${APV_STATUS_CODE}`}>
                <BtnGray>{intlObj.get(messages.Modified)}</BtnGray>
              </Link>
              <BtnDkGray onClick={serviceOpen}>{intlObj.get(messages.serviceOpen)}</BtnDkGray>
            </div>
          </div>
        </StyleMyAppDetail>
        <Footer />
      </div>
    );
  }
}

MyAppDetail.propTypes = {
  getMyAppDetail: PropTypes.func, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  appinfo: PropTypes.object, //eslint-disable-line
  serviceStop: PropTypes.func, //eslint-disable-line
  serviceStopCodeList: PropTypes.array, //eslint-disable-line
  // serviceStopOk: PropTypes.bool, //eslint-disable-line
  serviceRestart: PropTypes.func, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  getMyAppDetail: (APP_ID, VER) => {
    dispatch(actions.getMyAppDetail(APP_ID, VER));
  },
  serviceStop: (stopReason, reasonText, APP_ID, VER, history) => {
    dispatch(actions.serviceStop(stopReason, reasonText, APP_ID, VER, history));
  },
  serviceRestart: (APP_ID, VER, history) => {
    dispatch(actions.serviceRestart(APP_ID, VER, history));
  },
});

const mapStateToProps = createStructuredSelector({
  appinfo: selectors.makeSelectAppinfo(),
  serviceStopCodeList: selectors.makeSelectServiceStopCodeList(),
  // serviceStopOk: selectors.makeSelectServiceServiceStopOk(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'MyAppDetail', saga });
const withReducer = injectReducer({ key: 'MyAppDetail', reducer });
/* eslint-disable */
export default injectIntl(
  compose(
    withReducer,
    withSaga,
    withConnect,
  )(MyAppDetail),
);
