import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import dateFormat from 'dateformat';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose, applyMiddleware } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'apps/hypm_common/css/gipms.css';
import * as actions from './actions';
import * as selectors from './selectors';
import * as actionsLoading from 'containers/common/Loading/actions';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import * as feed from 'components/Feedback/functions';
import { consolidateStreamedStyles } from 'styled-components';


let deleteListLet = [];
let addList = [];
let updateList = [];
let pmSheetDataList = [];
class PmSheetOperationModeling extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      arbpl: this.props.operationParam.PARAM_ARBPL,
      eqktx: this.props.operationParam.PARAM_EQKTX,
      txt: this.props.operationParam.PARAM_TXT,
      revision: this.props.operationParam.PARAM_REVISION,
      plnal: this.props.operationParam.PARAM_PLNAL,
      beber: this.props.operationParam.PARAM_BEBER,
      plnnr: this.props.operationParam.PARAM_PLNNR,
      save: this.props.save,
      ptype: '',
      status: this.props.operationParam.PARAM_STATUS,
      uid: this.props.operationParam.PARAM_U_ID,
      active: this.props.operationParam.ACTIVE,
      // empNo: this.props.userInfo.EMP_NO,
      deleteRowData: [], // 삭제 데이터
      allRowData: [],
      strat: this.props.operationParam.PARAM_STRAT,
    };
    this.props.handleLoadingFactoryParam(this.props.operationParam);
    this.props.handleLoadingSaveYn({ paramPlnnr: this.state.plnnr, paramPlnal: this.state.plnal, paramRevision: this.state.revision });
    console.log('props: ', props);
  }

  // componentDidMount() {
  //   this.props.handleLoadingFactoryParam(this.props.operationParam);
  // }

  componentWillUpdate(nextProps, nextState) { //eslint-disable-line
    if (this.props.operationParam.PARAM_PLNAL !== nextProps.operationParam.PARAM_PLNAL ||
      this.props.operationParam.PARAM_PLNNR !== nextProps.operationParam.PARAM_PLNNR ||
      this.props.operationParam.PARAM_REVISION !== nextProps.operationParam.PARAM_REVISION ||
      this.props.operationParam.PARAM_STRAT !== nextProps.operationParam.PARAM_STRAT
    ) {
      this.props.handleLoadingFactoryParam(nextProps.operationParam);
      this.props.handleLoadingSaveYn({
        paramPlnnr: nextProps.operationParam.PARAM_PLNNR,
        paramPlnal: nextProps.operationParam.PARAM_PLNAL,
        paramRevision: nextProps.operationParam.PARAM_REVISION,
      });

    }
    if (this.props.operationParam.PARAM_ARBPL !== nextProps.operationParam.PARAM_ARBPL ||
      this.props.operationParam.PARAM_EQKTX !== nextProps.operationParam.PARAM_EQKTX ||
      this.props.operationParam.PARAM_TXT !== nextProps.operationParam.PARAM_TXT ||
      this.props.operationParam.PARAM_REVISION !== nextProps.operationParam.PARAM_REVISION ||
      this.props.operationParam.PARAM_PLNAL !== nextProps.operationParam.PARAM_PLNAL ||
      this.props.operationParam.PARAM_BEBER !== nextProps.operationParam.PARAM_BEBER ||
      this.props.save !== nextProps.save ||
      this.props.operationParam.PARAM_STATUS !== nextProps.operationParam.PARAM_STATUS ||
      this.props.operationParam.PARAM_U_ID !== nextProps.operationParam.PARAM_U_ID ||
      this.props.operationParam.ACTIVE !== nextProps.operationParam.ACTIVE ||
      this.props.userInfo.EMP_NO !== nextProps.userInfo.EMP_NO ||
      this.props.operationParam.PARAM_PLNNR !== nextProps.operationParam.PARAM_PLNNR
    ) {
      // eslint-disable-next-line react/no-will-update-set-state
      this.setState({
        arbpl: nextProps.operationParam.PARAM_ARBPL,
        eqktx: nextProps.operationParam.PARAM_EQKTX,
        txt: nextProps.operationParam.PARAM_TXT,
        revision: nextProps.operationParam.PARAM_REVISION,
        plnal: nextProps.operationParam.PARAM_PLNAL,
        beber: nextProps.operationParam.PARAM_BEBER,
        save: nextProps.save,
        status: nextProps.operationParam.PARAM_STATUS,
        plnnr: nextProps.operationParam.PARAM_PLNNR,
        uid: nextProps.operationParam.PARAM_U_ID,
        active: nextProps.operationParam.ACTIVE,
        // empNo: nextProps.userInfo.EMP_NO,
      });
    }
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  handleTebOnChange = (e) => {
    // alert(e);
  };

  operationSave = () => {
    const params = {
      list: {
        addList,
        updateList,
        deleteList: deleteListLet,
      },
    };
    console.log('params: ', params);

    this.props.handleLoadingOperationGridSave(params);
    deleteListLet = [];
    addList = [];
    updateList = [];
    this.gridApi.forEachNodeAfterFilter( function(node) {
      node.setSelected(false);
    });
    console.log('deleteListLet: ', deleteListLet);
  };
  pmSheetDataList = this.props.pmSheetDataList;

  render() {
    const {
      pmSheetDataList,
      pmTypeCombo,
      pmTypeCombo2,
    } = this.props;

    const cellClickedReturn = (e) => {
      const revision = e.REVISION === null || e.REVISION === undefined ? ' ' : encodeURI(encodeURIComponent(e.REVISION)); // 4. Revision Code(전/후) (detail의 조회조건)
      const plnal = e.PLNAL === null || e.PLNAL === undefined ? ' ' : encodeURI(encodeURIComponent(e.PLNAL)); // 5. //Count code(전/후) (detail의 조회조건)
      const plnnr = e.PLNNR === null || e.PLNNR === undefined ? ' ' : encodeURI(encodeURIComponent(e.PLNNR));
      const vornr = e.VORNR === null || e.VORNR === undefined ? ' ' : encodeURI(encodeURIComponent(e.VORNR));
      const ltxa1 = e.LTXA1 === null || e.LTXA1 === undefined ? -1  : encodeURI(encodeURIComponent(e.LTXA1));
      const ktex1 = e.KTEX1 === null || e.KTEX1 === undefined ? -1  : encodeURI(encodeURIComponent(e.KTEX1));
      if (e.OPGUBUN === '자사용') {
        e.OPGUBUN = 'A';
      } else if (e.OPGUBUN === '도급사용') {
        e.OPGUBUN = 'B';
      }
      if (e.columnGubun === 'MIC_COUNT') { // 점검항목 수
        if ((this.state.beber === undefined || this.state.beber === null || this.state.beber === 'null') &&
        (this.state.eqktx === undefined || this.state.eqktx === null || this.state.eqktx === 'null')) {

          window.open(`/sm/pmSheetModeling/pmSheetMicQualListPopup/${encodeURI(encodeURIComponent(plnal))}/${encodeURI(encodeURIComponent(plnnr))}/${encodeURI(encodeURIComponent(vornr))}/${encodeURI(encodeURIComponent(revision))}/-1/-1/${encodeURI(encodeURIComponent(ltxa1))}/${encodeURI(encodeURIComponent(ktex1))}/${encodeURI(encodeURIComponent(this.state.status))}/${encodeURI(encodeURIComponent(this.state.uid))}/${encodeURI(encodeURIComponent(e.OPGUBUN))}`, '',
          `width=1200, height=540, top=${screen.availHeight/2-800/2},left=${screen.availWidth/2-705/2},location=no,toolbar=no,menubar=no,scrollbars=false,resizable=yes`); //eslint-disable-line

        } else {
          window.open(`/sm/pmSheetModeling/pmSheetMicQualListPopup/${encodeURI(encodeURIComponent(plnal))}/${encodeURI(encodeURIComponent(plnnr))}/${encodeURI(encodeURIComponent(vornr))}/${encodeURI(encodeURIComponent(revision))}/${encodeURI(encodeURIComponent(this.state.eqktx))}/${encodeURI(encodeURIComponent(this.state.beber))}/${encodeURI(encodeURIComponent(ltxa1))}/${encodeURI(encodeURIComponent(ktex1))}/${encodeURI(encodeURIComponent(this.state.status))}/${encodeURI(encodeURIComponent(this.state.uid))}/${encodeURI(encodeURIComponent(e.OPGUBUN))}`,
          '',
          `width=1200, height=540, top=${screen.availHeight/2-800/2},left=${screen.availWidth/2-705/2},location=no,toolbar=no,menubar=no,scrollbars=false,resizable=yes`); //eslint-disable-line
        }
      } else if (e.columnGubun === 'SP_COUNT') { // 자재 예약 항목
        window.open(`/sm/pmSheetModeling/pmSheetSpListPopup/${encodeURI(encodeURIComponent(plnal))}/${encodeURI(encodeURIComponent(plnnr))}/${encodeURI(encodeURIComponent(vornr))}/${encodeURI(encodeURIComponent(revision))}/${encodeURI(encodeURIComponent(this.state.status))}/${encodeURI(encodeURIComponent(this.state.uid))}`, '', `width=1400,height=700,top=${screen.availHeight/2-800/2},left=${screen.availWidth/2-705/2},scrollbars=false`); //eslint-disable-line
      }
    };
    const exportExcelReturn = () => {
      console.log('in Operatgion exportExcel');
      // let fileDate = new Date().format('yyyymmddHHMMss');
      let fileDate = new Date();
      const params = {
        fileName: `masterPmSheetOperationExcel${dateFormat(fileDate, 'yyyymmddHHMMss')}`,
        sheetName: 'masterPmSheetOperation',
        columnKeys: ['VORNR', 'LTXA1', 'OP_GUBUN', 'KTEX1', 'MIC_COUNT', 'SP_COUNT', 'ARBEI', 'ANZZL'],
        rowHeight: '12',
      };
      this.gridApi.exportDataAsExcel(params);
    };
    // 도급사 time setting
    const workTimeClickedReturn = () => {
      // 시연용 URL
      // window.open(`/apps/pmSheetModeling/pmSheetWrokTimePopup/${plnnr}/${plnal}`, '', `top=${screen.availHeight/2-500/2}, left=${screen.availWidth/2-1050/2}, width=1050, height=500, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes`);
      // 개발용  URL
      // this.props.pmSheetDataList
      // const params ={
      //    a: applyMiddleware,
      //    b: dateFormat,
      // };
      // var currentTab = m167_findCurrentTab();
      console.log('this.props.pmSheetDataList!!!!!!!!!!!!!!!!!!!!!!: ', this.props.pmSheetDataList);
      if (this.props.pmSheetDataList[0]) {
        if (this.props.pmSheetDataList[0].VERWE === 'F1' || this.props.pmSheetDataList[0].VERWE === 'F2') { // 추후 현재탭이 FAB 일때 추가해야 함.

        }
      } else {
          feed.error('전공정 TBM과 CBM만 설정 가능합니다.');
          return;
      }
      if(this.state.active === 'R' ){
          feed.error('이전 버전은 도급사WorkTime을 설정 할 수 없습니다.');
          return;
      }
      if(this.state.active === 'D'){
        feed.error('삭제 버전은 도급사WorkTime을 설정 할 수 없습니다.');
        return;
      }
      console.log('pmSheetDataList: ',pmSheetDataList);
      window.open(
        `/sm/pmSheetModeling/pmSheetWrokTimePopup/${encodeURI(encodeURIComponent(this.state.plnnr))}/${encodeURI(encodeURIComponent(this.state.plnal))}/${encodeURI(encodeURIComponent(this.state.revision))}/${encodeURI(encodeURIComponent(this.state.uid))}/${encodeURI(encodeURIComponent(this.state.active))}/${encodeURI(encodeURIComponent(this.state.status))}/${encodeURI(encodeURIComponent(this.props.pmSheetDataList[0].VORNR))}`,
        'workTime',
      `top=${screen.availHeight/2-500/2}, left=${screen.availWidth/2-1050/2}, width=560, height=330, location=no, toolbar=no, menubar=no, scrollbars=true, resizable=yes` //eslint-disable-line
      ); //eslint-disable-line
    };

    const fncLpadZeroCode = (code, len) => {
      let str = "" + code;
      let pad = "";
      for( var i = 0; i < len; i++ ) {
        pad += "0";
      }
	    return pad.substring(0, pad.length - str.length) + str;
    };
    const m167OperationCreateOperNo = (e) => {
      var makeOpNoGubun = "";
      if (e !== undefined) {
        makeOpNoGubun = e;
      }
      const rowData = [];
      this.gridApi.forEachNode((node) => {
        rowData.push(node.data.VORNR);
        console.log('node.data: ', node.data);
      });
      let vornr = 0;
      let vornrList = [];
      if (makeOpNoGubun === '' && makeOpNoGubun.length <= 0) {
        for(var i = 0; i < pmSheetDataList.length; i++) {
          if( ROW_TYPE === undefined){
            vornrList.push(Number(pmSheetDataList[i].VORNR));
            console.log('pmSheetDataList['+i+'].VORNR: ', pmSheetDataList[i].VORNR);
          }
        }
      } else if (makeOpNoGubun.length > 0 && makeOpNoGubun === 'ADDROW') {
        for(let i = 0; i < this.gridApi.getDisplayedRowCount(); i++) {
          vornrList.push(Number(rowData[i]));
        }
      }
      console.log('makeOpNoGubun: ', makeOpNoGubun);
      if (this.gridApi.getDisplayedRowCount() === 0 && vornr === 0) {
        vornr = 10;
        return fncLpadZeroCode(vornr, 4);
      } else if (vornrList.length !== 0 && vornr === 0) {
        console.log('getLastDisplayedRow: ', this.gridApi.getLastDisplayedRow());
        vornr = Number(rowData[rowData.length-1])+1;
	      vornr = Math.ceil((vornr/10))*10;
        return fncLpadZeroCode(vornr, 4);
      }
    };

    // eslint-disable-next-line consistent-return
    const m167OperationCreateRow = (e) => {
      let slwid = ''
      this.setState({
        ptype: 'add',
      });
      if (this.state.status === 'R') {
        feed.error('결재상태가 상신인 경우, 라인추가를 할수 없습니다.');
        return;
      }
      if (pmSheetDataList.length !== 0) {
        slwid = pmSheetDataList[0].SLWID;
      } else {
        slwid = '';
      }
      const VORNR = m167OperationCreateOperNo('ADDROW');
      const addRow = {
        REVISION: this.state.revision,
        PLNNR: this.state.plnnr,
        PLNAL: this.state.plnal,
        VORNR,
        LTXA1: '',
        OP_GUBUN: '',
        KTEX1: '',
        SLWID: slwid,
        OPERATION_KTEXT: '',
        MIC_COUNT: '0',
        SP_COUNT: '0',
        ARBEI: '0',
        FINAL_YN: 'Y',
        USR00: '',
        USR01: '',
        USR02: '',
        USR03: '',
        USR04: '',
        USR06: '',
        USR07: '',
        USR10: '',
        U_ID: this.state.uid,
        ROW_TYPE: 'ADD',
        selected: true,
      };
      // const selectedNodes = this.gridApi.getSelectedNodes();
      // const selectedData = selectedNodes.map(node => node.rowIndex);
      const b = this.gridApi.getDisplayedRowCount();
      console.log('getDisplayedRowCount()', this.gridApi.getDisplayedRowCount());
      this.gridApi.updateRowData({ add: [addRow], addIndex: this.gridApi.getDisplayedRowCount() });

      this.gridApi.forEachLeafNode( (node) => {
        if (node.data.VORNR === VORNR) {
            node.setSelected(true);
        }
      });
      // if (m167_gridSavable != "Y") return false;
      // else {
      //   if (m167_current_param.PARAM_STRAT == "") return false; //CBM일때는 strategy를 입력안함. strategy는 pm주기 가져오는 키로 사용함.. 필수아님/저장안함
      //   else return true;
      // }


      if (this.state.save != 'Y') {
        this.gridColumnApi.columnController.columnDefs[4].editable = false;
      } else {
        if (this.state.strat === '') {
          this.gridColumnApi.columnController.columnDefs[4].editable = false;
        } else {
          this.gridColumnApi.columnController.columnDefs[4].editable = true;
        }
      }
      console.log('this.gridColumnApi.columnController.columnDefs[4].editable: ', this.gridColumnApi.columnController.columnDefs[4].editable);

      this.gridApi.startEditingCell({ rowIndex: b, colKey: 'LTXA1' });
      // const selectedData2 = selectedNodes.map(node => node.data);
      // const selectedDataStringPresentation = selectedData2.map(node => node.VORNR).join(',');
      // console.log('selectedNodes: ', selectedNodes);
      // console.log('selecedData: ', selectedData);
      // console.log(`selectedDataStringPresentation: ${selectedDataStringPresentation}`);
    };
    const m167OperationGetSaveData = (obj) => {
      const saveObj = {};
      saveObj.REVISION          = obj.REVISION;
      saveObj.PLNNR             = obj.PLNNR;
      saveObj.PLNAL             = obj.PLNAL;
      saveObj.VORNR             = fncLpadZeroCode(obj.VORNR, 4);
      saveObj.ITEM1             = fncLpadZeroCode(obj.VORNR, 4);
      saveObj.LTXA1             = obj.LTXA1;
      saveObj.OP_GUBUN          = obj.OP_GUBUN;
      saveObj.KTEX1             = obj.KTEX1;
      saveObj.SLWID             = obj.SLWID;
      saveObj.OPERATION_KTEXT   = obj.OPERATION_KTEXT;
      saveObj.SP_COUNT          = obj.SP_COUNT;
      saveObj.USR00             = obj.USR00;
      saveObj.USR01             = obj.USR01;
      saveObj.USR02             = obj.USR02;
      saveObj.USR03             = obj.USR03;
      saveObj.USR04             = obj.USR04;
      saveObj.USR06             = obj.USR06;
      saveObj.USR07             = obj.USR07;
      saveObj.USR10             = obj.USR10;
      saveObj.U_ID              = obj.U_ID;
      saveObj.VERWE             = obj.VERWE;
      saveObj.ROW_TYPE          = obj.ROW_TYPE;
      return saveObj;
    }
    const m167OperationGetDeleteData = (obj) => {
      const saveObj = {};
      saveObj.REVISION          = obj.REVISION;
      saveObj.PLNNR             = obj.PLNNR;
      saveObj.PLNAL             = obj.PLNAL;
      saveObj.VORNR             = fncLpadZeroCode(obj.VORNR, 4);
      saveObj.ITEM1             = fncLpadZeroCode(obj.VORNR, 4);
      saveObj.LTXA1             = obj.LTXA1;
      saveObj.OP_GUBUN          = obj.OP_GUBUN;
      saveObj.KTEX1             = obj.KTEX1;
      saveObj.SLWID             = obj.SLWID;
      saveObj.OPERATION_KTEXT   = obj.OPERATION_KTEXT;
      saveObj.SP_COUNT          = obj.SP_COUNT;
      saveObj.USR00             = obj.USR00;
      saveObj.USR01             = obj.USR01;
      saveObj.USR02             = obj.USR02;
      saveObj.USR03             = obj.USR03;
      saveObj.USR04             = obj.USR04;
      saveObj.USR06             = obj.USR06;
      saveObj.USR07             = obj.USR07;
      saveObj.USR10             = obj.USR10;
      saveObj.U_ID              = obj.U_ID;
      saveObj.VERWE             = obj.VERWE;
      saveObj.ROW_TYPE          = obj.ROW_TYPE;
      return saveObj;
    }

    const m167OperationFncSave = () => {
      this.gridApi.stopEditing();
      const selectedNodes = this.gridApi.getSelectedNodes();
      let saveData = [];
      selectedNodes.map((node) => {
        saveData = [m167OperationGetSaveData(node.data)];
      });
      console.log('saveData!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ', saveData);
      console.log('saveData.length!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!: ', saveData.length);

      for (let i = 0; i < saveData.length; i += 1) {
        if (((saveData[i].LTXA1 === '' && saveData[i].OP_GUBUN === '')&&((saveData[i].VERWE === 'F1' || saveData[i].VERWE === 'P1' || saveData[i].VERWE === 'U1')&&(this.state.strat !== '' && saveData[i].KTEX1 === ''))) ||
                  ((saveData[i].LTXA1 === undefined && saveData[i].OP_GUBUN === undefined)&&((saveData[i].VERWE === 'F1' || saveData[i].VERWE === 'P1' || saveData[i].VERWE === 'U1')&&(this.state.strat !== '' && saveData[i].KTEX1 === ''))) ||
                  ((saveData[i].LTXA1 === null && saveData[i].OP_GUBUN === null)&&((saveData[i].VERWE === 'F1' || saveData[i].VERWE === 'P1' || saveData[i].VERWE === 'U1')&&(this.state.strat !== '' && saveData[i].KTEX1 === ''))) ||
                  ((saveData[i].LTXA1 === 'null' && saveData[i].OP_GUBUN === 'null')&&((saveData[i].VERWE === 'F1' || saveData[i].VERWE === 'P1' || saveData[i].VERWE === 'U1')&&(this.state.strat !== '' && saveData[i].KTEX1 === '')))) {
          feed.error('Operation Description과 용도구분, PM주기는 필수 입력 사항입니다.');
          return false;
        } else if ((saveData[i].LTXA1 === '' && saveData[i].OP_GUBUN === '') ||
                  (saveData[i].LTXA1 === undefined && saveData[i].OP_GUBUN === undefined) ||
                  (saveData[i].LTXA1 === null && saveData[i].OP_GUBUN === null) ||
                  (saveData[i].LTXA1 === 'null' && saveData[i].OP_GUBUN === 'null')) {
          feed.error('Operation Description과 용도구분은 필수 입력 사항입니다.');
          return false;
        } else if (saveData[i].OP_GUBUN === '' || saveData[i].OP_GUBUN === null || saveData[i].OP_GUBUN === 'null' || saveData[i].OP_GUBUN === undefined) {
          feed.error('용도 구분을 선택해주세요.');
          return false;
        } else if (saveData[i].LTXA1 === '' || saveData[i].LTXA1 === undefined || saveData[i].LTXA1 === null || saveData[i].LTXA1 === 'null') {
          feed.error('Operation Description을 선택해주세요.');
          return false;
        } else if (saveData[i].VERWE === 'F1' || saveData[i].VERWE === 'P1' || saveData[i].VERWE === 'U1') {
          if (this.state.strat !== '' && saveData[i].KTEX1 === '') {
            feed.error('PM 주기는 필수 입력사항입니다.');
            return false;
          }
          
        }

        if (saveData[i].ROW_TYPE === 'ADD' || saveData[i].ROW_TYPE === 'EDIT') { // edit일때도 해야함.
          if (saveData[i].OP_GUBUN === '자사용') {
            saveData[i].OP_GUBUN = 'A';
          } else if (saveData[i].OP_GUBUN === '도급사용') {
            saveData[i].OP_GUBUN = 'B';
          } 
        }
        if(Number(saveData[i].VORNR) > 9999){
        feed.error('Operation No 는 최대 9999 까지 입력 가능합니다.');
        this.gridApi.startEditingCell({
          colKey: 'LTXA1',
          rowIndex: selectedNodes[0].childIndex,
        });
          return false;
        }

        if( saveData[i].ROW_TYPE !== undefined && saveData[i].ROW_TYPE === 'ADD' ) {
        this.gridApi.forEachNodeAfterFilter((node, index) => {
          if( node.selected !== true && node.data.VORNR === saveData[i].VORNR) {
            feed.error('중복된 Operation No 입니다.');
            // m167OperationEditCheckRow(saveRowData[i]);
            this.gridApi.startEditingCell({
              // this.gridApi.setFocusedCell(0, 'OP_GUBUN', pinned);
              colKey: 'LTXA1', // ['OP_GUBUN', 'KTEX1']
              rowIndex: selectedNodes[0].childIndex,
            });
            return false;
          }
        });
          addList.push(saveData[i]);
        } else if ( saveData[i].ROW_TYPE !== undefined && saveData[i].ROW_TYPE === 'EDIT' ) {
          updateList.push(saveData[i]);
        }
        
      }

      if(addList.length === 0 && updateList.length === 0 && deleteListLet.length === 0) {
        feed.error('변경된 행이 없습니다.');
        return false;
      } else { 
        feed.showConfirm('저장하시겠습니까?', '', this.operationSave);
      }
    };

    const m167OperationEditRow = () => {
      const selectedNodes = this.gridApi.getSelectedNodes();
      console.log('selectedNodes[0].columnApi.columnController.columnDefs[2].editable: ', selectedNodes[0].columnApi.columnController.columnDefs[2].editable);
      const selectedData = selectedNodes.map((node) => {
        if (node.data.ROW_TYPE === 'ADD'){
          node.data.ROW_TYPE = 'ADD';
        } else {
          node.data.ROW_TYPE = 'EDIT';
        }
        console.log('node.data: ', node.data);
        console.log('selectedData: ', selectedData);
      });
      console.log('selectedNodes: ', selectedNodes);
      console.log('selectedNodes.length: ', selectedNodes.length);
      console.log('selectedNodes.id: ', selectedNodes.id);
      console.log('selectedNodes.childIndex: ', selectedNodes.childIndex);
      if (selectedNodes.length === 0){
        feed.error('선택된 행이 없습니다.');
        return;
      } else if(selectedNodes.length > 1) {
        feed.error('수정은 한행만 가능합니다.');
        return;
      }
      if(this.state.status === 'R') {
        feed.error('결재상태가 상신인 경우 수정할수 없습니다.');
        return;
      }

      console.log('this.state.status: ', this.state.status);
      // selectedRow = selectedRow[0];
      this.gridApi.startEditingCell({
        // this.gridApi.setFocusedCell(0, 'OP_GUBUN', pinned);
        colKey: 'LTXA1', // ['OP_GUBUN', 'KTEX1']
        rowIndex: selectedNodes[0].childIndex,
      });
      console.log('this.gridApi.getEditingCells(): ', this.gridApi.getEditingCells());
    };

    const m167OperationDeleteRow = () => {
      const selectedNodes = this.gridApi.getSelectedNodes();
      if (selectedNodes.length === 0){
        feed.error('선택한 항목이 없습니다.');
        return;
      }
      if(this.state.status === 'R') {
        feed.error('결재상태가 상신인 경우, 라인삭제를 할수 없습니다.');
        return;
      }
      console.log('selectedNodes: ', selectedNodes);
      const selectedData = selectedNodes.map(node => {
        if (node.data.ROW_TYPE === 'ADD'){
          node.data.ROW_TYPE = 'ADD';
        } else {
          node.data.ROW_TYPE = 'DELETE';
        }
        return node.data;
      });
      console.log('selectedData: ', selectedData);
      console.log('selectedData[0]: ', selectedData[0]);
      console.log('selectedData[1]: ', selectedData[1]);
      console.log('selectedData[2]: ', selectedData[2]);
      const delectAllData = [];
      if(confirm("OPER삭제시 해당 점검항목도 모두 삭제됩니다.")) {
        this.gridApi.updateRowData({ remove: selectedData });
        this.gridApi.forEachNode((node) => {
          delectAllData.push(node.data);
        });
      }
      // 저장할때 deleteRowData 가져 갈려고 셋팅했음.
      // 새 객체를 만들어서 기존의 값과 전달받은 data 을 덮어씀
      // 기존의 값을 그대로 유지
      // const { deleteRowData } = this.state;
      // this.setState({
      //   deleteRowData: deleteRowData.map(del => vornr !==  ), // VORNR !== info.VORNR ? { ...info, ...data }: info
      //   allRowData:    delectAllData,   // 삭제를 제외한 모든 데이터
      // });
      selectedData.map((data) => {
        if (data.ROW_TYPE === 'ADD'){
          return;
        } else {
          return deleteListLet.push(m167OperationGetDeleteData(data))
        }
      });
      console.log('this.state.deleteRowData: ', this.state.deleteRowData);
      console.log('deleteListLet: ', deleteListLet);
      console.log('selectedData.length: ', selectedData.length);
    };

    const m167OperationReturnValuePs = (rf, pType) => {
      if (rf === '1') {
        if (pType === 'add') {
          console.log('this is m167OperationReturnValuePs... in add.');
          if (this.state.save === 'N'){
            feed.error(
              '작성중인 Task List는 최종 REVISION이 아닙니다. 최종 REVISION에 해당하는 Task List에 수정하시기 바랍니다.'
            );
            return;
          } else {
            m167OperationCreateRow();
          }
        } else if (pType === 'save') {
          console.log('this is m167OperationReturnValuePs... in save.');
          if (this.state.save === 'N'){
            feed.error(
              '작성중인 Task List는 최종 REVISION이 아닙니다. 최종 REVISION에 해당하는 Task List에 수정하시기 바랍니다.'
            );
            return;
          } else {
            m167OperationFncSave();
          }
          // alert('저장');
          // if (confirm('저장 하시겠습니까?')) {
          //   m167OperationFncSave();
          // } else {
          //   return;
          // }

        } else if (pType === 'edit') {
          console.log('this is m167OperationReturnValuePs... in edit.');
          if (this.state.save === 'N'){
            feed.error(
              '작성중인 Task List는 최종 REVISION이 아닙니다. 최종 REVISION에 해당하는 Task List에 수정하시기 바랍니다.'
            );
            return;
          } else {
            m167OperationEditRow();
          }
        } else if (pType === 'delete') {
          console.log('this is m167OperationReturnValuePs... in delete.');
          if (this.state.save === 'N'){
            feed.error(
              '작성중인 Task List는 최종 REVISION이 아닙니다. 최종 REVISION에 해당하는 Task List에 수정하시기 바랍니다.'
            );
            return;
          } else {
            m167OperationDeleteRow();
          }
        }
      }
    };

    const m167OperationProcessControl = (e) => {
      console.log('this is m167OperationProcessControl.');
      console.log('e.target.id: ', e.target.id);
      if (e.target.id === 'add') {
        this.setState({
          ptype: e.target.id,
        });
        // m167OperationCreateRow('1', this.state.ptype);
        // 인터락 체크 해제 되었다고 가정.(인터락 걸리면 0임)
        console.log('this.state.ptype: ', this.state.ptype);
        m167OperationReturnValuePs('1', e.target.id);
      } else if (e.target.id === 'save') {
        this.setState({
          ptype: e.target.id,
        });
        // m167OperationCreateRow('1', this.state.ptype);
        // 인터락 체크 해제 되었다고 가정.(인터락 걸리면 0임)
        console.log('this.state.ptype: ', this.state.ptype);
        m167OperationReturnValuePs('1', e.target.id);
      } else if (e.target.id === 'edit') {
        this.setState({
          ptype: e.target.id,
        });
        // m167OperationCreateRow('1', this.state.ptype);
        // 인터락 체크 해제 되었다고 가정.(인터락 걸리면 0임)
        console.log('this.state.ptype: ', this.state.ptype);
        m167OperationReturnValuePs('1', e.target.id);
      } else if (e.target.id === 'delete') {
        this.setState({
          ptype: e.target.id,
        });
        // m167OperationCreateRow('1', this.state.ptype);
        // 인터락 체크 해제 되었다고 가정.(인터락 걸리면 0임)
        console.log('this.state.ptype: ', this.state.ptype);
        m167OperationReturnValuePs('1', e.target.id);
      }


    };

    const moveToHeader = () => {
      this.props.pmModelingListGo();
    };


    return (
      <div>
        <div className="btn-group">
          {
          (() => {
            if (this.state.arbpl) {
              return (
                <div>
                  <div className="left">
                    <h4>
                      {this.state.arbpl}&nbsp;/&nbsp;
                      {this.state.eqktx}&nbsp;/&nbsp;
                      {this.state.txt}&nbsp;/&nbsp;
                      {this.state.revision}&nbsp;/&nbsp;
                    Group Counter&nbsp;{this.state.plnal}
                    {/* &nbsp;/&nbsp;saveYN:&nbsp;{this.state.save} */}
                    </h4>
                  </div>
                </div>);
            }
              return null;
          })()
        }
          <div className="right">
            <div className="PMSheetTitle">
              <Button
                type="primary"
                className="btn-normal"
                onClick={workTimeClickedReturn}
              >
              도급사WorkTime설정
              </Button>

              <Button
                type="primary"
                className="btn-normal"
                onClick={moveToHeader}
              >
              HEADER로 이동
              </Button>
              <Button
                type="primary"
                className="btn-apply save"
                onClick={m167OperationProcessControl}
                id="save"
              >
              저장
              </Button>
              <Button
                type="primary"
                className="btn-normal edit"
                onClick={m167OperationProcessControl}
                id="edit"
              >
              수정
              </Button>
              <Button
                type="primary"
                className="btn-normal add-line"
                onClick={m167OperationProcessControl}
                id="add"
              >
              라인추가
              </Button>
              <Button
                type="primary"
                className="btn-normal delete"
                onClick={m167OperationProcessControl}
                id="delete"
              >
              라인삭제
              </Button>
              <Button
                type="primary"
                className="btn-apply excel"
                onClick={exportExcelReturn}
              >
              엑셀
              </Button>
            </div>
          </div>
        </div>
        <div className="grid-area">
          <Grid
            pmSheetDataList={pmSheetDataList}
            cellClickedReturn={cellClickedReturn}
            workTimeClickedReturn={workTimeClickedReturn}
            m167OperationCreateRow={m167OperationCreateRow}
            onGridReady={this.onGridReady}
            pmTypeCombo={pmTypeCombo}
            pmTypeCombo2={pmTypeCombo2}
          />
        </div>
      </div>
    );
  }

}

