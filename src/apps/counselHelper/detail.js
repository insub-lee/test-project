import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import AppCardList from './AppCardList';
import NoResult from './noResult';

class detail extends PureComponent {
  render() {
    const { item, searchWord, treeData } = this.props;
    let noMap;
    if (item.size === 0) {
      noMap = <NoResult searchWord={searchWord} />;
      return noMap;
    }
    const appCardList = treeData.map((query) => {
      const { title } = query;
      const { children } = query;
      return <AppCardList title={title} childNode={children} />;
    });

    return (
      <div className="groupWrap">
        {noMap}
        {appCardList}
      </div>
    );
  }
}
detail.propTypes = {
  item: PropTypes.array,
  searchWord: PropTypes.string,
  treeData: PropTypes.array,
};
export default detail;
