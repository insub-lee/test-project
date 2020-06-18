export const columnDefs = [
  {
    headerName: '번호',
    field: 'SERIAL_NO',
  },
  {
    headerName: '유해 · 위험물질',
    field: 'NAME_KOR',
    width: 160,
  },
  {
    headerName: 'CAS_NO',
    field: 'CAS_NO',
  },
  {
    headerName: '해당 여부',
    field: 'IS_APPLICATE,',
    filter: 'agTextColumnFilter',
    sortable: true,
  },
  {
    headerName: '기준함량',
    field: 'CONTENT_STANDARD',
    sortable: true,
  },
  {
    headerName: '규정량',
    field: 'CONTENT_DOSE',
    sortable: true,
  },
];
