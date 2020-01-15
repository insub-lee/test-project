import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Select, Button, Tag } from 'antd';

import BizMicroDevBase from 'components/BizMicroDevBase';
import CheckSelectList from 'apps/mdcs/components/CheckSelectList';

import StyledButton from 'apps/mdcs/styled/StyledButton';
import data from 'apps/mdcs/user/ApprovalRequest/Widget/data';
import StyledContent from '../../styled/Modals/StyledContent';

const { Option } = Select;

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    rootMapName: undefined,
    selected: undefined,
  };

  componentDidMount() {
    const { getCallDataHanlder, id, apiArray, changeCompData, groupIndex, rowIndex, colIndex } = this.props;
    getCallDataHanlder(id, apiArray);
    changeCompData(groupIndex, rowIndex, colIndex, 'mapId', []);
  }

  onClickHandler = () => {
    const { rootMapValue, rootMapName, selected } = this.state;
    const {
      configInfo: { mapId },
      changeCompData,
      groupIndex,
      rowIndex,
      colIndex,
    } = this.props;
    if (mapId.findIndex(x => x === rootMapValue) === -1) {
      const tempData = mapId;
      const tempName = selected || [];
      tempData.push(rootMapValue);
      tempName.push(rootMapName);
      changeCompData(groupIndex, rowIndex, colIndex, 'mapId', tempData);
      this.setState({ selected: tempName });
    } else {
      alert('중복선택');
    }
  };

  onRemoveHandler = () => {
    const { changeCompData, groupIndex, rowIndex, colIndex } = this.props;
    changeCompData(groupIndex, rowIndex, colIndex, 'mapId', []);
    this.setState({ selected: undefined });
  };

  render() {
    const {
      result,
      configInfo: { mapId },
    } = this.props;
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
