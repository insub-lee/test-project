import React, { Component } from 'react';
import { Select, Radio } from 'antd';
import { debounce } from 'lodash';

import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as selectors from 'containers/common/Auth/selectors';

const { Option } = Select;

class ProfileConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      profileArray: [],
    };
    this.handleChangeConfigData = debounce(this.handleChangeConfigData, 500);
  }

  componentDidMount() {
    const { profile } = this.props;
    this.setState({
      profileArray: Object.entries(profile),
    });
  }

  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo, profile } = this.props;
    const { profileArray } = this.state;
    return [
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">ProfileKey</span>
        <Select
          style={{ width: '100%' }}
          placeholder="사용하실 Profile Key를 선택하세요"
          defaultValue={(configInfo && configInfo.property && configInfo.property.profileKey) || ''}
          onChange={value => this.handleChangeConfigData('profileKey', value)}
        >
          {profileArray.map(p => (
            <Option key={p[0]} value={p[0]}>
              {p[0]}
            </Option>
          ))}
        </Select>
      </div>,
      // MODIFY 환경에서 ColData값이 아닌 Profile값이 노출되어야 할경우 활성 선택
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">ColData값 무시</span>
        <Radio.Group
          onChange={e => this.handleChangeConfigData('ignoreColdata', e.target.value)}
          defaultValue={(configInfo && configInfo.property && configInfo.property.ignoreColdata) || 'N'}
        >
          <Radio value="N">비활성</Radio>
          <Radio value="Y">활성</Radio>
        </Radio.Group>
      </div>,
      // MODIFY 환경에서 ColData값이 Null일경우 profile값 노출
      <div className="popoverItem popoverItemInput">
        <span className="spanLabel">ColData값 NVL</span>
        <Radio.Group
          onChange={e => this.handleChangeConfigData('nvlFlag', e.target.value)}
          defaultValue={(configInfo && configInfo.property && configInfo.property.nvlFlag) || 'N'}
        >
          <Radio value="N">비활성</Radio>
          <Radio value="Y">활성</Radio>
        </Radio.Group>
      </div>,
    ];
  }
}

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(ProfileConfig);
