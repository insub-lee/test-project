import { fromJS } from 'immutable';

// 임시데이터
const fakeDataList1 = fromJS([
  {
    key: '1',
    question: '구성원 상호간 업무를 요청할 수 있습니다.',
    answer:
      '관련 내용글이 입력됩니다. 한줄로 입력되고 클릭하면 팝업창이 뜨고 해당 상세내용을 확인하실수 있습니다. 관련 내용글 여기까지 입을 하게 되면 말줄임으로 변경됩니다.',
    state: 0,
  },
  {
    key: '2',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '3',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '4',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '5',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
]);

const fakeDataList2 = fromJS([
  {
    key: '1',
    questionTitle: '[질문] 기안하였는데 결재건이 안보이면 어떻게 하나요?',
    questionContent: '기안한 내용을 어디서 찾아봐야 할지 모르겠습니다. 기안한 내용을 어디서 찾아봐야 할지 모르겠습니다.',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer:
      '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력되고 클릭하면 팝업창이 뜨고 해야 합니다. 글이 길면 글줄임 표시가 되어야 합니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '2',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
]);

const fakeDataList3 = fromJS([
  {
    key: '1',
    questionTitle: '[질문] 기안하였는데 결재건이 안보이면 어떻게 하나요?',
    questionContent: '기안한 내용을 어디서 찾아봐야 할지 모르겠습니다. 기안한 내용을 어디서 찾아봐야 할지 모르겠습니다.',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer:
      '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력되고 클릭하면 팝업창이 뜨고 해야 합니다. 글이 길면 글줄임 표시가 되어야 합니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '2',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
]);

const fakeDataList4 = fromJS([
  {
    key: '1',
    questionTitle: '[질문] 기안하였는데 결재건이 안보이면 어떻게 하나요?',
    questionContent: '기안한 내용을 어디서 찾아봐야 할지 모르겠습니다. 기안한 내용을 어디서 찾아봐야 할지 모르겠습니다.',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer:
      '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력되고 클릭하면 팝업창이 뜨고 해야 합니다. 글이 길면 글줄임 표시가 되어야 합니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '2',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '3',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '4',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
]);

const fakeDataList5 = fromJS([
  {
    key: '1',
    questionTitle: '[질문] 기안하였는데 결재건이 안보이면 어떻게 하나요?',
    questionContent: '기안한 내용을 어디서 찾아봐야 할지 모르겠습니다. 기안한 내용을 어디서 찾아봐야 할지 모르겠습니다.',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer:
      '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력되고 클릭하면 팝업창이 뜨고 해야 합니다. 글이 길면 글줄임 표시가 되어야 합니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '2',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '3',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '4',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
  {
    key: '5',
    questionTitle: '[오류] 결재의견 입력하고 승인하였는데 오류가 납니다.',
    questionContent:
      '결재처리가 제대로 되고 있지 않아 업무진행에 어려움이 있습니다. 결재 처리가 제대로 되고 있지 않아 업무진행에 어려움이 많습니다. 어떻게 하면 될까요?',
    questionMemNum: '2012345',
    questionMember: '김석찬 (2012345) / DRAM사업개발 TF / 선임',
    questionDate: '2018.07.27',
    answer: '[답변] 안녕하세요. IT운영지원 성종각 입니다. 이용에 불편드려 죄송합니다. 관련 답변글이 한줄로 입력됩니다.',
    answerMemNum: '2012345',
    answerMember: '성종각 (2012345) / DRAM Advanced PI / 사원',
    state: 0,
  },
]);

const fakeDataList6 = fromJS([
  {
    key: '1',
    question: '구성원 상호간 업무를 요청할 수 있습니다.',
    answer:
      '관련 내용글이 입력됩니다. 한줄로 입력되고 클릭하면 팝업창이 뜨고 해당 상세내용을 확인하실수 있습니다. 관련 내용글 여기까지 입을 하게 되면 말줄임으로 변경됩니다.',
    state: 0,
  },
  {
    key: '2',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '3',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '4',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '5',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '6',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
  {
    key: '7',
    question: '기안하였는데 결재건이 안보이면 어떻게 하나요?',
    answer: '관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다. 관련 답변글이 한줄로 입력됩니다.',
    state: 0,
  },
]);

const fakeData = {
  fakeDataList1,
  fakeDataList2,
  fakeDataList3,
  fakeDataList4,
  fakeDataList5,
  fakeDataList6,
};

export default fakeData;
