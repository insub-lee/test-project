import React, { Component } from 'react';
import { Row, Col, Select, Input } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

class ComponentConfig extends Component {
  state = {
    lableValue: undefined,
  };

  componentDidMount() {}

  onClickSave = () => {
    // console.log(lableValue);
  };

  render() {
    return (
      <StyledContent>
        <div>
          <Row>
            <div className="pop_tit" style={{ background: 'white', color: 'black' }}>
              컴포넌트 설정
            </div>
          </Row>
          <div className="pop_con">
            <div className="sub_form">
              <Row>
                <div className="w100Table">
                  <Col span={3}>Lable명</Col>
                  <Col span={21}>
                    <Input value={this.state.lableValue} onChange={e => this.setState({ lableValue: e.target.value })}></Input>
                  </Col>
                </div>
              </Row>

              <Row>
                <div className="w100Table">
                  <Col span={3}>PreView</Col>
                  <Col span={21}>
                    <span>{this.state.lableValue}</span>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="btn-wrap">
                  <StyledButton
                    className="btn-primary"
                    onClick={() => {
                      this.onClickSave();
                    }}
                  >
                    등록
                  </StyledButton>
                </div>
              </Row>
            </div>
          </div>
        </div>
      </StyledContent>
    );
  }
}
const configer = () => <BizMicroDevBase id="componentConfig" component={ComponentConfig}></BizMicroDevBase>;

ComponentConfig.defaultProps = {};
export default configer;
