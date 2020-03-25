/*
  코드 구분
    HC: Harmful material Classification (위험물 분류)
    WH: Workplace environment Harmful factor (작업환경측정 대상 유해인자)
    MH: Managed Harmful material (관리대상 유해물질)
    HH: special Health diagnosis Harmful factor (특수건강진단 대상 유해인자)

    - C: Chemical factor (화학적 인자)
    - P: Physical factor (물리적 인자)
    - D: Dust (분진)

    - O: Organic compounds (유기화합물)
    - M: Metals (금속류)
    - A: Acid and alkali (산 및 알칼리류)
    - G: Gas (가스 상태 물질류)
    - P: Premissioned harmful material (허가 대상 유해물질)
    - F: metal working Fluids (금속가공유)
*/

const selectTree = [
  {
    title: '위험물 분류',
    value: 'HC',
    key: 'HC',
  },
  {
    title: '작업환경측정 대상 유해인자',
    value: 'WH',
    key: 'WH',
    children: [
      {
        title: '화학적 인자',
        value: 'WHC',
        key: 'WHC',
        children: [
          {
            title: '유기화합물',
            value: 'WHCO',
            key: 'WHCO',
          },
          {
            title: '금속류',
            value: 'WHCM',
            key: 'WHCM',
          },
          {
            title: '산 및 알칼리류',
            value: 'WHCA',
            key: 'WHCA',
          },
          {
            title: '가스 상태 물질류',
            value: 'WHCG',
            key: 'WHCG',
          },
          {
            title: '영 제 30조에 따른 허가 대상 유해물질',
            value: 'WHCP',
            key: 'WHCP',
          },
          {
            title: '금속가공유',
            value: 'WHCF',
            key: 'WHCF',
          },
        ],
      },
      {
        title: '물리적 인자',
        value: 'WHP',
        key: 'WHP',
        children: [
          {
            title: '8시간 시간 가중 평균 80db 이상의 소음',
            value: 'WHPN',
            key: 'WHPN',
          },
          {
            title: '안전보건규칙 제 3편 제 6장에 따른 고열',
            value: 'WHPH',
            key: 'WHPH',
          },
        ],
      },
      {
        title: '분진',
        value: 'WHD',
        key: 'WHD',
        children: [
          {
            title: '광물성 분진',
            value: 'WHDM',
            key: 'WHDM',
          },
        ],
      },
    ],
  },
  {
    title: '관리대상 유해물질',
    value: 'MH',
    key: 'MH',
    children: [
      {
        title: '유기화합물',
        value: 'MHO',
        key: 'MHO',
      },
      {
        title: '금속류',
        value: 'MHM',
        key: 'MHM',
      },
      {
        title: '산 및 알칼리류',
        value: 'MHA',
        key: 'MHA',
      },
      {
        title: '가스 상태 물질류',
        value: 'MHG',
        key: 'MHG',
      },
    ],
  },
  {
    title: '특수건강진단 대상 유해인자',
    value: 'HH',
    key: 'HH',
    children: [
      {
        title: '유기화합물',
        value: 'HHO',
        key: 'HHO',
      },
      {
        title: '금속류',
        value: 'HHM',
        key: 'HHM',
      },
      {
        title: '산 및 알칼리류',
        value: 'HHA',
        key: 'HHA',
      },
      {
        title: '가스 상태 물질류',
        value: 'HHG',
        key: 'HHG',
      },
      {
        title: '영 제 30조에 따른 허가 대상 유해물질',
        value: 'HHP',
        key: 'HHP',
      },
    ],
  },
];

export default selectTree;
