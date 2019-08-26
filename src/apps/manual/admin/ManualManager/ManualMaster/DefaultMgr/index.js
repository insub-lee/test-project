import React, { Component } from 'react';
// import AsyncSelect from 'react-select/async';

import PropTypes, { object } from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, DatePicker, Checkbox, Button, Select, Spin, Modal } from 'antd';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';

import selectors from '../selectors';
import * as actions from '../actions';
import * as manageActions from '../../actions';

import StyleDefaultMgr from './StyleDefaultMgr';
import AddManualType from './AddManualType';

const { Option, OptGroup } = Select;
const { Search } = Input;

class DefaultMgr extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 500);
  }

  userHandleChange = selectedUser => {
    const { SetSelectedUserInfo } = this.props;
    // console.debug('selectedUser', selectedUser);
    SetSelectedUserInfo(selectedUser);
  };

  fetchUser = value => {
    const { GetUserInfoBySaga } = this.props;
    // console.debug('fatchUser loading');
    GetUserInfoBySaga(value);
  };

  componentDidUpdate(prevProps) {
    const { pageMoveType, GetDefaultMgrBySaga, GetSelectedUserInfoSaga } = this.props;
    const { pageMoveType: prevPageMoveType } = prevProps;

    if (Number(pageMoveType.get('selectedMualIdx')) !== 0 && Number(pageMoveType.get('selectedMualIdx')) !== Number(prevPageMoveType.get('selectedMualIdx'))) {
      // saga를 통해 기존에 매뉴얼 정보를 읽어온다.
      GetDefaultMgrBySaga();
      GetSelectedUserInfoSaga();
    }
    // else if (pageMoveType.get('selectedMualIdx') === 0 && pageMoveType.get('selectedCategoryIdx') !== prevProps.pageMoveType.get('selectedCategoryIdx')) {
    //   InitDefaultMgr();
    // }
  }

  renderSelectOption(compareList, idx) {
    if (compareList) {
      return compareList
        .filter(filter => filter.TEMPLET_PIDX === idx)
        .map(node =>
          node.IS_FOLDER === 'Y' ? (
            <OptGroup key={`compareSelectOptGroup_${node.TEMPLET_IDX}`} label={node.TEMPLET_NAME}>
              {this.renderSelectOption(compareList, node.TEMPLET_IDX)}
            </OptGroup>
          ) : (
            <Option key={`compareSelectOption_${node.TEMPLET_IDX}`} value={node.TEMPLET_IDX}>
              {node.TEMPLET_NAME}
            </Option>
          ),
        );
    }
    return '';
  }

  render() {
    const {
      pageMoveType,
      setDefaultMgrChangeValue,
      defaultMgrMap,
      InsertDefaultMgrBySaga,
      UpdateDefaultMgrBySaga,
      userInfoList,
      selectedUserInfo,
      setManualManage,
      RevisionManualBySaga,
      ConfirmDefaultMgrBySaga,
      ResetDefaultMgrBySaga,
      RemoveManualBySaga,
      GetDefaultMgrByVersionBySaga,
      isAddMualTypeModal,
      setIsAddMualTypeModal,
      compareList,
    } = this.props;
    let IsMaxVersion = false;
    if (defaultMgrMap && defaultMgrMap.get('VERSION') > 0) {
      const maxVersion = defaultMgrMap.get('VERSIONLIST').maxBy(item => item.VERSION);
      IsMaxVersion = maxVersion.get('VERSION') === defaultMgrMap.get('VERSION');
    }

    return (
      <StyleDefaultMgr id="defaultMgrWrapper">
        <table cellPadding="5">
          <tbody>
            <tr>
              <td>매뉴얼명</td>
              <td colSpan="3">
                <Input id="MUAL_NAME" onChange={e => setDefaultMgrChangeValue('MUAL_NAME', e.target.value)} value={defaultMgrMap.get('MUAL_NAME')} />
              </td>
            </tr>
            <tr>
              <td>담당자</td>
              <td colSpan="3">
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>
                      <td style={{ width: '100%' }}>
                        <Select
                          mode="multiple"
                          labelInValue
                          defaultOpen={false}
                          value={selectedUserInfo}
                          placeholder="Select users"
                          notFoundContent={<Spin size="small" />}
                          defaultActiveFirstOption={false}
                          filterOption={false}
                          onSearch={this.fetchUser}
                          onChange={this.userHandleChange}
                          style={{ width: '100%' }}
                        >
                          {userInfoList &&
                            userInfoList.map(selectedUser => (
                              <Option key={selectedUser.get('USER_ID')} value={selectedUser.get('USER_ID')}>
                                {`${selectedUser.get('NAME_KOR')} (${selectedUser.get('DEPT_NAME_KOR')},${selectedUser.get('PSTN_NAME_KOR')})`}
                              </Option>
                            ))}
                        </Select>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td>배포일</td>
              <td>
                <DatePicker
                  id="PUBDATE"
                  locale={locale}
                  value={moment(defaultMgrMap.get('PUBDATE'))}
                  onChange={(date, dateSTring) => {
                    setDefaultMgrChangeValue('PUBDATE', dateSTring);
                  }}
                />
              </td>
              <td>만료일</td>
              <td>
                <DatePicker
                  id="ENDDATE"
                  locale={locale}
                  value={moment(defaultMgrMap.get('ENDDATE'))}
                  onChange={(date, dateSTring) => {
                    setDefaultMgrChangeValue('ENDDATE', dateSTring);
                  }}
                />
              </td>
            </tr>
            <tr>
              <td>화면표시</td>
              <td>
                <Checkbox id="ISDISPLAY" checked={defaultMgrMap.get('ISDISPLAY')} onChange={e => setDefaultMgrChangeValue('ISDISPLAY', e.target.checked)}>
                  화면표시여부
                </Checkbox>
              </td>
              <td>버전</td>
              <td>
                <Select
                  id="VERSION"
                  style={{ width: 200 }}
                  value={defaultMgrMap.get('VERSION').toString()}
                  onChange={value => GetDefaultMgrByVersionBySaga(value)}
                >
                  {defaultMgrMap.get('VERSIONLIST').map(vItem => (
                    <Option key={vItem.get('MUAL_IDX')} value={vItem.get('VERSION')}>{`${vItem.get('VERSION')}`}</Option>
                  ))}
                </Select>
              </td>
            </tr>
            <tr>
              <td>매뉴얼유형</td>
              <td colSpan="3">
                <Select
                  id="MUAL_TYPE"
                  style={{ width: 200 }}
                  value={defaultMgrMap.get('MUAL_TYPE')}
                  onChange={value => setDefaultMgrChangeValue('MUAL_TYPE', value)}
                >
                  <Option value={1}>일반매뉴얼</Option>
                  {this.renderSelectOption(compareList, 0)}
                </Select>
                <Button type="primary" onClick={() => setIsAddMualTypeModal(true)}>
                  추가
                </Button>
              </td>
            </tr>
            <tr>
              <td colSpan="4" className="defaultMgrButtonWarp">
                {pageMoveType.get('selectedMualIdx') === 0 ? (
                  <Button type="primary" onClick={InsertDefaultMgrBySaga}>
                    저장
                  </Button>
                ) : (
                  <Button type="primary" onClick={UpdateDefaultMgrBySaga}>
                    수정
                  </Button>
                )}
                {IsMaxVersion && defaultMgrMap.get('MUAL_STATE') === 'PUBS' && (
                  <Button type="primary" onClick={RevisionManualBySaga}>
                    새버전
                  </Button>
                )}
                {pageMoveType.get('selectedMualIdx') !== 0 &&
                  defaultMgrMap.get('MUAL_STATE') === 'WAIT' && [
                    <Button type="primary" key="ConfirmDefaultMgrBySaga" onClick={ConfirmDefaultMgrBySaga}>
                      확정
                    </Button>,
                    <Button type="primary" key="RemoveManualBySaga" onClick={RemoveManualBySaga}>
                      삭제
                    </Button>,
                  ]}
                {IsMaxVersion && defaultMgrMap.get('VERSIONLIST').size > 1 && defaultMgrMap.get('MUAL_STATE') === 'PUBS' && (
                  <Button type="primary" onClick={ResetDefaultMgrBySaga}>
                    초기화
                  </Button>
                )}
                <Button type="primary" onClick={() => setManualManage('change', pageMoveType.get('selectedCategoryIdx'), 0)}>
                  목록
                </Button>
              </td>
            </tr>
          </tbody>
        </table>
        <Modal
          width={1158}
          bodyStyle={{ height: 'calc(100vh - 152px)', padding: '4px' }}
          style={{ top: 42 }}
          visible={isAddMualTypeModal}
          footer={null}
          onCancel={() => setIsAddMualTypeModal(false)}
          getContainer={() => document.querySelector('#defaultMgrWrapper')}
          title="매뉴얼유형 추가"
        >
          <AddManualType />
        </Modal>
      </StyleDefaultMgr>
    );
  }
}

