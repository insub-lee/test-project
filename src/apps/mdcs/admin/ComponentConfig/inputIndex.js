import React, { Component } from 'react';
import { Row, Col, Input, Radio } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

class ComponentConfig extends Component {
  state = {
    defaultFlag: 2,
    readOnly: 'N',
    defaultValue: '',
    placeHolderValue: '',
    inputValue: '',
  };

  componentDidMount() {}

  onClickSave = () => {
    const { defaultValue, placeHolderValue, readOnly } = this.state;
    console.log(defaultValue === '' ? null : defaultValue);
    console.log(placeHolderValue === '' ? null : placeHolderValue);
    console.log(readOnly);
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
                  <Col span={3}>기본값 설정여부</Col>
                  <Col span={21}>
                    <Radio.Group
                      value={this.state.defaultFlag}
                      onChange={e => {
                        this.setState({ defaultFlag: e.target.value, defaultValue: '' });
                      }}
                    >
                      <Radio value={1}>사용</Radio>
                      <Radio value={2}>미사용</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>

              <Row>
                <div className="w100Table">
                  <Col span={3}>ReadOnly</Col>
                  <Col span={21}>
                    {' '}
                    <Radio.Group
                      value={this.state.readOnly}
                      onChange={e => {
                        this.setState({ readOnly: e.target.value, inputValue: '' });
                      }}
                    >
                      <Radio value="Y">Y</Radio>
                      <Radio value="N">N</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              {this.state.defaultFlag === 1 && (
                <Row>
                  <div className="w100Table">
                    <Col span={3}>기본값설정</Col>
                    <Col span={21}>
                      <Input value={this.state.defaultValue} onChange={e => this.setState({ defaultValue: e.target.value })}></Input>
                    </Col>
                  </div>
                </Row>
              )}
              <Row>
                <div className="w100Table">
                  <Col span={3}>PlaceHolder 설정</Col>
                  <Col span={21}>
                    <Input
                      style={{ width: 500, marginRight: 10 }}
                      value={this.state.placeHolderValue}
                      onChange={e => this.setState({ placeHolderValue: e.target.value })}
                    ></Input>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>Preview</Col>
                  <Col span={21}>
                    <Input
                      value={this.state.inputValue}
                      onChange={e => this.setState({ inputValue: e.target.value })}
                      readOnly={this.state.readOnly === 'Y'}
                      style={{ width: 500, marginRight: 10 }}
                      placeholder={this.state.placeHolderValue}
                    ></Input>
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
