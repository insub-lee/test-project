import React from 'react';
import PropTypes from 'prop-types';
import StyledSingleChoice from './StyledSingleChoice';
import Radio from '../Radio';

class SingleChoice extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
    this.handleValues = this.handleValues.bind(this);
    this.updateValues = this.updateValues.bind(this);
  }

  componentDidUpdate(prevProps) {
    if (this.props.values !== prevProps.values) {
      this.updateValues();
    }
  }

  updateValues() {
    this.setState({ values: this.props.values });
  }

  handleValues(value) {
    this.setState(prevState => {
      const { values } = prevState;
      const nextValues = values.map(row => ({
        ...row,
        checked: row.value === value,
      }));
      return {
        values: nextValues,
      };
    });
  }

  render() {
    const { values } = this.state;
    const { name, surveyIndex } = this.props;
    return (
      <StyledSingleChoice>
        {values.map((item, index) => (
          <li key={`${name}_${item.seq}`}>
            <Radio
              id={`${name}_${index}`}
              name={`${surveyIndex}-single_choice-${name}`}
              labelText={item.label}
              value={item.value}
              checked={item.checked}
              readOnly={item.readOnly}
              onChange={value => this.handleValues(value)}
            />
          </li>
        ))}
      </StyledSingleChoice>
    );
  }
}

SingleChoice.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object),
  surveyIndex: PropTypes.number,
};

SingleChoice.defaultProps = {
  name: '',
  values: [],
  surveyIndex: -1,
};

export default SingleChoice;
