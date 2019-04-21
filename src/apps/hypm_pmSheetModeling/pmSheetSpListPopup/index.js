/* eslint-disable react/no-unused-state */
/* eslint-disable no-unused-vars */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Modal, Input, Row, Button } from 'antd';
import injectSaga from 'utils/injectSaga';
import * as feed from 'components/Feedback/functions';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import MasterPmBomTree from 'components/MasterPmBomTree';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import * as actionsLoading from 'containers/common/Loading/actions';


let deleteRowData2 = [];
let gridaddList = [];
let editDataList = [];
const wrap = dragDropContext(HTML5Backend);
class PmSheetModeling extends PureComponent {
  constructor(props) {
    super(props);
    const { match } = props;
    const { params } = match;
    const {
      plnal,
      plnnr,
      vornr,
      revision,
      status,
    } = params;
    this.state = {
      plnal,
      plnnr,
      vornr,
      revision,
      status,
      visible: false,
      modalControl2: false,
      Search: '',
      EQUNR: '', // 히든 변수
      tidnr: '', // 히든 변수
      beber: '', // 히든 변수
      // selectType: '', 좀잇다 구현할것
      saveRowData: [], 
      deleteRowData: [], 
      addList: [],
      updateList: [],
      deleteList: [],
      allList: [],
      IT_DATA2: [],
      allRowData: [],
      tempList: [],
    };
    editDataList =this.props.MaterialDataList;

    this.props.handleLoadingSaveYn({ paramPlnnr: this.state.plnnr, paramPlnal: this.state.plnal, paramRevision: this.state.revision });
    const params1 = {
      PLNNR: this.state.plnnr,
      PLNAL: this.state.plnal,
      VORNR: this.state.vornr,
      REVISION: this.state.revision,
    };
    this.props.handleLoadingGridParam(params1);
  }
  onGridReady = (params) => {
    this.gridApi = params.api;
  };
  // eslint-disable-next-line react/sort-comp
  handleprocessControl = (paramType) => {
    if (paramType === 'save') {
      if (gridaddList.length === 0 && this.state.deleteRowData.length === 0 && editDataList.length === 0) {
        feed.error('변경된 행이 없습니다.');
        return ;
      }
      feed.showConfirm('저장하시겠습니까?', '', this.saveRow);
    } else if (paramType === 'edit') {
      this.editRow();
    } else if (paramType === 'add') {
      this.addRow();
    } else if (paramType === 'delete') {
      this.deleteRow();
    }
  }
  
