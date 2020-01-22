import React, { Component } from 'react';
import { Row, Col, Select, Input, Radio } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';

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
    const { getCallDataHanlder, sagaKey: id, apiArray } = this.props;
    getCallDataHanlder(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHanlder, sagaKey: id } = this.props;
    const apiArray = [{ key: 'categoryMapInfo', url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    const saveArray = [{ key: `selectMapInfo${value}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`, type: 'GET' }];
    this.setState({ apiArray: saveArray, apiKey: `selectMapInfo${value}` });

    getCallDataHanlder(id, apiArray);
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const {
      result: { rootMap, categoryMapInfo },
      groupIndex,
      rowIndex,
      colIndex,
      configInfo,
    } = this.props;
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>분류체계 설정</Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                placeholder="분류체계를 설정해주세요"
                value={(configInfo && configInfo.property && configInfo.property.mapId) || undefined}
                onChange={value => {
                  this.handleChangeViewCompData('mapId', value);
                  // this.getCategorieMapList(value);
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
          <div>
            <Col span={6}>PlaceHolder 설정</Col>
            <Col span={18}>
              <Input
                style={{ width: '100%' }}
                value={(configInfo && configInfo.property && configInfo.property.placeholder) || undefined}
                onChange={e => this.handleChangeViewCompData('placeholder', e.target.value)}
              ></Input>
            </Col>
          </div>
        </Row>
        {/*

        <Row>
          <div className="w100Table">
            <Col span={3}>기본값 설정</Col>
            <Col span={21}>
              <Select
                placeholder="기본값을 설정해주세요"
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
                    */}
      </div>
    );
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="SelectCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);
ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
