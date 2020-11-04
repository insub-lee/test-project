export const formJson = [
  { type: 'text', option: { label: '제목', name: 'title', placeholder: '제목을 입력해주세요.', value: '', required: true }, seq: 0 },
  { type: 'richTextEditor', option: { label: '내용', name: 'textarea', value: '', required: true }, seq: 1 },
  { type: 'password', option: { label: '비밀번호', name: 'pwd', placeholder: '비밀번호를 입력해주세요.', value: '', required: true }, seq: 2 },
  // { type: 'uploader', option: { label: '파일첨부', name: 'uploader-attach' }, seq: 3 },
];
