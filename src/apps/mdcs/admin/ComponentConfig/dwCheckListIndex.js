import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'apps/mdcs/components/BizMicroDevBase';

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    rootMapName: undefined,
    selected: undefined,
  };

  componentDidMount() {
    const { changeCompData, groupIndex, rowIndex, colIndex } = this.props;
    changeCompData(groupIndex, rowIndex, colIndex, 'mapId', [12, 13]);
  }

  render() {
    return '';
  }
}
const configer = ({ changeCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    changeCompData={changeCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.defaultProps = {};
export default configer;
