import React, { Component } from 'react';
import { Row, Col, Input, Radio } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

class ComponentConfig extends Component {
  state = {
    lableValue: undefined,
    copyKey: '',
    compKey: '',
  };

  componentDidMount() {}

  onClickSave = () => {
    const { copyKey, compKey } = this.state;
    console.log('copyKey:', copyKey);
    console.log('compKey:', compKey);
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
                  <Col span={3}>Copy옵션 정의 </Col>
                  <Col span={21}>
                    <Row>
                      CopyKey컬럼명:<Input value={this.state.copyKey} onChange={e => this.setState({ copyKey: e.target.value })}></Input>
                    </Row>
                    <Row>
                      CompKey컬럼명:<Input value={this.state.compKey} onChange={e => this.setState({ compKey: e.target.value })}></Input>
                    </Row>
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

export default configer;