  // 저장
  saveRow = () => {
    let gridSavable = 'Y';
    gridSavable = this.props.save;
    if (gridSavable === 'N') {
      feed.error('작성중인 PM Sheet는 최종 Revision이 아닙니다. 확인바랍니다.최종 Revision에 해당하는 PM Sheet를 수정바랍니다.');
      return;
    }
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    for (let i = 0; i < this.props.MaterialDataList.length; i += 1) {
      const saveData = this.getSaveData(this.props.MaterialDataList[i]);
      const validArr = [];
      if (saveData.IDNRK === '') { validArr.push('MATERIAL'); }
      if (saveData.MAKTX === '') { validArr.push('DESCRIPTION'); }
      if (saveData.IMENG === '') { validArr.push('수량'); }

      if (validArr.length !== 0) {
        alert(validArr.join(', '), '는 필수 입력사항입니다.');
        return;
      }
    }
    for (let i = 0; i < this.state.deleteRowData.length; i += 1) {
      deleteRowData2.push(this.getSaveData(this.state.deleteRowData[i]));
    }

    // RFC 호출시 삭제를 제외한 전체 데이터를 보내기위한 for Loop
    for (let i = 0; i < this.state.allRowData.length; i += 1) {
      this.state.allRowData2.push(this.getSaveData(this.state.allRowData[i]));
      this.state.IT_DATA2.push(this.getSaveRfcData(this.state.allRowData[i]));
    }

    const spCnt = this.props.MaterialDataList.length;
    const params = {
      PLNNR: this.state.plnnr,
      PLNAL: this.state.plnal,
      VORNR: this.state.vornr,
      SP_COUNT: spCnt,
      ACTIVE: this.props.activeKeyData,
      IV_MODE: 'N',
      U_ID: this.state.paramFuid, // 상덕씨가 날릴꺼 유알엘 말고 데이터만 받아야함
      PARAM_MODIFY_USER: this.props.userInfo.EMP_NO, // 세션값
      list: {
        IT_DATA: this.state.IT_DATA2, // 구현
        addList: gridaddList, // 모달쪽에서 주는 데이터
        updateList: editDataList, // 업데이트 되는 데이터
        deleteList: deleteRowData2, // 삭제데이트
        allList: this.state.allRowData2, // 삭제를 제외한 모든 데이터
      },
    };

    const returnParam = {
      PLNNR: this.state.plnnr,
      PLNAL: this.state.plnal,
      VORNR: this.state.vornr,
      REVISION: this.state.revision,
    };
    this.props.savePmsheetSpData(params,returnParam);
    deleteRowData2 = [];
    gridaddList = [];
    this.state.IT_DATA2 = [];
    this.state.allRowData2=[];
    editDataList= [];
  }
  // 모달
  addRow = () =>{
    if (this.state.status==='R'){
      feed.error('결재상태가 상신인 경우 라인추가을 할수 없습니다.');
    return;
    }
this.showModal();
  }
  showModal = () => {
    let gridSavable = 'Y';
    gridSavable = this.props.save;
    if (gridSavable === 'N') {
      feed.error('작성중인 PM Sheet는 최종 Revision이 아닙니다. 확인바랍니다.최종 Revision에 해당하는 PM Sheet를 수정바랍니다.');
      return;
    }
    this.setState({
      visible: true,
      equnr: '', // 히든변수 빈깡통 셋팅
      tidnr: '', // 히든변수 빈깡통 셋팅
      beber: '', // 히든변수 빈깡통 셋팅
    });
    this.props.modalHandle({ PARAM_EQART: this.state.plnnr, searchTidnr: this.state.tidnr, orderBy: 'TIDNR', PARAM_ARBPL:'12052' });
  }
  // 수정
  editRow = () => {
    editDataList = this.props.MaterialDataList
    let gridSavable = 'Y';
    gridSavable = this.props.save;
    if (gridSavable === 'N') {
      feed.error('작성중인 PM Sheet는 최종 Revision이 아닙니다. 확인바랍니다.최종 Revision에 해당하는 PM Sheet를 수정바랍니다.');
      return;
    }
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.rowIndex);
    if (selectedData.length === 0) {
      feed.error('선택된 행이 없습니다.');
      return;
    } else if (selectedData.length > 1) {
      feed.error('수정은 한행만 가능합니다.');
      return;
    } else if (this.state.status === 'R') {
      feed.error('결재상태가 상신인 경우 수정을 할수 없습니다.');
      return;
    }
    this.gridApi.setFocusedCell(selectedData, 'IMENG');
    this.gridApi.startEditingCell({
      rowIndex: selectedData,
      colKey: 'IMENG',
    });
  }
  
  // 라인삭제
  deleteRow = () => {
    let gridSavable = 'Y';
    gridSavable = this.props.save;
    if (gridSavable === 'N') {
      feed.error('작성중인 PM Sheet는 최종 Revision이 아닙니다. 확인바랍니다.최종 Revision에 해당하는 PM Sheet를 수정바랍니다.');
      return;
    }
    const selectedNodes = this.gridApi.getSelectedNodes();
    const selectedData = selectedNodes.map(node => node.data);
    const delectAllData = [];
    if (selectedData.length === 0) {
      feed.error('선택한 행이 없습니다.');
    } else {
      if (this.state.status==='R'){
        feed.error('결재상태가 상신인 경우 삭제를 할수 없습니다.');
      return;
      }
      this.gridApi.updateRowData({ remove: selectedData });
      this.gridApi.forEachNode((node) => {
        delectAllData.push(node.data);
      });
      this.setState({
        deleteRowData: selectedData, // 저장할때 deleteRowData 가져 갈려고 셋팅했음.
        allRowData: delectAllData, // 삭제를 제외한 모든 데이터
      });
    }
  }

   handleCancel = (e) => {
     this.setState({
       visible: false,
     });
   }
  handleChange = (e) => {
    this.setState({
      [e.target.name]: e.target.value,
    });
  }

  handleClick = () => {
    this.setState({
      Search: '',
    });
  }
  getDetail = (equnr1, tidnr, beber) => {
      this.getEquiDetail(equnr1, tidnr, beber);
      this.handleCancel();
      if (this.state.modalControl2 === false) {
        this.modalOpen();
      }
    } 


  modalOpen = () => {
    this.setState({
      modalControl2: true
    });
  }

     getEquiDetail = (equnr1, tidnr, beber) => {
       this.createRowStep2(equnr1, tidnr, beber);
     }

  createRowStep2 = (equnr1, tidnr, beber) => {
    this.setState({
      EQUNR:equnr1 // 히든값 셋팅 그리드 행추가할때 필요
    });
    const params = {
      EQUNR: equnr1,
      // ,sessionWerks : "<%=sessionWerks%>"
      selectType: 'M', // A : assy 선택가능, M : material 선택가능
      TIDNR: tidnr,
      BEBER: beber,
    };
    this.searchBomList(params);
  }

  searchBomList = (params) => {
    
    this.setState({
      selectType: params.selectType,
    });
    const paramJson = {
      equnr: params.EQUNR,
      swerk: '1010', // 임시 값
      tidnr: params.TIDNR,
      beber: params.BEBER,
    };
    this.props.searchBomList2(paramJson);
  }
  handleKeyDown = (e) => {
    if (e.keyCode === 13) {
      this.props.modalHandle({ PARAM_EQART: this.state.plnnr, searchTidnr: this.state.tidnr, orderBy: 'TIDNR', PARAM_ARBPL:'12052' });
    }
  }
  /* 엑셀  */
  exportExcelReturn = () => {
    let fileDate =Date.now();
    const params = {
      fileName: `masterTaskSpList${fileDate}`,
      sheetName: 'masterTaskSpList',
      columnKeys: ['VORNR', 'IDNRK', 'MAKTX', 'IMENG'],
      rowHeight: '17',
    };
    this.gridApi.exportDataAsExcel(params);
  };

  handleCloseSearch = () => {
    window.close();
  }
  getSaveData = (obj) => {
    const saveObj = {};
    saveObj.PLNNR = obj.PLNNR;
    saveObj.PLNAL = obj.PLNAL;
    saveObj.VORNR = obj.VORNR;
    saveObj.IDNRK = obj.IDNRK;
    saveObj.MAKTX = obj.MAKTX;
    saveObj.IMENG = obj.IMENG;
    saveObj.IMEIN = obj.IMEIN;
    return saveObj;
  }
  getSaveRfcData = (obj) => {
    const saveObj = {};
    saveObj.PLNNR = obj.PLNNR;
    saveObj.PLNAL = obj.PLNAL;
    saveObj.VORNR = obj.VORNR;
    saveObj.IDNRK = obj.IDNRK;
    saveObj.MENGE = obj.IMENG;
    saveObj.MEINS = obj.IMEIN;
    return saveObj;
  }

  handleOnClick = (node) => {
    if (node.MTART === 'ERSA') { // IBAU-폴더, ERSA-품목
      this.setState({
        tempList: _.unionBy(this.state.tempList, [{ ...node }], 'key'),
      });
    }
    const testArr = _.unionBy(this.state.tempList, [{ ...node }], 'key'); //어레이는 0번인데 랭스는 1번부터시작
    let deleteData =[];
    let addList  = {
        PLNNR: this.state.plnnr,
        PLNAL: this.state.plnal,
        VORNR:this.state.vornr,
        IDNRK:testArr[testArr.length-1].key,
        MAKTX:testArr[testArr.length-1].ZZMAKTX,
        IMENG:1,
        IMEIN: '',
        EQUNR: this.state.EQUNR,
      }
      if (testArr[testArr.length-1].ZZMAKTX === '') {
        return;
    }else if (!testArr[testArr.length-1].children ) {
      
      this.gridApi.forEachNode((node) => {
        deleteData.push(node.data);
      });
      if (deleteData.length !== 0) {
        if ( deleteData[deleteData.length-1].IDNRK === testArr[testArr.length-1].key) {
          feed.error('이미 등록한 자재입니다.');
          return;
        }
      }
      let discnt = this.gridApi.getDisplayedRowCount();
        this.gridApi.updateRowData({ add: [addList], addIndex: discnt });
        gridaddList.push(addList);
      }
    }
  
  handleOnCancel = () => {
    this.setState({
      visible: false,
    });
  }
  handleOnCancel2 = () => {
    this.setState({
      modalControl2: false
    });
  }

  searchModal = () => {
    this.props.modalHandle({ PARAM_EQART: this.state.plnnr, searchTidnr: this.state.tidnr, orderBy: 'TIDNR', PARAM_ARBPL:'12052'});
  }

  render() {
    // const {
    //   tempList,
    //   pmBomTreeList,
    // } = this.state;
    const {
      MaterialDataList,
      ModalDataList,
      pmBomTreeList,
      titleStr,
    } = this.props;
    const loop = data =>

      data.map(item => (<ui><li onClick={() => this.getDetail(item.EQUNR, item.TIDNR, item.BEBER)} >{item.TIDNR}<br /></li></ui>));
    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">자재예약항목 조회</h2>
          <Button
            className="btn-popup-close"
            onClick={this.handleCloseSearch}
          >닫기
          </Button>
        </header>
        <div className="btn-group">
          <div className="right">
            <Button
              type="primary"
              className="btn-apply save"
              onClick={() => { this.handleprocessControl('save'); }}
            >
              저장
            </Button>
            <Button
              type="primary"
              className="btn-normal edit"
              onClick={() => { this.handleprocessControl('edit'); }}
            >
              수정
            </Button>
            <Button
              type="primary"
              className="btn-normal add-line"
              onClick={() => { this.handleprocessControl('add'); }}
            >
                라인추가
            </Button>
            <Modal
              title="Search"
              visible={this.state.visible}
              footer={null}
              onCancel={this.handleOnCancel}
              okButtonProps={{
                style: { display: 'none' },
              }}
            >
              <Input type="text" name="tidnr" placeholder="검색하세요." value={this.state.tidnr} style={{ width: 350 }} onChange={this.handleChange} onKeyDown={this.handleKeyDown} />
              <Button
                title="검색"
                className="searchBtn"
                onClick={() => { this.searchModal() }}
              >
                검색
              </Button>
              <Row>
                {loop(ModalDataList)}
              </Row>
            </Modal>
            <Button
              type="primary"
              className="btn-normal add-line"
              onClick={() => { this.handleprocessControl('delete'); }}
            >
              라인삭제
            </Button>
            <Button
              type="primary"
              className="btn-apply excel"
              onClick={this.exportExcelReturn}
            >
              엑셀
            </Button>
            <Modal
              title="Equipment BOM 조회"
              visible={this.state.modalControl2}
              footer={null}
              onCancel={this.handleOnCancel2}
              closeTimeoutMS={5}
              okButtonProps={{
                style: { display: 'none' },
              }}
            >
            {titleStr}          
            { pmBomTreeList.length !== 0 ? (
             <MasterPmBomTree
             treeData={pmBomTreeList}
             handleOnClick={this.handleOnClick}
           />
            ) : (
              <div>
                <p 
                >
                 {/* 조회 내용이 없습니다. */}
                </p>
              </div>
            )
            }
            </Modal>
          </div>
          {/* <div>
            {tempList.map(m => (
              <p key={m.key}>
                {this.state.vornr} / {m.key} / {m.OJTXP} /{1} {m.MTART_T}
              </p>
            ))}
          </div> */}
        </div>
        <div className="grid-area">
          <div className="ag-theme-balham" style={{ height: '400px', width: '100%' }}>
            <Grid
              MaterialDataList={MaterialDataList}
              onGridReady={this.onGridReady}
            />
          </div>
        </div>
      </section>
    );
  }
}

