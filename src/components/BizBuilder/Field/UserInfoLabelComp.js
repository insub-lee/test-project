import React, { useEffect, useState } from 'react';
import request from 'utils/request';
import { Tooltip } from 'antd';
import PropTypes from 'prop-types';

function TextJoinFieldComp(props) {
  const { CONFIG, colData, rowData, isBuilderModal, changeBuilderModalState, changeViewPage, sagaKey: id } = props;
  const { useEmpNo, usePosition, useDept } = CONFIG.property;
  const [userName, setUserName] = useState('');
  const [empNo, setEmpNo] = useState('');
  const [position, setPosition] = useState('');
  const [dept, setDept] = useState('');

  useEffect(() => {
    request({
      method: 'GET',
      url: `/api/common/v1/account/userDetail/${colData}`,
    }).then(({ response }) => {
      if (response?.data) {
        const { data } = response;
        setUserName(data.NAME_KOR);
        setEmpNo(data.EMP_NO);
        setPosition(data.PSTN_NAME_KOR);
        setDept(data.DEPT_NAME_KOR);
      }
    });
  }, [colData]);

  let content = `${userName}`;

  if (useEmpNo || usePosition || useDept) {
    content += ' (';
    const item = [
      { key: 'empNo', value: useEmpNo },
      { key: 'position', value: usePosition },
      { key: 'dept', value: useDept },
    ];
    item.forEach(info => {
      const { key, value } = info;
      switch (key) {
        case 'empNo':
          if (value) content += empNo;
          break;
        case 'position':
          if (item[0].value) content += ', ';
          if (value) content += position;
          break;
        case 'dept':
          if (item[0].value || item[1].value) content += ', ';
          if (value) content += dept;
          break;
        default:
          break;
      }
    });
    content += ')';
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
