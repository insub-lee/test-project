import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
// import injectSaga from 'utils/injectSaga';
// import { createStructuredSelector } from 'reselect';
// import injectReducer from 'utils/injectReducer';
import { Button } from 'antd';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import excelImg from 'images/common/excel.png';
// import * as feed from 'components/Feedback/functions';
import Grid from './grid.js';
// import { BtnSearchDkBlue } from '../buttons.style';
import * as actions from '../informNote/actions';
import * as selectors from '../informNote/selectors';
// import * as authSelectors from 'containers/common/Auth/selectors';
import * as informNoteSelectors from '../informNote/selectors';
// import * as selectors from '../selectors';
// import reducer from '../reducer';
// import saga from '../saga';
// eslint-disable-next-line react/prefer-stateless-function

class InformNoteList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      eqid: undefined,
      // isExcelDown: false,
      informNoteList: this.props.informNoteDataList.informNoteList,
      selectList: this.props.userGridDefineList.selectList,
    };
  }

  componentWillReceiveProps(nextProps) {
    console.log('componentWillReceiveProps', nextProps.userGridDefineList);
    this.setState({ informNoteList: nextProps.informNoteDataList.informNoteList, selectList: nextProps.userGridDefineList.selectList });
  }

  componentDidMount() {
    window.addEventListener('message', this.onReceiveMessage, false);
  }

  componentWillUnmount = () => {
    window.removeEventListener('message');
  }

  onReceiveMessage = (event) => {
    if (event.data.indexOf('CommonInformnoteGridColumSetPopup') > -1) {
      let empNo = event.data.split(':'); 
      console.log(empNo[1]);
      const param = {
        PARAM_EMP_NUM: empNo[1],
        PARAM_SCR_NUM: 'INFORM NOTE LIST GRID',
        PARAM_DEFINE_GUBUN: 'G',
      };
      this.props.handleGridColumnSearch(param);
    }
  }

  onSelectionChanged = (event) => {
    this.setState({
      eqid: event,
    });
  }

  handleMove = () => {
    const {
      eqid
    } = this.state;
    // feed.warning(eqid);
    this.props.move(eqid);
  }
  handleExcelDownload = () => {
    this.props.excelDown();
  }
  handleSearchList = () => {
    const { profile } = this.props;
    // const url = '/hypm/popup/searchlist';
    // const h = 840;
    // const w = 600;
    // window.open(url, 'InformNoteList', 'width=600,height=840,toolbar=no,status=no,menubar=no,scrollbars=yes, resizable=yes, location=no');
    // window.open(`/sm/informNote/pop/CommonInformnoteGridColumSetPopup/${this.props.profile.EMP_NO}`, 'CommonInformnoteGridColumSetPopup', 'width=650,height=830');
    window.open('/sm/informNote/pop/CommonInformnoteGridColumSetPopup/' + profile.EMP_NO, 'CommonInformnoteGridColumSetPopup', 'width=650,height=830');
  }

  render() {
    const { informNoteList, selectList } = this.state;
    const count = informNoteList ? informNoteList.length : 0;

    return (
      <div>
        <div className="searchNoteListLayer" style={{ marginLeft: '73%', marginBottom: '5px', marginTop: '5px' }}>
          <Button type="primary" className="btn-normal" onClick={this.handleSearchList} >조회 리스트 설정</Button>
          <Button type="primary" className="btn-normal">장기데이터 Download요청</Button>
          <Button type="primary" className="btn-apply detail-move" onClick={this.handleMove} >상세이동</Button>
          <Button type="primary" className="btn-apply excel" onClick={this.handleExcelDownload} >엑셀</Button>
        </div>
        <Grid
          informNoteList={informNoteList}
          handleSelected={this.onSelectionChanged}
          // isExcelDownload={this.state.isExcelDown}
          selectColumn={selectList}
        />
        <div>총 건수: <span style={{ fontWeight: 'bold' }}>{count}</span></div>
      </div>
    );
  }
}
InformNoteList.propTypes = {
  profile: PropTypes.object,
  informNoteDataList: PropTypes.array,
  move: PropTypes.func.isRequired,
  userGridDefineList: PropTypes.array,
};

InformNoteList.defaultProps = {
  profile: {},
  informNoteDataList: [],
  userGridDefineList: [],
};

const mapStateToProps = createStructuredSelector({
  profile: selectors.makeSelectProfile(),
  informNoteDataList: informNoteSelectors.makeInforNoteDataList(),
  userGridDefineList: informNoteSelectors.makeUserGridDefineList(),
  // profile: authSelectors.makeSelectProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // handleNoteDetail: value => dispatch(actions.moveNoteDetail(value)),
    handleGridColumnSearch: param => dispatch(actions.gridColumnSearch(param)),
  };
}

const withConnect = connect(mapStateToProps, mapDispatchToProps); // , null, { withRef: true }

export default compose(withConnect)(InformNoteList);
