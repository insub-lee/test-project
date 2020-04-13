import * as PropTypes from 'prop-types';
import React from 'react';
import { InputNumber } from 'antd';
import { debounce } from 'lodash';
import StyledInputNumber from 'commonStyled/Form/StyledInputNumber';

const AntdInputNumber = StyledInputNumber(InputNumber);

class NumberComp extends React.Component {
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
    this.setState({ [name]: value }, this.handleOnChange);
  };

  handleOnChange = () => {
    const { sagaKey: id, COMP_FIELD, NAME_KOR, CONFIG, changeFormData, changeValidationData } = this.props;
    const { hour, minute } = this.state;
    if (CONFIG.property.isRequired) {
      changeValidationData(id, COMP_FIELD, !!(hour || minute), !(hour || minute) ? '' : `${NAME_KOR}항목은 필수 입력입니다.`);
    }
    changeFormData(id, COMP_FIELD, `${String(hour || 0).padStart(2, '0')}:${String(minute || 0).padStart(2, '0')}`);
  };

  render() {
    const { CONFIG, readOnly, visible, viewType } = this.props;
    const { hour, minute } = this.state;
    return visible ? (
      <>
        {readOnly || CONFIG.property.readOnly || viewType === 'LIST' ? (
          <span>{`${hour} 시 ${minute} 분`}</span>
        ) : (
          <>
            <AntdInputNumber
              value={hour || 0}
              style={{ width: '100px' }}
              max={24}
              min={0}
              placeholder={CONFIG.property.placeholder}
              onChange={value => this.onChange('hour', value)}
              className={`mr5 ant-input-number-inline ${CONFIG.property.className || ''}`}
            />
            <span style={{ display: 'inline-block', marginRight: '5px' }}>시</span>
            <AntdInputNumber
              value={minute || 0}
              style={{ width: '100px' }}
              max={59}
              min={0}
              placeholder={CONFIG.property.placeholder}
              onChange={value => this.onChange('minute', value)}
              className={`mr5 ant-input-number-inline ${CONFIG.property.className || ''}`}
            />
            <span style={{ display: 'inline-block' }}>분</span>
          </>
        )}
      </>
    ) : (
      ''
    );
  }
}

NumberComp.propTypes = {
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

export default NumberComp;
