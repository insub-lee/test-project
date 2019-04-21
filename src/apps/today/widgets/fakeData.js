import { fromJS } from 'immutable';

// TASKID : (할일ID) TODO 항목 KEY
// PROGRESS : 진행률(0 ~ '100'%)
// TASKPROCSTATUS : 진행상태(0: 시작안함 1: 진행 2:완료)
// TASKREQSTATUS : 요청상태(0:미수락  1:거절 2:수락)
// PRIVATETASKYN : 개인 할일 여부
// DELAY_YN : 지연 여부(없음)
// STARTDATE: 시작일
// DUEDATE : 완료요청일
// ENDDATE : 실제 종료일
// EXUSERID : 담당자 사번
// TASKNAME : 요청업무제목

// 임시데이터
const tempTodayList = fromJS([
  {
    TASKID : '1',
    PROGRESS: 10,
    PRIVATETASKYN : 'Y',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'1',
    TASKREQSTATUS : '2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-13',
    TASKNAME : ' ㄱㄱㄹ ',
  },
  {
    TASKID : '2',
    PROGRESS: '100',
    PRIVATETASKYN : 'N',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    TASKREQSTATUS: '2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-14',
    TASKNAME : 'SmartPim 연동 테스트2(R&D Portal)',
  },
  {
    TASKID : '3',
    PROGRESS: '100',
    PRIVATETASKYN : 'N',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    TASKREQSTATUS: '2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-15',
    TASKNAME : 'SmartPim 연동 테스트1(Smart PiM)',
  },
  {
    TASKID : '4',
    PROGRESS: 0,
    PRIVATETASKYN : 'N',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'0',
    TASKREQSTATUS: '1',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-16',
    TASKNAME : 'SmartPim 연동 테스트3(HyWIN)',
  },
  {
    TASKID : '5',
    PROGRESS: '100',
    PRIVATETASKYN : 'N',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    TASKREQSTATUS: '2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-17',
    TASKNAME : 'SmartPim 연동 테스트4(일반 할일)',
  },
  {
    TASKID : '6',
    PRIVATETASKYN : 'Y',
    PROGRESS: '100',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    TASKREQSTATUS: '2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-18',
    TASKNAME : ' LEGACYSYSCONTROLYN ',
  },
  {
    TASKID : '7',
    TASKREQSTATUS : '2',
    PRIVATETASKYN : 'N',
    PROGRESS: '100',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-21',
    TASKNAME : '4/4일 수요일 5층 대회의실에서 변경관리 프로세스 설명회 참가',
  },
  {
    TASKID : '12',
    TASKREQSTATUS : '2',
    PROGRESS: '100',
    PRIVATETASKYN : 'Y',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-29',
    TASKNAME : '테스트5',
  },
  {
    TASKID : '13',
    TASKREQSTATUS : '2',
    PROGRESS: '100',
    PRIVATETASKYN : 'Y',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'2',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-08-30',
    TASKNAME : '테스트6',
  },
  {
    TASKID : '14',
    TASKREQSTATUS : '2',
    PROGRESS: '0',
    PRIVATETASKYN : 'Y',
    STARTDATE:'2018-10-16',
    EXUSERID : 'X0107644',
    TASKPROCSTATUS :'0',
    DUEDATE : '2018-10-16',
    DELAY_YN :'Y',
    ENDDATE : '2018-09-01',
    TASKNAME : '테스트7',
  },
]);

const fakeData = {
  tempTodayList,
};

export default fakeData;
