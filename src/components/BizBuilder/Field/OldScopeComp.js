import React, { Component } from 'react';

class OldScopeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scope: undefined,
    };
  }

  initData = (id, scopeList) => {
    const viewNodeNames = scopeList.map(node => node.NAME_KOR);
    this.setState({ scope: `[${viewNodeNames.toString().replaceAll(',', '] [')}]` });
  };

  componentDidMount() {
    const {
      fieldSelectData,
      CONFIG,
      sagaKey,
      formData: { MIG_YN, OLD_SCOPE, SCOPE },
    } = this.props;
    if (MIG_YN === 'Y') {
      this.setState({ scope: OLD_SCOPE });
    } else if (fieldSelectData && CONFIG.property.compSelectDataKey && CONFIG.property.compSelectDataKey.length > 0) {
      if (fieldSelectData[CONFIG.property.compSelectDataKey] && fieldSelectData[CONFIG.property.compSelectDataKey].length > 0) {
        const scopeList = fieldSelectData[CONFIG.property.compSelectDataKey];
        this.initData(sagaKey, scopeList);
      }
    }
  }

  render() {
    const { scope } = this.state;
    return <div>{scope}</div>;
  }
}

export default OldScopeComp;
