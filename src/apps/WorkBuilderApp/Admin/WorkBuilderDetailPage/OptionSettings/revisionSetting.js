import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class revisionSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  onChange = (val, optSeq) => {
    const { info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => (opt.OPT_SEQ === optSeq ? { ...opt, OPT_VALUE: val } : opt));
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    const { optSeq, optConfig } = this.props;
    return (
      <Select
        value={(optConfig && optConfig.OPT_VALUE) || undefined}
        style={{ width: '100%' }}
        placeholder="리스트 데이터 조회조건"
        onChange={val => this.onChange(val, optSeq)}
      >
        <Option value="Y">최종버전만 조회</Option>
        <Option value="A">모든버전 조회</Option>
        <Option value="N">최종버전 이외 버전 조회</Option>
      </Select>
    );
  }
}

revisionSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.any,
};

export default revisionSetting;
