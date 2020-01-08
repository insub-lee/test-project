import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Button, Tag } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';


const { Option } = Select;

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    rootMapName: undefined,
    selected: undefined,
  };

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray, changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    getCallDataHanlder(id, apiArray, this.initChkList);
    // configInfo.property.mapId = [];
    // changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  }

  initChkList = () => {
    const { result, configInfo } = this.props;
    const mapId = (configInfo && configInfo.property && configInfo.property.mapId) || [];
    const tempName = [];
    const rootMapList = (result && result.rootMap && result.rootMap.rootMapList) || [];
    if(mapId.length > 0){
      const list = rootMapList.filter(map => mapId.indexOf(map.MAP_ID) > -1);
      list.map(map => tempName.push(map.NAME_KOR));
      this.setState({ selected: tempName });
    }
  };

  onClickHandler = () => {
    const { rootMapValue, rootMapName, selected } = this.state;
    const { configInfo, changeViewCompData, groupIndex, rowIndex, colIndex } = this.props;
    const mapId = (configInfo && configInfo.property && configInfo.property.mapId) || [];
    if (mapId.findIndex(x => x === rootMapValue) === -1) {
      const tempData = mapId;
      const tempName = selected ? selected : [];
      tempData.push(rootMapValue);
      tempName.push(rootMapName);
      configInfo.property.mapId = tempData;
      changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
      this.setState({ selected: tempName });
    } else {
      alert('중복선택');
    }
  };

  onRemoveHandler = () => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.mapId = [];
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
    this.setState({selected: undefined});
  };

  render() {
    const { result, configInfo } = this.props;
    const mapId = (configInfo && configInfo.property && configInfo.property.mapId) || [];
    return (
      <div>
        <Row>
          <div>
            <Col span={6}>체크리스트</Col>
            <Col span={18}>
              <Select
                style={{ width: '100%' }}
                placeholder="분류체계를 설정해주세요"
                value={this.state.rootMapValue}
                onChange={(value, opt) => {
                  this.setState({ rootMapValue: value, rootMapName: opt.props.children });
                }}
              >
                {result.rootMap &&
                  result.rootMap.rootMapList
                    .filter(x => x.USE_YN === 'Y' && x.CHILDREN_CNT === 0)
                    .map(item => (
                      <Option key={`RootMap_${item.MAP_ID}`} value={item.MAP_ID}>
                        {item.NAME_KOR}
                      </Option>
                    ))}
              </Select>
              {mapId && mapId.length < 5 && <Button onClick={this.onClickHandler}>리스트추가</Button>}
              <Button onClick={this.onRemoveHandler}>리스트 초기화</Button>
            </Col>
          </div>
        </Row>
        <Row>
          <Col span={6}>선택된 리스트</Col>
          <Col span={18}>{this.state.selected && this.state.selected.map(list => <Tag>{list}</Tag>)}</Col>
        </Row>
      </div>
    );
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
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
