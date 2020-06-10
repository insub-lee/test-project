import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const TitleComp = ({ colData, sagaKey: id, rowData, changeViewPage, visible, CONFIG, isBuilderModal, changeBuilderModalState }) =>
  // const dateTypeView =
  //   CONFIG.property.dateFormat === 'DT' ? moment(colData, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD') : moment(colData, 'YYYY-MM-DD HH:mm:ss');
  // console.debug(dateTypeView);

  visible ? (
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
      {CONFIG.property.dataViewType === 'DATE' ? moment(colData).format(CONFIG.property.dateFormat === 'DT' ? 'YYYY-MM-DD' : 'YYYY-MM-DD HH:mm:ss') : colData}
    </span>
  ) : (
    ''
  );
TitleComp.propTypes = {
  // setViewPageData: PropTypes.func,
  CONFIG: PropTypes.object,
  colData: PropTypes.string,
  sagaKey: PropTypes.string,
  rowData: PropTypes.object,
  changeViewPage: PropTypes.func,
  isBuilderModal: PropTypes.bool,
  changeBuilderModalState: PropTypes.func,
  visible: PropTypes.bool,
};

TitleComp.defaultProps = {
  // setViewPageData: (a, b) => console.debug(a, b),
};

export default TitleComp;
