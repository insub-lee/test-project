import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { InputNumber, Input, Select } from 'antd';
import { debounce } from 'lodash';
const { Option } = Select;
class CustomBuilderListConfig extends Component {
  constructor(props) {
    super(props);
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
          <span className="spanLabel">SagaKey 설정</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listSagaKey) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('listSagaKey', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">WORK_SEQ 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listWorkSeq) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('listWorkSeq', value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">ListMetaSeq 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.listMetaSeq) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('listMetaSeq', value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">rowKey설정</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.dataKey) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('dataKey', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">등록버튼</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.inputBtn) || 'N'}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('inputBtn', value)}
          >
            <Option value="N">미사용</Option>
            <Option value="Y">사용</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">선택한 ROW FormData값 설정</span>
          <Select
            defaultValue={(configInfo && configInfo.property && configInfo.property.isFormData) || 'N'}
            style={{ width: '100%' }}
            onChange={value => this.handleChangeViewCompData('isFormData', value)}
          >
            <Option value="N">미사용</Option>
            <Option value="Y">사용</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Modal Width</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.modalWidth) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('modalWidth', e.target.value)}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">Modal Height</span>
          <Input
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.modalHeight) || ''}
            min={0}
            onChange={e => this.handleChangeViewCompData('modalHeight', e.target.value)}
          />
        </div>
      </>
    );
  }
}

CustomBuilderListConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

CustomBuilderListConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default CustomBuilderListConfig;
