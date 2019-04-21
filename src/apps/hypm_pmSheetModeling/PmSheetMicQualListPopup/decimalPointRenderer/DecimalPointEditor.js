import React, { Component } from 'react';
import { Select } from 'antd';

const decimalPointValues = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
class DecimalPointEditor extends Component { 

  constructor(props) {
    super(props);
    this.state = {
      STELLEN: null,
      selectCode: null,
      visible: false,
      inputValue: null,
      gridApi: null,
    }
  }

  componentWillMount() {
    this.masseinhCombo(this.props);
  }

  masseinhCombo = (params) => {
    this.state.gridApi = params.api;
    this.setState({
      STELLEN: params.value,
    })
  }

  isPopup = () => {
    return false;
  }

  change = async(event) => {
    await this.setState({
      STELLEN: event
    });
    
    const rowNode = this.state.gridApi.getRowNode(this.props.rowIndex);
    rowNode.setDataValue('STELLEN', this.state.STELLEN);
  }

  onBtStartEditing = (key, char, pinned) =>  {
    this.state.gridApi.setFocusedCell(key, "MERKNR", pinned);
    this.state.gridApi.startEditingCell({
      rowIndex: key,
      colKey: "MERKNR",
    });
  }

  getValue = () => {
    return this.state.STELLEN;
  }

  render() {
    return(
      <div>
          <Select 
                value={this.state.STELLEN} 
                onChange={this.change} 
                style={{ width: 130 }}
                defaultActiveFirstOption={false} 
          > 
          {
            decimalPointValues.map((data, index) => 
            <Select.Option key={index} value={data}>{data}</Select.Option>)
          }
        </Select>
      </div>
    );
  }
}

export default DecimalPointEditor;