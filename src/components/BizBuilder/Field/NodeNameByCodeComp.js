import React, { Component } from 'react';

class NodeNameByCodeComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewNodeName: '',
    };
  }

  componentDidMount() {
    const {
      sagaKey: id,
      COMP_FIELD,
      CONFIG: {
        property: { mapId },
      },
      submitExtraHandler,
    } = this.props;
    console.debug('NodeNameByCodeComp', mapId);
    const url = `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`;
    submitExtraHandler(id, 'GET', url, {}, this.initData);
  }

  initData = (id, response) => {
    const { colData } = this.props;
    const { categoryMapList } = response;
    console.debug('categoryMapList', categoryMapList);
    console.debug('colData', colData);
    if (categoryMapList && categoryMapList.length > 0 && colData) {
      const nodeIdx = categoryMapList.findIndex(iNode => iNode.CODE === colData);
      console.debug('nodeIdx', nodeIdx);
      console.debug('colData', colData);
      if (nodeIdx > -1) this.setState({ viewNodeName: categoryMapList[nodeIdx].NAME_KOR });
    }
  };

  render() {
    const { viewNodeName } = this.state;
    const { visible, CONFIG } = this.props;
    return visible ? <span className={CONFIG.property.className || ''}>{viewNodeName}</span> : '';
  }
}

export default NodeNameByCodeComp;
