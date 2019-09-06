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
      if (pItem.title.indexOf(searchWord) !== -1) {
        return pItem;
      }
      const parent = pItem;
      const child = pItem.children.filter(cItem => {
        if (cItem.title.indexOf(searchWord) !== -1) {
          return cItem;
        }
      });
      if (child.length !== 0) {
        parent.children = child;
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