PmSheetOperationModeling.propTypes = {
  handleLoadingFactoryParam: PropTypes.func.isRequired,
  pmSheetDataList: PropTypes.array,
  operationParam: PropTypes.array,
  // handleWorkTimeClicked: PropTypes.func.isRequired,
  handleLoadingSaveYn: PropTypes.func.isRequired,
  save: PropTypes.string,
  handleLoadingOperationGridSave: PropTypes.func.isRequired,
  userInfo: PropTypes.object, // .isRequired
  // handleTebOnChange: PropTypes.func,
  pmModelingListGo: PropTypes.func.isRequired,
  // workTimeClickedReturn: PropTypes.func.isRequired,
  // exportExcel: PropTypes.func.isRequired,
  loadingOn: PropTypes.func.isRequired,
  pmTypeCombo: PropTypes.array,
  pmTypeCombo2: PropTypes.array,
};

PmSheetOperationModeling.defaultProps = {
  pmSheetDataList: [],
  operationParam: [],
  userInfo: [],
  save: '',
  pmTypeCombo: [],
  pmTypeCombo2: [],
};

const mapStateToProps = createStructuredSelector({
  pmSheetDataList: selectors.makePmSheetDataList(),
  save: selectors.makeSavelKeyData(),
  userInfo: selectors.makeSelectProfile(),
  pmTypeCombo: selectors.makePmTypeCombo(),
  pmTypeCombo2: selectors.makePmTypeCombo2(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFactoryParam: param => dispatch(actions.loadingFactoryParam(param)),
    handleLoadingSaveYn: value => dispatch(actions.loadingSaveYn(value)),
    handleLoadingOperationGridSave: value => dispatch(actions.loadingPmSheetOperationGridSave(value)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'PmSheetOperationModeling', reducer });
const withSaga = injectSaga({ key: 'PmSheetOperationModeling', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetOperationModeling);
