import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { WidgetWrapper } from './style';

export default class IsoWidgetsWrapper extends PureComponent {
  render() {
    const {
      width,
      gutterTop,
      gutterRight,
      gutterBottom,
      gutterLeft,
      padding,
      children,
      item,
    } = this.props;

    const wrapperStyle = {
      marginTop: gutterTop,
      marginRight: gutterRight,
      marginBottom: gutterBottom,
      marginLeft: gutterLeft,
      padding,
      color: item.color,
      backgroundColor: item.bgColor,
      width,
    };

    let { functions } = item.basic;
    if (functions === undefined) {
      functions = [];
    }

    return (
      <WidgetWrapper className="isoWidgetsWrapper" style={wrapperStyle}>
        <div>
          title: {item.title}
          {functions.includes('notify') ? (<span style={{ float: 'right' }}><i className="anticon anticon-exclamation-circle-o">{}</i></span>) : ('')}
          {functions.includes('link') ? (<span style={{ float: 'right' }}><i className="anticon anticon-link">{}</i></span>) : ('')}
          {functions.includes('close') ? (<span style={{ float: 'right' }}><i className="anticon anticon-cross-circle-o">{}</i></span>) : ('')}
        </div>
        {children}
      </WidgetWrapper>
    );
  }
}

IsoWidgetsWrapper.propTypes = {
  item: PropTypes.object, // eslint-disable-line
  width: PropTypes.string, // eslint-disable-line
  gutterTop: PropTypes.string, // eslint-disable-line
  gutterRight: PropTypes.string, // eslint-disable-line
  gutterBottom: PropTypes.number, // eslint-disable-line
  gutterLeft: PropTypes.string, // eslint-disable-line
  padding: PropTypes.string, // eslint-disable-line
  children: PropTypes.object.isRequired,
};
