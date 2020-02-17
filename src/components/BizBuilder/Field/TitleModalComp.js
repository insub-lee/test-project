import React from 'react';
import PropTypes from 'prop-types';

const TitleModalComp = ({ colData, sagaKey: id, rowData, isOpenModalChange, visible, CONFIG }) =>
  visible ? (
    <span
      role="button"
      onKeyPress={() => false}
      onClick={() => isOpenModalChange(rowData.TASK_SEQ)}
      style={{ cursor: 'pointer' }}
      className={(CONFIG && CONFIG.property.className) || ''}
    >
      {colData}
    </span>
  ) : (
    ''
  );

TitleModalComp.propTypes = {
  setViewPageData: PropTypes.func,
};

TitleModalComp.defaultProps = {
  setViewPageData: (a, b) => console.debug(a, b),
};

export default TitleModalComp;
