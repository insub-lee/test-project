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
// import { intlObj, lang } from 'utils/commonUtils';
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
import MyAppTree from '../../components/MyAppTree';
import StyleCategory from './StyleCategory';
import StyleCategoryForm from './StyleCategoryForm';

const Option = Select.Option; // eslint-disable-line
const { TextArea } = Input;

class Category extends React.Component {
  constructor(prop) {
    super(prop);
    this.state = {
      CATG_ID: 0,
      APP_NAME: '',
      selectedIndex: -1,
      PRNT_ID: 0,
      SITE_ID: 1,
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      DSCR_KOR: '',
      DSCR_ENG: '',
      DSCR_CHN: '',
      // REG_USER_NAME: '',
      // REG_DTTM: '',
      // UPD_USER_NAME: '',
      // UPD_DTTM: '',
      mode: 'D',
      orgNameKor: '',
      orgNameEng: '',
      orgNameChn: '',
      orgDscrKor: '',
      orgDscrEng: '',
      orgDscrChn: '',
    };
    this.props.initCategoryData(1);
    this.props.getCategoryComboList();
  }

  componentWillMount() {
    this.props.initCategoryData(this.state.SITE_ID);
  }

  componentWillReceiveProps(nextProps) {
    // this.setState({
    //   selectedIndex: nextProps.selectedIndex,
    // });
    if (nextProps.categoryData.length > 0) {
      const rootSelectedIndex = nextProps.categoryData[0].CATG_ID;
      // if (rootSelectedIndex === nextProps.selectedIndex && nextProps.tp === 'selectedIndex') {
      if (this.state.selectedIndex === -1) {
        this.setState({
          NAME_KOR: nextProps.categoryData[0].NAME_KOR,
          NAME_ENG: nextProps.categoryData[0].NAME_ENG,
          NAME_CHN: nextProps.categoryData[0].NAME_ENG,
          DSCR_KOR: nextProps.categoryData[0].DSCR_KOR,
          DSCR_ENG: nextProps.categoryData[0].DSCR_ENG,
          DSCR_CHN: nextProps.categoryData[0].DSCR_CHN,
          selectedIndex: rootSelectedIndex,
        });
      }
    }
    if (nextProps.selectedIndex !== this.state.selectedIndex) {
      this.setState({
        selectedIndex: nextProps.selectedIndex,
      });
    }
  }

  onChangeSite = (val) => {
    this.setState({
      CATG_ID: 0,
      APP_NAME: '',
      selectedIndex: -1,
      PRNT_ID: 0,
      SITE_ID: val,
      NAME_KOR: '',
      NAME_ENG: '',
      NAME_CHN: '',
      DSCR_KOR: '',
      DSCR_ENG: '',
      DSCR_CHN: '',
      // REG_USER_NAME: '',
      // REG_DTTM: '',
      // UPD_USER_NAME: '',
      // UPD_DTTM: '',
    });
    this.props.initCategoryData(val);
  }

