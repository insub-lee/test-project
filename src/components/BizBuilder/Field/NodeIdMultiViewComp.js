import React, { Component } from 'react';
import styled from 'styled-components';

class NodeIdMultiViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNodeNames: '',
    };
  }

  initData = (id, response) => {
    const { categoryMapList } = response;
    if (categoryMapList && categoryMapList.length > 0) {
      const viewNodeNames = categoryMapList.map(node => node.NAME_KOR);
      this.setState({ viewNodeNames: viewNodeNames.toString().replaceAll(',', ' ') });
    }
  };

  componentDidMount() {
    const { sagaKey, submitExtraHandler, colData } = this.props;
    if (colData && colData.toString().length > 0) {
      const nodeIds = colData
        .toString()
        .split(',')
        .map(node => Number(node));
      const url = '/api/admin/v1/common/categoryMapListByNodeIds';
      submitExtraHandler(sagaKey, 'POST', url, { PARAM: { NODE_IDS: nodeIds } }, this.initData);
    }
  }

  render() {
    const { viewNodeNames } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewNodeNames}</span> : '';
  }
}

export default NodeIdMultiViewComp;
