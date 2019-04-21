import { fromJS } from 'immutable';

// TASKID : TO-DO 항목 KEY
// TASKREQSTATUS : 요청상태
// TASKPROCSTATUS : 진행상태
// PRIVATETASKYN : 개인 할일 여부
// DELAY_YN : 지연 여부
// STARTDATE: 시작일
// DUEDATE : 완료요청일
// ENDDATE : 실제 종료일
// EXUSERID : 담당자 사번
// TASKNAME : 요청업무제목

// subject : 일정제목
// uid : 일정ID
// startTime: 시작일 시간
// endTime: 종료일 시간
// itemType: 반복일정구분(Single / RecurringMaster)
// importance: 중요도(High / Normal)
// isAllDayEvent: 종일일정여부(True/False)
// categories: 일정범주 카테고리
// attachments: 첨부문서

// 임시데이터
const tempScheduleList = fromJS([
  {
    subject: 'test 1',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 2',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 3',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 4',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 5',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 6',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 7',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 8',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 9',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 10',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 11',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 12',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
  {
    subject: 'test 13',
    uid: 'AAMkADJhODg0ZTUxLTQwNjUtNGU2OS1hNzU4LTM2ZmNlOGMzNTY5MQBGAAAAAADSq31AAVtjTaljwvJVFD53BwCWPyEpiDYmSIn3QqWONyOZAAAAAAEOAACWPyEpiDYmSIn3QqWONyOZAAD1MlUCAAA=',
    startTime: '2018-10-16 15:30:00',
    endTime: '2018-10-16 16:00:00',
    itemType: 'Single',
    isAllDayEvent: false,
  },
]);

const fakeData = {
  tempScheduleList,
};

export default fakeData;
