import React from 'react';
import { Select } from 'antd';

const { Option } = Select;

// eslint-disable-next-line react/prefer-stateless-function
class ProcSetting extends React.Component {
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
    const { processList } = info;
    return (
      <Select
        value={optConfig && Number(optConfig.OPT_VALUE)}
        style={{ width: '100%' }}
        placeholder="프로세스를 선택해 주세요"
        onChange={val => this.onChange(val, optSeq)}
      >
        {processList &&
          processList.map(process => (
            <Option key={`info_process_use_${process.PRC_ID}`} value={process.PRC_ID}>
              {process.NAME_KOR}
            </Option>
          ))}
      </Select>
    );
  }
}

export default ProcSetting;
