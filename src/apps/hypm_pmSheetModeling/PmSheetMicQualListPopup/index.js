import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button } from 'antd';
import 'antd/dist/antd.css';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'apps/hypm_common/css/gipms.css';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import * as feed from 'components/Feedback/functions';
import * as actionsLoading from 'containers/common/Loading/actions';

let datalist = [];
let STORT = '';
let gridSavable = 'Y';
let eqktx1 = '';
let beber1 = '';

class PmSheetMicQualListPopup extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;

    
    const {
      plnnr, plnal, vornr, revision, eqktx, beber, ltxa1, ktex1, opGubun
    } = params;

    this.state = {
      plnnr,
      plnal,
      vornr,
      revision,
      eqktx,
      beber,
      ltxa1,
      ktex1,
      opGubun,
      allowEditColumn: this.geEditColums(),
    };
    // console.log('eqktx : ', (this.state.eqktx).indexOf);
    if (this.state.eqktx === '-1'){
      console.log('eqktx : ', this.state.eqktx);
      eqktx1 = '';
    } else {
      eqktx1 = this.state.eqktx;
    }
    this.props.handleLoadingParam({
      plnnr: this.state.plnnr,
      plnal: this.state.plnal,
      vornr: this.state.vornr,
      revision: this.state.revision,
      eqktx: this.state.eqktx,
      beber: this.state.beber,
      ltxa1: this.state.ltxa1,
      ktex1: this.state.ktex1,
    });
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
  };

  // array에서 특정 값을 제거하고 리턴
	removeArray = (...arr) => {
    const typeArr = ["STELLEN","MASSEINHSW","TOLERANZUN","SOLLWERT","TOLERANZOB"];
    for(let i = 0 ; i < arr.length ; i++) {
      const search = typeArr.indexOf(arr[i]);
        if(search!=-1){
          typeArr.splice(search,1);
      }
    }

    return typeArr;
  }

  geEditColums = () => {
    const columnType1 = ["STELLEN","MASSEINHSW","TOLERANZUN","SOLLWERT","TOLERANZOB"]; // 정량적 검사
    const columnType2 = ["KAT_KTX01"]; // 정성적 검사

    let initColumn = {};
    initColumn[""] = [];
    initColumn["PI01"] = columnType1;                                               // PI01 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 모두 OPEN
    initColumn["PI02"] = this.removeArray("TOLERANZOB", "SOLLWERT"); // PI02 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 상한값, 목표값은 DISABLE 나머지는 OPEN
    initColumn["PI03"] = this.removeArray("TOLERANZUN", "SOLLWERT"); // PI03 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 하한값, 목표값은 DISABLE 나머지는 OPEN
    initColumn["PI04"] = columnType2;                                               // PI04 : 정성적 검사는 모두 OPEN, 정량적 검사는 모두 DISABLE그대로
    initColumn["PI05"] = [];                                                        // PI05 : 정성적 검사/ 정량적 검사 모두 DISABLE
    initColumn["PI06"] = this.removeArray("SOLLWERT");              // PI06 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 목표값은 DISABLE 나머지는 OPEN 
    initColumn["PI07"] = this.removeArray("TOLERANZUN","SOLLWERT","TOLERANZOB");// PI07 : 정성적 검사 DISABLE 소숫점 필수 단위 옵션

    return initColumn;
  };

  onAddRow = () => {
    const listData = [];
    this.gridApi.forEachNode((node) => {
      listData.push(node.data);
    });

    // if(paramStatus == 'R') {
		// 	alert('결재상태가 상신인 경우\n 라인추가를 할수 없습니다.');
		// 	return;
		// }

    // merknr은 10단위로 생성된다(10,20,30~~) 중간에 빠진 번호가 있으면 신규 생성시 채우고진행한다(10,30~~) => row 추가시(10,30~~,20)
    let merknr = 0;
    // let StrMerknr = '';
    const merknrList = [];

    listData.forEach((rowNode) => {
      // console.log(rowNode.MERKNR);
      merknrList.push(Number(rowNode.MERKNR));
    });

    // for (let i = 0; i < listData.length; i + 1) {
    //   // merknrList.push(Number(listData[i].MERKNR));
    //   console.log(listData[i].MERKNR);
    // }

    if (merknrList.length === 0 && merknr === 0) {
      merknr = 10;
    } else if (merknrList.length !== 0 && merknr === 0) {
      merknr = (merknrList[merknrList.length - 1]) + 1;
      merknr = Math.ceil((merknr / 10)) * 10;
      let pad = '';
      if (merknr.length !== 4) {
        for (let i = 0; i < 4 - merknr.toString().length; i += 1) {
          pad += 0;
        }
        pad += merknr.toString();
        this.ladMerknr = pad;
      }
    }
    const addRow = {
      REVISION: this.state.revision,
      PLNNR: this.state.plnnr,
      PLNAL: this.state.plnal,
      VORNR: this.state.vornr,
      MERKNR: this.ladMerknr, // NO
      VSTEUERKZ: '', // Spec. 유형 키값
      ZLTXA3: '', // 상세Operation
      KURZTEXT: '', // 검사항목
      MIC_COMMENT: '', // Long Text
      QKURZTEXT: -1, // Spec. 유형
      STELLEN: '', // 정량적 검사 소수점
      MASSEINHSW: '', // 정량적 검사 단위
      TOLERANZUN: '', // 정량적 검사 하한값
      SOLLWERT: '', // 정량적 검사 목표값
      TOLERANZOB: '', // 정상적 검사 상한값
      KAT_KTX01: '', // 확인내용
      DUMMY10: '',
      ROWSTATE: 'ADD',
      ROW_STATE: 'Added',
    };
    // alert('로우 추가');
    let discnt = this.gridApi.getDisplayedRowCount(); // Display 전체 행 갯수
    this.gridApi.updateRowData({ add: [addRow], addIndex: discnt });
    datalist.push(addRow);
    // select box check
    this.gridApi.getDisplayedRowAtIndex(discnt).setSelected(true);

    console.log('tt : ',   this.gridApi.getSelectedNodes());

    // addrow edit mode
    const colkeyArr = ['MERKNR','ZLTXA3','KURZTEXT','MIC_COMMENT']
    for(let i = 0; i <= colkeyArr.length; i += 1) {
      this.gridApi.startEditingCell({
        rowIndex: discnt,
        colKey: colkeyArr[i]
      });
    }
    // this.gridApi.setFocusedCell(discnt, 'ZLTXA3');
  };

  onDeleteRow = () => {
    let selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length === 0) {
      alert('선택한 항목이 없습니다.');
    }
    for (let i = 0; i <= selectedData.length - 1; i += 1) {
      selectedData[i]['ROWSTATE'] = 'DEL';
      selectedData[i]['ROW_STATE'] = 'Deleted';
      datalist.push(selectedData[i]);
    }
    
    console.log('delete : ', datalist);
    this.gridApi.updateRowData({ remove: selectedData });
  };

  onEditRow = () => {
    const selectedData = this.gridApi.getSelectedRows();
    if (selectedData.length === 0) {
      alert('선택한 항목이 없습니다.');
    } else if (selectedData.length !== 1) {
      alert('수정은 한행만 가능합니다.');
    }

    console.log('SelectedNodes : ', this.gridApi.getSelectedNodes());
    // console.log('ColumnState : ', this.gridApi.getRowGroupColumns('test'));
    for (let i = 0; i <= selectedData.length - 1; i += 1) {
      if(!selectedData[i]['ROWSTATE'] === 'ADD')
      console.log('tttt');
      selectedData[i]['ROWSTATE'] = 'UPD';
      selectedData[i]['ROW_STATE'] = 'Modified';
      datalist.push(selectedData[i]);
    }

     /**
     * spec. 유형에 따른 editable 컬럼 boolean값 update - start
     */
    this.gridApi.stopEditing();
    const qkurztext = this.gridApi.getSelectedNodes()[0].data.QKURZTEXT;
    const columnDefsTemp = this.gridApi.getSelectedNodes()[0].columnApi.columnController.columnDefs;

   

    if(qkurztext) {
      columnDefsTemp[7].children.map((kData, kIndex) => {
        columnDefsTemp[7].children[kIndex].editable = false;
        if(qkurztext.CODE === 'PI04') {
          columnDefsTemp[7].children[kIndex].editable = true;
        }
      });
      
      columnDefsTemp[6].children.map((child, i) => {
        if(columnDefsTemp[6].children[i].field !== 'DUMMY10') {
          columnDefsTemp[6].children[i].editable = false;
        }
        if(this.state.allowEditColumn[qkurztext.CODE].length > 0) {
          for(let data of this.state.allowEditColumn[qkurztext.CODE]) {
            (data === child.field) ? columnDefsTemp[6].children[i].editable = true: '';
          }
        }
      });
    }
    
    this.gridApi.setColumnDefs(columnDefsTemp);
    // spec. 유형에 따른 editable 컬럼 boolean값 update - end

    const selectRowIndex = this.gridApi.getSelectedNodes().map(node => node.rowIndex);
    // this.gridApi.startEditingCell({
    //   rowIndex: selectRowIndex,
    //   colKey: 'MERKNR'
    // });
    const colkeyArr = ['MERKNR','ZLTXA3','KURZTEXT','MIC_COMMENT']
    for(let i = 0; i <= colkeyArr.length; i += 1) {
      this.gridApi.startEditingCell({
        rowIndex: selectRowIndex,
        colKey: colkeyArr[i]
      });
    }
    // this.gridApi.setFocusedCell(discnt, 'ZLTXA3');
  }
  handleSavePmSheetMicQual = () => {
    feed.showConfirm('저장하시겠습니까?', '', this.fnsave);
  }

  fnsave = () => {
    const returnParam = this.state;

    // console.log('returnParam', returnParam);    

    // const rowData2 = {
    //   list: { TASK_MIC_LIST: this.gridApi.getSelectedRows() },
    // };
    // console.log('rowData2 : ', rowData2);
    let rowData1 = {
      list: { TASK_MIC_LIST: datalist },
    }
    // console.log('datalist1 : ', datalist);
    // console.log('datalist2 : ', rowData1);

    const listData = [];
    this.gridApi.forEachNode((node) => {
      listData.push(node.data);
    });
    
    // console.log('save datalist : ', datalist[0]);
    
    // listData.push(datalist[0]);
    if (datalist[0]) {
      for (let i = 0; i < datalist[0].length; i += 1) {
        listData.push(datalist[0][i]);
      }
    }
    console.log('save listData : ', listData);

    //신규 or 수정 데이터 처리
	  let TaskMicSavecJson = [];
	  let TaskQualSaveJson = [];
	  let RowStatus = "";
	  let ROW_STATE = ""; 
	  let QUAL_DELETE = "";

    for (let i = 0; i < listData.length; i += 1) {
      let validMessage = this.saveValidChk(listData[i], i);
      console.log(validMessage);
      if(validMessage != "") {
        alert(validMessage);
        // 수정해야할 행 에디트모드
        return;
      }

      if(listData[i].ROW_TYPE !== undefined && listData[i].ROW_TYPE === "ADD") {
        if (!this.fncValidateDumTaskMicNo(listData[i])) return;
        RowStatus = "ADD";
        ROW_STATE = "Added";
      } 
      // 선택행이 에티드 상태일떄
      // else if(listData[i]._state.edited === true) {
      //   RowStatus = "UPD";
      //   ROW_STATE = "Modified";
      // }


      TaskMicSavecJson.push(this.getSaveData(listData[i],RowStatus));
		
      //정성적 검사 그리드 데이터
      if (listData[i]["QKURZTEXT"].CODE === "PI04") {
        for (let j = 1; j <= 30; j += 1) {
          if (listData[i]["STXT" + j] != null && listData[i]["STXT" + j].length > 0
            && listData[i]["VAL" + j] != null && listData[i]["VAL" + j].length > 0) {
            TaskQualSaveJson.push(this.getSaveQualData(listData[i], ROW_STATE, j));
          }
        }
      }
    }

    //정성적 검사 팝업창 데이터
    // if(TaskQualPopSaveJson.length>0){
    //   for(var i=0;i<TaskQualPopSaveJson.length;i++){
    //     TaskQualSaveJson.push(TaskQualPopSaveJson[i]);
    //   }
    // }
    
    // //삭제 데이터 처리
    // for(var i = 0; i<deleteRowData.length; i++) {
    //   RowStatus = "DEL";
    //   ROW_STATE = "Deleted";
      
    //   TaskMicSavecJson.push(getSaveData(deleteRowData[i],RowStatus));
    //   TaskQualSaveJson.push(getSaveQualData(deleteRowData[i],ROW_STATE));
    // }
    
    // //정성에서 정량 수정시 QUAL데이터 삭제처리
    // if (qualDeleteRowData.length > 0) {		
    // } else {
    //   QUAL_DELETE = "delete";
    // }
    
    // if (TaskMicSavecJson.length==0 && TaskQualSaveJson.length==0){
    //   alert("변경된 행이 없습니다.");
    //   return;
    // }

    console.log('returnParam1 : ', returnParam);
    
    this.props.handleSavePmSheetMicQual(rowData1,returnParam);
  };

  onExcel = () => {
    let fileDate = Date.now();
      const params = {
        fileName: `masterTaskMicQualList${fileDate}`,
        sheetName: 'masterTaskMicQual',
        columnKeys: ['MERKNR', 'KURZTEXT', 'ZLTXA3', 'QKURZTEXT', 'STELLEN', 'MASSEINHSW', 'TOLERANZUN', 'SOLLWERT', 'TOLERANZOB', 'KAT_KTX01'],
    };

    for (let i = 1; i <= 30; i += 1) {
			let strSTXTKey = "STXT"+i;
      let strVALKey = "VAL"+i;
      params.columnKeys.push(strSTXTKey, strVALKey);
    }
    this.gridApi.exportDataAsExcel(params);
  }

  processControl = (pType) => {
    // 인터락 체크 필요
    if (pType === 'save') {
      this.handleSavePmSheetMicQual();
    } else if (pType === 'edit') {
      this.onEditRow();
    } else if (pType === 'add') {
      this.onAddRow();
    } else if (pType === 'delete') {
      this.onDeleteRow();
    }
  }
  
  saveValidChk = (data, i) => {
    // 정량적검사 ==> 소수점(STELLEN), 단위(MASSEINHSW), 하한값(TOLERANZUN), 목표값(SOLLWERT), 상한값(TOLERANZOB)
    // 정성적검사 ==> 확인내용(KAT_KTX01), 선택item1(STXT1), 확인결과1(VAL1),~~~, 선택item5(STXT5), 확인결과5(VAL5)
    let itemName = {
      'STELLEN': '소수점'
      , 'MASSEINHSW': '단위'
      , 'TOLERANZUN': '하한값'
      , 'SOLLWERT': '목표값'
      , 'TOLERANZOB': '상한값'
      , 'KAT_KTX01': '확인내용'

    };

    for (let i = 1; i <= 30; i += 1) {
      itemName['STXT' + i] = '선택item' + i;
      itemName['VAL' + i] = '확인결과' + i;
    }

    let validMessage = '';
    // console.log('chk1 : ', data);
    // for(let i = 0; i <= data.length -1; i += 1){
    //   console.log('chk2 : ', data[i]['MERKNR']);
    // }
    // console.log('chk3 : ', itemName);


    if (Number(data['MERKNR']) > 9999) {
      return validMessage + 'No 는 최대 9999 까지 입력 가능합니다.';
    }

    if (data['KURZTEXT'] === '') validMessage += (validMessage == '' ? '' : ', ') + '검사항목';
    //if(data['MIC_COMMENT'] == '') validMessage += (validMessage == ''?'':', ') + '검사항목 상세';
    if (data['QKURZTEXT'].CODE === '') validMessage += (validMessage == '' ? '' : ', ') + 'SPEC유형';
    // if (data['VSTEUERKZ'] == '') validMessage += (validMessage == '' ? '' : ', ') + 'SPEC유형';


    if (validMessage != '') {
      return validMessage + '을(를) 입력하세요.';
    }

    //APC항목 AND와 OR 혼용 불가
    if (STORT === '' || true) {
      let micList = data
      let dummy10 = data['DUMMY10'];
      if (dummy10 !== '') {
        for (let i = 0; i < micList.length; i += 1) {
          if (micList[i].DUMMY10 !== '' && micList[i].DUMMY10 !== dummy10) {
            return validMessage + '서로다른 APC Type을 설정할 수 없습니다.';
          }
        }
      }

    }

    // 아래항목은 SPEC유형을 선택할때 변동적으로 필수입력이 변경되는 항목임
    let validItemArray = [];
    for (i in data) {
      if (this.fncAllowEdit(data, i) && data[i] === '') {
        if (data.QKURZTEXT.CODE === 'PI04') { //정성(코드)를 선택시  30개 컬럼의 세트로 입력하였는지 체크
          if (i === 'KAT_KTX01' || i === 'STXT1' || i === 'VAL1') { // 확인내용 /선택item /확인결과 의 set로 작성하면 OK임
            if (validMessage === '') validMessage = '[' + data['QKURZTEXT'].NAME + '] 선택시  다음값은 필수입니다.\n';
            validItemArray.push(itemName[i]);
            //validCheckData(data,itemName,i);
          }

        } else {
          if (i != 'MASSEINHSW') {
            if (validMessage === '') validMessage = '[' + data['QKURZTEXT'].NAME + '] 선택시  다음값은 필수입니다.\n';
            validItemArray.push(itemName[i]);
          }
        }
      }
    }
    if (validMessage !== '') validMessage += validItemArray.join(', ');
    else validMessage = this.validCheckData(data);

    return validMessage;
  }

  validCheckData = (data) => {
		let returnMessage = "";
		
		// 1.정량 - 하한,목표,상한 값 체크
		let TOLERANZUN = Number(data.TOLERANZUN);
		let SOLLWERT = Number(data.SOLLWERT);
		let TOLERANZOB = Number(data.TOLERANZOB);
		
		if(data.QKURZTEXT.CODE === "PI01") {
			if( TOLERANZUN > SOLLWERT ){
				return returnMessage = '[정량적검사] 하한값이 목표값 보다 큽니다.';
			}
			if( TOLERANZUN > TOLERANZOB ){
				return returnMessage = '[정량적검사] 하한값이 상한값 보다 큽니다.';
			}
			if( SOLLWERT > TOLERANZOB ){
				return returnMessage = '[정량적검사] 목표값이 상한값 보다 큽니다.';
			}
		}else if(data.QKURZTEXT.CODE === "PI06") {
			if( TOLERANZUN > TOLERANZOB ){
				return returnMessage = '[정량적검사] 하한값이 상한값 보다 큽니다.';
			}
		}
		// 2.정성적 검사 데이터 체크
		// 데이터 전체 수량	구하여 중간에 빈 필드있는지 확인
		let dataSize = 0;
		let arrIndex = new Array();
		let arrEmptyIndex = new Array();
		let lastIndex = 0;
		
    for (var j = 30; j >= 1; j -= 1) {
      if( ( data["STXT"+j] !== '' || data["STXT"+j] !== '' )){
			// if( ( data["STXT"+j] !== '' && data["STXT"+j] !== undefined ) || ( data["VAL"+j] !== '' && data["VAL"+j] !== undefined ) ){
				arrIndex.push(j);
        dataSize += 1;	
			}else {
				arrEmptyIndex.push(j);
			}
		}
    lastIndex = arrIndex[0];
    console.log('dataSize : ', dataSize);
		
		if( data.QKURZTEXT.CODE === "PI04" && lastIndex !== arrIndex.length ){
			return returnMessage = "정성적검사 "+ "선택Item"+arrEmptyIndex[arrEmptyIndex.length-1] +"  확인결과"+arrEmptyIndex[arrEmptyIndex.length-1] +" 필드를 확인하세요.";
		}
		
		for(var k=0; k<=arrIndex.length; k++){
			if( ( data["STXT"+arrIndex[k]]) === ''){
				returnMessage = "선택Item" +  arrIndex[k] +" 필드가 입력되지 않았습니다." ;
			}else if( ( data["VAL"+arrIndex[k]]) === '' ){
				returnMessage = "확인결과" + arrIndex[k] +" 필드가 입력되지 않았습니다." ;
			}
		}
		
		return returnMessage;
		
	}
  

  fncAllowEdit = (data, column) => {
    // 정량적검사 ==> 소수점(STELLEN), 단위(MASSEINHSW), 하한값(TOLERANZUN), 목표값(SOLLWERT), 상한값(TOLERANZOB)
    // 정성적검사 ==> 확인내용(KAT_KTX01), 선택item1(STXT1), 확인결과1(VAL1),~~~, 선택item5(STXT5), 확인결과5(VAL5)
    let columnType1 = ['STELLEN','MASSEINHSW','TOLERANZUN','SOLLWERT','TOLERANZOB']; // 정량적검사
    let columnType2 = ['KAT_KTX01']; // 정성적검사
    // 정성검사 항목수 30개로 증가
    for (let i = 1; i <= 30; i += 1) {
      columnType2.push('STXT' + i);
      columnType2.push('VAL' + i);
    }
    let columnTypeAll = [];
    for (let i = 0; i < columnType1.length; i += 1) {
      columnTypeAll.push(columnType1[i]);
    }
    for (let i = 0; i < columnType2.length; i += 1) {
      columnTypeAll.push(columnType2[i]);
    }

    let allowEditColumn = {};
    allowEditColumn[''] = [];
    allowEditColumn['PI01'] = columnType1;                                               // PI01 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 모두 OPEN
    allowEditColumn['PI02'] = this.removeArray(columnType1.slice(),'TOLERANZOB', 'SOLLWERT'); // PI02 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 상한값, 목표값은 DISABLE 나머지는 OPEN
    allowEditColumn['PI03'] = this.removeArray(columnType1.slice(),'TOLERANZUN', 'SOLLWERT'); // PI03 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 하한값, 목표값은 DISABLE 나머지는 OPEN
    allowEditColumn['PI04'] = columnType2;                                               // PI04 : 정성적 검사는 모두 OPEN, 정량적 검사는 모두 DISABLE그대로
    allowEditColumn['PI05'] = [];                                                        // PI05 : 정성적 검사/ 정량적 검사 모두 DISABLE
    allowEditColumn['PI06'] = this.removeArray(columnType1.slice(), 'SOLLWERT');              // PI06 : 정성적 검사는 모두 DISABLE그대로, 정량적 검사는 목표값은 DISABLE 나머지는 OPEN 
    allowEditColumn['PI07'] = this.removeArray(columnType1.slice(), 'TOLERANZUN','SOLLWERT','TOLERANZOB');// PI07 : 정성적 검사 DISABLE 소숫점 필수 단위 옵션 

		if(gridSavable != 'Y') {
			return false;
		} else {
			if(data.QKURZTEXT.CODE === 'PI01' 
					|| data.QKURZTEXT.CODE === 'PI02' 
					|| data.QKURZTEXT.CODE === 'PI03' 
					|| data.QKURZTEXT.CODE === 'PI04' 
					|| data.QKURZTEXT.CODE === 'PI05' 
					|| data.QKURZTEXT.CODE === 'PI06' 
					|| data.QKURZTEXT.CODE === 'PI07') {
        let allowedEdit = allowEditColumn[data.QKURZTEXT.CODE];
        // console.log("allowedEdit : ", allowedEdit);
        // console.log("column : ", column);
        if(column === "STELLEN"){
          // console.log("test : ", this.arrayIndexOf(allowedEdit,column));
        }
				if(this.arrayIndexOf(allowedEdit,column) > -1) {
					return true;
				} else {
					return false;
				}
			}
		}
  }

  arrayIndexOf = (array, str) => {
    for (var i = 0; i < array.length; i += 1) {
			if(array[i] === str) {
				return i;
			}
		}
		return - 1;
  }
  
  fncValidateDumTaskMicNo = (row) => {
    // const list = $("#grid").alopexGrid("dataGet");
    const list = [];
    this.gridApi.forEachNode((node) => {
      list.push(node.data);
    });
    
    for (var i = 0; i < list.length; i += 1) {
      if (list[i].ROW_TYPE !== "ADD" && list[i]["MERKNR"] === row["MERKNR"]) {
        alert("중복된  No 입니다.");
        // 수정해야할 행 에디트모드
        return false;
        break;
      }
    }
    return true;
  }

  getSaveData = (obj, RowStatus) => {
    var saveObj = {};
    saveObj["U_ID"] 		= obj["U_ID"];
    saveObj["REVISION"]     = obj["REVISION"];
    saveObj["PLNNR"]        = obj["PLNNR"];
    saveObj["PLNAL"]        = obj["PLNAL"];
    saveObj["VORNR"]        = obj["VORNR"];
    saveObj["MERKNR"]       = this.fncLpadZeroCode(obj["MERKNR"], 4);
    saveObj["ZLTXA3"]     	= obj["ZLTXA3"];
    saveObj["KURZTEXT"]     = obj["KURZTEXT"];
    saveObj["MIC_COMMENT"]	= obj["MIC_COMMENT"];
    saveObj["VSTEUERKZ"]    = obj["QKURZTEXT"].CODE;
    saveObj["DUMMY10"]    	= obj["DUMMY10"];
    saveObj["QKURZTEXT"]    = obj["QKURZTEXT"].NAME;
    saveObj["STELLEN"]      = obj["STELLEN"];
    saveObj["MASSEINHSW"]   = obj["MASSEINHSW"];
    saveObj["TOLERANZUN"]   = obj["TOLERANZUN"];
    saveObj["SOLLWERT"]     = obj["SOLLWERT"];
    saveObj["TOLERANZOB"]   = obj["TOLERANZOB"];
    saveObj["KAT_KTX01"]    = obj["KAT_KTX01"];
    saveObj["ROW_STATUS"]   = RowStatus;
    
    // 정량적 검사 숫자 입력시 자동 소수점 뒷자리 생성
    if(this.fncAllowEdit(obj,"STELLEN")){
      let TOLERANZUN = Number(obj["TOLERANZUN"]);
      let SOLLWERT = Number(obj["SOLLWERT"]);
      let TOLERANZOB = Number(obj["TOLERANZOB"]);
      
      if( obj["TOLERANZUN"] !== '' ){
        saveObj["TOLERANZUN"]        = TOLERANZUN.toFixed(obj["STELLEN"]);	
      }
      if( obj["SOLLWERT"] !== '' ){
        saveObj["SOLLWERT"]          = SOLLWERT.toFixed(obj["STELLEN"]);	
      }
      if( obj["TOLERANZOB"] !== '' ){
        saveObj["TOLERANZOB"]        = TOLERANZOB.toFixed(obj["STELLEN"]);	
      }
    }
    
    // 정성검사 항목수 30개로 증가
    for(let i=1; i<=30; i+= 1){
      saveObj["STXT"+i] = obj["STXT"+i];
      saveObj["VAL"+i] = obj["VAL"+i];
    }
    
    return saveObj;
  }

  fncLpadZeroCode = (iCode, iLen) => {
    let str = "" + iCode;
    let pad = "";

    for (let i = 0; i < iLen; i += 1) {
      pad += "0";
    }

    return pad.substring(0, pad.length - str.length) + str;
  }

  getSaveQualData(row,ROW_STATE,j) {
    let saveObj = {};
    
    saveObj["REVISION"] 	= row["REVISION"];
    saveObj["PRE_REVISION"]	= row["REVISION"];
    saveObj["PLNNR"] 		= row["PLNNR"];
    saveObj["PLNAL"] 		= row["PLNAL"];
    saveObj["ITEM1"] 		= row["VORNR"];
    saveObj["ITEM2"] 		= this.fncLpadZeroCode(row["MERKNR"], 4);
    
    if (j !== undefined && j !== null && j !== "") {
      saveObj["CODE"] 		= this.fncLpadZeroCode(j.toString(), 4);
      saveObj["CODEGRUPPE"] 	= "";
      saveObj["CODEGRUPPE_T"] = row["KAT_KTX01"];
      saveObj["CODE_T"] 		= row["STXT"+j];
      saveObj["VALUE"] 		= row["VAL"+j];		
    }else{
      saveObj["CODE"] 		= "";
      saveObj["CODEGRUPPE"] 	= "";
      saveObj["CODEGRUPPE_T"] = "";
      saveObj["CODE_T"] 		= "";
      saveObj["VALUE"] 		= "";
    }
  
    saveObj["ROW_STATE"] 	= ROW_STATE;
    
    return saveObj;
  }
  

  render() {
    const { 
      checkListDataList,
      pmTypeCombo,
      masseinhswGridCombo
     } = this.props;
            
    return (
      <section className='gipms popup'>
        <header>
          <h2 className='title'>PM Sheet 조회</h2>
        </header>
        {/* popup contnent */}
        <section className='popup-content'>
          <div className='btn-group'>
            <div className='left'>
              <span className='grid-info'>
                {decodeURI(decodeURIComponent(eqktx1))} : {decodeURI(decodeURIComponent(this.state.ltxa1))} [ {decodeURI(decodeURIComponent(this.state.ktex1))} ]
              </span>
            </div>
            <div className='right'>
              <Button type='primary' className='btn-apply save'
                title='저장'
                onClick={() => this.processControl('save')}
              >
              저장
              </Button>
              <Button type='primary' className='btn-normal edit'
                title='수정'
                onClick={() => this.processControl('edit')}
              >
              수정
              </Button>
              <Button type='primary' className='btn-normal add-line'
                title='라인추가'
                onClick={() => this.processControl('add')}
              >
              라인추가
              </Button>
              <Button type='primary' className='btn-normal add-line'
                title='라인삭제'
                onClick={() => this.processControl('delete')}
              >
              라인삭제
              </Button>
              <Button type='primary' className='btn-apply excel'
                title='엑셀'
                onClick={this.onExcel}
              >
              엑셀
              </Button>
            </div>
          </div>
          {/* ag Grid */}
          <div className='grid-area'>
            <div className='ag-theme-balham' style={{ height: '400px', width: '100%' }}>
              <Grid
                CheckListDataList={checkListDataList}
                pmTypeCombo={pmTypeCombo}
                onGridReady={this.onGridReady}
                masseinhswGridCombo={masseinhswGridCombo}
                allowEditColumn={this.state.allowEditColumn}
                opGubun={this.state.opGubun}
              />
            </div>
          </div>
        </section>
      </section>
    );
  }
}

PmSheetMicQualListPopup.propTypes = {
  handleLoadingParam: PropTypes.func.isRequired,
  handleSavePmSheetMicQual: PropTypes.func.isRequired,
  checkListDataList: PropTypes.array,
  match: PropTypes.object.isRequired,
  pmTypeCombo: PropTypes.array,
  loadingOn: PropTypes.func.isRequired,
  masseinhswGridCombo: PropTypes.array,
};

PmSheetMicQualListPopup.defaultProps = {
  checkListDataList: [],
  pmTypeCombo: [],
  masseinhswGridCombo: [],
};

const mapStateToProps = createStructuredSelector({
  checkListDataList: selectors.makeCheckListDataList(),
  pmTypeCombo: selectors.makePmTypeCombo(),
  masseinhswGridCombo: selectors.makeMasseinhswGridCombo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleSavePmSheetMicQual: (param, returnParam) => dispatch(actions.loadingMicQualListsave(param, returnParam)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'PmSheetMicQualListPopup', reducer });
const withSaga = injectSaga({ key: 'PmSheetMicQualListPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetMicQualListPopup);
