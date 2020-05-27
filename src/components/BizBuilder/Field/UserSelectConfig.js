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
          <span className="spanLabel">노출될 컬럼</span>
          <AntdSelect
            defaultValue={configInfo.property.exposuredCol}
            onChange={value => handleChangeViewCompData('exposuredCol', value)}
            className="select-sm"
            style={{ width: '100%' }}
          >
            <Select.Option value="1">TEST</Select.Option>
            <Select.Option value="1">TEST</Select.Option>
            <Select.Option value="1">TEST</Select.Option>
            <Select.Option value="1">TEST</Select.Option>
          </AntdSelect>
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">
            선택화면 바로 노출 여부l
            <br />
            (서브빌더 사용시 체크)
          </span>
          <Checkbox checked={configInfo.property.isSubComp} onChange={e => handleChangeViewCompData('isSubComp', e.target.checked)} />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">placeholder 설정</span>
          <AntdInput defaultValue={configInfo.property.placeholder} onChange={e => handleChangeViewCompData('placeholder', e.target.value)} />
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
