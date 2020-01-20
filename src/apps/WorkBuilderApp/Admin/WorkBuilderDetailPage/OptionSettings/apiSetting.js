import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

class apiSetting extends React.Component {
  onChange = (val, optSeq) => {
    const { info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => (opt.OPT_SEQ === optSeq ? { ...opt, OPT_VALUE: val } : opt));
    console.debug(val, nOptList);
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    console.debug('settings', this.props);
    const { info, optSeq, optConfig } = this.props;
    const { apiList } = info;
    return (
      <Select
        mode="multiple"
        value={optConfig && optConfig.OPT_VALUE ? Number(optConfig.OPT_VALUE) : undefined}
        style={{ width: '100%' }}
        placeholder="API를 선택해 주세요"
        onChange={val => this.onChange(val, optSeq)}
      >
        {apiList &&
          apiList.map(node => (
            <Option key={`info_api_use_${node.API_SEQ}`} value={node.API_SEQ}>
              {node.API_NAME}
            </Option>
          ))}
      </Select>
    );
  }
}

export default apiSetting;
