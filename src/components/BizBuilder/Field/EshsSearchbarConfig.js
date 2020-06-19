import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { InputNumber, Radio } from 'antd';
import { debounce } from 'lodash';

class ComponentConfig extends Component {
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
          <span className="spanLabel">Revision 사용여부</span>
          <Radio.Group
            onChange={e => this.handleChangeViewCompData('useRevision', e.target.value)}
            value={(configInfo && configInfo.property && configInfo.property.useRevision) || 'Y'}
          >
            <Radio value="Y">사용</Radio>
            <Radio value="N">미사용</Radio>
          </Radio.Group>
        </div>
      </>
    );
  }
}

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

ComponentConfig.propTypes = {
  configInfo: PropTypes.any,
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
};

export default ComponentConfig;
