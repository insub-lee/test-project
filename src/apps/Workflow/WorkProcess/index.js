import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Input, Icon } from 'antd';

import StyledButton from 'apps/mdcs/styled/StyledButton';

import WorkProcessModal from './WorkProcessModal';
import StyledWorkProcess from './StyledWorkProcess';

class WorkProcess extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalVisible: false,
    };
  }

  componentDidMount() {
    const { processRule, viewType, CustomWorkProcess } = this.props;
    const { DRAFT_PROCESS_STEP } = processRule;
    const filterRule = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
    const filterItem = DRAFT_PROCESS_STEP && DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
    const colSpan = Math.floor(24 / filterRule && filterRule.length);
    this.setState({ filterRule, filterItem, colSpan });
  }

  handleOpenModal = () => {
    this.setState({ modalVisible: true });
  };

  handleCloseModal = () => {
    this.setState({ modalVisible: false });
  };

  onProcessRuleComplete = processRule => {
    this.setState({ modalVisible: false });
    // this.props.setProcessStep(this.props.id, processStep);
    this.props.setProcessRule(this.props.id, processRule);
  };

  render() {
    const { processRule, viewType, CustomWorkProcess } = this.props;
    const { modalVisible } = this.state;

    if (typeof CustomWorkProcess === 'function' && processRule && processRule.DRAFT_PROCESS_STEP && processRule.DRAFT_PROCESS_STEP.length > 0) {
      return <CustomWorkProcess {...this.props}></CustomWorkProcess>;
    }

    return (
      <StyledWorkProcess>
        <div className="signLineWrapper">
          {this.state.filterRule !== undefined && this.state.filterRule.length > 0 && (
            <>
              <Row gutter={0} type="flex" justify="end" className="table-head">
                {this.state.filterRule.map(item => (
                  <Col span={3} key={`headCol_${item.NODE_ID}`}>
                    <div>
                      <span>{item.NODE_NAME_KOR}</span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row gutter={0} type="flex" justify="end">
                {this.state.filterRule.map(item => (
                  <Col span={3}>
                    <div className="wp_bodyCol">
                      {item.APPV_MEMBER.length > 0 && (
                        <ul>
                          {item.APPV_MEMBER.map(member => (
                            <>
                              <li>{`${member.NAME_KOR} ${member.PSTN_NAME_KOR}`}</li>
                              <li>
                                {console.debug(item)}
                                {/*
                                <Icon type="check-circle" theme="twoTone" twoToneColor="#52c41a" style={{ margin: '5px', fontSize: '50px', opacity: '0.5' }} />
                                */}
                              </li>
                            </>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </>
          )}
        </div>
        <div>
          {this.state.filterItem.map(item => (
            <div className="dataWrapper">
              <Row type="flex">
                <Col span={4} className="dataLabel">
                  <span>{item.NODE_NAME_KOR}</span>
                </Col>
                <Col span={20} className="dataContents">
                  {item.APPV_MEMBER !== undefined ? (
                    <Input
                      value={item.APPV_MEMBER.map(user => (item.NODE_TYPE === 'ND' ? `${user.DEPT_NAME_KOR}` : `${user.NAME_KOR} ${user.PSTN_NAME_KOR}`))}
                      readOnly
                    />
                  ) : (
                    <Input placeholder={item.NODE_NAME_KOR} readOnly />
                  )}
                </Col>
              </Row>
            </div>
          ))}
        </div>
        {/* {DRAFT_RECEIVE !== undefined && (
          <div>
            <Row>
              <Col span={4}>{DRAFT_RECEIVE.NODE_NAME_KOR}</Col>
              <Col span={20}>
                {DRAFT_RECEIVE.APPV_MEMBER !== undefined ? (
                  <Input
                    value={DRAFT_RECEIVE.APPV_MEMBER.map(item => (DRAFT_RECEIVE.NODE_TYPE === 'ND' ? `${item.DEPT_NAME_KOR}` : `${item.NAME_KOR}`))}
                    readOnly
                  />
                ) : (
                  <Input placeholder={DRAFT_RECEIVE.NODE_NAME_KOR} readOnly />
                )}
              </Col>
            </Row>
          </div>
        )}
        {DRAFT_REFER !== undefined && (
          <div>
            <Row>
              <Col span={4}>{DRAFT_REFER.NODE_NAME_KOR}</Col>
              <Col span={20}>
                {DRAFT_REFER.APPV_MEMBER !== undefined ? (
                  <Input
                    value={DRAFT_REFER.APPV_MEMBER.map(item => (DRAFT_REFER.NODE_TYPE === 'ND' ? `${item.DEPT_NAME_KOR}` : `${item.NAME_KOR}`))}
                    readOnly
                  />
                ) : (
                  <Input placeholder={DRAFT_REFER.NODE_NAME_KOR} readOnly />
                )}
              </Col>
            </Row>
          </div>
        )} */}
        {viewType === 'INPUT' && (
          <div className="btnWrapper">
            <StyledButton className="btn-gray btn-sm" onClick={this.handleOpenModal}>
              결재선변경
            </StyledButton>
          </div>
        )}
        {modalVisible && (
          <WorkProcessModal processRule={processRule} visible={modalVisible} onComplete={this.onProcessRuleComplete} onCloseModal={this.handleCloseModal} />
        )}
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
