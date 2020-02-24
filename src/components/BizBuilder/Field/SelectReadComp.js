import React, { Component } from 'react';

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
    const { extraApiData, colData } = this.props;
    console.debug('@@@COLDATA@@@', colData);
    const apiData = extraApiData[`label_${colData}`];
    return <label>{apiData ? apiData.fullPath_Nm.FULLPATH_NM : ''}</label>;
  }
}

export default SelectReadComp;
