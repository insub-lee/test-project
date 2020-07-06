import React, { Component } from 'react';

class NodeNameByCodeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNodeName: '',
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey]) {
        const viewNodeName = fieldSelectData[CONFIG.property.compSelectDataKey].NAME_KOR;
        this.setState({ viewNodeName });
      }
    }
  }

  render() {
    const { viewNodeName } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewNodeName}</span> : '';
  }
}

export default NodeNameByCodeComp;
