import React from 'react';
import * as PropTypes from 'prop-types';
import { Input, Popover, Checkbox, InputNumber, Popconfirm, Select } from 'antd';
import { debounce } from 'lodash';

import Styled from './Styled';
import { ConfigInfo } from './ConfigInfo';

const { Option } = Select;

// const setCompData = (rowIndex, colKey, key, value, changeCompData) => {
//   changeCompData(rowIndex, colKey, key, value);
//   // viewLayer.property.layer[rowIndex].cols[colKey].comp[key] = value;
// };

class CompItem extends React.Component {
  constructor(props) {
    super(props);
    this.handleChangeData = debounce(this.handleChangeData, 500);
    this.handleChangeHeaderName = debounce(this.handleChangeHeaderName, 500);
    this.handleChangeSizeConfig = debounce(this.handleChangeSizeConfig, 500);
    this.handleChangeDefaultConfig = debounce(this.handleChangeDefaultConfig, 500);
    this.handleChangeCompData = debounce(this.handleChangeCompData, 500);
  }

  handleChangeData = (key, value) => {
    const {
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData },
    } = this.props;
    changeCompData(groupIndex, rowIndex, colIndex, key, value);
  };

  handleChangeSizeConfig = (key, value, configKey) => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData },
    } = this.props;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig[configKey][key] = value;
    changeCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeDefaultConfig = (key, value, configKey) => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData },
    } = this.props;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig[configKey][key] = value;
    changeCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeViewConfig = (key, value, configKey) => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeViewCompData },
    } = this.props;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig[configKey][key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeHeaderName = value => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeViewCompData },
    } = this.props;
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.HEADER_NAME_KOR = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeCompData = value => {
    const {
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData },
    } = this.props;
    changeCompData(groupIndex, rowIndex, colIndex, 'NAME_KOR', value);
  };

  handleChangeCompSetting = value => {
    const {
      col: {
        comp: { CONFIG },
      },
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeViewCompData },
      compPoolList,
    } = this.props;
    const compIdx = compPoolList.findIndex(iNode => iNode.COMP_SRC === value);
    const nextConfig = JSON.parse(JSON.stringify(CONFIG));
    nextConfig.property.COMP_SRC = value;
    nextConfig.property.COMP_SETTING_SRC = compPoolList[compIdx].COMP_SETTING_SRC;
    nextConfig.property.COMP_NAME = compPoolList[compIdx].COMP_NAME;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', nextConfig);
  };

  handleChangeColConfig = (key, value) => {
    const {
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeColConfig },
    } = this.props;
    changeColConfig(groupIndex, rowIndex, colIndex, key, value);
  };

  renderCompConfig = (configType, configProps) => {
    const { col, comp, compPoolList, viewType, groupType } = configProps;
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
                        defaultValue={col.comp.COMP_FIELD}
                        readOnly={col.comp.FIELD_TYPE === 'SYS'}
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
                        defaultValue={col.comp.CONFIG.info.size || 0}
                        onChange={value => this.handleChangeSizeConfig('size', value, 'info')}
                      />
                    </td>
                    <td>
                      <Input
                        placeholder="디폴트값"
                        defaultValue={col.comp.CONFIG.info.defaultValue}
                        onChange={e => this.handleChangeDefaultConfig('defaultValue', e.target.value, 'info')}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td colSpan="3" className="popoverInnerTableLastRow">
                      <Checkbox
                        defaultChecked={comp.CONFIG.property.isRequired}
                        onChange={e => this.handleChangeViewConfig('isRequired', e.target.checked, 'property')}
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
              <Input placeholder="제목(KO)" defaultValue={col.comp.NAME_KOR} onChange={e => this.handleChangeCompData(e.target.value)} />
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
                  <Option value="BETWEEN">Between</Option>
                </Select>
              </div>
              <div className="popoverItem popoverItemInput">
                <span className="spanLabel">검색 데이터 구분</span>
                <Select
                  style={{ width: '100%' }}
                  placeholder="Select component"
                  defaultValue={comp.CONFIG.property.searchDataType || ''}
                  onChange={value => this.handleChangeViewConfig('searchDataType', value, 'property')}
                >
                  <Option value="STRING">String</Option>
                  <Option value="NUMBER">Number</Option>
                  <Option value="DATETIME">Datetime</Option>
                </Select>
              </div>
            </div>
          </div>
        )}
        <div className="popoverInner">
          <p className="popover-tit">컴포넌트 설정</p>
          <div className="popoverInnerCom">
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컴포넌트 설정</span>
              <Select
                style={{ width: '100%' }}
                placeholder="Select component"
                defaultValue={comp.CONFIG.property.COMP_SRC}
                onChange={value => this.handleChangeCompSetting(value)}
              >
                {compPoolList
                  .filter(fNode => fNode.COL_DB_TYPE === comp.CONFIG.info.type || fNode.COL_DB_TYPE === 'NONE')
                  .map(node => (
                    <Option key={node.COMP_SRC} value={node.COMP_SRC}>
                      {node.COMP_NAME}
                    </Option>
                  ))}
              </Select>
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컴포넌트 Class명 설정</span>
              <Input
                placeholder="컴포넌트 Class명 입력"
                defaultValue={comp.CONFIG.property.className}
                onChange={e => this.handleChangeViewConfig('className', e.target.value, 'property')}
              />
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">컬럼 Class명 설정</span>
              <Input
                placeholder="컬럼 Class명 입력"
                defaultValue={col.addonClassName || ''}
                onChange={e => this.handleChangeColConfig('addonClassName', e.target.value)}
              />
            </div>
            {ConfigInfo[configType] && <div>{ConfigInfo[configType].renderer(configProps)}</div>}
          </div>
        </div>
      </Styled>
    );
  };

  render() {
    const {
      col,
      groupIndex,
      rowIndex,
      colIndex,
      action: { changeCompData, removeColComp, changeViewCompData },
      groupType,
      compPoolList,
      viewType,
    } = this.props;
    if (col && col.comp && col.comp.CONFIG && col.comp.CONFIG.property.COMP_SRC) {
      const configProps = {
        comp: col.comp,
        changeCompData,
        groupIndex,
        rowIndex,
        colIndex,
        configInfo: col.comp.CONFIG,
        compPoolList,
        changeViewCompData,
        col,
        viewType,
        groupType,
      };
      if (groupType !== 'listGroup') {
        // const colClassName = `compConfigCol compConfigDiv ${col.comp.COMP_TYPE === 'LABEL' ? 'wid100-28' : 'wid50'}`;
        const colClassName = 'compConfigCol compConfigDiv wid100-28';
        return (
          <Styled className="compConfig compConfigDiv">
            <div className="compConfigRow compConfigDiv">
              <div className={colClassName}>
                <i className="iconField iconFieldCheck"></i>
                <p className="componentTit">{col.comp.CONFIG.property.COMP_NAME}</p>
              </div>
              {/* {col.comp.COMP_TYPE !== 'LABEL' && (
                <div className={`${colClassName} ${col.comp.COMP_TYPE !== 'LABEL' ? ' compLabelNone' : 'compLabel'}`}>
                  <Input
                  placeholder="아이디"
                  defaultValue={col.comp.COMP_FIELD}
                  readOnly={col.comp.CONFIG.property.isSysField}
                  onChange={e => handleChangeData(groupIndex, rowIndex, colIndex, 'COMP_FIELD', e, changeCompData)}
                /> 
                </div>
              )} */}
              <div className="compConfigCol compConfigDiv buttonWrapper">
                <Popover
                  placement="bottomRight"
                  content={this.renderCompConfig(col.comp.CONFIG.property.COMP_SETTING_SRC, configProps)}
                  trigger="click"
                  overlayStyle={{ width: '500px' }}
                  getPopupContainer={() => document.querySelector('.compConfig')}
                >
                  <span className="toolbar-item iconSetting" role="button" onKeyPress={() => false} tabIndex="0" />
                </Popover>
                <Popconfirm
                  title="Are you sure delete this Component?"
                  onConfirm={() => removeColComp(groupIndex, rowIndex, colIndex)}
                  okText="Yes"
                  cancelText="No"
                >
                  <span className="toolbar-item iconTrash" role="button" onKeyPress={() => false} tabIndex="0" />
                </Popconfirm>
              </div>
            </div>
            <div className="compTitleWrapper">
              <p>{col.comp.COMP_TYPE !== 'LABEL' ? col.comp.COMP_FIELD : col.comp.NAME_KOR}</p>
            </div>
          </Styled>
        );
      }
      return (
        <Styled className="compConfig compConfigDiv">
          <div className="compConfigRow compConfigDiv">
            <div className="compConfigCol compConfigDiv wid100">{col.comp.COMP_FIELD || 'no id'}</div>
          </div>
          <div className="compConfigRow compConfigDiv">
            <div className="compConfigCol compConfigDiv wid100-28">
              <Input
                placeholder="Header Name(KO)"
                defaultValue={col.comp.CONFIG.property.HEADER_NAME_KOR || ''}
                onChange={e => this.handleChangeHeaderName(e.target.value)}
              />
            </div>
            <div className="compConfigCol compConfigDiv wid28px">
              <Popover
                placement="bottomRight"
                content={this.renderCompConfig(col.comp.CONFIG.property.COMP_SETTING_SRC, configProps)}
                trigger="click"
                overlayStyle={{ width: '500px' }}
                getPopupContainer={() => document.querySelector('.compConfig')}
              >
                <span className="toolbar-item fa fa-cog" role="button" onKeyPress={() => false} tabIndex="0" />
              </Popover>
              <Popconfirm
                title="Are you sure delete this Component?"
                onConfirm={() => removeColComp(groupIndex, rowIndex, colIndex)}
                okText="Yes"
                cancelText="No"
              >
                <span className="toolbar-item fa fa-trash" role="button" onKeyPress={() => false} tabIndex="0" />
              </Popconfirm>
            </div>
          </div>
        </Styled>
      );
    }
    return <div>Component add</div>;
  }
}

CompItem.propTypes = {
  col: PropTypes.any,
  groupIndex: PropTypes.any,
  rowIndex: PropTypes.any,
  colIndex: PropTypes.any,
  action: PropTypes.any,
  viewType: PropTypes.any,
  groupType: PropTypes.any,
  compPoolList: PropTypes.any,
};

export default CompItem;
