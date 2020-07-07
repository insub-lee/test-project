import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class deleteDataList extends React.Component {
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
        value={(optConfig && optConfig.OPT_VALUE) || 'Y'}
        style={{ width: '100%' }}
        placeholder="삭제 데이터 출력여부를 선택해 주세요"
        onChange={val => this.onChange(val, optSeq)}
      >
        <Option value="Y">현재 글만 출력</Option>
        <Option value="A">전체 글만 출력</Option>
        <Option value="N">삭제 글만 출력</Option>
      </Select>
    );
  }
}

deleteDataList.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.any,
};

export default deleteDataList;
