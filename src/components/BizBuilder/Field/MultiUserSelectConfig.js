import React from 'react';
import PropTypes from 'prop-types';
import { Input, Select, Checkbox } from 'antd';
import StyledInput from '../styled/Form/StyledInput';
import StyledSelect from '../styled/Form/StyledSelect';

const AntdInput = StyledInput(Input);
const AntdSelect = StyledSelect(Select);
class UserSelectConfig extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  handleChangeViewCompData = (key, value) => {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    if (key === 'isSubComp') {
      configInfo.property.expression = null;
    }
    configInfo.property[key] = value;
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  };

  render() {
    const { handleChangeViewCompData } = this;
    const { configInfo } = this.props;
    return (
      <>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">다중입력 여부</span>
          <Checkbox checked={configInfo.property.isMultiple} onChange={e => handleChangeViewCompData('isMultiple', e.target.checked)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">
            선택화면 바로 노출 여부
            <br />
            (서브빌더 사용시 체크)
          </span>
          <Checkbox checked={configInfo.property.isSubComp} onChange={e => handleChangeViewCompData('isSubComp', e.target.checked)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">표현식</span>
          <AntdSelect
            defaultValue={configInfo.property.expression}
            value={configInfo.property.expression}
            onChange={value => handleChangeViewCompData('expression', value)}
            className="select-sm"
            style={{ width: '100%' }}
            disabled={configInfo.property.isSubComp}
          >
            <Select.Option value="name">이름</Select.Option>
            <Select.Option value="empNo">사번</Select.Option>
            <Select.Option value="nameAndEmpNo">이름, 사번</Select.Option>
            <Select.Option value="All">이름, 사번, 부서</Select.Option>
          </AntdSelect>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">placeholder 설정</span>
          <AntdInput
            disabled={configInfo.property.isSubComp}
            defaultValue={configInfo.property.placeholder}
            onChange={e => handleChangeViewCompData('placeholder', e.target.value)}
          />
        </div>
      </>
    );
  }
}

UserSelectConfig.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

export default UserSelectConfig;
