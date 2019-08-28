import React from 'react';
import { Menu, Icon } from 'antd';
import { fromJS } from 'immutable';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';

import selectors from '../selectors';
import * as actions from '../actions';

const ManualMenu = ({ handleChangeIsEditorMgr, movePageType, handleChangePageType, handleSelectOptionMgr, defaultMgrMap, handleSelectCompareMgr }) => (
  <Menu mode="horizontal" selectedKeys={[movePageType.get('pageType')]} style={{ marginBottom: '20px' }}>
    <Menu.Item key="DefaultMgr" onClick={() => handleChangePageType('DefaultMgr')}>
      <Icon type="form" />
      기본정보
    </Menu.Item>
    <Menu.Item key="ManualWrite" onClick={handleChangeIsEditorMgr}>
      <Icon type="edit" />
      매뉴얼작성
    </Menu.Item>
    <Menu.Item key="OptionMgr" onClick={() => handleSelectOptionMgr()}>
      <Icon type="setting" />
      옵션
    </Menu.Item>
    <Menu.Item key="Compare" disabled={defaultMgrMap.get('MUAL_TYPE') === 1} onClick={() => handleSelectCompareMgr()}>
      <Icon type="diff" />
      상품비교정보
    </Menu.Item>
    {/* <Menu.Item key="DisplayDefine" onClick={() => handleChangePageType('DisplayDefine')}>
      <Icon type="layout" />
      화면정의
    </Menu.Item>
    <Menu.Item key="Draft" onClick={() => handleChangePageType('Draft')}>
      <Icon type="audit" />
      심의요청
    </Menu.Item> */}
  </Menu>
);

ManualMenu.propTypes = {
  handleChangeIsEditorMgr: PropTypes.func,
  handleChangePageType: PropTypes.func,
  movePageType: PropTypes.object,
  handleSelectOptionMgr: PropTypes.func,
  defaultMgrMap: PropTypes.object,
  handleSelectCompareMgr: PropTypes.func,
};

ManualMenu.defaultProps = {
  handleChangeIsEditorMgr: () => false,
  handleChangePageType: () => false,
  movePageType: fromJS({}),
  handleSelectOptionMgr: () => false,
  defaultMgrMap: fromJS({}),
  handleSelectCompareMgr: () => false,
};

const mapStateToProps = createStructuredSelector({
  movePageType: selectors.makeSelectMovePageType(),
  defaultMgrMap: selectors.makeSelectDefaultMgr(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeIsEditorMgr: () => dispatch(actions.setIsEditorMgrByReduc(true)),
  handleChangePageType: pageType => dispatch(actions.setPageTypeByReduc(pageType)),
  handleSelectOptionMgr: () => {
    // dispatch(actions.getOptionMgrBySaga());
    dispatch(actions.setPageTypeByReduc('OptionMgr'));
  },
  handleSelectCompareMgr: () => {
    dispatch(actions.getCompareMgrBySaga());
    dispatch(actions.setPageTypeByReduc('Compare'));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ManualMenu);
