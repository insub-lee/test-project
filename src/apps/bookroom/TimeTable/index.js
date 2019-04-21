import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { DatePicker, TimePicker, Select, InputNumber, Cascader, Button, Input, Checkbox, Popover   } from 'antd';
import moment from 'moment';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { push } from 'react-router-redux';
import { DragDropContext as dragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';
import * as actionsLoading from 'containers/common/Loading/actions';
// import ReactPullToRefresh from 'react-pull-to-refresh' pull to refresh 대비
import * as actions from './actions';
import * as selectors from './selectors';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import Timeline, { TimelineMarkers, CustomMarker } from './Timeline';
import containerResizeDetector from './Timeline/resize-detector/container';
import './Timeline/Timeline.css';
import { CommonParamAllFloor} from '../Component/CommonParam';
import ReservationModal from '../ReservationModal/index';
import ReservationDetailModal from '../ReservationDetailModal/index';
import { checkMode } from 'utils/commonUtils';
import '../common/style/bookroom.css';
import StyleBookroom from '../common/style/styleBookroom';
import locale from 'utils/pickerLang';

const wrap = dragDropContext(HTML5Backend);

let searchTab = 'fav';
let viewSearchDate = moment().format('YYYY-MM-DD');
let viewSearchFrTime = moment().format('mm') <= 30 ? moment().startOf("hour").format('HH:mm') : moment().startOf("hour").add(30,"minute").format('HH:mm') ;
viewSearchFrTime = viewSearchFrTime.substring(0,2) > 17 ? "17:00" : viewSearchFrTime;
viewSearchFrTime = viewSearchFrTime.substring(0,2) < 7 ? "07:00" : viewSearchFrTime;
let viewSearchTerm=1;
let viewSearchToTime = viewSearchFrTime.substring(0,2) > 17 ?  "21:00"  :
  moment(viewSearchFrTime,'HH:mm').add(viewSearchTerm,"hour").format('HH:mm');

let viewSearchCompCd = '';
let viewSearchBldgCd = '';
let viewSearchFloorCd = [];
let viewSearchLoc=[];
let viewSearchAllFloor= '';

let resMrRegNo = '';
let limitResTime = '';
let resFrHH = '';
let resFrMi = '';
let resToHH = '';
let resToMi = '';
let ResLimitTime = '';

let resMrReqNo= '';
let searchData = {};
let bookRoomMain = React.createRef();
// let favChk = '';

const CheckboxGroup = Checkbox.Group;
const plainOptions = ['인원', '기자재', '용도'];

class TimeTable extends PureComponent{
  constructor(props) {
    super(props);

    this.props.handleLoadingParam();
    this.props.handleLoadingFavoriteLocList(this.props.history);
  }

  state = {
    searchCompCd: '',
    searchBldgCd: '',
    searchFloor: '',
    searchDate: moment().format('YYYY-MM-DD'),
    searchTime: moment().format('HH:mm'),
    initComp: '',  // 최초 로딩여부
    searchFavYm: moment().format('YYYY-MM-DD').substring(0,4) + "."+moment().format('YYYY-MM-DD').substring(5,7),
    searchFavDt: moment().format('YYYY-MM-DD').substring(8,10),
    showRoomInfo: false,
    locValueState: [],
    searchTerm: 1,
    showDefault: true,
    isResModalShow: false,
    isResDetailModalShow: false,
    showWholeMeetRoom: false,
    showUseTime: false,
    scrollLocation : 0,
    isSticky: false,
    isTimePickerOpen: false,
    favCheckState:'',
  }

  componentDidMount(){
    // 스크롤 이벤트 적용
    window.addEventListener('touchmove', this.listenTouchMoveEvent);
    window.addEventListener('touchend', this.listenTouchEndEvent);
    // ReactDOM.findDOMNode(this.refs.stickyArea).addEventListener('scroll', this.listenScrollEvent);
   
    const {handleLoadingBookedRooms} = this.props;
    
    handleLoadingBookedRooms(viewSearchDate, viewSearchFrTime, viewSearchToTime, viewSearchTerm, viewSearchCompCd, viewSearchBldgCd, viewSearchFloorCd, viewSearchLoc, viewSearchAllFloor, searchTab);
  }

  static getDerivedStateFromProps(nextProps, prevState) {    
    if (nextProps.favCheck === 'Y' && prevState.locValueState !== nextProps.favLocList) {
      // 선호위치 회의실 로딩 후 검색조건(viewSearchLoc) 및 cascder(viewSearchFloorCd)에 로딩
      
      viewSearchFloorCd=nextProps.favLocList;
      viewSearchLoc = [];
      if(nextProps.favLocList.length > 0) {
        viewSearchLoc.push(nextProps.favLocList[0].COMP_ID+nextProps.favLocList[0].BLDNG_ID+nextProps.favLocList[0].FLOR_LOC);
      }
      return {
        locValueState: nextProps.favLocList
      };
    }

    return null;
    
  }

  componentDidUpdate(prevState){
  }

  componentWillUnmount() {
    window.removeEventListener('touchmove', this.listenTouchMoveEvent);
    window.removeEventListener('touchend', this.listenTouchEndEvent);
    // ReactDOM.findDOMNode(this.refs.stickyArea).removeEventListener('scroll', this.listenScrollEvent);
    
    searchTab = 'fav';
    viewSearchLoc = [];
    viewSearchFloorCd = [];
    viewSearchCompCd = '';
    viewSearchAllFloor='';
    // favChk ='';

    // this.setState ({
    //   favCheckState : ''
    // })
  }

  // 화면 스크롤시 소요시간 설정 팝업 close
  listenTouchMoveEvent = (e) => {
    const { showUseTime } = this.state;

    if (showUseTime) {
      this.setState({ showUseTime: false });
    }
  };

  // 소요시간 설정 팝업 외부영역 클릭시 close
  listenTouchEndEvent = (e) => {
    const { showUseTime } = this.state;

    if ( this.cell !== e.target && !this.cell.contains(e.target) 
      && this.timeCell !== e.target && !this.timeCell.contains(e.target) 
      && showUseTime ) {
      this.setState({ showUseTime: false });
    }
  }

  // 선택 불가 일자 Setting (이전일 및 3주 이후는 선택 불가)
  disabledDate = (current) => {
    // Can not select days before today and today
    let test =current < moment().startOf('day') || current >= moment().startOf('day').add(21,'day');
    return current < moment().startOf('day') || current > moment().startOf('day').add(21,'day');
  }

  // 선택 불가 회의 시작 시간 Setting (08~17:30시까지/ 현재 시간 이후)
  disabledHours = () => {
    let hours = [0,1,2,3,4,5,6,18,19,20,21,22,23];
    if(viewSearchDate === moment().format('YYYY-MM-DD')){
      for(let i =7; i < moment().hour(); i++){
        if(i !== 17) { // 17시는 최대 시작시간이므로 무조건 표시
          hours.push(i);
        }
      }
    }
    
    return hours;
  }

  // 현재 시간 이전 선택 불가
  disabledMinutes = (selectedHour) => {
    let minutes= [];
    if (viewSearchDate === moment().format('YYYY-MM-DD')){
      if (selectedHour === moment().hour() && moment().minute()>=30){
        minutes.push(0);
      }
    }

    if (selectedHour >= 17){
      minutes.push(30);
    }
    
    return minutes;
  }

  // 회의 일자 변경(DatePicker 부분)
  onDateChange = (value,valueString) => {
    let favYm= valueString.substring(0,4) + "." + valueString.substring(5,7);
    let favDt= valueString.substring(8,10);

    viewSearchDate = valueString;

    this.setState({
      searchDate: valueString,      
      searchFavYm: favYm,
      searchFavDt: favDt,
    });

    /*
    if(viewSearchDate === moment().format('YYYY-MM-DD') && moment(viewSearchDate + " " + viewSearchFrTime) < moment()) {
      this.searchFrTimeSet();

      if(moment(viewSearchDate + " "+ viewSearchFrTime).add(viewSearchTerm,'hour').format("HHmm") > 2100) {
        viewSearchTerm= moment.duration(moment(viewSearchDate+" 21:00").diff(moment(viewSearchDate + " "+ viewSearchFrTime))).asHours();
      
      this.searchToTimeSet();
      }
    }
    */

    this.handleSearch();
  }

  // 회의시작 시간 변경(TimePicker 부분)
  onTimeChange = (value, valueString) => {
    viewSearchFrTime= valueString;
    this.searchToTimeSet();


    if(moment(viewSearchDate + " "+ viewSearchFrTime).add(viewSearchTerm,'hour').format("HHmm") > 2100) {
      viewSearchTerm= moment.duration(moment(viewSearchDate+" 21:00").diff(moment(viewSearchDate + " "+ viewSearchFrTime))).asHours();
    }

    this.setState({
      searchTime: valueString
    });

    this.handleSearch();
  }

  // 회의 소요시간 변경(21시 이후까지는 세팅되지 않도록 Validation)
  onTermChange = (value) => {
    let term = viewSearchTerm;
    if (value === 'plus') {
      if(moment(viewSearchDate+ " " +viewSearchFrTime).add(viewSearchTerm,'hour').format("HH:mm") !== "21:00" ) {
        term= term+0.5;
      }
    } else if (value === 'minus' && viewSearchTerm > 0.5) {
      term= term-0.5;
    }

    viewSearchTerm= term;
    this.searchToTimeSet();

    this.setState({
      searchTerm: viewSearchTerm
    });

    this.handleSearch();
  }

  // 검색 위치 변경(선택하지 않을 경우 선호 위치로 조회)
  onCascaderChange = (value, selectedOptions) => {
    const {handleLoadingBookedRooms} = this.props;

    viewSearchLoc = [];
    viewSearchFloorCd =[];
    viewSearchCompCd = value[0];
    viewSearchBldgCd = value[1];
    viewSearchAllFloor = '';
    
    if(value[0]) {
      viewSearchLoc.push(value[0]+value[1]+value[2]); 
      viewSearchFloorCd.push({"COMP_ID":value[0],"BLDNG_ID":value[1],"FLOR_LOC":value[2]});

      if(value[2]===''){
        viewSearchAllFloor = 'ALL'; // 전체층 선택했을 경우
      }
      // searchTab= 'normal';
    } else {
      // searchTab= 'fav';
      viewSearchCompCd = '';
      viewSearchAllFloor = '';
      // viewSearchLoc.push(this.props.favLocList[0].COMP_ID+this.props.favLocList[0].BLDNG_ID+this.props.favLocList[0].FLOR_LOC);
      // viewSearchFloorCd = this.props.favLocList;
    }

    this.setState({
      searchCompCd: value[0],
      searchBldgCd: value[1],
      searchFloor: value[2],
    })

    this.handleSearch();
  }

  // TimeLine에 Display되는 회의 시작 시간 Validation (08~17시)
  searchFrTimeSet = () => {
    viewSearchFrTime = moment().format('mm') <= 30 ? moment().startOf("hour").format('HH:mm') : moment().startOf("hour").add(30,"minute").format('HH:mm') ;
    viewSearchFrTime = viewSearchFrTime.substring(0,2) > 17 ? "17:00" : viewSearchFrTime;
    viewSearchFrTime = viewSearchFrTime.substring(0,2) < 7 ? "07:00" : viewSearchFrTime;
  }

  // 회의 시작시간 + 소요시간이 21시를 넘지 않도록 설정
  searchToTimeSet = () => {
    viewSearchToTime= viewSearchFrTime.substring(0,2) > 17 ?  "21:00"  :
      moment(viewSearchFrTime,'HH:mm').add(viewSearchTerm,"hour").format('HH:mm');
  }

  // Sticky Area 검색일자 변경시
  onFavDateChange = (gbn) => {
    const { handleLoadingBookedRooms } = this.props;

    let favYMD= '';
    let favYm= '';
    let favDt= '';

    if (gbn === "prevDay") {
      if( viewSearchDate === moment().format('YYYY-MM-DD')) { // 오늘 이전 조회 불가
        return ;
      } 
      favYMD= moment(viewSearchDate).add(-1,"day").format("YYYY-MM-DD");
    } else if (gbn === "nextDay") {
      if( viewSearchDate === moment().add(21,'day').format('YYYY-MM-DD')) { // 21일 이후 조회 불가
        return ;
      } 
      favYMD= moment(viewSearchDate).add(+1,"day").format("YYYY-MM-DD");
    }
    
    favYm= favYMD.substring(0,4) + "." + favYMD.substring(5,7);
    favDt= favYMD.substring(8,10);
  
    this.setState({
      searchDate: favYMD,
      searchFavYm: favYm,
      searchFavDt: favDt
    })
    
    viewSearchDate= favYMD;

    if(viewSearchDate === moment().format('YYYY-MM-DD') && moment(viewSearchDate + " " + viewSearchFrTime) < moment()) {
      this.searchFrTimeSet();

      if(moment(viewSearchDate + " "+ viewSearchFrTime).add(viewSearchTerm,'hour').format("HHmm") > 2100) {
        viewSearchTerm= moment.duration(moment(viewSearchDate+" 21:00").diff(moment(viewSearchDate + " "+ viewSearchFrTime))).asHours();
      }

      this.searchToTimeSet();
    }

    handleLoadingBookedRooms(viewSearchDate, viewSearchFrTime, viewSearchToTime, viewSearchTerm, viewSearchCompCd, viewSearchBldgCd, viewSearchFloorCd, viewSearchLoc, viewSearchAllFloor, searchTab);
  }

  /* pull to refresh 대비
  handleRefresh = (resolve, reject) => {
    this.handleSearch();
    
    resolve();
  }
  */

  // 회의실 정보 펼치기 Toggle
  showRoomInfoToggle = () => {
    this.setState({
      showRoomInfo: !this.state.showRoomInfo
    });
  }

  // 검색조건(선호위치 / 검색 조건 입력) Toggle
  showDefaultToggle = () => {
    this.setState({
      showDefault: !this.state.showDefault
    });
  }

  // 전체 회의실 펼치기 Toggle
  showWholeMeetRoomToggle = () => {
    this.setState({
      showWholeMeetRoom: !this.state.showWholeMeetRoom
    });
  }

  // 소요시간 입력창 보여주기 Toggle
  showUseTimeToggle = () => {
    this.setState({
      showUseTime: !this.state.showUseTime
    });
  }

  // 회의시작시간 입력창 열기
  showTimePickerOpen = (open) => {
    this.setState({
      isTimePickerOpen: open
    });
  }

  // 회의시작시간 입력창 닫기
  showTimePickerClose = () => {
    this.setState({
      isTimePickerOpen: false
    });
  }

  // 선호위치로 재조회 클릭시
  onFavSearch = () => {
    const {
      handleLoadingBookedRooms,
      favLocList
    } = this.props;

    // searchTab='fav';
    viewSearchLoc = [];
    viewSearchCompCd = '';
    viewSearchBldgCd = '';
    viewSearchFloorCd=favLocList;
    viewSearchAllFloor='';

    this.setState ({
      locValueState: favLocList,
      showDefault: !this.state.showDefault
    });

    this.handleSearch();
  }

  // 조회
  handleSearch = () => {
    if(viewSearchDate === moment().format('YYYY-MM-DD') && moment(viewSearchDate + " " + viewSearchFrTime) < moment()) {
      this.searchFrTimeSet();

      if(moment(viewSearchDate + " "+ viewSearchFrTime).add(viewSearchTerm,'hour').format("HHmm") > 2100) {
        viewSearchTerm= moment.duration(moment(viewSearchDate+" 21:00").diff(moment(viewSearchDate + " "+ viewSearchFrTime))).asHours();
      
      this.searchToTimeSet();
      }
    }

    if (viewSearchCompCd !== '' ) {
      searchTab='normal';
    } else {
      searchTab='fav';
    }

    const {
      handleLoadingBookedRooms,
    } = this.props;

    handleLoadingBookedRooms(viewSearchDate, viewSearchFrTime, viewSearchToTime, viewSearchTerm, viewSearchCompCd, viewSearchBldgCd, viewSearchFloorCd, viewSearchLoc, viewSearchAllFloor, searchTab);
      
  }

  // TileLine의 시간 변경시 (스크롤 되지 않도록 고정시켜 놓음)
  handleTimeChange = (visibleTimeStart, visibleTimeEnd, updateScrollCanvas) => 
  {
    const viewStartTime = viewSearchFrTime.substring(0,2) >= 17 ? "17" : viewSearchFrTime.substring(0,2);
    const viewStartMinute = viewSearchFrTime.substring(0,2) >= 17 ? "00" : viewSearchFrTime.substring(3,5);

    const minTime = moment(viewSearchDate).startOf("day").add(viewStartTime,"hour").add(viewStartMinute,"minute").valueOf();//moment('2018-09-03'+'T07:00:00');
    const maxTime = moment(viewSearchDate).startOf("day").add(viewStartTime,"hour").add(4,"hour").add(viewStartMinute,"minute").valueOf();//moment('2018-09-03'+'T21:00:00');

    if (visibleTimeStart < minTime && visibleTimeEnd > maxTime) {
      updateScrollCanvas(minTime, maxTime)
    } else if (visibleTimeStart < minTime) {
      updateScrollCanvas(minTime, minTime + (visibleTimeEnd - visibleTimeStart))
    } else if (visibleTimeEnd > maxTime) {
      updateScrollCanvas(maxTime - (visibleTimeEnd - visibleTimeStart), maxTime)
    } else {
      updateScrollCanvas(visibleTimeStart, visibleTimeEnd)    
    }
  }

  // 예약된 내역(Item) 클릭시 예약 정보 보여주기
  onBookedItemClick = (itemId, e, time) => {
    resMrReqNo= itemId;

    this.setState({
      isResDetailModalShow: true
    })
  }

  // TimeLine의 예약 가능 시간 클릭시 신규 예약 모달 보여주기
  handleCanvasClick = (groupid, time, e) =>  {
    const {allBookedRoomList} = this.props;
    let avbFrTime = '';
    let tmpTime = moment(time).format("mm") >= 30 ? moment(time).startOf('hour').add(30,'minute') : moment(time).startOf('hour');
    let bookTime = moment(tmpTime).format("HH:mm");
    let bookToTime = moment(bookTime,'HH:mm').add(viewSearchTerm,"hour").format('HH:mm');
    let spaceChk = '';

    if( groupid.indexOf('TL_GROUP_') === -1 ) {
      for(let i= 0 ; i < allBookedRoomList.length ; i++ ) {
        if(allBookedRoomList[i].MR_REG_NO === groupid && avbFrTime === '' ) {
          let nextFrTime = moment(allBookedRoomList[i].RSVR_FR);
          let nextToTime = moment(allBookedRoomList[i].RSVR_TO);
          if(nextFrTime >= moment(tmpTime)) {
            avbFrTime = moment(allBookedRoomList[i].RSVR_FR).format("YYYY-MM-DD HH:mm");
          }
          if( nextFrTime <= time && time < nextToTime ) { // 예약 사이 좁은 여백 클릭시 오동작 방지
            spaceChk= allBookedRoomList[i].MR_REQST_NO;
          }
        }
      }

      if(spaceChk !== '') {
        this.onBookedItemClick(spaceChk , time, e);
        return;
      }

      if(avbFrTime === '') {
        avbFrTime = moment(viewSearchDate).startOf("day").add(21,"hour").format("YYYY-MM-DD HH:mm");
      }
      
      if(moment(viewSearchDate + " " + bookToTime) >= moment(avbFrTime))
      {
        bookToTime = moment(avbFrTime).format("HH:mm");
      }

      limitResTime = avbFrTime;
      resFrHH = bookTime.substring(0,2);
      resFrMi = bookTime.substring(3,5);
      resToHH = bookToTime.substring(0,2);
      resToMi = bookToTime.substring(3,5);
      resMrRegNo = groupid;

      searchData = {
        searchDate: viewSearchDate,
        searchFrTime: viewSearchFrTime,
        searchToTime: viewSearchToTime,
        searchTerm: viewSearchTerm,
        searchLoc: viewSearchLoc,
        searchCompCd: viewSearchCompCd,
        searchBldgCd: viewSearchBldgCd,
        searchFloor: viewSearchFloorCd,
        searchAllFloor: viewSearchAllFloor,
        searchTab: searchTab, 
      };
      
      this.setState({
        isResModalShow: true
      })
    }

  }

  // 신규 예약 모달 닫기
  closeResModal = () => {
    this.setState({
      isResModalShow: false
    })
  }

  // 기존 예약 정보 모달 닫기
  closeResDetailModal = () => {
    this.setState({
      isResDetailModalShow: false
    })
  }

  // 선호위치 설정 클릭
  onFavLocClick = () => {    
    const { history } = this.props;
    const pathArray = history.location.pathname.split('/');
    const singlePathname = '/sm/bookroom/FavoriteLocation';
    const appsPathname = '/apps/bookroom/FavoriteLocation';
    checkMode(history, pathArray, singlePathname, appsPathname);
  }

  // 기본 검색바에 보여줄 회의실 명 Mapping
  makeSearchLocNm = (value) => {
    const { compList, bldgList } = this.props;

    let tmpList =[];
    let tmpComp ='';
    let tmpBldng ='';
    for(let i=0; i<value.length; i++){
      for(let j=0; j <compList.length; j++)
      {
        if(value[i].COMP_ID === compList[j].CM_CODE){
          tmpComp=compList[j].CD_NM
        }
      }
      for(let k=0; k <bldgList.length; k++)
      {
        if(value[i].BLDNG_ID === bldgList[k].CM_CODE){
          tmpBldng=bldgList[k].CD_NM
        }
      }
      tmpList.push( 
        <dl key={"tmpList"+i}> 
          <dd key={"comp"+i}>{tmpComp}</dd> 
          <dd key={"bldng"+i}>{tmpBldng}</dd> 
          <dd key={"flor"+i}>{value[i].FLOR_LOC === '' ? '전체' : `${value[i].FLOR_LOC}층`}</dd> 
        </dl>
      );
    }

    return tmpList;
  }

  // 회의 소요시간 Format 만들기
  makeSearchTermNm = (value) => {
    let tmp= moment().startOf('day').add(value,'hour');
    let hour= moment(tmp).format('HH') >= 10 ? moment(tmp).format('HH').substring(0,2) : moment(tmp).format('HH').substring(1,2);
    let minute= moment(tmp).format('mm') > 0 ? moment(tmp).format('mm') + '분' : '';

    tmp= hour + "시간 " + minute;

    return tmp;
  }

  // TileLine Group 생성(회의실 리스트)
  createTimeLineGroup = (groups) => {
    let MeetRoomTmp= [];
    const showInfo = this.state.showRoomInfo ? 'block' : 'none';

    if (groups.length > 0 ) {
      groups.map(meetrooms => MeetRoomTmp.push({
        id: meetrooms.MR_REG_NO,
        isGroup: meetrooms.ISGROUP,
        title: (
          <div className={meetrooms.ISGROUP !== 0 ? "room-info" : ""}> 
            <span className={meetrooms.ISGROUP !== 0 ? "room-name" : ""}>{meetrooms.MR_NM}</span> 
            {meetrooms.ISGROUP !== 0 ? 
              <div className={this.state.showRoomInfo ? "info-legend-room active" :  "info-legend-room"}> 
                <ul>
                  {meetrooms.RR_NOTI_YN === 'Y' &&  meetrooms.RR_NOTI_DESC !== '' &&  meetrooms.RR_NOTI_DESC !== null ?
                    <li className="notice">
                      <Popover
                        popupClassName="br-now"
                        placement="bottomLeft"
                        content={
                          <p className="notice">{meetrooms.RR_NOTI_DESC}</p>
                        }
                        trigger="click"
                      >
                        <button>Notice</button>
                      </Popover>
                    </li> :
                    <li></li>
                  }
                  <li className="view-map"><button onClick={() => console.log("지도 기능 준비중")}>지도보기</button></li>
                  <li className="tool"><span className="person">정원</span> <span className="number">{meetrooms.CHAIR_DESC}</span></li>
                  {/* 프로젝터 PC 콜정보 등은 유무에 따라 yes, no 토글 */}
                  <li className="tool"><span className={meetrooms.BEAN_DESC > 0 ? "projector" : "projector no"}>빔 프로젝트</span></li>
                  <li className="tool"><span className={meetrooms.PC_DESC > 0 ?  "pc" : "pc no"}>PC</span></li>
                  <li className="tool"><span className={meetrooms.CR_CALL_NO !=='' && meetrooms.CR_CALL_NO != null ? "call-conference" : "call-conference no"} >컨퍼런스 콜</span></li>
                  <li className="tool video"><span className={meetrooms.VIDEO_YN === 'Y' ? "video-conference" : "video-conference no"} >화상회의</span></li>
                </ul> 
              </div>  : '' }
          </div>
        ),
        height: meetrooms.ISGROUP === 0 ? 24 : 50
      }));
    }
    
    return MeetRoomTmp;
  } 

  // TimeLine Item 생성(예약된 내역)
  createTimeLineItems = (items, loc) => {
    let BookedRoomTmp= [];
    if ( items.length > 0 ) {
      items.map(bookedrooms => BookedRoomTmp.push({
        id:bookedrooms.MR_REQST_NO,
        group : bookedrooms.MR_REG_NO,
        // title: moment.duration(moment().diff(moment(bookedrooms.RSVR_FR))).asMinutes(),
        start_time: moment(bookedrooms.RSVR_FR),
        end_time: moment(bookedrooms.RSVR_TO),
        style : 
          {
            backgroundColor: 
              (loc==='EXP' && ( Math.abs(moment.duration(moment().diff(moment(bookedrooms.RSVR_FR))).asMinutes()) <= 10 )) ? '#FFD740' 
              : bookedrooms.MY_RSVR_YN === 'Y' ? '#05C0A8': '#999999',
            opacity: 0.7,
            borderRadius: '2px'
          },
      })
      )
    }

    return BookedRoomTmp;
  }

  // TimeLine 생성 (Group + Item)
  createTimeLine = (groups, items, loc) => {
    // let TimeLineTitle = loc ==='EXP'? '자동취소 임박' : loc==='WHOLE' ? '전체 회의실' : '';
    let TimeLineTitle = '';

    if (groups.length > 0 ) {
      const viewStartTime = viewSearchFrTime.substring(0,2) >= 17 ? "17" : viewSearchFrTime.substring(0,2);
      const viewStartMinute = viewSearchFrTime.substring(0,2) >= 17 ? "00" : viewSearchFrTime.substring(3,5);

      const defaultFromTime = new Number(moment(viewSearchDate).startOf("day").add(viewStartTime,"hour").add(viewStartMinute,"minute").valueOf());//moment('2018-09-03'+'T07:00:00');
      const defaultToTime = new Number(moment(viewSearchDate).startOf("day").add(viewStartTime,"hour").add(4,"hour").add(viewStartMinute,"minute").valueOf());//moment('2018-09-03'+'T21:00:00');
      console.log('$$$ pageX', ReactDOM.findDOMNode(this.refs.stickyArea).getBoundingClientRect().y);
      
      return (
        <div>          
          <Timeline
            title={TimeLineTitle}
            groups={groups}
            items={items}
            visibleTimeStart={Number(defaultFromTime)}
            visibleTimeEnd={Number(defaultToTime)}
            defaultTimeStart={defaultFromTime}
            defaultTimeEnd={defaultToTime}
            canvasTimeStart={defaultFromTime}
            canvasTimeEnd={defaultToTime}
            sidebarWidth={this.state.showRoomInfo ? window.innerWidth : 120}
            sidebarContent={TimeLineTitle}
            onCanvasClick={this.handleCanvasClick}
            traditionalZoom={false}
            timeSteps={{minute:30,hour:1,day:1,month:1,year:1}}
            onTimeChange={this.handleTimeChange}
            itemHeightRatio={0.92}
            lineHeight={50}
            minZoom={60*60*12}
            maxZoom={60*60*12}
            useResizeHandle={false}
            resizeDetector={containerResizeDetector}
            // onItemSelect={this.onBookedItemClick}
            onItemClick={this.onBookedItemClick}
            itemTouchSendsClick={true}
            /*
            stickyHeader={loc === 'AVB' ? true : false }
            stickyOffset={loc === 'AVB' ? 30 : 0 }
            headerLabelHeight={loc === 'AVB' ? 40 : 0 }
            */
            stickyHeader={true}
            stickyOffset={this.props.isLoading ? 125-window.pageX : 125} // haeder 40 + sticky table-info 영역 85
            headerLabelHeight={20}
            headerLabelGroupHeight={0}
          >
            <TimelineMarkers>
              <CustomMarker date={Number(moment())}>
                {/* custom renderer for this marker */}
                {({ styles, date }) => {
                  const customStyles = {
                    ...styles,
                    backgroundColor: 'red',
                    width: '2px',
                  }
                  return <div style={customStyles} />
                }}
              </CustomMarker>
            </TimelineMarkers>
          </Timeline>
        </div>
      );
    } else if (loc === 'AVB') {  // 예약 가능한 회의실 없을 경우
      return (
          <div className="no-result"> 
          {/* 조회결과 없음 추가  */} 
            <p>조건에 만족하는 예약가능한<br />회의실이 없습니다.</p> 
          </div>
      )
    }

    return;
  }
  
  render() {
    const { allBookedRoomList, avbMeetRoomList, expMeetRoomList, wholeMeetRoomList ,favLocList, compList, bldgList, floorList} = this.props;

    // 토글 설정
    const showSelectedRoom = this.state.showDefault ? 'selected-room active' : 'selected-room';
    const showSearchRoom = this.state.showDefault ? 'search-room' : 'search-room active';
    const showUseTime = this.state.showUseTime ? 'use-time active' : 'use-time';
    const showUseTimePop = this.state.showUseTime ? 'use-time-select-pop active' : 'use-time-select-pop';
    const showWholeMeetRoom = this.state.showWholeMeetRoom ? 'view-all active' : 'view-all';
    //const isSticky = this.state.isSticky ? 'br-now sticky' : 'br-now';

    // 화면에 보여줄 회의실명/소요시간 Format
    const searchLocNm = this.makeSearchLocNm(viewSearchFloorCd);
    const searchTermNm = this.makeSearchTermNm(viewSearchTerm);

    // 검색 위치(Cascader) Option 만들기
    let roomCascader ='';
    const placeHolderText='선택하지 않을 경우 선호위치로 조회됩니다.';
    if(compList) {
      roomCascader = CommonParamAllFloor(compList, bldgList, floorList);
    }

    // 전체 예약 내역
    const allBookedRooms= this.createTimeLineItems(allBookedRoomList, 'ALL');

    // 취소 임박 내역(색깔을 다르게 주기 위해 별도 생성)
    const expiredBookedRooms= this.createTimeLineItems(allBookedRoomList , 'EXP');

    // 예약 가능 회의실 타임라인 생성
    const avbMeetRooms = this.createTimeLineGroup(avbMeetRoomList);
    const avbTimeLine = this.createTimeLine(avbMeetRooms, allBookedRooms, 'AVB');

    // 자동취소 임박 회의실 타임라인 생성
    const expMeetRooms = this.createTimeLineGroup(expMeetRoomList);
    const expTimeLine = this.createTimeLine(expMeetRooms, expiredBookedRooms, 'EXP');

    // 전체 회의실 보기 타임라인 생성
    const wholeMeetRooms = this.createTimeLineGroup(wholeMeetRoomList);
    const wholeTimeLine = this.createTimeLine(wholeMeetRooms, allBookedRooms, 'WHOLE');

    // 회의 시작시간 및 소요시간 설정
    const fromTime = moment(viewSearchFrTime,'HH:mm');
    const termCalTime = Number(viewSearchFrTime.substring(0,2))+(viewSearchFrTime.substring(3,5)/60);

    const toolContent = (
      <ul className="info-popover">
        <li className="projector">빔프로젝터</li>
        <li className="call-conference">컨퍼런스 콜</li>
        <li className="pc">PC</li>
        <li className="video-conference">화상회의</li>
      </ul>
    );

    return (
      <div ref={bookRoomMain}>
        <StyleBookroom>
          <section className="br-now">
            {/* pull to refresh 대비
            <ReactPullToRefresh
              className=""
              onRefresh={this.handleRefresh}
              distanceToRefresh={40}
            >
              <div style={{position : 'fixed',  top:0, zIndex:2000}}> 당기세요~~ 
              </div>
            </ReactPullToRefresh>
            */}
            <header ref='bookRoomTitle'>
              <span className="btn-home">Home</span>
              <h1>회의 NOW</h1>
            </header>
            <main className="br-now-main">
              <section className="room-setting">
                {/* 아래 토글버튼 클릭시 'selected-room', 'search-room' ---> toggleClass 'active' */}
                <div className={showSelectedRoom} ref="selectRoomArea">
                  <div className="container">
                    <ul>
                      <li className="date">{moment(viewSearchDate).format('YYYY-MM-DD (ddd)')}</li>
                      <li className="time">{viewSearchFrTime} 
                        <dl>
                          <dt>소요시간</dt>
                          <dd>{searchTermNm}</dd>
                        </dl>
                      </li>
                      <li className="location">
                        {searchLocNm}
                      </li>
                    </ul>
                  </div>
                </div>
                <div className={showSearchRoom} ref="searchRoomArea">
                  <div className="container">
                    <ul>
                      <li className="date">
                        <DatePicker
                          locale={locale}
                          dropdownClassName="br-now"
                          onChange={this.onDateChange}
                          style={{width:"100%"}}
                          value={moment(viewSearchDate)}
                          allowClear={false}
                          disabledDate={this.disabledDate}
                        />
                      </li>
                      <li className="time">
                        <div className="start-time">
                          <TimePicker
                            popupClassName="br-now"
                            open={this.state.isTimePickerOpen}
                            onOpenChange={this.showTimePickerOpen}
                            value={fromTime}
                            format={'HH:mm'}
                            minuteStep= {30}
                            allowClear={false}
                            onChange={this.onTimeChange}
                            disabledHours={this.disabledHours}
                            disabledMinutes={this.disabledMinutes}
                            hideDisabledOptions={true}
                            inputReadOnly={true}
                            addon={() => (
                              <Button className="btn-confirm" onClick={this.showTimePickerClose}>
                                적용
                              </Button>
                            )}
                          />
                        </div>
                        <div className={showUseTime} ref={node => (this.timeCell = node)} onClick={this.showUseTimeToggle}>
                          {/* use-time 클릭시 addClass 'active' */}
                          <dl>
                            <dt>소요시간</dt>
                            <dd>{searchTermNm}</dd>
                          </dl>                          
                        </div>
                        {/* 시간 선택 popover */}
                        <div className={showUseTimePop} id="useTimePop" ref={node => (this.cell = node)} >
                          <Button className="down" onClick={() => this.onTermChange('minus')}>-</Button>
                          <span className="use-time-input">{searchTermNm}</span>
                          <Button className="up" onClick={() => this.onTermChange('plus')}>+</Button>
                          <div className="btn-area">
                            <Button className="btn-confirm" onClick={this.showUseTimeToggle}>적용</Button>
                          </div>
                        </div>
                        {/*  */}
                      </li>
                      <li className="location">
                        <Cascader
                          popupClassName="br-now"
                          options={roomCascader}
                          changeOnSelect={false}
                          style={{width: '100%'}}
                          placeholder={placeHolderText}
                          allowClear={true}
                          onChange={this.onCascaderChange}
                          value={viewSearchCompCd !== '' && viewSearchFloorCd.length > 0 && searchTab !== 'fav' ? [viewSearchFloorCd[0].COMP_ID,viewSearchFloorCd[0].BLDNG_ID,viewSearchFloorCd[0].FLOR_LOC] : []}
                        />
                      </li>
                    </ul>
                    <div className="btn-area">
                      <Button className="research" onClick={this.onFavSearch}>선호위치로 재조회</Button>
                      <Button className="reset" onClick={this.onFavLocClick}>선호위치설정</Button>
                    </div>
                  </div>
                  {/* 필터 기능 현재 구현 안 함
                  <aside className="option-group">
                    <div className="container">
                      <CheckboxGroup options={plainOptions} />
                      <Radio.Group defaultValue="a" buttonStyle="solid">
                        <Radio.Button value="a">인원</Radio.Button>
                        <Radio.Button value="b">기자재</Radio.Button>
                        <Radio.Button value="c">용도</Radio.Button>
                      </Radio.Group> 
                    </div>
                  </aside>
                  */}
                </div>
                {/* 토글버튼 */}
                <button className="btn-toggle" onClick={this.showDefaultToggle} ref="toggleBtn">toggle</button>
                {/*  */}
              </section>

              {/* sticky 영역 height=105px */}
              <section className="table-info" ref="stickyArea">
                <div className="virtual-area">
                </div>
                <div className="container">
                  <div className="date-setting">
                    <Button
                      className="prev" 
                      disabled= { viewSearchDate === moment().format('YYYY-MM-DD') ? true : false }
                      onClick={() => this.onFavDateChange('prevDay')} 
                    >
                      이전
                    </Button>
                    <Button
                      className="next"
                      disabled= { viewSearchDate === moment().add(21,'day').format('YYYY-MM-DD') ? true : false }  
                      onClick={() => this.onFavDateChange('nextDay')}
                    >
                      다음
                    </Button>
                    <span className="selected-date">{moment(viewSearchDate).format('YYYY-MM-DD (ddd)')}</span>
                  </div>
                  <div className="info-tool">
                    <button onClick={this.showRoomInfoToggle}>
                      { this.state.showRoomInfo ? '회의실 정보 접기' : '회의실 정보 펼치기' }
                    </button>
                  </div>
                  {/* 기자재 정보 보기 - hidden 했다가 회의실 정보 펼치기 시 visible */}
                  <div className="info-legend">
                    기자재
                    <Popover popupClassName="br-now" placement="bottom" content={toolContent} trigger="click">
                      <button>정보보기</button>
                    </Popover>
                  </div>
                  {/*  */}
                </div>
              </section>

              {/* Time Table 시작 */}
              <section className={`time-table ${this.props.isLoading ? 'ant-spin-blur' : ''}`}>
                <div className="container" >
                  <div className="time-table-item">
                    <div className="time-line-area">
                      {avbTimeLine}
                    </div>
                  </div>
                  {expMeetRoomList.length > 0
                        && viewSearchDate === moment().format('YYYY-MM-DD')
                        && 0 <= moment.duration(moment().diff(moment(viewSearchDate+' '+viewSearchFrTime,'YYYY-MM-DD HH:mm'))).asMinutes() <= 10 ?
                    <div className="time-table-item">
                      <h2>자동취소 임박</h2>
                      <div className="time-line-area">
                        { expTimeLine } 
                      </div>
                    </div> : ''
                  }
                  {wholeMeetRoomList.length > 0 ?
                    <div>
                      <div className="btn-area">
                        <Button className={showWholeMeetRoom} onClick={this.showWholeMeetRoomToggle}>회의실 전체보기</Button>
                      </div>
                      <div className="time-table-item">
                        <div className="time-line-area">
                          {wholeMeetRoomList.length > 0 && this.state.showWholeMeetRoom? wholeTimeLine : ''}
                        </div>
                      </div> 
                    </div> 
                    : ''
                  }
                </div>
              </section>
            </main>
          </section>
          
          <div>
            <ReservationModal
                isShow={ this.state.isResModalShow }
                setIsShow= { this.closeResModal }
                reservationData =  { {
                  mrRegNo: resMrRegNo,
                  rsvrFrDd: viewSearchDate,
                  rsvrFrHh: resFrHH,
                  rsvrFrMi: resFrMi,
                  rsvrToDd: viewSearchDate,
                  rsvrToHh: resToHH,
                  rsvrToMi: resToMi,
                  day: moment(viewSearchDate).format('ddd'),
                  limitTime: limitResTime}
                }
                searchData = {searchData}
                view={this.props.view}
            />
          </div>
          <div>
            <ReservationDetailModal
              isShow={ this.state.isResDetailModalShow }
              setIsShow= { this.closeResDetailModal }
              mrReqNo = {resMrReqNo}
              view={this.props.view}
              searchData = {searchData}
            />
          </div>
        </StyleBookroom>
      </div>
    );
  }
}

TimeTable.propTypes = {
  allBookedRoomList: PropTypes.array,
  avbMeetRoomList: PropTypes.array,
  expMeetRoomList: PropTypes.array,
  wholeMeetRoomList: PropTypes.array,
  handleSearch: PropTypes.func,
  compList: PropTypes.array,
  bldgList: PropTypes.array,
  floorList: PropTypes.array,
  historyPush: PropTypes.func,
  favLocList : PropTypes.array,
  history: PropTypes.object,
  view: PropTypes.string.isRequired,
  loadingOn: PropTypes.func.isRequired,
  favCheck: PropTypes.string.isRequired,
  isLoading: PropTypes.bool,
};

TimeTable.defaultProps = {
  allBookedRoomList: [],
  avbMeetRoomList: [],
  expMeetRoomList: [],
  wholeMeetRoomList: [],
  compList: [],
  bldgList: [],
  floorList: [] ,
  favLocList: [],
  favCheck: '',
}

const mapStateToProps = createStructuredSelector({
  allBookedRoomList: selectors.makeAllBookedRoomList(),
  avbMeetRoomList: selectors.makeAvbMeetRoomList(),
  expMeetRoomList: selectors.makeExpMeetRoomList(),
  wholeMeetRoomList: selectors.makeWholeMeetRoomList(),
  compList : selectors.makeCompParams(),
  bldgList : selectors.makeBldgParams(),
  floorList : selectors.makeFloorParams(),
  favLocList : selectors.makeFavLocList(),
  view: selectors.makeSelectView(),
  favCheck: selectors.makeFavCheck(),
  isLoading: selectors.makeIsLoading(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingBookedRooms: (searchDate, searchFrTime, searchToTime, searchTerm, searchCompCd, searchBldgCd, searchFloor, searchLoc, searchAllFloor, searchTab) => dispatch(actions.loadingBookedRooms(searchDate, searchFrTime, searchToTime, searchTerm, searchCompCd, searchBldgCd, searchFloor, searchLoc, searchAllFloor, searchTab)),
    handleLoadingParam: () => dispatch(actions.loadingParam()),
    handleLoadingFavoriteLocList: (history) => dispatch(actions.loadingFavoriteLocList(history)),
    historyPush: url => dispatch(push(url)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'bookroom', reducer });
const withSaga = injectSaga({ key: 'bookroom', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(wrap(TimeTable));
