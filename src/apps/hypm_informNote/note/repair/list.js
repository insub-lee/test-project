import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import RepairForm from './repairForm';
import RepairGridForm from './repairGridForm';
import * as selectors from '../selectors';
import 'apps/hypm_common/css/gipms.css';
// import { BtnSearchDkBlue } from '../../buttons.style';
import * as actions from '../actions';

class RepairGrid extends React.PureComponent {
  state={
    hide: false,
    clickData: undefined,
    claName: 'chapter-open',
    itemList: this.props.Item.ITEM_LIST,
    itemNoteNo: this.props.Item.INFORM_NOTE_NO,
    rowIndex: undefined,
    eqart: this.props.Item.EQART,
    // addRowBtn: false,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editable !== nextProps.editable) {
      this.setState({ hide: false });
    }
  }

  deleteInformNote() {
    console.log('grid deleteRepairInformNote');
    const {deleteRepairList} = this.props;
    return deleteRepairList;
  }

  updateInformNote() {
    console.log('grid updateInformNote');
    const {updateRepairList} = this.props;
    return updateRepairList;
  }

  onDeleteData = () => {
    const { itemList, rowIndex, itemNoteNo, clickData } = this.state; 
    // if (clickData) {
    //   this.setState({
    //     itemList: itemList.filter(info => info.ITEM_NO !== clickData),
    //   });
    // }
      let delitem = [].concat(itemList);
      delitem.splice(rowIndex, 1);
      this.setState({
        itemList: delitem,
      }, () => {
        this.props.onSizeChange();
      });
      let removeNo = 'noRemoveData';
      delitem.map(data => {
        if(data.ITEM_NO){
          removeNo = data.ITEM_NO;
        }
      });
      delitem = delitem.filter(data => data.ITEM_NO !== removeNo);
      // console.log(delitem);
      this.props.handelUpdateRepairListDelete(delitem);
      if (clickData){
        let delItemNo = {
          M_ID: itemNoteNo,
          U_ID: clickData,
        }
        this.props.handleDeleteRepair(delItemNo);
      }
  }

  onBMCode = () => {
    console.log('BMCode 바로가기 버튼');
  }

  onAddRow = () => {
    const { itemList, itemNoteNo } = this.state;
    const newItems = {
      OTEIL_NM: '',
      FECOD_NM: '',
      URCOD_NM: '',
      MNCOD_NM: '',
      RESULT: undefined,
      ACTION_BY: this.props.profile.NAME_KOR,
      ACTION_BY_NUM: this.props.profile.EMP_NO,
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
    }, () => {
      this.props.onSizeChange();
    });
  }

  handeleSearch = () => {

  }

  clickRowData = (data, rowIndex) => {
    this.setState({
      clickData: data,
      rowIndex: rowIndex,
    });
  }

  handleRepairHideChange =() => {
    const { hide } = this.state;
    if (hide) {
      this.setState({
        hide: !hide,
      });
    } else {
      this.setState({
        hide: !hide,
        claName: 'chapter-close'
      });
    }
  }

  render() {
    const {
      hide,
      itemList,
      claName,
      eqart,
    } = this.state;
    const { searchState, profile } = this.props;

    if (this.props.editable) {
      return (
        <div>
           <div className="inform-edit-item"> 
            <div className="btn-group">
              <div className="left">
                <h4 className="inform-title">고장코드</h4>
                <a>
                  <span
                    type="danger"
                    className={claName}
                    onClick={this.handleRepairHideChange}
                  >
                  {hide ? '▼' : '▲'}
                  </span>{/* chapter-close 와 토글 */}
                </a>
              </div>
              <div className="right">
                <Button
                  type="primary"
                  className="btn-normal add-line"
                  onClick={this.onAddRow}
                >
                라인추가
                </Button>
                <Button
                  type="primary"
                  className="btn-normal add-line"
                  onClick={this.onDeleteData}
                >
                라인삭제
                </Button>
                <Button
                  type="primary"
                  className="btn-normal add-line"
                  onClick={this.onBMCode}
                >
                BM Code 바로가기
                </Button>
              </div>
            </div>
          </div>
          <div>
            {hide ? false : <RepairGridForm Item={itemList} clickRowData={this.clickRowData} onAddRow={this.onAddRow} searchState={searchState} eqart={eqart} /> }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="inform-edit-item"> 
          <div className="btn-group">
            <div className="left">
              <h4 className="inform-title">고장코드</h4>
              <a>
                <span
                  type="danger"
                  className={claName}
                  onClick={this.handleRepairHideChange}
                >
                {hide ? '▼' : '▲'}
                </span>{/* chapter-close 와 토글 */}
              </a>
            </div>
          </div>
         </div> 
        {/* <div>
          <button onClick={this.handleRepairHideChange}>▼</button>
           고장코드
        </div> */}
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
  handelUpdateRepairListDelete: PropTypes.func,
  handleDeleteRepair: PropTypes.func,
};

RepairGrid.defaultProps = {
  Item: {},
  editable: false,
  searchState: {},
  unitCode: undefined,
  typeCode: undefined,
  causeCode: undefined,
  partCode: undefined,
  updateRepairList: [],
  deleteRepairList: [],
};

const mapStateToProps = createStructuredSelector({
  unitCode: selectors.makeUnitCode(),
  typeCode: selectors.makeTypeCode(),
  causeCode: selectors.makeCauseCode(),
  partCode: selectors.makePartCode(),
  updateRepairList: selectors.makeUpdateRepairList(),
  deleteRepairList: selectors.makeDeleteRepairList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handelUpdateRepairListDelete: value => dispatch(actions.updateRepairListDelete(value)),
    handleDeleteRepair: value => dispatch(actions.deleteRepair(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true});

export default compose(
  withConnect,
)(RepairGrid);
