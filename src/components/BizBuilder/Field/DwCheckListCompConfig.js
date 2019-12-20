import React, { Component } from 'react';
import PropTypes from 'prop-types';

import BizMicroDevBase from 'components/BizMicroDevBase';

class ComponentConfig extends Component {
  state = {
    rootMapValue: undefined,
    rootMapName: undefined,
    selected: undefined,
  };

  componentDidMount() {
    const { changeViewCompData, groupIndex, rowIndex, colIndex, configInfo } = this.props;
    configInfo.property.mapId = [12, 13];
    changeViewCompData(groupIndex, rowIndex, colIndex, 'CONFIG', configInfo);
  }

  render() {
    return '';
  }
}
const configer = ({ changeViewCompData, groupIndex, rowIndex, colIndex, configInfo }) => (
  <BizMicroDevBase
    id="componentConfig"
    changeViewCompData={changeViewCompData}
    groupIndex={groupIndex}
    rowIndex={rowIndex}
    colIndex={colIndex}
    configInfo={configInfo}
    component={ComponentConfig}
  ></BizMicroDevBase>
);

ComponentConfig.defaultProps = {};
export default configer;
