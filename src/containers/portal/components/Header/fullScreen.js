import React, { Component } from 'react';
import Fullscreen from 'react-fullscreen-crossbrowser';
import Button from '../../../../components/Button';

class FullScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { isFullscreenEnabled: false };
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick() {
    this.setState(this.state.isFullscreenEnabled ?
      { isFullscreenEnabled: false } : { isFullscreenEnabled: !false });
  }
  render() {
    return (
      <Fullscreen
        enabled={this.state.isFullscreenEnabled}
        onChange={isFullscreenEnabled => this.setState({ isFullscreenEnabled })}
      >
        <div className="full-screenable-node">
          <div align="right">
            <Button type="mFullscreenButton" onClick={this.handleClick}>
              <span className="icon icon-full" />
            </Button>
          </div>
        </div>
      </Fullscreen>
    );
  }
}
export default FullScreen;
