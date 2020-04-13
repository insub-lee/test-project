import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Checkbox } from 'antd';

class CheckboxComp extends PureComponent {
  componentDidMount() {}

  onChange = value => {
    const { sagaKey: id, changeFormData, COMP_FIELD } = this.props;
    changeFormData(id, COMP_FIELD, value ? 1 : -1);
  };

  render() {
    const { visible, CONFIG, readOnly, colData, viewType } = this.props;

    return visible ? (
      <>
        <Checkbox
          checked={colData === 1}
          disabled={readOnly || CONFIG.property.readOnly || viewType === 'LIST'}
          onChange={e => this.onChange(e.target.checked)}
        />
      </>
    ) : (
      ''
    );
  }
}

CheckboxComp.propTypes = {
  sagaKey: PropTypes.string,
  viewType: PropTypes.string,
  changeFormData: PropTypes.func,
  CONFIG: PropTypes.object,
  readOnly: PropTypes.bool,
  colData: PropTypes.any,
  visible: PropTypes.bool,
  COMP_FIELD: PropTypes.string,
};

CheckboxComp.defaultProps = {
  readOnly: false,
  changeFormData: () => false,
};

export default CheckboxComp;
