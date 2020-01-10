import React, { Component } from 'react';
// import AsyncSelect from 'react-select/async';

import PropTypes, { object } from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Input, DatePicker, Checkbox, Button, Select, Spin, Modal, Table, message } from 'antd';
import locale from 'antd/lib/date-picker/locale/ko_KR';
import moment from 'moment';
import { fromJS } from 'immutable';

import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';
import selectors from '../selectors';
import * as actions from '../actions';
import * as manageActions from '../../actions';
import StyledButton from '../../../../../../components/Button/StyledButton';

import StyleDefaultMgr from './StyleDefaultMgr';
import AddManualType from './AddManualType';
import SecurityManage from './SecurityManage';

const { Option, OptGroup } = Select;
const { Search } = Input;

const AntdTable = StyledAntdTable(Table);
const columnInfo = [
  {
    title: '구분',
    dataIndex: 'ACNT_NAME',
    align: 'center',
  },
  {
    title: '적용대상',
    dataIndex: 'ACCOUNT_NAME',
    key: 'ACCOUNT_ID',
    align: 'center',
  },
  {
    title: '조회',
    dataIndex: 'ISREAD',
    align: 'center',
  },
  {
    title: '입력',
    dataIndex: 'ISCREATE',
    align: 'center',
  },
  {
    title: '수정',
    dataIndex: 'ISUPDATE',
    align: 'center',
  },
  {
    title: '삭제',
    dataIndex: 'ISDELETE',
    align: 'center',
  },
  {
    title: '관리',
    dataIndex: 'ISADMIN',
    align: 'center',
  },
];

class DefaultMgr extends Component {
  constructor(props) {
    super(props);
    this.fetchUser = debounce(this.fetchUser, 500);
  }

  userHandleChange = selectedUser => {
    const { SetSelectedUserInfo } = this.props;
    SetSelectedUserInfo(fromJS(selectedUser));
  };

  fetchUser = value => {
    const { GetUserInfoBySaga } = this.props;
    // console.debug('fatchUser loading');
    GetUserInfoBySaga(value);
  };

  componentDidUpdate(prevProps) {
    const { pageMoveType, GetDefaultMgrBySaga, GetSelectedUserInfoSaga, getContentSecurityList } = this.props;
    const { pageMoveType: prevPageMoveType } = prevProps;

    if (Number(pageMoveType.get('selectedMualIdx')) !== 0 && Number(pageMoveType.get('selectedMualIdx')) !== Number(prevPageMoveType.get('selectedMualIdx'))) {
      // saga를 통해 기존에 매뉴얼 정보를 읽어온다.
      GetDefaultMgrBySaga();
      GetSelectedUserInfoSaga();
      getContentSecurityList();
    }
    // else if (pageMoveType.get('selectedMualIdx') === 0 && pageMoveType.get('selectedCategoryIdx') !== prevProps.pageMoveType.get('selectedCategoryIdx')) {
    //   InitDefaultMgr();
    // }
  }

