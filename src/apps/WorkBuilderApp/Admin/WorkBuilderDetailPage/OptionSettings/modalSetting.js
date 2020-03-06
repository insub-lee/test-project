import React from 'react';
import { Input, Select } from 'antd';
import { debounce } from 'lodash';

import { isJSON } from 'utils/helpers';
import styled from 'styled-components';

const Wrapper = styled.div`
  input[type='text'] {
    width: 70%;
    border-radius: 3px 0px 0px 3px;
  }
  .ant-select-selection {
    height: 35px;
    border-radius: 0px 3px 3px 0px;
    border-left: none;
    &:hover {
      border-color: #d9d9d9;
    }
  }
`;
class modalSetting extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = debounce(this.onChange, 500);
  }

  componentDidMount() {
    const { info, optSeq, optConfig, setChangeValue } = this.props;
    const { workInfo } = info;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 ? JSON.parse(optConfig.OPT_VALUE) : {};
    const isWidthType = !optValue.widthType || optValue.widthType.length === 0; // this.onChange('widthType', 'px');
    const isHeightType = !optValue.heightType || optValue.heightType.length === 0; // this.onChange('heightType', 'px');

    if (isWidthType || isHeightType) {
      const optList = workInfo.OPT_INFO;
      const nOptList = optList.map(opt => {
        if (opt.OPT_SEQ === optSeq) {
          if (isJSON(opt.OPT_VALUE)) {
            const tempVal = JSON.parse(opt.OPT_VALUE);
            if (isWidthType) tempVal.widthType = 'px';
            if (isHeightType) tempVal.heightType = 'px';
            return { ...opt, OPT_VALUE: JSON.stringify(tempVal) };
          }
          return { ...opt, OPT_VALUE: JSON.stringify({ widthType: 'px', heightType: 'px' }) };
        }
        return opt;
      });
      setChangeValue('workInfo', 'OPT_INFO', nOptList);
    }
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
        return { ...opt, OPT_VALUE: JSON.stringify({ [key]: val }) };
      }
      return opt;
    });
    setChangeValue('workInfo', 'OPT_INFO', nOptList);
  };

  onChangeType = (key, val) => {
    console.debug(val);
  };

  render() {
    const { info, optSeq, optConfig } = this.props;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 ? JSON.parse(optConfig.OPT_VALUE) : {};
    return (
      <>
        <Wrapper>
          <Input defaultValue={optValue.width || undefined} placeholder="넓이 입력" onChange={e => this.onChange('width', e.target.value)} />
          <Select
            style={{ width: '70px', verticalAlign: 'top', margin: '0px' }}
            defaultValue={optValue.widthType || 'px'}
            onChange={value => this.onChange('widthType', value)}
          >
            <Select.Option value="%">%</Select.Option>
            <Select.Option value="px">px</Select.Option>
          </Select>
        </Wrapper>
        <Wrapper>
          <Input defaultValue={optValue.height || undefined} placeholder="높이 입력" onChange={e => this.onChange('height', e.target.value)} />
          <Select
            style={{ width: '70px', verticalAlign: 'top', margin: '0px' }}
            defaultValue={optValue.heightType || 'px'}
            onChange={value => this.onChange('heightType', value)}
          >
            <Select.Option value="%">%</Select.Option>
            <Select.Option value="px">px</Select.Option>
          </Select>
        </Wrapper>
      </>
    );
  }
}

export default modalSetting;
