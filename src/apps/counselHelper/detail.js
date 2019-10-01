import React, { Component } from 'react';
import PropTypes from 'prop-types';

import AppCardList from './AppCardList';
import NoResult from './noResult';

class detail extends Component {
  componentDidMount() {}

  render() {
    const { keyword, treeData } = this.props;
    const noMap = <NoResult treeData={treeData} keyword={keyword} />;

    //  필터용 함수
    const newArray = treeData.filter(pItem => {
      if (pItem.title.indexOf(keyword) !== -1) {
        return pItem;
      }
      const parent = pItem;
      const child = pItem.children.filter(cItem => {
        if (cItem.title.indexOf(keyword) !== -1) {
          return cItem;
        }
        if (cItem.DSCR_KOR.indexOf(keyword) !== -1) {
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
      const { link } = query;
      const { children } = query;
      const { key } = query;
      return <AppCardList pTitle={title} childNode={children} key={key} link={link} />;
    });

    return <div className="groupWrap">{newArray.length === 0 ? <div>{noMap}</div> : <div>{appCardList}</div>}</div>;
  }
}
detail.propTypes = {
  keyword: PropTypes.string,
  treeData: PropTypes.array,
};
export default detail;
