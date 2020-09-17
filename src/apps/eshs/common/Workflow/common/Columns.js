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
    render: (text, record) => {
      let label = '';
      switch (record.REL_TYPE) {
        case 99:
          label = '폐기';
          break;
        case 999:
          label = '일괄폐기';
          break;
        default:
          label = text;
          break;
      }
      if (!label) label = record.REL_KEY;
      return label;
    },
  },
  {
    title: '제목',
    dataIndex: 'DRAFT_TITLE',
    key: 'title',
    ellipsis: true,
    render: (text, record) => (
      <StyledButton className="btn-link btn-sm" onClick={() => handleModal(true, [<SafetyWorkView workNo={record.REL_KEY2} isWorkFlow />])}>
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
    dataIndex: 'STATUS',
    key: 'STATUS',
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
