import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

function JoinReadComp(props) {
  const { CONFIG, colData, formData, rowData, isBuilderModal, changeBuilderModalState, changeViewPage, sagaKey: id } = props;
  const content = (rowData && rowData[CONFIG.property.toolTipField]) || formData[CONFIG.property.viewDataKey] || colData || '';
  const toolTipContent = (rowData && rowData[CONFIG.property.toolTipField]) || formData[CONFIG.property.viewDataKey] || colData || '';
  const { usingToolTip } = CONFIG.property;
  const bold =
    CONFIG.property.boldCondition && CONFIG.property.boldTarget && String(rowData[CONFIG.property.boldCondition]) === String(CONFIG.property.boldTarget)
      ? 'bold'
      : '';
  if (usingToolTip === 'Y') {
    return (
      <Tooltip placement="bottom" title={toolTipContent} style={{ cursor: 'pointer' }}>
        {CONFIG.property.titleUse === 'Y' ? (
          <span
            role="button"
            tabIndex="0"
            onKeyPress={() => false}
            onClick={() =>
              isBuilderModal
                ? changeBuilderModalState(true, CONFIG.property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
                : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, CONFIG.property.changeViewType || 'VIEW')
            }
            className={CONFIG.property.className || ''}
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', fontWeight: `${bold}`, cursor: 'pointer' }}
          >
            {content}
          </span>
        ) : (
          <div style={{ fontWeight: `${bold}` }}>{content}</div>
        )}
      </Tooltip>
    );
  }
  return (
    <>
      {CONFIG.property.titleUse === 'Y' ? (
        <span
          role="button"
          tabIndex="0"
          onKeyPress={() => false}
          onClick={() =>
            isBuilderModal
              ? changeBuilderModalState(true, CONFIG.property.changeViewType || 'VIEW', rowData.WORK_SEQ, rowData.TASK_SEQ, rowData)
              : changeViewPage(id, rowData.WORK_SEQ, rowData.TASK_SEQ, CONFIG.property.changeViewType || 'VIEW')
          }
          className={CONFIG.property.className || ''}
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100%', whiteSpace: 'nowrap', fontWeight: `${bold}`, cursor: 'pointer' }}
        >
          {content}
        </span>
      ) : (
        <label style={{ fontWeight: `${bold}` }}>{content}</label>
      )}
    </>
  );
}

JoinReadComp.defaultProps = {
  CONFIG: { info: {}, property: {}, option: {} },
  formData: {},
  colData: '',
};

JoinReadComp.propTypes = {
  CONFIG: PropTypes.object,
  formData: PropTypes.object,
  rowData: PropTypes.object,
  colData: PropTypes.any,
  sagaKey: PropTypes.string,
  changeViewPage: PropTypes.func,
  changeBuilderModalState: PropTypes.func,
  isBuilderModal: PropTypes.bool,
};

export default JoinReadComp;
