import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomTooltip extends Component {
  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  tooltipShowDelay = 0;

  render() {
    const { data } = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex);
    return (
      <div className="custom-tooltip">
        <img src="https://dimg.donga.com/i/600/0/90/ugc/CDB/WEEKLY/Article/5a/bd/ea/eb/5abdeaeb2123d2738de6.jpg" alt={data.kind} width="150px" />
      </div>
      // <div className="custom-tooltip" style={{ backgroundColor: this.props.color || 'white' }}>
      //   <p>
      //     <span>{data.kind}</span>
      //   </p>
      //   <p>
      //     <span>모델: </span> {data.model}
      //   </p>
      //   <p>
      //     <span>사이즈: </span> {data.size1}
      //   </p>
      // </div>
    );
  }
}

CustomTooltip.propTypes = {
  api: PropTypes.object,
  rowIndex: PropTypes.number,
};
