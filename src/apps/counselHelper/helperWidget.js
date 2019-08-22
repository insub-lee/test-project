import React, { PureComponent } from 'react';
import { Row, Col } from 'antd';
import Detail from './detail';
import SearchWidget from './searchWidget';
import ScrollBar from 'react-custom-scrollbars';
export default class helperWidget extends PureComponent {
  render() {
    const { item, type } = this.props;
    const { detail, searchClick, searchWord } = this.props;
    const result = [];
    let first = -1;
    /* 트리데이터생성 */
    detail.map(query => {
      let tempData = {};
      const LVL = query.get('LVL');
      const BIZGRP_ID = query.get('BIZGRP_ID');
      const NAME_KOR = query.get('NAME_KOR');
      switch (LVL) {
        case 2:
          first += 1;
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            children: [],
          };
          result.push(tempData);
          break;
        case 3:
          tempData = {
            title: NAME_KOR,
            key: BIZGRP_ID,
            value: BIZGRP_ID,
            children: [],
          };
          result[first].children.push(tempData);
          break;
        default:
      }
    });

    return (
      <div class="wrapper">
        <SearchWidget onClick={searchClick} />
        <ScrollBar style={{ width: '100%', height: '100%' }} autoHide autoHideTimeout={1000} autoHideDuration={200}>
          <div className="widget">
            <Detail item={detail} treeData={result} searchWord={searchWord} />
          </div>
        </ScrollBar>
      </div>
    );
  }
}
