import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TitleModalComp = ({ colData, sagaKey: id, rowData, isOpenModalChange, visible, CONFIG, isBuilderModal, changeBuilderModalState, changeViewPage }) =>
  visible ? (
    <>
      {isOpenModalChange ? (
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => false}
          onClick={() => isOpenModalChange(rowData)}
          style={{ cursor: 'pointer' }}
          className={(CONFIG && CONFIG.property.className) || ''}
        >
          {CONFIG.property.dataViewType === 'DATE'
            ? moment(colData).format(CONFIG.property.dateFormat === 'DT' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')
            : colData}
        </span>
      ) : (
        <span
          role="button"
          tabIndex={0}
          onKeyPress={() => false}
          onClick={() =>
            isBuilderModal
              ? changeBuilderModalState(true, CONFIG.property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
              : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, CONFIG.property.changeViewType || 'VIEW')
          }
          style={{ cursor: 'pointer' }}
          className={CONFIG.property.className || ''}
        >
          {CONFIG.property.dataViewType === 'DATE'
            ? moment(colData).format(CONFIG.property.dateFormat === 'DT' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss')
            : colData}
        </span>
      )}
    </>
  ) : (
    ''
  );

TitleModalComp.propTypes = {
  sagaKey: PropTypes.string,
  colData: PropTypes.any,
  visible: PropTypes.bool,
  isBuilderModal: PropTypes.bool,
  CONFIG: PropTypes.object,
  rowData: PropTypes.object,
  isOpenModalChange: PropTypes.func,
  changeBuilderModalState: PropTypes.func,
  changeViewPage: PropTypes.func,
};

TitleModalComp.defaultProps = {};

export default TitleModalComp;
