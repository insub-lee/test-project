export const columnDefs = [
  {
    headerName: 'NO',
    field: 'SERIAL_NO',
  },
  {
    headerName: '물질명',
    field: 'NAME_KOR',
  },
  {
    headerName: 'CAS_NO',
    field: 'CAS_NO',
  },
  {
    headerName: '금지물질',
    field: 'IS_BAN',
    filter: 'agTextColumnFilter',
    sortable: true,
  },
];
