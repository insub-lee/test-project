import React, { Component } from 'react';
import { Select, Button, Modal, Input, Icon  } from 'antd';

const Search = Input.Search;

class MasseinhsEditor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      masseinhswGridCombo: [],
      MASSEINHSW: null,
      visible: false,
      inputValue: null,
      testArr: [],
      gridApi: null,
    }
  }

  componentWillMount() {
    this.masseinhCombo(this.props);
  }

  masseinhCombo = (params) => {
    this.state.gridApi = params.api;
    this.setState({
      masseinhswGridCombo: params.values,
      MASSEINHSW: params.value
    })
  }

  isPopup = () => {
    return false;
  }

  change = async(event) => {
    const rowIndex = this.props.rowIndex;
    
    await this.setState({
      MASSEINHSW: event
    })

    const rowNode = this.state.gridApi.getRowNode(this.props.rowIndex);
    rowNode.setDataValue('MASSEINHSW', this.state.MASSEINHSW);
    // this.state.gridApi.stopEditing();
    // this.onBtStartEditing(rowIndex, null, null);
  }

  getValue = () => {
    return this.state.MASSEINHSW;
  }

  showModal = () => {
    this.setState({
      visible: true,
      inputValue: this.state.MASSEINHSW,
      testArr: [],
    });
  }

  onBtStartEditing = (key, char, pinned) =>  {
    this.state.gridApi.setFocusedCell(key, "MERKNR", pinned);
    this.state.gridApi.startEditingCell({
      rowIndex: key,
      colKey: "MERKNR",
    });
  }

  hideModal = () => {
    this.setState({
      visible: false,
    });
  }

  handleChange = (event) => {
    this.setState({
      inputValue: event.target.value
    })
  }

  searchClick = () => {
    event.stopPropagation();
    this.searchText();
    event.preventDefault();
  }

  handleKeyPress = (event) => {
    if(event.keyCode == 13 || event.charCode == 13) {
      event.stopPropagation();
      event.preventDefault();
      this.searchText();
    }
  }

  searchText = () => {
    const searchValue = this.state.inputValue;
    const comboList = this.state.masseinhswGridCombo;
    let resultList = [];

    if(!searchValue){
      alert('검색할 단위를 입력해주세요.');
      return
    }

    if(comboList.length === 0) return

    comboList.map((data) => {
      data.includes(searchValue) ? resultList.push(data) : ''
    })
    this.setState({ testArr: resultList})
  }

  selectData = (data) => {
    event.stopPropagation();
    event.preventDefault();
    this.setState({
      MASSEINHSW: data
    })
    this.hideModal();
  }

  render() {
    return(
       <div>
            <Button type="primary" icon="search" onClick={this.showModal} size="small"></Button>
            <Select 
                defaultValue="Select 하세요." 
                value={this.state.MASSEINHSW} 
                onChange={this.change} 
                notFoundContent="Select 하세요." 
                placeholder="Select 하세요." 
                style={{ width: 120 }}
                size="small"
                defaultActiveFirstOption={false} 
        > 
           { 
            (this.state.masseinhswGridCombo.length > 0) ? 
            this.state.masseinhswGridCombo.map((data, key) => <Select.Option key={key} value={data}>{data}</Select.Option>)
            : `<option value=""></option>`
           }
        </Select>
        <Modal
          title="Search"
          visible={this.state.visible}
          footer={null}
          onCancel={this.hideModal}
        >
          <div>
            <Input id="searchInput" addonAfter={<Icon type="search" onClick={this.searchClick}/>} value={this.state.inputValue}
            defaultValue={this.state.MASSEINHSW} onChange={this.handleChange} onKeyPress={(event) => this.handleKeyPress(event)}/>
          </div>
          <div>
          { this.state.testArr.map(key => <div key={key} onClick={() => this.selectData(key)}>{key}</div>) }
          </div>
        </Modal>
      </div>
    );
  }
}

export default MasseinhsEditor;