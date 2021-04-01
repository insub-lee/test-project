export const columns = [
  {
    title: '연도',
    align: 'center',
    dataIndex: 'DE_YEAR',
  },
  {
    title: '작업정보',
    align: 'center',
    children: [
      {
        title: '분류',
        className: 'th-form',
        dataIndex: 'SELECTED1_NM',
        align: 'center',
      },
      {
        title: '부서',
        className: 'th-form',
        dataIndex: 'SELECTED2_NM',
        align: 'center',
      },
      {
        title: '공정(장소)',
        className: 'th-form',
        dataIndex: 'SELECTED3_NM',
        align: 'center',
      },
    ],
  },
  {
    title: '참여자정보',
    align: 'center',
    children: [
      {
        title: '사번',
        className: 'th-form',
        dataIndex: 'EMP_NO',
        align: 'center',
      },
      {
        title: '성명',
        className: 'th-form',
        dataIndex: 'EMP_NM',
        align: 'center',
      },
      {
        title: '직위',
        className: 'th-form',
        dataIndex: 'JIKWI',
        align: 'center',
      },
    ],
  },
];

export const userColumns = [
  {
    title: '사번',
    align: 'center',
    dataIndex: 'EMP_NO',
    width: '15%',
  },
  {
    title: '이름',
    align: 'center',
    dataIndex: 'EMP_NM',
    width: '15%',
  },
  {
    title: '직위',
    align: 'center',
    dataIndex: 'JIKWI',
    width: '10%',
  },
  {
    title: '부서명',
    align: 'center',
    dataIndex: 'DEPT_NM',
    width: '25%',
  },
  {
    title: '연락처',
    align: 'center',
    dataIndex: 'TEL_NO',
    width: '35%',
  },
];
