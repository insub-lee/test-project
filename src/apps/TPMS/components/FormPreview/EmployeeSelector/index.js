import React from 'react';
import PropTypes from 'prop-types';

import StyledEquipSelector from './StyledEmployeeSelector';
import Button from '../../Button';
import EmployeeSelectorModal from '../../BuiltModals/EmployeeSelectorModal';

class EmployeeSelector extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
    this.employeeSelectorModalRef = React.createRef();
    this.showSearchEquipModal = this.showSearchEquipModal.bind(this);
    this.updateValue = this.updateValue.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // console.debug('@@@ Update Employee Select', this.state.values, this.props.values);
    const { values: prevValues } = prevProps;
    const { values } = this.props;

    if (JSON.stringify(prevValues) !== JSON.stringify(values)) {
      this.updateValues(values);
    } else {
      const shouldUpdate = prevValues.some((prevObj, index) => {
        const nextRow = values[index].values || [];
        const prevRow = prevObj.values || [];

        if (nextRow.length !== prevRow.length) return true;

        return prevRow.some((obj, idx) => !nextRow[idx] || obj.emrNo !== nextRow[idx].emrNo);
      });

      if (shouldUpdate) {
        this.updateValues(values);
      }
    }
  }

  updateValues(values) {
    this.setState({ values });
  }

  showSearchEquipModal(index, values, type) {
    this.employeeSelectorModalRef.current.handleOpen(index, values, this.updateValue, type);
  }

  updateValue(index, nextValue) {
    console.debug('@@@ update value employees', index, nextValue);
    this.setState(prevState => {
      const { values } = prevState;
      values[index].values = nextValue;
      return { values };
    });
  }

  removeUser(index, userIndex) {
    this.setState(prevState => {
      const { values } = prevState;
      const selectedValues = values[index];
      selectedValues.values.splice(userIndex, 1);
      return { values };
    });
  }

  render() {
    const { values } = this.state;
    const { readOnly, onlySingle } = this.props;
    return (
      <StyledEquipSelector>
        <ul className="sub_form">
          {values.map((item, index) => (
            <li key={`EmployeeSelector > ${index + 1}`} style={onlySingle ? { width: '100%', paddingLeft: 0 } : { width: '100%' }}>
              {!onlySingle ? <div className="title">{item.label}</div> : ''}
              <div className="btn btn_wrap btn_left" style={{ width: '80px' }}>
                {!readOnly && !item.fixed && (
                  <Button type="button" color="gray" size="small" onClick={() => this.showSearchEquipModal(index, item.values, item.type)}>
                    선택
                  </Button>
                )}
              </div>
              {item.values.length > 0 && (
                <>
                  <input type="hidden" name={`user_selector_${index}`} value={JSON.stringify(item.values)} />
                  <ul className="users">
                    {item.values.map(({ EMP_NO, NAME_KOR, PSTN_NAME_KOR }, userIndex) => (
                      <li key={EMP_NO} className="user_tag btn_left">
                        <span>{`${EMP_NO} ${NAME_KOR} ${PSTN_NAME_KOR}`}</span>
                        {!readOnly && !item.fixed && (
                          <button type="button" onClick={() => this.removeUser(index, userIndex)}>
                            <i className="fas fa-times" />
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                </>
              )}
              <div style={{ clear: 'both', display: 'none' }} />
            </li>
          ))}
        </ul>
        <EmployeeSelectorModal ref={this.employeeSelectorModalRef} initdpcd={values.length > 0 ? values[0].initdpcd : ''} />
      </StyledEquipSelector>
    );
  }
}

EmployeeSelector.propTypes = {
  readOnly: PropTypes.bool,
  onlySingle: PropTypes.bool,
};

EmployeeSelector.defaultProps = {
  readOnly: false,
  onlySingle: false,
};

export default EmployeeSelector;
