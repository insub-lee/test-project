import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Input } from 'antd';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'apps/mdcs/admin/ViewDesigner/selectors';

const { Option } = Select;

class LabelByNodeIdConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  componentDidMount() {
    const { compData } = this.props;
    this.handleChangeViewCompData(
      'compData',
      compData.filter(c => c.CONFIG && c.CONFIG.property && c.CONFIG.property.mapId),
    );
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;

    configInfo.property[key] = value;

    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;

    const compData = (this.props && this.props.configInfo && this.props.configInfo.property && this.props.configInfo.property.compData) || [];
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">필드 선택</span>
          <Select
            style={{ width: '100%' }}
            placeholder="Select Field"
            defaultValue={(configInfo && configInfo.property && configInfo.property.targetField) || ''}
            onChange={value => this.handleChangeViewCompData('targetField', value)}
          >
            {compData.map(c => (
              <Option key={c.COMP_FIELD} value={c.COMP_FIELD}>{`이름 : ${c.NAME_KOR} [ 컬럼 : ${c.COMP_FIELD} ]`}</Option>
            ))}
          </Select>
        </div>
      </>
    );
  }
}

LabelByNodeIdConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  compData: PropTypes.array,
};

export default connect(() => createStructuredSelector({ compData: selectors.makeSelectCompData() }))(LabelByNodeIdConfig);
