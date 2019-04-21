import React, { Component } from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line react/prefer-stateless-function
export default class TestRenderer extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    /* eslint arrow-body-style: ["error", "always"] */
    const RenderSettingView = (value) => {
      return (
        <div>
          {value}
        </div>
      );
    };

    return (
      <div>
        {RenderSettingView(this.props.value)}
      </div>
    );
  }
}

TestRenderer.propTypes = {
  value: PropTypes.string.isRequired,
};
