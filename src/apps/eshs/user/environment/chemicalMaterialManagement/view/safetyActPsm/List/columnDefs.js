export const columnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: '번호',
        field: 'SERIAL_NO',
      },
      {
        headerName: '유해 · 위험물질',
        field: 'NAME_KOR',
      },
      {
        headerName: 'CAS_NO',
        field: 'CAS_NO',
      },
      {
        headerName: '여부',
        field: 'IS_APPLICATE',
      },
    ],
  },
  {
    headerName: '규정량',
    children: [
      {
        headerName: '제조',
        field: 'PRODUCTION_STOCK',
        sortable: true,
      },
      {
        headerName: '취급',
        field: 'USAGE_STOCK',
        sortable: true,
      },
      {
        headerName: '저장',
        field: 'STORAGE_STOCK',
        sortable: true,
      },
    ],
  },
];
