import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Checkbox, InputNumber, Select, TreeSelect, Button } from 'antd';
import { debounce } from 'lodash';
import { getTreeFromFlatData } from 'react-sortable-tree';

import { ConfigInfo } from './ConfigInfo';

import Styled from './Styled';

const getTreeData = flatData =>
  getTreeFromFlatData({
    flatData,
    getKey: node => node.COL_GROUP_IDX,
    getParentKey: node => node.COL_GROUP_PIDX,
    rootKey: 0,
  });

class CompModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colGroupList: [],
    };
    this.handleChangeData = debounce(this.handleChangeData, 500);
    this.handleChangeCompConfig = debounce(this.handleChangeCompConfig, 500);
  }

  componentDidMount() {
    const { compPoolList, configProps, compGroupList } = this.props;
    const { comp } = configProps;
    const aryColList = compPoolList
      .filter(fNode => fNode.COL_DB_TYPE === comp.CONFIG.info.type || fNode.COL_DB_TYPE === 'NONE')
      .map(item => ({
        ...item,
        title: item.COMP_NAME,
        value: item.COMP_SRC,
        key: item.COMP_SRC,
      }));
    const flatData = compGroupList.map(node => {
      const tempList = aryColList.filter(fNode => fNode.COL_GROUP_IDX === node.COL_GROUP_IDX) || [];
      if (tempList.length > 0)
        return {
          ...node,
          title: node.COL_GROUP_NAME,
          value: node.COL_GROUP_IDX,
          key: node.COL_GROUP_IDX,
          children: tempList,
          selectable: false,
        };
      return { ...node, label: node.COL_GROUP_NAME, value: node.COL_GROUP_IDX, selectable: false };
    });
    const colGroupList = getTreeData(flatData);
    const filterTreeData = [];
    colGroupList.forEach(node => {
      if (node.children) {
        const tempNode = { ...node, children: [] };
        node.children.forEach(subNode => {
          if (subNode.children && subNode.children.length > 0) {
            tempNode.children.push(subNode);
          }
        });
        if (tempNode.children.length > 0) {
          filterTreeData.push(tempNode);
        }
      }
    });
    this.setState({ colGroupList: filterTreeData });
  }

  handleChangeData = (key, value) => {
    const {
      action: { changeCompFieldData, changeHiddenCompData },
      configProps,
      hiddenField,
    } = this.props;
    const hiddenCompIdx = hiddenField.findIndex(iNode => iNode.CONFIG.property.compKey === configProps.comp.CONFIG.property.compKey);
    const comp = hiddenField[hiddenCompIdx];
    changeCompFieldData(comp.CONFIG.property.compKey, key, value);
    changeHiddenCompData(hiddenCompIdx, key, value);
  };

  handleChangeCompConfig = (key, value, configKey) => {
    const {
      action: { changeCompFieldData, changeHiddenCompData },
      configProps,
      hiddenField,
    } = this.props;
    const hiddenCompIdx = hiddenField.findIndex(iNode => iNode.CONFIG.property.compKey === configProps.comp.CONFIG.property.compKey);
    const comp = hiddenField[hiddenCompIdx];
    const { CONFIG } = comp;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig[configKey][key] = value;
    changeCompFieldData(comp.CONFIG.property.compKey, 'CONFIG', nextConfig);
    changeHiddenCompData(hiddenCompIdx, 'CONFIG', nextConfig);
  };

  handleChangeCompSetting = value => {
    const {
      action: { changeCompFieldData, changeHiddenCompData },
      compPoolList,
      configProps,
      hiddenField,
    } = this.props;
    const hiddenCompIdx = hiddenField.findIndex(iNode => iNode.CONFIG.property.compKey === configProps.comp.CONFIG.property.compKey);
    const comp = hiddenField[hiddenCompIdx];
    const { CONFIG } = comp;
    const compIdx = compPoolList.findIndex(iNode => iNode.COMP_SRC === value);
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.COMP_SRC = value;
    nextConfig.property.COMP_SETTING_SRC = compPoolList[compIdx].COMP_SETTING_SRC;
    nextConfig.property.COMP_NAME = compPoolList[compIdx].COMP_NAME;
    // changeCompFieldData(CONFIG.property.compKey, 'CONFIG', nextConfig);
    // changeCompFieldData(CONFIG.property.compKey, 'COMP_TAG', compPoolList[compIdx].COMP_TAG);
    changeHiddenCompData(hiddenCompIdx, 'CONFIG', nextConfig);
    changeHiddenCompData(hiddenCompIdx, 'COMP_TAG', compPoolList[compIdx].COMP_TAG);
  };

  handleChangeCompPersonalConfig = (groupIndex, rowIndex, colIndex, key, value) => {
    const {
      action: { changeCompFieldData, changeHiddenCompData },
      configProps,
      hiddenField,
    } = this.props;
    const hiddenCompIdx = hiddenField.findIndex(iNode => iNode.CONFIG.property.compKey === configProps.comp.CONFIG.property.compKey);
    // changeCompFieldData(configProps.comp.CONFIG.property.compKey, key, value);
    changeHiddenCompData(hiddenCompIdx, key, value);
  };

  render() {
    const { configProps, onCloseModal, hiddenField, action } = this.props;
    const { submitHandlerBySaga } = action;
    const comp = hiddenField[hiddenField.findIndex(iNode => iNode.CONFIG.property.compKey === configProps.comp.CONFIG.property.compKey)];
    if (!comp) {
      return <div />;
    }
    const hiddenConfigProps = { ...configProps, changeViewCompData: this.handleChangeCompPersonalConfig };
    return (
      <Styled className="popoverWrapper">
        <div className="popoverInnerInput">
          <p className="popover-tit">컬럼 설정</p>
          <table className="popoverInnerTable">
            <colgroup>
              <col width="50%" />
              <col width="25%" />
              <col width="25%" />
            </colgroup>
            <thead>
              <tr>
                <th>컬럼명</th>
                <th>Size</th>
                <th>기본값</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    placeholder="아이디"
                    defaultValue={comp.COMP_FIELD}
                    readOnly={comp.FIELD_TYPE === 'SYS'}
                    onChange={e => {
                      const value = e.target.value.replace(/[^0-9A-Z_]/gi, '').toUpperCase();
                      e.target.value = value;
                      this.handleChangeData('COMP_FIELD', value);
                    }}
                  />
                </td>
                <td>
                  <InputNumber
                    placeholder="사이즈"
                    style={{ width: '100%' }}
                    min={0}
                    max={100000000000}
                    defaultValue={comp.CONFIG.info.size || 0}
                    onChange={value => this.handleChangeCompConfig('size', value, 'info')}
                  />
                </td>
                <td>
                  <Input
                    placeholder="디폴트값"
                    defaultValue={comp.CONFIG.info.defaultValue}
                    onChange={e => this.handleChangeCompConfig('defaultValue', e.target.value, 'info')}
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="popoverInner">
          <p className="popover-tit">
            컴포넌트 설정
            <Button type="primary" onClick={onCloseModal}>
              Save
            </Button>
          </p>
          <div className="popoverInnerCom">
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컴포넌트 설정</span>
              <TreeSelect
                defaultValue={comp.CONFIG.property.COMP_SRC}
                onChange={value => this.handleChangeCompSetting(value)}
                style={{ width: '100%' }}
                treeData={this.state.colGroupList}
                placeholder="컴포넌트 선택해주세요"
              />
            </div>
            {ConfigInfo[comp.CONFIG.property.COMP_SETTING_SRC] && (
              <div>{ConfigInfo[comp.CONFIG.property.COMP_SETTING_SRC].renderer({ ...hiddenConfigProps, configInfo: comp.CONFIG, submitHandlerBySaga })}</div>
            )}
          </div>
        </div>
      </Styled>
    );
  }
}

export default CompModal;
