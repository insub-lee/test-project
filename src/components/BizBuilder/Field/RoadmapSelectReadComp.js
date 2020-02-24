import React, { Component } from 'react';

class RoadmapSelectReadComp extends Component {
  componentDidMount() {
    const { getExtraApiData, sagaKey: id, colData } = this.props;
    console.debug('@@@DIDMOUNT@@@', colData);
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
    const apiData = extraApiData[`label_${colData}`];
    console.debug('@@@APIDATA@@@', apiData);
    // return <div>hello</div>;
    return <label>{apiData ? apiData.fullPath_Nm.FULLPATH_NM : ''}</label>;
  }
}

export default RoadmapSelectReadComp;
