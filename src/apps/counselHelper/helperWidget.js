import React, { Component } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';

import Detail from './detail';
import SearchWidget from './searchWidget';

class helperWidget extends Component {
  componentDidMount() {}

  render() {
    const { linkData, cardList, keyword, getList, chageKeyword, WIDGET_ID } = this.props;
    const result = [];
    let first = -1;
    const linkProp = Object.prototype.hasOwnProperty.call(linkData, 'children') ? linkData.children : [];

    /* 트리데이터생성 */
    cardList.map(query => {
      let tempData = {};
      const { LVL, DSCR_KOR, BIZGRP_ID, NAME_KOR, STARPOINT } = query;
      let prntLink;
      let childLink;
      switch (LVL) {
        case 2:
          first += 1;
          prntLink = linkProp.length > 0 ? linkProp.filter(x => x.BIZGRP_ID === BIZGRP_ID) : [{}];
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            DSCR_KOR,
            children: [],
            link: prntLink[0],
          };
          result.push(tempData);
          break;
        case 3:
          childLink = Object.prototype.hasOwnProperty.call(result[first].link, 'children')
            ? result[first].link.children.filter(x => x.BIZGRP_ID === BIZGRP_ID)
            : [{}];
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            DSCR_KOR,
            STARPOINT,
            children: [],
            link: childLink[0],
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
  cardList: PropTypes.array,
  keyword: PropTypes.string,
  getList: PropTypes.func,
  chageKeyword: PropTypes.func,
  linkData: PropTypes.object,
  WIDGET_ID: PropTypes.string,
};

helperWidget.defaultProps = {
  cardList: [],
};

export default helperWidget;
