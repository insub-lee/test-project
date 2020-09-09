import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { createStructuredSelector } from 'reselect';

import { Row, Col, Modal, Icon } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import BuilderProcessModal from 'apps/Workflow/WorkProcess/BuilderProcessModal';
import StyledSelectModal from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledWorkProcess from 'apps/Workflow/WorkProcess/StyledWorkProcess';
import SelectApprovePage from 'apps/mdcs/user/Workflow/SelectApprovePage';
import StyledHtmlTable from 'components/BizBuilder/styled/Table/StyledHtmlTable';
import ContentsWrapper from 'components/BizBuilder/styled/Wrapper/StyledContentsWrapper';

import reducer from 'apps/Workflow/SignLine/reducer';
import saga from 'apps/Workflow/SignLine/saga';
import * as selectors from 'apps/Workflow/SignLine/selectors';
import * as actions from 'apps/Workflow/SignLine/actions';
import injectReducer from 'utils/injectReducer';
import injectSaga from 'utils/injectSaga';
import request from 'utils/request';
const AntdModal = StyledSelectModal(Modal);

const draftInfoStyle = {
  background: '#ffffff',
  border: '1px solid #dadada',
  marginRight: '5px',
  borderRadius: '5px',
  textAlign: 'center',
  padding: '3px 10px',
  display: 'inline-block',
  boxSizing: 'border-box',
};

class CustomWorkProcess extends Component {
  state = {
    processRule: {},
    filterRule: [],
    filterItem: [],
    modalVisible: false,
  };

  componentDidMount() {
    const { viewType, draftId, getDraftPrcRule, PRC_ID, relType, processRule } = this.props;

    if (viewType === 'INPUT') {
      // processRule 없을경우 PRC_ID SI환경
      if (JSON.stringify(processRule) === '{}') {
        this.getProcessRule(PRC_ID).then(res => {
          const { DRAFT_PROCESS_STEP } = res;
          const filterRule = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
          const filterItem = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
          this.setState({ processRule: res, filterRule, filterItem });
        });
      } else {
        const { DRAFT_PROCESS_STEP } = processRule;

        const filterRule = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
        const filterItem = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
        this.setState({ processRule, filterRule, filterItem });
      }
    } else if (draftId !== -1) {
      getDraftPrcRule(draftId);
    }
  }

  getProcessRule = async prcId => {
    const result = await request({
      method: 'POST',
      url: '/api/workflow/v1/common/workprocess/defaultPrcRuleHanlder',
      data: { PARAM: { PRC_ID: prcId } },
      json: true,
    });
    return (result.response && result.response.DRAFT_PROCESS) || {};
  };

  handleOpenModal = () => {
    this.setState({ modalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ modalVisible: false });
  };

  onProcessRuleComplete = processRule => {
    const { DRAFT_PROCESS_STEP } = processRule;
    const filterRule = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
    const filterItem = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
    this.setState({ modalVisible: false, processRule, filterRule, filterItem });
    this.props.setProcessRule(this.props.id, processRule);
  };

