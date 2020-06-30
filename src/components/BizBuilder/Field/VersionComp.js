import React, { Component } from 'react';

class VersionComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      version: undefined,
    };
  }

  componentDidMount() {
    const { visible, CONFIG, colData, formData } = this.props;
    const { STATUS } = formData;
    const value = colData.indexOf('.') > -1 ? colData.split('.')[0] : colData;
    const ver = STATUS === 99 ? 'OBS' : value;
    this.setState({ version: ver });
  }

  render() {
    const { colData, CONFIG } = this.props;
    const { version } = this.state;
    return <span className={CONFIG.property.className || ''}>{version}</span>;
  }
}

export default VersionComp;
