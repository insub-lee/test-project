import React, { Component } from 'react';

class MainWidget extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="main-widget-wrapper">
        <div className="main-widget-row">
          <div className="main-widget-col">가</div>
          <div className="main-widget-col">나</div>
          <div className="main-widget-col">다</div>
        </div>
        <div className="main-widget-row">
          <div className="main-widget-col">라</div>
          <div className="main-widget-col">마</div>
          <div className="main-widget-col">바</div>
        </div>
      </div>
    );
  }
}

export default MainWidget;
