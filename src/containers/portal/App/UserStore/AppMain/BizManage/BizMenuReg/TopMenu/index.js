import ErrorBoundary from 'containers/common/ErrorBoundary';
import AuthSetting from 'containers/portal/App/UserStore/AppMain/BizManage/BizMenuReg/AuthSetting';
import React from 'react';
import PropTypes from 'prop-types';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Row, Col, Modal } from 'antd';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { lang, intlObj } from 'utils/commonUtils';
import * as feed from 'components/Feedback/functions';
// import Modal from 'react-modal';
import { Link } from 'react-router-dom';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';
import messages from './messages';

import StyleTopMenu from './StyleTopMenu';
import { BtnDkGray, BtnBizPreview, BtnBizSettings } from '../../../../components/uielements/buttons.style';
import AuthSettingModalContents from '../AuthSetting/AuthSettingModalContents';

// import BizMenuTree from '../../../../components/AppPreview/BizMenuTree';
// import AppPreview from '../../../../components/AppPreview';

class TopMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showSettingModal: false,
    };
  }

  componentDidMount() {
    const { BIZGRP_ID, handleGetBizInfo } = this.props;
    handleGetBizInfo(BIZGRP_ID);
  }

  componentDidUpdate(prevProps) {
    const { BIZGRP_ID, handleGetBizInfo } = this.props;
    if (prevProps.BIZGRP_ID !== BIZGRP_ID) {
      handleGetBizInfo(BIZGRP_ID);
    }
  }

  showSettingModal = () => {
    this.setState({ showSettingModal: true });
  };

  closeSettingModal = () => {
    this.setState({ showSettingModal: false });
  };

  render() {
    const { showSettingModal } = this.state;
    const { bizInfo, confirmBizGroup, history, pageID, userRole, match, BIZGRP_ID } = this.props;

    const linkto = `/preview/page/${pageID}`;
    return (
      <div>
        <ErrorBoundary>
          <ModalRoute path={`${match.url}/authSetting`} component={AuthSetting} />
          {/* <ModalRoute path={`${match.url}/authSetting`} component={Sample} /> */}
          <ModalContainer />
        </ErrorBoundary>
        <StyleTopMenu>
          <Row>
            <Col sm={24} lg={8} />
            <Col sm={24} lg={8}>
              <h1 className="bizGrpTitle ellipsis">{lang.get('NAME', bizInfo)}</h1>
            </Col>
            <Col sm={24} lg={8} style={{ textAlign: 'right' }}>
              {history.location.pathname.indexOf('page') > -1 && (
                <Link to={linkto} target="appPreview">
                  <BtnBizPreview title="미리보기" /* onClick={() => this.onOpen()} */ />
                </Link>
              )}
              {(bizInfo.SEC_YN === 'Y' || userRole === 'SA') && (
                <>
                  <BtnBizSettings title="설정하기" onClick={this.showSettingModal} />
                  <Modal title="권한 설정" closable visible={showSettingModal} footer={null} destroyOnClose onCancel={this.closeSettingModal}>
                    <AuthSettingModalContents BIZGRP_ID={BIZGRP_ID} />
                  </Modal>
                </>
              )}
              {bizInfo.CHG_YN === 'Y' && (bizInfo.SEC_YN === 'Y' || userRole === 'SA') && (
                <BtnDkGray
                  style={{ verticalAlign: 'middle', marginLeft: 12 }}
                  onClick={() => {
                    feed.showConfirm(`${intlObj.get(messages.askConfirm)}`, '', () => confirmBizGroup(history, BIZGRP_ID));
                  }}
                >
                  확정
                </BtnDkGray>
              )}
            </Col>
          </Row>
        </StyleTopMenu>
      </div>
    );
  }
}

TopMenu.propTypes = {
  history: PropTypes.object.isRequired,
  handleGetBizInfo: PropTypes.func.isRequired,
  confirmBizGroup: PropTypes.func.isRequired,
  BIZGRP_ID: PropTypes.number.isRequired,
  bizInfo: PropTypes.object.isRequired,
  pageID: PropTypes.number,
  userRole: PropTypes.string,
};

TopMenu.defaultProps = {
  pageID: -1,
  userRole: '',
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetBizInfo: BIZGRP_ID => dispatch(actions.getBizInfo(BIZGRP_ID)),
    confirmBizGroup: (history, BIZGRP_ID) => dispatch(actions.confirmBizGroup(history, BIZGRP_ID)),
    execApps: node => dispatch(actions.execApps(node)),
  };
}

const mapStateToProps = createStructuredSelector({
  bizInfo: selectors.makgeBizInfo(),
  selectedApp: selectors.makeSelectApps(),
  setMyMenuData: selectors.makeSelectMyMenuData(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'bizmemuTopMenu', reducer });
const withSaga = injectSaga({ key: 'bizmemuTopMenu', saga });

export default compose(withReducer, withSaga, withConnect)(TopMenu);
