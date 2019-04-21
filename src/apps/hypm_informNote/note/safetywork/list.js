import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import SafetyForm from './safetyForm';
import SafetyGridForm from './safetyGridForm';
import * as selectors from '../selectors';
import 'apps/hypm_common/css/gipms.css';
import * as actions from '../actions';

class SafetyWorkGrid extends React.PureComponent {
  state={
    hide: false,
    clickData: undefined,
    claName: 'chapter-open',
    itemList: this.props.Item.SAFETYWORK_LIST,
    itemNoteNo: this.props.Item.INFORM_NOTE_NO,
    itemModel: this.props.Item.MODEL,
    itemMaker: this.props.Item.HERST,
    rowIndex: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editable !== nextProps.editable) {
      this.setState({ hide: false });
    }
  }

  deleteInformNote() {
    console.log('grid deleteInformNote');
    const {deleteSafeWorkList} = this.props;
    return deleteSafeWorkList;
  }

  updateInformNote() {
    console.log('grid updateInformNote');
    const {updateSafeWorkList} = this.props;
    return updateSafeWorkList;
  }

  onDeleteData = () => {
    const { itemList, rowIndex, itemNoteNo, clickData } = this.state; 
    let delitem = [].concat(itemList);
      delitem.splice(rowIndex, 1);
      this.setState({
        itemList: delitem,
      })
      let removeNo = 'noRemoveData';
      delitem.map(data => {
        if(data.EQ_ID){
          removeNo = data.EQ_ID;
        }
      });
      delitem = delitem.filter(data => data.EQ_ID !== removeNo);
      this.props.handelUpdateSafeWorkListDelete(delitem);
      if (clickData){
        let delItemNo = {
          M_ID: itemNoteNo,
          U_ID: clickData,
        }
        this.props.handleDeleteSafeWork(delItemNo);
      }
  }

  onAddRow = () => {
    const { itemList, itemNoteNo } = this.state;
    const newItems = {
      WORK_NO: '',
      WORK_NAME: '',
      WORK_DD: '',
      WORK_END_DD: '',
      WORK_START_TIME: '',
      WORK_END_TIME: '',
      WORK_LOC_DTL: '',
      WORKLOC_GB: '',
      WORK_GB: '',
      WORK_GB_NAME:  '',
      PODR_COMP: '',
      RESP: '',
      SPRVTEAM: '',
      MANGR_ID: '',
      MANGR_NAME: '',
      MANGR_CONTACT: '',
      WORK_VENDOR: '',
      WORK_VENDOR_NAME: '',
      WORK_VENDOR_RESP_NAME: '',
      WORK_VENDOR_RESP_CONTACT: '',
      SPRV_WORK: '',
      SPRV_WORK_NAME: '',
      SIMULT_WORK: '',
      SIMULT_WORK_NAME: '',
      WORKGRADE: '',
      PRMS_PROGRESS_STATUS: '',
      PRMS_PROGRESS_STATUS_NAME: '',
      PERM_DATE: '',
      INFORM_NOTE_NO: itemNoteNo,
      CREATE_DATE: {  
        date: ''
      },
      UPDATE_DATE: {  
        date: ''
      },
      ATTACH_FILE_NO_RISK: '',
      NOTI_TYPE: '',
      NOTI_TYPE_NAME: '',
      CODING: '',
      CODING_NAME: '',
      BEBER: '',
      BEBER_NAME: '',
      STORT: '',
      STORT_NAME: '',
      EQ_ID: '',
      ARBPL: '',
      ARBPL_NAME: '',
    };
    this.setState({
      itemList: [
        ...itemList,
        newItems,
      ],
    });
  }

  clickRowData = (data, rowIndex) => {
    this.setState({
      clickData: data,
      rowIndex: rowIndex,
    });
  }

  handeleSearch = () => {

  }

  handleSafetyHideChange =() => {
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
      itemNoteNo,
      itemModel,
      itemMaker,
    } = this.state;
    const { searchState } = this.props;

    if (this.props.editable) {
      return (
        <div>
          <div className="inform-edit-item"> 
            <div className="btn-group">
              <div className="left">
                <h4 className="inform-title">ES&amp;H 안전작업허가</h4>
                <a>
                  <span
                    type="danger"
                    className={claName}
                    onClick={this.handleSafetyHideChange}
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
              </div>
            </div>
          </div>
          <div>
            {hide ? false : <SafetyGridForm Item={itemList} clickRowData={this.clickRowData} onAddRow={this.onAddRow} searchState={searchState} itemNoteNo={itemNoteNo} itemModel={itemModel} itemMaker={itemMaker}/> }
          </div>
        </div>
      );
    }

    return (
      <div>
        <div className="inform-edit-item"> 
          <div className="btn-group">
            <div className="left">
              <h4 className="inform-title">ES&amp;H 안전작업허가</h4>
              <a>
                <span
                  type="danger"
                  className={claName}
                  onClick={this.handleSafetyHideChange}
                >
                {hide ? '▼' : '▲'}
                </span>{/* chapter-close 와 토글 */}
              </a>
            </div>
          </div>
         </div> 
        {/* <div>
          <button onClick={this.handleSafetyHideChange}>▼</button>
          ES&H 안전작업허가
        </div> */}
        <div>
          {hide ? false : <SafetyForm Item={this.props.Item} /> }
        </div>
      </div>
    );
  }
}

SafetyWorkGrid.propTypes = {
  Item: PropTypes.array,
  editable: PropTypes.bool,
  handelUpdateSafeWorkListDelete: PropTypes.func,
  handleDeleteSafeWork: PropTypes.func,
};

SafetyWorkGrid.defaultProps = {
  Item: {},
  editable: false,
  updateSafeWorkList: [],
  deleteSafeWorkList: [],
};

const mapStateToProps = createStructuredSelector({
  updateSafeWorkList: selectors.makeUpdateSafeWorkList(),
  deleteSafeWorkList: selectors.makeDeleteSafeWorkList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handelUpdateSafeWorkListDelete: value => dispatch(actions.updateSafeWorkListDelete(value)),
    handleDeleteSafeWork: value => dispatch(actions.deleteSafeWork(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true});

export default compose(
  withConnect,
)(SafetyWorkGrid);

