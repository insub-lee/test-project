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
      values[index].checked = !values[index].checked;
      return {
        values,
      };
    });
  }

  render() {
    const { name, values } = this.props;
    return (
      <React.Fragment>
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
      </React.Fragment>
    );
  }
}

CheckboxGroup.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object),
};

CheckboxGroup.defaultProps = {
  name: '',
  values: [],
};

export default CheckboxGroup;
