import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select } from 'antd';
import { isJSON } from 'utils/helpers';
import styled from 'styled-components';

const { Option } = Select;

const Wrapper = styled.div`
  margin-top: 10px;

  .ant-select {
    margin-top: 2px !important;
    width: 70% !important;
  }
`;

/*
    빌더 페이지네이션 옵션 보완 
    목적 : 페이지네이션 옵션 사용시, Page당 row 지정, 10 단위 (최대 100 row)
    Dev : JeongHyun, 2020.11.04
*/
class paginationSetting extends React.Component {
  constructor(props) {
    super(props);
    // 추후 옵션값을 추가할때 공통 변경사항이 적용될 수 있도록 state 사용
    this.state = {
      options: [10, 20, 30, 40, 50, 60, 70, 80, 90, 100],
    };
  }

  onChange = (key, val) => {
    const { info, setChangeValue, optSeq } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => {
      if (opt.OPT_SEQ === optSeq) {
        if (isJSON(opt.OPT_VALUE)) {
          const tempVal = JSON.parse(opt.OPT_VALUE);
          tempVal[key] = val;
          return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
        }
        if (opt.OPT_VALUE !== '') {
          const tempVal = { PAGE_CNT: opt.OPT_VALUE };
          tempVal[key] = val;
          return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
        }
        const tempVal = { PAGE_CNT: 10 };
        tempVal[key] = val;
        return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
      }
      return opt;
    });
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  render() {
    const { optConfig } = this.props;
    const { options } = this.state;
    const optValue =
      optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE !== '' && isJSON(optConfig.OPT_VALUE)
        ? JSON.parse(optConfig.OPT_VALUE)
        : { PAGE_CNT: optConfig.OPT_VALUE };
    return (
      <Wrapper>
        <Input.Group compact>
          <Input style={{ width: '20%', marginTop: '2px' }} readOnly value="페이지 CNT" />
          <Select value={optValue.PAGE_CNT || 10} onChange={value => this.onChange('PAGE_CNT', value)}>
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

paginationSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.object,
};

export default paginationSetting;
