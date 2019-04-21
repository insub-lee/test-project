import React from 'react';
import PropTypes from 'prop-types';
import { Button, Cascader } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { checkMode } from 'utils/commonUtils'
import * as actions from './actions';
import * as selectors from './selectors';
import injectSaga from '../../../utils/injectSaga';
import injectReducer from '../../../utils/injectReducer';
import reducer from './reducer';
import saga from './saga';
import { CommonParam3 } from '../Component/CommonParam';
import '../common/style/bookroom.css';
import StyleBookroom from '../common/style/styleBookroom';


let myStorage = window.localStorage;
let storage = window['localStorage'];
let viewLocList = [{"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""},{"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""},{"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""}];

/*egss bookroom*/
class FavoriteLoc extends React.Component {
  constructor(props) {
    super(props);
    const {
      handleLoadingParam,
      handleLoadingFavLoc,
    } = props;

    handleLoadingParam();
    handleLoadingFavLoc();

  }

  state={
    locValueState: [],
    initProps: []
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if(prevState.initProps !== nextProps.favLocList) {
      const {favLocList} = nextProps;
      viewLocList = [];
      favLocList.map(list => viewLocList.push({"COMP_ID":list.COMP_ID, "BLDNG_ID":list.BLDNG_ID, "FLOR_LOC":list.FLOR_LOC}));

      const favLen= favLocList.length;
      for(let i=0; i<3-favLen; i++){
        viewLocList.push({"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""});
      }

      return {
        initProps: nextProps.favLocList
      };
    }

    return null;
  }

  onCascaderChange1 = (value) => {
    if (value[0] === undefined) {
      viewLocList[0]= {"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""};
    } else {
      viewLocList[0]= {"COMP_ID":value[0],"BLDNG_ID":value[1],"FLOR_LOC":value[2]};
    }
        
    this.setState({
        locValueState:value
    })
  }

  onCascaderChange2 = (value) => {
    if (value[0] === undefined) {
      viewLocList[1]= {"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""};
    } else {
      viewLocList[1]= {"COMP_ID":value[0],"BLDNG_ID":value[1],"FLOR_LOC":value[2]};
    }
        
    this.setState({
        locValueState:value
    })
  }

  onCascaderChange3 = (value) => {
    if (value[0] === undefined ) {
      viewLocList[2]= {"COMP_ID":"","BLDNG_ID":"","FLOR_LOC":""};
    } else {
      viewLocList[2]= {"COMP_ID":value[0],"BLDNG_ID":value[1],"FLOR_LOC":value[2]};
    }
        
    this.setState({
        locValueState:value
    })
  }

  saveFavLoc = () => {
    if (viewLocList[0].COMP_ID === '' && viewLocList[1].COMP_ID === '' && viewLocList[2].COMP_ID === '' ) {
      alert("선호 위치가 설정되지 않았습니다.")
      return;
    }

    const {
      handleSaveFavLoc,
    } = this.props;

    handleSaveFavLoc(viewLocList, this.props.history);
  }

  cancleFavLoc = () => {
    const {
      favLocList,
      history,
    } = this.props;
    const pathArray = history.location.pathname.split('/');
    const singlePathname = '/sm/bookroom/TimeTable';
    const appsPathname = '/apps/bookroom/TimeTable';

    if(favLocList.length === 0) {
      alert("선호 위치가 설정되지 않았습니다.")
      return;
    }
    checkMode(history, pathArray, singlePathname, appsPathname);
  }

  render() {
    const { compList, bldgList, floorList } = this.props;

    let roomCascader= '';
    const placeHolderText= '사업장/건물/층을 선택해주세요';
    if(compList) {
      roomCascader = CommonParam3(compList, bldgList, floorList);
    }

    return (
      <div>
        <StyleBookroom>
          <section className="br-now">
            <header>
              <span className="btn-home">Home</span>
              {/* 추후 홈 버튼으로 바꾸겠음. 현재 아이콘 없음 */}
              <h1>회의 NOW</h1>
            </header>
            <main className="favor-select">
              <div className="container">
                <h2>회의시 선호하는 건물과 층을 <br />설정해주세요</h2>
                <p>설정하시는 건물과 층이 기본조회 조건으로<br /> 사용됩니다. 최대 3개까지 선택 가능하며 추후<br /> [선호 위치 설정]에서 수정가능합니다.</p>
                <ul className="select-area">
                  <li>
                    <Cascader
                      popupClassName="br-now"
                      options={roomCascader}
                      changeOnSelect={false}
                      style={{width: '100%'}}
                      placeholder={placeHolderText}
                      allowClear={true}
                      onChange={this.onCascaderChange1}
                      value={viewLocList.length > 0 && viewLocList[0].COMP_ID !== '' && viewLocList[1].COMP_ID !== null ? [viewLocList[0].COMP_ID, viewLocList[0].BLDNG_ID, viewLocList[0].FLOR_LOC] : []}
                      cascaderwidth='100%'
                    />
                  </li>
                  <li>
                    <Cascader
                      popupClassName="br-now"
                      options={roomCascader}
                      changeOnSelect={false}
                      style={{width: '100%'}}
                      placeholder={placeHolderText}
                      allowClear={true}
                      onChange={this.onCascaderChange2}
                      value={viewLocList.length > 1 && viewLocList[1].COMP_ID !== '' && viewLocList[1].COMP_ID !== null ? [viewLocList[1].COMP_ID, viewLocList[1].BLDNG_ID, viewLocList[1].FLOR_LOC] : []}
                      cascaderwidth='100%'
                    />
                  </li>
                  <li>
                    <Cascader
                      popupClassName="br-now"
                      options={roomCascader}
                      changeOnSelect={false}
                      style={{width: '100%'}}
                      placeholder={placeHolderText}
                      allowClear={true}
                      onChange={this.onCascaderChange3}
                      value={viewLocList.length > 2 && viewLocList[2].COMP_ID !== '' && viewLocList[1].COMP_ID !== null ? [viewLocList[2].COMP_ID, viewLocList[2].BLDNG_ID, viewLocList[2].FLOR_LOC] : []}
                      cascaderwidth='100%'
                    />
                  </li>
                </ul>
                <div className="btn-area">
                  <Button className="btn-cancel"  onClick={this.cancleFavLoc}>취소</Button>
                  <Button className="btn-confirm" onClick={this.saveFavLoc}>확인</Button>
                </div>
              </div>
            </main>
          </section>
        </StyleBookroom>
      </div>
    );
  }
}

FavoriteLoc.propTypes = {
  compList: PropTypes.array,
  bldgList: PropTypes.array,
  floorList: PropTypes.array,
  history: PropTypes.object,
  favLocist: PropTypes.array,
  handleLoadingParam: PropTypes.func,
  handleLoadingFavLoc: PropTypes.func,
};

FavoriteLoc.defaultProps = {
  favLocList: [],
  compList: [],
  bldgList: [],
  floorList: [],
}

const mapStateToProps = createStructuredSelector({
  favLocList: selectors.makeFavLoc(),
  compList: selectors.makeCompParams(),
  bldgList: selectors.makeBldgParams(),
  floorList: selectors.makeFloorParams(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSaveFavLoc: ( favLocList, history ) =>
                        dispatch(actions.saveFavLoc( favLocList, history)),
    handleLoadingParam: () => dispatch(actions.loadingParam()),
    handleLoadingFavLoc: () => dispatch(actions.loadingFavLoc()),
  };
}

const withReducer = injectReducer({ key: 'FavoriteLoc', reducer });
const withSaga = injectSaga({ key: 'FavoriteLoc', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(FavoriteLoc);

