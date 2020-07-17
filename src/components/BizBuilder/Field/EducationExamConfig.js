import React from 'react';
import PropTypes from 'prop-types';
import { Input, InputNumber } from 'antd';
import StyledInput from '../styled/Form/StyledInput';
import StyledInputNumber from '../styled/Form/StyledInputNumber';

const AntdInput = StyledInput(Input);
const AntdInputNumber = StyledInputNumber(InputNumber);
class EducationExamConfig extends React.Component {
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
          <span className="spanLabel">버튼 이름 설정</span>
          <AntdInput
            defaultValue={configInfo.property.BTN_NAME || ''}
            placeholder="버튼에 들어갈 내용을 입력하세요."
            onChange={e => handleChangeViewCompData('BTN_NAME', e.target.value)}
            style={{ width: '100%' }}
          />
        </div>
        <div className="popoverItem popoverItemInput">
          <span className="spanLabel">시험 차수 설정</span>
          <AntdInputNumber
            defaultValue={configInfo.property.BTN_NAME || ''}
            placeholder="버튼에 들어갈 내용을 입력하세요."
            onChange={value => handleChangeViewCompData('SEQ', value)}
            style={{ width: '100%' }}
            max={2}
            min={0}
          />
        </div>
      </>
    );
  }
}

EducationExamConfig.propTypes = {
  changeViewCompData: PropTypes.func,
  groupIndex: PropTypes.number,
  rowIndex: PropTypes.number,
  colIndex: PropTypes.number,
  configInfo: PropTypes.object,
};

EducationExamConfig.defatulProps = {};

export default EducationExamConfig;
