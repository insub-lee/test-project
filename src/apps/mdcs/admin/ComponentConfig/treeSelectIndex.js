import React, { Component } from 'react';
import { Row, Col, Select, Input, TreeSelect, Radio } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;
const { SHOW_PARENT } = TreeSelect;

const getCategoryMapListAsTree = (flatData, flag) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: item.NAME_KOR,
      value: item.NODE_ID,
      key: item.NODE_ID,
      parentValue: item.PARENT_NODE_ID,
      selectable: flag === 'Y' || item.CHILDREN_CNT === 0,
    })),

    getKey: node => node.key,
    getParentKey: node => node.parentValue,
    rootKey: 0,
  });

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    selectableFlag: 'Y',
    defaultFlag: 2,
    treeSelectDefaultValue: undefined,
    apiArray: '',
    apiKey: '',
  };

  componentDidMount() {
    const { getCallDataHandler, id, apiArray } = this.props;
    getCallDataHandler(id, apiArray);
  }

  getCategorieMapList = value => {
    const { getCallDataHandler, id } = this.props;
    const apiArray = [
      {
        key: `categoryMapInfo`,
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiArray);
  };

  render() {
    const {
      result: { rootMap, categoryMapInfo },
      changeCompData,
      groupIndex,
      rowIndex,
      colIndex,
      configInfo,
    } = this.props;

    // const categoryData =
    //   categoryMapInfo && categoryMapInfo.categoryMapList && getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y')).length > 0
    //     ? getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'), this.state.selectableFlag)[0]
    //     : [];
    return (
      <div>
        <Row>
          <Col span={6}>분류체계설정</Col>
          <Col span={18}>
            <Select
              style={{ width: '100%' }}
              placeholder="분류체계를 설정해주세요"
              value={(configInfo && configInfo.mapId) || undefined}
              onChange={value => {
                changeCompData(groupIndex, rowIndex, colIndex, 'mapId', value);
                this.setState({
                  rootMapValue: value,
                  treeSelectDefaultValue: undefined,
                });
                // this.getCategorieMapList(value);
              }}
            >
              {rootMap &&
                rootMap.rootMapList &&
                rootMap.rootMapList
                  .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT !== 0)
                  .map(item => (
                    <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                      {item.NAME_KOR}
                    </Option>
                  ))}
            </Select>
          </Col>
        </Row>
        <Row>
          <Col span={6}>PlaceHolder 설정</Col>
          <Col span={18}>
            <Input
              value={configInfo && configInfo.placeholder}
              onChange={e => changeCompData(groupIndex, rowIndex, colIndex, 'placeholder', e.target.value)}
            ></Input>
          </Col>
        </Row>
        <Row>
          <Col span={6}>상위노드 선택 가능여부</Col>
          <Col span={18}>
            {' '}
            <Radio.Group
              value={(configInfo && configInfo.selectableFlag) || undefined}
              onChange={e => {
                changeCompData(groupIndex, rowIndex, colIndex, 'selectableFlag', e.target.value);
              }}
            >
              <Radio value="Y">가능</Radio>
              <Radio value="N">불가능</Radio>
            </Radio.Group>
          </Col>
        </Row>
        {/* 
              <Row>
                <div className="w100Table">
                  <Col span={6}>기본값 설정</Col>
                  <Col span={18}>
                    <TreeSelect
                      style={{ width: 300, marginRight: 10 }}
                     value={configInfo && configInfo.defaultValue || undefined}
                      disabled={this.state.defaultFlag === 2}
                      dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
                      treeData={categoryData.children}
                      onChange={value =>    changeCompData(groupIndex, rowIndex, colIndex, 'defaultValue', e.target.value);)}
                      placeholder="기본값 설정"
                    />
                  </Col>
                </div>
              </Row>
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

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
