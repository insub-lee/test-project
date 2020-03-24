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
  목적 : Task 등록, 수정, 삭제시 발생하는 changeView 이벤트에 대해 이동될 ViewPage를 지정함
  기존로직 : Task 등록 -> ViewChange ->  
*/

class changeViewSetting extends React.Component {
  componentDidMount() {
    const { info, setChangeValue, optSeq } = this.props;
    const { workInfo } = info;
    const optList = workInfo.OPT_INFO;
    const nOptList = optList.map(opt => {
      if (opt.OPT_SEQ === optSeq) {
        if (!isJSON(opt.OPT_VALUE)) {
          // JSON 타입이 아닐 경우는 전체 값을 디폴트로 지정
          return { ...opt, OPT_VALUE: JSON.stringify({ INPUT: 'VIEW', MODIFY: 'VIEW', DELETE: 'LIST' }) };
        }
        // JSON 타입일 시 리턴
        return opt;
      }
      return opt;
    });

    setChangeValue('workInfo', 'OPT_INFO', nOptList);
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

  renderSelect = (key, options, optValue) => (
    <Select defaultValue={optValue} onChange={value => this.onChange(key, value)}>
      {options.map(option => (
        <Option value={`${option}`} key={`${option}`}>
          {option}
        </Option>
      ))}
    </Select>
  );

  render() {
    const { optConfig } = this.props;
    const keyTypes = [
      { key: 'INPUT', value: '입력', default: 'VIEW' },
      { key: 'MODIFY', value: '수정', default: 'VIEW' },
      { key: 'DELETE', value: '삭제', default: 'LIST' },
    ];
    const options = ['VIEW', 'INPUT', 'MODIFY', 'LIST'];
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE.length > 0 ? JSON.parse(optConfig.OPT_VALUE) : {};
    return (
      <Wrapper>
        <Input.Group compact>
          {keyTypes.map(keyType => (
            <>
              <Input key={`${keyType.key}Page`} style={{ width: '48px', marginTop: '2px' }} defaultValue={`${keyType.value}`} readOnly />
              {this.renderSelect(keyType.key, options, optValue[keyType.key] || keyType.default)}
            </>
          ))}
        </Input.Group>
      </Wrapper>
    );
  }
}

changeViewSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.object,
};

export default changeViewSetting;
