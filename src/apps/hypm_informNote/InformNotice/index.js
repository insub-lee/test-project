import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import PropTypes from 'prop-types';
import { Select, DatePicker, Button } from 'antd';
import moment from 'moment';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as feed from 'components/Feedback/functions';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import Grid from './grid.js';
import locale from './ko.json';

const Options = Select.Option;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY/MM/DD';

class InformNotice extends PureComponent {
  constructor(props) {
    super(props);
    const now = moment();
    this.state = {
      defaultBox: [],
      PARAM_BEBER: undefined,
      PARAM_STAND: undefined,
      PARAM_ARBPL: undefined,
      fabName: '',
      sdptName: '',
      startMoment: now,
      endMoment: now,
      isExcelDownload: 0,
    };
    this.props.handleLoadingFabParam();
  }

  componentDidMount(){
    this.handleSearch();
  }

  onDateChange = (value) => {
    if (moment.duration(value[1] - value[0]).as('months') > 3) {
      feed.error('조회기간은 세 달을 초과할 수 없습니다. ');
      return;
    }

    this.setState({
      startMoment: value[0],
      endMoment: value[1],
    });
  }

  handleFabChange = (event) => {
    const { handleLoadingParam } = this.props;
    handleLoadingParam(event);
    this.setState({
      PARAM_BEBER: event,
      PARAM_STAND: undefined,
      PARAM_ARBPL: undefined,
    });
    const i = this.props.fabList.find(e => e.CODE === event);
    this.setState({
      fabName: i.NAME,
      sdptName: '',
    });
  }

  handleTeamChange = (event) => {
    const { handleLoadingTeamParam } = this.props;
    handleLoadingTeamParam(event);
    this.setState({
      PARAM_STAND: event,
      PARAM_ARBPL: undefined,
    });
  }

  handleSdptChange = (event) => {
    const { handleLoadingSdptParam } = this.props;
    handleLoadingSdptParam(event);
    this.setState({
      PARAM_ARBPL: event,
    });
    const i = this.props.sdptList.find(e => e.CODE === event);
    this.setState({
      sdptName: i.NAME,
    });
  }

  handleExcelDownloadAgGrid = () => {
    // this.forceUpdate();
    this.setState({
      isExcelDownload: this.state.isExcelDownload + 1,
    });
  }

  handleSearch = () => {
    const {
      PARAM_BEBER, PARAM_STAND, PARAM_ARBPL, startMoment, endMoment,
    } = this.state;
    const PARAM_START_DT = moment(startMoment).format('YYYYMMDD');
    const PARAM_END_DT = moment(endMoment).format('YYYYMMDD');
    const param = {
      PARAM_BEBER, PARAM_STAND, PARAM_ARBPL, PARAM_START_DT, PARAM_END_DT,
    };
    console.log(param);
    this.props.handleInformNoticeSearch(param);
  }

  handleClose = () => {
    window.close();
  }

