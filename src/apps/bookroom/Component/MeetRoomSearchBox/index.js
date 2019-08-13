import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Input,DatePicker, Checkbox, Cascader,Select } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import * as actions from './actions';
import * as selectors from './selectors';
import injectSaga from '../../../../utils/injectSaga';
import injectReducer from '../../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { CommonParam2, CommonParam3, CommonParam4, CommonParamMeetRoom, CommonParamMeetRoomGbn } from '../CommonParam';

const Option = Select.Option;

class MeetRoomSearchBox extends React.Component{
  constructor(props) {
    super(props);
      const {
        handleLoadingMeetRoom,
        handleLoadingParam,
      } = props;

      handleLoadingMeetRoom();  
      handleLoadingParam();

  }

  state = {
    valueState:[],
    selectValue : [],
    compValue:[],
    bldngValue:[],
    floorValue:[],
    gbnValue:[],
    meetRoomValue:[],
  }


  componentDidMount(){
    this.setState({
      valueState:this.props.value,
    })
  }

  /*
  static getDerivedStateFromProps(nextProps, prevState) {

    if (prevState.valueState !== nextProps.value) {
      alert("component der");
      return {
        valueState: nextProps.value
      };
    }
  }
  */

  componentDidUpdate(prevProps, prevState){
  }

  onCascaderChange = (value, selectedOptions) => {
    this.props.onChange(value);
    this.setState({
      valueState:value,
    })
  }

  onMultiCascaderChange = (valueList, labelList, leafList) => {
    alert(valueList);
    alert(labelList);
    alert(leafList);
  }

  filterValue = (inputValue, path) => {
    alert(path);
    return (path.some(option => (option.label).toUpperCase().indexOf(inputValue.toUpperCase()) > -1));
  }

  createSearchBoxCascader = () => {
    const {  SearchBoxType, ChangeOnSelect, value, cascaderWidth, defaultValue } = this.props;

    let roomCascader =[];
    let placeHolderText='';

    if (this.props.compList.length>0){
      if (SearchBoxType === 'meetroomGbn'){
        roomCascader = CommonParamMeetRoomGbn(this.props.compList, this.props.bldgList, this.props.floorList, this.props.detailMeetRoomList);
        placeHolderText='사업장 / 건물 / 층 / 구분 / 회의실';
      }
      else if (SearchBoxType === 'meetroom'){
        roomCascader = CommonParamMeetRoom(this.props.compList, this.props.bldgList, this.props.floorList, this.props.detailMeetRoomList);
        placeHolderText='사업장 / 건물 / 층 / 회의실';
      }
      else if (SearchBoxType === 'bldng'){
        roomCascader = CommonParam2(this.props.compList, this.props.bldgList);
        placeHolderText='사업장 / 건물';
      }
      else if (SearchBoxType === 'floor'){
        roomCascader = CommonParam3(this.props.compList, this.props.bldgList, this.props.floorList);
        placeHolderText='사업장 / 건물 / 층';
      }
      else if (SearchBoxType === 'meetroomExact'){
        roomCascader = CommonParam4(this.props.compList, this.props.bldgList, this.props.floorList, this.props.detailMeetRoomList);
        placeHolderText='사업장 / 건물 / 층 / 구분 / 회의실';
      }
    }

    return(
      <Cascader  options={roomCascader} 
                   changeOnSelect={ChangeOnSelect}
                   onChange={this.onCascaderChange} 
                   style={{width: cascaderWidth}} 
                   placeholder={placeHolderText}
                   // expandTrigger='hover'
                   value={value}
                   showSearch={ this.filterValue }
                   allowClear={true}
                   defaultValue={defaultValue}
                   //value={[record.compId,record.bldngId,record.florLoc,record.mrGbn, record.mrRegNo]}
        />
    )

  }


