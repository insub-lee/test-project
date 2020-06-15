import React, { Component } from 'react';
import * as PropTypes from 'prop-types';
import { Select, Input, Radio } from 'antd';
import { debounce } from 'lodash';

const { Option } = Select;
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
          <span className="spanLabel">AS_IS 테이블 선택</span>
          <Select
            style={{ width: '100%' }}
            defaultValue={(configInfo && configInfo.property && configInfo.property.GUBUN) || 'SQ'}
            onChange={value => this.handleChangeViewCompData('GUBUN', value)}
          >
            <Option value="SQ">SQTB_VENDOR</Option>
            <Option value="SW">SWTB_WRK_CMPNY</Option>
          </Select>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">FormData 추가변경 사용</span>
          <Radio.Group
            value={(configInfo && configInfo.property && configInfo.property.ADD_FORMDATA) || 'N'}
            onChange={e => this.handleChangeViewCompData('ADD_FORMDATA', e.target.value)}
          >
            <Radio value="Y">Y</Radio>
            <Radio value="N">N</Radio>
          </Radio.Group>
        </div>
        {configInfo && configInfo.property && configInfo.property.ADD_FORMDATA && configInfo.property.ADD_FORMDATA === 'Y' && (
          <>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">대표자명 필드지정</span>
              <Input
                style={{ width: '50%' }}
                placeholder="대표자명을 저장할 필드를 입력해 주십시오."
                defaultValue={(configInfo && configInfo.property && configInfo.property.PRSDNT_NM_FIELD) || ''}
                onChange={e => this.handleChangeViewCompData('PRSDNT_NM_FIELD', e.target.value)}
              />
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">주소 필드지정</span>
              <Input
                style={{ width: '50%' }}
                placeholder="대표자명을 저장할 필드를 입력해 주십시오."
                defaultValue={(configInfo && configInfo.property && configInfo.property.ADDRESS_FIELD) || ''}
                onChange={e => this.handleChangeViewCompData('ADDRESS_FIELD', e.target.value)}
              />
            </div>
            <div className="popoverItem popoverItemInput">
              <span className="spanLabel">연락처 필드지정</span>
              <Input
                style={{ width: '50%' }}
                placeholder="대표자명을 저장할 필드를 입력해 주십시오."
                defaultValue={(configInfo && configInfo.property && configInfo.property.TEL_FIELD) || ''}
                onChange={e => this.handleChangeViewCompData('TEL_FIELD', e.target.value)}
              />
            </div>
          </>
        )}
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
