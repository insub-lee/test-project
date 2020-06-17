export const masterColumnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: 'SAP_NO',
        field: 'SAP_NO',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'CAS_NO',
        field: 'CAS_NO',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '화학물질명_국문',
        field: 'NAME_KOR',
        filter: 'agTextColumnFilter',
        width: 125,
      },
      {
        headerName: '화학물질명_영문',
        field: 'NAME_ENG',
        filter: 'agTextColumnFilter',
        width: 125,
      },
      {
        headerName: '화학물질명_SAP',
        field: 'NAME_SAP',
        filter: 'agTextColumnFilter',
        width: 125,
      },
      {
        headerName: '관용명 및 이명',
        field: 'NAME_ETC',
        filter: 'agTextColumnFilter',
        width: 125,
      },
      {
        headerName: '지역',
        field: 'SITE',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '수입구분',
        field: 'IS_IMPORT',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '공급업체',
        field: 'WRK_CMPNY_NM',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'MSDS 함량',
        field: 'CONTENT_EXP',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '함량 %',
        field: 'CONTENT_DOSE',
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    headerName: 'MSDS 정보(제품기준)',
    children: [
      {
        headerName: '인화성가스 구분',
        field: 'IS_INFLAMMABILITY_GAS',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '인화성 액체 구분',
        field: 'IS_INFLAMMABILITY_LIQUID',
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    headerName: '화학물질관리법',
    children: [
      {
        headerName: '유독물질',
        field: 'TOXIC_EXPRESSION',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '사고대비물질',
        field: 'ACCIDENT_EXPRESSION',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '허가물질',
        field: 'ALLOW_EXPRESSION',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '제한물질',
        field: 'RESTRICT_CONTENT_FACTOR',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '금지물질',
        field: 'BAN_CONTENT_FACTOR',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: 'PRTR 대상물질',
        field: 'IS_PRTR',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
    ],
  },
  {
    headerName: '화평법',
    children: [
      {
        headerName: 'CMR 등록 대상물질',
        field: 'IS_REGISRATION_ACT_APPLICATE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '수입화학물질여부',
        field: 'REGISTRATION_ACT_IS_IMPORT',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
    ],
  },
  {
    headerName: '위험물 안전관리법',
    children: [
      {
        headerName: '위험물(제품기준분류)',
        field: 'HARMFUL_CATEGORY',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
    ],
  },
  {
    headerName: '산업안전보건법',
    children: [
      {
        headerName: '노출기준설정물질(산안법 39조)',
        field: 'IS_EXPOSURE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '허용기준설정물질(산안법 39조2)',
        field: 'IS_PERMISSION',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '허가대상물질(산안법 38조)',
        field: 'IS_ALLOW',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '금지물질(산안법 117조)',
        field: 'IS_BAN',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '작업환경측정물질(함량 1%이상)',
        field: 'IS_WORKSPACE_MATERIAL',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '관리대상물질(보건기준 420조)',
        field: 'IS_MANAGED',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '특별관리대상물질(보건기준 440조)',
        field: 'IS_SPE_MANAGED',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '특수건강검진대상(산안법 201조)',
        field: 'IS_APPLICATE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: 'PSM(PSM대상물질 51종)',
        field: 'IS_PSM',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '도급승인대상물질',
        field: 'IS_CONTRACT',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '발암성(C)',
        field: 'CARCINOGENICITY',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '변이독성(M)',
        field: 'MUTAGENICITY',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '생식독성(R)',
        field: 'REPRODUCTIVE_TOXICIT',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
    ],
  },
];

export const sapUsageColumn = [
  {
    headerName: '',
    children: [
      {
        headerName: 'SAP_NO',
        field: 'SAP_NO',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: 'CAS_NO',
        field: 'CAS_NO',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '화학물질명_국문',
        field: 'NAME_KOR',
        filter: 'agTextColumnFilter',
        width: 140,
      },
      {
        headerName: '화학물질명_SAP',
        field: 'NAME_SAP',
        filter: 'agTextColumnFilter',
        width: 140,
      },
      {
        headerName: '지역',
        field: 'SITE',
        filter: 'agTextColumnFilter',
      },
      {
        headerName: '환산계수',
        field: 'CONVERT_COEFFICIENT',
        filter: 'agTextColumnFilter',
      },
    ],
  },
  {
    headerName: '사용량',
    children: [
      {
        headerName: '2018년',
        field: '2018_USAGE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '2019년',
        field: '2019_USAGE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
      {
        headerName: '2020년',
        field: '2020_USAGE',
        filter: 'agTextColumnFilter',
        sortable: true,
      },
    ],
  },
];
