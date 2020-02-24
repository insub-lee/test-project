import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { Popover, Modal } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as feed from 'components/Feedback/functions';
import Organization from 'containers/portal/components/Organization';

import { intlObj, lang, imgUrl } from 'utils/commonUtils';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleAppBasicInfo from './StyleAppBasicInfo';
import { BtnWhiteArr, BtnRedShare, BtnRedCgrRegist, BtnRedMnRegist, BtnLgtGrayRegisted } from '../../../components/uielements/buttons.style';
import RgtCategoryIcon from '../../../../../images/bizstore/icon-category-rgt3.png';
import RgtMenuIcon from '../../../../../images/bizstore/icon-menu-rgt3.png';

import AppManagerList from '../../../components/AppManagerList';
import StyledButton from '../../../../../components/Button/StyledButton';

class AppBasicInfo extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      appId: -1,
      SITE_ID: 0,
      popUpVisible: false,
      popUpUrl: '',
      popUpTitle: '',
      userinfo: {},
      orgShow: false,
    };
    // prop.reqAppBasicInfo(this.state.appId);
    this.props.appBizGubun(3);
  }

  componentDidMount() {
    const { appId, SITE_ID } = this.props;
    if (this.state.appId !== appId) {
      this.setState(
        {
          appId,
          SITE_ID,
        },
        () => this.props.reqAppBasicInfo(appId, SITE_ID),
      );
    }
  }

  componentDidUpdate() {
    const { appId, SITE_ID } = this.props;
    if (this.state.appId !== appId || this.state.SITE_ID !== SITE_ID) {
      this.setState(
        {
          appId,
          SITE_ID,
        },
        () => this.props.reqAppBasicInfo(appId, SITE_ID),
      );
    }
  }

  popUpCancel = () => {
    this.setState({ popUpVisible: false });
  };

  onClickWorking = (flag, url, gubun) => {
    if (flag === 'L') {
      // this.setState({
      //   popUpVisible: true,
      //   popUpUrl: url,
      //   popUpTitle: gubun,
      // });
      window.open(url);
    } else if (flag === 'F') {
      window.location.assign(url);
    } else {
      let magText = '';
      if (gubun === 'w') {
        magText = `${intlObj.get(messages.noWorkSteps)}`;
      } else {
        magText = `${intlObj.get(messages.noManual)}`;
      }
      feed.error(magText);
    }
  };

  closeModal = () => this.setState({ orgShow: false });

  registerApps = () => this.props.registApp(this.props.resAppBasicInfo.APP_ID);

  handleRegistApp = () => feed.showConfirm(`${lang.get('NAME', this.props.resAppBasicInfo)} ${intlObj.get(messages.appInput)}`, '', this.registerApps);

  registerCategorys = () => this.props.registCategory(this.props.resAppBasicInfo.APP_ID);

  handleRegistCategory = () =>
    feed.showConfirm(
      `${lang.get('NAME', this.props.resAppBasicInfo)} ${intlObj.get(messages.appInput)}`,
      `${intlObj.get(messages.catgAppInput)}`,
      this.registerCategorys,
    );

  userProfile = (userinfo, orgShow) => {
    this.setState({ orgShow, userinfo });
  };

  render() {
    return (
      <StyleAppBasicInfo>
        <div className="newFaqWrite">
          <Modal visible={this.state.popUpVisible} title={this.state.popUpTitle} width="90%" onCancel={this.popUpCancel}>
            <iframe src={this.state.popUpUrl} width="100%" height="500" title="title" />
          </Modal>
        </div>
        <Organization
          isModal
          show={this.state.orgShow}
          closeModal={this.closeModal}
          userProfile={this.state.userinfo}
          isProfile
          orgName="구성원검색"
          searchOnly
        />
        <div className="basicInfoWrapper">
          <div className="appImgWrapper">
            <img
              src={imgUrl.get('160x160', this.props.resAppBasicInfo.ICON)}
              alt={lang.get('NAME', this.props.resAppBasicInfo)}
              onError={e => {
                e.target.src = '/app_icon/icon_no_image.png';
              }}
            />
          </div>
          <ul className="appDetailInfo">
            <li>
              <div className="appTitle">
                <h2 className="ellipsis">{lang.get('NAME', this.props.resAppBasicInfo)}</h2>
              </div>
              <div className="btnsWrapperTop">
                <StyledButton
                  type="button"
                  className="btn-outline-secondary btn-sm"
                  onClick={() => this.onClickWorking(this.props.appProcess.ITEM_TYPE, this.props.appProcess.FILE_PATH, 'w')}
                >
                  {intlObj.get(messages.workSteps)}
                </StyledButton>
                <StyledButton
                  type="button"
                  className="btn-outline-secondary btn-sm"
                  onClick={() => this.onClickWorking(this.props.appManual.ITEM_TYPE, this.props.appManual.FILE_PATH, 'm')}
                >
                  {intlObj.get(messages.appManual)}
                </StyledButton>
                <Popover
                  placement="bottomRight"
                  content={
                    this.props.appManagerList.length > 0 ? (
                      <AppManagerList managerList={this.props.appManagerList} userProfile={this.userProfile} currentView={this.props.currentView} />
                    ) : (
                      `${intlObj.get(messages.noManager)}`
                    )
                  }
                  overlayClassName="managerList"
                  trigger="click"
                >
                  <StyledButton type="button" className="btn-outline-secondary btn-sm demoPosBtn">
                    {intlObj.get(messages.manager)}
                  </StyledButton>
                </Popover>
              </div>
            </li>
            <li>
              <ul className="appDetails">
                {/* <li>{intlObj.get(messages.offer)}: {this.props.resAppBasicInfo.OFFER}</li> */}
                <li>
                  {intlObj.get(messages.catg)}: {lang.get('APPCATGPATH', this.props.resAppBasicInfo)}
                </li>
                <li>
                  {intlObj.get(messages.ver)}: {this.props.resAppBasicInfo.VER}
                </li>
                <li>
                  {intlObj.get(messages.openDttm)}: {this.props.resAppBasicInfo.OPEN_DTTM}
                </li>
              </ul>

              {this.props.resAppBasicInfo.SVC_YN === 'Y' ? (
                <div className="btnsWrapperBottom" style={{ visibility: this.props.visibleInfo ? 'visible' : 'hidden' }}>
                  <CopyToClipboard text={this.props.targetUrl} onCopy={() => feed.success(intlObj.get(messages.urlCopyMassage))}>
                    <BtnRedShare>{intlObj.get(messages.urlCopy)}</BtnRedShare>
                  </CopyToClipboard>
                  <div
                    className="regstBtns"
                    style={{
                      display: this.props.resAppBasicInfo.WG_COUNT === 0 ? 'block' : 'none',
                    }}
                  >
                    <div className="regstBtnsGroup">
                      <BtnRedCgrRegist className="category" onClick={this.handleRegistCategory}>
                        <img src={RgtCategoryIcon} alt="" />
                        {intlObj.get(messages.catgInput)}
                      </BtnRedCgrRegist>
                      <BtnRedMnRegist className="menu" title={intlObj.get(messages.menuInput)} onClick={this.handleRegistApp}>
                        <img src={RgtMenuIcon} alt="" />
                        {intlObj.get(messages.menuInput)}
                      </BtnRedMnRegist>
                    </div>
                  </div>
                  <div
                    className="regstBtns registered"
                    style={{
                      display: this.props.resAppBasicInfo.WG_COUNT > 0 ? 'block' : 'none',
                    }}
                  >
                    <div className="regstBtnsGroup">
                      <BtnLgtGrayRegisted title={intlObj.get(messages.apping)}>{intlObj.get(messages.apping)}</BtnLgtGrayRegisted>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="btnsWrapperBottom"
                  // style={{ visibility: this.props.visibleInfo ? 'visible' : 'hidden' }}
                >
                  <div
                    className="regstBtns registered"
                    style={{
                      display: 'block',
                    }}
                  >
                    <div className="regstBtnsGroup">
                      <BtnLgtGrayRegisted title={intlObj.get(messages.stopApping)}>{intlObj.get(messages.stopApping)}</BtnLgtGrayRegisted>
                    </div>
                  </div>
                </div>
              )}
            </li>
          </ul>
        </div>
      </StyleAppBasicInfo>
    );
  }
}

