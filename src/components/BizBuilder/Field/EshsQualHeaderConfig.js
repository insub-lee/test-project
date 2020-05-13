import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Radio } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class EshsQualHeaderConfig extends Component {
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
          <span className="spanLabel">메뉴 선택</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.HeaderType) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('HeaderType', value)}
          >
            <Option value="CONFIRM_REQUEST">신청</Option>
            <Option value="CONFIRM_RESULT">점검 결과</Option>
            <Option value="IMPROVE_RESULT">개선항목 관리</Option>
            <Option value="CONFIRM_VIEW">개선결과 조회</Option>
            <Option value="INTERLOCT_REQUEST">InterLock 해제신청</Option>
            <Option value="INTERLOCK_RESULT">InterLock 해제결과</Option>
            {/* <Option value="improve">Step 2 [improve]</Option>
            <Option value="result">Step 3 [Result]</Option>
            <Option value="confirm">Step 3 [Confirm]</Option> */}
          </Select>
        </div>
      </>
    );
  }
}

EshsQualHeaderConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

EshsQualHeaderConfig.defaultProps = {};

export default EshsQualHeaderConfig;
