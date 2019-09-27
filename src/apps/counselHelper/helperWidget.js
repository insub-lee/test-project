import React, { Component } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import Detail from './detail';
import SearchWidget from './searchWidget';

class helperWidget extends Component {
  componentDidMount() {}

  render() {
    const { WIDGET_ID, cardList, keyword, getList, chageKeyword } = this.props;
    const result = [];
    let first = -1;

    /* 트리데이터생성 */
    cardList.map(query => {
      let tempData = {};
      const { LVL, DSCR_KOR, BIZGRP_ID, NAME_KOR, STARPOINT } = query;

      switch (LVL) {
        case 2:
          first += 1;
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            DSCR_KOR,
            children: [],
          };
          result.push(tempData);
          break;
        case 3:
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            DSCR_KOR,
            STARPOINT,
            children: [],
          };
          result[first].children.push(tempData);
          break;
        default:
      }
      return result;
    });

    return (
      <div className="wrapper">
        <SearchWidget WIDGET_ID={WIDGET_ID} keyword={keyword} onSearch={getList} chageKeyword={chageKeyword} />
        <ScrollBar style={{ width: '100%', height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <div className="widget">
            <Detail treeData={result} keyword={keyword} />
          </div>
        </ScrollBar>
      </div>
    );
  }
}

helperWidget.propTypes = {
  WIDGET_ID: PropTypes.string,
  cardList: PropTypes.object,
  keyword: PropTypes.string,
  getList: PropTypes.func,
  chageKeyword: PropTypes.func,
};

helperWidget.defaultProps = {
  cardList: [],
};

export default helperWidget;
