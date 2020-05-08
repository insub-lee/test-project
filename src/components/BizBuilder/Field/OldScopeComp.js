import React, { Component } from 'react';

class OldScopeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      scope: undefined,
    };
  }

  initData = (id, response) => {
    const { categoryMapList } = response;
    if (categoryMapList && categoryMapList.length > 0) {
      const viewNodeNames = categoryMapList.map(node => node.NAME_KOR);
      this.setState({ scope: `[${viewNodeNames.toString().replaceAll(',', '] [')}]` });
    }
  };

  componentDidMount() {
    const {
      sagaKey,
      submitExtraHandler,
      formData: { MIG_YN, OLD_SCOPE, SCOPE },
    } = this.props;
    if (MIG_YN === 'Y') {
      this.setState({ scope: OLD_SCOPE });
    } else {
      const nodeIds = SCOPE.toString()
        .split(',')
        .map(node => Number(node));
      const url = '/api/admin/v1/common/categoryMapListByNodeIds';
      submitExtraHandler(sagaKey, 'POST', url, { PARAM: { NODE_IDS: nodeIds } }, this.initData);
    }
  }

  render() {
    const { scope } = this.state;
    return <div>{scope}</div>;
  }
}

export default OldScopeComp;
