import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Row, Col, Modal, Icon } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import WorkProcessModal from 'apps/Workflow/WorkProcess/WorkProcessModal';
import StyledSelectModal from 'commonStyled/MdcsStyled/Modal/StyledSelectModal';
import StyledWorkProcess from 'apps/Workflow/WorkProcess/StyledWorkProcess';
import SelectApprovePage from 'apps/mdcs/user/Workflow/SelectApprovePage';

const AntdModal = StyledSelectModal(Modal);

class WorkProcess extends Component {
  state = {
    processRule: {},
    filterRule: [],
    filterItem: [],
    modalVisible: false,
  };

  componentDidMount() {
    const { processRule, viewType, CustomWorkProcess } = this.props;
    console.debug('1', processRule);
    const { DRAFT_PROCESS_STEP } = processRule;
    const filterRule = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
    const filterItem = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
    this.setState({ processRule, filterRule, filterItem });
  }

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
    const { viewType } = this.props;
    const { processRule, modalVisible, filterRule } = this.state;
    return (
      <StyledWorkProcess>
        <div>
          <div className="draftTitleLayout">
            <div className="draftTitle">
              <Icon type="audit" style={{ fontSize: '16px', marginRight: '5px' }} />
              결재선 지정
            </div>
            <div className="draftButton">
              {viewType === 'INPUT' && (
                <StyledButton className="btn-gray btn-sm" onClick={this.handleOpenModal}>
                  결재선변경
                </StyledButton>
              )}
            </div>
          </div>
          <div style={{ marginBottom: '10px', marginTop: '2px' }}>
            {filterRule.map(item => (
              <div className="dataWrapper_mdcs">
                <Row type="flex">
                  <Col span={4} className="dataLabel">
                    <span>{item.NODE_NAME_KOR}</span>
                  </Col>
                  <Col span={20} className="dataContents">
                    {item.APPV_MEMBER.map(user =>
                      item.NODE_TYPE === 'ND' ? (
                        <div className="draftInfoBox">
                          <Icon type="team" />
                          <span className="infoTxt">{user.DEPT_NAME_KOR}</span>
                        </div>
                      ) : (
                        <div className="draftInfoBox">
                          <Icon type="user" />
                          <span className="infoTxt">{`${user.NAME_KOR} (${user.DEPT_NAME_KOR})`}</span>
                        </div>
                      ),
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </div>
          <div>
            {this.state.filterItem.map(item => (
              <div className="dataWrapper_mdcs">
                <Row type="flex">
                  <Col span={4} className="dataLabel">
                    <span>{item.NODE_NAME_KOR}</span>
                  </Col>
                  <Col span={20} className="dataContents">
                    {item.APPV_MEMBER.map(user =>
                      item.NODE_TYPE === 'ND' ? (
                        <div className="draftInfoBox">
                          <Icon type="team" />
                          <span className="infoTxt">{user.DEPT_NAME_KOR}</span>
                        </div>
                      ) : (
                        <div className="draftInfoBox">
                          <Icon type="user" />
                          <span className="infoTxt">{user.NAME_KOR}</span>
                        </div>
                      ),
                    )}
                  </Col>
                </Row>
              </div>
            ))}
          </div>
        </div>
        <AntdModal
          title="결재선지정ㅋㅋ"
          visible={modalVisible}
          // onOk={this.handleComplete}
          onCancel={this.handleCloseModal}
          width="62%"
          style={{ top: 50, height: '500px' }}
          footer={[]}
          destroyOnClose
          maskClosable={false}
        >
          <WorkProcessModal processRuleProc={processRule} visible={modalVisible} onComplete={this.onProcessRuleComplete} onCloseModal={this.handleCloseModal} />
        </AntdModal>
      </StyledWorkProcess>
    );
  }
}

WorkProcess.propTypes = {
  id: PropTypes.string,
  PRC_ID: PropTypes.number,
  processRule: PropTypes.object,
  setProcessRule: PropTypes.func,
  viewType: PropTypes.string,
  CustomWorkProcess: PropTypes.func,
};

WorkProcess.defaultProps = {
  PRC_ID: -1,
  processRule: {
    DRAFT_PROCESS_STEP: [],
  },
  viewType: 'INPUT',
  CustomWorkProcess: undefined,
};

export default WorkProcess;
