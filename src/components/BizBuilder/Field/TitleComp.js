import React from 'react';
import PropTypes from 'prop-types';

const TitleComp = ({ colData, sagaKey: id, rowData, changeViewPage, visible, CONFIG, isBuilderModal, changeBuilderModalState }) =>
  visible ? (
    <span
      role="button"
      onKeyPress={() => false}
      onClick={() =>
        isBuilderModal
          ? changeBuilderModalState(true, CONFIG.property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
          : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, CONFIG.property.changeViewType || 'VIEW')
      }
      style={{ cursor: 'pointer' }}
      className={CONFIG.property.className || ''}
    >
      {colData}
    </span>
  ) : (
    ''
  );

TitleComp.propTypes = {
  setViewPageData: PropTypes.func,
  CONFIG: PropTypes.object,
};

TitleComp.defaultProps = {
  setViewPageData: (a, b) => console.debug(a, b),
};

export default TitleComp;
