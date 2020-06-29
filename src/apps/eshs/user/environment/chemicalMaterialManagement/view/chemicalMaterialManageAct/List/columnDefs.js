export const columnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: 'CAS_NO',
        field: 'CAS_NO',
        sortable: true,
      },
      {
        headerName: '화학물질명_국문',
        field: 'NAME_KOR',
        sortable: true,
      },
      {
        headerName: '화학물질명_영문',
        field: 'NAME_ENG',
        sortable: true,
      },
      {
        headerName: '제한물질 NO.',
        field: 'RESTRICT_NO',
        sortable: true,
      },
      {
        headerName: '금지물질 NO.',
        field: 'PROHIBITION_NO',
        sortable: true,
      },
    ],
  },
  {
    headerName: '고유번호',
    children: [
      {
        headerName: '기존화학물질',
        field: 'EXISTING_MATERIAL',
        sortable: true,
      },
      {
        headerName: '유해화학물질',
        field: 'HARMFUL_MATERIAL',
        sortable: true,
      },
      {
        headerName: '중점관리물질',
        field: 'EMPHASIS_MATERIAL',
        sortable: true,
      },
      {
        headerName: '암, 돌연변이성 물질',
        field: 'CANCER_MATERIAL',
        sortable: true,
      },
      {
        headerName: '사고대비물질',
        field: 'ACCIDENT_MATERIAL',
        sortable: true,
      },
    ],
  },
  {
    headerName: '제한내용',
    field: 'RESTRICT_DETIAL',
    sortable: true,
  },
  {
    headerName: '함량정보',
    field: 'CONTENT_FACTOR',
    sortable: true,
  },
  {
    headerName: '비고',
    field: 'ETC',
    sortable: true,
  },
  {
    headerName: '수식',
    field: 'EXPRESSION',
    sortable: true,
  },
];
