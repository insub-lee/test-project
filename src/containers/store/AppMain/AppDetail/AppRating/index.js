import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Rate, Row, Col, Progress, Icon } from 'antd';
import ModalDrag from 'components/ModalDrag';

import * as feed from 'components/Feedback/functions';
import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import basicStyle from '../../../../../config/basicStyle';
import StyleAppRating from './StyleAppRating';

import Modals from '../../../../../components/Modal/index';
import ModalStyle from '../../../components/Modal/StyleModal';
import WithDirection from '../../../../../config/withDirection';

import { BtnLgtGray, BtnDkGray, BtnWhiteDel, BtnSeeMore } from '../../../components/uielements/buttons.style';
import StyledButton from '../../../../../components/Button/StyledButton';

const isoModal = ModalStyle(Modals);
const Modal = WithDirection(isoModal);
const { rowStyle, colStyle, gutter } = basicStyle;

class AppRating extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      appId: prop.appId,
      visible: false,
      ratingPoint: 3,
      ratingComnt: '',
      saveon: false,
      updateon: true,
      page: 1,
      pagePerNum: this.props.currentView === 'Mobile' || this.props.currentView === 'Tablet' ? 2 : 5,
    };
    this.props.reqAppRatingInfo(this.state.appId, this.state.page, this.state.pagePerNum, []);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.appId !== nextProps.appId) {
      this.setState({
        appId: nextProps.appId,
        visible: false,
        ratingPoint: 3,
        ratingComnt: '',
        saveon: false,
        updateon: true,
        page: 1,
      });
      this.props.reqAppRatingInfo(nextProps.appId, 1, this.state.pagePerNum, []);
    }
  }

  registShowModal = () => {
    this.setState({
      visible: true,
      ratingPoint: 3,
      ratingComnt: '',
    });
  };

  updateShowModal = () => {
    this.setState({
      visible: true,
      ratingPoint: this.props.myAppRating.POINT,
      ratingComnt: this.props.myAppRating.COMNT,
    });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  insertReview = () => {
    if (this.state.saveon) {
      this.props.registRating(this.state.ratingPoint, this.state.ratingComnt, this.state.appId, 'INSERT', 1, this.state.pagePerNum);
      this.setState({ visible: false });
    } else {
      feed.error(`${intlObj.get(messages.reviewContent)}`);
    }
  };

  handleOk = () => {
    if (this.state.saveon) {
      feed.showConfirm(`${intlObj.get(messages.reviewRegisting)}`, '', this.insertReview);
    } else {
      feed.error(`${intlObj.get(messages.reviewContent)}`);
    }
  };

  updateReview = () => {
    if (this.state.updateon) {
      this.props.registRating(this.state.ratingPoint, this.state.ratingComnt, this.state.appId, 'UPDATE', 1, this.state.pagePerNum);
      this.setState({ visible: false });
    } else {
      feed.error(`${intlObj.get(messages.reviewContent)}`);
    }
  };

  updateHandleOk = () => {
    if (this.state.updateon) {
      feed.showConfirm(`${intlObj.get(messages.reviewUpdateing)}`, '', this.updateReview);
    } else {
      feed.error(`${intlObj.get(messages.reviewContent)}`);
    }
  };

  deleteReview = () => {
    this.props.registRating(this.state.ratingPoint, this.state.ratingComnt, this.state.appId, 'DELETE', 1, this.state.pagePerNum);
    this.setState({ visible: false });
  };

  deleteHandleOk = () => feed.showConfirm(`${intlObj.get(messages.reviewDeleteing)}`, '', this.deleteReview);

  render() {
    const ratingPointChange = point => this.setState({ ratingPoint: point });
    const lengthCheck = lengthCnt => {
      this.setState({ ratingComnt: lengthCnt.target.value });
      if (lengthCnt.target.value.length > 9) {
        this.setState({ saveon: true, updateon: true });
      } else {
        this.setState({ saveon: false, updateon: false });
      }
    };

    const registPop = (
      <div className="newRatingWrite">
        <StyledButton className="btn-outline-primary btn-sm" onClick={this.registShowModal}>
          <Icon type="like" />
          {intlObj.get(messages.reviewRegist)}
        </StyledButton>
        <Modal
          visible={this.state.visible}
          title={<ModalDrag title={intlObj.get(messages.reviewRegist)} num={0} />}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
          confirmLoading={false}
          footer={[
            <StyledButton className="btn-outline-dark btn-sm" key="back" onClick={this.handleCancel}>
              {intlObj.get(messages.cancel)}
            </StyledButton>,
            <StyledButton
              key="submit"
              loading={this.state.loading}
              onClick={this.handleOk}
              className={this.state.saveon ? 'btn-primary btn-sm' : 'disabled btn-sm'}
            >
              {intlObj.get(messages.regist)}
            </StyledButton>,
          ]}
          style={{ height: 'auto' }}
          className="storeModal"
        >
          <div className="ant-modal-body-content" style={{ height: 205 }}>
            <p className="labelTxt" style={{ display: 'inline-block', width: 65, marginTop: 0 }}>
              {intlObj.get(messages.ratingPoint)}
            </p>
            <Rate value={this.state.ratingPoint} onChange={ratingPointChange} />
            <label htmlFor="content" className="labelTxt">
              {intlObj.get(messages.content)}
              <textarea onChange={lengthCheck} maxLength={150} value={this.state.ratingComnt} />
            </label>
          </div>
        </Modal>
      </div>
    );

    const updatePop = (
      <div className="newRatingWrite">
        <StyledButton className="btn-outline-primary btn-sm" onClick={this.updateShowModal}>
          <Icon type="like" />
          {intlObj.get(messages.reviewUpdate)}
        </StyledButton>
        <Modal
          visible={this.state.visible}
          title={<ModalDrag title={intlObj.get(messages.reviewUpdate)} num={0} />}
          onOk={this.updateHandleOk}
          onCancel={this.handleCancel}
          maskClosable={false}
          footer={[
            <StyledButton key="update" onClick={this.deleteHandleOk} className="delete btn-outline-dark btn-sm">
              {intlObj.get(messages.delete)}
            </StyledButton>,
            <StyledButton className="btn-light btn-sm" key="back" onClick={this.handleCancel}>
              {intlObj.get(messages.cancel)}
            </StyledButton>,
            <StyledButton
              key="submit"
              loading={this.state.loading}
              onClick={this.updateHandleOk}
              className={this.state.updateon ? 'btn-primary btn-sm' : 'btn-sm disabled'}
            >
              {intlObj.get(messages.save)}
            </StyledButton>,
          ]}
          style={{ height: 330 }}
          className="storeModal"
        >
          <div className="ant-modal-body-content" style={{ height: 205 }}>
            <p className="labelTxt" style={{ display: 'inline-block', width: 65, marginTop: 0 }}>
              {intlObj.get(messages.ratingPoint)}
            </p>
            <Rate value={this.state.ratingPoint} onChange={ratingPointChange} />
            <label htmlFor="content" className="labelTxt">
              {intlObj.get(messages.content)}
              <textarea onChange={lengthCheck} maxLength={150} value={this.state.ratingComnt} />
            </label>
          </div>
        </Modal>
      </div>
    );

    const loop = data =>
      data.map(item => (
        <Col key={item.RNUM} xl={24} md={24} sm={24}>
          <div className="ratingReviewBox">
            <div>
              <img
                src={`/img/thumb/200x200/${item.PHOTO}`}
                alt={lang.get('NAME', item)}
                className="profilePic"
                onError={e => {
                  e.target.src = '/no_img_pro.jpg';
                }}
              />
            </div>
            <p className="userInfo">
              {lang.get('NAME', item)} ({item.EMP_NO}) / {lang.get('DEPT_NAME', item)} / {lang.get('PSTN_NAME', item)}
            </p>
            <span className="rateInfo" style={{ color: '#555', size: '12px' }}>
              <Rate disabled value={item.POINT} />
              <span className="reviewDate">{item.UPD_DTTM}</span>
              <span className="reviewVersion">[{item.VER}]</span>
            </span>
            <p className="userReviewText">{item.COMNT}</p>
          </div>
        </Col>
      ));

    const rtButton = () => {
      if (this.props.rtheiFlog) {
        this.setState({ page: this.state.page + 1 });
        this.props.reqAppRatingInfo(this.state.appId, this.state.page + 1, this.state.pagePerNum, this.props.appRatingList);
      } else {
        this.setState({ page: 1 });
        this.props.reqAppRatingInfo(this.state.appId, 1, this.state.pagePerNum, []);
      }
    };

    return (
      <StyleAppRating>
        <div>
          <h2 className="adTitle">{intlObj.get(messages.userReview)}</h2>
          {this.props.myAppRating.POINT > 0 ? updatePop : registPop}
        </div>
        <Row style={rowStyle} gutter={gutter} className="ratingAvgChart">
          <Col span={8} style={colStyle}>
            <div className="ratingAvgInfo">
              <h3>{this.props.resAppRatingInfo.TOTAVG ? this.props.resAppRatingInfo.TOTAVG : 0}</h3>
              <Rate allowHalf disabled value={parseFloat(this.props.resAppRatingInfo.STARPOINT)} />
            </div>
          </Col>
          <Col span={12} style={colStyle} className="ratingChart">
            <p className="ratingSubTitle">
              {this.props.resAppRatingInfo.TOTCNT ? this.props.resAppRatingInfo.TOTCNT : 0}
              {intlObj.get(messages.ratingCnt)}
            </p>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={3} style={colStyle}>
                <i className="anticon anticon-star" /> 5
              </Col>
              <Col span={21} style={colStyle}>
                <Progress percent={this.props.resAppRatingInfo.FIVEPER} strokeWidth={5} showInfo={false} />
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={3} style={colStyle}>
                <i className="anticon anticon-star" /> 4
              </Col>
              <Col span={21} style={colStyle}>
                <Progress percent={this.props.resAppRatingInfo.FOURPER} strokeWidth={5} showInfo={false} />
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={3} style={colStyle}>
                <i className="anticon anticon-star" /> 3
              </Col>
              <Col span={21} style={colStyle}>
                <Progress percent={this.props.resAppRatingInfo.THREEPER} strokeWidth={5} showInfo={false} />
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={3} style={colStyle}>
                <i className="anticon anticon-star" /> 2
              </Col>
              <Col span={21} style={colStyle}>
                <Progress percent={this.props.resAppRatingInfo.TWOPER} strokeWidth={5} showInfo={false} />
              </Col>
            </Row>
            <Row style={rowStyle} gutter={gutter} justify="start">
              <Col span={3} style={colStyle}>
                <i className="anticon anticon-star" /> 1
              </Col>
              <Col span={21} style={colStyle}>
                <Progress percent={this.props.resAppRatingInfo.ONEPER} strokeWidth={5} showInfo={false} />
              </Col>
            </Row>
          </Col>
        </Row>
        <Row
          style={{
            marginTop: 30,
            overflow: 'hidden',
            height: this.props.appRatingListSize > 0 ? 'auto' : '40px',
          }}
          className="ratingReview"
        >
          {loop(this.props.appRatingList)}
        </Row>
        <BtnSeeMore
          key="submit"
          loading={this.state.loading}
          onClick={rtButton}
          style={{ display: this.props.appRatingListSize > 5 ? 'block' : 'none' }}
          className={this.props.rtheiFlog ? 'down' : 'up'}
        />
      </StyleAppRating>
    );
  }
}

