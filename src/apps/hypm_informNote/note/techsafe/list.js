import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { compose } from 'redux';
import TechSafeForm from './techSafeForm';
import TechSafeGridForm from './techSafeGridForm';
import 'apps/hypm_common/css/gipms.css';
import * as selectors from '../selectors';
import * as actions from '../actions';

class TechList extends React.PureComponent {
  state={
    hide: false,
    clickData: undefined,
    claName: 'chapter-open',
    itemList: this.props.Item.ITEM_TECH_LIST,
    itemNoteNo: this.props.Item.INFORM_NOTE_NO,
    rowIndex: undefined,
    reqItem: undefined,
    reqItemNm: undefined,
    eqId: undefined,
    inUId: undefined,
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.editable !== nextProps.editable) {
      this.setState({ hide: false });
    }
  }

  deleteInformNote() {
    const {deleteTechSafeList} = this.props;
    return deleteTechSafeList;
  }

  updateInformNote() {
    const {updateTechSafeList} = this.props;
    return updateTechSafeList;
  }

  onDeleteData = () => {
    const { itemList, rowIndex, itemNoteNo, clickData, reqItem, reqItemNm, eqId, inUId } = this.state; 
    let delitem = [].concat(itemList);
    delitem.splice(rowIndex, 1);
    this.setState({
      itemList: delitem,
    })
    let removeNo = 'noRemoveData';
    delitem.map(data => {
      if(data.ITEM_TECH_NO){
        removeNo = data.ITEM_TECH_NO;
      }
    });
    delitem = delitem.filter(data => data.ITEM_TECH_NO !== removeNo);
    this.props.handelUpdateTechSafeListDelete(delitem);
    if (clickData){
      let delItemNo = {
        INFORM_NOTE_NO: itemNoteNo,
        ITEM_TECH_NO: clickData,
        REQ_ITEM: reqItem,
        REQ_ITEM_NM: reqItemNm,
        EQ_ID: eqId,
        IN_U_ID: inUId,
      }
      this.props.handleDeleteTechSafe(delItemNo);
    }
  }

  onAddRow = () => {
    const { itemList, itemNoteNo } = this.state;
    const newItems = {
      INFORM_NOTE_NO: itemNoteNo,
      IN_U_ID: '',
      ITEM_TECH_NO: '',
      REQ_ENDTIME: '',
      REQ_ITEM: '',
      REQ_ITEM_NM: '',
      REQ_STATUS: '',
      REQ_STATUS_NM: '',
      REQ_TIME: '',
      WORK_TIME: '',
      EQ_ID: this.props.Item.EQ_ID,
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
      clickData: data.ITEM_TECH_NO,
      rowIndex: rowIndex,
      reqItem: data.REQ_ITEM,
      reqItemNm: data.REQ_ITEM_NM,
      eqId: data.EQ_ID,
      inUId: data.IN_U_ID,
    });
  }

  handeleSearch = () => {

  }

  handleTechSafetyHideChange =() => {
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
    } = this.state;
    const { searchState, profile } = this.props;

    if (this.props.editable) {
      return (
        <div>
          <div className="inform-edit-item">
            <div className="btn-group">
              <div className="left">
                <h4 className="inform-title">기술안전팀</h4>
                <a>
                  <span type="danger"
                    className={claName}
                    onClick={this.handleTechSafetyHideChange}
                  >{hide ? '▼' : '▲'}
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
              {hide ? false : <TechSafeGridForm Item={itemList} clickRowData={this.clickRowData} onAddRow={this.onAddRow} searchState={searchState} eqId={this.props.Item.EQ_ID} /> }
          </div>
        </div>
      );
    }

    return (
      <div>
        {/* <div>
          <button onClick={this.handleTechSafetyHideChange}>▼</button>
           기술안전팀
        </div> */}
          <div className="inform-edit-item">
            <div className="btn-group">
              <div className="left">
                <h4 className="inform-title">기술안전팀</h4>
                <a>
                  <span type="danger"
                    className={claName}
                    onClick={this.handleTechSafetyHideChange}
                  >{hide ? '▼' : '▲'}
                  </span>{/* chapter-close 와 토글 */}
                </a>
              </div>
            </div>
           </div> 
        <div>
          {hide ? false : <TechSafeForm Item={this.props.Item} /> }
        </div>
      </div>
    );
  }
}

TechList.propTypes = {
  Item: PropTypes.object,
  editable: PropTypes.bool,
  handelUpdateTechSafeListDelete: PropTypes.func,
  handleDeleteTechSafe: PropTypes.func,
};

TechList.defaultProps = {
  Item: {},
  editable: false,
  searchState: {},
  updateTechSafeList: [],
  deleteTechSafeList: [],
};

const mapStateToProps = createStructuredSelector({
  updateTechSafeList: selectors.makeUpdateTechSafeList(),
  deleteTechSafeList: selectors.makeDeleteTechSafeList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handelUpdateTechSafeListDelete: value => dispatch(actions.updateTechSafeListDelete(value)),
    handleDeleteTechSafe: value => dispatch(actions.deleteTechSafe(value)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps, null, { withRef: true});

export default compose(
  withConnect,
)(TechList);

