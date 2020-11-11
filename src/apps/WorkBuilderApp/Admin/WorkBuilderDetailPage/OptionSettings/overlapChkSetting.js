import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import { isJSON } from 'utils/helpers';
import styled from 'styled-components';

const { Option } = Select;

const CompStyled = styled.div`
  li {
    width: auto !important;
  }
`;

/*
      OPT_SEQ : 18
      OPT_CODE : OLC

      옵션목적 : Task 등록시, 지정한 컬럼 (AND 조건)이 같은 내용일 경우 등록불가 메세지와 함께 SaveTask가 되지않도록 함

      ESHS - 구미(Magnachip) 요청사항, 같은 값이 존재할 경우 등록이 되지 않도록 함으로 Builder 기존 옵션엔 해당 기능이 없어 추가 하였음.

      관련 수정페이지: builder Input comp

      2020.11.10 기준
      현재 추후 해당 옵션에 알람메세지 설정과 같은 추가 옵션이 필요할 경우를 위해 
      { FIELDS: [], } object 형태로 OPT값을 저장되도록 하였으며, 필요한 경우 옵션값 내에 Key, Value 확장하시면됩니다.
*/
class overlapChkSetting extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fieldList: [],
    };
  }

  componentDidMount() {
    const { info } = this.props;
    const { workInfo } = info;
    this.setState({
      fieldList: workInfo && workInfo.FIELD_META_LIST && workInfo.FIELD_META_LIST,
    });
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

  render() {
    const { optConfig } = this.props;
    const { fieldList } = this.state;
    const optValue = optConfig && optConfig.OPT_VALUE && optConfig.OPT_VALUE ? JSON.parse(optConfig.OPT_VALUE) : undefined;
    const fieldValue = optValue && optValue.FIELDS ? optValue.FIELDS : [];
    return (
      <CompStyled>
        <Select
          mode="multiple"
          value={fieldValue}
          style={{ width: '100%' }}
          placeholder="조건(AND) 컬럼을 설정해 주십시오."
          onChange={val => this.onChange('FIELDS', val)}
        >
          {fieldList &&
            fieldList.map(node => (
              <Option key={`info_${node.COMP_FIELD}_feild`} value={node.COMP_FIELD}>
                {`${node.COMP_FIELD}`}
              </Option>
            ))}
        </Select>
      </CompStyled>
    );
  }
}

overlapChkSetting.propTypes = {
  info: PropTypes.any,
  setChangeValue: PropTypes.func,
  optSeq: PropTypes.number,
  optConfig: PropTypes.any,
};

export default overlapChkSetting;
