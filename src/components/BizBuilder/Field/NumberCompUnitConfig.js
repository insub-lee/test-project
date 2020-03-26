import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'antd';
import { debounce } from 'lodash';

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
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">단위 설정</span>
        <Input
          defaultValue={(configInfo && configInfo.property && configInfo.property.unit) || ''}
          onChange={e => this.handleChangeViewCompData('unit', e.target.value)}
        ></Input>
      </div>
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

ComponentConfig.defaultProps = {};

export default ComponentConfig;
