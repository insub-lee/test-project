import React, { Component } from 'react';
import * as PropTypes from 'prop-types';

class SelectReadComp extends Component {
  componentDidMount() {
    const { getExtraApiData, sagaKey: id, colData } = this.props;
    const apiValue = [
      {
        key: `label_${colData}`,
        url: '/api/admin/v1/common/categoryFullPathNm',
        params: { PARAM: { NODE_ID: Number(colData) } },
        type: 'POST',
      },
    ];
    if (colData && colData !== ' ') {
      getExtraApiData(id, apiValue);
    }
  }

  render() {
    const { extraApiData, colData, visible } = this.props;
    const apiData = extraApiData[`label_${colData}`];

    return visible && <label>{apiData ? apiData.fullPath_Nm && apiData.fullPath_Nm.FULLPATH_NM : ''}</label>;
  }
}

SelectReadComp.propTypes = {
  extraApiData: PropTypes.object,
  getExtraApiData: PropTypes.func,
  sagaKey: PropTypes.object,
  colData: PropTypes.any,
  visible: PropTypes.bool,
};

SelectReadComp.defaultProps = {
  visible: false,
};

export default SelectReadComp;
