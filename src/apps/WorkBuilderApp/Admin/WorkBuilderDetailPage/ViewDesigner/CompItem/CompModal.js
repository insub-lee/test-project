import React, { Component } from 'react';
import moment from 'moment';
import * as PropTypes from 'prop-types';
import { Input, Checkbox, InputNumber, Select, TreeSelect, Button, DatePicker as AntdDatePicker } from 'antd';
import { debounce } from 'lodash';
import { getTreeFromFlatData } from 'react-sortable-tree';

import message from 'components/Feedback/message';
import MessageContent from 'components/Feedback/message.style2';
import { ConfigInfo } from 'components/BizBuilder/ConfigInfo';

import Styled from './Styled';

const { Option } = Select;
const { TextArea } = Input;

const getTreeData = flatData =>
  getTreeFromFlatData({
    flatData,
    getKey: node => node.COL_GROUP_IDX,
    getParentKey: node => node.COL_GROUP_PIDX,
    rootKey: 0,
  });

// componentDidMount() {
//   const { result } = this.props;
//   const aryColList =
//     result &&
//     result.compPoolData &&
//     result.compPoolData.colGroup &&
//     result.compPoolData.colGroup.map(item => ({
//       ...item,
//       title: item.COL_GROUP_NAME,
//       value: item.COL_GROUP_IDX,
//       key: item.COL_GROUP_IDX,
//     }));

//   const colGroupList = this.getTreeData(aryColList);
//   this.setState({
//     colGroupList,
//   });
// }

class CompModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      colGroupList: [],
      columnSize: undefined,
    };
    this.handleChangeData = debounce(this.handleChangeData, 500);
    this.handleChangeHeaderName = debounce(this.handleChangeHeaderName, 500);
    this.handleChangeCompConfig = debounce(this.handleChangeCompConfig, 500);
    this.handleChangeCompData = debounce(this.handleChangeCompData, 500);
    this.handleChangeViewConfig = debounce(this.handleChangeViewConfig, 500);
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
    console.debug('columnSize', configProps);
    this.setState({ colGroupList: filterTreeData, columnSize: comp.CONFIG.info.size });
  }

  handleChangeData = (key, value) => {
    const {
      action: { changeCompData },
      configProps,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    changeCompData(groupIndex, rowIndex, colIndex, key, value);
  };

  handleChangeCompConfig = (key, value, configKey) => {
    const {
      action: { changeCompConfig },
      configProps,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    changeCompConfig(groupIndex, rowIndex, colIndex, configKey, key, value);
  };

  // handleChangeCompConfigSize = (key, value, configKey) => {
  //   const {
  //     action: { changeCompConfig },
  //     configProps,
  //     groups,
  //   } = this.props;
  //   const { groupIndex, rowIndex, colIndex } = configProps;
  //   let isSave = true;
  //   const { columnSize } = this.state;
  //   const { CONFIG } = groups[groupIndex].rows[rowIndex].cols[colIndex].comp;
  //   if (columnSize > value) {
  //     isSave = false;
  //   }

  //   if (isSave) {
  //     changeCompConfig(groupIndex, rowIndex, colIndex, configKey, key, value);
  //   } else {
  //     message.warning(<MessageContent>사이즈는 설정된 값보다 작게 변경할 수 없습니다.</MessageContent>);
  //   }
  // };

  handleChangeViewConfig = (key, value, configKey) => {
    const {
      action: { changeViewCompData },
      configProps,
      groups,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    const { CONFIG } = groups[groupIndex].rows[rowIndex].cols[colIndex].comp;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig[configKey][key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeHeaderName = value => {
    const {
      action: { changeViewCompData },
      configProps,
      groups,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    const { CONFIG } = groups[groupIndex].rows[rowIndex].cols[colIndex].comp;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.HEADER_NAME_KOR = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeCompData = value => {
    const {
      action: { changeCompData },
      configProps,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    changeCompData(groupIndex, rowIndex, colIndex, 'NAME_KOR', value);
  };

  handleChangeCompSetting = value => {
    const {
      action: { changeViewCompData },
      compPoolList,
      configProps,
      groups,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    const { CONFIG } = groups[groupIndex].rows[rowIndex].cols[colIndex].comp;
    const compIdx = compPoolList.findIndex(iNode => iNode.COMP_SRC === value);
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.COMP_SRC = value;
    nextConfig.property.COMP_SETTING_SRC = compPoolList[compIdx].COMP_SETTING_SRC;
    nextConfig.property.COMP_NAME = compPoolList[compIdx].COMP_NAME;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
    changeViewCompData(groupIndex, rowIndex, colIndex, 'COMP_TAG', compPoolList[compIdx].COMP_TAG);
  };

  handleChangeColConfig = (key, value) => {
    const {
      action: { changeColConfig },
      configProps,
    } = this.props;
    const { groupIndex, rowIndex, colIndex } = configProps;
    changeColConfig(groupIndex, rowIndex, colIndex, key, value);
  };

  render() {
    const { configType, configProps, compPoolList, groups, onCloseModal, classNameList, action, dataNodeList, compList } = this.props;
    const { viewType, groupType, groupIndex, rowIndex, colIndex } = configProps;
    const { comp, addonClassName } = groups[groupIndex].rows[rowIndex].cols[colIndex];
    const { submitHandlerBySaga } = action;
    const { columnSize } = this.state;
    return (
      <Styled className="popoverWrapper">
        <div className="popoverInnerInput">
          <p className="popover-tit">컬럼 설정</p>
          {comp.COMP_TYPE !== 'LABEL' ? (
            <>
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
                        style={{ width: comp.CONFIG.info.type === 'NUMERIC' ? '50%' : '100%' }}
                        min={configProps.configInfo.info.size || 0}
                        max={100000000000}
                        defaultValue={comp.CONFIG.info.size || 0}
                        onChange={value => this.handleChangeCompConfig('size', value, 'info')}
                        disabled={comp.CONFIG.info.isClob || comp.CONFIG.info.type === 'TIMESTAMP' || comp.CONFIG.info.type.indexOf('DATE') > -1}
                      />
                      {comp.CONFIG.info.type === 'NUMERIC' && (
                        <InputNumber
                          placeholder="사이즈"
                          style={{ width: 'calc(50% - 4px)', marginLeft: '4px' }}
                          min={configProps.configInfo.info.subSize || 0}
                          max={100000000000}
                          defaultValue={comp.CONFIG.info.subSize || 0}
                          onChange={value => this.handleChangeCompConfig('subSize', value, 'info')}
                          disabled={comp.CONFIG.info.isClob || comp.CONFIG.info.type === 'TIMESTAMP' || comp.CONFIG.info.type.indexOf('DATE') > -1}
                        />
                      )}
                    </td>
                    <td>
                      <Input
                        placeholder="디폴트값"
                        defaultValue={comp.CONFIG.info.defaultValue}
                        onChange={e => this.handleChangeCompConfig('defaultValue', e.target.value, 'info')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="popoverInnerTableLastRow">
                      <Checkbox
                        defaultChecked={comp.CONFIG.property.isRequired}
                        onChange={e => this.handleChangeCompConfig('isRequired', e.target.checked, 'property')}
                      >
                        필수
                      </Checkbox>
                      <Checkbox
                        defaultChecked={comp.CONFIG.property.readOnly}
                        onChange={e => this.handleChangeViewConfig('readOnly', e.target.checked, 'property')}
                      >
                        읽기전용
                      </Checkbox>
                    </td>
                  </tr>
                </tbody>
              </table>
            </>
          ) : (
            <div className="popoverItem">
              <Input placeholder="제목(KO)" defaultValue={comp.NAME_KOR} onChange={e => this.handleChangeCompData(e.target.value)} />
            </div>
          )}
        </div>
        {viewType === 'LIST' && groupType === 'searchGroup' && comp.COMP_TYPE !== 'LABEL' && (
          <div className="popoverInner">
            <p className="popover-tit">검색 설정</p>
            <div className="popoverInnerCom">
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">검색 타입</span>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select component"
                  defaultValue={comp.CONFIG.property.searchType || ''}
                  onChange={value => this.handleChangeViewConfig('searchType', value, 'property')}
                >
                  <Option value="INPUT">Input</Option>
                  <Option value="SELECT">Select</Option>
                  <Option value="TREESELECT">Tree Select</Option>
                  <Option value="DATE">Date</Option>
                  <Option value="RANGEDATE">Range Date</Option>
                  <Option value="CUSTOM">Custom</Option>
                </Select>
              </div>
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">검색 조건</span>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select component"
                  defaultValue={comp.CONFIG.property.searchCondition || ''}
                  onChange={value => this.handleChangeViewConfig('searchCondition', value, 'property')}
                >
                  <Option value="=">=</Option>
                  <Option value=">=">&gt;=</Option>
                  <Option value="<=">&lt;=</Option>
                  <Option value=">">&gt;</Option>
                  <Option value="<">&lt;</Option>
                  <Option value="LIKE">Like</Option>
                  {comp.CONFIG.property.searchType !== 'DATE' && <Option value="BETWEEN">Between</Option>}
                </Select>
              </div>
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">검색 데이터 구분</span>
                {comp && comp.CONFIG && comp.CONFIG.property && comp.CONFIG.property.searchCondition === 'BETWEEN' ? (
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select component"
                    defaultValue={comp.CONFIG.property.searchDataType || ''}
                    onChange={value => this.handleChangeViewConfig('searchDataType', value, 'property')}
                  >
                    <Option value="DATETIME">Datetime</Option>
                  </Select>
                ) : (
                  <Select
                    style={{ width: '100%' }}
                    placeholder="Select component"
                    defaultValue={comp.CONFIG.property.searchDataType || ''}
                    onChange={value => this.handleChangeViewConfig('searchDataType', value, 'property')}
                  >
                    <Option value="STRING">String</Option>
                    {comp.CONFIG.property.searchType !== 'DATE' && <Option value="NUMBER">Number</Option>}
                    {comp.CONFIG.property.searchType === 'DATE' && <Option value="DATE">Date</Option>}
                  </Select>
                )}
              </div>
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">검색 PlaceHolder 설정</span>
                <Input
                  placeholder="검색 PlaceHolder"
                  style={{ width: '100%' }}
                  defaultValue={comp.CONFIG.property.searchPlaceholder}
                  onChange={e => this.handleChangeViewConfig('searchPlaceholder', e.target.value, 'property')}
                />
              </div>
              {// Date Picker 사용시 SearchType 이 String일 경우 추가 설정값(포맷)을 받도록 추가
              comp && comp.CONFIG && comp.CONFIG.property && comp.CONFIG.property.searchType === 'DATE' && (
                <>
                  {comp.CONFIG.property.searchDataType === 'STRING' && (
                    <div className="popoverItem popoverItemInput">
                      <span className="spanLabel">Format 설정</span>
                      <Select
                        placeholder="Date Format 지정"
                        style={{ width: '100%' }}
                        defaultValue={comp.CONFIG.property.dateSearchFormat || 'YYYY-MM-DD'}
                        onChange={value => this.handleChangeViewConfig('dateSearchFormat', value, 'property')}
                      >
                        <Option value="YYYY-MM-DD">YYYY-MM-DD</Option>
                        <Option value="YYYYMMDD">YYYYMMDD</Option>
                      </Select>
                    </div>
                  )}
                  <div className="popoverItem popoverItemInput">
                    <span className="spanLabel">검색 기본값 설정</span>
                    <Select
                      placeholder="기본값을 선택하십시오."
                      style={{ width: '100%' }}
                      defaultValue={comp.CONFIG.property.dateSearchDefaultType || 'default'}
                      onChange={value => this.handleChangeViewConfig('dateSearchDefaultType', value, 'property')}
                    >
                      <Option value="default">Default</Option>
                      <Option value="sysdate">Sysdate</Option>
                      <Option value="custom">Custom</Option>
                    </Select>
                  </div>
                </>
              )}
              {comp &&
                comp.CONFIG &&
                comp.CONFIG.property &&
                comp.CONFIG.property.searchType === 'RANGEDATE' &&
                comp.CONFIG.property.searchCondition === 'BETWEEN' && (
                  <>
                    <div className="popoverItem popoverItemInput">
                      <span className="spanLabel">검색 기본값 타입 설정</span>
                      <Select
                        placeholder="기본값을 선택하십시오."
                        style={{ width: '100%' }}
                        defaultValue={comp.CONFIG.property.rangeDateSearchType || 'default'}
                        onChange={value => this.handleChangeViewConfig('rangeDateSearchType', value, 'property')}
                      >
                        <Option value="sysdate">sysdate</Option>
                        <Option value="default">Default</Option>
                        <Option value="autoMonth">auto Month(startOfMonth, endOfMonth)</Option>
                        <Option value="custom">User Custom</Option>
                      </Select>
                    </div>
                    {comp.CONFIG.property.rangeDateSearchType === 'custom' && (
                      <div className="popoverItem popoverItemInput">
                        <span className="spanLabel">검색 기본값 설정</span>
                        <AntdDatePicker
                          style={{ width: '47%' }}
                          onChange={date => this.handleChangeViewConfig('searchStartDate', moment(date).format('YYYY-MM-DD'), 'property')}
                          placeholder="지정할 날짜를 선택하세요."
                          defaultValue={comp.CONFIG.property.searchStartDate && moment(comp.CONFIG.property.searchStartDate)}
                        />
                        <div style={{ width: '6%', display: 'inline-block', textAlign: 'center' }}>~</div>
                        <AntdDatePicker
                          style={{ width: '47%' }}
                          onChange={date => this.handleChangeViewConfig('searchEndDate', moment(date).format('YYYY-MM-DD'), 'property')}
                          placeholder="지정할 날짜를 선택하세요."
                          defaultValue={comp.CONFIG.property.searchEndDate && moment(comp.CONFIG.property.searchEndDate)}
                        />
                      </div>
                    )}
                  </>
                )}
            </div>
          </div>
        )}
        <div className="popoverInner">
          <p className="popover-tit">
            컴포넌트 설정
            <Button type="primary" onClick={onCloseModal}>
              Save
            </Button>
          </p>
          <div className="popoverInnerCom">
            {comp.COMP_TYPE !== 'LABEL' && (
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">컴포넌트 이름(KO)</span>
                <Input placeholder="컴포넌트 이름(KO)" defaultValue={comp.NAME_KOR} onChange={e => this.handleChangeData('NAME_KOR', e.target.value)} />
              </div>
            )}
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
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컴포넌트 Class명 설정</span>
              <Select
                mode="tags"
                placeholder="컴포넌트 Class명"
                style={{ width: '100%' }}
                className="antdTagSelect"
                defaultValue={comp.CONFIG.property.className}
                onChange={value => this.handleChangeViewConfig('className', value, 'property')}
              >
                {classNameList.map(node => (
                  <Option key={node.CLASS_NAME} value={node.CLASS_NAME}>
                    {node.CLASS_NAME}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컬럼 Class명 설정</span>
              <Select
                mode="tags"
                placeholder="컬럼 Class명"
                style={{ width: '100%' }}
                className="antdTagSelect"
                defaultValue={addonClassName}
                onChange={value => this.handleChangeColConfig('addonClassName', value)}
              >
                {classNameList.map(node => (
                  <Option key={node.CLASS_NAME} value={node.CLASS_NAME}>
                    {node.CLASS_NAME}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">데이터 조회 설정</span>
              <Input
                placeholder="데이터 키"
                style={{ width: '50%', marginRight: '5px' }}
                defaultValue={comp.CONFIG.property.compSelectDataKey}
                onChange={e => this.handleChangeViewConfig('compSelectDataKey', e.target.value, 'property')}
              />
              <Select
                placeholder="데이터 타입"
                style={{ width: 'calc(50% - 5px)' }}
                defaultValue={comp.CONFIG.property.compSelectDataType}
                onChange={value => this.handleChangeViewConfig('compSelectDataType', value, 'property')}
                allowClear
              >
                <Option key="CompModal_compSelectDataType_List" value="ARRAY">
                  JsonArray
                </Option>
                <Option key="CompModal_compSelectDataType_Object" value="OBJECT">
                  JsonObject
                </Option>
              </Select>
              <Select
                placeholder="필드 컴포넌트 데이터"
                style={{ width: '100%' }}
                defaultValue={comp.CONFIG.property.compSelectDataClass}
                onChange={value => this.handleChangeViewConfig('compSelectDataClass', value, 'property')}
                allowClear
              >
                {dataNodeList.map(node => (
                  <Option key={`${node.SERVICE_NAME}_${node.DATA_NODE_ID}`} value={node.SERVICE_NAME}>
                    {node.NAME_KOR}
                  </Option>
                ))}
              </Select>
              {comp.CONFIG.property.compSelectDataClass && comp.CONFIG.property.compSelectDataClass.length > 0 && (
                <TextArea
                  defaultValue={comp.CONFIG.property.compSelectDataParam}
                  placeholder="데이터 파라미터"
                  onChange={e => this.handleChangeViewConfig('compSelectDataParam', e.target.value, 'property')}
                  rows={3}
                />
              )}
            </div>
            {viewType === 'LIST' && groupType !== 'searchGroup' && (
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">문자 넘침 생략 여부</span>
                <Checkbox
                  defaultChecked={comp.CONFIG.property.isEllipsis}
                  onChange={e => this.handleChangeViewConfig('isEllipsis', e.target.checked, 'property')}
                />
              </div>
            )}
            {ConfigInfo[comp.CONFIG.property.COMP_SETTING_SRC] && (
              <div>
                {ConfigInfo[comp.CONFIG.property.COMP_SETTING_SRC].renderer({ ...configProps, configInfo: comp.CONFIG, submitHandlerBySaga, compList })}
              </div>
            )}
          </div>
        </div>
      </Styled>
    );
  }
}

export default CompModal;
