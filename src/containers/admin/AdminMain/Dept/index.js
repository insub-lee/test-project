import React from 'react';
import PropTypes from 'prop-types';
// import { fromJS } from 'immutable';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
// import { put } from 'redux-saga/effects';
import * as feed from 'components/Feedback/functions';
import { lang, intlObj } from 'utils/commonUtils';

import message from 'components/Feedback/message';

import Footer from 'containers/admin/App/Footer';
import { Input, Select } from 'antd';
import { LinkBtnLgtGray, BtnDkGray } from '../../../store/components/uielements/buttons.style';

import reducer from './reducer';
import saga from './saga';
import * as selectors from './selectors';
// import * as constants from './constants';
import * as actions from './actions';
import messages from './messages';
import AdminOrgTree from '../../components/AdminOrgTree';
import StyleCategory from './StyleCategory';
import StyleCategoryForm from './StyleCategoryForm';

const Option = Select.Option; // eslint-disable-line
// const { TextArea } = Input;

class Dept extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      selectedIndex: -1,
      selectedDept: 0,
      mode: 'D',
    };
    // this.props.getDeptTreeData();
    this.props.getDeptComboList(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.deptTreeData.length > 0) {
      const rootSelectedIndex = nextProps.deptTreeData[0].DEPT_ID;
      if (this.state.selectedIndex === -1) {
        this.setState({
          DEPT_ID: nextProps.deptTreeData[0].DEPT_ID,
          NAME_KOR: nextProps.deptTreeData[0].NAME_KOR,
          NAME_ENG: nextProps.deptTreeData[0].NAME_ENG,
          NAME_CHN: nextProps.deptTreeData[0].NAME_ENG,
          NAME_JPN: nextProps.deptTreeData[0].NAME_JPN,
          NAME_ETC: nextProps.deptTreeData[0].NAME_ETC,
          DEPT_CD: nextProps.deptTreeData[0].DEPT_CD,
          COMP_CD: nextProps.deptTreeData[0].COMP_CD,
          selectedIndex: rootSelectedIndex,
          mode: 'D',
        });
      }
      if (this.state.selectedDept === 0) {
        this.setState({
          selectedDept: nextProps.selectedDept,
        });
      }
    }
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onChangeDept = (val) => {
    this.setState({
      DEPT_ID: '',
      DEPT_NAME: '',
      DEPT_CD: '',
      selectedIndex: -1,
      selectedDept: val,
      PRNT_ID: 0,
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      NAME_JPN: '',
      NAME_ETC: '',
      COMP_CD: '',
      // REG_USER_NAME: '',
      // REG_DTTM: '',
      // UPD_USER_NAME: '',
      // UPD_DTTM: '',
    });
    if (val === 0) { // 최상위 등록
      this.setState({ mode: 'I' });
      this.textKor.focus();
    }
    this.props.getChangeDeptTreeData(val);
  }

  /* 추가 작업
  onChangeDeptCODE = (e) => {
    this.setState({ DEPT_CODE: e.target.value });
  }
  */
  onChangeNameKOR = (e) => {
    this.setState({ NAME_KOR: e.target.value });
  }
  onChangeNameENG = (e) => {
    this.setState({ NAME_ENG: e.target.value });
  }
  onChangeNameCHN = (e) => {
    this.setState({ NAME_CHN: e.target.value });
  }
  onChangeNameJPN = (e) => {
    this.setState({ NAME_JPN: e.target.value });
  }
  onChangeNameETC = (e) => {
    this.setState({ NAME_ETC: e.target.value });
  }
  onChangeDEPTCD = (e) => {
    this.setState({ DEPT_CD: e.target.value });
  }
  onChangeCOMPCD = (e) => {
    this.setState({ COMP_CD: e.target.value });
  }

  udtConfirm = () => {
    feed.showConfirm(
      '저장하시겠습니까?',
      '',
      this.udtSave,
    );
  }

  udtSave = () => {
    if (this.vaildChk()) {
      if (this.state.mode === 'U') { // 수정
        this.props.updateDept(
          Number(this.state.selectedIndex),
          this.state.DEPT_CD,
          Number(this.state.PRNT_ID),
          this.state.NAME_KOR,
          this.state.NAME_ENG,
          this.state.NAME_CHN,
          this.state.NAME_JPN,
          this.state.NAME_ETC,
          this.state.COMP_CD,
          this.state.selectedDept,
        );
      }
      if (this.state.mode === 'I') { // 신규등록
        this.props.insertDept(
          this.state.DEPT_CD,
          Number(this.state.PRNT_ID),
          this.state.NAME_KOR,
          this.state.NAME_ENG,
          this.state.NAME_CHN,
          this.state.NAME_JPN,
          this.state.NAME_ETC,
          this.state.COMP_CD,
          this.state.selectedDept,
        );
      }
      this.setState({ mode: 'D' });
    }
  }

  vaildChk = () => {
    if (this.state.NAME_KOR !== '' &&
      this.state.NAME_ENG !== '' &&
      this.state.NAME_CHN !== '' &&
      this.state.NAME_JPN !== '' &&
      this.state.NAME_ETC !== '' &&
      this.state.DEPT_CD !== '') {
      return true;
    }
    message.error(`${intlObj.get(messages.chkInput)}`, 2);
    return false;
  }

  render() {
    // const {
    //   type,
    // } = this.props;
    const type = '';
    const comboOptions = comboList => (
      comboList.map(item =>
        <Option value={item.DEPT_ID}>{item.NAME_KOR}</Option>)
    );
    const handleTreeOnClick = (node) => {
      this.setState({
        DEPT_ID: node.DEPT_ID,
        DEPT_NAME: lang.get('NAME', node),
        DEPT_CD: node.DEPT_CD,
        selectedIndex: node.DEPT_ID,
        PRNT_ID: node.PRNT_ID,
        NAME_KOR: node.NAME_KOR,
        NAME_ENG: node.NAME_ENG,
        NAME_CHN: node.NAME_CHN,
        NAME_JPN: node.NAME_JPN,
        NAME_ETC: node.NAME_ETC,
        COMP_CD: node.COMP_CD,
        // REG_USER_NAME: node.REG_USER_NAME,
        // REG_DTTM: node.REG_DTTM,
        // UPD_USER_NAME: node.UPD_USER_NAME,
        // UPD_DTTM: node.UPD_DTTM,
        mode: 'D',
      });
    };

    const onOk = () => {
      if (this.state.PRNT_ID === -1) {
        // feed.error(`${intlObj.get(messages.topcateno)}`);
        feed.error('에러');
      } else {
        this.props.returnGateId(this.state.DEPT_ID, this.state.DEPT_NAME);
      }
    };

    const returnGateInfo = (node) => {
      this.setState({
        mode: 'I',
        DEPT_CD: '',
        PRNT_ID: node.DEPT_ID,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        NAME_JPN: '',
        NAME_ETC: '',
        COMP_CD: node.COMP_CD,
        selectedIndex: node.DEPT_ID,
      });
      // this.props.insertDept(DEPT_CD, this.state.DEPT_ID, NAME_KOR, NAME_ENG, NAME_CHN, NAME_JPN, NAME_ETC, COMP_CD);
      this.textKor.focus();
    };

    const returnGateDelete = (DEPT_ID, PRNT_ID, SORT_SQ) => {
      // alert(resultObj1 + resultObj2);
      this.props.deleteDept(DEPT_ID, PRNT_ID, SORT_SQ);
    };

    const moveDept = (treeData) => {
      this.props.moveDept(this.state.selectedDept, treeData);
    };

    const botBtn = (mode) => {
      if (mode === 'I') { // 등록
        return (
          <React.Fragment>
            {/* <LinkBtnLgtGray onClick={() => {
                this.setState({
                  mode: 'D',
                });
                // this.props.history.goBack();
            }}
            >취소
            </LinkBtnLgtGray> */}
            <BtnDkGray onClick={this.udtConfirm}>저장</BtnDkGray>
          </React.Fragment>
        );
      } else if (mode === 'D') { // 상세
        return (
          <React.Fragment>
            {/* <div style={{ float: 'left' }}> */}
            {/* <BtnDelete onClick={this.delConfirm}>삭제</BtnDelete> */}
            {/* </div> */}
            <BtnDkGray
              style={{ float: 'rigth' }}
              onClick={() => this.setState({
              mode: 'U',
              orgNameKor: this.state.NAME_KOR,
              orgNameEng: this.state.NAME_ENG,
              orgNameChn: this.state.NAME_CHN,
              orgNameJpn: this.state.NAME_JPN,
              orgNameEtc: this.state.NAME_ETC,
              orgCompCd: this.state.COMP_CD,
              orgDeptCd: this.state.DEPT_CD,
             })}
            >수정
            </BtnDkGray>
          </React.Fragment>
        );
      } else if (mode === 'U') { // 수정
        return (
          <React.Fragment>
            <LinkBtnLgtGray onClick={() => this.setState({
              mode: 'D',
              NAME_KOR: this.state.orgNameKor,
              NAME_ENG: this.state.orgNameEng,
              NAME_CHN: this.state.orgNameChn,
              NAME_JPN: this.state.orgNameJpn,
              NAME_ETC: this.state.orgNameEtc,
              COMP_CD: this.state.orgCompCd,
              DEPT_CD: this.state.orgDeptCd,
              })}
            >취소
            </LinkBtnLgtGray>
            <BtnDkGray onClick={this.udtConfirm}>저장</BtnDkGray>
          </React.Fragment>
        );
      }
      return '';
    };

    return (
      <div>
        <StyleCategory>
          <h3 className="pageTitle list">부서 관리</h3>
          {/* <div style={{ display: 'inline-block', width: '100%', minHeight: '100%' }}> */}
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="categoryTreeWrapper">
              <div>
                <Select value={this.props.selectedDept} onChange={this.onChangeDept}>
                  {/* <Option value={0}>공통</Option> */}
                  {comboOptions(this.props.setDeptComboList)}
                  <Option value={0}>+그룹추가</Option>
                </Select>
                <AdminOrgTree
                  type={type}
                  treeData={this.props.deptTreeData}
                  onClick={handleTreeOnClick}
                  returnGateInfo={returnGateInfo}
                  returnGateDelete={returnGateDelete}
                  history={this.props.history}
                  selectedIndex={this.state.selectedIndex}
                  canDrag={true}
                  canDropOut={false}
                  canDrop={false}
                  moveNode={moveDept}
                  onOk={onOk}
                />
              </div>
            </div>
            <div className="categoryContents">
              <h4>부서 상세</h4>
              <StyleCategoryForm>
                <table className="adminTbl categoryTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="v2">부서 명(KOR)</label>
                      </th>
                      <td>
                        <Input
                          id="v2"
                          value={this.state.NAME_KOR}
                          onChange={this.onChangeNameKOR}
                          readOnly={this.state.mode === 'D'}
                          ref={(ref) => {
                            if (ref) {
                              this.textKor = ref;
                            }
                          }}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v3">부서 명(ENG)</label>
                      </th>
                      <td>
                        <Input
                          id="v3"
                          value={this.state.NAME_ENG}
                          onChange={this.onChangeNameENG}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v4">부서 명(CHN)</label>
                      </th>
                      <td>
                        <Input
                          id="v4"
                          value={this.state.NAME_CHN}
                          onChange={this.onChangeNameCHN}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v5">부서 명(JPN)</label>
                      </th>
                      <td>
                        <Input
                          id="v5"
                          value={this.state.NAME_JPN}
                          onChange={this.onChangeNameJPN}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v6">부서 명(ETC)</label>
                      </th>
                      <td>
                        <Input
                          id="v6"
                          value={this.state.NAME_ETC}
                          onChange={this.onChangeNameETC}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v7">부서 코드</label>
                      </th>
                      <td>
                        <Input
                          id="v7"
                          value={this.state.DEPT_CD}
                          onChange={this.onChangeDEPTCD}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v8">법인 코드</label>
                      </th>
                      <td>
                        <Input
                          id="v8"
                          value={this.state.COMP_CD}
                          onChange={this.onChangeCOMPCD}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    {/* <tr>
                      <th>
                        <label htmlFor="v8">등록자</label>
                      </th>
                      <td>
                        <Input id="v8" value={this.state.REG_USER_NAME} readOnly className="readonly" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v9">등록일</label>
                      </th>
                      <td>
                        <Input id="v9" value={this.state.REG_DTTM} readOnly className="readonly" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v10">수정자</label>
                      </th>
                      <td>
                        <Input id="v10" value={this.state.UPD_USER_NAME} readOnly className="readonly" />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v11">수정일</label>
                      </th>
                      <td>
                        <Input id="v11" value={this.state.UPD_DTTM} readOnly className="readonly" />
                      </td>
                    </tr> */}
                  </tbody>
                </table>
              </StyleCategoryForm>
            </div>
            <div className="buttonWrapper">
              {botBtn(this.state.mode)}
            </div>
          </div>
          <Footer />
        </StyleCategory>
      </div>
    );
  }
}

