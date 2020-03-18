import React, { Component } from 'react';

export default class CustomTooltip extends Component {
  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  render() {
    const { data } = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex);
    console.debug(data);
    return (
      <div className="custom-tooltip">
        <span>ㅇㅁ너ㅏㅣ춤니ㅜㅊㄴㅁ</span>
        <span>ㅇㅁ너ㅏㅣ춤니ㅜㅊㄴㅁ</span>
        <span>ㅇㅁ너ㅏㅣ춤니ㅜㅊㄴㅁ</span>
      </div>
      // <img
      //   src="https://blogsimages.adobe.com/creativedialogue/files/2018/12/Adobe-Photoshop-Bestmoments2018-Blog-Tutorial-1-819x10w224.jpg"
      //   alt={data.kind}
      //   width="200px"
      // />
    );
  }
}
