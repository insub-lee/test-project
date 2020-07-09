import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;

class ComponentConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 200);
  }

  // Config 설정 변경
  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  // 페이지 렌더
  render() {
    const { configInfo } = this.props;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API Method</span>
        <Select
          className="alignCenter"
          value={(configInfo && configInfo.property && configInfo.property.method) || 'GET'}
          onChange={e => this.handleChangeConfigData('method', e.target.value)}
        >
          <Option value="GET">GET</Option>
          <Option value="POST">POST</Option>
        </Select>
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">API URL</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.url) || ''}
          onChange={e => this.handleChangeConfigData('url', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Select Value Key</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.optValue) || ''}
          onChange={e => this.handleChangeConfigData('optValue', e.target.value)}
        />
      </div>,
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">Select Label Key</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.optLabel) || ''}
          onChange={e => this.handleChangeConfigData('optLabel', e.target.value)}
        />
      </div>,
    ];
  }
}

ComponentConfig.propTypes = {
  configInfo: PropTypes.object,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default ComponentConfig;
