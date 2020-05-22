export const masterColumnDefs = [
  {
    headerName: '',
    children: [
      {
        headerName: 'SAP_NO',
        field: 'SAP_NO',
      },
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
        headerName: '화학물질명_SAP',
        field: 'NAME_SAP',
      },
      {
        headerName: '관용명 및 이명',
        field: 'NAME_ETC',
      },
      {
        headerName: '지역',
        field: 'SITE',
      },
      {
        headerName: '수입구분',
        field: 'IS_IMPORT',
      },
      {
        headerName: '공급업체',
        field: 'WRK_CMPNY_NM',
      },
      {
        headerName: 'MSDS 함량',
        field: 'CONTENT_EXP',
      },
      {
        headerName: '함량 %',
        field: 'CONTENT_DOSE',
      },
    ],
  },
  {
    headerName: 'MSDS 정보(제품기준)',
    children: [
      {
        headerName: '인화성가스 구분',
        field: 'IS_INFLAMMABILITY_GAS',
      },
      {
        headerName: '인화성 액체 구분',
        field: 'IS_INFLAMMABILITY_LIQUID',
      },
    ],
  },
  {
    headerName: '화학물질관리법',
    children: [
      {
        headerName: '유독물질',
        field: 'TOXIC_EXPRESSION',
      },
      {
        headerName: '사고대비물질',
        field: 'ACCIDENT_EXPRESSION',
      },
      {
        headerName: '허가물질',
        field: 'ALLOW_EXPRESSION',
      },
      {
        headerName: '제한물질',
        field: 'RESTRICT_CONTENT_FACTOR',
      },
      {
        headerName: '금지물질',
        field: 'BAN_CONTENT_FACTOR',
      },
      {
        headerName: 'PRTR 대상물질',
        field: 'IS_PRTR',
      },
    ],
  },
  {
    headerName: '화평법',
    children: [
      {
        headerName: 'CMR 등록 대상물질',
        field: 'IS_REGISRATION_ACT_APPLICATE',
      },
      {
        headerName: '수입화학물질여부',
        field: 'REGISTRATION_ACT_IS_IMPORT',
      },
    ],
  },
  {
    headerName: '위험물 안전관리법',
    children: [
      {
        headerName: '위험물(제품기준분류)',
        field: 'HARMFUL_CATEGORY',
      },
    ],
  },
  {
    headerName: '산업안전보건법',
    children: [
      {
        headerName: '노출기준설정물질(산안법 39조)',
        field: 'IS_EXPOSURE',
      },
      {
        headerName: '허용기준설정물질(산안법 39조2)',
        field: 'IS_PERMISSION',
      },
      {
        headerName: '허가대상물질(산안법 38조)',
        field: 'IS_ALLOW',
      },
      {
        headerName: '금지물질(산안법 117조)',
        field: 'IS_BAN',
      },
      {
        headerName: '작업환경측정물질(함량 1%이상)',
        field: 'IS_WORKSPACE_MATERIAL',
      },
      {
        headerName: '관리대상물질(보건기준 420조)',
        field: 'IS_MANAGED',
      },
      {
        headerName: '특별관리대상물질(보건기준 440조)',
        field: 'IS_SPE_MANAGED',
      },
      {
        headerName: '특수건강검진대상(산안법 201조)',
        field: 'IS_APPLICATE',
      },
      {
        headerName: 'PSM(PSM대상물질 51종)',
        field: 'IS_PSM',
      },
      {
        headerName: '도급승인대상물질',
        field: 'IS_CONTRACT',
      },
      {
        headerName: '발암성(C)',
        field: 'CARCINOGENICITY',
      },
      {
        headerName: '변이독성(M)',
        field: 'MUTAGENICITY',
      },
      {
        headerName: '생식독성(R)',
        field: 'REPRODUCTIVE_TOXICIT',
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
      },
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
        headerName: '화학물질명_SAP',
        field: 'NAME_SAP',
      },
      {
        headerName: '관용명 및 이명',
        field: 'NAME_ETC',
      },
      {
        headerName: '지역',
        field: 'SITE',
      },
      {
        headerName: '수입구분',
        field: 'IS_IMPORT',
      },
      {
        headerName: '공급업체',
        field: 'WRK_CMPNY_NM',
      },
      {
        headerName: 'MSDS 함량',
        field: 'CONTENT_EXP',
      },
      {
        headerName: '함량 %',
        field: 'CONTENT_DOSE',
      },
    ],
  },
  {
    headerName: 'MSDS 정보(제품기준)',
    children: [
      {
        headerName: '인화성가스 구분',
        field: 'IS_INFLAMMABILITY_GAS',
      },
      {
        headerName: '인화성 액체 구분',
        field: 'IS_INFLAMMABILITY_LIQUID',
      },
    ],
  },
  {
    headerName: '사용량',
    children: [
      {
        headerName: '2016년 - 제품',
        field: '2016_USAGE',
      },
      {
        headerName: '2016년 - 물질',
        field: '2016_USAGE_MATERIAL',
      },
      {
        headerName: '2017년 - 제품',
        field: '2017_USAGE',
      },
      {
        headerName: '2017년 - 물질',
        field: '2017_USAGE_MATERIAL',
      },
      {
        headerName: '2018년 - 제품',
        field: '2018_USAGE',
      },
      {
        headerName: '2018년 - 물질',
        field: '2018_USAGE_MATERIAL',
      },
      {
        headerName: '2019년 - 제품',
        field: '2019_USAGE',
      },
      {
        headerName: '2019년 - 물질',
        field: '2019_USAGE_MATERIAL',
      },
      {
        headerName: '2020년 - 제품',
        field: '2020_USAGE',
      },
      {
        headerName: '2020년 - 물질',
        field: '2020_USAGE_MATERIAL',
      },
    ],
  },
];
