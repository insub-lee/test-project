import React, { Component } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
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
    const { getCallDataHandler, id, apiArray } = this.props;
    getCallDataHandler(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHandler, id } = this.props;
    const apiArray = [{ key: `radioMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    this.setState({ apiArray, rootMapValue: value, apiFlag: true });
    getCallDataHandler(id, apiArray);
  };

  render() {
    const {
      result: { rootMap },
      changeCompData,
      groupIndex,
      rowIndex,
      colIndex,
      configInfo,
    } = this.props;

    // if (this.state.apiFlag && result && result[`radioMapInfo${this.state.rootMapValue}`]) {
    //   this.setState({ dataSource: makeDataSource(result[`radioMapInfo${this.state.rootMapValue}`]), apiFlag: false });
    // }
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>분류체계 설정</Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                placeholder="분류체계를 설정해주세요"
                value={(configInfo && configInfo.mapId) || undefined}
                onChange={value => {
                  // this.getCategorieMapList(value);
                  changeCompData(groupIndex, rowIndex, colIndex, 'mapId', value);
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
        {/*
        <Row>
          <div className="w100Table">
            <Col span={6}>기본값 설정여부</Col>
            <Col span={18}>
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
              <Col span={6}>기본값 설정</Col>
              <Col span={18}>
                <RadioButton
                  value={this.state.defaultValue}
                  onChange={e => this.setState({ defaultValue: e.target.value })}
                  dataSource={this.state.dataSource}
                ></RadioButton>
              </Col>
            </div>
          </Row>
        )}
        */}
      </div>
    );
  }
}

const configer = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    changeCompData={changeCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);
ComponentConfig.defaultProps = {};
export default configer;

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
