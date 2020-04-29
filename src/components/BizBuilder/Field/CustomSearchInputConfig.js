import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Input, Radio } from 'antd';
import { debounce } from 'lodash';

import BizMicroDevBase from 'components/BizMicroDevBase';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'apps/mdcs/admin/ViewDesigner/selectors';

const { Option } = Select;

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    const { submitHandlerBySaga } = this.props;
    const workSeq = (this.props && this.props.comp && this.props.comp.WORK_SEQ) || 0;

    const apiUrl = `/api/eshs/v1/common/eshsBuilderCustomSearch/${workSeq}`;
    return submitHandlerBySaga('GET', apiUrl, {}, this.configStart);
  }

  configStart = response => {
    const { compData } = this.props;
    const joinList = (response && response.list && response.list.filter(r => r.OPT_SEQ === 5)) || [];
    if (0 in joinList) {
      const joinData = JSON.parse(joinList[0].OPT_VALUE);

      joinData.forEach(j => {
        const data = { FIELD_TYPE: j.JOIN_TYPE };
        j.COLUMN_INFO.forEach(c => {
          compData.push({ ...data, COMP_FIELD: c.ID, NAME_KOR: c.ALIAS });
        });
      });
    }

    this.handleChangeViewCompData(
      'compData',
      compData.filter(c => c.FIELD_TYPE),
    );
  };

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    const compData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];

    if (key === 'targetField') {
      const field = value.split('@@')[0];
      const type = value.split('@@')[1];
      if (type === 'USER' || type === 'SYS') configInfo.property[key] = `W.${field}`;
      else configInfo.property[key] = field;
    } else configInfo.property[key] = value;

    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;

    const compData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];
    console.debug('compData', compData);
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">검색 필드 선택</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Select component"
            defaultValue={(configInfo && configInfo.property && configInfo.property.targetField) || ''}
            onChange={value => this.handleChangeViewCompData('targetField', value)}
          >
            {compData.map(c => (
              <Option
                key={c.COMP_FIELD}
                value={`${c.COMP_FIELD}@@${c.FIELD_TYPE}`}
              >{`이름 : ${c.NAME_KOR} [ 컬럼 : ${c.COMP_FIELD} ][ 타입 : ${c.FIELD_TYPE} ]`}</Option>
            ))}
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">검색 조건</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Select component"
            defaultValue={(configInfo && configInfo.property && configInfo.property.searchCondition) || ''}
            onChange={value => this.handleChangeViewCompData('searchCondition', value)}
          >
            <Option value="=">=</Option>
            <Option value=">=">&gt;=</Option>
            <Option value="<=">&lt;=</Option>
            <Option value=">">&gt;</Option>
            <Option value="<">&lt;</Option>
            <Option value="LIKE">Like</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">검색 데이터 구분</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Select component"
            defaultValue={(configInfo && configInfo.property && configInfo.property.searchDataType) || 'String'}
            onChange={value => this.handleChangeViewCompData('searchDataType', value)}
          >
            <Option value="String">String</Option>
            <Option value="Number">Number</Option>
          </Select>
        </div>
      </>
    );
  }
}

const CustomSearchInputConfig = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo, compData }) => (
  <BizMicroDevBase
    sagaKey="CustomSearchInputConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    compData={compData}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  submitHandlerBySaga: PropTypes.func,
  compData: PropTypes.array,
  comp: PropTypes.object,
};

ComponentConfig.defaultProps = {
  compData: [],
};

CustomSearchInputConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  compData: PropTypes.array,
};

export default connect(() => createStructuredSelector({ compData: selectors.makeSelectCompData() }))(ComponentConfig);
