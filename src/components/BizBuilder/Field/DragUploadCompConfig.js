import React, { Component } from 'react';
import { Select, Radio } from 'antd';
const { Option } = Select;

class DragUploadCompConfig extends Component {
  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo, compList } = this.props;
    return '';
  }
}

export default DragUploadCompConfig;
