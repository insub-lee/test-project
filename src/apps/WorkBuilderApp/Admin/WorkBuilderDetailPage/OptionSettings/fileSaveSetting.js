import React, { Component } from 'react';
import { Select } from 'antd';

const { Option } = Select;
class FileSaveSetting extends Component {
  constructor(props) {
    super(props);
  }

  onChange = (val, optSeq) => {
    const { info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => (opt.OPT_SEQ === optSeq ? { ...opt, OPT_VALUE: val } : opt));
    console.debug('onChange', optSeq, val, optList);
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    console.debug('this.propos', this.props);
    const { optConfig, optSeq } = this.props;
    const { OPT_VALUE } = optConfig;
    return (
      <Select placeholder="파일저장방법 선택" onChange={val => this.onChange(val, optSeq)} value={OPT_VALUE}>
        <Option key="opt1" value="tempToRealMove">
          파일이동(temp => real)
        </Option>
        <Option key="opt2" value="tempToRealPDF">
          PDF변화 (temp => pdf => real)
        </Option>
      </Select>
    );
  }
}

export default FileSaveSetting;
