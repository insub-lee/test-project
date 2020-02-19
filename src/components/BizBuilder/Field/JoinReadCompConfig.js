import React, { Component } from 'react';
import { Input } from 'antd';
import { debounce } from 'lodash';

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;
    return (
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">컬럼명</span>
        <Input
          defaultValue={(configInfo && configInfo.property && configInfo.property.viewDataKey) || ''}
          onChange={e => this.handleChangeConfigData('viewDataKey', e.target.value)}
        ></Input>
      </div>
    );
  }
}

export default ComponentConfig;
