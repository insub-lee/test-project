import React, { Component } from 'react';
import PropTypes from 'prop-types';

class DocStatusLabel extends Component {
  componentDidMount() {
    const {
      getExtraApiData,
      sagaKey: id,
      CONFIG: { property },
    } = this.props;
    const mapId = property && property.mapId;
    if (mapId) {
      const apiArray = [{ key: `docStatus_${mapId}`, url: `/api/admin/v1/common/categoryMapList?MAP_ID=${mapId}`, type: 'GET' }];
      getExtraApiData(id, apiArray);
    }
  }

  render() {
    const {
      colData,
      extraApiData,
      CONFIG: { property },
      visible,
    } = this.props;
    const mapId = property && property.mapId;
    const apiData = extraApiData[`docStatus_${mapId}`];
    let docStatusText = '';
    if (apiData && apiData.categoryMapList && colData) {
      const docStatus = apiData.categoryMapList.find(map => map.CODE && Number(map.CODE) === colData);
      docStatusText = docStatus && docStatus.NAME_KOR ? docStatus.NAME_KOR : '';
    }
    return visible ? <span className={property.className || ''}>{docStatusText}</span> : '';
  }
}

DocStatusLabel.propTypes = {
  id: PropTypes.string,
  CONFIG: PropTypes.object,
  colData: PropTypes.number,
  mapId: PropTypes.string,
  extraApiData: PropTypes.arrayOf(PropTypes.object),
  getExtraApiData: PropTypes.func,
};

export default DocStatusLabel;