  render() {
    const {
      defaultBox,
      PARAM_BEBER,
      PARAM_STAND,
      PARAM_ARBPL,
      startMoment,
      endMoment,
      isExcelDownload,
    } = this.state;
    const {
      fabList,
      teamList,
      sdptList,
      informNoticeList,
      // signStatusList,
      // pmSheetDataList,
    } = this.props;
    return (
      <section className="gipms popup">
        <header>
          <h2 className="title">Inform Notice Popup</h2>
          <Button className="btn-popup-close" onClick={this.handleClose}>닫기</Button>
        </header>
        <main className="popup-content">
          <section className="search-area">
            <div className="search-item-area">
              <div className="search-item">
                <span className="search-label required">FAB</span>
                <span className="search-select">
                  <Select
                    defaultValue={defaultBox}
                    value={PARAM_BEBER}
                    style={{ width: 180 }}
                    onChange={this.handleFabChange}
                    notFoundContent="Select 하세요."
                    placeholder="Select 하세요."
                    defaultActiveFirstOption={false}
                  >
                    { fabList.map(factoryKey => <Options key={factoryKey.CODE}>{factoryKey.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label required">Team</span>
                <span className="search-select">
                  <Select
                    defaultValue={defaultBox}
                    value={PARAM_STAND}
                    style={{ width: 180 }}
                    onChange={this.handleTeamChange}
                    notFoundContent="All"
                    placeholder="All"
                    defaultActiveFirstOption={false}
                  >
                    { teamList.map(detailFactoryKey => <Options value={detailFactoryKey.CODE}>{detailFactoryKey.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="search-item">
                <span className="search-label required">SDPT</span>
                <span className="search-select">
                  <Select
                    defaultValue={defaultBox}
                    value={PARAM_ARBPL}
                    style={{ width: 180 }}
                    onChange={this.handleSdptChange}
                    notFoundContent="All"
                    placeholder="All"
                    defaultActiveFirstOption={false}
                  >
                    { sdptList.map(sdptKey => <Options /* onDeselect, onSelect */ value={sdptKey.CODE}>{sdptKey.NAME}</Options>) }
                  </Select>
                </span>
              </div>
              <div className="search-item x2">
                <span className="search-label">Notice Date</span>
                <span className="search-select">
                  <span className="date-range">
                    <RangePicker
                      dropdownClassName="hypm"
                      locale={locale}
                      onChange={this.onDateChange}
                      value={[moment(startMoment), moment(endMoment)]}
                      allowClear={false}
                      ranges={{ 오늘: [moment(), moment()], '이번 달': [moment().startOf('month'), moment().endOf('month')] }}
                      format={dateFormat}
                    />
                  </span>
                </span>
              </div>
            </div>
            <div className="btn-area">
              <Button
                type="primary"
                className="btn-search"
                onClick={this.handleSearch}
              >
                Search
              </Button>
            </div>
          </section>
          <div className="btn-group">
            <div className="left">
              <h4>{`[${this.state.fabName}] [${this.state.sdptName}] Inform Notice`}</h4>
            </div>
            <div className="right">
              <Button
                type="primary"
                className="btn-apply excel"
                onClick={this.handleExcelDownloadAgGrid}
              >
                엑셀
              </Button>
            </div>
          </div>
          <div className="grid-area" style={{ height: '300px' }}>
            <div className="ag-theme-balham" style={{ height: '100%', width: '100%' }}>
              <Grid
                informNoticeList={informNoticeList}
                isExcelDownload={isExcelDownload}
              />
            </div>
          </div>
        </main>
      </section>
    );
  }
}

InformNotice.propTypes = {
  handleLoadingFabParam: PropTypes.func.isRequired,
  handleLoadingParam: PropTypes.func.isRequired,
  handleLoadingTeamParam: PropTypes.func.isRequired,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  // handlePmSheetSearch: PropTypes.func.isRequired,
  handleInformNoticeSearch: PropTypes.func.isRequired,
  fabList: PropTypes.array,
  teamList: PropTypes.object,
  sdptList: PropTypes.object,
  informNoticeList: PropTypes.array,
  // signStatusList: PropTypes.array,
  // pmSheetDataList: PropTypes.array,
};

InformNotice.defaultProps = {
  fabList: [],
  teamList: [],
  sdptList: [],
  // signStatusList: [],
  // pmSheetDataList: [],
  informNoticeList: [],
};

const mapStateToProps = createStructuredSelector({
  fabList: selectors.makeFabList(),
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  flList: selectors.makeFlList(),
  modelList: selectors.makeModelList(),
  versionList: selectors.makeVersionList(),
  signStatusList: selectors.makeSignStatusList(),
  informNoticeList: selectors.makeInformNoticeList(),
  // pmSheetDataList: selectors.makePmSheetDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingParam: value => dispatch(actions.loadingParam(value)),
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    // handlePmSheetSearch: param => dispatch(actions.pmSheetSearch(param)),
    handleInformNoticeSearch: param => dispatch(actions.informNoticeSearch(param)),
  };
}

const withReducer = injectReducer({ key: 'gridsheet', reducer });
const withSaga = injectSaga({ key: 'gridsheet', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(InformNotice);
