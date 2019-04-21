import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';

import MainView from '../view/mainView';
// import SheetView from './view/sheetView';
import HeaderView from '../view/headerView';

class PmMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // dataList: this.props.dataList,
      sdptId: '',
      teamId: '',
    };
    this.props.handleLoadingTeamParam();
    this.props.handleLoadingPmCode();
    this.props.handleLoadingUserDefine();

    this.handleTeamChange = this.handleTeamChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onCheckChange = this.onCheckChange.bind(this);
    this.selectedSheet = this.selectedSheet.bind(this);
    this.handleSdptChange = this.handleSdptChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    console.log(this.props, 'PmsheetTab');
    const { history } = this.props;
    const pathArray = history.location.pathname.split('/');
    console.log(pathArray, 'PmsheetTab');
    if (nextProps.detailData.size === undefined && this.state.sheetNum !== undefined) {
      if (pathArray[1] === 'sm' && history.location.pathname !== '/sm/pmSheetTablet/pmSheet2') {
        this.props.history.push({
          pathname: '/sm/pmSheetTablet/pmSheet2', state: this.state.sheetNum, props: nextProps.detailData,
        });
      } else if (pathArray[1] === 'apps' && history.location.pathname !== '/apps/pmSheetTablet/pmSheet') {
        this.props.history.push({
          pathname: '/apps/pmSheetTablet/pmSheet', state: this.state.sheetNum, props: nextProps.detailData,
        });
      }
    }
  }

  onClick() {
    const { teamId, sdptId } = this.state;
    const param = {
      IV_BEBER: '121',
      IV_GSTRP_BEG: '20180601',
      IV_GSTRP_END: '20180817',
      IV_STATUS: '',
      list: {
        IT_STORT: [
          {
            STORT: teamId,
          },
        ],
        IT_ARBPL: [
          {
            ARBPL: sdptId,
          },
        ],
        IT_TPLNR: [
          {
            TPLNR: 'M1-03-08-05',
          },
        ],
        IT_EQART: [],
        IT_TIDNR: [],
        IT_IPHAS: [],
      },
    };

    this.props.handleLoadingData(param);
    this.props.handleChecked(false);
  }

  onCheckChange(status) {
    if (status.target.checked === true) {
      this.props.handleCheckbox(status.target.checked, this.props.dataList);
      this.props.handleChecked(status.target.checked);
    } else {
      this.props.handleCheckbox(status.target.checked, this.props.cloneList);
      this.props.handleChecked(status.target.checked);
    }
  }

  handleTeamChange(value) {
    this.props.handleLoadingSdptParam(value);
    this.setState({ teamId: value });
  }

  handleSdptChange(value) {
    this.setState({ sdptId: value });
    this.props.handleSdptId(value);
  }

  selectedSheet(value, stat, informId) {
    if (stat !== '송부완료') {
      const param = {
        IV_MODE: 'S',
        IV_INSPLOT: value,
        INSP_LOT: value,
        list: {
          IT_OPERATION: [],
        },
      };

      this.props.handleLoadingDetailData(param);
      this.props.saveInformID(informId);
      this.setState({ sheetNum: value });

    }
  }

  render() {
    const { teamList, sdptList, dataList } = this.props;

    return (
      <div>
        {/* <HeaderView /> */}
        <MainView
          dataList={dataList}
          sdptList={sdptList}
          teamList={teamList}
          onClick={this.onClick}
          onCheckChange={this.onCheckChange}
          handleTeamChange={this.handleTeamChange}
          selectedSheet={this.selectedSheet}
          onClickSheet={this.onClickSheet}
          handleSdptChange={this.handleSdptChange}
          selectedSdptId={this.state.sdptId}
          checked={this.props.checked}
          sdptId={this.props.sdptId}
        />
      </div>
    );
  }
}

PmMobile.defaultProps = {
  teamList: [],
  sdptList: [],
  dataList: [],
  cloneList: [],
  sdptId: undefined,
};

PmMobile.propTypes = {
  handleLoadingTeamParam: PropTypes.func.isRequired,
  teamList: PropTypes.array,
  sdptList: PropTypes.array,
  handleLoadingSdptParam: PropTypes.func.isRequired,
  handleLoadingData: PropTypes.func.isRequired,
  handleCheckbox: PropTypes.func.isRequired,
  dataList: PropTypes.array,
  history: PropTypes.object.isRequired,
  cloneList: PropTypes.array,
  checked: PropTypes.bool.isRequired,
  handleChecked: PropTypes.func.isRequired,
  sdptId: PropTypes.string,
  handleSdptId: PropTypes.func.isRequired,
  handleLoadingDetailData: PropTypes.func.isRequired,
  detailData: PropTypes.object.isRequired,
};

const mapStateToProps = createStructuredSelector({
  teamList: selectors.makeTeamList(),
  sdptList: selectors.makeSdptList(),
  dataList: selectors.makeDataList(),
  cloneList: selectors.makeCloneDataList(),
  checked: selectors.makeChecked(),
  sdptId: selectors.makesdptId(),
  detailData: selectors.detailData(),
  userDefine: selectors.userDefine(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingTeamParam: value => dispatch(actions.loadingTeamParam(value)),
    handleLoadingSdptParam: value => dispatch(actions.loadingSdptParam(value)),
    handleLoadingData: (teamId, sdptId) => dispatch(actions.loadingData(teamId, sdptId)),
    handleCheckbox: (status, data) => dispatch(actions.checkbox(status, data)),
    handleChecked: status => dispatch(actions.checked(status)),
    handleSdptId: value => dispatch(actions.sdptId(value)),
    handleLoadingDetailData: param => dispatch(actions.loadingDetailData(param)),
    handleLoadingPmCode: () => dispatch(actions.loadingPmCode()),
    handleLoadingUserDefine: () => dispatch(actions.getUserCompanyDefine()),
    saveInformID: id => dispatch(actions.saveInformID(id)),
  };
}

const withReducer = injectReducer({ key: 'mobilepm', reducer });
const withSaga = injectSaga({ key: 'mobilepm', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmMobile);

