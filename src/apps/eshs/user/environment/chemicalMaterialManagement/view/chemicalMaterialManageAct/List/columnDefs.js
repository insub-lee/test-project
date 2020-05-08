export const columnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: 'CAS_NO',
        field: 'CAS_NO',
      },
      {
        headerName: '화학물질명_국문',
        field: 'NAME_KOR',
      },
      {
        headerName: '화학물질명_영문',
        field: 'NAME_ENG',
      },
      {
        headerName: '제한물질 NO.',
        field: 'RESTRICT_NO',
      },
      {
        headerName: '금지물질 NO.',
        field: 'PROHIBITION_NO',
      },
    ],
  },
  {
    headerName: '고유번호',
    children: [
      {
        headerName: '기존화학물질',
        field: 'EXISTING_MATERIAL',
      },
      {
        headerName: '유해화학물질',
        field: 'HARMFUL_MATERIAL',
      },
      {
        headerName: '중점관리물질',
        field: 'EMPHASIS_MATERIAL',
      },
      {
        headerName: '암, 돌연변이성 물질',
        field: 'CANCER_MATERIAL',
      },
      {
        headerName: '사고대비물질',
        field: 'ACCIDENT_MATERIAL',
      },
    ],
  },
  {
    headerName: '제한내용',
    field: 'RESTRICT_DETIAL',
  },
  {
    headerName: '함량정보',
    field: 'CONTENT_FACTOR',
  },
  {
    headerName: '비고',
    field: 'ETC',
  },
  {
    headerName: '수식',
    field: 'EXPRESSION',
  },
];
