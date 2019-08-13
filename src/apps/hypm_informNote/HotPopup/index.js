import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Input, Button, Popover } from 'antd';
import { BtnSearchDkBlue } from './buttons.style';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import GridDetail from './gridDetail.js';
import * as feed from '../../../components/Feedback/functions';
import * as authSelectors from 'containers/common/Auth/selectors';
import EqidSearch from '../../hypm_common/popup/eqidSearch';

// const Options = Select.Option;

let ARR_PARAM_FAB;
let ARR_PARAM_TEAM;
let ARR_PARAM_SDPT_LENGTH;
let ARR_PARAM_SDPT;
let ARR_PARAM_FL_LENGTH;
let ARR_PARAM_FL;
let ARR_PARAM_MODEL_LENGTH;
let ARR_PARAM_MODEL;
let ARR_PARAM_EQID;
let ARR_PARAM_TYPE;
let SEQ_NUM;

const isNull = value => value === '' || value === undefined || value === null;
class HotPopup extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    const { PARAM } = params;
    let arrParam = [];
    arrParam = PARAM.split('|');
    ARR_PARAM_FAB = arrParam[0] === undefined ? '' : arrParam[0];
    ARR_PARAM_TEAM = arrParam[1] === undefined ? '' : arrParam[1];
    ARR_PARAM_SDPT_LENGTH = arrParam[2] === undefined ? '' : arrParam[2];
    ARR_PARAM_SDPT = arrParam[3] === undefined ? '' : arrParam[3];
    ARR_PARAM_FL_LENGTH = arrParam[4] === undefined ? '' : arrParam[4];
    ARR_PARAM_FL = arrParam[5] === undefined ? '' : arrParam[5];
    ARR_PARAM_MODEL_LENGTH = arrParam[6] === undefined ? '' : arrParam[6];
    ARR_PARAM_MODEL = arrParam[7] === undefined ? '' : arrParam[7];
    ARR_PARAM_EQID = arrParam[8] === undefined ? '' : arrParam[8];
    ARR_PARAM_TYPE = arrParam[9] === undefined ? '' : arrParam[9];
    this.state = {
      defineName: '',
      targetKeys: [],
      eqIdValue: undefined,
      popoverVisible: false,
    };
    this.props.handleLoadingParam();
  }
  handleInit = () => {
    this.state.defineName = '';
    this.props.handleInit();
  }
  handleDefineGet = () => {
    SEQ_NUM = '';
    this.state.defineName = '';
    const param = {
      PARAM_FAB: ARR_PARAM_FAB,
      PARAM_TEAM: ARR_PARAM_TEAM,
      PARAM_SDPT_LENGTH: ARR_PARAM_SDPT_LENGTH,
      PARAM_SDPT: ARR_PARAM_SDPT,
      PARAM_FL_LENGTH: ARR_PARAM_FL_LENGTH,
      PARAM_FL: ARR_PARAM_FL,
      PARAM_MODEL_LENGTH: ARR_PARAM_MODEL_LENGTH,
      PARAM_MODEl: ARR_PARAM_MODEL,
      PARAM_EQID: ARR_PARAM_EQID,
      PARAM_TYPE: ARR_PARAM_TYPE,
    };
    this.props.handleDefineGet(param);
  }
  handleSave = () => {
    if(this.state.defineName === '' || this.state.defineName === null) {
      feed.success('즐겨찾기는 필수입니다.');
    } else if(SEQ_NUM.toString() === '') {
      const { profile } = this.props;
      let param = {};
      param = {
        EMP_NUM: profile.EMP_NO,
        SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW/BIGDATA',
        SEQ_NUM: SEQ_NUM.toString(),
        DEFINE_GUBUN: 'Q',
        DEFINE_NAME: this.state.defineName,
        FAB: ARR_PARAM_FAB,
        TEAM: ARR_PARAM_TEAM,
        SDPT_LENGTH: ARR_PARAM_SDPT_LENGTH,
        SDPT: ARR_PARAM_SDPT,
        FL_LENGTH: ARR_PARAM_FL_LENGTH,
        FL: ARR_PARAM_FL,
        MODEL_LENGTH: ARR_PARAM_MODEL_LENGTH,
        MODEL: ARR_PARAM_MODEL,
        EQID: ARR_PARAM_EQID,
        TYPE: ARR_PARAM_TYPE,
      };
      this.props.handleMergeDefine(param);
    } else {
      const { profile } = this.props;
      let param = {};
      param = {
        EMP_NUM: profile.EMP_NO,
        SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW/BIGDATA',
        SEQ_NUM: SEQ_NUM.toString(),
        DEFINE_GUBUN: 'Q',
        DEFINE_NAME: this.state.defineName,
        FAB: this.props.hotPopDataDetailList[0].value,
        TEAM: this.props.hotPopDataDetailList[1].value,
        SDPT: this.props.hotPopDataDetailList[2].value,
        FL: this.props.hotPopDataDetailList[3].value,
        MODEL: this.props.hotPopDataDetailList[4].value,
        EQID: this.props.hotPopDataDetailList[5].value,
        TYPE: ARR_PARAM_TYPE,
      };
      console.log(1111111111);
      console.log(param);
      this.props.handleMergeDefine(param);
    }
  }
  handleUpdate = () => {
    if(this.state.eqIdValue === undefined) {
      feed.success('EQ ID는 필수입니다.');
    } else {
      const { profile } = this.props;
      let param = {};
      param = {
        EMP_NUM: profile.EMP_NO,
        SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW/BIGDATA',
        SEQ_NUM: SEQ_NUM.toString(),
        DEFINE_GUBUN: 'Q',
        DEFINE_NAME: this.state.defineName,
        FAB: this.props.hotPopDataDetailList[0].value,
        TEAM: this.props.hotPopDataDetailList[1].value,
        SDPT: this.props.hotPopDataDetailList[2].value,
        FL: this.props.hotPopDataDetailList[3].value,
        MODEL: this.props.hotPopDataDetailList[4].value,
        EQID: this.props.hotPopDataDetailList[5].value,
        TYPE: ARR_PARAM_TYPE,
      };
      this.props.handleMergeDefine(param);
    }
  }
  handleDelete = () => {
    const { profile } = this.props;
    if(SEQ_NUM === '' || SEQ_NUM === null) {
      feed.success('즐겨찾기 선택은 필수입니다.');
    } else {
      const param = {
        EMP_NUM: profile.EMP_NO,
        SCR_NUM: 'FAB/INFORMNOTE/INFORMNOTELISTNEW/BIGDATA',
        SEQ_NUM: SEQ_NUM,
      };
      this.props.handleDeleteDefine(param);
    }
  }
  handleInputOnChange = (e) => {
    this.setState({
      defineName: e.target.value,
    });
  }
  close = () => {
    window.close();
  }
  handleOnCellClicked = (params) => {
    this.state.defineName = params.data.DEFINE_NAME;
    SEQ_NUM = params.data.SEQ_NUM;
    const param = {
      EMP_NUM: params.data.EMP_NUM,
      SCR_NUM: params.data.SCR_NUM,
      SEQ_NUM: SEQ_NUM,
      DEFINE_GUBUN: params.data.DEFINE_GUBUN,
    };
    this.props.handleDefineDetialGet(param);
  }
  handlePopoverVisibleChange = (visible) => {
    const {
      fab,
      sdpt,
      team,
      openPopover,
    } = this.state;

    const comboValdArray = [fab, team, sdpt];
    const comboValdArrayText = ['[FAB]', '[TEAM]', '[SDPT]'];
    let comboValdText = '';

    for (let i = 0; i < comboValdArray.length; i += 1) {
      if (isNull(comboValdArray[i])) {
        comboValdText = `${comboValdText}, ${comboValdArrayText[i]}`;
      }
    }
    
    if (openPopover) { //eslint-disable-line
      this.setState({ popoverVisible: true, openPopover: false }); //eslint-disable-line
    } else { //eslint-disable-line
      this.setState({ popoverVisible: visible }); //eslint-disable-line
    }
    // 임시주석 나중에 처리 해야 한다.
    // if (comboValdText === '') {
    //   if (openPopover) { //eslint-disable-line
    //     this.setState({ popoverVisible: true, openPopover: false }); //eslint-disable-line
    //   } else { //eslint-disable-line
    //     this.setState({ popoverVisible: visible }); //eslint-disable-line
    //   }
    // } else {
    //   comboValdText = comboValdText.substring(2);
    //   feed.error(`${comboValdText} 는(은) 입력 필수값 입니다.`);
    // }
  }
  popClose = () => {
    this.setState({
      openPopover: true,
    })
  }
  PopoverClose = (eqidval) => {
    this.setState({
      popoverVisible: false,
      eqIdValue: eqidval,
    })
  }
  render() {
    const {
      targetKeys,
      popoverVisible,
    } = this.state;
    const {
      hotPopDataList,
      hotPopDataDetailList,
      tidnList,
    } = this.props;
    const eqIdcontent = (
      <EqidSearch
        targetKeys={targetKeys}
        handleLoadingTidnParam={this.props.handleLoadingTidnParam}
        tidnList={tidnList}
        close={this.PopoverClose}
        popClose={this.popClose}
      />
    );
    return (
      <div>
        <div className="PMSheetTitle">
          <h2>즐겨찾기 목록</h2><br />
        </div>
        <div>
          <Grid
            hotPopDataList={hotPopDataList}
            param={this.state}
            handleOnCellClicked={this.handleOnCellClicked}
          />
        </div>
        <div>
          *즐겨찾기
          <Input
            value={this.state.defineName}
            style={{ width: 250 }}
            onChange={this.handleInputOnChange}
          />
        </div>
        <div>
          <GridDetail
            hotPopDataDetailList={hotPopDataDetailList}
          />
        </div>
        <div className="search-item">
          <span className="search-label">EQID</span>
          <span className="search-select">
            {/* select - Multi */}
            <Popover
              // title="Search"
              content={eqIdcontent}
              trigger="click"
              visible={popoverVisible}
              onVisibleChange={this.handlePopoverVisibleChange}
            >
              <Input
                style={{ width: 160 }}
                value={this.state.eqIdValue}
              />
              <Button icon="search" style={{ width: 30 }} />
            </Popover>
            <BtnSearchDkBlue
              title="수정"
              className="searchBtn"
              onClick={this.handleUpdate}
            >
            수정
            </BtnSearchDkBlue>
          </span>
        </div>
        <div style={{ textAlign: 'right' }}>
          <BtnSearchDkBlue
            title="신규"
            className="searchBtn"
            onClick={this.handleInit}
          >
          신규
          </BtnSearchDkBlue>
          <BtnSearchDkBlue
            title="불러오기"
            className="searchBtn"
            onClick={this.handleDefineGet}
          >
          불러오기
          </BtnSearchDkBlue>
          <BtnSearchDkBlue
            title="저장"
            className="searchBtn"
            onClick={this.handleSave}
          >
          저장
          </BtnSearchDkBlue>
          <BtnSearchDkBlue
            title="삭제"
            className="searchBtn"
            onClick={this.handleDelete}
          >
          삭제
          </BtnSearchDkBlue>
        </div>
        <div style={{ textAlign: 'right' }}>
          <BtnSearchDkBlue type="primary" onClick={this.close} >
            닫기
          </BtnSearchDkBlue>
        </div>
      </div>
    );
  }
}
HotPopup.propTypes = {
  handleLoadingParam: PropTypes.func.isRequired,
  hotPopDataList: PropTypes.array,
  hotPopDataDetailList: PropTypes.array,
  match: PropTypes.object.isRequired,
  handleInit: PropTypes.func.isRequired,
  handleMergeDefine: PropTypes.func.isRequired,
  handleDeleteDefine: PropTypes.func.isRequired,
  handleDefineGet: PropTypes.func.isRequired,
  handleDefineDetialGet: PropTypes.func.isRequired,
  profile: PropTypes.object,
  tidnList: PropTypes.array.isRequired,
  handleLoadingTidnParam: PropTypes.func.isRequired,
};
HotPopup.defaultProps = {
  hotPopDataList: [],
  hotPopDataDetailList: [],
  profile: {},
};
const mapStateToProps = createStructuredSelector({
  hotPopDataList: selectors.makeHotPopDataList(),
  hotPopDataDetailList: selectors.makeHotPopDataDetailList(),
  profile: authSelectors.makeSelectProfile(),
  tidnList: selectors.makeTidnList(),
});
export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingParam: () => dispatch(actions.loadingParam()),
    handleInit: () => dispatch(actions.handleInit()),
    handleMergeDefine: param => dispatch(actions.handleMergeDefine(param)),
    handleDeleteDefine: param => dispatch(actions.handleDeleteDefine(param)),
    handleDefineGet: param => dispatch(actions.handleDefineGet(param)),
    handleDefineDetialGet: param => dispatch(actions.handleDefineDetialGet(param)),
    handleLoadingTidnParam: param => dispatch(actions.loadingTidnParam(param)),
  };
}
const withReducer = injectReducer({ key: 'hotPop', reducer });
const withSaga = injectSaga({ key: 'hotPop', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);
export default compose(
  withReducer,
  withSaga,
  withConnect,
)(HotPopup);
