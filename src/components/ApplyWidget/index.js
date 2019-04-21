import React, { Component } from 'react';
import { intlObj, lang } from 'utils/commonUtils';
import { Button } from 'antd';
import Modal from 'react-modal';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';

import * as feed from 'components/Feedback/functions';

import injectSaga from '../../utils/injectSaga';
import injectReducer from '../../utils/injectReducer';

import * as actions from './actions';

import reducer from './reducer';
import saga from './saga';

import messages from '../Page/messages';
import ApplyPageStyle from './applyPageStyle.js';

import ApplyPage from './ApplyPage';

class testPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };

    this.onApply = this.onApply.bind(this);
    this.notApply = this.notApply.bind(this);
    this.onClose = this.onClose.bind(this);
  }

  onApply() {
    this.setState({ show: true });
  }

  onClose() {
    this.setState({ show: false });
  }

  notApply() {
    const { item } = this.props;
    this.props.sendDeleteApply(item.APP_ID, item.PAGE_ID);
  }

  notApplyConfirm = () => {
    feed.showConfirm(`${intlObj.get(messages.DoCancel)}`, '', () => this.notApply());
  }

  render() {
    const { item, type } = this.props;

    const customstyle = {
      content: {
        width: 400,
        height: 240,
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      },
    };

    const RenderSappView = (item) => {
      if (item.SEC_REQ_YN === 'Y') {
        return (
          <div className="widgetContent bgImgApplyPage">
            <p className="informTxt">
              <span>
                <i className="emp">{lang.get('NAME', item)}</i>
              </span>
              <span>
                {intlObj.get(messages.AppApply)}
                <br />
                {intlObj.get(messages.noApply)}
              </span>
            </p>
            <Button onClick={this.onApply} className="btnBRadius dkgray">
              {intlObj.get(messages.useApply)}
            </Button>
          </div>
        );
      } else if (item.SEC_REQ_YN === 'N') {
        return (
          <div className="widgetContent bgOnApplying">
            <p className="informTxt">
              <span>
                <i className="emp">{lang.get('NAME', item)}</i>
              </span>
              <span>
                {intlObj.get(messages.saveApply)}
              </span>
            </p>
            <Button onClick={this.notApplyConfirm} className="btnBRadius gray">
              {intlObj.get(messages.cancelApply)}
            </Button>
          </div>
        );
      }
    };

    const RenderAppView = (item) => {
      if (item.SEC_REQ_YN === 'Y') {
        return (
          <div className="widgetContent bgImgApplyPage">
            <p className="informTxt">
              <span>
                <i className="emp">{lang.get('NAME', item)}</i>
              </span>
              <span>
                {intlObj.get(messages.AppApply)}
                <br />
                {intlObj.get(messages.noApply)}
              </span>
            </p>
            <Button onClick={this.onApply} className="btnBRadius dkgray">
              {intlObj.get(messages.useApply)}
            </Button>
          </div>
        );
      } else if (item.SEC_REQ_YN === 'N') {
        return (
          <div className="widgetContent bgOnApplying">
            <p className="informTxt">
              <span>
                <i className="emp">{lang.get('NAME', item)}</i>
              </span>

              <span>
                {intlObj.get(messages.saveApply)}
              </span>
            </p>
            <Button onClick={this.notApplyConfirm} className="btnBRadius gray">
              {intlObj.get(messages.cancelApply)}
            </Button>
          </div>
        );
      }
    };

    return (
      <ApplyPageStyle>
        <div className="applyPageWrapper">
          {type === 'swidget' ?
            <div className="singleWidget">
              {RenderSappView(item)}
            </div>
            :
            <div className="portalMainWidget" style={{ display: 'table', width: '100%', height: '100%' }}>
              {RenderAppView(item)}
            </div>
          }
          <Modal
            isOpen={this.state.show}
            closeModal={this.onClose}
            style={customstyle}
            contentLabel="권한 신청"
            shouldCloseOnOverlayClick={false}
            portalClassName="portalCommonModal"
            bodyOpenClassName="modalApplyPage"
            ariaHideApp={false}
          >
            <ApplyPage onClose={this.onClose} item={item} sendApply={this.props.sendApply} />
          </Modal>
        </div>
      </ApplyPageStyle>
    );
  }
}

const mapStateToProps = createStructuredSelector({
});

export function mapDispatchToProps(dispatch) {
  return {
    sendApply: (appID, pageID, note) => dispatch(actions.sendApply(appID, pageID, note)),
    sendDeleteApply: (appID, pageID) => dispatch(actions.sendDeleteApply(appID, pageID)),
  };
}

const withReducer = injectReducer({ key: 'menuapplypage', reducer });
const withSaga = injectSaga({ key: 'menuapplypage', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(testPage);
