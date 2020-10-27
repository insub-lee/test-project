import React from 'react';
import PropTypes from 'prop-types';
import StyledMultipleChoice from './StyledMultipleChoice';
import Checkbox from '../Checkbox';

class MultipleChoice extends React.Component {
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
    const { name, values, surveyIndex } = this.props;
    return (
      <StyledMultipleChoice>
        {values.map((item, index) => (
          <li key={`${name}_${item.seq}`}>
            <Checkbox
              id={`${name}_${index}`}
              name={`${surveyIndex}-multiple_choice-${name}_${index}`}
              labelText={item.label}
              value={item.value}
              checked={item.checked}
              readOnly={item.readOnly}
              onChange={() => this.handleValues(index)}
            />
          </li>
        ))}
      </StyledMultipleChoice>
    );
  }
}

MultipleChoice.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object),
  surveyIndex: PropTypes.number,
};

MultipleChoice.defaultProps = {
  name: '',
  values: [],
  surveyIndex: -1,
};
export default MultipleChoice;