  onChangeNameKOR = (e) => {
    this.setState({ NAME_KOR: e.target.value });
  }
  onChangeNameENG = (e) => {
    this.setState({ NAME_ENG: e.target.value });
  }
  onChangeNameCHN = (e) => {
    this.setState({ NAME_CHN: e.target.value });
  }
  onChangeDscrKOR = (e) => {
    this.setState({ DSCR_KOR: e.target.value });
  }
  onChangeDscrENG = (e) => {
    this.setState({ DSCR_ENG: e.target.value });
  }
  onChangeDscrCHN = (e) => {
    this.setState({ DSCR_CHN: e.target.value });
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
      this.props.cateUpdate(
        this.state.SITE_ID,
        this.state.selectedIndex,
        this.state.NAME_KOR,
        this.state.NAME_ENG,
        this.state.NAME_CHN,
        this.state.DSCR_KOR,
        this.state.DSCR_ENG,
        this.state.DSCR_CHN,
      );
      this.setState({ mode: 'D' });
    }
  }

  vaildChk = () => {
    if (this.state.NAME_KOR !== '' &&
      this.state.NAME_ENG !== '' &&
      this.state.NAME_CHN !== '') {
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
        <Option value={item.SITE_ID}>{item.NAME_KOR}</Option>)
    );
    const handleTreeOnClick = (node) => {
      this.setState({
        CATG_ID: node.CATG_ID,
        APP_NAME: lang.get('NAME', node),
        selectedIndex: node.CATG_ID,
        PRNT_ID: node.PRNT_ID,
        NAME_KOR: node.NAME_KOR,
        NAME_ENG: node.NAME_ENG,
        NAME_CHN: node.NAME_CHN,
        DSCR_KOR: node.DSCR_KOR,
        DSCR_ENG: node.DSCR_ENG,
        DSCR_CHN: node.DSCR_CHN,
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
        this.props.returnGateId(this.state.CATG_ID, this.state.APP_NAME);
      }
    };

    const returnGateInfo = (PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      this.setState({
        selectedIndex: PRNT_ID,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        DSCR_KOR: '',
        DSCR_ENG: '',
        DSCR_CHN: '',
        mode: 'U',
        orgNameKor: NAME_KOR,
        orgNameEng: NAME_ENG,
        orgNameChn: NAME_CHN,
      });

      this.props.cateinsert(this.state.SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN);
      this.textKor.focus();
    };
    const returnGateUpdate = (CATG_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      this.props.cateUpdate(
        this.state.SITE_ID,
        CATG_ID,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        '',
        '',
        '',
      );
    };
    const returnGateDelete = (CATG_ID, SORT_SQ) => {
      // alert(resultObj1 + resultObj2);
      this.props.cateDelete(this.state.SITE_ID, CATG_ID, SORT_SQ);
    };

    const moveMymenu = (treeData) => {
      this.props.moveMymenu(this.state.SITE_ID, treeData);
    };

    const botBtn = (mode) => {
      if (mode === 'I') { // 등록
        return (
          <React.Fragment>
            {/* <LinkBtnLgtGray>
              <Link to="../GlobalAdmin/">취소</Link>
            </LinkBtnLgtGray>
            <BtnDkGray onClick={this.regGlobalMsg}>저장</BtnDkGray> */}
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
              orgDscrKor: this.state.DSCR_KOR,
              orgDscrEng: this.state.DSCR_ENG,
              orgDscrChn: this.state.DSCR_CHN,
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
              DSCR_KOR: this.state.orgDscrKor,
              DSCR_ENG: this.state.orgDscrEng,
              DSCR_CHN: this.state.orgDscrChn,
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
          <h3 className="pageTitle list">AppCategory 관리</h3>
          {/* <div style={{ display: 'inline-block', width: '100%', minHeight: 'calc(100vh - 200px)' }}> */}
          <div style={{ display: 'inline-block', width: '100%', minHeight: '100%' }}>
            <div className="categoryTreeWrapper">
              <div>
                <Select defaultValue={1} onChange={this.onChangeSite}>
                  {/* <Option value={0}>공통</Option> */}
                  {comboOptions(this.props.setCategoryComboList)}
                </Select>
                <MyAppTree
                  type={type}
                  treeData={this.props.categoryData}
                  onClick={handleTreeOnClick}
                  returnGateInfo={returnGateInfo}
                  returnGateUpdate={returnGateUpdate}
                  returnGateDelete={returnGateDelete}
                  history={this.props.history}
                  selectedIndex={this.state.selectedIndex}
                  canDrag={true}
                  canDrop={true}
                  moveMymenu={moveMymenu}
                  onOk={onOk}
                />
              </div>
            </div>
            <div className="categoryContents">
              <h4>카테고리 명칭 및 설명</h4>
              <StyleCategoryForm>
                <table className="adminTbl categoryTbl">
                  <tbody>
                    <tr>
                      <th className="required">
                        <label htmlFor="v2">카테고리 명(KOR)</label>
                      </th>
                      <td>
                        <Input
                          id="v2"
                          value={this.state.NAME_KOR}
                          onChange={this.onChangeNameKOR}
                          readOnly={this.state.mode === 'D'}
                        />
                      </td>
                    </tr>
                    <tr>
                      <th className="required">
                        <label htmlFor="v3">카테고리 명(ENG)</label>
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
                        <label htmlFor="v4">카테고리 명(CHN)</label>
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
                      <th>
                        <label htmlFor="v5">카테고리 설명(KOR)</label>
                      </th>
                      <td>
                        {/* <Input id="v5" value={this.state.DSCR_KOR} readOnly className="readonly" /> */}
                        <TextArea
                          value={this.state.DSCR_KOR}
                          onChange={this.onChangeDscrKOR}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          ref={(ref) => {
                            if (ref) {
                              this.textKor = ref;
                            }
                          }}
                          id="v5"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v6">카테고리 설명(ENG)</label>
                      </th>
                      <td>
                        {/* <Input id="v6" value={this.state.DSCR_ENG} readOnly className="readonly" /> */}
                        <TextArea
                          value={this.state.DSCR_ENG}
                          onChange={this.onChangeDscrENG}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="v6"
                        />
                      </td>
                    </tr>
                    <tr>
                      <th>
                        <label htmlFor="v7">카테고리 설명(CHN)</label>
                      </th>
                      <td>
                        {/* <Input id="v7" value={this.state.DSCR_CHN} readOnly className="readonly" /> */}
                        <TextArea
                          value={this.state.DSCR_CHN}
                          onChange={this.onChangeDscrCHN}
                          readOnly={this.state.mode === 'D'}
                          autosize={{ minRows: 1, maxRow: 4 }}
                          id="v7"
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

Category.propTypes = {
  // type: PropTypes.string.isRequired,
  show: PropTypes.bool,  //eslint-disable-line
  onCancel: PropTypes.func,  //eslint-disable-line
  initCategoryData: PropTypes.func, //eslint-disable-line
  categoryData: PropTypes.array, //eslint-disable-line
  selectedIndex: PropTypes.number, //eslint-disable-line
  titleModalVisible: PropTypes.bool, //eslint-disable-line
  history: PropTypes.object, //eslint-disable-line
  returnGateId: PropTypes.func.isRequired, //eslint-disable-line
  cateinsert: PropTypes.func, //eslint-disable-line
  returnGateUpdate: PropTypes.func.isRequired, //eslint-disable-line
  cateUpdate: PropTypes.func, //eslint-disable-line
  cateDelete: PropTypes.func, //eslint-disable-line
  moveMymenu: PropTypes.func, //eslint-disable-line
  getCategoryComboList: PropTypes.func, //eslint-disable-line
  setCategoryComboList: PropTypes.array, //eslint-disable-line
  tp: PropTypes.string, //eslint-disable-line
};

export function mapDispatchToProps(dispatch) {
  return {
    // 카테고리
    initCategoryData: SITE_ID => dispatch(actions.initCategoryData(SITE_ID)),
    cateinsert: (SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN) => {
      dispatch(actions.cateinsert(SITE_ID, PRNT_ID, NAME_KOR, NAME_ENG, NAME_CHN));
    },
    cateUpdate: (
      SITE_ID,
      CATG_ID,
      NAME_KOR,
      NAME_ENG,
      NAME_CHN,
      DSCR_KOR,
      DSCR_ENG,
      DSCR_CHN,
    ) => {
      dispatch(actions.cateUpdate(
        SITE_ID,
        CATG_ID,
        NAME_KOR,
        NAME_ENG,
        NAME_CHN,
        DSCR_KOR,
        DSCR_ENG,
        DSCR_CHN,
      ));
    },
    cateDelete: (SITE_ID, CATG_ID, SORT_SQ) => {
      dispatch(actions.cateDelete(SITE_ID, CATG_ID, SORT_SQ));
    },
    moveMymenu: (SITE_ID, treeData) => dispatch(actions.moveMymenu(SITE_ID, treeData)),
    getCategoryComboList: () => dispatch(actions.getCategoryComboList()),
  };
}

const mapStateToProps = createStructuredSelector({
  setCategoryComboList: selectors.makeSelectCategoryComboList(),
  categoryData: selectors.makeCategoryData(),
  selectedIndex: selectors.makeSelectedIndex(),
  tp: selectors.makeSelectTp(),
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);
const withSaga = injectSaga({ key: 'Category', saga });
const withReducer = injectReducer({ key: 'Category', reducer });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(Category);
