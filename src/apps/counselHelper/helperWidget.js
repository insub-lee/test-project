import React, { PureComponent } from 'react';
import ScrollBar from 'react-custom-scrollbars';
import PropTypes from 'prop-types';
import Detail from './detail';
import SearchWidget from './searchWidget';
export default class helperWidget extends PureComponent {
  state = {
    searchWord: '',
  };

  handlerSearch = KEYWORD => {
    const { getList, BIZGRP_ID, WIDGET_ID } = this.props;
    getList(BIZGRP_ID, WIDGET_ID, KEYWORD);
  };

  render() {
    const { cardList, keyword } = this.props;
    console.log(cardList, '카드리스트테스트');
    const result = [];
    let first = -1;
    /* 트리데이터생성 */
    cardList.map(query => {
      console.log('트리데이터생성중');
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
      console.log(result, '결과테스트');
      return result;
    });

    return (
      <div className="wrapper">
        <SearchWidget keyword={keyword} onSearch={this.handlerSearch} />
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
  cardList: PropTypes.object,
  linkData: PropTypes.object,
};
helperWidget.defaultProps = {
  cardList: [],
};
