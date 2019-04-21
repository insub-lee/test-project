import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import RepairForm from './repairForm';
import RepairGridForm from './repairGridForm';
import * as selectors from '../selectors';
// import { BtnSearchDkBlue } from '../../buttons.style';

class RepairGrid extends React.PureComponent {
  state={
    hide: false,
    clickData: undefined,
    itemList: this.props.Item.ITEM_LIST,
    itemNoteNo: this.props.Item.INFORM_NOTE_NO,
    // addRowBtn: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editable !== nextProps.editable) {
      this.setState({ hide: false });
    }
  }

  // componentDidUpdate(prevProps, prevState){
  //   if (prevState.addRowBtn !== this.state.addRowBtn) {

  //   }
  // }

  updateInformNote() {
    console.log('grid updateInformNote');
    const { unitCode, typeCode, causeCode, partCode} = this.props;
    const { itemNoteNo } = this.state;
    const data = {
      ACTION_BY: '',
      ACTION_BY_NUM: '',
      FECOD: typeCode,
      // FECOD_NM: "VACUUM",
      FEGRP: 'F0005564',
      INFORM_NOTE_NO: itemNoteNo,
      ITEM_NO: '',
      MATXT: null,
      MNCOD: partCode,
      // MNCOD_NM: "SYSTEM PC",
      MNGRP: 'F0072203',
      OTEIL: unitCode,
      // OTEIL_NM: "TM",
      OTGRP: 'F0072203',
      RESULT: "200L REFILL不 관련 M/C POWER CYCLE실시.",
      URCOD: causeCode,
      // URCOD_NM: "VACUMM 차이로 인한 INTERLOCK",
      URGRP: 'F0072168',
    }
    return [];
  }

  onDeleteData = () => {
    const { clickData, itemList, itemNoteNo } = this.state; 
    if (itemList.map(info => info.ITEM_NO === clickData)) {
      this.setState({
        itemList: itemList.filter(info => info.ITEM_NO !== clickData),
      });
      this.props.handleDeleteLineList(itemNoteNo, clickData);
    }
  }

  onAddRow = () => {
    
    console.log("--------------[onAddRow]---------------------");

    const { itemList, itemNoteNo } = this.state;
    const newItems = {
      OTEIL_NM: '',
      FECOD_NM: '',
      URCOD_NM: '',
      MNCOD_NM: '',
      RESULT: '',
      ACTION_BY: '',
      ACTION_BY_NUM: '',
      FECOD: '',
      FEGRP: '',
      INFORM_NOTE_NO: itemNoteNo,
      ITEM_NO: '',
      MATXT: '',
      MNCOD: '',
      MNGRP: '',
      OTEIL: '',
      OTGRP: '',
      URCOD: '',
      URGRP: '',
    };
    this.setState({
      itemList: [
        ...itemList,
        newItems,
      ],
    });
  }

  handeleSearch = () => {

  }

  clickRowData = (data) => {
    this.setState({
      clickData: data,
    });
  }

  handleRepairHideChange =() => {
    const { hide } = this.state;
    this.setState({
      hide: !hide,
      itemList: this.props.Item,
    });
  }

  handleEditRepair = (data) => {
    const { itemList, itemNoteNo } = this.state;
    const dataList = {
      OTEIL_NM: data.unitCodeName,
      FECOD_NM: data.typeCodeData,
      URCOD_NM: data.causeCodeName,
      MNCOD_NM: data.partCodeName,
      RESULT: data.result,
      // ACTION_BY: '',
      // ACTION_BY_NUM: '',
      FECOD: data.typeCodeData,
      // FEGRP: '',
      // INFORM_NOTE_NO: itemNoteNo,
      // ITEM_NO: '',
      // MATXT: '',
      MNCOD: data.partCodeData,
      // MNGRP: '',
      OTEIL: data.unitCodeData,
      // OTGRP: '',
      URCOD: data.causeCodeData,
      // URGRP: '',
    };
    // const itemListnew = itemList.map((info, index) => {
    this.setState({
      itemList: itemList.map((info, index) => {
        data.rowIndex === index ? {...info, ...dataList } : info
      })
    });
    console.log(itemList);
    // handleUpdate=(id,data)=>{
    //   const {information} = this.state;
    //   this.setState({
    //     information: information.map(
    //       info=> id === info.id ? {...info, ...data} : info
    //     )
    //   })
    // }
  }

  render() {
    const {
      hide,
      itemList,
    } = this.state;
    const { searchState } = this.props;

    if (this.props.editable) {
      return (
        <div>
          <div>
            <div>
              <button onClick={this.handleRepairHideChange}>▼</button>
              고장코드
            </div>
            <div className="searchNoteLayer" style={{ marginLeft: '83%', marginBottom: '5px', marginTop: '5px' }}>
              <Button
                title="라인추가"
                className="searchBtn"
                onClick={this.onAddRow}
              >
              라인추가
              </Button>
              <Button
                title="라인삭제"
                className="searchBtn"
                onClick={this.onDeleteData}
              >
              라인삭제
              </Button>
            </div>
          </div>
          <div>
            {hide ? false : <RepairGridForm Item={itemList} clickRowData={this.clickRowData} onAddRow={this.onAddRow} searchState={searchState} handleEditRepair={this.handleEditRepair} /> }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div>
          <button onClick={this.handleRepairHideChange}>▼</button>
           고장코드
        </div>
        <div>
          {hide ? false : <RepairForm Item={this.props.Item} /> }
        </div>
      </div>
    );
  }
}

RepairGrid.propTypes = {
  Item: PropTypes.array,
  editable: PropTypes.bool,
  searchState: PropTypes.object,
  handleDeleteLineList: PropTypes.func,
};

RepairGrid.defaultProps = {
  Item: {},
  editable: false,
  searchState: {},
  unitCode: undefined,
  typeCode: undefined,
  causeCode: undefined,
  partCode: undefined,
};

const mapStateToProps = createStructuredSelector({
  // unitCode: selectors.makeUnitCode(),
  // typeCode: selectors.makeTypeCode(),
  // causeCode: selectors.makeCauseCode(),
  // partCode: selectors.makePartCode(),
});

const withConnect = connect(mapStateToProps, null);

export default compose(
  withConnect,
)(RepairGrid);
