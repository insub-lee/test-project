// import styled from 'styled-components';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import SwaggerUi, { presets } from 'swagger-ui';
import 'swagger-ui/dist/swagger-ui.css';

// const SwaggerWrapper = styled.div`
//   .wrapper {
//     height: auto;
//   }
//   .title {
//     position: static;
//   }
// `;

class SwaggerUI extends Component {
  componentDidMount() {
    SwaggerUi({
      dom_id: '#swaggerContainer',
      url: this.props.url,
      spec: this.props.spec,
      presets: [presets.apis],
    });
  }

  render() {
    return (
      // <SwaggerWrapper id="swaggerContainer">
      // </SwaggerWrapper>
      <div id="swaggerContainer" />
    );
  }
}

SwaggerUI.propTypes = {
  url: PropTypes.string.isRequired,
  spec: PropTypes.object,
};

SwaggerUI.defaultProps = {
  spec: undefined,
};

export default SwaggerUI;
