import React, { Component } from 'react';
import { Select } from 'antd';

class QkurztextEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      qkurztextGridCombo: props.values,
      QKURZTEXT: props.value,
      selectCode: (props.value) ? props.value.CODE: null,
      columnDefs: props.columnApi.columnController.columnDefs,
      gridApi: props.api,
      allowEditColumn: this.props.colDef.allowEditColumn,
    }
  }
 
  settingColumnDefs = (rowIndex) => {
     /**
     * spec. 유형에 따른 editable 컬럼 boolean값 update
     */
    const {
      api,
    } = this.props;
    const rowNode = api.getRowNode(rowIndex);
    const columnDefsTemp = rowNode.columnApi.columnController.columnDefs.slice();

    if(this.state.allowEditColumn.hasOwnProperty(this.state.selectCode)) {
      columnDefsTemp[7].children.map((kData, kIndex) => {
        columnDefsTemp[7].children[kIndex].editable = false;
        if(this.state.selectCode === 'PI04') {
          columnDefsTemp[7].children[kIndex].editable = true;
        }
      });

      columnDefsTemp[6].children.map((cols, i) => {
        if(columnDefsTemp[6].children[i].field !== 'DUMMY10') {
          columnDefsTemp[6].children[i].editable = false;
        }
          if(this.state.allowEditColumn[this.state.selectCode].length > 0) {
            this.state.allowEditColumn[this.state.selectCode].map((editCols, z) => {
              if(cols.field === editCols) {
                columnDefsTemp[6].children[i].editable = true;
              }
            })
          }
        })
    }
     api.setColumnDefs(columnDefsTemp);
  }

  isPopup = () => {
    return false;
  }

  change = async (event) => {
    let changeData = null;
    this.state.qkurztextGridCombo.map((data) => {
      if(data.CODE === event) {
        changeData = data;
      }
    });

    const rowIndex = this.props.rowIndex;

    await this.setState({
      selectCode: event,
      QKURZTEXT: changeData,
    });

    this.state.gridApi.stopEditing();

    this.settingColumnDefs(rowIndex);

    this.onBtStartEditing(rowIndex, null, null);

    this.editUpdateRowData(); // spec.유형에 따른 cell값 empty value 처리
  }

  editUpdateRowData = async() => {
    let editingCells = [];
    let cellDefs = this.state.gridApi.columnController.columnUtils.gridOptionsWrapper.gridOptions.api.getEditingCells();
    await cellDefs.forEach( function(cellDef) {
      editingCells.push(cellDef.column.getId());
    });

    const rowNode = this.state.gridApi.getRowNode(this.props.rowIndex);
    let keys = [];
    for(let key in rowNode.data) {
      keys.push(key);
    }

    if(keys.length > 0) {
      for(let key of keys) {
        if(!editingCells.includes(key)) {
          rowNode.setDataValue(key, '');
        }
      }
    }
  }

  onBtStartEditing = (key, char, pinned) =>  {
    this.state.gridApi.setFocusedCell(key, "MERKNR", pinned);
    this.state.gridApi.startEditingCell({
      rowIndex: key,
      colKey: "MERKNR",
    });
  }

  getValue = () => {
    return this.state.QKURZTEXT;
  }

  render() {
    return(
       <div>
          <Select 
                defaultValue="Select 하세요." 
                value={this.state.selectCode} 
                onChange={this.change} 
                notFoundContent="Select 하세요." 
                placeholder="Select 하세요." 
                style={{ width: 130 }}
                size="small"
                defaultActiveFirstOption={false} 
          > 
          <Select.Option value="">선택하세요</Select.Option>
           { 
            (this.state.qkurztextGridCombo.length > 0) ? 
            this.state.qkurztextGridCombo.map((data, key) => <Select.Option key={key} value={data.CODE}>{data.NAME}</Select.Option>)
            : ``
           }
        </Select>
      </div>
    );
  }
}

export default QkurztextEditor;