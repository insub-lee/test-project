import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WidgetBox } from './style';

export default class IsoWidgetBox extends PureComponent {
  render() {
    const { children } = this.props;

    const boxStyle = {
      height: this.props.height,
      padding: this.props.padding,
    };

    return (
      <WidgetBox className="isoWidgetBox" style={boxStyle}>
        {children}
      </WidgetBox>
    );
  }
}

IsoWidgetBox.propTypes = {
  children: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  padding: PropTypes.number.isRequired,
};
