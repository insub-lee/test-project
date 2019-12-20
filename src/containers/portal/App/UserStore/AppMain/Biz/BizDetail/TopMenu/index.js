import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Popover, Row, Col, Button } from 'antd';
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
import { BtnWhiteArr, BtnIconShare, BtnIconRegist, BtnLgtGrayRegisted } from '../../../../components/uielements/buttons.style';
import AppMaNagerList from '../../../../components/AppManagerList';

class TopMenu extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      BIZGRP_ID: prop.BIZGRP_ID,
    };
    prop.handleGetBizInfo(this.state.BIZGRP_ID);
  }

  componentWillReceiveProps(nextProps) {
    if (this.state.BIZGRP_ID !== nextProps.BIZGRP_ID) {
      this.setState({
        BIZGRP_ID: nextProps.BIZGRP_ID,
      });
      this.props.handleGetBizInfo(nextProps.BIZGRP_ID);
    }
  }

  registBizs = () => {
    const { BIZGRP_ID } = this.state;
    this.props.registBiz(BIZGRP_ID);
  };

  handleRegistBiz = () => {
    const { bizInfo } = this.props;
    if (bizInfo.MCNT > 0) {
      feed.showConfirm(`${lang.get('NAME', bizInfo)} ${intlObj.get(messages.registBizs)}`, '', this.registBizs);
    } else {
      feed.error(`${intlObj.get(messages.menuNotReg)}`);
    }
  };

  render() {
    const { BIZGRP_ID } = this.state;
    const { history, bizInfo, bizManagerList } = this.props;
    const { location } = history;
    const { pathname } = location;
    const menu = pathname.indexOf('/menulist') > -1 ? 'grid' : 'tree';

    const preUrl = commonjs.getPreUrl(this.props.match.path, '/biz/');

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
              {this.props.currentView !== 'Mobile' && this.props.currentView !== 'Tablet' && (
                <div className="viewMode">
                  <Button
                    className={`view treeIcon ${menu === 'tree' ? 'current' : ''}`}
                    title="트리식 보기"
                    onClick={() => history.push(`${preUrl}detail/info/${BIZGRP_ID}`)}
                  />
                  <Button
                    className={`view gridIcon ${menu === 'grid' ? 'current' : ''}`}
                    title="격자식 보기"
                    onClick={() => history.push(`${preUrl}menulist/${BIZGRP_ID}`)}
                  />
                  {/* <Icon type="smile" theme="outlined" onClick={() => history.push(`${preUrl}/detail/info/${BIZGRP_ID}`)} /> */}
                  {/* <Icon type="appstore" theme="outlined" onClick={() => history.push(`${preUrl}/menulist/${BIZGRP_ID}`)} /> */}
                </div>
              )}
            </Col>
            <Col sm={24} xl={8}>
              <h1 className="bizGrpTitle ellipsis">{lang.get('NAME', bizInfo)}</h1>
            </Col>
            <Col sm={24} xl={7} style={{ textAlign: 'right' }}>
              {/* <Button title="트리보기" className="showBizTreeMobile"><span className="iconArrow" />메뉴보기</Button> */}
              <CopyToClipboard text={window.location.href} onCopy={() => feed.success(`${intlObj.get(messages.urlCopyMassage)}`)}>
                <BtnIconShare title={intlObj.get(messages.urlCopy)} style={{ marginRight: 6 }} />
              </CopyToClipboard>
              {bizInfo.WG_COUNT > 0 ? (
                <BtnLgtGrayRegisted title={intlObj.get(messages.apping)}>{intlObj.get(messages.apping)}</BtnLgtGrayRegisted>
              ) : (
                <BtnIconRegist title={intlObj.get(messages.registBiz)} onClick={this.handleRegistBiz} />
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
  match: PropTypes.object.isRequired,
  BIZGRP_ID: PropTypes.number.isRequired,
  bizInfo: PropTypes.object.isRequired,
  bizManagerList: PropTypes.array.isRequired,
  handleGetBizInfo: PropTypes.func.isRequired,
  registBiz: PropTypes.func.isRequired,
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

const withConnect = connect(mapStateToProps, mapDispatchToProps);

const withReducer = injectReducer({ key: 'topMenu', reducer });
const withSaga = injectSaga({ key: 'topMenu', saga });

export default compose(withReducer, withSaga, withConnect)(TopMenu);
