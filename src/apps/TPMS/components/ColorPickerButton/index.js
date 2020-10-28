import React from 'react';
import PropTypes from 'prop-types';
import reactCSS from 'reactcss';
import { GithubPicker } from 'react-color';

class ColorPickerButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleClick() {
    this.setState(prevState => ({
      displayColorPicker: !prevState.displayColorPicker,
    }));
  }

  handleClose() {
    this.setState({ displayColorPicker: false });
  }

  handleChange(color) {
    const { callback } = this.props;
    const rgba = color.rgb;
    this.setState({ displayColorPicker: false }, () => callback(rgba));
  }

  render() {
    const { displayColorPicker } = this.state;
    const { color } = this.props;
    const styles = reactCSS({
      default: {
        color: {
          display: 'inline-block',
          width: '36px',
          height: '14px',
          borderRadius: '2px',
          background: `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`,
        },
        swatch: {
          padding: '5px',
          background: '#fff',
          borderRadius: '1px',
          boxShadow: '0 0 0 1px rgba(0,0,0,.1)',
          display: 'inline-block',
          cursor: 'pointer',
        },
        popover: {
          position: 'absolute',
          zIndex: '2',
        },
        cover: {
          position: 'fixed',
          top: '0px',
          right: '0px',
          bottom: '0px',
          left: '0px',
        },
      },
    });
    return (
      <div>
        <button type="button" style={styles.swatch} onClick={this.handleClick}>
          <span style={styles.color} />
        </button>
        {displayColorPicker ? (
          <div style={styles.popover}>
            <div style={styles.cover} onClick={this.handleClose} role="button" onKeyPress={() => false} tabIndex="0" />
            <GithubPicker onChange={this.handleChange} />
          </div>
        ) : null}
      </div>
    );
  }
}

ColorPickerButton.propTypes = {
  color: PropTypes.shape({
    r: PropTypes.number.isRequired,
    g: PropTypes.number.isRequired,
    b: PropTypes.number.isRequired,
    a: PropTypes.number.isRequired,
  }).isRequired,
  callback: PropTypes.func,
};

ColorPickerButton.defaultProps = {
  callback: () => false,
};

export default ColorPickerButton;
