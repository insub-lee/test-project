import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppCardList from './AppCardList';
import NoResult from './noResult';

class detail extends PureComponent {
  render() {
    const { searchWord, treeData } = this.props;
    const noMap = <NoResult treeData={treeData} searchWord={searchWord} />;

    //  필터용 함수
    let newArray = treeData.filter((item, index, array) => {
      return !!~item.title.search(searchWord);
    });
    if (newArray.length === 0) {
      const result = [];
      newArray = treeData.filter((item, index, array) => {
        const parent = item;
        const temp = item.children.filter(function(item, index, array) {
          return !!~item.title.search(searchWord);
        });
        if (temp.length === 0) {
        } else {
          parent.children = temp;
          result.push(parent);
        }
      });
      console.log('필터결과!');
      console.log(result);
      newArray = result;
    }
    /* 필터 용 함수 */

    const appCardList = newArray.map(query => {
      const { title } = query;
      const { children } = query;
      const { key } = query;
      return <AppCardList title={title} childNode={children} key={key} />;
    });

    return <div className="groupWrap">{newArray.length === 0 ? <div>{noMap}</div> : <div>{appCardList}</div>}</div>;
  }
}
detail.propTypes = {
  searchWord: PropTypes.string,
  treeData: PropTypes.array,
};
export default detail;
