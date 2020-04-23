import React, { Component } from 'react';

class CheckableTreeSelectViewComp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      nodeList: [],
    };
  }

  initData = (id, response) => {
    const { categoryMapList: nodes } = response;
    const tNodeIds = nodes.map(item => item.NAME_KOR);
    this.setState({ nodeList: tNodeIds });
  };

  componentDidMount() {
    const { sagaKey, colData, submitExtraHandler } = this.props;
    const url = '/api/admin/v1/common/categoryMapListByNodeIds';
    const nodes = colData.split(',').map(val => Number(val));
    const param = { PARAM: { NODE_IDS: nodes } };
    submitExtraHandler(sagaKey, 'POST', url, param, this.initData);
  }

  render() {
    const { nodeList } = this.state;
    return (
      <div className="treeSelectView">
        {nodeList.map(node => (
          <div className="treeNode">
            <span className="infoTxt">{node}</span>
          </div>
        ))}
      </div>
    );
  }
}

export default CheckableTreeSelectViewComp;
