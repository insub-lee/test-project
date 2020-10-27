export default [
  {
    type: 'date-picker',
    classname: 'report_form flCustom width50',
    option: {
      label: '등록기간',
      values: [
        { name: 'startDate', value: '' },
        { name: 'endDate', value: '' },
      ],
    },
    seq: 0,
  },
  {
    type: 'date-picker',
    classname: 'report_form frCustom marginNone width50',
    option: {
      label: '기준일자',
      values: [{ name: 'startDate', value: '' }],
    },
    seq: 1,
  },
  {
    type: 'select',
    classname: 'report_form',
    option: {
      label: '본부',
      name: 'headQuarts',
      values: [{ label: 'Level 1', value: 'Level 1' }],
    },
    seq: 2,
  },
  {
    type: 'radio-group',
    classname: 'flCustom width50',
    option: {
      label: 'Project Type',
      name: 'projectType',
      values: [
        { label: '전체', value: '', checked: true },
        { label: '개별개선', value: 'G' },
        { label: 'TFT', value: 'T' },
        { label: 'Wafer Loss', value: 'W' },
      ],
    },
    seq: 3,
  },
  {
    type: 'checkbox-group',
    classname: 'frCustom marginNone width50',
    option: {
      label: 'Project Level',
      name: 'projectLevel',
      values: [
        { label: '본부', value: '1', checked: false },
        { label: '담당', value: '2' },
        { label: '팀', value: '3' },
        { label: 'Part', value: '4' },
      ],
    },
    seq: 4,
  },
];
