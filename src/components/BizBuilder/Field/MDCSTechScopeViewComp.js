import React, { Component } from 'react';

import { isJSON } from 'utils/helpers';

class MDCSTechScopeViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNodeNames: '',
    };
  }

  componentDidMount() {
    const { fieldSelectData, CONFIG, formData } = this.props;
    if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const viewNodeNames = fieldSelectData[CONFIG.property.compSelectDataKey]
          .map(item => item.NAME_KOR)
          .toString()
          .replaceAll(',', ' ');
        this.setState({ viewNodeNames });
      } else {
        this.setOldScope(CONFIG, formData);
      }
    } else {
      this.setOldScope(CONFIG, formData);
    }
  }

  setOldScope = (CONFIG, formData) => {
    if (formData.MIG_YN && formData.MIG_YN === 'Y' && formData.OLD_SCOPE && formData.OLD_SCOPE.length > 0) {
      const splitData = formData.OLD_SCOPE.split('|');
      if (splitData.length > 0) {
        let oldScopeKey = '';
        if (isJSON(CONFIG.property.compSelectDataParam)) {
          const param = JSON.parse(CONFIG.property.compSelectDataParam);
          oldScopeKey = param.GUBUN;
        }
        splitData.forEach(node => {
          const splitNode = node.trim().split(':');
          if (splitNode.length === 2) {
            if (oldScopeKey && oldScopeKey.length > 0 && oldScopeKey.toUpperCase() === splitNode[0].toUpperCase()) {
              this.setState({ viewNodeNames: splitNode[1] });
            }
          }
        });
      }
    }
  };

  render() {
    const { viewNodeNames } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewNodeNames}</span> : '';
  }
}

export default MDCSTechScopeViewComp;
