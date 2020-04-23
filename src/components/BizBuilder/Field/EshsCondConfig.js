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
    if (key === 'COND_COLUMN') {
      let step = '';
      switch (value) {
        case 'approve':
          step = '1';
          break;
        case 'improve':
          step = '2';
          break;
        case 'result':
          step = '3';
          break;
        case 'confirm':
          step = '3';
          break;
        default:
          break;
      }
      configInfo.property.STEP = step;
    }
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo } = this.props;

    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Cond dataKey 설정</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.COND_KEY) || ''}
            onChange={e => this.handleChangeViewCompData('COND_KEY', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Cond Columns 설정</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.COND_COLUMN) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('COND_COLUMN', value)}
          >
            <Option value="approve">Step 1 [approve]</Option>
            <Option value="improve">Step 2 [improve]</Option>
            <Option value="result">Step 3 [Result]</Option>
            <Option value="confirm">Step 3 [Confirm]</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Cond viewType</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.COND_TYPE) || ''}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('COND_TYPE', value)}
          >
            <Option value="INPUT">INPUT</Option>
            <Option value="VIEW">VIEW</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">리스트 Default값</span>
          <Radio.Group
            onChange={e => this.handleChangeViewCompData('DEFAULT_LIST', e.target.value)}
            value={(configInfo && configInfo.property && configInfo.property.DEFAULT_LIST) || 'N'}
          >
            <Radio value="N">미사용</Radio>
            <Radio value="Y">사용</Radio>
          </Radio.Group>
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

EshsCondConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

EshsCondConfig.defaultProps = {};

export default EshsCondConfig;
