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

  componentDidMount() {}

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
    const { processRule, viewType } = this.props;
    const { modalVisible } = this.state;
    const { DRAFT_PROCESS_STEP } = processRule;

    let colSpan = 6;
    let filterRule = [];
    let filterItem = [];
    if (DRAFT_PROCESS_STEP !== undefined && DRAFT_PROCESS_STEP !== null) {
      filterRule = DRAFT_PROCESS_STEP.filter(item => item.NODE_GUBUN === 1 && item.VIEW_TYPE === 1); // 결재, 인장
      filterItem = DRAFT_PROCESS_STEP.filter(item => item.VIEW_TYPE === 2); // 시스템, 항목
      colSpan = Math.floor(24 / filterRule.length);
    }
    console.debug('workprocess', this.props);
    return (
      <StyledWorkProcess>
        <div className="signLineWrapper">
          {filterRule !== undefined && filterRule.length > 0 && (
            <>
              <Row gutter={0} type="flex" justify="end" className="table-head">
                {filterRule.map(item => (
                  <Col span={3} key={`headCol_${item.NODE_ID}`}>
                    <div>
                      <span>{item.NODE_NAME_KOR}</span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row gutter={0} type="flex" justify="end">
                {filterRule.map(item => (
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
          {filterItem.map(item => (
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
};

WorkProcess.defaultProps = {
  PRC_ID: -1,
  processRule: {
    DRAFT_PROCESS_STEP: [],
  },
  viewType: 'INPUT',
};

export default WorkProcess;
