import * as PropTypes from 'prop-types';
import React from 'react';
import { Input, message } from 'antd';
import { debounce } from 'lodash';
import StyledInput from 'commonStyled/Form/StyledInput';

const AntdInput = StyledInput(Input);

class TimeInputComp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hour: 0,
      minute: 0,
    };
    this.handleOnChange = debounce(this.handleOnChange, 300);
  }

  componentDidMount() {
    const { colData } = this.props;
    const tempTime = colData && colData.split(':');
    this.setState({ hour: tempTime && tempTime[0], minute: tempTime && tempTime[1] });
  }

  onChange = (name, value) => {
    this.setState({ [name]: Number(value.replace(/[^0-9A-Z_]/gi, '')) }, this.handleOnChange);
  };

  handleOnChange = () => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    const { hour, minute } = this.state;
    if (hour >= 0 && hour <= 24 && minute >= 0 && minute <= 60) {
      if (CONFIG.property.isRequired) {
        changeValidationData(id, COMP_FIELD, !!(hour || minute), !(hour || minute) ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
      }
      changeFormData(id, COMP_FIELD, `${String(hour || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}`);
    } else {
      message.warning('시간을 올바르게 입력하시오');
      if (hour >= 0 && hour <= 24) {
        this.setState({ minute: 0 });
      } else {
        this.setState({ hour: 0 });
      }
    }
  };

  render() {
    const { CONFIG, readOnly, visible, viewType } = this.props;
    const { hour, minute } = this.state;
    return visible ? (
      <>
        {readOnly || CONFIG.property.readOnly || viewType === 'LIST' ? (
          <span>{`${hour || 0} 시 ${minute || 0} 분`}</span>
        ) : (
          <>
            <AntdInput
              value={hour || 0}
              style={{ width: '30%' }}
              maxLength={2}
              placeholder={CONFIG.property.placeholder}
              onChange={e => this.onChange('hour', e.target.value)}
              className={`mr5 ant-input-inline ${CONFIG.property.className || ''}`}
            />
            시{' '}
            <AntdInput
              value={minute || 0}
              style={{ width: '30%' }}
              maxLength={2}
              placeholder={CONFIG.property.placeholder}
              onChange={e => this.onChange('minute', e.target.value)}
              className={`mr5 ant-input-inline ${CONFIG.property.className || ''}`}
            />
            분
          </>
        )}
      </>
    ) : (
      ''
    );
  }
}

TimeInputComp.propTypes = {
  COMP_FIELD: PropTypes.any,
  NAME_KOR: PropTypes.any,
  CONFIG: PropTypes.any,
  colData: PropTypes.any,
  changeFormData: PropTypes.any,
  sagaKey: PropTypes.string,
  viewType: PropTypes.string,
  changeValidationData: PropTypes.any,
  readOnly: PropTypes.any,
  visible: PropTypes.bool,
};

export default TimeInputComp;
