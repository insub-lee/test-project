import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Divider, Button } from 'antd';
import { DragDropContext } from 'react-beautiful-dnd';
import styled from 'styled-components';

import ItemBody from './ItemBody';

const SignLineWrapper = styled.div`
  height: 514px;
`;

class SignLine extends Component {
  componentDidMount() {}

  render() {
    const { processStep, activeStep, action } = this.props;

    return (
      <SignLineWrapper className="content-body">
        <Row gutter={10}>
          <Col span={24}>
            <Divider orientation="left">결재선</Divider>
          </Col>
        </Row>
        <Row gutter={10}>
          <Col span={24}>
            <div style={{ height: '380px', overflowY: 'auto' }}>
              <DragDropContext onDragEnd={action.onDragEnd}>
                <ItemBody items={processStep} dropId="process" activeStep={activeStep} action={action} />
              </DragDropContext>
            </div>
          </Col>
        </Row>
        <Row gutter={10} style={{ marginTop: '15px', marginBottom: '15px' }}>
          <Col span={24} style={{ textAlign: 'center' }}>
            <Button type="primary" onClick={action.onAddStep}>
              추가
            </Button>
          </Col>
        </Row>
      </SignLineWrapper>
    );
  }
}

SignLine.propTypes = {
  processStep: PropTypes.array.isRequired,
  activeStep: PropTypes.number.isRequired,
  action: PropTypes.object.isRequired,
};

export default SignLine;
