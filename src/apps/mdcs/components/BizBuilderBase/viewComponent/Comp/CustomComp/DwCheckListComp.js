import React, { Component } from 'react';
import PropTypes from 'prop-types';

import CheckListComp from '../CheckListComp';

class DwCheckListComp extends Component {
  state = {
    type: '',
  };

  onOkHandler = () => {
    const { changeFormData, id } = this.props;
    const { type } = this.state;
    changeFormData(id, 'LB_TYPE', type);
  };

  render() {
    return (
      <CheckListComp
        {...this.props}
        isCustom
        customOnChangeHandler={value => {
          this.setState({ type: value });
        }}
        customOnOkHandler={this.onOkHandler}
      ></CheckListComp>
    );
  }
}

export default DwCheckListComp;

DwCheckListComp.propTypes = {
  id: PropTypes.string,
  changeFormData: PropTypes.func,
};
