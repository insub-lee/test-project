import React, { Component } from 'react';

export default class CustomTooltip extends Component {
  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  render() {
    console.debug('@@@@@@@@TOOLTIP');
    const { data } = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex);
    return (
      // <div className="custom-tooltip">
      //   <img src="https://dimg.donga.com/i/600/0/90/ugc/CDB/WEEKLY/Article/5a/bd/ea/eb/5abdeaeb2123d2738de6.jpg" alt={data.kind} width="150px" />
      // </div>
      <div className="custom-tooltip" style={{ backgroundColor: this.props.color || 'white' }}>
        <p>
          <span>{data.athlete}</span>
        </p>
        <p>
          <span>Country: </span> {data.country}
        </p>
        <p>
          <span>Total: </span> {data.total}
        </p>
      </div>
    );
  }
}
