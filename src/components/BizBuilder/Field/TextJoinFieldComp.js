import React from 'react';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

function TextJoinFieldComp(props) {
  const { CONFIG, formData, colData, rowData, isBuilderModal, changeBuilderModalState, changeViewPage, sagaKey: id, viewPageData } = props;
  const { textItems } = CONFIG.property;
  const { viewType } = viewPageData;
  let content = colData;
  if (textItems && textItems.length > 0) {
    if (viewType === 'LIST') {
      content = textItems.map(item => (item.type === 'field' ? `${rowData[item.text]}` : item.text)).join('');
    } else {
      content = textItems.map(item => (item.type === 'field' ? `${formData[item.text]}` : item.text)).join('');
    }
  }
  const { usingToolTip } = CONFIG.property;
  const bold =
    CONFIG.property.boldCondition && CONFIG.property.boldTarget && String(rowData[CONFIG.property.boldCondition]) === String(CONFIG.property.boldTarget)
      ? 'bold'
      : '';
  if (usingToolTip === 'Y') {
    return (
      <Tooltip placement="bottom" title={content} style={{ cursor: 'pointer' }}>
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
            style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', fontWeight: `${bold}`, cursor: 'pointer' }}
          >
            {content}
          </span>
        ) : (
          <span style={{ fontWeight: `${bold}` }}>{content}</span>
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
          style={{ textOverflow: 'ellipsis', overflow: 'hidden', width: '100px', whiteSpace: 'nowrap', fontWeight: `${bold}`, cursor: 'pointer' }}
        >
          {content}
        </span>
      ) : (
        <span style={{ fontWeight: `${bold}` }}>{content}</span>
      )}
    </>
  );
}

TextJoinFieldComp.defaultProps = {
  CONFIG: { info: {}, property: {}, option: {} },
  formData: {},
  colData: '',
};

TextJoinFieldComp.propTypes = {
  CONFIG: PropTypes.object,
  formData: PropTypes.object,
  rowData: PropTypes.object,
  colData: PropTypes.any,
  sagaKey: PropTypes.string,
  changeViewPage: PropTypes.func,
  changeBuilderModalState: PropTypes.func,
  isBuilderModal: PropTypes.bool,
  viewPageData: PropTypes.object,
  rowData: PropTypes.object,
};

export default TextJoinFieldComp;
