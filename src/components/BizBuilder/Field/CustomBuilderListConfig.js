import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';

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
          <span className="spanLabel">WORK_SEQ 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.searchbarWorkSeq) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('searchbarWorkSeq', value)}
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
          <span className="spanLabel">Key 설정</span>
          <InputNumber
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.dataKey) || ''}
            min={0}
            onChange={value => this.handleChangeViewCompData('dataKey', value)}
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