  handleClickSecurityManage() {
    const { setIsSecurityModal, getSecuritySelectData, getContentSecurityList } = this.props;
    setIsSecurityModal(true);
    getSecuritySelectData();
    getContentSecurityList();
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
      contentSecurityViewList,
      setIsSecurityModal,
      isSecurityModal,
      listDept,
      listGrp,
      listUser,
      contentSecurityList,
      setContentSecurityList,
      saveContentSecurity,
      removeContentSecurity,
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
              <td>카테고리 경로</td>
              <td colSpan="3">
                <Input id="CATEGORY_PATH" value={defaultMgrMap.get('PATH_NAME')} />
              </td>
            </tr>
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
                <StyledButton className="btn-sm btn-bs-none btn-dark btn-add" onClick={() => setIsAddMualTypeModal(true)}>
                  추가
                </StyledButton>
              </td>
            </tr>
            <tr>
              <td>권한설정</td>
              <td colSpan="3" className="contentSecurityWrap">
                <Button
                  type="dashed"
                  icon="setting"
                  className="setSecurityBtn"
                  onClick={() =>
                    defaultMgrMap.get('MUAL_ORG_IDX') === 0 ? message.warning('매뉴얼 등록 후 권한 설정할 수 있습니다') : this.handleClickSecurityManage()
                  }
                >
                  권한설정
                </Button>
                <AntdTable columns={columnInfo} dataSource={contentSecurityViewList} key="securityViewTable" rowKey={record => record.ACCOUNT_ID}></AntdTable>
              </td>
            </tr>
            <tr>
              <td colSpan="4" className="defaultMgrButtonWarp">
                {pageMoveType.get('selectedMualIdx') === 0 ? (
                  <StyledButton className="btn-primary btn-bs-none" onClick={InsertDefaultMgrBySaga}>
                    저장
                  </StyledButton>
                ) : (
                  <StyledButton className="btn-primary btn-bs-none" onClick={UpdateDefaultMgrBySaga}>
                    수정
                  </StyledButton>
                )}
                {IsMaxVersion && defaultMgrMap.get('MUAL_STATE') === 'PUBS' && (
                  <StyledButton className="btn-success btn-bs-none" onClick={RevisionManualBySaga}>
                    새버전
                  </StyledButton>
                )}
                {pageMoveType.get('selectedMualIdx') !== 0 && defaultMgrMap.get('MUAL_STATE') === 'WAIT' && (
                  <>
                    <StyledButton className="btn-success btn-bs-none" key="ConfirmDefaultMgrBySaga" onClick={ConfirmDefaultMgrBySaga}>
                      확정
                    </StyledButton>
                    <StyledButton className="btn-dark btn-bs-none" key="RemoveManualBySaga" onClick={RemoveManualBySaga}>
                      삭제
                    </StyledButton>
                  </>
                )}
                {IsMaxVersion && defaultMgrMap.get('VERSIONLIST').size > 1 && defaultMgrMap.get('MUAL_STATE') === 'PUBS' && (
                  <StyledButton className="btn-dark btn-bs-none" onClick={ResetDefaultMgrBySaga}>
                    초기화
                  </StyledButton>
                )}
                <StyledButton className="btn-secondary btn-bs-none" onClick={() => setManualManage('change', pageMoveType.get('selectedCategoryIdx'), 0)}>
                  목록
                </StyledButton>
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
        <Modal
          title="권한설정"
          width={800}
          visible={isSecurityModal}
          getContainer={() => document.querySelector('#defaultMgrWrapper')}
          onCancel={() => setIsSecurityModal(false)}
          destroyOnClose
          footer={null}
        >
          <SecurityManage
            setIsSecurityModal={setIsSecurityModal}
            listDept={listDept}
            listGrp={listGrp}
            listUser={listUser}
            securityList={contentSecurityList}
            targetKey={defaultMgrMap.get('MUAL_ORG_IDX')}
            targetFolderKey={defaultMgrMap.get('CATEGORY_IDX')}
            setSecurityList={setContentSecurityList}
            saveSecurity={saveContentSecurity}
            removeSecurity={removeContentSecurity}
          />
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
  contentSecurityViewList: selectors.makeSelectContentSecurityViewList(),
  isSecurityModal: selectors.makeSelectIsSecurityModal(),
  listDept: selectors.makeSelectListDept(),
  listGrp: selectors.makeSelectListGrp(),
  listUser: selectors.makeSelectListUser(),
  contentSecurityList: selectors.makeSelectContentSecurityList(),
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
  getContentSecurityList: () => dispatch(actions.getContentSecurityListBySaga()),
  setContentSecurityList: list => dispatch(actions.setContentSecurityListByReducr(list)),
  setIsSecurityModal: flag => dispatch(actions.setIsSecurityModalByReducr(flag)),
  getSecuritySelectData: () => dispatch(actions.getSecuritySelectDataBySaga()),
  saveContentSecurity: () => dispatch(actions.saveContentSecurityBySaga()),
  removeContentSecurity: row => dispatch(actions.removeContentSecurityBySaga(row)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DefaultMgr);
