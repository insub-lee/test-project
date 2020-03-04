import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Sketch from 'components/BizBuilder/Sketch';
import StyledViewDesigner from 'components/BizBuilder/styled/StyledViewDesigner';

class Input extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <StyledViewDesigner>
        <Sketch></Sketch>
      </StyledViewDesigner>
    );
  }
}

Input.propTypes = {};

export default Input;
