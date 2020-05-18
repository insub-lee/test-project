import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Radio } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class EshsInterLockConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {};
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
          <span className="spanLabel">ViewType 설정</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.INTERLOCK_TYPE) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('INTERLOCK_TYPE', value)}
          >
            <Option value="INPUT">INPUT</Option>
            <Option value="VIEW">VIEW</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">리스트 추가 버튼</span>
          <Radio.Group
            onChange={e => this.handleChangeViewCompData('BTN_FLAG', e.target.value)}
            value={(configInfo && configInfo.property && configInfo.property.BTN_FLAG) || 'N'}
          >
            <Radio value="N">미사용</Radio>
            <Radio value="Y">사용</Radio>
          </Radio.Group>
        </div>
      </>
    );
  }
}

EshsInterLockConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

EshsInterLockConfig.defaultProps = {};

export default EshsInterLockConfig;
