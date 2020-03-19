import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class CustomTooltip extends Component {
  getReactContainerClasses() {
    return ['custom-tooltip'];
  }

  render() {
    const { data } = this.props.api.getDisplayedRowAtIndex(this.props.rowIndex);
    return (
      <div className="custom-tooltip">
        <img src="http://eshs-dev.magnachip.com/down/file/159668" alt={data.kind} width="150px" />
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
