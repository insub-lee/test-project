import { fromJS } from 'immutable';

// 임시데이터
const pmTypeCombo = fromJS([
  {
    key: '1', NAME: 'FAB PM(TBM)', CODE: 'F1',
  },
  {
    key: '2', NAME: 'FAB PM(CBM)', CODE: 'F2',
  },
  {
    key: '3', NAME: 'FAB PM(BM)', CODE: 'F3',
  },
  {
    key: '4', NAME: 'FAB PM(MODIFY)', CODE: 'F4',
  },
]);

const ET_LIST = fromJS([
  {
    key: '1',
    STRAT: 'F010',
    USLDT_U: '2019-02-26',
    PLAN_SORT: '24:00',
    MARK: '',
    PLNNR: 'F01293',
    PACKS2: '3M',
    TIDNR: 'CST111',
    PACKS1: '3M',
    LSLDT_U: '2017-09-04',
    PLNAL: '01',
    GSTRP_U: '0000-00-00',
    EQUNR: 'IM0000118690',
    WARPL: '100000017930',
    KTEXT: 'HD2300',
    MPTYP: '',
    PSTXT: 'CST111_HD2300',
  },
  {
    key: '2', NAME: 'FAB PM(CBM)', CODE: 'F2',
  },
  {
    key: '3', NAME: 'FAB PM(BM)', CODE: 'F3',
  },
  {
    key: '4', NAME: 'FAB PM(MODIFY)', CODE: 'F4',
  },
]);

const fakeData = {
  pmTypeCombo,
  ET_LIST,
};

export default fakeData;