DefaultMgr.propTypes = {
  setManualManage: PropTypes.func,
  RevisionManualBySaga: PropTypes.func,
  ConfirmDefaultMgrBySaga: PropTypes.func,
  ResetDefaultMgrBySaga: PropTypes.func,
  RemoveManualBySaga: PropTypes.func,
  GetDefaultMgrByVersionBySaga: PropTypes.func,
  selectedUserInfo: PropTypes.array,
  isAddMualTypeModal: PropTypes.bool,
  setIsAddMualTypeModal: PropTypes.func,
  compareList: PropTypes.arrayOf(PropTypes.object),
};

DefaultMgr.defaultProps = {
  setManualManage: () => false,
  RevisionManualBySaga: () => false,
  ConfirmDefaultMgrBySaga: () => false,
  ResetDefaultMgrBySaga: () => false,
  RemoveManualBySaga: () => false,
  GetDefaultMgrByVersionBySaga: () => false,
  selectedUserInfo: [],
  isAddMualTypeModal: false,
  setIsAddMualTypeModal: () => false,
  compareList: [],
};

const mapStateToProps = createStructuredSelector({
  manualMasterState: selectors.makeSelectManualMaster(),
  defaultMgrMap: selectors.makeSelectDefaultMgr(),
  pageMoveType: selectors.makeSelectMovePageType(),
  userInfoList: selectors.makeSelectUserInfoList(),
  selectedUserInfo: selectors.makeSelectedUserInfo(),
  isAddMualTypeModal: selectors.makeSelectIsAddMualTypeModal(),
  compareList: selectors.makeSelectCompareTemplet(),
});

