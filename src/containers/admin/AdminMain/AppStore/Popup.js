import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Popup extends PureComponent {
  render() {
    if (!this.props.show) {
      return null;
    }

    return (
      <div className="popup-backdrop">
        <div className="popup">
          <button className="popup-close" onClick={this.props.onClose}>✖</button>
          {this.props.children}
        </div>
      </div>
    );
  }
}

Popup.propTypes = {
  show: PropTypes.bool.isRequired,
  children: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Popup;
