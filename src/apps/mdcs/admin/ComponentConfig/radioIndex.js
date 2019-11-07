import React, { Component } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';
import RadioButton from 'apps/mdcs/components/RadioButton';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

const { Option } = Select;

const makeDataSource = apiData => {
  const tempData = [];
  apiData.categoryMapList
    .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
    .map(item =>
      tempData.push({
        value: item.NODE_ID,
        NAME_KOR: item.NAME_KOR,
        NAME_ENG: item.NAME_ENG,
        NAME_CHN: item.NAME_CHN,
        NAME_JPN: item.NAME_JPN,
        NAME_ETC: item.NAME_ETC,
      }),
    );
  return tempData;
};

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    radioValue: undefined,
    defaultFlag: 2,
    defaultValue: undefined,
    dataSource: [],
    apiArray: [],
    apiFlag: true,
  };

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHanlder, id } = this.props;
    const apiArray = [{ key: `radioMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    this.setState({ apiArray, rootMapValue: value, apiFlag: true });
    getCallDataHanlder(id, apiArray);
  };

  resetDataSource = () => {
    this.setState({ dataSource: [], radioValue: undefined, defaultValue: undefined });
  };

  onClickSave = () => {
    // 필요한 사항 defaultValue,apiArray,,
    console.log(JSON.stringify(this.state.apiArray));
    console.log(JSON.stringify(this.state.defaultValue));
  };

  render() {
    const {
      result,
      result: { rootMap },
    } = this.props;
    if (this.state.apiFlag && result && result[`radioMapInfo${this.state.rootMapValue}`]) {
      this.setState({ dataSource: makeDataSource(result[`radioMapInfo${this.state.rootMapValue}`]), apiFlag: false });
    }
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
                  <Col span={3}>분류체계 설정</Col>
                  <Col span={21}>
                    <Select
                      style={{ width: 300, marginRight: 10 }}
                      placeholder="분류체계를 설정해주세요"
                      value={this.state.rootMapValue}
                      onChange={value => {
                        this.getCategorieMapList(value);
                      }}
                    >
                      {rootMap &&
                        rootMap.rootMapList &&
                        rootMap.rootMapList
                          .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT === 0)
                          .map(item => (
                            <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                              {item.NAME_KOR}
                            </Option>
                          ))}
                    </Select>
                  </Col>
                </div>
              </Row>

              <Row>
                <div className="w100Table">
                  <Col span={3}>기본값 설정여부</Col>
                  <Col span={21}>
                    <Radio.Group
                      value={this.state.defaultFlag}
                      onChange={e => {
                        this.setState({ defaultFlag: e.target.value, defaultValue: undefined });
                      }}
                    >
                      <Radio value={1}>가능</Radio>
                      <Radio value={2}>불가능</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              {this.state.defaultFlag === 1 && (
                <Row>
                  <div className="w100Table">
                    <Col span={3}>기본값 설정</Col>
                    <Col span={21}>
                      <RadioButton
                        value={this.state.defaultValue}
                        onChange={e => this.setState({ defaultValue: e.target.value })}
                        dataSource={this.state.dataSource}
                      ></RadioButton>
                    </Col>
                  </div>
                </Row>
              )}

              <Row>
                <div className="w100Table">
                  <Col span={3}>PreView</Col>
                  <Col span={21}>
                    <RadioButton
                      defaultValue={this.state.defaultValue}
                      value={this.state.radioValue}
                      onChange={e => this.setState({ radioValue: e.target.value })}
                      dataSource={this.state.dataSource}
                    ></RadioButton>
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

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