  /*
  createSearchBoxSelect = () => {
    const {  SearchBoxType, ChangeOnSelect, value, compList, bldgList, floorList, detailMeetRoomList  } = this.props;
    const { compValue , bldngValue, floorValue, gbnValue, meetRoomValue } = this.state;

    let compOptions =[];
    let bldgOptions =[];
    let floorOptions =[];
    let meetRoomOptions =[];   

    compOptions = compList.map(keycomp => <Option key={keycomp.CM_CODE}>{keycomp.CD_NM}</Option>);
    bldgOptions = bldgList!==''?  bldgList.map(keybldg => keybldg.CD_NM!==''?<Option value={keybldg.CM_CODE}>{keybldg.CD_NM}</Option>:''):'';
    floorOptions = floorList!==''?  floorList.map(keyfloor => keyfloor.CD_NM!==''?<Option value={keyfloor.CM_CODE}>{keyfloor.CD_NM}</Option>:''):'';
    meetRoomOptions = detailMeetRoomList!==''?  detailMeetRoomList.map(keyroom => keyroom.CD_NM!==''?<Option value={keyroom.CM_CODE}>{keyroom.CD_NM}</Option>:''):'';
    

    return(
      <div>
      <Select value={compValue} 
              style={{ width: 300 }} 
              onChange={this.onCompChange} 
              placeholder="전체" 
              notFoundContent="전체" 
              defaultActiveFirstOption={true}
              id="comp"
              >
        {compOptions}
      </Select>
      <Select value={bldngValue} 
              style={{ width: 300 }} 
              onChange={this.onBldngChange} 
              placeholder="전체" 
              notFoundContent="전체" 
              defaultActiveFirstOption={true}
              id="bldng"
              >
        {bldgOptions}
      </Select>
      <Select value={floorValue} 
            style={{ width: 300 }} 
            onChange={this.onFloorChange} 
            placeholder="전체" 
            notFoundContent="전체" 
            defaultActiveFirstOption={true}
            id="floor"
            >
        {floorOptions}
      </Select>
      <Select value={gbnValue} 
            style={{ width: 300 }} 
            onChange={this.onGbnChange} 
            placeholder="전체" 
            notFoundContent="전체" 
            defaultActiveFirstOption={true}
            id="gbn"
            >
        {gbnOptions}
      </Select>
      <Select value={meetRoomValue} 
            style={{ width: 300 }} 
            onChange={this.onMeetRoomChange} 
            placeholder="전체" 
            notFoundContent="전체" 
            defaultActiveFirstOption={true}
            id="meetroom"
            >
        {meetRoomOptions}
      </Select>
    </div>  
    )

  }
  */
  
  render() {
    const {  SearchBoxType, ChangeOnSelect, value } = this.props;
    
    let roomCascader =[];
    let placeHolderText='';

    let SearchBoxCascader = this.createSearchBoxCascader();

    //let SearchBoxSelect = this.createSearchBoxSelect();
    
    return (
      <div>
        {SearchBoxCascader}
      </div>
    );
  }
}

MeetRoomSearchBox.propTypes = {  
  detailMeetRoomList:PropTypes.array,
  compList:PropTypes.array,
  bldgList:PropTypes.array,
  floorList:PropTypes.array,
  onChange:PropTypes.func,
  SearchBoxType:PropTypes.string,
  ChangeOnSelect:PropTypes.bool,
  value :PropTypes.arry,
  onCompChange:PropTypes.func,
  onBldnbChange:PropTypes.func,
  onFloorChange:PropTypes.func,
  onGbnChange:PropTypes.func,
  onMeetRoomChange:PropTypes.func,
  cascaderWidth:PropTypes.string,
  defaultValue :PropTypes.arry,
};

MeetRoomSearchBox.defaultProps = {
  detailMeetRoomList: [],
  compList : [],
  bldgList : [],
  floorList : [] ,
  SearchBoxType : 'meetroom',
  ChangeOnSelect : false,
  value : [],
  cascaderWidth:'100%',
  defaultValue:[],
}

const mapStateToProps = createStructuredSelector({
  detailMeetRoomList:selectors.makeMeetRoomsDetail(),
  compList : selectors.makeCompParams(),
  bldgList : selectors.makeBldgParams(),
  floorList : selectors.makeFloorParams(),
});
 
export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingMeetRoom: () => dispatch(actions.loadingMeetRoom()),
    handleLoadingParam: () => dispatch(actions.loadingParam()),
  };
}

const withReducer = injectReducer({ key: 'MeetRoomSearchBox', reducer });
const withSaga = injectSaga({ key: 'MeetRoomSearchBox', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(MeetRoomSearchBox);
