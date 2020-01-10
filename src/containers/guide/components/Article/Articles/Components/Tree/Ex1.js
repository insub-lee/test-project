import React, { Component } from 'react';
import Tree from 'components/Tree';
import * as treeFunc from 'containers/common/functions/treeFunc';
import fakeData from './fakeData';

class App extends Component {
  constructor(prop) {
    super(prop);
    const fakeAppListData = fakeData.appList.toJS(); // 임시 데이터. 해당 데이터 형식으로 데이터를 내려줌.
    const appList = treeFunc.setFlatDataKey(fakeAppListData, 'CATG_ID'); // 'CATG_ID'컬럼을 리스트의 KEY로 지정
    const treeData = treeFunc.getTreeFromFlatTreeData(appList, 1); // 리스트를 트리 형태로 변환

    this.state = {
      treeData,
      selectedIndex: -1,
    };
  }

  render() {
    const { treeData, selectedIndex } = this.state;

    const handleOnClick = node => {
      // node - 선택한 트리 노드의 데이터 object
      this.setState({
        selectedIndex: node.key,
      });
    };

    return (
      <Tree
        treeData={treeData} // 트리데이터
        handleOnClick={handleOnClick} // onClick 이벤트
        selectedIndex={selectedIndex} // 선택한 트리노드 KEY
        canDrag={() => true}
        canDrop={() => true}
      />
    );
  }
}
const code = `import React, { Component } from 'react';
import Tree from 'components/Tree';
import * as treeFunc from 'containers/common/functions/treeFunc';
import fakeData from './fakeData';

class App extends Component {
  constructor(prop) {
    super(prop);
    const fakeAppListData = fakeData.appList.toJS(); // 임시 데이터. 해당 데이터 형식으로 데이터를 내려줌.
    const appList = treeFunc.setFlatDataKey(fakeAppListData, 'CATG_ID'); // 'CATG_ID'컬럼을 리스트의 KEY로 지정
    const treeData = treeFunc.getTreeFromFlatTreeData(appList, 1); // 리스트를 트리 형태로 변환

    this.state = {
      treeData,
      selectedIndex: -1,
    };
  }

  render() {
    const {
      treeData,
      selectedIndex,
    } = this.state;

    const handleOnClick = (node) => {
      // node - 선택한 트리 노드의 데이터 object
      this.setState({
        selectedIndex: node.key,
      });
    };

    return (
      <Tree
        treeData={treeData} // 트리데이터
        handleOnClick={handleOnClick} // onClick 이벤트
        selectedIndex={selectedIndex} // 선택한 트리노드 KEY
      />
    );
  }
}

const appList = fromJS([
  {
    RNUM: 1,
    CATG_ID: 1,
    NAME_KOR: 'App 카테고리',
    NAME_ENG: 'App Category',
    NAME_CHN: 'App Category',
    NAME_JPN: 'App Category',
    NAME_ETC: 'App Category',
    NODE_TYPE: 'R',
    LVL: 0,
    PRNT_ID: -1,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 2,
    CATG_ID: 4,
    NAME_KOR: '구매',
    NAME_ENG: 'Purchase',
    NAME_CHN: 'Purchase',
    NAME_JPN: '購入',
    NAME_ETC: 'Purchase',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 3,
    CATG_ID: 2,
    NAME_KOR: '공통',
    NAME_ENG: 'Common',
    NAME_CHN: 'Common',
    NAME_JPN: 'Common',
    NAME_ETC: 'Common',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 4,
    CATG_ID: 6,
    NAME_KOR: '경영정보',
    NAME_ENG: '@경영정보',
    NAME_CHN: '@@경영정보',
    NAME_JPN: '@경영정보',
    NAME_ETC: '@경영정보',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 2,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 5,
    CATG_ID: 7,
    NAME_KOR: '공통업무2',
    NAME_ENG: '@공통업무2',
    NAME_CHN: '@@공통업무2',
    NAME_JPN: '@@@공통업무2',
    NAME_ETC: '공통업무2',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 2,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 6,
    CATG_ID: 226,
    NAME_KOR: '공통업무3',
    NAME_ENG: '공통업무3',
    NAME_CHN: '공통업무3',
    NAME_JPN: '공통업무3',
    NAME_ETC: '공통업무3',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 2,
    SORT_SQ: 3,
    SITE_ID: 1,
  },
  {
    RNUM: 7,
    CATG_ID: 246,
    NAME_KOR: '공통업무41',
    NAME_ENG: '공통업무4',
    NAME_CHN: '공통업무4',
    NAME_JPN: '공통업무4',
    NAME_ETC: '공통업무4',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 2,
    SORT_SQ: 4,
    SITE_ID: 1,
  },
  {
    RNUM: 8,
    CATG_ID: 3,
    NAME_KOR: '제조',
    NAME_ENG: 'Manufacture',
    NAME_CHN: '制造',
    NAME_JPN: '製造',
    NAME_ETC: 'Manufacture',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 3,
    SITE_ID: 1,
  },
  {
    RNUM: 9,
    CATG_ID: 5,
    NAME_KOR: '연구개발',
    NAME_ENG: 'RnD',
    NAME_CHN: 'RnD',
    NAME_JPN: 'RnD',
    NAME_ETC: 'RnD',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 4,
    SITE_ID: 1,
  },
  {
    RNUM: 10,
    CATG_ID: 87,
    NAME_KOR: '연구1-1',
    NAME_ENG: '@연구1-1',
    NAME_CHN: '@@연구1-1',
    NAME_JPN: '@연구1-1',
    NAME_ETC: '@연구1-1',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 5,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 11,
    CATG_ID: 626,
    NAME_KOR: '연구22',
    NAME_ENG: '연구22',
    NAME_CHN: '연구22',
    NAME_JPN: '연구22',
    NAME_ETC: '연구22',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 5,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 12,
    CATG_ID: 126,
    NAME_KOR: 'TestCate1',
    NAME_ENG: 'TestCate1',
    NAME_CHN: 'TestCate1',
    NAME_JPN: 'TestCate1',
    NAME_ETC: 'TestCate1',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 5,
    SITE_ID: 1,
  },
  {
    RNUM: 13,
    CATG_ID: 148,
    NAME_KOR: '내가만든카테고리',
    NAME_ENG: '@내가만든카테고리',
    NAME_CHN: '@@내가만든카테고리',
    NAME_JPN: '@내가만든카테고리',
    NAME_ETC: '@내가만든카테고리',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 126,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 14,
    CATG_ID: 326,
    NAME_KOR: '1111',
    NAME_ENG: '1111',
    NAME_CHN: '1111',
    NAME_JPN: '1111',
    NAME_ETC: '1111',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 148,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 15,
    CATG_ID: 346,
    NAME_KOR: '222',
    NAME_ENG: '2222',
    NAME_CHN: '2222',
    NAME_JPN: '2222',
    NAME_ETC: '2222',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 148,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 16,
    CATG_ID: 366,
    NAME_KOR: '33',
    NAME_ENG: '333',
    NAME_CHN: '333',
    NAME_JPN: '333',
    NAME_ETC: '333',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 148,
    SORT_SQ: 3,
    SITE_ID: 1,
  },
  {
    RNUM: 17,
    CATG_ID: 367,
    NAME_KOR: '444',
    NAME_ENG: '44',
    NAME_CHN: '44',
    NAME_JPN: '44',
    NAME_ETC: '44',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 148,
    SORT_SQ: 4,
    SITE_ID: 1,
  },
  {
    RNUM: 18,
    CATG_ID: 1206,
    NAME_KOR: '하위 카테고리00',
    NAME_ENG: '하위 카테고리11',
    NAME_CHN: '하위 카테고리22',
    NAME_JPN: '하위 카테고리11',
    NAME_ETC: '하위 카테고리11',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 148,
    SORT_SQ: 5,
    SITE_ID: 1,
  },
  {
    RNUM: 19,
    CATG_ID: 286,
    NAME_KOR: 'subCate2',
    NAME_ENG: 'subCate2',
    NAME_CHN: 'subCate2',
    NAME_JPN: 'subCate2',
    NAME_ETC: 'subCate2',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 126,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 20,
    CATG_ID: 267,
    NAME_KOR: 'subCate1',
    NAME_ENG: 'subCate1',
    NAME_CHN: 'subCate1',
    NAME_JPN: 'subCate1',
    NAME_ETC: 'subCate1',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 286,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 21,
    CATG_ID: 287,
    NAME_KOR: 'subCate3',
    NAME_ENG: 'subCate3',
    NAME_CHN: 'subCate3',
    NAME_JPN: 'subCate3',
    NAME_ETC: 'subCate3',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 126,
    SORT_SQ: 3,
    SITE_ID: 1,
  },
  {
    RNUM: 22,
    CATG_ID: 307,
    NAME_KOR: 'subCate5',
    NAME_ENG: 'subCate5',
    NAME_CHN: 'subCate5',
    NAME_JPN: 'subCate5',
    NAME_ETC: 'subCate5',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 287,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 23,
    CATG_ID: 306,
    NAME_KOR: 'subCate4',
    NAME_ENG: 'subCate4',
    NAME_CHN: 'subCate4',
    NAME_JPN: 'subCate4',
    NAME_ETC: 'subCate4',
    NODE_TYPE: 'F',
    LVL: 3,
    PRNT_ID: 287,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 24,
    CATG_ID: 266,
    NAME_KOR: 'TestCate2',
    NAME_ENG: '@TestCate2',
    NAME_CHN: '@@TestCate2',
    NAME_JPN: '@TestCate2',
    NAME_ETC: '@TestCate2',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 6,
    SITE_ID: 1,
  },
  {
    RNUM: 25,
    CATG_ID: 529,
    NAME_KOR: '기본1',
    NAME_ENG: '기본1',
    NAME_CHN: '기본1',
    NAME_JPN: '기본1',
    NAME_ETC: '기본1',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 266,
    SORT_SQ: 1,
    SITE_ID: 1,
  },
  {
    RNUM: 26,
    CATG_ID: 351,
    NAME_KOR: '555555',
    NAME_ENG: '555555',
    NAME_CHN: '555555',
    NAME_JPN: '555555',
    NAME_ETC: '555555',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 7,
    SITE_ID: 1,
  },
  {
    RNUM: 27,
    CATG_ID: 466,
    NAME_KOR: '2323',
    NAME_ENG: '12121',
    NAME_CHN: 'sdsdsds',
    NAME_JPN: '12121',
    NAME_ETC: '12121',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 351,
    SORT_SQ: 2,
    SITE_ID: 1,
  },
  {
    RNUM: 28,
    CATG_ID: 888,
    NAME_KOR: '22',
    NAME_ENG: '222',
    NAME_CHN: '222',
    NAME_JPN: '222',
    NAME_ETC: '222',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 351,
    SORT_SQ: 3,
    SITE_ID: 1,
  },
  {
    RNUM: 29,
    CATG_ID: 994,
    NAME_KOR: 'eeredd',
    NAME_ENG: 'ererdd',
    NAME_CHN: 'ereredd',
    NAME_JPN: 'ererdd',
    NAME_ETC: 'ererdd',
    NODE_TYPE: 'F',
    LVL: 2,
    PRNT_ID: 351,
    SORT_SQ: 4,
    SITE_ID: 1,
  },
  {
    RNUM: 30,
    CATG_ID: 894,
    NAME_KOR: '피엠오',
    NAME_ENG: 'PMOE',
    NAME_CHN: 'PMOC',
    NAME_JPN: 'PMOE',
    NAME_ETC: 'PMOE',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 8,
    SITE_ID: 1,
  },
  {
    RNUM: 31,
    CATG_ID: 935,
    NAME_KOR: 'Test',
    NAME_ENG: 'Test',
    NAME_CHN: 'Test',
    NAME_JPN: 'Test',
    NAME_ETC: 'Test',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 9,
    SITE_ID: 1,
  },
  {
    RNUM: 32,
    CATG_ID: 1147,
    NAME_KOR: '테스트',
    NAME_ENG: '테스트',
    NAME_CHN: '테스트',
    NAME_JPN: '테스트',
    NAME_ETC: '테스트',
    NODE_TYPE: 'F',
    LVL: 1,
    PRNT_ID: 1,
    SORT_SQ: 10,
    SITE_ID: 1,
  },
]);

const fakeData = {
  appList,
};

export default fakeData;
`;

const title = '-기본 사용법';

const details = '기본 사용법의 예시와 fakeData입니다.';

export { App, code, title, details };
