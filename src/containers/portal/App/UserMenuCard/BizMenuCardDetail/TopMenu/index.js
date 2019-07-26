import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Row, Col } from 'antd';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import * as feed from 'components/Feedback/functions';
import * as commonjs from 'containers/common/functions/common';

import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { intlObj, lang } from 'utils/commonUtils';
import messages from '../messages';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
import * as actions from './actions';

import StyleTopMenu from './StyleTopMenu';
import { BtnWhiteArr, BtnIconShare } from '../../../UserStore/components/uielements/buttons.style';
import AppMaNagerList from '../../../UserStore/components/AppManagerList';

class TopMenu extends React.Component {
  componentDidMount() {
    const { BIZGRP_ID, handleGetBizInfo } = this.props;
    handleGetBizInfo(BIZGRP_ID);
  }

  componentDidUpdate(prevProps) {
    const { BIZGRP_ID, handleGetBizInfo } = this.props;
    const { BIZGRP_ID: prevBizgrpId } = prevProps;

    if (prevBizgrpId !== BIZGRP_ID) {
      handleGetBizInfo(BIZGRP_ID);
    }
  }

  render() {
    /* eslint-disable */
    const { bizInfo, bizManagerList } = this.props;

    return (
      <div>
        <StyleTopMenu>
          <Row>
            <Col sm={24} xl={9}>
              <Popover
                placement="bottomLeft"
                content={
                  bizManagerList.length > 0 ? (
                    <AppMaNagerList managerList={bizManagerList} currentView={this.props.currentView} />
                  ) : (
                    `${intlObj.get(messages.noManager)}`
                  )
                }
                trigger="click"
                className="mngList"
              >
                <BtnWhiteArr style={{ marginTop: 2 }}>{intlObj.get(messages.manager)}</BtnWhiteArr>
              </Popover>
              <p className="openDate">
                {intlObj.get(messages.openDate)}: {bizInfo.OPEN_DTTM}
              </p>
            </Col>
            <Col sm={24} xl={8}>
              <h1 className="bizGrpTitle ellipsis">{lang.get('NAME', bizInfo)}</h1>
            </Col>
            <Col sm={24} xl={7} style={{ textAlign: 'right' }}>
              <CopyToClipboard text={window.location.href} onCopy={() => feed.success(`${intlObj.get(messages.urlCopyMassage)}`)}>
                <BtnIconShare title={intlObj.get(messages.urlCopy)} style={{ marginRight: 6 }} />
              </CopyToClipboard>
            </Col>
          </Row>
        </StyleTopMenu>
      </div>
    );
  }
}

TopMenu.propTypes = {
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired,
  BIZGRP_ID: PropTypes.number.isRequired,
  bizInfo: PropTypes.object.isRequired,
  bizManagerList: PropTypes.array.isRequired,
  handleGetBizInfo: PropTypes.func.isRequired,
  currentView: PropTypes.string.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    handleGetBizInfo: BIZGRP_ID => dispatch(actions.getBizInfo(BIZGRP_ID)),
    registBiz: BIZGRP_ID => dispatch(actions.registBiz(BIZGRP_ID)),
  };
}

const mapStateToProps = createStructuredSelector({
  bizInfo: selectors.makgeBizInfo(),
  bizManagerList: selectors.makgeBizManagerList(),
  currentView: selectors.currentView(),
});

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'bizCardTopMenu', reducer });
const withSaga = injectSaga({ key: 'bizCardTopMenu', saga });

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(TopMenu);
