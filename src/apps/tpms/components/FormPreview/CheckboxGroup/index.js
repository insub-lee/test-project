import React from 'react';
import PropTypes from 'prop-types';
import Checkbox from '../Checkbox';

class CheckboxGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
    this.handleValues = this.handleValues.bind(this);
  }

  handleValues(index) {
    this.setState(prevState => {
      const { values } = prevState;
      const { isSingle } = this.props;

      if (isSingle) {
        values.forEach((e, idx) => {
          values[idx].checked = false;
        });
      }

      values[index].checked = !values[index].checked;
      return {
        values,
      };
    });
  }

  render() {
    const { name, values } = this.props;
    return (
      <>
        {values.map((item, index) => (
          <Checkbox
            key={`${name}_${item.value}`}
            id={`${name}_${index}`}
            name={`${name}_${index}`}
            labelText={item.label}
            value={item.value}
            checked={item.checked}
            readOnly={item.readOnly}
            onChange={() => this.handleValues(index)}
          />
        ))}
      </>
    );
  }
}

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object),
  isSingle: PropTypes.bool,
};

CheckboxGroup.defaultProps = {
  name: '',
  values: [],
  isSingle: false,
};

export default CheckboxGroup;
