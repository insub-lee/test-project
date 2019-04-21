import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import MasseinhsEditor from './masseinhsRenderer/MasseinhsEditor';
import MasseinhsRenderer from './masseinhsRenderer/MasseinhsRenderer';
import QkurztextEditor from './qkurztextRenderer/QkurztextEditor';
import QkurztextRenderer from './qkurztextRenderer/QkurztextRenderer';
import DecimalPointRenderer from './decimalPointRenderer/DecimalPointRenderer';
import DecimalPointEditor from './decimalPointRenderer/DecimalPointEditor';

const lookupValue = (mappings, key) => {
  return mappings[key];
}

const lookupKey = (mappings, name) => {
  for (var key in mappings) {
      if (mappings.hasOwnProperty(key)) {
          if (name === mappings[key]) {
              return key;
          }
      }
  }
}

const choiceItems = ['', 'A', 'R'];

const getChoiceItems = {'': '', 'A': 'Accept', 'R': 'Reject' };

class Grid extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectRowData: null,
      pointCount: this.props.pointCount,
      columnDefs: [
        {
          headerName: '', field: '', pinned: 'left', cellStyle: { textAlign: 'center'  }, width: 40,
          headerCheckboxSelection: true,
          checkboxSelection: true,
          editable: false
        },
        {
          headerName: 'NO', field: 'MERKNR', pinned: 'left', cellStyle: { textAlign: 'left' }, width: 60, editable: true, cellClass: 'MERKNR',
        },
        {
          headerName: '상세Operation', field: 'ZLTXA3', pinned: 'left', width: 300, editable: true, cellClass: 'ZLTXA3',
        },
        {
          headerName: '검사항목', field: 'KURZTEXT', pinned: 'left', width: 300, editable: true, cellClass: 'KURZTEXT',
        },
        {
          headerName: 'Long Text',
          field: 'MIC_COMMENT',
          width: 140,
          resizable: false,
          editable: true,
        },
        {
          headerName: 'Spec. 유형',
          field: 'QKURZTEXT',
          width: 140,
          resizable: false,
          allowEditColumn: this.props.allowEditColumn,
          cellRendererFramework: QkurztextRenderer,
          cellEditorFramework: QkurztextEditor,
          editable: true,
          cellEditorParams: {
            values: null
          },
        },
        {
          headerName: '정량적 검사',
          columnGroupShow: 'closed',
          children: [
            {
              headerName: 'APC 조건',
              field: 'DUMMY10',
              width: 100,
              editable: true,
              hide: (props.opGubun === 'B') ? false : true,
              // cellRendererFramework: DecimalPointRenderer,
              // cellEditorFramework: DecimalPointEditor,
            },
            {
              headerName: '소수점',
              field: 'STELLEN',
              width: 100,
              editable: false,
              cellRendererFramework: DecimalPointRenderer,
              cellEditorFramework: DecimalPointEditor,
            },
            { 
              headerName: '단위',
              field: 'MASSEINHSW',
              width: 150,
              resizable: false,
              cellRendererFramework: MasseinhsRenderer,
              cellEditorFramework: MasseinhsEditor,
              editable: false,
              cellEditorParams: {
                values: null,
              },
            },
            {
              headerName: '하한값',
              field: 'TOLERANZUN',
              width: 100,
              editable: false,
              cellStyle: { textAlign: 'center' },
              cellEditor: 'numericCellEditor',
            },
            {
              headerName: '목표값',
              field: 'SOLLWERT',
              editable: false,
              width: 100,
              cellEditor: 'numericCellEditor',
            },
            {
              headerName: '상한값',
              field: 'TOLERANZOB',
              width: 100,
              editable: false,
              cellStyle: { textAlign: 'center' },
              cellEditor: 'numericCellEditor',
            },
          ],
        },
        {
          headerName: '정상적 검사',
          children: [            
            {
              headerName: '확인내용',
              field: 'KAT_KTX01',
              width: 100,
              editable: false,
              cellStyle: { textAlign: 'center' },
              // cellClass: 'KAT_KTX01',
            },
            // { hide: true, field: 'ROWSTATE'},
            // { hide: true, field: 'ROW_STATE'}
          ],
        },
      ],
      defaultColDef: {
        editable: true,
        sortable: true,
        resizable: true,
        lockPosition: true,
        // suppressKeyboardEvent: function(event){
        //   const params = {
        //     editing: false,
        //   };
        //   console.log('event: ', event);
        //   return params;
        // }
      },
      components: { numericCellEditor: this.getNumericCellEditor() },
      editType: 'fullRow',
      // components: {
      //   countryCellRenderer: this.CountryCellRenderer,
      // },
      excelStyles: [
      ]

    };

    const excelStylesPush = (Params) => {
      console.log(Params);
      let excelStylesSet  = {
        id: Params,
        alignment: {
          horizontal: 'left',
        },
        borders: {
          borderBottom: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderLeft: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderRight: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          },
          borderTop: {
            color: '#000000',
            lineStyle: 'Continuous',
            weight: 1
          }
        }
      }

      if(Params === 'MERKNR' || Params === 'STELLEN' || Params === 'TOLERANZUN'){
        excelStylesSet.dataType = 'string';
      }else if(Params === 'header'){
        excelStylesSet.interior = {};
        excelStylesSet.interior.color = "#CCCCCC";
        excelStylesSet.interior.pattern = "Solid";
        excelStylesSet.alignment = {};
        excelStylesSet.alignment.horizontal = "Center";
        excelStylesSet.alignment.shrinkToFit = "true";
      }
      
      this.state.excelStyles.push(excelStylesSet);
    }

    for (let i = 1; i <= 30; i += 1) {
			let strSTXTKey = "STXT"+i;
			let strSTXTTitle = "선택Item"+i;
			
			let strVALKey = "VAL"+i;
      let strVALTitle = "확인결과"+i;
      this.state.columnDefs.slice()[7].children.push(
        {
          headerName: strSTXTTitle, 
          field: strSTXTKey, 
          width: 100, 
          editable: false, 
          cellClass: strSTXTKey,
        },
        {
          headerName: strVALTitle, 
          field: strVALKey, 
          width: 100, 
          editable: false, 
          cellClass: strVALKey,
          cellEditor: "select",
          cellStyle: { textAlign: 'center' },
          cellEditorParams: {
            values: choiceItems,
          },
          valueFormatter:  function(params) {
            return lookupValue(getChoiceItems, params.value);
          },
          valueParser: function(params) {
            return lookupKey(getChoiceItems, params.newValue);
          }
        }
        // {
        //   headerName: strVALTitle, field: strVALKey, width: 100, editable: true, cellEditor: 'agSelectCellEditor',
        //   cellEditorParams: {
        //     values: ['Accept', 'Reject']
        //   },
        // }
      )
      excelStylesPush(strSTXTKey);
      excelStylesPush(strVALKey);
    }
    const excelList = ['MERKNR', 'KURZTEXT', 'ZLTXA3', 'QKURZTEXT', 'STELLEN', 'MASSEINHSW', 'TOLERANZUN', 'SOLLWERT', 'TOLERANZOB', 'KAT_KTX01', 'header'];

    for (let i = 0; i <= excelList.length - 1; i += 1) {
      excelStylesPush(excelList[i]);
    }
  }

  componentWillReceiveProps(nextProps) {
    const columnDefsTamp = this.state.columnDefs.slice();
    columnDefsTamp[5].cellEditorParams.values = nextProps.pmTypeCombo;

    let masseinValue = [];
    if(nextProps.masseinhswGridCombo.length > 0) {
      nextProps.masseinhswGridCombo.map((test, index) => {
        masseinValue.push(test.CODE);
      });
    }

    columnDefsTamp[6].children[2].cellEditorParams.values = masseinValue;

    this.setState({
      columnDefs: columnDefsTamp,
    });
  }

  onGridReady = (params) => {
    const { onGridReady } = this.props;
    this.gridApi = params.api;
    this.gridColumnApi = params.columnApi;
    onGridReady(params);
  };

  CountryCellRenderer = (params) => { //eslint-disable-line
    return params.value !== -1 ? params.value.NAME : 'Select 하세요.';
  };

  /**
   * 소수점 자리 체크용 input tag - start
   */
  getNumericCellEditor = () => {
    const isCharNumeric = (tagetValue, field) => {
      let charResult = true;
      const digit = (this.state.selectRowData) ? this.state.selectRowData.STELLEN : null;
      if(tagetValue) {
        const _pattern2 = eval('/^-?(\\\d*([.]\\\d{0,'+digit+'})?)?$/');
        if(!_pattern2.test(tagetValue)) {
          charResult = false;
        }else{
          const selectNode = this.gridApi.getSelectedNodes();
          const rowNode = this.gridApi.getRowNode(selectNode[0].rowIndex);
          rowNode.setDataValue(field, tagetValue);
        }
      }

      return charResult;
    }
    
    const isKeyPressedNumeric = (event, field) => {
      // const charCode = getCharCodeFromEvent(event);
      // const charStr = String.fromCharCode(charCode);
      const tagetValue = event.target.value;
      //return isCharNumeric(charCode, charStr, tagetValue, field);
      return isCharNumeric(tagetValue, field);
    }

    const NumericCellEditor = () => {}
    NumericCellEditor.prototype.init = function(params) {
      let oldValue = params.value;
      this.focusAfterAttached = params.cellStartedEdit;
      this.eInput = document.createElement("input");
      this.eInput.style.width = "100%";
      this.eInput.style.height = "100%";
      this.eInput.value = isCharNumeric(params.value) ? params.value : params.charPress;
      const that = this;
      this.eInput.addEventListener("keyup", function(event) {
        if (!isKeyPressedNumeric(event, params.colDef.field)) {
          event.target.value = oldValue;
          that.eInput.focus();
        }else {
          oldValue = event.target.value;
        }
      });
    };
    NumericCellEditor.prototype.getGui = function() {
      return this.eInput;
    };
    NumericCellEditor.prototype.afterGuiAttached = function() {
      if (this.focusAfterAttached) {
        this.eInput.focus();
        this.eInput.select();
      }
    };
    NumericCellEditor.prototype.isCancelBeforeStart = function() {
      return this.cancelBeforeStart;
    };
    NumericCellEditor.prototype.isCancelAfterEnd = function() {};
    NumericCellEditor.prototype.getValue = function() {
      return this.eInput.value;
    };
    NumericCellEditor.prototype.focusIn = function() {
      var eInput = this.getGui();
      eInput.focus();
      eInput.select();
      console.log("NumericCellEditor.focusIn()");
    };
    NumericCellEditor.prototype.focusOut = function() {
      console.log("NumericCellEditor.focusOut()");
    };
    return NumericCellEditor;
  }
  // 소수점 자리 체크 - end

  onRowSelected(event) {
    this.setState({
      selectRowData: event.data
    })
    console.log('onRowSelected : ', event);
  }

  render() {
    const {
      CheckListDataList,
      pmTypeCombo,
      masseinhswGridCombo,
    } = this.props;

    return (
      <div
        className="ag-theme-balham"
        style={{
        height: '370px',
        width: '100%',
      }}
      >
        <AgGridReact
          rowSelection="multiple"
          enableSorting={true}
          columnDefs={this.state.columnDefs}
          rowData={CheckListDataList}
          defaultColDef={this.state.defaultColDef}
          rowValueChanged={this.rowValueChanged}
          suppressRowClickSelection={true}
          getRowStyle={this.state.getRowStyle}
          onGridReady={this.onGridReady}
          components={this.state.components}
          editType={this.state.editType}
          onCellClicked={this.handleCellClicked}
          suppressCellSelection={false}
          onRowSelected={this.onRowSelected.bind(this)}
          excelStyles={this.state.excelStyles}
          suppressClickEdit="true"
        />
      </div>
    );
  }
}

Grid.defaultProps = {
  CheckListDataList: [],
  pmTypeCombo: [],
  masseinhswGridCombo: [],
};

Grid.propTypes = {
  CheckListDataList: PropTypes.array,
  onGridReady: PropTypes.func.isRequired,
  pmTypeCombo: PropTypes.array,
  masseinhswGridCombo: PropTypes.array,
};

export default Grid;
