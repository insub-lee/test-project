import React, { Component } from 'react';
import { Input, Select } from 'antd';
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
    ];
  }
}

export default connect(() => createStructuredSelector({ profile: selectors.makeSelectProfile() }))(ProfileConfig);
