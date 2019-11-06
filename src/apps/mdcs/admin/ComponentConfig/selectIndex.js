import React, { Component } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import StyledContent from '../../styled/Modals/StyledContent';

const { Option } = Select;

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    placeHolderValue: '',
    defaultFlag: 2,
    selectValue: undefined,
    selectDefaultValue: undefined,
    apiArray: undefined,
    apiKey: '',
  };

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHanlder, id } = this.props;
    const apiArray = [{ key: 'categoryMapInfo', url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    const saveArray = [{ key: `selectMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    this.setState({ apiArray: saveArray, apiKey: `selectMapInfo${value}` });

    getCallDataHanlder(id, apiArray);
  };

  onClickSave = () => {
    // 필요한것 apiArray placeholderValue defaultValue apiKey
    console.log(this.state.apiKey);
    console.log(JSON.stringify(this.state.apiArray));
    console.log(this.state.placeHolderValue);
    console.log(this.state.selectDefaultValue);
  };

  render() {
    const {
      result: { rootMap, categoryMapInfo },
    } = this.props;
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
                        this.setState({ rootMapValue: value, selectValue: undefined, selectDefaultValue: undefined });
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
                  <Col span={3}>기본값 설정여부</Col>
                  <Col span={21}>
                    {' '}
                    <Radio.Group
                      value={this.state.defaultFlag}
                      onChange={e => {
                        this.setState({ defaultFlag: e.target.value, selectDefaultValue: undefined });
                      }}
                    >
                      <Radio value={1}>가능</Radio>
                      <Radio value={2}>불가능</Radio>
                    </Radio.Group>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>기본값 설정</Col>
                  <Col span={21}>
                    <Select
                      placeholder="기본값을 설정해주세요"
                      disabled={this.state.defaultFlag === 2}
                      value={this.state.selectDefaultValue}
                      onChange={value => {
                        this.setState({ selectDefaultValue: value });
                      }}
                    >
                      {categoryMapInfo &&
                        categoryMapInfo.categoryMapList &&
                        categoryMapInfo.categoryMapList
                          .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
                          .map(item => (
                            <Option key={`CategorieMapDefault_${item.NODE_ID}`} value={item.NODE_ID}>
                              {item.NAME_KOR}
                            </Option>
                          ))}
                    </Select>
                  </Col>
                </div>
              </Row>
              <Row>
                <div className="w100Table">
                  <Col span={3}>PreView</Col>
                  <Col span={21}>
                    <Select
                      placeholder={this.state.placeHolderValue}
                      value={this.state.selectValue || this.state.selectDefaultValue}
                      onChange={value => {
                        this.setState({ selectValue: value });
                      }}
                    >
                      {categoryMapInfo &&
                        categoryMapInfo.categoryMapList &&
                        categoryMapInfo.categoryMapList
                          .filter(x => x.LVL > 0 && x.USE_YN === 'Y')
                          .map(item => (
                            <Option key={`CategorieMap_${item.NODE_ID}`} value={item.NODE_ID}>
                              {item.NAME_KOR}
                            </Option>
                          ))}
                    </Select>
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

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
