import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';
import { Button, Input } from 'antd';
import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import * as actions from './actions';
import * as selectors from './selectors';
import reducer from './reducer';
import saga from './saga';
import GridContractor from './gridContractor.js';

const { TextArea } = Input;


class Workorder extends PureComponent {
  constructor(props) {
    super(props);

    console.log('프랍스 ', props);
    const { match } = props;
    const { params } = match;
    const { PARAM } = params;

    this.state = {
      disabled: true,
      PARAM,
    };
    this.props.handleLoadingPopup(PARAM);
  }

  // 팝업닫기
  handlClosetest = () => {
    window.close();
  }
  render() {
    const {
      workOrderDetail,
      workOrderEtTaskDetail,
      startDate,
      contractorGrid,
      // repairTypeList,
    } = this.props;
    const {
      PARAM,
    } = this.state;
    // console.log('repairTypeList : ', repairTypeList);
    return (
      <div style={{ padding: 50 }}>
        <div>
          <th>WorkOrderNo(#{PARAM})</th>
        </div>
        <table>
          <tr>
            <th style={{ background: 'yellow' }}>W/O 유형</th>
            <td>
              <Input value={workOrderDetail.map(v => v.AUART_T)} readonly />
              <Input type="hidden" value={workOrderDetail.map(v => v.AUART)} readonly />
            </td>
            <th style={{ background: 'yellow' }}>W/O Status</th>
            <td><Input value={workOrderDetail.map(v => v.WO_STATUS_T)} readonly /></td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>Start Date</th>
            <td><Input value={startDate} readonly /></td>
            <th style={{ background: 'yellow' }}>생성자</th>
            <td><Input value={workOrderDetail.map(v => v.ERNAM2)} style={{ width: 100 }} readonly />
              <Input value={workOrderDetail.map(v => v.ERNO)} style={{ width: 100 }} readonly />
            </td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>Description</th>
            <td colSpan="7">
              <div>
                <TextArea
                  readOnly={this.state.disabled}
                  value={workOrderDetail.map(v => v.KTEXT)}
                  autosize={{ minRows: 4, maxRow: 6 }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <th style={{ background: 'yellow' }}>PM Sheet Description</th>
            <td colSpan="7">
              <div>
                <TextArea
                  readOnly={this.state.disabled}
                  value={workOrderEtTaskDetail.map(v => v.KTEXT)}
                  autosize={{ minRows: 4, maxRow: 6 }}
                />
              </div>
            </td>
          </tr>
          <tr>
            <div style={{ position: 'fixed', bottom: '0px', right: '0px' }}>
              <td>
                <Button onClick={this.handlClosetest} style={{ border: 'black 1.5px solid' }}>팝업 닫기</Button>
              </td>
            </div>
          </tr>
        </table>
        <div>
          <GridContractor
            contractorGrid={contractorGrid}
          />
        </div>
      </div>
    );
  }
}
Workorder.propTypes = {
  handleLoadingPopup: PropTypes.func.isRequired,
  // getRepairTypeList: PropTypes.func.isRequired,
  workOrderDetail: PropTypes.array.isRequired,
  contractorGrid: PropTypes.array,
  workOrderEtTaskDetail: PropTypes.array.isRequired,
  startDate: PropTypes.array.isRequired,
  match: PropTypes.object.isRequired,

};
Workorder.defaultProps = {
  contractorGrid: [],
};

const mapStateToProps = createStructuredSelector({
  workOrderDetail: selectors.makepopList(),
  workOrderEtTaskDetail: selectors.workOrderEtTaskDetail(),
  startDate: selectors.startDate(),
  contractorGrid: selectors.makeContractorGrid(),
  // repairTypeList: selectors.RepairTypeList(),
});

export function mapDispatchToProps(dispatch) {
  return {
    handleLoadingPopup: value => dispatch(actions.handleLoadingPopup(value)),
    // getRepairTypeList: () => dispatch(actions.getRepairTypeList()),
  };
}

const withReducer = injectReducer({ key: 'workOrderDetail', reducer });
const withSaga = injectSaga({ key: 'workOrderDetail', saga });
const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(
  withReducer,
  withConnect,
  withSaga,
)(Workorder);
