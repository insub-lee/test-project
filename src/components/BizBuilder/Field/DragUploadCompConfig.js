import React, { Component } from 'react';
import { Select, Radio } from 'antd';
const { Option } = Select;

class DragUploadCompConfig extends Component {
  handleChangeConfigData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { configInfo, compList } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">파일갯수 컬럼 사용여부</span>
          <Radio.Group
            value={(configInfo && configInfo.property && configInfo.property.fileCntFieldFlag) || 'N'}
            onChange={e => {
              this.handleChangeConfigData('fileCntFieldFlag', e.target.value);
            }}
          >
            <Radio value="Y">가능</Radio>
            <Radio value="N">불가능</Radio>
          </Radio.Group>
        </div>
        {configInfo && configInfo.property && configInfo.property.fileCntFieldFlag && configInfo.property.fileCntFieldFlag === 'Y' && (
          <div className="popoverItem popoverItemInput">
            <span className="spanLabel">파일갯수 컬럼명</span>
            <Select
              style={{ width: '100%' }}
              placeholder="파일갯수 컬럼명을 설정해주세요"
              value={(configInfo && configInfo.property && configInfo.property.fileCntFieldFlagKey) || ''}
              onChange={value => this.handleChangeConfigData('fileCntFieldFlagKey', value)}
            >
              {compList &&
                compList.map((item, idx) => (
                  <Option key={`fileCntFieldFlagKey_${item.COMP_FIELD}_${idx}`} value={item.COMP_FIELD}>
                    {item.COMP_FIELD}
                  </Option>
                ))}
            </Select>
          </div>
        )}
      </>
    );
  }
}

export default DragUploadCompConfig;
