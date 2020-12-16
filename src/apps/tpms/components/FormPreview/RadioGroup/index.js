import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Radio from '../Radio';
import StyledRadio from './StyledRadio';

const StyledCheckedItem = styled.div`
  display: inline-block;
  width: calc(100% - 200px);
  background-color: #e7e7e7;
  padding: 10px;
`;

class RadioGroup extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      values: props.values || [],
    };
    this.handleValues = this.handleValues.bind(this);
    this.checkedItemRenderer = this.checkedItemRenderer.bind(this);
  }

  handleValues(value) {
    const { onChange } = this.props;
    this.setState(
      prevState => {
        const { values } = prevState;
        const nextValues = values.map(row => ({
          ...row,
          checked: row.value === value,
        }));
        return {
          values: nextValues,
        };
      },
      () => onChange(value),
    );
  }

  checkedItemRenderer(item) {
    return item.checked ? (
      <StyledCheckedItem>
        <span className="text">{item.label}</span>
      </StyledCheckedItem>
    ) : (
      ''
    );
  }

  render() {
    const { values } = this.state;
    const { name } = this.props;
    return (
      <>
        {values.map((item, index) =>
          item.readOnly ? (
            this.checkedItemRenderer(item)
          ) : (
            <Radio
              key={`${name}_${item.value}`}
              id={`${name}_${index}`}
              // name={`${name}_${index}`}
              name={`${name}`}
              labelText={item.label}
              value={item.value}
              checked={item.checked}
              readOnly={item.readOnly}
              onChange={value => this.handleValues(value)}
            />
          ),
        )}
      </>
    );
  }
}

RadioGroup.propTypes = {
  name: PropTypes.string,
  values: PropTypes.arrayOf(PropTypes.object),
  onChange: PropTypes.func,
};

RadioGroup.defaultProps = {
  name: '',
  values: [],
  onChange: () => {},
};

export default RadioGroup;
