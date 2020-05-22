import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.handleChangeViewCompData = debounce(this.handleChangeViewCompData, 500);
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">AS_IS 테이블 선택</span>
          <Select
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.GUBUN) || 'SQ'}
            onChange={value => this.handleChangeViewCompData('GUBUN', value)}
          >
            <Option value="SQ">SQTB_VENDOR</Option>
            <Option value="SW">SWTB_WRK_CMPNY</Option>
          </Select>
        </div>
      </>
    );
  }
}

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default ComponentConfig;
