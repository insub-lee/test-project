import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';

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

  onProcessStepComplete = processStep => {
    this.setState({ modalVisible: false });
    console.debug('#### processStep >> ', processStep);
    this.props.setProcessStep(this.props.id, processStep);
  };

  render() {
    const { processRule } = this.props;
    const { modalVisible } = this.state;
    const { DRAFT_PROCESS_STEP } = processRule;

    return (
      <StyledWorkProcess>
        <div className="signLineWrapper">
          {DRAFT_PROCESS_STEP !== undefined && DRAFT_PROCESS_STEP.length > 0 && (
            <React.Fragment>
              <Row gutter={0}>
                {DRAFT_PROCESS_STEP.map(item => (
                  <Col span={6} key={`headCol_${item.NODE_ID}`}>
                    <div>
                      <span>{item.NODE_NAME_KOR}</span>
                    </div>
                  </Col>
                ))}
              </Row>
              <Row gutter={0}>
                {DRAFT_PROCESS_STEP.map(item => (
                  <Col span={6}>
                    <div className="wp_bodyCol">
                      {item.APPV_MEMBER.length > 0 && (
                        <ul>
                          {item.APPV_MEMBER.map(member => (
                            <li>{`${member.USER_NAME} ${member.PSTN_NAME}`}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </Col>
                ))}
              </Row>
            </React.Fragment>
          )}
        </div>
        <div className="btnWrapper">
          <StyledButton className="btn-gray btn-sm" onClick={this.handleOpenModal}>
            결재선변경
          </StyledButton>
        </div>
        {modalVisible && (
          <WorkProcessModal
            processStep={DRAFT_PROCESS_STEP}
            visible={modalVisible}
            onComplete={this.onProcessStepComplete}
            onCloseModal={this.handleCloseModal}
          />
        )}
      </StyledWorkProcess>
    );
  }
}

WorkProcess.propTypes = {
  id: PropTypes.string,
  PRC_ID: PropTypes.number,
  processRule: PropTypes.object,
  setProcessStep: PropTypes.func,
};

WorkProcess.defaultProps = {
  PRC_ID: -1,
  processRule: {
    DRAFT_PROCESS_STEP: [],
  },
};

export default WorkProcess;
