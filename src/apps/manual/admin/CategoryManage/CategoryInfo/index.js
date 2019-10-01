import React from 'react';
import { Input, Radio, Table, Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import AntRadiobox from 'containers/portal/components/uielements/radiobox.style';
import StyledButton from 'components/Button/StyledButton';
import StyledAntdTable from 'components/CommonStyled/StyledAntdTable';

import selectors from '../selectors';
import * as actions from '../actions';

import StyleCategoryManageForm from './StyleCategoryManageForm';
import SecurityManage from './SecurityManage';

const AntdTable = StyledAntdTable(Table);
const RadioGroup = AntRadiobox(Radio.Group);
const columnInfo = [
  {
    title: '구분',
    dataIndex: ' ACNT_TYPE',
    key: 'ACNT_TYPE',
  },
  {
    title: '적용대상',
    dataIndex: 'TARGETKEY',
    key: 'TARGETKEY',
  },
  {
    title: '하위적용',
    dataIndex: 'ISHERITANCE',
    key: 'ISHERITANCE',
  },
  {
    title: '입력',
    dataIndex: 'ISCREATE',
    key: 'ISCREATE',
  },
  {
    title: '수정',
    dataIndex: 'ISUPDATE',
    key: 'ISUPDATE',
  },
  {
    title: '삭제',
    dataIndex: 'ISDELETE',
    key: 'ISDELETE',
  },
  {
    title: '관리',
    dataIndex: 'ISADMIN',
    key: 'ISADMIN',
  },
];

const CategoryInfoView = ({
  mode,
  categoryInfo,
  handleChangeCategoryItem,
  saveCategoryInfo,
  setIsSecurityModal,
  isSecurityModal,
  getSecuritySelectData,
  listDept,
  listGrp,
  listPstn,
  listDuty,
  listUser,
  getSecurityList,
  securityList,
  setSecurityList,
  saveSecurity,
  saveSecurityRow,
  removeSecurityRow,
}) => (
  <div>
    <div id="categoryContents" className="categoryContents">
      <div className="title">
        <h4>카테고리 기본정보</h4>
      </div>
      <StyleCategoryManageForm>
        <table className="adminTbl categoryTbl">
          <tbody>
            <tr>
              <th className="required">
                <label htmlFor="v2">분류명</label>
              </th>
              <td>
                <Input
                  id="v2"
                  value={categoryInfo.get('CATEGORY_NAME')}
                  onChange={e => handleChangeCategoryItem('CATEGORY_NAME', e.target.value)}
                  readOnly={mode === 'V'}
                />
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v3">표시여부</label>
              </th>
              <td>
                <RadioGroup
                  onChange={e => handleChangeCategoryItem('DISPLAY_YN', e.target.value)}
                  value={categoryInfo.get('DISPLAY_YN') || 'Y'}
                  readOnly={mode === 'V'}
                >
                  <Radio value="Y" disabled={mode === 'V'}>
                    표시
                  </Radio>
                  <Radio value="N" disabled={mode === 'V'}>
                    미표시
                  </Radio>
                </RadioGroup>
              </td>
            </tr>
            <tr>
              <th className="required">
                <label htmlFor="v3">권한설정</label>
              </th>
              <td className="setSecurityWrap">
                <Button
                  type="dashed"
                  icon="setting"
                  className="setSecurityBtn"
                  onClick={() => {
                    setIsSecurityModal(true);
                    getSecuritySelectData();
                    getSecurityList();
                  }}
                >
                  권한설정
                </Button>
                <AntdTable columns={columnInfo}></AntdTable>
              </td>
            </tr>
          </tbody>
        </table>
      </StyleCategoryManageForm>
    </div>
    <div className="buttonWrapper">
      <React.Fragment>
        <StyledButton className="btn-primary" onClick={saveCategoryInfo}>
          저장
        </StyledButton>
      </React.Fragment>
    </div>
    <Modal
      title="권한설정"
      width={800}
      visible={isSecurityModal}
      getContainer={() => document.querySelector('#categoryContents')}
      onCancel={() => setIsSecurityModal(false)}
      destroyOnClose
      footer={null}
    >
      <SecurityManage
        setIsSecurityModal={setIsSecurityModal}
        listDept={listDept}
        listGrp={listGrp}
        listPstn={listPstn}
        listDuty={listDuty}
        listUser={listUser}
        securityList={securityList}
        categoryIdx={categoryInfo.get('CATEGORY_IDX')}
        setSecurityList={setSecurityList}
        saveSecurity={saveSecurity}
        saveSecurityRow={saveSecurityRow}
        removeSecurityRow={removeSecurityRow}
      />
    </Modal>
  </div>
);

CategoryInfoView.propTypes = {
  handleChangeViewMode: PropTypes.func,
  handleChangeCategoryItem: PropTypes.func,
  saveCategoryInfo: PropTypes.func,
  mode: PropTypes.string,
  categoryInfo: PropTypes.object,
  setIsSecurityModal: PropTypes.func,
  isSecurityModal: PropTypes.bool,
  getSecuritySelectData: PropTypes.func,
  listDept: PropTypes.array,
  listGrp: PropTypes.array,
  listPstn: PropTypes.array,
  listDuty: PropTypes.array,
  listUser: PropTypes.array,
  getSecurityList: PropTypes.func,
  securityList: PropTypes.array,
  setSecurityList: PropTypes.func,
  saveSecurity: PropTypes.func,
  saveSecurityRow: PropTypes.func,
  removeSecurityRow: PropTypes.func,
};

CategoryInfoView.defaultProps = {
  handleChangeViewMode: () => false,
  handleChangeCategoryItem: () => false,
  saveCategoryInfo: () => false,
  mode: '',
  categoryInfo: {},
  setIsSecurityModal: () => false,
  isSecurityModal: false,
  getSecuritySelectData: () => false,
  listDept: [],
  listGrp: [],
  listPstn: [],
  listDuty: [],
  listUser: [],
  getSecurityList: () => false,
  securityList: [],
  setSecurityList: () => false,
  saveSecurity: () => false,
  saveSecurityRow: () => false,
  removeSecurityRow: () => false,
};

const mapStateToProps = createStructuredSelector({
  mode: selectors.makeSelectMode(),
  categoryInfo: selectors.makeSelectCategoryInfo(),
  isSecurityModal: selectors.makeSelectIsSecurityModal(),
  listDept: selectors.makeSelectListDept(),
  listGrp: selectors.makeSelectListGrp(),
  listPstn: selectors.makeSelectListPstn(),
  listDuty: selectors.makeSelectListDuty(),
  listUser: selectors.makeSelectListUser(),
  securityList: selectors.makeSelectSecurityList(),
});

const mapDispatchToProps = dispatch => ({
  handleChangeViewMode: (node, flag) => dispatch(actions.changeViewMode(node, flag)),
  handleChangeCategoryItem: (key, value) => dispatch(actions.changeCategoryInfo(key, value)),
  saveCategoryInfo: () => dispatch(actions.saveCategoryInfo()),
  setIsSecurityModal: flag => dispatch(actions.setIsSecurityModalByReducr(flag)),
  getSecuritySelectData: () => dispatch(actions.getSecuritySelectDataBySaga()),
  getSecurityList: () => dispatch(actions.getSecurityListBySaga()),
  setSecurityList: list => dispatch(actions.setSecurityListByReducr(list)),
  saveSecurity: () => dispatch(actions.saveSecurityBySaga()),
  saveSecurityRow: (row, flag) => dispatch(actions.saveSecurityRowBySaga(row, flag)),
  removeSecurityRow: row => dispatch(actions.removeSecurityRowBySaga(row)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CategoryInfoView);
