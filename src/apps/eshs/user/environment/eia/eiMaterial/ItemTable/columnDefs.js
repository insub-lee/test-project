export const materialItemColumnDefs = [
  {
    title: '구분',
    field: 'GUBUN',
    filter: 'agTextColumnFilter',
  },
  {
    title: '영향구분(정상/비정상)',
    field: 'STATUS',
    filter: 'agTextColumnFilter',
    width: { wpx: 150 },
  },
  {
    title: '물질명',
    field: 'MATTER',
    filter: 'agTextColumnFilter',
    width: { wpx: 150 },
  },
  {
    title: '구성성분',
    field: 'INGREDIENT',
    filter: 'agTextColumnFilter',
    width: { wpx: 400 },
  },
  {
    title: '사용량',
    field: 'VOLUME',
    filter: 'agTextColumnFilter',
  },
  {
    title: '단위',
    field: 'UNIT',
    filter: 'agTextColumnFilter',
  },
  {
    title: '투입형태',
    field: 'INPUT_TYPE',
    filter: 'agTextColumnFilter',
  },
  {
    title: '배출형태',
    field: 'OUTPUT_TYPE',
    filter: 'agTextColumnFilter',
  },
  {
    title: '배출처',
    width: { wpx: 150 },
    field: 'DISCHRGE',
    filter: 'agTextColumnFilter',
  },
];