PmSheetModeling.propTypes = {
  handleLoadingGridParam: PropTypes.func.isRequired,
  handleLoadingSaveYn: PropTypes.func.isRequired,
  MaterialDataList: PropTypes.array,
  save: PropTypes.string,
  match: PropTypes.object.isRequired,
  modalHandle: PropTypes.func.isRequired,
  ModalDataList: PropTypes.array,
  searchBomList2: PropTypes.func.isRequired,
  activeKeyData: PropTypes.string,
  userInfo: PropTypes.object,
  savePmsheetSpData: PropTypes.func.isRequired,
  pmBomTreeList: PropTypes.array,
  titleStr: PropTypes.string,
};

PmSheetModeling.defaultProps = {
  MaterialDataList: [],
  save: '',
  ModalDataList: [],
  activeKeyData: '',
  userInfo: [],
  pmBomTreeList: [],
  titleStr: '',
};

const mapStateToProps = createStructuredSelector({
  MaterialDataList: selectors.makeMaterialDataList(),
  save: selectors.makeSavelKeyData(),
  ModalDataList: selectors.makeModalListData(),
  activeKeyData: selectors.makeactiveKeyData(),
  userInfo: selectors.makeSelectProfile(),
  pmBomTreeList: selectors.makePmBomTreeList(),
  titleStr: selectors.makePmBomTitle(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingGridParam: value => dispatch(actions.loadingGridParam(value)),
    handleLoadingSaveYn: value => dispatch(actions.LoadingSaveYn(value)),
    modalHandle: value => dispatch(actions.LoadingModal(value)),
    searchBomList2: value => dispatch(actions.LoadingBomList(value)),
    savePmsheetSpData: (value,returnParam) => dispatch(actions.savePmsheetSpList(value,returnParam)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'pmSheetSpListPopup', reducer });
const withSaga = injectSaga({ key: 'pmSheetSpListPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(wrap(PmSheetModeling));
