import React, { Component } from 'react';
import StickerWidgetWrapper from './style';

class StickerWidget extends Component {
  constructor(prop) {
    super(prop);
    this.state = {
      fontColor: prop.fontColor,
      bgColor: prop.bgColor,
      widthnum: prop.widthnum,
      icon: prop.icon,
      number: prop.number,
      text: prop.text,
    };
  }
  render() {
    const {
      fontColor,
      bgColor,
      widthnum,
      icon,
      number,
      text,
    } = this.state;

    const textColor = {
      color: fontColor,
    };
    const widgetStyle = {
      backgroundColor: bgColor,
      width: widthnum,
    };
    const iconStyle = {
      color: fontColor,
    };

    return (
      <StickerWidgetWrapper className="isoStickerWidget" style={widgetStyle}>
        <div
          className="isoIconWrapper"
          style={{ display: icon ? 'block' : 'none' }}
        >
          <i className={icon} style={iconStyle} />
        </div>
        <div className="isoContentWrapper">
          <h3
            className="isoStatNumber"
            style={{ textColor, display: number ? 'block' : 'none' }}
          >
            {number}
          </h3>
          <span
            className="isoLabel"
            style={{ textColor, display: text ? 'block' : 'none' }}
          >
            {text}
          </span>
        </div>
      </StickerWidgetWrapper>
    );
  }
}

export default StickerWidget;
