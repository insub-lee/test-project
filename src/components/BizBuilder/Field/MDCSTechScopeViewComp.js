import React, { Component } from 'react';

class MDCSTechScopeViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNodeNames: '',
    };
  }

  componentDidMount() {
    const { sagaKey, fieldSelectData, CONFIG } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const viewNodeNames = fieldSelectData[CONFIG.property.compSelectDataKey]
          .map(item => item.NAME_KOR)
          .toString()
          .replaceAll(',', ' ');
        this.setState({ viewNodeNames });
      }
    }
  }

  render() {
    const { viewNodeNames } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewNodeNames}</span> : '';
  }
}

export default MDCSTechScopeViewComp;
