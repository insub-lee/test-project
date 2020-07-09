import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input } from 'antd';
import { debounce } from 'lodash';

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
        <span className="spanLabel">String Format</span>
        <Input
          style={{ width: '100%' }}
          defaultValue={(configInfo && configInfo.property && configInfo.property.dateformat) || 'YYYY-MM'}
          placehoder="예) YYYY-MM 형식으로 작성해 주십시오"
          onChange={e => this.handleChangeConfigData('dateformat', e.target.value)}
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
