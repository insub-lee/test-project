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

class Rank extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      selectedIndex: -1,
      selectedDept: 0,
      mode: 'D',
    };
    // this.props.getRankTreeData();
    this.props.getRankComboList(0);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.rankTreeData.length > 0) {
      const rootSelectedIndex = nextProps.rankTreeData[0].RANK_ID;
      if (this.state.selectedIndex === -1) {
        this.setState({
          RANK_ID: nextProps.rankTreeData[0].RANK_ID,
          NAME_KOR: nextProps.rankTreeData[0].NAME_KOR,
          NAME_ENG: nextProps.rankTreeData[0].NAME_ENG,
          NAME_CHN: nextProps.rankTreeData[0].NAME_ENG,
          NAME_JPN: nextProps.rankTreeData[0].NAME_JPN,
          NAME_ETC: nextProps.rankTreeData[0].NAME_ETC,
          RANK_CD: nextProps.rankTreeData[0].RANK_CD,
          COMP_CD: nextProps.rankTreeData[0].COMP_CD,
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
      RANK_ID: '',
      RANK_NAME: '',
      RANK_CD: '',
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
    this.props.getChangeRankTreeData(val);
  }

  /* 추가 작업
  onChangeRankCODE = (e) => {
    this.setState({ RANK_CODE: e.target.value });
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
  onChangeRANKCD = (e) => {
    this.setState({ RANK_CD: e.target.value });
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
        this.props.updateRank(
          Number(this.state.selectedIndex),
          this.state.RANK_CD,
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
        this.props.insertRank(
          this.state.RANK_CD,
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
      this.state.RANK_CD !== '') {
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
        <Option value={item.RANK_ID}>{item.NAME_KOR}</Option>)
    );
    const handleTreeOnClick = (node) => {
      this.setState({
        RANK_ID: node.RANK_ID,
        RANK_NAME: lang.get('NAME', node),
        RANK_CD: node.RANK_CD,
        selectedIndex: node.RANK_ID,
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
        this.props.returnGateId(this.state.RANK_ID, this.state.RANK_NAME);
      }
    };

    const returnGateInfo = (node) => {
      this.setState({
        mode: 'I',
        RANK_CD: '',
        PRNT_ID: node.RANK_ID,
        NAME_KOR: '',
        NAME_ENG: '',
        NAME_CHN: '',
        NAME_JPN: '',
        NAME_ETC: '',
        COMP_CD: node.COMP_CD,
        selectedIndex: node.RANK_ID,
      });
      // this.props.insertRank(RANK_CD, this.state.RANK_ID, NAME_KOR, NAME_ENG, NAME_CHN, NAME_JPN, NAME_ETC, COMP_CD);
      this.textKor.focus();
    };

    const returnGateDelete = (RANK_ID, PRNT_ID, SORT_SQ) => {
      // alert(resultObj1 + resultObj2);
      this.props.deleteRank(RANK_ID, PRNT_ID, SORT_SQ);
    };

    const moveRank = (treeData) => {
      this.props.moveRank(this.state.selectedDept, treeData);
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
              orgRankCd: this.state.RANK_CD,
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
              RANK_CD: this.state.orgRankCd,
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
          <h3 className="pageTitle list">직급 관리</h3>
          {/* <div style={{ display: 'inline-block', width: '100%', minHeight: '100%' }}> */}
          <div className="pageContent" style={{ display: 'inline-block', width: '100%', height: 'calc(100vh - 170px)' }}>
            <div className="categoryTreeWrapper">
              <div>
                <Select value={this.props.selectedDept} onChange={this.onChangeDept}>
                  {/* <Option value={0}>공통</Option> */}
                  {comboOptions(this.props.setRankComboList)}
                  <Option value={0}>+그룹추가</Option>
                </Select>
                <AdminOrgTree
                  type={type}
                  treeData={this.props.rankTreeData}
                  onClick={handleTreeOnClick}
                  returnGateInfo={returnGateInfo}
                  returnGateDelete={returnGateDelete}
                  history={this.props.history}
                  selectedIndex={this.state.selectedIndex}
                  canDrag={true}
                  canDropOut={false}
                  canDrop={true}
                  moveNode={moveRank}
                  onOk={onOk}
                />
              </div>
            </div>
            <div className="categoryContents">
              <h4>직급 상세</h4>
              <StyleCategoryForm>
                <table className="adminTbl categoryTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="v2">직급 명(KOR)</label>
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
                        <label htmlFor="v3">직급 명(ENG)</label>
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
                        <label htmlFor="v4">직급 명(CHN)</label>
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
                        <label htmlFor="v5">직급 명(JPN)</label>
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
                        <label htmlFor="v6">직급 명(ETC)</label>
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
                        <label htmlFor="v7">직급 코드</label>
                      </th>
                      <td>
                        <Input
                          id="v7"
                          value={this.state.RANK_CD}
                          onChange={this.onChangeRANKCD}
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

Rank.propTypes = {
  // type: PropTypes.string.isRequired,
  show: PropTypes.bool,  //eslint-disable-line
  onCancel: PropTypes.func,  //eslint-disable-line
  getRankTreeData: PropTypes.func, //eslint-disable-line
  getChangeRankTreeData: PropTypes.func, //eslint-disable-line
  rankTreeData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  titleModalVisible: PropTypes.bool, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  returnGateId: PropTypes.func.isRequired, //eslint-disable-line
  insertRank: PropTypes.func, //eslint-disable-line
  updateRank: PropTypes.func, //eslint-disable-line
  deleteRank: PropTypes.func, //eslint-disable-line
  moveRank: PropTypes.func, //eslint-disable-line
  getRankComboList: PropTypes.func, //eslint-disable-line
  setRankComboList: PropTypes.array, //eslint-disable-line
  selectedDept: PropTypes.number.isRequired,
};

export function mapDispatchToProps(dispatch) {
  return {
    getRankTreeData: () => dispatch(actions.getRankTreeData()),
    getChangeRankTreeData: RANK_ID => dispatch(actions.getChangeRankTreeData(RANK_ID)),
    insertRank: (
      RANK_CD,
      PRNT_ID,
      NAME_KOR,
      NAME_ENG,
      NAME_CHN,
      NAME_JPN,
      NAME_ETC,
      COMP_CD,
      selectedDept,
    ) => {
      dispatch(actions.insertRank(
        RANK_CD,
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
    updateRank: (
      RANK_ID,
      RANK_CD,
      PRNT_ID,
      NAME_KOR,
      NAME_ENG,
      NAME_CHN,
      NAME_JPN,
      NAME_ETC,
      COMP_CD,
      selectedDept,
    ) => {
      dispatch(actions.updateRank(
        RANK_ID,
        RANK_CD,
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
    deleteRank: (RANK_ID, PRNT_ID, SORT_SQ, selectedDept) => {
      dispatch(actions.deleteRank(RANK_ID, PRNT_ID, SORT_SQ, selectedDept));
    },
    moveRank: (selectedDept, treeData) => dispatch(actions.moveRank(selectedDept, treeData)),
    getRankComboList: RANK_ID => dispatch(actions.getRankComboList(RANK_ID)),
  };
}

const mapStateToProps = createStructuredSelector({
  setRankComboList: selectors.makeSelectRankComboList(),
  rankTreeData: selectors.makeRankTreeData(),
  selectedDept: selectors.makeSelectedDept(),
  selectedIndex: selectors.makeSelectedIndex(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Rank', saga });
const withReducer = injectReducer({ key: 'Rank', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Rank);
