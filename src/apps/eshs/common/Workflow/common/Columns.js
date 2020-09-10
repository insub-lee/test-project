import moment from 'moment';
import React from 'react';

import StyledButton from 'components/BizBuilder/styled/Buttons/StyledButton';

/* view  --start--*/
import SafetyWorkView from 'apps/eshs/user/safety/safetyWork/safetyWorkAccept'; // 안전작업허가 view

/* view  --end--*/

export const columns = handleModal => [
  {
    title: '종류',
    dataIndex: 'APPVGUBUN',
    key: 'APPVGUBUN',
    width: '15%',
    align: 'center',
    render: (text, record) => (record.REL_TYPE === 99 ? '폐기' : record.REL_TYPE === 999 ? '일괄폐기' : text),
  },
  {
    title: '제목',
    dataIndex: 'DRAFT_TITLE',
    key: 'title',
    ellipsis: true,
    render: (text, record) => (
      <StyledButton className="btn-link btn-sm" onClick={() => handleModal(true, [<SafetyWorkView workNo={record.REL_KEY2} />])}>
        {text}
      </StyledButton>
    ),
  },
  {
    title: '기안일',
    dataIndex: 'REG_DTTM',
    key: 'regDttm',
    width: '8%',
    align: 'center',
    render: (text, record) => moment(text).format('YYYY-MM-DD'),
  },
  {
    title: '상태',
    dataIndex: 'STATUS_NM',
    key: 'STATUS_NM',
    width: '8%',
    align: 'center',
  },
  {
    title: '기안자',
    dataIndex: 'NAME_KOR',
    key: 'NAME_KOR',
    width: '10%',
    align: 'center',
  },
];
