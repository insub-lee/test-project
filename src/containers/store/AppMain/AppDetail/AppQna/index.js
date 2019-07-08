import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Tabs } from 'antd';

// import * as feed from 'components/Feedback/functions';
import { intlObj } from 'utils/commonUtils';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleAppQna from './StyleAppQna';

import noDataIcon from '../../../../../images/bizstore/no-result-sm2.png';
import { BtnWhiteWrite, BtnSeeMore } from '../../../components/uielements/buttons.style';

class AppQna extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      appId: prop.appId,
      page: 1,
      pagepernum: 2,
      qnaList: [],
      faqPage: 1,
      faqPagepernum: 2,
      faqList: [],
      myqnaPage: 1,
      myqnaPagepernum: 2,
      myqnaList: [],
      gubun: prop.gubun,
      faqButtonOpen: false,
      qnaButtonOpen: true,
    };
    this.props.initQnaList(prop.appId, this.state.page, this.state.pagepernum, this.state.gubun);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.appId !== nextProps.appId) {
      this.setState({
        appId: nextProps.appId,
        page: 1,
        qnaList: [],
        faqPage: 1,
        faqList: [],
        myqnaPage: 1,
        myqnaList: [],
        gubun: nextProps.gubun,
      });
      this.props.initQnaList(nextProps.appId, 1, 2, nextProps.gubun);
    } else {
      this.setState({
        qnaList: nextProps.qnaList,
        faqList: nextProps.faqList,
        myqnaList: nextProps.myqnaList,
      });
    }
  }

  render() {
    const iflowView = (arSeq) => {
      if (this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet') {
        window.open(`${this.props.iflowUrl}/group/article/${arSeq}`);
      }
    };
    const changeClassNameFaq = (e) => {
      if (e.target.className === 'itemA') {
        e.target.className = 'itemAll';
      } else {
        e.target.className = 'itemA';
      }
    };

    const loopFaq = data =>
      data.map(item => (
        <li key={item.arSeq}>
          <h3
            className="itemQ"
            onClick={() => iflowView(item.arSeq)}
            onKeyPress={() => iflowView(item.arSeq)}
            role="presentation"
          >
            {item.arTitle}
          </h3>
          <p
            className="itemA"
            onClick={changeClassNameFaq}
            onKeyPress={changeClassNameFaq}
            role="presentation"
          >
            {item.arText}
          </p>
        </li>
      ));

    const changeClassNameQna = (e) => {
      if (e.target.className === 'itemQContent') {
        e.target.className = 'itemQContentAll';
      } else {
        e.target.className = 'itemQContent';
      }
    };

    const loopQnaAnswer = data =>
      data.map(item => (
        <div className="itemAnswer" key={item.arSeq}>
          <p className="itemAContent">{item.arText}</p>
          <div className="itemAUserInfo">
            <div className="userPic">
              <img
                src={`/portalWeb/uploadfile/pictures/${item.empnoRegist}.jpg`}
                alt={item.empnoRegist}
                className="profilePic"
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            {item.empName}({item.empnoRegist})/{item.deptName}/{item.positionName} &nbsp;
            {item.regDt}
          </div>
        </div>
      ));

    const loopQna = data =>
      data.map(item => (
        <li key={item.arSeq}>
          <h3
            className="itemQTitle"
            onClick={() => iflowView(item.arSeq)}
            onKeyPress={() => iflowView(item.arSeq)}
            role="presentation"
          >
            [
            {item.t1 === 'suggestion' ? intlObj.get(messages.qnaType1) : ''}
            {item.t1 === 'error' ? intlObj.get(messages.qnaType2) : ''}
            {item.t1 === 'question' ? intlObj.get(messages.qnaType3) : ''}
            ]&nbsp;
            {item.arTitle}
          </h3>
          <p
            className="itemQContent"
            onClick={changeClassNameQna}
            onKeyPress={changeClassNameQna}
            role="presentation"
          >
            {item.arText}
          </p>
          <div className="itemQUserInfo">
            <div className="userPic">
              <img
                src={`/portalWeb/uploadfile/pictures/${item.empnoRegist}.jpg`}
                alt={item.empName}
                className="profilePic"
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            {item.empName}({item.empnoRegist})/{item.deptName}/{item.positionName} &nbsp;
            {item.regDt}
          </div>
          {loopQnaAnswer(item.replyList)}
        </li>
      ));
    const qEdit = (arSeq) => {
      window.open(`${this.props.qnaEditUrl}/${arSeq}?token=${this.props.iflowToken}`);
    };
    const loopMyQna = data =>
      data.map(item => (
        <li key={item.arSeq}>
          <div>
            <h3
              className="itemQTitle"
              onClick={() => iflowView(item.arSeq)}
              onKeyPress={() => iflowView(item.arSeq)}
              role="presentation"
            >
              [
              {item.t1 === 'suggestion' ? intlObj.get(messages.qnaType1) : ''}
              {item.t1 === 'error' ? intlObj.get(messages.qnaType2) : ''}
              {item.t1 === 'question' ? intlObj.get(messages.qnaType3) : ''}
              ]&nbsp;
              {item.arTitle}

              <BtnWhiteWrite
                onClick={() => qEdit(item.arSeq)}
                style={{ display: item.replyList.length === 0 && (this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet') ? 'block' : 'none' }}
                className="edit"
              >
                {intlObj.get(messages.qEdit)}
              </BtnWhiteWrite>
            </h3>
          </div>
          <p
            className="itemQContent"
            onClick={changeClassNameQna}
            onKeyPress={changeClassNameQna}
            role="presentation"
          >
            {item.arText}
          </p>
          <div className="itemQUserInfo">
            <div className="userPic">
              <img
                src={`/portalWeb/uploadfile/pictures/${item.empnoRegist}.jpg`}
                alt={item.empName}
                className="profilePic"
                onError={(e) => { e.target.src = '/no_img_pro.jpg'; }}
              />
            </div>
            {item.empName}({item.empnoRegist})/{item.deptName}/{item.positionName} &nbsp;
            {item.regDt}

          </div>
          {loopQnaAnswer(item.replyList)}
        </li>
      ));
    const qnaButton = (page) => {
      if (this.props.qnaTotCnt > this.state.page * this.state.pagepernum) {
        this.setState({ page: page + 1 });
        this.props.getQnaList(this.state.appId, page + 1, this.state.pagepernum, this.state.qnaList, this.state.gubun);
      } else {
        this.setState({
          page: 1,
          qnaList: [],
        });
        this.props.getQnaList(this.state.appId, 1, this.state.pagepernum, [], this.state.gubun);
      }
    };

    const faqButton = (page) => {
      if (this.props.faqTotCnt > this.state.faqPage * this.state.faqPagepernum) {
        this.setState({ faqPage: page + 1 });
        this.props.getFaqList(this.state.appId, page + 1, this.state.faqPagepernum, this.state.faqList, this.state.gubun);
      } else {
        this.setState({
          faqPage: 1,
          faqList: [],
        });
        this.props.getFaqList(this.state.appId, 1, this.state.faqPagepernum, [], this.state.gubun);
      }
    };

    const myqnaButton = (page) => {
      if (this.props.myqnaTotCnt > this.state.myqnaPage * this.state.myqnaPagepernum) {
        this.setState({ myqnaPage: page + 1 });
        this.props.getMyqnaList(this.state.appId, page + 1, this.state.myqnaPagepernum, this.state.myqnaList, this.state.gubun);
      } else {
        this.setState({
          myqnaPage: 1,
          myqnaList: [],
        });
        this.props.getMyqnaList(this.state.appId, 1, this.state.myqnaPagepernum, [], this.state.gubun);
      }
    };

    const myQnaListView = (
      <Tabs.TabPane tab="My Q&amp;A" key="3" >
        <div
          style={{ height: 'auto', marginBottom: 10 }}
          // style={{ height: this.state.myheiFlog ? '332px' : 'auto' }}
          className="qnaListWrapper"
        >
          <ul className="qnaList">
            {loopMyQna(this.state.myqnaList)}
          </ul>
        </div>
        <BtnSeeMore
          key="submit"
          loading={this.state.loading}
          onClick={() => myqnaButton(this.state.myqnaPage)}
          style={{ display: this.props.myqnaTotCnt > this.state.myqnaPagepernum ? 'block' : 'none' }}
          className={this.props.myqnaTotCnt > this.state.myqnaPage * this.state.myqnaPagepernum ? 'down' : 'up'}
        />
      </Tabs.TabPane>
    );

    const handleChangeTabs = (e) => {
      this.setState({
        page: 1,
        qnaList: [],
        faqPage: 1,
        faqList: [],
        myqnaPage: 1,
        myqnaList: [],
      });
      this.props.initQnaList(this.state.appId, 1, 2, this.state.gubun);

      if (e === '1') {
        this.setState({
          faqButtonOpen: true,
          qnaButtonOpen: false,
        });
      } else if (e === '2') {
        this.setState({
          faqButtonOpen: false,
          qnaButtonOpen: true,
        });
      } else {
        this.setState({
          faqButtonOpen: false,
          qnaButtonOpen: false,
        });
      }
    };

    const qnaWriting = () => {
      window.open(this.props.qnaWriteUrl);
    };
    const faqWriting = () => {
      window.open(this.props.faqWriteUrl);
    };
    return (
      <StyleAppQna /* style={{ minHeight: 450 }} */>
        <Tabs
          defaultActiveKey="2"
          onChange={handleChangeTabs}
        >
          <Tabs.TabPane tab="FAQ" key="1">
            <div
              className="newFaqWrite"
              style={{ display: this.props.appManagerChk > 0 && this.state.faqButtonOpen ? 'block' : 'none' }}
            >
              <BtnWhiteWrite type="button" onClick={faqWriting}>
                {intlObj.get(messages.faqRegist)}
              </BtnWhiteWrite>
            </div>
            <div
              // style={{ height: this.state.faqheiFlog ? '332px' : 'auto' }}
              style={{ height: 'auto', marginBottom: 10 }}
              className="faqListWrapper"
            >
              <ul className="faqList">
                {loopFaq(this.state.faqList)}
              </ul>
              <span
                style={{ display: this.props.faqList.length > 0 ? 'none' : 'block' }}
                className="noDataNotice"
              >
                <img src={noDataIcon} alt={intlObj.get(messages.noFaq)} />
                {intlObj.get(messages.noFaq)}
              </span>
            </div>
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={() => faqButton(this.state.faqPage)}
              style={{ display: this.props.faqTotCnt > this.state.faqPagepernum ? 'block' : 'none' }}
              className={this.props.faqTotCnt > this.state.faqPage * this.state.faqPagepernum ? 'down' : 'up'}
            />
          </Tabs.TabPane>
          <Tabs.TabPane tab="Q&amp;A" key="2">
            <div
              className="newQnaWrite"
              style={{ display: this.state.qnaButtonOpen ? 'block' : 'none' }}
            >
              <BtnWhiteWrite type="button" onClick={qnaWriting}>
                {intlObj.get(messages.qnaRegist)}
              </BtnWhiteWrite>
            </div>
            <div
              style={{ height: 'auto', marginBottom: 10 }}
              // style={{ height: this.props.qnaFlog ? '332px' : 'auto' }}
              className="qnaListWrapper"
            >
              <ul className="qnaList">
                {/* {loopQna(this.props.resAppQnaList)} */}
                {loopQna(this.state.qnaList)}
              </ul>
              <span
                style={{ display: this.props.qnaList.length > 0 ? 'none' : 'block' }}
                className="noDataNotice"
              >
                <img src={noDataIcon} alt={intlObj.get(messages.noQna)} />
                {intlObj.get(messages.noQna)}
              </span>
            </div>
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={() => qnaButton(this.state.page)}
              style={{ display: this.props.qnaTotCnt > this.state.pagepernum ? 'block' : 'none' }}
              className={this.props.qnaTotCnt > this.state.page * this.state.pagepernum ? 'down' : 'up'}
            />
          </Tabs.TabPane>
          {this.props.myqnaList.length > 0 ? myQnaListView : null}
          {/* <Tabs.TabPane
            tab="My Q&amp;A"
            key="3"
            style={{ display: this.props.myqnaList.length > 1000 ? 'block' : 'none' }}
          >
            <div
              style={{ height: 'auto', marginBottom: 10 }}
              // style={{ height: this.state.myheiFlog ? '332px' : 'auto' }}
              className="qnaListWrapper"
            >
              <ul className="qnaList">
                {loopQna(this.state.myqnaList)}
              </ul>
            </div>
            <BtnSeeMore
              key="submit"
              loading={this.state.loading}
              onClick={() => myqnaButton(this.state.myqnaPage)}
              style={{ display: this.props.myqnaTotCnt > this.state.myqnaPagepernum ? 'block' : 'none' }}
              className={this.props.myqnaTotCnt > this.state.myqnaPage * this.state.myqnaPagepernum ? 'down' : 'up'}
            />
          </Tabs.TabPane> */}
        </Tabs>
      </StyleAppQna >
    );
  }
}

AppQna.propTypes = {
  appId: PropTypes.string, //eslint-disable-line
  gubun: PropTypes.string, //eslint-disable-line
  initQnaList: PropTypes.func, //eslint-disable-line
  getQnaList: PropTypes.func, //eslint-disable-line
  qnaList: PropTypes.array, //eslint-disable-line
  faqList: PropTypes.array, //eslint-disable-line
  myqnaList: PropTypes.array, //eslint-disable-line
  qnaTotCnt: PropTypes.number,  //eslint-disable-line
  getFaqList: PropTypes.func, //eslint-disable-line
  faqTotCnt: PropTypes.number,  //eslint-disable-line
  getMyqnaList: PropTypes.func, //eslint-disable-line
  myqnaTotCnt: PropTypes.number,  //eslint-disable-line
  appManagerChk: PropTypes.number, //eslint-disable-line
  currentView: PropTypes.string.isRequired, //eslint-disable-line
  iflowToken: PropTypes.string.isRequired, //eslint-disable-line
  qnaWriteUrl: PropTypes.string, //eslint-disable-line
  faqWriteUrl: PropTypes.string, //eslint-disable-line
  iflowUrl: PropTypes.string, //eslint-disable-line
  qnaEditUrl: PropTypes.string, //eslint-disable-line
};

const mapDispatchToProps = dispatch => (
  {
    initQnaList: (appId, page, pagepernum, gubun) => {
      dispatch(actions.initQnaList(appId, page, pagepernum, gubun));
    },
    getQnaList: (appId, page, pagepernum, qnaList, gubun) => {
      dispatch(actions.getQnaList(appId, page, pagepernum, qnaList, gubun));
    },
    getFaqList: (appId, page, pagepernum, faqList, gubun) => {
      dispatch(actions.getFaqList(appId, page, pagepernum, faqList, gubun));
    },
    getMyqnaList: (appId, page, pagepernum, myqnaList, gubun) => {
      dispatch(actions.getMyqnaList(appId, page, pagepernum, myqnaList, gubun));
    },
  }
);

const mapStateToProps = createStructuredSelector({
  qnaList: selectors.makeSelectQnaList(),
  faqList: selectors.makeSelectFaqList(),
  myqnaList: selectors.makeSelectMyqnaList(),
  qnaTotCnt: selectors.makeSelectQnaTotCnt(),
  faqTotCnt: selectors.makeSelectFaqTotCnt(),
  myqnaTotCnt: selectors.makeSelectMyqnaTotCnt(),
  appManagerChk: selectors.makeSelectAppManagerChk(),
  currentView: selectors.currentView(),
  iflowToken: selectors.makeSelectIflowToken(),
  qnaWriteUrl: selectors.makeSelectQnaWriteUrl(),
  faqWriteUrl: selectors.makeSelectFaqWriteUrl(),
  iflowUrl: selectors.makeSelectIflowUrl(),
  qnaEditUrl: selectors.makeSelectQnaEditUrl(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'appQna', saga });
const withReducer = injectReducer({ key: 'appQna', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(AppQna);
