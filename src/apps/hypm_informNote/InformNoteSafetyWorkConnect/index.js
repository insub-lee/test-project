import React, { PureComponent } from 'react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import { Button, Input } from 'antd';
import PropTypes from 'prop-types';
import { DatePicker} from 'containers/guide/components/Article/Abstraction/portalComponents';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import { connect } from 'react-redux';
import { compose } from 'redux';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import SafeWorkPopupGrid from './safeWorkPopupGrid';

const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class InformNoteSafetyWork extends PureComponent {
  constructor(props) {
    super(props);
    const now = moment();
    this.state = {
      IV_GSTRP_BEG: '',
      IV_GSTRP_END: '',
      workNo: '',
      workGrade: '',
      resp: '',
      searchDt: [moment(now), moment(now)],
      clickData: {},
    }
  }

  componentDidMount() {
    const { profile } = this.props;
    const { searchDt } = this.state;
    const data = {  
      orgNam: profile.DEPT_NAME_KOR,
      IV_GSTRP_BEG: moment(new Date(searchDt[0])).format('YYYYMMDD'),
      IV_GSTRP_END: moment(new Date(searchDt[1])).format('YYYYMMDD'),
      PARAM_WORK_NO: '',
      PARAM_WORKGRADE: '',
      PARAM_RESP: '',
      // 아래는 임시 데이터(확인용)
      // orgNam: '배관/건축',
      // IV_GSTRP_BEG: '20151001',
      // IV_GSTRP_END: '20151010',
      // PARAM_WORK_NO: 'WN201510021438',
      // PARAM_WORKGRADE: '안전',
      // PARAM_RESP: '권성균',
    }
    this.props.handleSafeWorkConnectSearch(data);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.connectSearchList !== nextProps.connectSearchList ) {
      if (nextProps.connectSearchList.length===0) {
        alert('작성된 허가서가 없습니다..');
      }
    }
  }

  handleDtChange = (e) => {
    this.setState({
      searchDt: [e[0], e[1]],
    });
  }

  closePopup = () => {
    window.close();
  }

  handleSearch = () => {
    const { resp, workNo, workGrade, searchDt } = this.state;
    const { profile } = this.props;
    const data = {
      orgNam: profile.DEPT_NAME_KOR,
      IV_GSTRP_BEG: moment(new Date(searchDt[0])).format('YYYYMMDD'),
      IV_GSTRP_END: moment(new Date(searchDt[1])).format('YYYYMMDD'),
      PARAM_WORK_NO: workNo,
      PARAM_WORKGRADE: workGrade,
      PARAM_RESP: resp,
    }
    this.props.handleSafeWorkConnectSearch(data);
  }

  handleWorkNoChange = (event) => {
    this.setState({
      workNo: event.target.value,
    });
  }

  handleWorkGradeChange = (event) => {
    this.setState({
      workGrade: event.target.value,
    });
  }

  handleRespChange = (event) => {
    this.setState({
      resp: event.target.value,
    });
  }

  clickRowData = (data) => {
    this.setState({
      clickData: data,
    });
  }

  saveSafeWorkGrid = () => {
    const { clickData } = this.state
    window.opener.postMessage(clickData, window.location.origin);
    window.close();
  }

  render() {
    const { searchDt,  workNo, workGrade, resp } = this.state;
    const { connectSearchList } = this.props;
    
    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">안전작업 허가서 연결</h2>
          {/* <Button className="btn-popup-close">닫기</Button> */}
        </header>
        {/* popup contnent */}
        <main className="popup-content">
          {/* Data Table */}
          <table className="data-table">
            <tr>
              <th>작업번호</th>
              <td>
                <Input
                  value={workNo}
                  onChange={this.handleWorkNoChange}
                />
              </td>
              <th>작업일</th>
              <td>
                <span className="date-range">
                  <RangePicker
                    className="RangePicker"
                    style={{ width: '250px', marginLeft: '5px' }}
                    ranges={{
                      오늘: [moment(), moment()],
                      '이번 달': [moment().startOf('month'), moment().endOf('month')],
                    }}
                    onChange={this.handleDtChange}
                    showToday={true}
                    value={searchDt !== '' ? searchDt : null}
                    id="searchDt"
                    format={dateFormat}
                  />
                </span>
              </td>
              <th>작업등급</th>
              <td>
                <Input
                  value={workGrade}
                  onChange={this.handleWorkGradeChange}
                />
              </td>
              <th>담당자</th>
              <td>
               <Input
                  value={resp}
                  onChange={this.handleRespChange}
                />
              </td>
              <td>
                <Button 
                  type="primary" 
                  onClick={this.handleSearch} 
                  className="btn-apply save"
                >
                조회
                </Button>
              </td>
            </tr>
          </table>
          <div>
            <SafeWorkPopupGrid connectSearchList={connectSearchList} clickRowData={this.clickRowData}/>
          </div>
          <div className="btn-group">
            <div className="right">
              <Button type="primary"  onClick={this.saveSafeWorkGrid} className="btn-apply save">확인</Button>
              <Button type="primary" onClick={this.closePopup} className="btn-apply save">Close</Button>
            </div>
          </div>
        </main>

      </section>
    );
  }
}

InformNoteSafetyWork.defaultProps = {
  Item: {},
};

InformNoteSafetyWork.propTypes = {
  handleSafeWorkConnectSearch: PropTypes.func,
  connectSearchList: PropTypes.array,
};

const mapStateToProps = createStructuredSelector({
  connectSearchList: selectors.makeConnectSearch(),
  profile: selectors.makeSelectProfile(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleSafeWorkConnectSearch: value => dispatch(actions.safeWorkConnectSearch(value)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNoteSafetyWork);