Dept.propTypes = {
  // type: PropTypes.string.isRequired,
  show: PropTypes.bool,  //eslint-disable-line
  onCancel: PropTypes.func,  //eslint-disable-line
  getDeptTreeData: PropTypes.func, //eslint-disable-line
  getChangeDeptTreeData: PropTypes.func, //eslint-disable-line
  deptTreeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  titleModalVisible: PropTypes.bool, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  returnGateId: PropTypes.func.isRequired, //eslint-disable-line
  insertDept: PropTypes.func, //eslint-disable-line
  updateDept: PropTypes.func, //eslint-disable-line
  deleteDept: PropTypes.func, //eslint-disable-line
  moveDept: PropTypes.func, //eslint-disable-line
  getDeptComboList: PropTypes.func, //eslint-disable-line
  setDeptComboList: PropTypes.array, //eslint-disable-line
  selectedDept: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getDeptTreeData: () => dispatch(actions.getDeptTreeData()),
    getChangeDeptTreeData: DEPT_ID => dispatch(actions.getChangeDeptTreeData(DEPT_ID)),
    insertDept: (
      DEPT_CD,
      PRNT_ID,
      NAME_KOR,
      NAME_ENG,
      NAME_CHN,
      NAME_JPN,
      NAME_ETC,
      COMP_CD,
      selectedDept,
    ) => {
      dispatch(actions.insertDept(
        DEPT_CD,
        PRNT_ID,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        NAME_JPN,
        NAME_ETC,
        COMP_CD,
        selectedDept,
      ));
    },
    updateDept: (
      DEPT_ID,
      DEPT_CD,
      PRNT_ID,
      NAME_KOR,
      NAME_ENG,
      NAME_CHN,
      NAME_JPN,
      NAME_ETC,
      COMP_CD,
      selectedDept,
    ) => {
      dispatch(actions.updateDept(
        DEPT_ID,
        DEPT_CD,
        PRNT_ID,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        NAME_JPN,
        NAME_ETC,
        COMP_CD,
        selectedDept,
      ));
    },
    deleteDept: (DEPT_ID, PRNT_ID, SORT_SQ, selectedDept) => {
      dispatch(actions.deleteDept(DEPT_ID, PRNT_ID, SORT_SQ, selectedDept));
    },
    moveDept: (selectedDept, treeData) => dispatch(actions.moveDept(selectedDept, treeData)),
    getDeptComboList: DEPT_ID => dispatch(actions.getDeptComboList(DEPT_ID)),
  };
}

const mapStateToProps = createStructuredSelector({
  setDeptComboList: selectors.makeSelectDeptComboList(),
  deptTreeData: selectors.makeDeptTreeData(),
  selectedDept: selectors.makeSelectedDept(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Dept', saga });
const withReducer = injectReducer({ key: 'Dept', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Dept);
