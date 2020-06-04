import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Input, TreeSelect, Radio } from 'antd';
import { getTreeFromFlatData } from 'react-sortable-tree';

import BizMicroDevBase from 'components/BizMicroDevBase';

const { Option } = Select;

const getCategoryMapListAsTree = (flatData, flag) =>
  getTreeFromFlatData({
    flatData: flatData.map(item => ({
      title: `${item.NAME_KOR}(${item.NODE_ID})`,
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
  constructor(prop) {
    super(prop);
    this.state = {
      selectableFlag: 'Y',
    };
  }

  componentDidMount() {
    const { getCallDataHandler, sagaKey: id, apiArray, configInfo } = this.props;
    getCallDataHandler(id, apiArray);
    if (configInfo && configInfo.property && configInfo.property.mapId) {
      this.getCategorieMapList(configInfo.property.mapId);
    }
  }

  getCategorieMapList = value => {
    const { getCallDataHandler, sagaKey: id } = this.props;
    const apiArray = [
      {
        key: `categoryMapInfo`,
        url: `/api/admin/v1/common/categoryMapList?MAP_ID=${value}`,
        type: 'GET',
      },
    ];
    getCallDataHandler(id, apiArray);
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const {
      result: { rootMap, categoryMapInfo },
      configInfo,
    } = this.props;

    const categoryData =
      categoryMapInfo && categoryMapInfo.categoryMapList && getCategoryMapListAsTree(categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y')).length > 0
        ? getCategoryMapListAsTree(
            categoryMapInfo.categoryMapList.filter(x => x.USE_YN === 'Y'),
            this.state.selectableFlag,
          )[0]
        : [];
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">분류체계설정</span>
          <Select
            style={{ width: '100%' }}
            placeholder="분류체계를 설정해주세요"
            value={(configInfo && configInfo.property && configInfo.property.mapId) || undefined}
            onChange={value => {
              this.handleChangeViewCompData('mapId', value);
              this.getCategorieMapList(value);
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
        </div>
        {configInfo && configInfo.property && configInfo.property.mapId ? (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">RootKey설정</span>
            <TreeSelect
              style={{ width: '100%' }}
              value={(configInfo && configInfo.property && configInfo.property.rootkey) || undefined}
              dropdownStyle={{ maxHeight: 400, overflow: 'auto' }}
              treeData={categoryData.children}
              onChange={value => {
                this.handleChangeViewCompData('rootkey', value);
              }}
              placeholder="Root key를 설정해주세요"
            />
          </div>
        ) : (
          ''
        )}
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">PlaceHolder 설정</span>
          <Input
            value={configInfo && configInfo.property && configInfo.property.placeholder}
            onChange={e => this.handleChangeViewCompData('placeholder', e.target.value)}
          ></Input>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">상위노드 선택 가능여부</span>
          <Radio.Group
            value={(configInfo && configInfo.property && configInfo.property.selectableFlag) || undefined}
            onChange={e => {
              this.handleChangeViewCompData('selectableFlag', e.target.value);
            }}
          >
            <Radio value="Y">가능</Radio>
            <Radio value="N">불가능</Radio>
          </Radio.Group>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">표시 언어</span>
          <Select
            style={{ width: '100%' }}
            placeholder="표시 언어를 선택해주세요"
            value={(configInfo && configInfo.property && configInfo.property.viewLang) || 'KOR'}
            onChange={value => {
              this.handleChangeViewCompData('viewLang', value);
            }}
          >
            <Option value="KOR">한국어</Option>
            <Option value="ENG">영어</Option>
          </Select>
        </div>
      </>
    );
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    sagaKey="TreeSelectCompConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

configer.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  result: PropTypes.any,
  sagaKey: PropTypes.string,
  getCallDataHandler: PropTypes.func,
  apiArray: PropTypes.array,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

ComponentConfig.defaultProps = {
  apiArray: [{ key: 'rootMap', url: `/api/admin/v1/common/categoryRootMap`, type: 'GET' }],
};
export default configer;