const mapDispatchToProps = dispatch => ({
  setDefaultMgrChangeValue: (key, value) => dispatch(actions.setDefaultMgrChangeValueByReduc(key, value)),
  GetDefaultMgrBySaga: () => {
    dispatch(actions.getDefaultMgrBySaga());
    dispatch(actions.getCompareTempletListBySaga());
  },
  InsertDefaultMgrBySaga: () => dispatch(actions.insertDefaultMgr()),
  UpdateDefaultMgrBySaga: () => dispatch(actions.updateDefaultMgr()),
  GetUserInfoBySaga: userName => dispatch(actions.getUserInfoBySaga(userName)),
  SetSelectedUserInfo: selectedUserInfo => dispatch(actions.setSelectedUserInfoByReducr(selectedUserInfo)),
  GetSelectedUserInfoSaga: () => dispatch(actions.getSelectedUserInfoBySaga()),
  InitDefaultMgr: () => dispatch(actions.initDefaultMgrByReduc()),
  setManualManage: (pageType, categoryIdx, manualIdx) => dispatch(manageActions.setPageModeByReducr(pageType, categoryIdx, manualIdx)),
  RevisionManualBySaga: () => dispatch(actions.RevisionManualBySaga()),
  ConfirmDefaultMgrBySaga: () => dispatch(actions.ConfirmDefaultMgrBySaga()),
  ResetDefaultMgrBySaga: () => dispatch(actions.ResetDefaultMgrBySaga()),
  RemoveManualBySaga: () => dispatch(actions.RemoveManualBySaga()),
  GetDefaultMgrByVersionBySaga: selectedVersion => dispatch(actions.GetDefaultMgrByVersionBySaga(selectedVersion)),
  setIsAddMualTypeModal: flag => dispatch(actions.setIsAddMualTypeModalByReducr(flag)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(DefaultMgr);
