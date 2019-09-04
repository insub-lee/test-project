import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppCardList from './AppCardList';
import NoResult from './noResult';

class detail extends PureComponent {
  render() {
    const { searchWord, treeData } = this.props;
    const noMap = <NoResult treeData={treeData} searchWord={searchWord} />;

    //  필터용 함수
    const newArray = treeData.filter(pItem => {
      if (pItem.title.search(searchWord) !== -1) {
        return !!~pItem.title.search(searchWord);
      }
      const parent = pItem;
      const test = pItem.children.filter(item => !!~item.title.search(searchWord));
      if (test.length !== 0) {
        parent.children = test;
        return parent;
      }
    });
    /* 필터 용 함수 */

    const appCardList = newArray.map(query => {
      const { title } = query;
      const { children } = query;
      const { linkProp } = query;
      const { key } = query;
      return <AppCardList title={title} childNode={children} key={key} linkProp={linkProp} />;
    });

    return <div className="groupWrap">{newArray.length === 0 ? <div>{noMap}</div> : <div>{appCardList}</div>}</div>;
  }
}
detail.propTypes = {
  searchWord: PropTypes.string,
  treeData: PropTypes.array,
};
export default detail;