AppBasicInfo.propTypes = {
  reqAppBasicInfo: PropTypes.func, //eslint-disable-line
  resAppBasicInfo: PropTypes.object, //eslint-disable-line
  registCategory: PropTypes.func, //eslint-disable-line
  registApp: PropTypes.func, //eslint-disable-line
  targetUrl: PropTypes.string, //eslint-disable-line
  appId: PropTypes.string, //eslint-disable-line
  SITE_ID: PropTypes.number, //eslint-disable-line
  appProcess: PropTypes.object, //eslint-disable-line
  appManual: PropTypes.object, //eslint-disable-line
  appManagerList: PropTypes.array, //eslint-disable-line
  appBizGubun: PropTypes.func, //eslint-disable-line
  currentView: PropTypes.string.isRequired, //eslint-disable-line
  visibleInfo: PropTypes.bool,
};

AppBasicInfo.defaultProps = {
  visibleInfo: false,
  SITE_ID: 0,
};

const mapDispatchToProps = dispatch => ({
  reqAppBasicInfo: (appId, SITE_ID) => dispatch(actions.reqAppBasicInfo(appId, SITE_ID)),
  registCategory: APP_ID => dispatch(actions.registCategory(APP_ID)),
  registApp: APP_ID => dispatch(actions.registApp(APP_ID)),
  appBizGubun: gubun => dispatch(actions.appBizGubun(gubun)),
});

const mapStateToProps = createStructuredSelector({
  resAppBasicInfo: selectors.makeSelectAppBasicInfo(),
  appProcess: selectors.makeSelectAppProcess(),
  appManual: selectors.makeSelectAppManual(),
  appManagerList: selectors.makeSelectAppManagerList(),
  currentView: selectors.currentView(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'admin/AdminMain/AppDetail/AppBasicInfo', saga });
const withReducer = injectReducer({ key: 'admin/AdminMain/AppDetail/AppBasicInfo', reducer });

export default compose(withReducer, withSaga, withConnect)(AppBasicInfo);
