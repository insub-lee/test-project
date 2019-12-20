import React, { Component } from 'react';
import Tree from 'components/Tree';
import * as treeFunc from 'containers/common/functions/treeFunc';
import fakeData from './fakeData';

class Example extends Component {
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
      />
    );
  }
}

export default Example;
