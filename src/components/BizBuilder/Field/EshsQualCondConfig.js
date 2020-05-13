import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Input, Select, Radio } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
class EshsCondConfig extends Component {
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
          <span className="spanLabel">전체리스트</span>
          <Radio.Group
            onChange={e => this.handleChangeViewCompData('ALL_LIST', e.target.value)}
            defaultValue={(configInfo && configInfo.property && configInfo.property.ALL_LIST) || 'N'}
          >
            <Radio value="N">비활성</Radio>
            <Radio value="Y">활성</Radio>
          </Radio.Group>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">승인조건 viewType</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.APPROVE_TYPE) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('APPROVE_TYPE', value)}
          >
            <Option value="INPUT">INPUT</Option>
            <Option value="VIEW">VIEW</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">개선결과 viewType</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.RESULT_TYPE) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('RESULT_TYPE', value)}
          >
            <Option value="INPUT">INPUT</Option>
            <Option value="VIEW">VIEW</Option>
            <Option value="CHECK">CHECK</Option>
            <Option value="CHECK_VIEW">CHECK[VIEW]</Option>
          </Select>
        </div>
      </>
    );
  }
}

EshsCondConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

EshsCondConfig.defaultProps = {};

export default EshsCondConfig;
