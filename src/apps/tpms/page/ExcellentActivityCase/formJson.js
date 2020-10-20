import moment from 'moment';

const curYear = Number(moment().format('YYYY'));
const endYear = 2018;
const yearCategory = [];
for (let i = curYear; i >= endYear; i -= 1) {
  yearCategory.push({ id: '', seq: i, label: `${i}`, value: `${i}`, checked: i === curYear });
}

export const formJson = [
  { type: 'text', option: { label: '제목', name: 'title', placeholder: '제목을 입력하세요.', value: '', required: true }, seq: 0 },
  {
    type: 'select',
    option: {
      label: '년도',
      name: 'year',
      values: yearCategory,
    },
    seq: 1,
  },
  { type: 'richTextEditor', option: { label: '내용', name: 'textarea-1542189210177', placeholder: '내용을 입력하세요.', value: '', required: true }, seq: 2 },
  { type: 'password', option: { label: '비밀번호', name: 'pwd', placeholder: '비밀번호를 입력해주세요.', value: '', required: true }, seq: 3 },
  { type: 'uploader', option: { label: '파일첨부', name: 'uploader-attach' }, seq: 4 },
];
