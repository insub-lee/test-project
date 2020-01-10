import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { Tabs } from 'antd';
import { Link } from 'react-router-dom';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as feed from 'components/Feedback/functions';

import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { intlObj } from 'utils/commonUtils';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import messages from '../Opinion/messages';

import StyleMyAppDetail from '../Opinion/StyleMyAppDetail';
import StyleStatusTable from '../../MyApp/AppDetailForm/StyleStatusTable';
// import StyleMyAppDetail from '../../MyApp/AppDetail/StyleMyAppDetail';
// import StyleStatusTable from '../../MyApp/AppDetail/StyleStatusTable';

import reducer from '../Opinion/reducer';
import saga from '../Opinion/saga';

// import * as selectors from '../selectors';
import * as actions from '../Opinion/actions';

// import AppDetail from '../../MyApp/AppDetail';
import AppDetailForm from '../../MyApp/AppDetailForm';
import AppDetailUserForm from '../../MyApp/AppDetailUserForm';

import OpposeModal from '../OpinionModal';
import { BtnDkGray, BtnLgtGray, LinkBtnList } from '../../../components/uielements/buttons.style';

const { TabPane } = Tabs;

class ExaminePage extends Component {
  constructor(prop) {
    super(prop);

    this.state = {
      show: false,
    };

    this.onOppose = this.onOppose.bind(this);
    this.unOppose = this.unOppose.bind(this);
    this.onAccept = this.onAccept.bind(this);
  }

  onAccept() {
    const item = this.props.location.state.status;
    const id = [];
    const appID = [];
    const ver = [];
    const date = [];
    const chageDate = [];

    id.push(item.APV_REQ_ID);
    appID.push(item.APP_ID);
    ver.push(item.VER);
    date.push(item.SVC_REQ_DT);

    if (date[0] !== undefined) {
      const year = date[0].slice(0, 4);
      const month = date[0].slice(4, 6);
      const day = date[0].slice(6, 8);
      chageDate.push(`${year}.${month}.${day}`);
      // chageDate.push(date[0].replace(/\//gi, '.'));
    } else {
      chageDate.push('');
    }

    this.props.acceptApps(id, appID, ver, chageDate);

    message.success(<MessageContent>{intlObj.get(messages.doAccept)}</MessageContent>, 3);
  }

  onOppose() {
    this.setState({ show: true });
  }

  unOppose() {
    this.setState({ show: false });
  }

  applyConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.checkApply)}`, '', () => this.onAccept());
  };

  opposeConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.checkOppo)}`, '', () => this.onOppose());
  };

  render() {
    let value = {};
    let ID = '';
    const list = [];

    if (this.props.location.state) {
      value = this.props.location.state.status;

      ID = value.APP_ID.toString();

      list.push([value.APV_REQ_ID, value.APP_NAME_KOR, value.NAME_KOR, value.VER, value.SVC_REQ_DT, value.NAME_ENG, value.APP_ID]);
    }

    // const onBack = () => {
    //   this.props.history.goBack();
    // };

    // const customstyle = {
    //   content: {
    //     width: 840,
    //     height: 470,
    //     // top: '50%',
    //     // left: '50%',
    //     // transform: 'translate(-50%, -50%)',
    //     marginTop: '-235px',
    //     marginLeft: '-420px',
    //     overflow: 'hidden',
    //   },
    // };

    const data = this.props.location.state !== undefined ? this.props.location.state : '';
    const result = this.props.location.state !== undefined ? this.props.location.state.status : '';
    const status = this.props.location.state !== undefined ? this.props.location.state.status.APV_STATUS_CD : '';

    return (
      <div
        className="content"
        style={{
          display: 'flex',
          flexFlow: 'column',
          backgroundColor: '#f7f8f9',
          minHeight: 'calc(100vh - 42px)',
        }}
      >
        <StyleMyAppDetail>
          {status === 'P' ? (
            <div>
              <h1 className="pageTitle">{intlObj.get(messages.appApply)}</h1>
              <StyleStatusTable>
                <h4>{intlObj.get(messages.testPage)}</h4>
                <p className="textValue">{result.CONTENT}</p>
              </StyleStatusTable>
            </div>
          ) : (
            false
          )}
          {status === 'R' ? (
            <div>
              <h1 className="pageTitle">{intlObj.get(messages.appOppo)}</h1>
              <StyleStatusTable>
                <h4>Comments</h4>
                <p className="textValue">
                  {result.NAME_KOR} {result.EMP_NO}
                  <br />
                  <span className="mainColor">{result.COMNT}</span>
                </p>
              </StyleStatusTable>
            </div>
          ) : (
            false
          )}
          {status === 'C' ? (
            <div>
              <h1 className="pageTitle">{intlObj.get(messages.completeApply)}</h1>
              <StyleStatusTable>
                <h4>{intlObj.get(messages.testPage)}</h4>
                <p className="textValue">{result.CONTENT}</p>
                <h4>Comments</h4>
                <p className="textValue">
                  {result.NAME_KOR} {result.EMP_NO}
                  <br />
                  <span className="mainColor">{result.COMNT === ' ' ? intlObj.get(messages.completeApply) : result.COMNT}</span>
                </p>
              </StyleStatusTable>
            </div>
          ) : (
            false
          )}
          <div className="buttonsWrapper top">
            <Link to="/portal/store/appMain/AppOpinion" style={{ float: 'left' }}>
              <LinkBtnList>{intlObj.get(messages.toList)}</LinkBtnList>
            </Link>
            {/* <BtnLgtGray onClick={onBack}>{intlObj.get(messages.toList)}</BtnLgtGray> */}
            {status === 'P' ? (
              <div className="alignRight">
                <BtnLgtGray onClick={this.opposeConfirm}>{intlObj.get(messages.doOppo)}</BtnLgtGray>
                <BtnDkGray onClick={this.applyConfirm}>{intlObj.get(messages.confirm)}</BtnDkGray>
              </div>
            ) : (
              false
            )}
          </div>
          <div className="appDetail">
            {this.props.location.state ? (
              // <AppDetail APP_ID={ID} VER={value.VER} />
              <Tabs defaultActiveKey="1">
                <TabPane tab={intlObj.get(messages.tab1)} key="1">
                  <AppDetailForm APP_ID={ID} VER={value.VER} history={this.props.history} mod={2} />
                </TabPane>
                <TabPane tab={intlObj.get(messages.tab2)} key="2">
                  <AppDetailUserForm APP_ID={ID} VER={value.VER} history={this.props.history} mod={2} />
                </TabPane>
              </Tabs>
            ) : (
              false
            )}
          </div>
          <div className="buttonsWrapper bottom">
            <Link to="/store/appMain/AppOpinion" style={{ float: 'left' }}>
              <LinkBtnList>{intlObj.get(messages.toList)}</LinkBtnList>
            </Link>
            {/* <BtnLgtGray onClick={onBack}>{intlObj.get(messages.toList)}</BtnLgtGray> */}
            {status === 'P' ? (
              <div className="alignRight">
                <BtnLgtGray onClick={this.opposeConfirm}>{intlObj.get(messages.doOppo)}</BtnLgtGray>
                <BtnDkGray onClick={this.applyConfirm}>{intlObj.get(messages.confirm)}</BtnDkGray>
              </div>
            ) : (
              false
            )}
          </div>
          <Modal
            isOpen={this.state.show}
            onRequestClose={this.unOppose}
            contentLabel="Oppose"
            // style={customstyle}
            shouldCloseOnOverlayClick={false}
            ariaHideApp={false}
            portalClassName="CommonModal"
          >
            {/* 비즈스토어 react-modal에서 portalClassName은 'CommonModal'입니다. */}
            <OpposeModal selectedApp={list} closeModal={this.unOppose} radioList={data.oppoList} />
          </Modal>
        </StyleMyAppDetail>
      </div>
    );
  }
}

ExaminePage.propTypes = {
  location: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  acceptApps: PropTypes.func.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getOpinionData: sort => dispatch(actions.getOpinionData(sort)),
    acceptApps: (id, appID, ver, date) => dispatch(actions.acceptApps(id, appID, ver, date)),
    getOppoList: () => dispatch(actions.getOppoList()),
  };
}

const mapStateToProps = createStructuredSelector({
  // opiList: selectors.makeOpinionList(),
  // oppoList: selectors.makeOppoList(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'examinePage', reducer });
const withSaga = injectSaga({ key: 'examinePage', saga });

export default compose(withReducer, withSaga, withConnect)(ExaminePage);
