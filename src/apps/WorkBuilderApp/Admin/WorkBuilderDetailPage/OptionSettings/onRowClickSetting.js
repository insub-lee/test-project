import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { isJSON } from 'utils/helpers';
import styled from 'styled-components';

const { Option } = Select;

const Wrapper = styled.div`
  .ant-select {
    margin-top: 2px !important;
    width: 21% !important;
  }
`;

/*
    신규추가 
    목적 : ListGroup 내에서 Row를 클릭시 원하는 뷰로 이동할 수 있는 Builder Option (빌더모달 사용시에도 지원)
    create by. JeongHyun
*/
class onRowClickSetting extends React.Component {
  constructor(props) {
    super(props);
    // 추후 옵션값을 추가할때 공통 변경사항이 적용될 수 있도록 state 사용
    this.state = {
      options: ['VIEW', 'MODIFY'],
    };
  }

  componentDidMount() {
    const { optSeq, optConfig } = this.props;
    const { options } = this.state;
    if (optConfig.OPT_VALUE === '') {
      this.onChange(options[0], optSeq);
    }
  }

  onChange = (val, optSeq) => {
    const { info, setChangeValue } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => (opt.OPT_SEQ === optSeq ? { ...opt, OPT_VALUE: val } : opt));
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    const { optSeq, optConfig } = this.props;
    const { options } = this.state;
    return (
      <Wrapper>
        <Input.Group compact>
          <Input style={{ width: '20%', marginTop: '2px' }} readOnly value="뷰 지정" />
          <Select value={optConfig.OPT_VALUE === '' ? options[0] : optConfig.OPT_VALUE} onChange={value => this.onChange(value, optSeq)}>
            {options.map(option => (
              <Option value={option} key={option}>
                {option}
              </Option>
            ))}
          </Select>
        </Input.Group>
      </Wrapper>
    );
  }
}

onRowClickSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.object,
};

export default onRowClickSetting;
