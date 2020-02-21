import React from 'react';
import PropTypes from 'prop-types';

const TitleModalPlusComp = ({ colData, sagaKey: id, rowData, isOpenModalPlusChange, visible, CONFIG }) =>
  visible ? (
    <span
      role="button"
      onKeyPress={() => false}
      onClick={() => isOpenModalPlusChange(rowData)}
      style={{ cursor: 'pointer' }}
      className={CONFIG.property.className || ''}
    >
      {colData}
    </span>
  ) : (
    ''
  );

TitleModalPlusComp.propTypes = {
  setViewPageData: PropTypes.func,
};

TitleModalPlusComp.defaultProps = {
  setViewPageData: (a, b) => console.debug(a, b),
};

export default TitleModalPlusComp;
