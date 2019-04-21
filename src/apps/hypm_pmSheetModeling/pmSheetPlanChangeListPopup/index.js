import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
// import { Select } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-balham.css';
import 'antd/dist/antd.css';
import 'apps/hypm_common/css/gipms.css';
// import * as feed from 'components/Feedback/functions';
// import ReactMultiSelectCheckboxes from 'react-multiselect-checkboxes';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import { BtnSearchDkGray } from './buttons.style';
import Grid from './grid.js';
import * as actionsLoading from 'containers/common/Loading/actions';

class PmSheetModeling extends PureComponent {
  constructor(props) {
    super(props);

    const { match } = props;
    const { params } = match;
    const { plnnr, plnal } = params;

    this.state = {
      plnnr, // 임시값
      plnal, // 임시값
    };
    this.props.handleLoadingGridParam({ plnal: this.state.plnal, plnnr: this.state.plnnr });
  }

  render() {
    /* 나중에 사용할것
    const {

    } = this.state;
    */
    const {
      PlanChangeDataList,
    } = this.props;

    return (
      <section className="gipms popup">
        {/* popup contnent */}
        <section className="popup-content">
          <div className="btn-group">
            <div className="left">
              <span className="grid-info">PM Sheet 주기가 변경되어 영향받은 Plan 목록입니다. 전/후 Schedule에 대한 주기 확인 후 Plan 개정이 필요할 수 있습니다.</span>
            </div>
          </div>
          {/* ag Grid */}
          <div className="grid-area">
            <div className="ag-theme-balham" style={{ height: '300px', width: '100%' }}>
              <Grid
                PlanChangeDataList={PlanChangeDataList}
              />
            </div>
          </div>
        </section>
        <div className="btn-group">
          <div className="right">
            <BtnSearchDkGray
              title="닫기"
              className="searchBtn"
              onClick={() => window.close()}
            >
              닫기
            </BtnSearchDkGray>
          </div>
        </div>
      </section>

      // <div>
      //   <div className="PmSheetPlanPipupTitle">
      //     <h4>PM Sheet 주기가 변경되어 영향받은 Plan 목록입니다. 전/후 Schedule에 대한 주기 확인 후 Plan 개정이 필요할 수 있습니다.</h4><br />
      //   </div>
      //   <div>
      //     <Grid
      //       PlanChangeDataList={PlanChangeDataList}
      //     />
      //   </div>
      //   <div style={{ padding: 20, textAlign: 'right' }}>
      //     <BtnSearchDkGray
      //       title="Plan 바로가기"
      //       className="searchBtn"
      //     >
      //     Plan 바로가기
      //     </BtnSearchDkGray>
      //     <BtnSearchDkGray
      //       title="닫기"
      //       className="searchBtn"
      //     >
      //     닫기
      //     </BtnSearchDkGray>
      //   </div>
      // </div>
    );
  }
}

PmSheetModeling.propTypes = {
  handleLoadingGridParam: PropTypes.func.isRequired,
  PlanChangeDataList: PropTypes.array,
  setFakelist1: PropTypes.array, //eslint-disable-line
  match: PropTypes.object.isRequired,
  loadingOn: PropTypes.func.isRequired,
};

PmSheetModeling.defaultProps = {
  PlanChangeDataList: [],
  setFakelist1: [],
};

const mapStateToProps = createStructuredSelector({
  PlanChangeDataList: selectors.makePlanChangeDataList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    // handleLoadingFabParam: () => dispatch(actions.loadingFabParam()),
    handleLoadingGridParam: value => dispatch(actions.loadingGridParam(value)),
    loadingOn: () => dispatch(actionsLoading.loadingOn()),
  };
}

const withReducer = injectReducer({ key: 'pmSheetPlanChangeListPopup', reducer });
const withSaga = injectSaga({ key: 'pmSheetPlanChangeListPopup', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(PmSheetModeling);
