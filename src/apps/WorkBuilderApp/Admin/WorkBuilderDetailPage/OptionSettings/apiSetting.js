import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';

const { Option } = Select;

class apiSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nApiList: [],
    };
  }

  componentDidMount() {
    const { info } = this.props;
    this.setState({
      nApiList: info.apiList.filter(item => item.CALL_TYPE !== 'F'),
    });
  }

  onChange = (val, optSeq) => {
    const { info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => (opt.OPT_SEQ === optSeq ? { ...opt, OPT_VALUE: JSON.stringify(val) } : opt));
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    const { optSeq, optConfig } = this.props;
    const { nApiList } = this.state;
    return (
      <Select
        mode="multiple"
        value={optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 ? JSON.parse(optConfig.OPT_VALUE) : undefined}
        style={{ width: '100%' }}
        placeholder="API를 선택해 주세요"
        onChange={val => this.onChange(val, optSeq)}
      >
        {nApiList &&
          nApiList.map(node => (
            <Option key={`info_api_use_${node.API_SEQ}`} value={node.API_SEQ}>
              {`${node.API_NAME}(${node.CALL_TYPE === 'B' ? 'Before' : 'After'})`}
            </Option>
          ))}
      </Select>
    );
  }
}

apiSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.any,
};

export default apiSetting;
