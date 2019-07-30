import React from 'react';
import { Menu, Icon } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import selectors from '../selectors';
import * as actions from '../actions';

const ManualMenu = ({ handleChangeIsEditorMgr, movePageType, handleChangePageType }) => (
  <Menu mode="horizontal" selectedKeys={[movePageType.get('pageType')]}>
    <Menu.Item key="DefaultMgr" onClick={() => handleChangePageType('DefaultMgr')}>
      <Icon type="setting" />
      기본정보
    </Menu.Item>
    <Menu.Item key="ManualWrite" onClick={handleChangeIsEditorMgr}>
      <Icon type="setting" />
      매뉴얼작성
    </Menu.Item>
    <Menu.Item key="ManualOption" onClick={() => handleChangePageType('ManualOption')}>
      <Icon type="setting" />
      옵션
    </Menu.Item>
    <Menu.Item key="Compare" disabled>
      <Icon type="setting" />
      상품비교정보
    </Menu.Item>
    <Menu.Item key="DisplayDefine" onClick={() => handleChangePageType('DisplayDefine')}>
      <Icon type="setting" />
      화면정의
    </Menu.Item>
    <Menu.Item key="Draft" onClick={() => handleChangePageType('Draft')}>
      <Icon type="setting" />
      심의요청
    </Menu.Item>
  </Menu>
);

ManualMenu.propTypes = {
  handleChangeIsEditorMgr: PropTypes.func,
  handleChangePageType: PropTypes.func,
  movePageType: PropTypes.object,
};

ManualMenu.defaultProps = {
  handleChangeIsEditorMgr: () => false,
  handleChangePageType: () => false,
  movePageType: fromJS({}),
};

const mapStateToProps = createStructuredSelector({
  movePageType: selectors.makeSelectMovePageType(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeIsEditorMgr: () => dispatch(actions.setIsEditorMgrByReduc(true)),
  handleChangePageType: pageType => dispatch(actions.setPageTypeByReduc(pageType)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualMenu);
