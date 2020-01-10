import React, { Component } from 'react';

import StyledRow from 'commonStyled/Form/StyledRow';
import StyledCol from 'commonStyled/Form/StyledCol';
import StyledInput from 'commonStyled/Form/StyledInput';
import StyledSelect from 'commonStyled/Form/StyledSelect';
import { Button, Input, Row, Col, Select } from 'antd';

const AntdRow = StyledRow(Row);
const AntdCol = StyledCol(Col);
const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);

const { Option } = Select;
const { TextArea } = Input;

class SysFieldInput extends Component {
  onCompChange = val => {
    const { id, result, formData, changeFormData } = this.props;
    const { compPoolData } = result;
    const { CONFIG } = formData;
    const selectedComp =
      compPoolData.compPoolList.filter(comp => comp.COMP_POOL_IDX === val) && compPoolData.compPoolList.filter(comp => comp.COMP_POOL_IDX === val)[0];
    CONFIG.info.type = selectedComp.COL_DB_TYPE;
    CONFIG.property.COMP_SRC = selectedComp.COMP_SRC;
    CONFIG.property.COMP_SETTING_SRC = selectedComp.COMP_SETTING_SRC;
    changeFormData(id, 'COMP_TYPE', selectedComp.COL_GROUP_IDX === 9 ? 'LABEL' : 'FIELD');
    changeFormData(id, 'COMP_TAG', selectedComp.COMP_TAG);
    changeFormData(id, 'COMP_POOL_IDX', selectedComp.COMP_POOL_IDX);
    changeFormData(id, 'CONFIG', CONFIG);
  };

  onDataSize = val => {
    const { id, formData, changeFormData } = this.props;
    const { CONFIG } = formData;
    CONFIG.info.size = Number(val);
    changeFormData(id, 'CONFIG', CONFIG);
  };

  onIsNullUsed = val => {
    const { id, formData, changeFormData } = this.props;
    const { CONFIG } = formData;
    CONFIG.info.nullable = val;
    changeFormData(id, 'CONFIG', CONFIG);
  };

  onDefaultValue = (val, dbType) => {
    const { id, formData, changeFormData } = this.props;
    const { CONFIG } = formData;
    if (dbType === 'FLOAT' || dbType === 'DOUBLE' || dbType === 'INT' || dbType === 'NUMBER') CONFIG.info.defaultValue = Number(val);
    else CONFIG.info.defaultValue = val;
    changeFormData(id, 'CONFIG', CONFIG);
  };

  onChangValue = (key, val) => {
    const { id, formData, changeFormData } = this.props;
    const { CONFIG } = formData;
    CONFIG.property[key] = val;
    changeFormData(id, key, val);
    changeFormData(id, 'CONFIG', CONFIG);
  };

  render() {
    const { id, result, formData } = this.props;
    return (
      <div>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(KO)</AntdCol>
          <AntdCol span={20}>
            <AntdInput value={formData && formData.NAME_KOR} onChange={e => this.props.changeFormData(id, 'NAME_KOR', e.target.value)}></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(EN)</AntdCol>
          <AntdCol span={20}>
            <AntdInput value={formData && formData.NAME_ENG} onChange={e => this.props.changeFormData(id, 'NAME_ENG', e.target.value)}></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(CH)</AntdCol>
          <AntdCol span={20}>
            <AntdInput value={formData && formData.NAME_CHN} onChange={e => this.props.changeFormData(id, 'NAME_CHN', e.target.value)}></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(JP)</AntdCol>
          <AntdCol span={20}>
            <AntdInput value={formData && formData.NAME_JPN} onChange={e => this.props.changeFormData(id, 'NAME_JPN', e.target.value)}></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(ETC)</AntdCol>
          <AntdCol span={20}>
            <AntdInput value={formData && formData.NAME_ETC} onChange={e => this.props.changeFormData(id, 'NAME_ETC', e.target.value)}></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow className="ant-row-textarea" gutter={24}>
          <AntdCol span={4}>시스템 설명</AntdCol>
          <AntdCol span={20}>
            <TextArea
              value={formData && formData.DSCR}
              onChange={e => this.props.changeFormData(id, 'DSCR', e.target.value)}
              rows={4}
              style={{ width: '100%' }}
            ></TextArea>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>사용여부</AntdCol>
          <AntdCol span={20}>
            <AntdSelect value={formData && formData.STATUS} onChange={val => this.props.changeFormData(id, 'STATUS', val)} style={{ width: 'auto' }}>
              <Option value={1}>사용</Option>
              <Option value={0}>미사용</Option>
            </AntdSelect>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={24}>시스템 필드 설정</AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>컴포넌트</AntdCol>
          <AntdCol span={20}>
            <AntdSelect value={formData && formData.COMP_POOL_IDX} onChange={this.onCompChange} style={{ width: '100%' }}>
              {result &&
                result.compPoolData &&
                result.compPoolData.compPoolList &&
                result.compPoolData.compPoolList.map(item => (
                  <Option value={item.COMP_POOL_IDX}>
                    {item.COMP_NAME} [{item.COL_DB_TYPE}]
                  </Option>
                ))}
            </AntdSelect>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>시스템 필드명(DB)</AntdCol>
          <AntdCol span={8}>
            <AntdInput value={formData && formData.COMP_FIELD} onChange={e => this.props.changeFormData(id, 'COMP_FIELD', e.target.value)}></AntdInput>
          </AntdCol>
          <AntdCol span={4}>데이터 사이즈</AntdCol>
          <AntdCol span={8}>
            <AntdInput
              value={formData && formData.CONFIG && formData.CONFIG.info && formData.CONFIG.info.size}
              onChange={e => this.onDataSize(e.target.value)}
            ></AntdInput>
          </AntdCol>
        </AntdRow>
        <AntdRow gutter={24}>
          <AntdCol span={4}>초기값</AntdCol>
          <AntdCol span={8}>
            <AntdInput
              value={formData && formData.CONFIG && formData.CONFIG.info && formData.CONFIG.info.defaultValue}
              onChange={e => this.onDefaultValue(e.target.value, formData.CONFIG.info.type)}
            ></AntdInput>
          </AntdCol>
          <AntdCol span={4}>NULL 허용여부</AntdCol>
          <AntdCol span={8}>
            <AntdSelect
              value={formData && formData.CONFIG && formData.CONFIG.info && formData.CONFIG.info.nullable}
              onChange={this.onIsNullUsed}
              style={{ width: 'auto' }}
            >
              <Option value>허용</Option>
              <Option value={false}>미허용</Option>
            </AntdSelect>
          </AntdCol>
        </AntdRow>
      </div>
    );
  }
}

export default SysFieldInput;