AppRating.propTypes = {
  reqAppRatingInfo: PropTypes.func, //eslint-disable-line
  resAppRatingInfo: PropTypes.object, //eslint-disable-line
  appRatingList: PropTypes.array, //eslint-disable-line
  appId: PropTypes.string, //eslint-disable-line
  registRating: PropTypes.func, //eslint-disable-line
  myAppRating: PropTypes.object, //eslint-disable-line
  updateRating: PropTypes.func, //eslint-disable-line
  rtheiFlog: PropTypes.bool, //eslint-disable-line
  appRatingListSize: PropTypes.number, //eslint-disable-line
  currentView: PropTypes.string.isRequired, //eslint-disable-line
};

const mapDispatchToProps = dispatch => ({
  reqAppRatingInfo: (appId, page, pagePerNum, appRatingList) => {
    dispatch(actions.reqAppRatingInfo(appId, page, pagePerNum, appRatingList));
  },
  registRating: (POINT, COMNT, APP_ID, GUBUN, page, pagePerNum) => {
    dispatch(actions.registRating(POINT, COMNT, APP_ID, GUBUN, page, pagePerNum)); // page를 0으로 하드코딩한것 수정
  },
});

const mapStateToProps = createStructuredSelector({
  resAppRatingInfo: selectors.makeSelectAppRatingInfo(),
  appRatingList: selectors.makeSelectAppRatingList(),
  myAppRating: selectors.makeSelectMyAppRating(),
  rtheiFlog: selectors.makeSelectRtheiFlog(),
  appRatingListSize: selectors.makeSelectAppRatingListSize(),
  currentView: selectors.currentView(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'appRating', saga });
const withReducer = injectReducer({ key: 'appRating', reducer });

export default compose(withReducer, withSaga, withConnect)(AppRating);
