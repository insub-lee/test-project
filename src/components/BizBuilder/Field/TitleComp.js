import React from 'react';
import PropTypes from 'prop-types';

const TitleComp = ({ colData, sagaKey: id, rowData, changeViewPage, visible, CONFIG, isBuilderModal, changeBuilderModalState }) =>
  visible ? (
    <span
      role="button"
      onKeyPress={() => false}
      onClick={() =>
        isBuilderModal
          ? changeBuilderModalState(true, 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ)
          : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, 'VIEW')
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
};

TitleComp.defaultProps = {
  setViewPageData: (a, b) => console.debug(a, b),
};

export default TitleComp;
