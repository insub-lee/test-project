import { fromJS } from 'immutable';

// 구분: TBL_StockInfo
// CurJuka : 현재주가
// Dabi : 등락금액
// PrevJuka : 전일종가
// DungRakPer : 등락율
// Volume: 거래량

// 구분 : stockInfo
// myJangGubun : 장구분(장중, 장마감)
// myNowTime : 현재시간

// 구분 : TBL_DailyStock{DailyStock} 리스트
// day_Date : 일자
// day_EndPrice : 종가
// day_Volume : 거래량

// 임시데이터
const tempStockList = fromJS([
  {
    CurJuka : '76,600',
    Dabi: '2,500',
    DungRakPer: '',
    PrevJuka : '79,100',
    Volume: '3,630,660',
    myJangGubun:'장중',
    myNowTime: '2018/09/21 13:14:15',
    day_Date : '18/09/21',
    day_EndPrice :'76,600',
    day_Volume : '3,630,660',
  },
  {
    CurJuka : '76,600',
    Dabi: '2,500',
    DungRakPer: '',
    PrevJuka : '79,100',
    Volume: '3,607,775',
    myJangGubun:'장중',
    myNowTime: '2018/09/21 13:14:15',
    day_Date : '18/09/20',
    day_EndPrice :'79,100',
    day_Volume : '3,392,490',
  },
  {
    CurJuka : '76,600',
    Dabi: '2,500',
    DungRakPer: '',
    PrevJuka : '79,100',
    Volume: '3,607,775',
    myJangGubun:'장중',
    myNowTime: '2018/09/21 13:14:15',
    day_Date : '18/09/19',
    day_EndPrice :'78,800',
    day_Volume : '2,912,259',
  },
  {
    CurJuka : '76,600',
    Dabi: '2,500',
    DungRakPer: '',
    PrevJuka : '79,100',
    Volume: '3,607,775',
    myJangGubun:'장중',
    myNowTime: '2018/09/21 13:14:15',
    day_Date : '18/09/18',
    day_EndPrice :'78,000',
    day_Volume : '2,450,163',
  },
]);

const fakeData = {
  tempStockList,
};

export default fakeData;