  render() {
    const { viewType, draftPrcRule, colLength, CustomRow } = this.props;
    const { processRule, modalVisible, filterRule } = this.state;

    return (
      <ContentsWrapper>
        <StyledHtmlTable>
          <table>
            <colgroup>
              {[...Array(colLength)].map((_, i) =>
                i === 0 ? <col key={`col_${i}`} width="10%" /> : <col key={`col_${i}`} width={`${90 / colLength - 1}%`} />,
              )}
            </colgroup>
            <tbody>
              <tr>
                <td colSpan={colLength - 1} style={{ borderRight: '0px' }}>
                  <Icon type="audit" style={{ fontSize: '16px', marginRight: '5px' }} />
                  {viewType === 'INPUT' ? '결재선 지정' : '결재선'}
                </td>
                <td align="right">
                  {viewType === 'INPUT' && (
                    <StyledButton className="btn-gray btn-sm" onClick={this.handleOpenModal}>
                      결재선반영
                    </StyledButton>
                  )}
                </td>
              </tr>
              {viewType === 'INPUT'
                ? filterRule &&
                  filterRule.map((item, rowIndex) => (
                    <tr key={rowIndex}>
                      <th>{item.NODE_NAME_KOR}</th>
                      <td colSpan={colLength - 1}>
                        {item.APPV_MEMBER.map((user, colIndex) =>
                          item.NODE_TYPE === 'ND' ? (
                            <div key={`${rowIndex}_${colIndex}`} style={draftInfoStyle}>
                              <Icon type="team" />
                              <span className="infoTxt">{user.DEPT_NAME_KOR}</span>
                            </div>
                          ) : (
                            <div key={`${rowIndex}_${colIndex}`} style={draftInfoStyle}>
                              <Icon type="user" />
                              <span className="infoTxt">{`${user.NAME_KOR} (${user.DEPT_NAME_KOR})`}</span>
                            </div>
                          ),
                        )}
                      </td>
                    </tr>
                  ))
                : draftPrcRule &&
                  draftPrcRule.processStep &&
                  draftPrcRule.processStep
                    .filter(item => item.VIEW_TYPE === 1)
                    .map((item, rowIndex) => (
                      <tr key={rowIndex}>
                        <th>{item.NODE_NAME_KOR}</th>
                        <td colSpan={colLength - 1}>
                          {item.APPV_MEMBER.map((user, colIndex) =>
                            item.NODE_TYPE === 'ND' ? (
                              <div key={`${rowIndex}_${colIndex}`} style={draftInfoStyle}>
                                <Icon type="team" />
                                <span className="infoTxt">{user.DEPT_NAME_KOR}</span>
                              </div>
                            ) : (
                              <div key={`${rowIndex}_${colIndex}`} style={draftInfoStyle}>
                                <Icon type="user" />
                                <span className="infoTxt">{`${user.NAME_KOR} (${user.DEPT_NAME_KOR})`}</span>
                              </div>
                            ),
                          )}
                        </td>
                      </tr>
                    ))}
              {CustomRow.map(row => row)}
            </tbody>
          </table>
        </StyledHtmlTable>
        <AntdModal
          title="결재선지정"
          visible={modalVisible}
          // onOk={this.handleComplete}
          onCancel={this.handleCloseModal}
          width="62%"
          style={{ top: 50, height: '500px' }}
          footer={[]}
          destroyOnClose
          maskClosable={false}
        >
          {JSON.stringify(processRule) !== '{}' && (
            <BuilderProcessModal
              processRuleProc={processRule}
              visible={modalVisible}
              onComplete={this.onProcessRuleComplete}
              onCloseModal={this.handleCloseModal}
            />
          )}
        </AntdModal>
      </ContentsWrapper>
    );
  }
}

CustomWorkProcess.propTypes = {
  id: PropTypes.string,
  PRC_ID: PropTypes.number,
  processRule: PropTypes.object,
  setProcessRule: PropTypes.func,
  viewType: PropTypes.string,
  draftId: PropTypes.number,
  getDraftPrcRule: PropTypes.func,
  colLength: PropTypes.number,
  CustomRow: PropTypes.array,
};

CustomWorkProcess.defaultProps = {
  PRC_ID: -1,
  processRule: {},
  viewType: 'INPUT',
  draftId: -1,
  colLength: 3,
  CustomRow: [],
};

const mapStateToProps = createStructuredSelector({
  draftPrcRule: selectors.makeSelectDraftPrcRule(),
});

const mapDispatchToProps = dispatch => ({
  getDraftPrcRule: draftId => dispatch(actions.getDraftPrcRule(draftId)),
});

const withReducer = injectReducer({
  key: 'apps.WorkFlow.SignLine.reducer',
  reducer,
});

const withSaga = injectSaga({
  key: 'apps.WorkFlow.SignLine.saga',
  saga,
});

const withConnect = connect(mapStateToProps, mapDispatchToProps);

export default compose(withSaga, withReducer, withConnect)(CustomWorkProcess);
