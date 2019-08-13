import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as feed from 'components/Feedback/functions';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import * as feed from 'components/Feedback/functions';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import { fromJS } from 'immutable';

let worktimelist=[];
let worktime=null;
class PmSheetModeling extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    const {
      plnnr,
      plnal,
      revision,
      uid,
      active,
      status,
      vornr,
     } = params;
    this.state = {
      plnnr,
      plnal,
      revision,
      vornr,
      active,
      uid,
      status,
    };
    // this.state = {
    //   plnnr: 'F00769', // 부모창에서 키값 날려줘서 받아야함
    //   plnal: 'BP', // 부모창에서 키값 날려줘서 받아야함
    //   // VORNR: paramVornr, 부모창에서 키값 날려줘서 받아야함
    //   // REVISION: paramRevision, 부모창에서 키값 날려줘서 받아야함
    // };
    this.props.handleLoadingGridParam({  PARAM_PLNNR: this.state.plnnr, PARAM_PLNAL: this.state.plnal });
    this.props.handleLoadingOperationParam({  PARAM_PLNNR: this.state.plnnr, PARAM_PLNAL: this.state.plnal, PARAM_REVISION: this.state.revision });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
  };

  handleprocessControl = (paramType) => {
    if (paramType === 'save') {
      feed.showConfirm('저장하시겠습니까?', '', this.saveRow);
    }
  }


  handleCancel = () => {
    window.close();
  }
  saveRow = () => {
    if (worktimelist.length < 1) {
      alert('선택된 항목이 없습니다.');
      return;
    }
    // const rowData = [];
    // this.gridApi.forEachNode((node) => {
    //   rowData.push(node.data);
    // });
    const params = {
      PARAM_PLNNR: this.state.plnnr, // 받음
      PARAM_PLNAL: this.state.plnal, // 받음
      VORNR: this.state.vornr, // 필요함
      SP_COUNT: worktimelist.length, // 데이터 길이 보낼필요없음     //리엑트에서 변수로할거임
      PARAM_REVISION: this.state.active, // 필요함
      IV_MODE: 'N', // 보낼필요없음
      U_ID: this.state.uId, // 필요함
      Status: this.state.status, // 필요함
      PARAM_MODIFY_USER: this.props.userInfo.EMP_NO, // 필요함
      list: { // 보낼필요없음
        IT_OP_WORK: worktimelist, // 리엑트에서 변수로할거임
      },
    };
    const returnParam = {
      PARAM_PLNNR: this.state.plnnr,
      PARAM_PLNAL: this.state.plnal,
      PARAM_REVISION: this.state.revision
    }
    this.props.saveWorkTimeData(params,returnParam);
    worktimelist = [];
  }

  oprationCallBack = () =>{
    if (this.props.OperationDataList) {
      for (let i = 0; i < this.props.OperationDataList.length; i += 1) {
        if (this.props.OperationDataList[i].OP_GUBUN === '도급사용') {
          worktime = {};
          worktime.VORNR = this.props.OperationDataList[i].VORNR;
          worktime.PLNNR = this.props.OperationDataList[i].PLNNR;
          worktime.PLNAL = this.props.OperationDataList[i].PLNAL;
          worktime.ARBEH = 'MIN';
          worktime.EMP_NUM = this.props.userInfo.EMP_NO;
          worktime.MODI_DT = null;
          //=2018-06-25
          if (this.props.WrokTimeDataList) {
            for (var j = 0; j < this.props.WrokTimeDataList.length; j += 1) {
              if (this.props.WrokTimeDataList[j].VORNR === worktime.VORNR) {
                worktime.ANZZL = this.props.WrokTimeDataList[j].ANZZL;
                worktime.ARBEI = this.props.WrokTimeDataList[j].ARBEI;

              }
            }
            worktimelist.push(worktime);
          }
        }
      }
      this.gridApi.updateRowData({ add: worktimelist });
      this.gridApi.forEachNode((node) => {
        worktimelist.push(node.data);
      });
    }
  }
  componentDidUpdate(){
    this.oprationCallBack();
  }
  render() {
    /* 나중에 사용할것
    const {

    } = this.state;
    */
    const {
      WrokTimeDataList,
      OperationDataList,
    } = this.props;
    return (
      <section className="gipms popup">
        <div style={{ padding: 20, textAlign: 'right' }}>
          <header>
          <h2 className="title">도급사WorkTime설정</h2>
            <Button
              className="btn-popup-close"
              onClick={this.handleCancel}
            >
              닫기
            </Button>
          </header>
        </div>
        <div>
          <div style={{ padding: 20, textAlign: 'right' }}>
            <Button
              type="primary"
              className="btn-apply save"
              onClick={() => { this.handleprocessControl('save'); }}
            >
              저장
            </Button>
          </div>
          <div className="grid-area">
            <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
              {/* <div>
                {OperationDataList.map(m => (m.OP_GUBUN === '도급사용')) ? (
                  <Grid
                    WrokTimeDataList={worktimelist}
                    onGridReady={this.onGridReady}
                  />
                ) : (
                    <Grid
                      WrokTimeDataList={WrokTimeDataList}
                      onGridReady={this.onGridReady}
                    />
                  )}
              </div> */}
              <Grid
                WrokTimeDataList={worktimelist}
                onGridReady={this.onGridReady}
              />
            </div>
          </div>
        </div>
      </section>
    );
  }
}

PmSheetModeling.propTypes = {
  handleLoadingGridParam: PropTypes.func.isRequired,
  WrokTimeDataList: PropTypes.array,
  match: PropTypes.object.isRequired,
  saveWorkTimeData: PropTypes.func.isRequired,
  userInfo: PropTypes.object,
  handleLoadingOperationParam: PropTypes.func.isRequired,
  OperationDataList: PropTypes.array,
};

PmSheetModeling.defaultProps = {
  WrokTimeDataList: [],
  userInfo: [],
  OperationDataList: [],
};

const mapStateToProps = createStructuredSelector({
  WrokTimeDataList: selectors.makeWrokTimeDataList(),
  userInfo: selectors.makeSelectProfile(),
  OperationDataList: selectors.makeOperationDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingGridParam: value => dispatch(actions.loadingGridParam(value)),
    saveWorkTimeData: ( value,returnParam ) => dispatch(actions.saveDataList(value,returnParam)),
    handleLoadingOperationParam: value => dispatch(actions.OperationParam(value)),
  };
}

const withReducer = injectReducer({ key: 'pmSheetWrokTimePopup', reducer });
const withSaga = injectSaga({ key: 'pmSheetWrokTimePopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(PmSheetModeling);
