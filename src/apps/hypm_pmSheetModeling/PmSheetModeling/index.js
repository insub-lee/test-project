import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Select, Button, Breadcrumb, Tabs, Modal, Row, Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import * as feed from 'components/Feedback/functions';
import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';

// import 'apps/hypm_common/css/fonts/simple-line-icons/simple-line-icons.min.css';
import 'apps/hypm_common/css/gipms.css';
import * as actionsLoading from 'containers/common/Loading/actions';
import Axios from 'axios';

// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
// import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';
import PmSheetOperation from '../PmSheetOperation';

const Options = Select.Option;
const { TabPane } = Tabs;
class PmSheetModeling extends PureComponent {
  constructor(props) {
    super(props);

    // const { location } = props;
    // const { pathname } = location;

    this.state = {
      defaultBox: [],
      fab: undefined,
      team: undefined,
      sdpt: undefined,
      sdptName: undefined,
      // sdpt_name: undefined,
      // fl: undefined,
      // model: undefined,
      version: undefined,
      pmType: undefined,
      operationParam: [],
      tabNum: '1',
      // pathname,
      model: [],
      // newRowData: [],
      searchSuccess: false,
      visible: false,
      fabCopy: undefined,
      sdptCopy: undefined,
      modelCopy: undefined,
      fabCopyName: undefined,
      sdptCopyName: undefined,
      modelCopyName: undefined,
      approvlaVisible: false,
      asisInput: undefined,
      tobeInput: undefined,
    };
    this.props.handleLoadingFabParam();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      searchSuccess: nextProps.searchSuccess,
    });
  }

  onGridReady = (params) => {
    this.gridApi = params.api;
    // const { onGridReady } = this.props;
    // onGridReady(params);
    this.gridColumnApi = params.columnApi;
    // params.api.sizeColumnsToFit();
  };

  onAddRow = () => {
    let addRowBool = true;
    this.gridApi.forEachLeafNode( (node) => {
      if (node.data.ROW_TYPE === 'ADD'
        // || node.data.ROW_TYPE === 'UPDATE'
        // || node.data.ROW_TYPE === 'DEL'
        // || node.data.ROW_TYPE === 'COPY'
        ) {
        addRowBool = false;
      }
    });

    if (!this.state.searchSuccess) {
      feed.error('조회후  신규추가작업을 하실수 있습니다.');
    } else if (!addRowBool) {
      feed.error('저장후 진행해 주세요.'); 
    } else {
      const { sdptName, sdpt } = this.state;
      // const { modelList, pmTypeCombo } = this.props;

      const addRow = {
        // chk: true,
        ARBPL: sdpt,
        KTEXT2: sdptName,
        // EQKTX: -1,
        // TXT: -1,
        // PLNAL: '',
        HEADER_KTEXT: '',
        // planCheckCnt: '',
        REVISION: 'AAA',
        ACTIVE: 'N',
        // KTEXT3: -1,
        // MODIFY_NM: '',
        // MODIFY_DT: '',
        // STATUS_DESC: '',
        // REQ_COMMENT: '',
        // ASIS_COMMENT: '',
        // TOBE_COMMENT: '',
        REQ_NAME: this.props.userInfo.NAME_KOR,
        // REQ_DT: '',
        // APPROVE_NAME: '',
        // APPROVE_DT: '',
        // BEBER: '',
        ROW_TYPE: 'ADD',
      };
      this.gridApi.updateRowData({ add: [addRow], addIndex: 0 });
      // this.gridApi.setFocusedCell(0, 'EQKTX');
      const columnDefsTamp = this.gridColumnApi.columnController.columnDefs.slice();
      columnDefsTamp[2].editable = true;
      columnDefsTamp[3].editable = true;
      this.gridApi.setColumnDefs(columnDefsTamp);

      this.gridApi.startEditingCell({ rowIndex: 0, colKey: 'EQKTX' });
      this.gridApi.forEachLeafNode( (node) => {
        if (node.data.ROW_TYPE === 'ADD') {
            node.setSelected(true);
        }
      });
    }
  };

  m167_fncCopy = () => {
    /* 임시 테스트 용 주석 */
    if (!this.state.searchSuccess) {
      feed.error('조회후  Copy 작업을 하실수 있습니다.');
      return;
    }
    this.gridApi.stopEditing();
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedRow = selectedNodes.map(node => node.data);

    if(selectedRow.length === 0) {
      feed.error('선택된 행이 없습니다');
			return;
		} else if(selectedRow.length > 1) {
      feed.error('COPY는 한행만 가능합니다.');
			return;
    }
    
    if( selectedRow[0].ROW_TYPE === 'ADD'){
      feed.error('저장되지 않은 데이타가 존재합니다. 저장후 진행하세요.');
			return;
    }
    
    this.setState({
      visible: true,
    });
  };

  handleFabChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      fab: event,
      team: undefined,
      sdpt: undefined,
      sdptName: undefined,
      // sdpt_name: undefined,
      // fl: undefined,
      model: [],
    });
  }

  handleTeamChange = (event) => {
    const { handleLoadingTeamParam } = this.props;
    handleLoadingTeamParam(event);
    this.setState({
      team: event,
      sdpt: undefined,
      sdptName: undefined,
      // sdpt_name: undefined,
      // fl: undefined,
      model: [],
    });
  }

  handleSdptChange = (event) => {
    const strArry = event.split(',');
    const code = strArry[0];
    const name = strArry[1];

    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(code);
    this.setState({
      sdpt: code,
      model: [],
      sdptName: name,
    });
  }

  // handleFlChange = (event) => {
  //   this.setState({
  //     fl: event,
  //   });
  // }

  handleModelChange = (event) => {
    console.log('malang1..', event);
    this.setState({
      model: event,
    });
  }

  handlePmChange = (event) => {
    this.setState({
      pmType: event,
    });
  }

  handleVersionChange = (event) => {
    this.setState({
      version: event,
    });
  }

  handleSearch = () => {
    const { handlePmSheetSearch } = this.props;
    const {
      fab,
      team,
      sdpt,
      // fl,
      model,
      version,
      pmType,
    } = this.state;

    if (fab === '' || team === '' || sdpt === '' ||
    fab === undefined || team === undefined || sdpt === undefined) {
      feed.error('[FAB], [Team], [SDPT] 는(은) 입력 필수값 입니다.');
    } else {
      const param = {
        tabGubun: 'FAB',
        PARAM_BEBER: fab,
        PARAM_STORT: team,
        PARAM_ARBPL: sdpt,
        MULTI_PARAM_EQART: model,
        PARAM_TXT: pmType,
        PARAM_VERSION: version,
      };
      handlePmSheetSearch(param);
      this.setState({
        tabNum: '1',
      });
    }
  }

  handleDownloadButton = () => {
    // const { handlePMSheetDownload } = this.props;
    // handlePMSheetDownload();
  }

  handleTebOnChange = (key) => {
    console.log(key);
    this.setState({ tabNum: key });
  }

  gridSave = () => {
    // 저장은 한줄씩만 가능하다.
    // 조회후  신규추가작업을 하실수 있습니다.
    // 저장후 진행해 주세요
    // MODEL, PM 유형, PM Sheet는 필수 입력사항입니다.
    this.gridApi.stopEditing();
    let valueChk = true;

    const addList = [];
    const updateList = [];

    this.gridApi.forEachNode((node) => {
      if (node.data.ROW_TYPE === 'ADD') {
        addList.push(this.m167_getSaveData(node.data));
      } else if (node.data.ROW_TYPE === 'UPDATE'){
        updateList.push(this.m167_getSaveData(node.data));
      }
    });

    console.log('malang..addList', addList);
    console.log('malang..updateList', updateList);
    // return;

    // const selectedNodes = this.gridApi.getSelectedNodes();
    // const selectedAllData = selectedNodes.map(node => node.data);
    // const addList = [];

    for (let i = 0; i < addList.length; i += 1) {
      if (addList[i].EQKTX === undefined || addList[i].EQKTX === ''
        || addList[i].TXT === undefined || addList[i].TXT === ''
        || addList[i].HEADER_KTEXT === undefined || addList[i].TXT === '') {
        valueChk = false;
      } 
    }

    for (let i = 0; i < updateList.length; i += 1) {
      if (updateList[i].EQKTX === undefined || updateList[i].EQKTX === ''
        || updateList[i].TXT === undefined || updateList[i].TXT === ''
        || updateList[i].HEADER_KTEXT === undefined || updateList[i].TXT === '') {
        valueChk = false;
      } 
    }

    if (valueChk){
     
      // add 일 시 사용할 param
      const it_tasklist = [{
        PLNNR: addList.length > 0 ? addList[0].PLNNR : '',
        KTEXT: addList.length > 0 ? addList[0].HEADER_KTEXT : '',
        SABUN: this.props.userInfo.EMP_NO,
        SWERK: '1010', //임시하드코딩
        SEQ: 1,
      }];
      // console.log('malang..save', selectedNodes[0].data);
      const params = {
        PARAM_MODIFY_USER: this.props.userInfo.EMP_NO,        
        list: {
          IT_TASKLIST: it_tasklist,
          addList,
          updateList,
        },
      };

      const {
        fab,
        team,
        sdpt,
        // fl,
        model,
        version,
        pmType,
      } = this.state;
  
      const returnParam = {
        tabGubun: 'FAB',
        PARAM_BEBER: fab,
        PARAM_STORT: team,
        PARAM_ARBPL: sdpt,
        MULTI_PARAM_EQART: model,
        PARAM_TXT: pmType,
        PARAM_VERSION: version,
      };

      this.props.handleSave(params, returnParam);
    } else {
      feed.error('MODEL, PM 유형, HyPM 명은 필수 입력사항입니다.'); 
    }
  };

  handleSave = () => {
    feed.showConfirm('저장하시겠습니까?', '', this.gridSave);
  };



  handleDelete = () => {
    feed.showConfirm('삭제하시겠습니까?', '', this.deleteRow);
  };
  
  // 권한체크
  deleteRow = () => {
    this.gridApi.stopEditing();
    let valueChk = true;
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedAllData = selectedNodes.map(node => node.data);
    const deleteList = [];

    if (selectedAllData.length === 0) {
      valueChk = false;
      feed.error('선택한 항목이 없습니다.'); 
    } else if (selectedAllData[0].STATUS === 'R') {
      valueChk = false;
      feed.error('결재상태가 상신인 경우 삭제할 수 없습니다.'); 
    }

    if (valueChk){
      selectedAllData.map(item => (        
        deleteList.push({
          KTEXT2: item.KTEXT2,
          EQKTX: item.EQKTX,
          TXT: item.TXT,
          VERWE: item.VERWE,
          PLNAL: item.PLNAL,
          HEADER_KTEXT: item.HEADER_KTEXT,
          planCheckCnt: item.planCheckCnt,
          REVISION: item.REVISION,
          ACTIVE: item.ACTIVE,
          KTEXT3: item.KTEXT3,
          MODIFY_NM: item.MODIFY_NM,
          MODIFY_DT: item.MODIFY_DT,
          STATUS_DESC: item.STATUS_DESC,
          REQ_COMMENT: item.REQ_COMMENT,
          ASIS_COMMENT: item.ASIS_COMMENT,
          TOBE_COMMENT: item.TOBE_COMMENT,
          REQ_NAME: item.REQ_NAME,
          REQ_DT: item.REQ_DT,
          APPROVE_NAME: item.APPROVE_NAME,
          APPROVE_DT: item.APPROVE_DT,
          BEBER: item.BEBER,
          STATUS: item.STATUS,
          PLNNR: item.PLNNR,
          ARBPL: item.ARBPL,
          STRAT: item.STRAT,
          APPROVE_ID: item.APPROVE_ID,
          FING: item.FING,
          REQ_ID: item.REQ_ID,
          U_ID: item.U_ID,
        })
      ));
      
      // 삭제시 PLNAL채번 RFC로 삭제 상태를 통보한다. 리턴결과가 성공이면 이후 로직을 진행하도록 한다. 20140917 박인성
      const _paramJson = [{
        PLNNR: deleteList[0].PLNNR,
        PLNAL: deleteList[0].PLNAL,
        DELET: 'X',
      }];

      const params = {
        // PARAM_MODIFY_USER: this.props.userInfo.EMP_NO,        
        list: {
          IT_TASKLIST: _paramJson,
          // addList,          
        },
      };

      const _delRowREVISION = deleteList[0].REVISION;
			const _delRowACTIVE = deleteList[0].ACTIVE;
			const _delRowAPPROVE_STATUS = deleteList[0].STATUS;
      const _delRowAPPROVE_STATUS_DESC = deleteList[0].STATUS_DESC;

      // REVISION이 AAA이고 ACTIVE N, 결재상태가 null 인 데이터는 
			// SAP에 PLNNR, PLNAL 삭제를 통보하고 검증 성공후 삭제 처리 하도록 함. 20140917 박인성
      
      if(_delRowREVISION !== undefined && _delRowACTIVE !== undefined &&
        _delRowREVISION === 'AAA' && _delRowACTIVE === 'N' &&
        (_delRowAPPROVE_STATUS === null || _delRowAPPROVE_STATUS === '' || _delRowAPPROVE_STATUS_DESC === null || _delRowAPPROVE_STATUS_DESC === '')){

          Axios.post('/api/gipms/v1/pmmodel/masterPmSheetDelNoticeToSAP', params)
          .then((result) => {
            if (result.data) {
              const EV_SUBRC = result.data.EV_SUBRC;
              if (EV_SUBRC === "0") {
                // feed.error('삭제 진행중 ', EV_SUBRC);
                this.m167_deleteRowProc(deleteList);
              } else {
                feed.error('처리중 오류가 발생하였습니다. 확인바랍니다.');
                // this.m167_deleteRowProc(deleteList);//임시
              }
            }
          });
        } else { //그외에는 기존 로직 대로 삭제 프로세스를 진행함
          this.m167_deleteRowProc(deleteList);
        }
    }
  };

  m167_deleteRowProc = (deleteRowData) => {
    // 결재상태가 저장중인것이 아니면(상신,승인,부결)
    let validStr = '';

    for (let i = 0; i < deleteRowData.length; i += 1) {
      let status = deleteRowData[i].STATUS;
      let active = deleteRowData[i].ACTIVE; // 초기데이타는 결재테이블에 저장없이 active만 들고 있다.

       //TASKLIST_HEADER_W -> ACTIVE가 'Y'인 경우는 삭제상신 팝업창 호출
      //  active = 'Y'; //임시
      if(active === 'Y'){
        this.m167_fncNextRevisonSearch();
      } else {
        if(status !== '' && status !== undefined && status !== null) {
					if(active === 'Y') status = '승인';
					else if(status === 'S' || status === '') status = '';
					else if(status === 'R') status = '상신';
					else if(status === 'Y') status = '승인';
					else if(status === 'F') status = ''; //status = '부결';
				} else {
					// rfc에서 바로 넘어온 데이타는 결재테이블에 쌓이지 않고 승인이 완료된 상태로 넘어온다. status는 결재테이블에서 가져옴
					status = deleteRowData[i].ACTIVE;
					if(status === 'Y') {
						status = '승인';
					} else {
						status = '';
					}
        }
				if(status !== '') validStr === `${deleteRowData[i].HEADER_KTEXT}건은 ${status} 상태입니다.`;
        
        // 결재상태가 저장중인것이 아니면(상신,승인,부결) return 시킨다.
				if(validStr !== '') {
          feed.error(`결재 상태를 확인하세요\n${validStr}`);
				} else {
          this.m167_fncSave(deleteRowData);
        }        
      }
    }
  }

  m167_fncSave = (deleteRowData) => {
    const deleteList = [];
		for(var i = 0; i<deleteRowData.length; i++) {
			deleteList.push(this.m167_getSaveData(deleteRowData[i]));
    }

    const params = {
      PARAM_MODIFY_USER: this.props.userInfo.EMP_NO,        
      list: {
        // IT_TASKLIST: it_tasklist,
        deleteList,          
      },
    };

    const {
      fab,
      team,
      sdpt,
      model,
      version,
      pmType,
    } = this.state;

    const returnParam = {
      tabGubun: 'FAB',
      PARAM_BEBER: fab,
      PARAM_STORT: team,
      PARAM_ARBPL: sdpt,
      MULTI_PARAM_EQART: model,
      PARAM_TXT: pmType,
      PARAM_VERSION: version,
    };

    this.props.handleSave(params, returnParam);
  }

	m167_getSaveData = (obj) => {
		const saveObj = {
      U_ID: obj.U_ID,
      PREV_U_ID: obj.U_ID,
      REVISION: obj.REVISION,
      PLNNR: obj.PLNNR,
      EQKTX: obj.EQKTX,
      APPROVE_DT: obj.APPROVE_DT,
      PLNAL: obj.PLNAL,
      ACTIVE: 'N', //obj["ACTIVE"];  ==> 결재후에만 'Y' 가된다. 조회결과가 Y인것을 저장하게 되면 신규로 N인 로우를 생성해야한다.
      HEADER_KTEXT: obj.HEADER_KTEXT,
      ARBPL: obj.ARBPL,
      KTEXT2: obj.KTEXT2,
      BEBER: obj.BEBER,
      FING: obj.FING,
      VERWE: obj.VERWE,
      TXT: obj.TXT,
      STRAT: obj.STRAT,
      KTEXT3: obj.KTEXT3,
      REQ_COMMENT: obj.REQ_COMMENT,
      ASIS_COMMENT: obj.ASIS_COMMENT,
      TOBE_COMMENT: obj.TOBE_COMMENT,
      REQ_ID: obj.REQ_ID,
      REQ_NAME: obj.REQ_NAME,
      REQ_DT: obj.REQ_DT,
      APPROVE_NAME: obj.APPROVE_NAME,
      APPROVE_ID: obj.APPROVE_ID,
      APPROVE_DT: obj.APPROVE_DT,
      KTEXT: obj.HEADER_KTEXT, //RFC에서 PLNAL채번하도록 하기위해 필요파라미터 추가 20140917 박인성
      SEQ: 1, //RFC에서 PLNAL채번하도록 하기위해 필요파라미터 추가 20140917 박인성
      SABUN: this.props.userInfo.EMP_NO,
      SWERK: '1010', //임시하드코딩
    };
    return (saveObj);
	}

  m167_fncNextRevisonSearch = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const deleteRowData = selectedNodes.map(node => node.data);

    const params = {
      PLNNR: deleteRowData[0].PLNNR,
			PLNAL: deleteRowData[0].PLNAL,
			REVISION: deleteRowData[0].REVISION,
    };

    Axios.post('/api/gipms/v1/pmmodel/masterPmSheetNextRevisionSearch', params)
    .then((result) => {
      if (result.data.result === '00000') {
        const resultList = result.data.list.dataList;
        const data = resultList[0];

        if (data.CNT !== 0){
          feed.error(`삭제로 생성된 Revision ${data.NEXT_REVISION}가 존재합니다.\n\n해당 Revision 으로 상신하시기 바랍니다.`);
        } else {
          this.m167_fncElecApprove();
        }
      } else {
        feed.error('데이터 조회에 실패하였습니다. 다시 시도해 주세요.');
      }      
    });
  }

	m167_fncElecApprove = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const deleteData = selectedNodes.map(node => node.data);
    const updateList = [];	
    
    for (let i = 0; i < deleteData.length; i += 1) {
			updateList.push(this.m167_getApprovalData(deleteData[i]));
    }

    const params = {
      DOC_TYPE: 'TL',
      STATUS: 'S',
      TAB_GUBUN: 'FAB',
      EMP_NUM: this.props.userInfo.EMP_NO,
      EMP_NAM: this.props.userInfo.NAME_KOR,
      DEPT_CD: String(this.props.userInfo.DEPT_ID),
      DEPT_NM: this.props.userInfo.DEPT_NAME_KOR,
      list: {
        updateList: updateList
      },
    };
    
    Axios.post('/api/gipms/v1/pmmodel/masterPmSheetDeleteActive', params)
    .then((result) => {
      if (result.data.result === '00000') {
        const resultCode = result.data.resultCode;
        const evSapCal = result.data.EV_SAP_CAL;

        if(resultCode === '0') {
          if( evSapCal === '' ) {
            feed.error('결재대상 항목이 없습니다. 확인바랍니다.');//결재 대상 Item 이 존재하지 않습니다.
          } else {
            const formatType = 'WF_PM_009';	// 서비스탭의 submit 버튼클릭
            const epayUrl = 'http://apvdev2.skhynix.com';
            const empNum = this.props.userInfo.EMP_NO;
            window.open(`${epayUrl}/WebSite/Approval/APVFormLink.aspx?LOGIN_ID=${empNum}&FORM_PREFIX=${formatType}&LEGACY_PK=${evSapCal}&INTERFACE_ID=PM13-I-0008-Skynet-SkyNet&LEGACY_GUBUN=PM&MustAttach=", "전자결재", "width=800, height=700, toolbar=no, menubar=no, scrollbars=no, resizable=yes` );
            
            //성공시 다시 조회
            this.handleSearch();
          }
        }
      } else {
        feed.error('처리중 오류가 발생하였습니다.');
      }      
    });
  }
  
  m167_getApprovalData = (obj) => {
    /* check message 용 시작*/
    const approvalObj = {
      KTEXT2: obj.KTEXT2,
      REVISION: obj.REVISION,
      PLNNR: obj.PLNNR,
      PLNAL: obj.PLNAL,
      REQ_COMMENT: obj.REQ_COMMENT,
      ASIS_COMMENT: this.state.asisInput, // 결제 레이어 팝업 값
      TOBE_COMMENT: this.state.tobeInput, // 결제 레이어 팝업 값
      EQKTX: obj.EQKTX,
      TXT: obj.TXT,
      KTEXT3: obj.STRAT === '' ? '' : obj.KTEXT3,
      HEADER_KTEXT: obj.HEADER_KTEXT,
      REQ_NAME: obj.REQ_NAME,
      TL_DEL: obj.TL_DEL,
      FING: obj.FING,
      REQ_DT: obj.REQ_DT === null || obj.REQ_DT === undefined ? new Date().toISOString().slice(0, 10) : obj.REQ_DT,
      U_ID: obj.U_ID,
    };
    return (approvalObj);
  }

  m167_editRow = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectAllNode = selectedNodes.map(node => node.data);
    let updateFlag = true;

    if (selectAllNode.length < 1) {
      feed.error('선택된 행이 없습니다.');
      updateFlag = false;
    } else if (selectAllNode.length > 1) {
      feed.error('수정은 한행만 가능합니다.');
      updateFlag = false;
    } else if (selectAllNode[0].ACTIVE === 'D') {
      feed.error('ACTIVE가 D인건은 수정할 수 없습니다.');
      updateFlag = false;
    } else if (selectAllNode[0].STATUS === 'R') {
      feed.error('결재가 상신인 경우는 수정할 수 없습니다.');
      updateFlag = false;
    }

    if (updateFlag) {
      const rowNode = this.gridApi.getRowNode(selectedNodes[0].id);
      rowNode.setDataValue('ROW_TYPE', 'UPDATE');
      this.gridApi.stopEditing();

      const columnDefsTamp = rowNode.columnApi.columnController.columnDefs.slice();
      columnDefsTamp[2].editable = false;
      columnDefsTamp[3].editable = false;
      this.gridApi.setColumnDefs(columnDefsTamp);

      this.gridApi.startEditingCell({
        rowIndex: selectedNodes[0].rowIndex,
        colKey: 'EQKTX',
      });
    }
  };

  handleOnCancel = () => {
    this.setState({
      visible: false,
    });
  }

  handleCopyFabChange = (e) => {
    const strArry = e.split(',');
    const code = strArry[0];
    const name = strArry[1];  

    this.props.getCopySdptCombe(code);
    this.setState({
      fabCopy: code,
      fabCopyName: name,
    });
  }

  handleCopySdptChange = (e) => {
    const strArry = e.split(',');
    const code = strArry[0];
    const name = strArry[1];  

    this.props.getCopyModelCombe(code);
    this.setState({
      sdptCopy: code,
      sdptCopyName: name,
    });
  }

  handleModelCopyChange = (e) => {
    const strArry = e.split(',');
    const code = strArry[0];
    const name = strArry[1];  

    this.setState({
      modelCopy: code,
      modelCopyName: name,
    });
  }
  // javascript:m167_fadeOutLayer('m167_copyDiv', 'Y');
  m167_fadeOutLayer = (objId, buttonType) => {
    // const selectedNodes = this.gridApi.getSelectedNodes();
    // const approvalData = selectedNodes.map(node => node.data);

    if(objId === 'm167_copyDiv') {
      const currentTab = 'FAB';
      if(currentTab == "FAB") {
        //값 체크
        if (this.state.fabCopy === undefined) {
          feed.error('[FAB] 는(은) 입력 필수값 입니다.');
          return;
        }
        if (this.state.sdptCopy === undefined) {
          feed.error('[SDPT] 는(은) 입력 필수값 입니다.');
          return;
        }
        if (this.state.modelCopy === undefined) {
          feed.error('[MODEL] 는(은) 입력 필수값 입니다.');
          return;
        }
      }

      if (buttonType === 'Y') {
        this.m167_doCopy();
      }

      this.setState({
        visible: false,
      });
    } else if (objId === 'm167_resultValueDiv') {
			if (buttonType === 'Y' && (this.state.asisInput === undefined || this.state.tobeInput === undefined)){
        feed.error('변경 내용을 입력 바랍니다.');
				return;
			}
      
      if (buttonType === 'Y'){
				this.m167_doApproval();
			}		
    }
  }

  m167_doCopy = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedRow = selectedNodes.map(node => node.data);
    const u_id = selectedRow[0].U_ID;

    const paramJson = {
      ARBPL: this.state.sdptCopy,
      KTEXT2: this.state.sdptCopyName,
      PLNNR: this.state.modelCopy,
      EQKTX: this.state.modelCopyName,
      PREV_U_ID: u_id,
      tabGubun: 'FAB',
      PARAM_MODIFY_USER: this.props.userInfo.EMP_NO,
      list: {		//RFC를 통해 PLNAL을 채번하기 위해 파라미터 추가 20140917 박인성
        IT_TASKLIST: [{
          PLNNR: this.state.modelCopy,
          KTEXT: selectedRow[0].HEADER_KTEXT,
          SABUN: this.props.userInfo.EMP_NO,
          SWERK: '1010', //임시하드코딩
          SEQ: 1,						
        }]
      }
    }

    const returnParam = {
      tabGubun: 'FAB',
      PARAM_BEBER: this.state.fab,
      PARAM_STORT: this.state.team,
      PARAM_ARBPL: this.state.sdpt,
      MULTI_PARAM_EQART: this.state.model,
      PARAM_TXT: this.state.pmType,
      PARAM_VERSION: this.state.version,
    };

      this.props.masterPmSheetCopy(paramJson, returnParam);

      this.setState({
        visible: false,
      });
  }

  // 결재 필수사항을 체크후 결재를 진행한다
  m167_approval = () => {
    if (!this.state.searchSuccess) {
      feed.error('조회 후  상신을 하실수 있습니다.');
      return;
    }

    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    if (selectedData.length < 1) {
      feed.error('선택된 항목이 없습니다.');
      return;
    }

    const currentTab = 'FAB';

    this.gridApi.forEachNode((node) => {
      if (node.data.ROW_TYPE === 'ADD' || node.data.ROW_TYPE === 'UPDATE') {
        feed.error('저장되지 않은 데이타가 존재합니다. 저장후 진행하세요.');
        return;
      }
    });

    let status = selectedData[0].STATUS;
    let validStr = '';
    if (status !== '' && status !== null) {
      if(status === 'S') {
        status = '';
      } else if(status === 'R') {
        status = '상신';
      } else if(status === 'Y') {
        status = '승인';
      } else if(status === 'F') {
        status = '';
      }
    } else {
      // rfc에서 바로 넘어온 데이타는 결재테이블에 쌓이지 않고 승인이 완료된 상태로 넘어온다. status는 결재테이블에서 가져옴
			status = selectedData[0].ACTIVE;
      if(status === 'Y') {
        status = '승인';
      } else {
        status = '';
      }
    }

    if(status !== '') {
      validStr = `선택 된 [${selectedData[0].HEADER_KTEXT}] 건은 ${status} 상태입니다.`; 
      feed.error(validStr);
      return;
    }

    // 상신시 필수 발리데이션 체크
    if(selectedData[0].PLNNR === '' || selectedData[0].PLNAL === '' ||
    selectedData[0].HEADER_KTEXT === '' || selectedData[0].VERWE === '' ||
    (selectedData[0].STRAT === '' && selectedData[0].VERWE === 'F1')) {
      feed.error(`결재시 다음값은 필수입니다. [PLNNR:${selectedData[0].PLNNR}, PLNAL:${selectedData[0].PLNAL}, KTEXT:${selectedData[0].HEADER_KTEXT}, VERWE:${selectedData[0].VERWE}${selectedData[0].VERWE !== 'F2' ? `, STRATEGY:${selectedData[0].STRAT}]` : ''}`);
      return;
    }

    const approvalList = [];
    approvalList.push(this.m167_getApprovalData(selectedData[0]));

    const paramJson = {
      "list" : {
         "approvalList":approvalList
      }
    };

    Axios.post('/api/gipms/v1/pmmodel/masterPmSheetApprovalChk', paramJson)
    .then((result) => {
      if (result.data) {
        const resultCode = result.data.resultCode;
        const resultMsg = result.data.resultMsg;
        if (resultCode !== '0') {
          feed.error(`결재를 진행할 수 없습니다 OPERATION 데이타를 확인해주세요. ${resultMsg}`);
          // this.setState({
          //   approvlaVisible: true,
          // });
        } else {
          this.setState({
            approvlaVisible: true,
          });
        }        
      } else {
        feed.error('처리중 오류가 발생하였습니다.');
      }
    });
  }
  handleOnApprovlaCancel = () => {
    this.setState({
      approvlaVisible: false,
      // asisInput: undefined,
      // tobeInput: undefined,
    });    
  }
  headerAsisInput = (e) => {
    this.setState({
      asisInput: e.target.value,
    });
  }
  headerTobeInput = (e) => {
    this.setState({
      tobeInput: e.target.value,
    });
  }

  m167_doApproval = () => {
    const selectedNodes = this.gridApi.getSelectedNodes();
    const approvalData = selectedNodes.map(node => node.data);
    const updateList = [];

    updateList.push(m167_getApprovalData(approvalData[0]));

    const paramJson = {
      DOC_TYPE: 'TL',
      STATUS: 'S',
      TAB_GUBUN: 'FAB',
      list: {
         updateList: updateList,
      },
    }

    Axios.post('/api/gipms/v1/pmmodel/masterPmSheetModelingPrcs', paramJson)
    .then((result) => {
      if (result.data) {
        const resultCode = result.data.resultCode;
        const evSapCal 	= result.data.EV_SAP_CAL;
        let tmpText = '';

        if(result.data.list !== undefined && result.data.list.planChangeList !== undefined) {
          const planChangeList 	= result.data.list.planChangeList;
          const planDeleteList 	= result.data.list.planDeleteList;

          if(planChangeList !== null && planChangeList.length > 0) {
            tmpText = "PM Sheet 주기가 변경되었습니다. 아래 장비의 Plan이 영향을 받을 수 있으니 확인 하시기 바랍니다.";
            for( var i = 0; i < planChangeList.length; i++ ) {
              tmpText += "\n" + planChangeList[i].TIDNR;
            }
            tmpText += "\n 확인 : 결재 상신         취소 : 상신 취소";
            if(!confirm(tmpText)){
              return;
            }
          }
          if(planDeleteList !== null && planDeleteList.length > 0) {
            tmpText = "PM Sheet 삭제 시 해당 Sheet를 사용하는 아래 장비들의 Plan이 함께 삭제되니 확인 하시기 바랍니다.";
            for( var i = 0; i < planDeleteList.length; i++ ) {
              tmpText += "\n" + planDeleteList[i].TIDNR;
            }
            tmpText += "\n 확인 : 결재 상신         취소 : 상신 취소";
            if(!confirm(tmpText)){
              return;
            }
          }
          
        }
      }
    });
  }
  render() {
    const {
      defaultBox,
      fab,
      team,
      sdptName,
      // fl,
      model,
      version,
      pmType,
      operationParam,
      // signStatus,
      // pathname,
      // newRowData,
      visible,
      approvlaVisible,
      asisInput,
      tobeInput,
    } = this.state;

    const {
      fabList,
      teamList,
      sdptList,
      // flList,
      modelList,
      // versionList,
      // signStatusList,
      pmSheetDataList,
      pmTypeCombo,
      stratCombo,
      copySdptCombo,
      copyModelCombo,
    } = this.props;

    const cellClickedReturn = (e) => {
      // {PARAM_PLNAL: "01", PARAM_PLNNR: "F01249", PARAM_REVISION: "AAA"}
      // const param = {
      //   PARAM_PLNAL: e.PARAM_PLNAL,
      //   PARAM_PLNNR: e.PARAM_PLNNR,
      //   PARAM_REVISION: e.PARAM_REVISION,
      // };
      // console.log(e);
      if (e.field === 'HEADER_KTEXT') {
        if (e.ACTIVE === 'D') {
          feed.error('ACTIVE가 D인건은 수정할 수 없습니다.'); 

        } else {
          this.setState({
            operationParam: e,
            tabNum: '2',
          });
        }
      } else if (e.field === 'planCheckCnt') {
        if (e.planCheckCnt !== '') {
          const plnnr = e.PARAM_PLNNR;
          const plnal = e.PARAM_PLNAL;
          // const path = pathname.split('/');
          window.open(`/sm/pmSheetModeling/pmSheetPlanChangeListPopup/${plnnr}/${plnal}`, '', `top=${screen.availHeight/2-500/2}, left=${screen.availWidth/2-1050/2}, width=1050, height=500, location=no, toolbar=no, menubar=no, scrollbars=yes, resizable=yes`); //eslint-disable-line
        }
      }
    };

    const pmModelingListGo = () => {
      this.setState({
        tabNum: '1',
      });
    };

    return (
      // <form name="frmPopup" onSubmit={event => event.preventDefault()}>
      //   <input type="hidden" name="arg1" />
      //   <input type="hidden" name="arg2" />
      <section className="gipms">
        <div>
          <Modal
            title="COPY"
            visible={visible}
            // footer={null}
            onCancel={this.handleOnCancel}
            // okButtonProps={{
            //   style: { display: 'none' },
            // }}
            footer={[
              <Button key="submit" type="primary" onClick={() => this.m167_fadeOutLayer('m167_copyDiv', 'Y')}>
                COPY
              </Button>,
            ]}
          >
            <Row>
              FAB
              <Select
                defaultValue="Select 하세요."
                // value={fab}
                onChange={this.handleCopyFabChange}
                notFoundContent="Select 하세요."
                placeholder="Select 하세요."
                defaultActiveFirstOption={false}
                style={{ width: 150 }}
              >
                { fabList.map(factoryKey => <Options key={`${factoryKey.CODE},${factoryKey.NAME}`}>{factoryKey.NAME}</Options>) }
              </Select>
            </Row>
            <Row>
              SDPT
              <Select
                  defaultValue="Select 하세요."
                  // value={sdptName}
                  onChange={this.handleCopySdptChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                  style={{ width: 150 }}
                >
                  { copySdptCombo.map(sdptKey => <Options value={`${sdptKey.CODE},${sdptKey.NAME}`}>{sdptKey.NAME}</Options>) }
                </Select>
            </Row>
            <Row>
              MODEL
              <Select
                  defaultValue="Select 하세요."
                  // value={sdptName}
                  onChange={this.handleModelCopyChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                  style={{ width: 150 }}
                >
                  { copyModelCombo.map(modelKey => <Options value={`${modelKey.CODE},${modelKey.NAME}`}>{modelKey.NAME}</Options>) }
                </Select>
            </Row>
          </Modal>
          
          <Modal
            title="변경 내용 상세"
            visible={approvlaVisible}
            // footer={null}
            onCancel={this.handleOnApprovlaCancel}
            // okButtonProps={{
            //   style: { display: 'none' },
            // }}
            footer={[
              // <Button key="submit" type="primary" onClick={() => this.m167_fadeOutLayer('m167_copyDiv', 'Y')}>
              //   COPY
              // </Button>,
              // <Button key="submit" type="primary" onClick={this.handleOk}>
              <Button key="submit" type="primary" onClick={() => this.m167_fadeOutLayer('m167_resultValueDiv', 'Y')}>

                확인
              </Button>,
              <Button key="back" onClick={this.handleOnApprovlaCancel}>
                취소
              </Button>,

            ]}
          >
            <Row> AS-IS </Row>
            <Row>
              <Input 
                // placeholder=""
                // type="text"
                // ref="asisVal"
                // ref={ref => {
                //   this.asisVal = ref;
                // }}
                // ref={ref => this.asisVal = ref}
                // defaultValue = ''
                // value={asisInput === undefined ? '' : null}
                onChange={this.headerAsisInput}
                // defaultValue={asisInput}
              />
            </Row>
            <Row> TO-BE </Row>
            <Row>
              <Input
                // value={tobeInput}
                onChange={this.headerTobeInput}
              />
            </Row>
          </Modal>
        </div>
        <header>
          <h2 className="title">HyPM Modeling</h2>
          <Breadcrumb>
            <Breadcrumb.Item>Master</Breadcrumb.Item>
            <Breadcrumb.Item>PM Sheet</Breadcrumb.Item>
            <Breadcrumb.Item>HyPM Modeling</Breadcrumb.Item>
          </Breadcrumb>
        </header>
        {/* 검색영역 시작 */}
        <section className="search-area">
          <div className="search-item-area">
            {/* 검색 옵션 search-item */}
            <div className="search-item">
              <span className="search-label required">FAB</span>
              <span className="search-select">
                {/* antd select */}
                <Select
                  defaultValue="Select 하세요."
                  value={fab}
                  onChange={this.handleFabChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                >
                  { fabList.map(factoryKey => <Options key={factoryKey.CODE}>{factoryKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label required">Team</span>
              <span className="search-select">
                {/* antd select */}
                <Select
                  defaultValue="Select 하세요."
                  value={team}
                  onChange={this.handleTeamChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                >
                  { teamList.map(detailFactoryKey => <Options value={detailFactoryKey.CODE}>{detailFactoryKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label required">SDPT</span>
              <span className="search-select">
                {/* antd select */}
                <Select
                  defaultValue="Select 하세요."
                  value={sdptName}
                  onChange={this.handleSdptChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                >
                  { sdptList.map(sdptKey => <Options value={`${sdptKey.CODE},${sdptKey.NAME}`}>{sdptKey.NAME}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Model</span>
              <span className="search-select">
                {/* antd select */}
                <ReactMultiSelectCheckboxes
                  placeholderButtonLabel="ALL"
                  defaultValue={defaultBox}
                  value={model}
                  onChange={this.handleModelChange}
                  hideSearch={true}
                  options={modelList.map(modelKey => ({ label: modelKey.NAME, value: modelKey.CODE }))}
                />
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">PM종류</span>
              <span className="search-select">
                {/* antd select */}
                <Select
                  defaultValue="Select 하세요."
                  value={pmType}
                  onChange={this.handlePmChange}
                  notFoundContent="Select 하세요."
                  placeholder="Select 하세요."
                  defaultActiveFirstOption={false}
                >
                  { pmTypeCombo.map(pmTypeKey => <Options value={pmTypeKey.CODE}>{pmTypeKey.TEXT}</Options>) }
                </Select>
              </span>
            </div>
            <div className="search-item">
              <span className="search-label">Version</span>
              <span className="search-select">
                {/* antd select */}
                <Select
                  defaultValue="All"
                  value={version}
                  onChange={this.handleVersionChange}
                  notFoundContent="All"
                  placeholder="All"
                  defaultActiveFirstOption={false}
                >
                  <Options value="">All</Options>
                  <Options value="Y">ACTIVE</Options>
                  <Options value="N">N</Options>
                </Select>
              </span>
            </div>
          </div>
          <div className="btn-area">
            <Button type="primary" className="btn-search" onClick={this.handleSearch}>Search</Button>
          </div>
        </section>
        {/* Tabs */}
        <section className="antd-tabs">
          <Tabs
            defaultActiveKey="1"
            onChange={this.handleTebOnChange}
            activeKey={this.state.tabNum}
          >
            <TabPane tab="HyPM 목록" key="1">
              <div className="btn-group">
                <div className="left">
                  <Button
                    title="HyPM Download"
                    className="btn-excel"
                    onClick={this.handleDownloadButton}
                  >
                  HyPM Download
                  </Button>
                  {/* <Button
                    title="PM Sheet Upload 양식(자사용)"
                    className="btn-excel"
                    onClick={this.handleSearch}
                  >
                  PM Sheet Upload 양식(자사용)
                  </Button>
                  <Button
                    title="PM Sheet Upload 양식(도급사용)"
                    className="btn-excel"
                    onClick={this.handleSearch}
                  >
                  PM Sheet Upload 양식(도급사용)
                  </Button> */}
                  <Button
                    title="HyPM Upload"
                    className="btn-excel"
                    onClick={this.handleSearch}
                  >
                  HyPM Upload
                  </Button>
                </div>
                <div className="right">
                  <Button
                    title="라인추가"
                    type="primary"
                    className="btn-normal add-line"
                    onClick={this.onAddRow}
                  >
                  라인추가
                  </Button>
                  <Button
                    title="복사"
                    type="primary"
                    className="btn-normal copy"
                    onClick={this.m167_fncCopy}
                  >
                  복사
                  </Button>
                  <Button
                    title="삭제"
                    type="primary"
                    className="btn-normal delete"
                    onClick={this.handleDelete}
                  >
                  삭제
                  </Button>
                  <Button
                    title="수정"
                    type="primary"
                    className="btn-normal edit"
                    onClick={this.m167_editRow}
                  >
                  수정
                  </Button>
                  <Button
                    title="저장"
                    type="primary"
                    className="btn-apply save"
                    onClick={this.handleSave}
                  >
                  저장
                  </Button>
                  <Button
                    title="상신"
                    type="primary"
                    className="btn-apply report"
                    onClick={this.m167_approval}
                  >
                  상신
                  </Button>
                  <Button
                    title="엑셀"
                    type="primary"
                    className="btn-apply excel"
                    onClick={this.handleDownloadButton}
                  >
                  엑셀
                  </Button>
                </div>
              </div>
              {/* ag Grid */}
              <div className="grid-area">
                <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
                  <Grid
                    pmSheetDataList={pmSheetDataList}
                    cellClickedReturn={cellClickedReturn}
                    onGridReady={this.onGridReady}
                    modelList={modelList}
                    pmTypeCombo={pmTypeCombo}
                    stratCombo={stratCombo}
                  />
                </div>
              </div>
            </TabPane>
            <TabPane tab="Operation 상세" key="2">
              <PmSheetOperation
                operationParam={operationParam}
                pmModelingListGo={pmModelingListGo}
              />
            </TabPane>
          </Tabs>
        </section>
      </section>
    );
  }
}

PmSheetModeling.propTypes = {
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handlePmSheetSearch: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  teamList: PropTypes.array,
  sdptList: PropTypes.array,
  modelList: PropTypes.array,
  pmSheetDataList: PropTypes.array,
  pmTypeCombo: PropTypes.array,
  // handlePMSheetDownload: PropTypes.func.isRequired,
  // location: PropTypes.object.isRequired,
  // onGridReady: PropTypes.array,
  handleSave: PropTypes.func.isRequired,
  userInfo: PropTypes.object.isRequired,
  stratCombo: PropTypes.array,
  searchSuccess: PropTypes.bool.isRequired,
  // masterPmSheetDelNoticeToSAP: PropTypes.func.isRequired,
  // EV_SUBRC: PropTypes.string.isRequired,
  getCopySdptCombe: PropTypes.func.isRequired,
  copySdptCombo: PropTypes.array,
  getCopyModelCombe: PropTypes.func.isRequired,
  copyModelCombo: PropTypes.array,
  masterPmSheetCopy: PropTypes.func.isRequired,
};

PmSheetModeling.defaultProps = {
  fabList: [],
  teamList: [],
  sdptList: [],
  modelList: [],
  pmSheetDataList: [],
  pmTypeCombo: [],
  stratCombo: [],
};

const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  modelList: selectors.makeModelList(),
  signStatusList: selectors.makeSignStatusList(),
  pmSheetDataList: selectors.makePmSheetDataList(),
  pmTypeCombo: selectors.makePmTypeCombo(),
  userInfo: selectors.makeSelectProfile(),
  stratCombo: selectors.makeStratCombo(),
  searchSuccess: selectors.makeSearchSuccess(),
  copySdptCombo: selectors.makeCopySdptCombo(),
  copyModelCombo: selectors.makeCopyModelCombo(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handlePmSheetSearch: param => dispatch(actions.pmSheetSearch(param)),
    handleSave: (param, returnParam) => dispatch(actions.handleSave(param, returnParam)),
    // handlePMSheetDownload: param => dispatch(actions.pmSheetDownload(param)), // RFC 테스트 용 pm sheet 다운로드
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
    // masterPmSheetDelNoticeToSAP: params => dispatch(actions.masterPmSheetDelNoticeToSAP(params)),
    getCopySdptCombe: value => dispatch(actions.getCopySdptCombe(value)),
    getCopyModelCombe: value => dispatch(actions.getCopyModelCombe(value)),
    masterPmSheetCopy: (param, returnParam) => dispatch(actions.masterPmSheetCopy(param, returnParam)),
  };
}

const withReducer = injectReducer({ key: 'PmSheetModeling', reducer });
const withSaga = injectSaga({ key: 'PmSheetModeling', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetModeling);
